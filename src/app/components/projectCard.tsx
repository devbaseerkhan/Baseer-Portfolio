"use client";

import Image from "next/image";
import Button from "./Button";
import BoxStack from "./boxStack";

export type Creation = {
  id: string;
  title: string;
  category: string;
  published: string;
  image: string;
  link: string;
  result?: string | string[];
  whatWeDid?: string | string[];
  brief?: string;
  about?: string;
  technologies?: string[];
  files?: { name: string; size: string; preview?: string }[];
};

type ProjectCardProps = {
  project: Creation;
  priority?: boolean;
  onViewDetails?: (project: Creation) => void;
};

export default function ProjectCard({
  project,
  priority = false,
  onViewDetails,
}: ProjectCardProps) {
  const handleView = () => {
    if (onViewDetails) {
      onViewDetails(project);
    } else if (project.link) {
      window.open(project.link, "_blank", "noopener,noreferrer");
    }
  };

  const previewText = () => {
    const candidate = project.result ?? project.whatWeDid;
    if (!candidate) return "Project update.";
    const list = Array.isArray(candidate)
      ? candidate
      : candidate.split(/\n+/);
    const first = list.map((item) => item.trim()).find(Boolean);
    return first ?? "Project update.";
  };

  return (
    <div className="flex h-full flex-col px-4 pb-6 pt-4">
      <BoxStack lg>
        <div className="relative w-full overflow-hidden">
          <Image
            src={project.image}
            alt={project.title}
            fill
            className="absolute z-0 object-cover opacity-20 blur-xs"
            priority={priority}
          />
          <div className="absolute z-10 h-full w-full bg-black/20" />
          <div className="relative z-20 flex flex-col justify-between gap-12 xl:gap-18 p-4 xl:p-5">
            <h1 className="title16">{project.published}</h1>
            <div className="relative h-50 2xl:h-66 w-full overflow-hidden rounded-sm">
              <Image
                src={project.image}
                alt={project.title}
                fill
                className="object-cover"
                priority={priority}
              />
            </div>
            <div className="ml-auto">
              <Button
                label="View live"
                variant="outlined"
                className="w-max px-4 py-1"
                onClick={handleView}
              />
            </div>
          </div>
        </div>
      </BoxStack>
      <div className="space-y-4 p-3 xl:p-4">
        <div className="flex flex-col">
          <h2 className="title18 font-big font-bold text-primary">
            {project.title}
          </h2>
          <p className="title14">{project.category}</p>
        </div>
        <p className="title14 !text-info-light">{previewText()}</p>
        <div className="w-full">
          <svg
            width="100%"
            viewBox="0 0 374 13"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M0 0L4.5 5L368.5 4.87688L374 0V9H0V0Z"
              fill="var(--color-primary)"
            />
            <path d="M5 12H110" stroke="var(--color-primary)" />
            <path d="M368 12L339 12" stroke="var(--color-primary)" />
          </svg>
        </div>
      </div>
    </div>
  );
}
