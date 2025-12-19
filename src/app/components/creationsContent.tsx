"use client";

import { useEffect, useMemo, useState } from "react";
import ProjectCard, { type Creation } from "./projectCard";

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
  },
];

export default function CreationsContent() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [itemsPerView, setItemsPerView] = useState(1);
  const [variant, setVariant] = useState<SliderVariant>("cinematic");

  useEffect(() => {
    const handleResize = () => {
      if (typeof window === "undefined") return;
      const width = window.innerWidth;
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

  useEffect(() => {
    const maxIndex =
      variant === "classic"
        ? Math.max(0, creations.length - itemsPerView)
        : creations.length - 1;
    setActiveIndex((prev) => Math.min(prev, maxIndex));
  }, [itemsPerView, variant]);

  const trackStyle = useMemo(() => {
    const translate = -(activeIndex * (100 / itemsPerView));
    return {
      width: `${(creations.length * 100) / itemsPerView}%`,
      transform: `translateX(${translate}%)`,
    };
  }, [activeIndex, itemsPerView]);

  const activeProject = creations[activeIndex];

  const next = () => {
    setActiveIndex((prev) => {
      const maxIndex =
        variant === "classic"
          ? Math.max(0, creations.length - itemsPerView)
          : creations.length - 1;
      return prev >= maxIndex ? 0 : prev + 1;
    });
  };

  const prev = () => {
    setActiveIndex((prev) => {
      const maxIndex =
        variant === "classic"
          ? Math.max(0, creations.length - itemsPerView)
          : creations.length - 1;
      return prev <= 0 ? maxIndex : prev - 1;
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
    <div className="h-full w-full overflow-hidden pt-10 sm:pt-12">
      <div className="flex h-full flex-col gap-6">
        <div className="flex flex-col gap-6 px-4 sm:px-6 lg:px-9">
          <div className="flex flex-col items-center gap-2">
            <h1 className="title18 text-center">Creations</h1>
          </div>
          <div className="flex flex-wrap items-center justify-between gap-3">
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
            <div className="flex gap-2">
              <button
                type="button"
                onClick={prev}
                className="h-10 w-10 rounded-sm border border-primary bg-black/40 text-primary hover:bg-primary-10 transition"
                aria-label="Previous creation"
              >
                ‹
              </button>
              <button
                type="button"
                onClick={next}
                className="h-10 w-10 rounded-sm border border-primary bg-black/40 text-primary hover:bg-primary-10 transition"
                aria-label="Next creation"
              >
                ›
              </button>
            </div>
          </div>
          {variant === "classic" ? (
            <div className="w-full overflow-hidden">
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
                    <ProjectCard project={project} />
                  </article>
                ))}
              </div>
            </div>
          ) : (
            <div className="relative w-full overflow-visible px-2 sm:px-4 lg:px-6">
              <div
                className="relative flex items-center justify-center py-6 sm:py-10"
                style={{ perspective: "1800px" }}
              >
                {creations.map((project, index) => {
                  const delta = cinematicDelta(index);
                  const isHidden = Math.abs(delta) > 1;
                  const translateX = delta * 380;
                  const rotateY = delta * 45;
                  const scale = delta === 0 ? 1 : 0.82;
                  const opacity = Math.abs(delta) > 0 ? 0.55 : 1;

                  return (
                    <article
                      key={project.id}
                      className="absolute left-1/2 top-0 w-[min(72vw,520px)] sm:w-[min(70vw,560px)] md:w-[min(60vw,510px)]"
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
                      />
                    </article>
                  );
                })}
              </div>
              {/* 
              <div className="mt-4 flex flex-col items-center gap-3 text-center">
                <div className="creation-accent w-full max-w-140" aria-hidden />
                <h2 className="title18 font-big font-bold text-primary">
                  {activeProject.title}
                </h2>
                <p className="title14">{activeProject.category}</p>
                <p className="title14 !text-info-light max-w-160">
                  {activeProject.description}
                </p>
                <div className="flex items-center gap-2 text-primary font-big">
                  <span className="text-sm tracking-[0.18em]">
                    {activeIndex + 1}/{creations.length}
                  </span>
                  <span className="text-info-light text-xs tracking-[0.2em]">
                    Scroll through the archive
                  </span>
                </div>
                <div className="creation-accent w-full max-w-140" aria-hidden />
              </div> */}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
