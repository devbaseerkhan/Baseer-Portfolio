"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import ProjectCard, { type Creation } from "./projectCard";
import ProjectDetails from "./projectDetails";
import { IoChevronBackOutline, IoChevronForwardOutline } from "react-icons/io5";
import { fetchProfile, fetchProjects } from "@/lib/contentApi";
import type { ProfileRecord, ProjectRecord } from "@/lib/contentTypes";
import { fallbackProjects } from "@/lib/fallbackContent";
import Filtration, { type FilterOption } from "./filtration";

type SliderVariant = "classic" | "cinematic";

export default function CreationsContent() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [itemsPerView, setItemsPerView] = useState(1);
  const [variant, setVariant] = useState<SliderVariant>("cinematic");
  const [detailsProject, setDetailsProject] = useState<Creation | null>(null);
  const [viewportWidth, setViewportWidth] = useState(
    typeof window !== "undefined" ? window.innerWidth : 0
  );
  const [projects, setProjects] = useState<Creation[]>([]);
  const [activeCategories, setActiveCategories] = useState<Set<string>>(
    new Set()
  );
  const [loading, setLoading] = useState(true);
  const [hasFetched, setHasFetched] = useState(false);
  const [profile, setProfile] = useState<ProfileRecord | null>(null);

  const normalizeDriveUrl = useCallback((url?: string | null) => {
    if (!url) return url ?? undefined;
    if (url.includes("drive.google.com/file/d/")) {
      const parts = url.split("/d/")[1]?.split("/");
      const id = parts?.[0];
      if (id) {
        return `https://drive.google.com/uc?export=view&id=${id}`;
      }
    }
    return url;
  }, []);

  const mapProject = useCallback(
    (record: ProjectRecord): Creation => ({
      id: record.id,
      title: record.title,
      category: record.category ?? "Project",
      published:
        record.published ??
        (record.status === "done"
          ? "Completed"
          : record.status === "current"
          ? "Current project"
          : "In progress"),
      image:
        normalizeDriveUrl(record.image_url) ??
        "data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='1600' height='900' viewBox='0 0 1600 900'><rect width='1600' height='900' fill='%230a0a0f'/><text x='50%' y='50%' fill='%23e84a4a' font-size='48' font-family='Arial' text-anchor='middle'>Project thumbnail</text></svg>",
      link: record.live_url ?? "#",
      brief: record.brief ?? undefined,
      about: record.about ?? undefined,
      result: record.result ?? undefined,
      whatWeDid: record.what_we_did ?? undefined,
      technologies: record.tech_stack ?? undefined,
      files: record.files
        ? record.files.map((file) => ({
            ...file,
            preview: normalizeDriveUrl(file.preview),
          }))
        : undefined,
    }),
    [normalizeDriveUrl]
  );

  const fallbackMapped = useMemo(
    () => fallbackProjects.map(mapProject),
    [mapProject]
  );

  const displayProjects = useMemo(
    () => (projects.length > 0 ? projects : hasFetched ? fallbackMapped : []),
    [fallbackMapped, hasFetched, projects]
  );

  const normalizeCategory = useCallback((category?: string | null) => {
    const base = category?.trim() || "Uncategorized";
    return (
      base
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/^-+|-+$/g, "") || "uncategorized"
    );
  }, []);

  const categoryOptions = useMemo<FilterOption[]>(() => {
    const map = new Map<string, string>();
    displayProjects.forEach((project) => {
      const id = normalizeCategory(project.category);
      if (!map.has(id)) {
        map.set(id, project.category ?? "Uncategorized");
      }
    });
    return Array.from(map.entries()).map(([id, label]) => ({ id, label }));
  }, [displayProjects, normalizeCategory]);

  const defaultCategorySet = useMemo(
    () => new Set(categoryOptions.map((option) => option.id)),
    [categoryOptions]
  );

  const resolvedActiveCategories = useMemo(() => {
    if (defaultCategorySet.size === 0) return new Set<string>();
    if (activeCategories.size === 0) return defaultCategorySet;
    const next = new Set(
      Array.from(activeCategories).filter((id) => defaultCategorySet.has(id))
    );
    return next.size === 0 ? defaultCategorySet : next;
  }, [activeCategories, defaultCategorySet]);

  const filteredProjects = useMemo(
    () =>
      displayProjects.filter((project) =>
        resolvedActiveCategories.has(normalizeCategory(project.category))
      ),
    [displayProjects, normalizeCategory, resolvedActiveCategories]
  );

  useEffect(() => {
    const handleResize = () => {
      if (typeof window === "undefined") return;
      const width = window.innerWidth;
      setViewportWidth(width);
      if (width >= 1920) {
        setItemsPerView(3);
      } else if (width >= 1750) {
        setItemsPerView(2.5);
      } else if (width >= 1536) {
        setItemsPerView(2);
      } else if (width >= 1280) {
        setItemsPerView(2.5);
      } else if (width >= 1024) {
        setItemsPerView(1.5);
      } else if (width >= 900) {
        setItemsPerView(2);
      } else if (width > 540) {
        setItemsPerView(1.5);
      } else {
        setItemsPerView(1);
      }
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    let mounted = true;
    fetchProjects()
      .then((result) => {
        if (!mounted) return;
        if (result.data.length) {
          setProjects(result.data.map(mapProject));
        } else {
          setProjects([]);
        }
      })
      .catch(() => {
        setProjects([]);
      })
      .finally(() => {
        if (mounted) {
          setHasFetched(true);
          setLoading(false);
        }
      });
    return () => {
      mounted = false;
    };
  }, [mapProject]);

  useEffect(() => {
    let mounted = true;
    fetchProfile()
      .then((result) => {
        if (!mounted) return;
        if (result.data[0]) {
          setProfile(result.data[0]);
        }
      })
      .catch(() => {
        /* silent: fallback profile used elsewhere */
      });
    return () => {
      mounted = false;
    };
  }, []);

  const maxIndex =
    variant === "classic"
      ? Math.max(0, filteredProjects.length - itemsPerView)
      : Math.max(filteredProjects.length - 1, 0);
  const currentIndex = Math.min(activeIndex, maxIndex);
  const slideWidthPercent = filteredProjects.length
    ? 100 / filteredProjects.length
    : 100;

  const trackStyle = useMemo(() => {
    const translate = -(currentIndex * slideWidthPercent);
    return {
      width: `${(filteredProjects.length / itemsPerView) * 100}%`,
      transform: `translateX(${translate}%)`,
    };
  }, [currentIndex, filteredProjects.length, itemsPerView, slideWidthPercent]);

  const next = () => {
    setActiveIndex((prev) => {
      const safePrev = Math.min(prev, maxIndex);
      return safePrev >= maxIndex ? 0 : safePrev + 1;
    });
  };

  const prev = () => {
    setActiveIndex((prev) => {
      const safePrev = Math.min(prev, maxIndex);
      return safePrev <= 0 ? maxIndex : safePrev - 1;
    });
  };

  const cinematicDelta = (index: number) => {
    const raw = index - activeIndex;
    if (filteredProjects.length === 0) return 0;
    const wrap =
      Math.abs(raw) <= filteredProjects.length / 2
        ? raw
        : raw > 0
        ? raw - filteredProjects.length
        : raw + filteredProjects.length;
    return wrap;
  };

  const toggleCategory = (id: string) => {
    setActiveCategories((prev) => {
      const next = new Set(prev);
      if (next.has(id)) {
        next.delete(id);
      } else {
        next.add(id);
      }
      return next;
    });
  };

  const resetCategories = () =>
    setActiveCategories(new Set(defaultCategorySet));

  return (
    <div className="h-full w-full max-h-[calc(100vh-74px)] md:max-h-[calc(100vh-176px)] overflow-y-auto overflow-x-hidden py-6 lg:py-10 2xl:py-12">
      {detailsProject ? (
        <ProjectDetails
          project={detailsProject}
          onBack={() => setDetailsProject(null)}
        />
      ) : (
        <div className="w-full flex flex-col gap-6 2xl:gap-8 relative">
          <div className="w-full flex flex-col gap-3 px-0 sm:px-6 lg:px-10">
            <div className="w-full flex flex-col gap-6 ">
              <h1 className="title18 text-center">Creations</h1>
              <Filtration
                label="Filter:"
                options={categoryOptions}
                active={resolvedActiveCategories}
                onToggle={toggleCategory}
                onReset={resetCategories}
              />
            </div>
            <div className="flex flex-wrap items-center justify-between gap-3 px-4 sm:px-0">
              <div className="flex rounded border border-primary">
                {(
                  [
                    { key: "classic", label: "Classic Rail" },
                    { key: "cinematic", label: "Cinematic Focus" },
                  ] satisfies { key: SliderVariant; label: string }[]
                ).map((option) => (
                  <button
                    key={option.key}
                    type="button"
                    onClick={() => setVariant(option.key)}
                    className={`px-1 lg:px-3 py-1 text-sm uppercase tracking-[0.14em] font-big font-bold transition ${
                      variant === option.key
                        ? "bg-primary text-dark"
                        : "text-primary hover:bg-primary-20"
                    }`}
                  >
                    {option.label}
                  </button>
                ))}
              </div>
              <div className="flex gap-2">
                <button
                  type="button"
                  onClick={prev}
                  className="flex justify-center items-center h-10 w-10 rounded-sm border border-primary bg-black/40 text-2xl text-primary hover:bg-primary-10 transition cursor-pointer"
                  aria-label="Previous creation"
                >
                  <IoChevronBackOutline />
                </button>
                <button
                  type="button"
                  onClick={next}
                  className="flex justify-center items-center h-10 w-10 rounded-sm border border-primary bg-black/40 text-2xl text-primary hover:bg-primary-10 transition cursor-pointer"
                  aria-label="Next creation"
                >
                  <IoChevronForwardOutline />
                </button>
              </div>
            </div>
          </div>
          {!filteredProjects.length ? (
            <div className="flex items-center justify-center py-10 text-sm uppercase tracking-[0.14em] text-info-light">
              {displayProjects.length === 0 && loading && !hasFetched
                ? "Syncing projects from Supabase..."
                : "No projects match these filters"}
            </div>
          ) : variant === "classic" ? (
            <div className="h-full w-full overflow-hidden px-2 lg:px-6">
              <div
                className="flex transition-transform duration-500 ease-out"
                style={trackStyle}
              >
                {filteredProjects.map((project) => (
                  <article
                    key={project.id}
                    className="creation-card shrink-0"
                    style={{
                      width: `${100 / filteredProjects.length}%`,
                    }}
                  >
                    <ProjectCard
                      project={project}
                      onViewDetails={(proj) => setDetailsProject(proj)}
                    />
                  </article>
                ))}
              </div>
            </div>
          ) : (
            <div
              className="relative min-h-180 w-full flex items-center justify-center"
              style={{ perspective: "1800px" }}
            >
              {filteredProjects.map((project, index) => {
                const delta = cinematicDelta(index);
                const isHidden = Math.abs(delta) > 1;
                const translateX = delta * (viewportWidth < 640 ? 280 : 380);
                const rotateY = delta * 45;
                const scale = delta === 0 ? 1 : 0.82;
                const opacity = Math.abs(delta) > 0 ? 0.55 : 1;

                return (
                  <article
                    key={project.id}
                    className="absolute left-1/2 top-0 w-[min(100%,375px)] sm:w-[min(100%,504px)]"
                    style={{
                      transform: `translateX(calc(-50% + ${translateX}px)) rotateY(${rotateY}deg) scale(${scale})`,
                      transformStyle: "preserve-3d",
                      opacity: isHidden ? 0 : opacity,
                      zIndex: 10 - Math.abs(delta),
                      transition:
                        "transform 450ms ease, opacity 400ms ease, filter 400ms ease",
                      filter:
                        delta === 0
                          ? "drop-shadow(0 16px 40px rgba(0,0,0,0.5))"
                          : "drop-shadow(0 10px 24px rgba(0,0,0,0.4))",
                      pointerEvents: delta === 0 ? "auto" : "none",
                    }}
                  >
                    <ProjectCard
                      project={project}
                      priority={index === activeIndex}
                      onViewDetails={(proj) => setDetailsProject(proj)}
                    />
                  </article>
                );
              })}
            </div>
          )}
        </div>
      )}
    </div>
  );
}
