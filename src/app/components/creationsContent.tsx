"use client";

import { useEffect, useMemo, useState } from "react";
import ProjectCard, { type Creation } from "./projectCard";
import ProjectDetails from "./projectDetails";
import { IoChevronBackOutline, IoChevronForwardOutline } from "react-icons/io5";

type SliderVariant = "classic" | "cinematic";

const creations: Creation[] = [
  {
    id: "arze-store",
    title: "Arze Store",
    category: "React Website",
    published: "Published 3 months ago",
    description:
      "Boosted the product story with bold typography, delightful animations, and ultra-fast page transitions.",
    image:
      "data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='1600' height='900' viewBox='0 0 1600 900'><defs><linearGradient id='g' x1='0%' y1='0%' x2='100%' y2='100%'><stop offset='0%' stop-color='%23ff5f6d'/><stop offset='100%' stop-color='%23ffc371'/></linearGradient></defs><rect width='1600' height='900' fill='url(%23g)'/><circle cx='420' cy='280' r='160' fill='rgba(255,255,255,0.22)'/><rect x='560' y='380' rx='32' ry='32' width='540' height='240' fill='rgba(0,0,0,0.35)'/></svg>",
    link: "#",
    brief: "One sentence explanation for what the project is.",
    about:
      "The team has encountered several challenges during the development process, including unexpected system crashes, hardware malfunctions, and unanticipated compatibility issues.",
    technologies: ["Next.js", "React", "TypeScript", "JS", "Git"],
    files: [
      { name: "homepage.jpg", size: "231kB" },
      { name: "archive view.jpg", size: "231kB" },
      { name: "user-facing part.jpg", size: "231kB" },
      { name: "dashboard home view.jpg", size: "231kB" },
    ],
  },
  {
    id: "vermillion",
    title: "Vermillion Fashion",
    category: "React Website",
    published: "Published 3 months ago",
    description:
      "Editorial-inspired layout with layered imagery, silky scrolling, and immersive color theming.",
    image:
      "data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='1600' height='900' viewBox='0 0 1600 900'><defs><linearGradient id='g2' x1='10%' y1='0%' x2='90%' y2='100%'><stop offset='0%' stop-color='%2304040c'/><stop offset='50%' stop-color='%23232038'/><stop offset='100%' stop-color='%23b53b4f'/></linearGradient></defs><rect width='1600' height='900' fill='url(%23g2)'/><rect x='180' y='220' width='1240' height='460' fill='rgba(255,255,255,0.08)'/><text x='280' y='480' fill='%23f05f69' font-size='180' font-family='Arial Black'>VERMILLION</text></svg>",
    link: "#",
    brief:
      "Blends editorial layout with immersive color theming and bold typography.",
    about:
      "Curated a fashion-first commerce experience with layered imagery, silky scrolling, and expressive copy to tell the brand story.",
    technologies: ["Next.js", "React", "TypeScript", "CSS", "Git"],
    files: [
      { name: "hero.jpg", size: "180kB" },
      { name: "lookbook.jpg", size: "210kB" },
      { name: "checkout.jpg", size: "160kB" },
    ],
  },
  {
    id: "thunderfoot",
    title: "Thunderfoot Studio",
    category: "React Website",
    published: "Published 3 months ago",
    description:
      "Crafted a modular portfolio with CMS-driven sections, device mocks, and crisp glassmorphism.",
    image:
      "data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='1600' height='900' viewBox='0 0 1600 900'><defs><linearGradient id='g3' x1='0%' y1='0%' x2='100%' y2='0%'><stop offset='0%' stop-color='%23222'/><stop offset='50%' stop-color='%23454545'/><stop offset='100%' stop-color='%23707070'/></linearGradient></defs><rect width='1600' height='900' fill='url(%23g3)'/><rect x='280' y='210' width='1040' height='480' rx='24' fill='rgba(0,0,0,0.45)'/><rect x='340' y='260' width='480' height='320' rx='18' fill='rgba(255,255,255,0.06)'/><rect x='860' y='340' width='240' height='180' rx='12' fill='rgba(255,255,255,0.08)'/></svg>",
    link: "#",
    brief:
      "Modular studio site with CMS-driven sections and glassy device mocks.",
    about:
      "Built a modular studio experience with CMS-driven case studies, layered glassmorphism panels, and device mockups.",
    technologies: ["Next.js", "React", "TypeScript", "GSAP", "Git"],
    files: [
      { name: "landing.jpg", size: "240kB" },
      { name: "studio-grid.jpg", size: "210kB" },
      { name: "case-study.jpg", size: "220kB" },
    ],
  },
  {
    id: "spectra",
    title: "Spectra Dashboard",
    category: "React Website",
    published: "Published 1 month ago",
    description:
      "Data-dense control panel with micro-interactions, real-time theming, and resilient responsive grids.",
    image:
      "data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='1600' height='900' viewBox='0 0 1600 900'><defs><linearGradient id='g4' x1='0%' y1='0%' x2='0%' y2='100%'><stop offset='0%' stop-color='%23142a3b'/><stop offset='100%' stop-color='%23070f18'/></linearGradient></defs><rect width='1600' height='900' fill='url(%23g4)'/><rect x='220' y='220' width='1160' height='460' rx='28' fill='rgba(255,255,255,0.04)'/><rect x='280' y='280' width='380' height='140' rx='14' fill='rgba(111,199,255,0.18)'/><rect x='700' y='280' width='540' height='320' rx='18' fill='rgba(255,255,255,0.08)'/></svg>",
    link: "#",
    brief: "Data-dense dashboard with micro-interactions and live theming.",
    about:
      "Data-heavy dashboard with responsive grids, live theming, and micro-interactions that keep controls feeling tactile.",
    technologies: ["Next.js", "React", "TypeScript", "Tailwind", "Git"],
    files: [
      { name: "overview.jpg", size: "200kB" },
      { name: "controls.jpg", size: "190kB" },
      { name: "reports.jpg", size: "210kB" },
    ],
  },
];

export default function CreationsContent() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [itemsPerView, setItemsPerView] = useState(1);
  const [variant, setVariant] = useState<SliderVariant>("cinematic");
  const [detailsProject, setDetailsProject] = useState<Creation | null>(null);
  const [viewportWidth, setViewportWidth] = useState(
    typeof window !== "undefined" ? window.innerWidth : 0
  );

  useEffect(() => {
    const handleResize = () => {
      if (typeof window === "undefined") return;
      const width = window.innerWidth;
      setViewportWidth(width);
      if (width >= 1280) {
        setItemsPerView(3);
      } else if (width >= 900) {
        setItemsPerView(2);
      } else {
        setItemsPerView(1);
      }
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const maxIndex =
    variant === "classic"
      ? Math.max(0, creations.length - itemsPerView)
      : creations.length - 1;
  const currentIndex = Math.min(activeIndex, maxIndex);

  const trackStyle = useMemo(() => {
    const translate = -(currentIndex * (100 / itemsPerView));
    return {
      width: `${(creations.length * 100) / itemsPerView}%`,
      transform: `translateX(${translate}%)`,
    };
  }, [currentIndex, itemsPerView]);

  const activeProject = detailsProject ?? creations[currentIndex];

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
    const wrap =
      Math.abs(raw) <= creations.length / 2
        ? raw
        : raw > 0
        ? raw - creations.length
        : raw + creations.length;
    return wrap;
  };

  return (
    <div className="h-full w-full max-h-[calc(100vh-74px)] md:max-h-[calc(100vh-176px)] overflow-y-auto overflow-x-hidden py-6 lg:py-10 2xl:py-12">
      {detailsProject ? (
        <ProjectDetails
          project={detailsProject}
          onBack={() => setDetailsProject(null)}
        />
      ) : (
        <div className="w-full flex flex-col gap-6 2xl:gap-8">
          <div className="flex flex-col gap-6 px-4 sm:px-6 lg:px-10">
            <h1 className="title18 text-center">Creations</h1>
            <div className="flex flex-wrap items-end justify-between gap-3">
              <div className="flex flex-col gap-1">
                <span className="title12 !text-info-light">Slider style:</span>
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
                      className={`px-3 py-1 text-sm uppercase tracking-[0.14em] font-big font-bold transition ${
                        variant === option.key
                          ? "bg-primary text-dark"
                          : "text-primary hover:bg-primary-20"
                      }`}
                    >
                      {option.label}
                    </button>
                  ))}
                </div>
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
          {variant === "classic" ? (
            <div className="h-full w-full overflow-hidden px-2 lg:px-6">
              <div
                className="flex transition-transform duration-500 ease-out"
                style={trackStyle}
              >
                {creations.map((project) => (
                  <article
                    key={project.id}
                    className="creation-card flex-shrink-0"
                    style={{ width: `${100 / itemsPerView}%` }}
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
              {creations.map((project, index) => {
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
