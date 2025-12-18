"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import Button from "./Button";
import BoxStack from "./boxStack";

type Creation = {
  id: string;
  title: string;
  category: string;
  published: string;
  description: string;
  image: string;
  link: string;
};

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
    const maxIndex = Math.max(0, creations.length - itemsPerView);
    setActiveIndex((prev) => Math.min(prev, maxIndex));
  }, [itemsPerView]);

  const trackStyle = useMemo(() => {
    const translate = -(activeIndex * (100 / itemsPerView));
    return {
      width: `${(creations.length * 100) / itemsPerView}%`,
      transform: `translateX(${translate}%)`,
    };
  }, [activeIndex, itemsPerView]);

  const next = () => {
    setActiveIndex((prev) => {
      const maxIndex = Math.max(0, creations.length - itemsPerView);
      return prev >= maxIndex ? 0 : prev + 1;
    });
  };

  const prev = () => {
    setActiveIndex((prev) => {
      const maxIndex = Math.max(0, creations.length - itemsPerView);
      return prev <= 0 ? maxIndex : prev - 1;
    });
  };

  return (
    <div className="h-full w-full overflow-hidden pt-10 sm:pt-12">
      <div className="flex h-full flex-col gap-6">
        <div className="flex flex-col gap-6 px-4 sm:px-6 lg:px-9">
          <div className="flex flex-col items-center gap-2">
            <h1 className="title18 text-center">Creations</h1>
          </div>
          <div className="flex gap-2 justify-end">
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
          <div className="w-full overflow-hidden">
            <div
              className="flex transition-transform duration-500 ease-out"
              style={trackStyle}
            >
              {creations.map((project) => (
                <article
                  key={project.id}
                  className="creation-card flex-shrink-0"
                  style={{ width: `${100 / creations.length}%` }}
                >
                  <div className="flex h-full flex-col px-4 pb-6 pt-4 ">
                    <BoxStack>
                      <div className="flex flex-col justify-between gap-18 p-5">
                        <h1 className="title16">{project.published}</h1>
                        <div className="relative h-66 w-full overflow-hidden rounded-sm">
                          <Image
                            src={project.image}
                            alt={project.title}
                            fill
                            className="object-cover"
                            priority
                          />
                          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-black/20 to-black/60" />
                        </div>
                        <Button
                          label="View live"
                          variant="outlined"
                          className="w-max px-4 py-1 ml-auto"
                        />
                      </div>
                    </BoxStack>
                    <div className="space-y-4 p-4">
                      <div className="flex flex-col">
                        <h2 className="title18 font-big font-bold text-primary">
                          {project.title}
                        </h2>
                        <p className="title14">
                          {project.category}
                        </p>
                      </div>
                      <p className="title14 !text-info-light">
                        {project.description}
                      </p>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
