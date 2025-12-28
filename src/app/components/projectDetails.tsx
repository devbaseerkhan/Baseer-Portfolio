"use client";

import type { ReactNode } from "react";
import { useMemo, useState } from "react";
import { IoClose } from "react-icons/io5";
import { HiOutlineFolder } from "react-icons/hi";
import { LuImage } from "react-icons/lu";
import Button from "./Button";
import BoxStack from "./boxStack";
import type { Creation } from "./projectCard";
import Badge from "./Badge";
import { FaGit, FaJs, FaJsSquare, FaReact } from "react-icons/fa";
import { RiNextjsLine, RiTailwindCssFill } from "react-icons/ri";
import { FaNodeJs } from "react-icons/fa6";
import PreviewingImage from "./previewingImage";

type TechListItem = { name: string; icon: ReactNode };

type ProjectDetailsProps = {
  project: Creation;
  onBack: () => void;
};

const techIcons: Record<string, ReactNode> = {
  "Next.js": <RiNextjsLine />,
  React: <FaReact />,
  TypeScript: <FaJsSquare />,
  JS: <FaJsSquare />,
  JavaScript: <FaJs />,
  "Node.js": <FaNodeJs />,
  Tailwind: <RiTailwindCssFill />,
  TailwindCSS: <RiTailwindCssFill />,
  Git: <FaGit />,
};

const previewPlaceholders = [
  "data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='1600' height='900' viewBox='0 0 1600 900'><defs><linearGradient id='bg' x1='0%' y1='0%' x2='100%' y2='100%'><stop offset='0%' stop-color='%23040a13'/><stop offset='50%' stop-color='%230e2235'/><stop offset='100%' stop-color='%23140714'/></linearGradient></defs><rect width='1600' height='900' fill='url(%23bg)'/><rect x='220' y='140' width='1160' height='640' rx='18' fill='rgba(255,255,255,0.05)' stroke='%23e84a4a' stroke-width='5'/><rect x='320' y='240' width='960' height='360' rx='14' fill='rgba(0,0,0,0.35)' stroke='rgba(255,255,255,0.12)' stroke-width='4'/></svg>",
  "data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='1600' height='900' viewBox='0 0 1600 900'><defs><linearGradient id='bg2' x1='20%' y1='0%' x2='80%' y2='100%'><stop offset='0%' stop-color='%23050f1d'/><stop offset='55%' stop-color='%23091a2d'/><stop offset='100%' stop-color='%2311080e'/></linearGradient></defs><rect width='1600' height='900' fill='url(%23bg2)'/><rect x='240' y='180' width='1120' height='520' rx='22' fill='rgba(255,255,255,0.04)'/><rect x='320' y='250' width='960' height='380' rx='18' fill='rgba(12,26,40,0.8)' stroke='%233496b8' stroke-width='5'/><rect x='360' y='290' width='360' height='240' rx='16' fill='rgba(232,74,74,0.2)'/><rect x='760' y='320' width='440' height='200' rx='16' fill='rgba(255,255,255,0.08)'/></svg>",
  "data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='1600' height='900' viewBox='0 0 1600 900'><defs><linearGradient id='bg3' x1='0%' y1='0%' x2='0%' y2='100%'><stop offset='0%' stop-color='%23080c16'/><stop offset='100%' stop-color='%23030509'/></linearGradient></defs><rect width='1600' height='900' fill='url(%23bg3)'/><rect x='260' y='200' width='1080' height='520' rx='20' fill='rgba(255,255,255,0.04)' stroke='rgba(232,74,74,0.6)' stroke-width='4'/><rect x='340' y='260' width='920' height='380' rx='16' fill='rgba(0,0,0,0.45)' stroke='rgba(52,150,184,0.6)' stroke-width='3'/><rect x='380' y='300' width='360' height='220' rx='14' fill='rgba(232,74,74,0.25)'/><rect x='820' y='330' width='380' height='180' rx='12' fill='rgba(255,255,255,0.08)'/></svg>",
  "data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='1600' height='900' viewBox='0 0 1600 900'><defs><linearGradient id='bg4' x1='10%' y1='0%' x2='90%' y2='100%'><stop offset='0%' stop-color='%23070f1a'/><stop offset='60%' stop-color='%230a1b2c'/><stop offset='100%' stop-color='%23100508'/></linearGradient></defs><rect width='1600' height='900' fill='url(%23bg4)'/><rect x='240' y='180' width='1120' height='540' rx='18' fill='rgba(255,255,255,0.03)'/><rect x='300' y='240' width='1000' height='420' rx='16' fill='rgba(10,19,28,0.8)' stroke='rgba(232,74,74,0.5)' stroke-width='4'/><rect x='340' y='280' width='420' height='260' rx='14' fill='rgba(232,74,74,0.2)'/><rect x='800' y='320' width='420' height='200' rx='14' fill='rgba(255,255,255,0.09)'/></svg>",
];

const defaultTech: TechListItem[] = [
  { name: "Next.js", icon: <RiNextjsLine /> },
  { name: "React", icon: <FaReact /> },
  { name: "JavaScript", icon: <FaJs /> },
  { name: "Node.js", icon: <FaNodeJs /> },
  { name: "Tailwind", icon: <RiTailwindCssFill /> },
  { name: "Git", icon: <FaGit /> },
];
const defaultFiles = [
  { name: "homepage.jpg", size: "231kB", preview: previewPlaceholders[0] },
  { name: "archive view.jpg", size: "231kB", preview: previewPlaceholders[1] },
  {
    name: "user-facing part.jpg",
    size: "231kB",
    preview: previewPlaceholders[2],
  },
  {
    name: "dashboard home view.jpg",
    size: "231kB",
    preview: previewPlaceholders[3],
  },
];

export default function ProjectDetails({
  project,
  onBack,
}: ProjectDetailsProps) {
  const [previewIndex, setPreviewIndex] = useState<number | null>(null);
  const techList: TechListItem[] = project.technologies?.length
    ? project.technologies.map((name) => ({
        name,
        icon: techIcons[name] ?? (
          <span className="title12 text-primary">{name}</span>
        ),
      }))
    : defaultTech;
  const files = project.files?.length ? project.files : defaultFiles;
  const aboutText =
    project.about ??
    "The team has encountered several challenges during the development process, including unexpected system crashes, hardware malfunctions, and unanticipated compatibility issues.";
  const previewImages = useMemo(
    () =>
      files.map((file, index) => ({
        src:
          file.preview ??
          previewPlaceholders[index % previewPlaceholders.length],
        alt: `${project.title} - ${file.name}`,
        label: file.name,
      })),
    [files, project.title]
  );

  return (
    <>
      <div className="w-full px-4 sm:px-6 xl:px-10 2xl:px-[6%]">
        <div className="flex flex-col gap-6">
          <h1 className="title18 text-center">Creations</h1>
          <div className="grid w-full grid-cols-1 gap-4 md:grid-cols-[360px_minmax(0,1fr)] lg:grid-cols-[360px_minmax(0,1fr)]">
            <div className="flex flex-col gap-4">
              <div className="w-full border border-white/10 p-2.5 flex flex-col gap-3">
                <div className="w-full flex flex-col gap-2">
                  <Badge
                    label="Details"
                    variant="active"
                    labelClassName="title14 font-iceland font-normal"
                  />
                  <div className="space-y-1">
                    <p className="title14">Project name</p>
                    <p className="title18 font-big font-bold text-primary">
                      {project.title}
                    </p>
                  </div>
                </div>
                <div className="h-0.5 w-full bg-white/10" />
                <div className="flex flex-col gap-1">
                  <p className="title14">Brief</p>
                  <p className="title18 font-big font-bold text-primary">
                    {project.brief ??
                      "One sentence explanation for what the project is."}
                  </p>
                </div>
              </div>
              <div className="w-full border border-white/10 p-2.5 flex flex-col gap-3">
                <Badge
                  label="Technologies"
                  variant="active"
                  labelClassName="title14 font-iceland font-normal"
                />
                <div className="flex flex-wrap items-center gap-1">
                  {techList.map((tech) => (
                    <div
                      key={tech.name}
                      className="relative flex flex-col items-center justify-center h-16 w-16 max-h-16 max-w-16 text-primary text-3xl"
                    >
                      <svg
                        width="100%"
                        height="100%"
                        viewBox="0 0 52 60"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                        className="absolute z-0"
                      >
                        <path
                          d="M51.4614 15.2881V44.7109L25.981 59.4229L0.500488 44.7109V15.2881L25.981 0.576172L51.4614 15.2881Z"
                          stroke="var(--color-primary)"
                        />
                      </svg>
                      {tech.icon}
                    </div>
                  ))}
                </div>
              </div>
              <div className="w-full px-2.5">
                <div className="flex flex-col gap-3">
                  <p className="title14">About:</p>
                  <p className="title14 !text-info-light whitespace-pre-line leading-relaxed">
                    {aboutText}
                  </p>
                  <button
                    type="button"
                    className="w-max text-xs uppercase tracking-[0.18em] text-primary underline"
                  >
                    + Expand
                  </button>
                </div>
              </div>
            </div>
            <div className="flex flex-col gap-4">
              <BoxStack className="!bg-dark">
                <Badge
                  label="File Xplorer"
                  variant="light"
                  className="w-full h-8"
                  labelClassName="text-white"
                >
                  <button
                    type="button"
                    onClick={onBack}
                    className="text-primary hover:text-primary-70 ml-auto"
                    aria-label="Close details"
                  >
                    <IoClose className="text-2xl" />
                  </button>
                </Badge>
                <div className="flex items-center gap-2 border-b border-t border-white/10 px-4 py-2 text-sm uppercase tracking-[0.16em] text-info-light">
                  <HiOutlineFolder className="text-lg" />
                  <span>Location:</span>
                  <span className="text-primary">/projects/{project.id}</span>
                </div>
                <div className="flex flex-col sm:flex-row md:flex-col xl:flex-row flex-wrap items-stretch gap-4 p-3">
                  {files.map((file, index) => (
                    <button
                      key={file.name}
                      type="button"
                      onClick={() => setPreviewIndex(index)}
                      className="flex flex-1 sm:basis-[calc(50%-16px)] md:basis-full xl:basis-[calc(50%-16px)] 2xl:basis-[calc(33.33%-16px)] items-center justify-between gap-3 rounded-sm transition hover:bg-primary-10 cursor-pointer"
                    >
                      <div className="flex items-center gap-3 text-left">
                        <span className="flex h-12 w-12 min-h-12 min-w-12 items-center justify-center bg-primary-30 rounded-sm">
                          <LuImage className="text-primary text-2xl" />
                        </span>
                        <div className="flex flex-col leading-tight !text-info-light">
                          <h1 className="title16">{file.name}</h1>
                          <p className="title16">{file.size}</p>
                        </div>
                      </div>
                    </button>
                  ))}
                </div>
              </BoxStack>

              <div className="flex flex-col xl:flex-row items-center justify-between gap-3">
                <Button label="View Project Demo" className="xl:w-max px-4 py-2" />
                <Button
                  label="Back to all projects"
                  variant="outlined"
                  className="xl:w-max px-4 py-2"
                  onClick={onBack}
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      {previewIndex !== null ? (
        <PreviewingImage
          images={previewImages}
          projectTitle={project.title}
          liveLink={project.link}
          initialIndex={previewIndex}
          onClose={() => setPreviewIndex(null)}
        />
      ) : null}
    </>
  );
}
