"use client";

import type { ReactNode } from "react";
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

const defaultTech: TechListItem[] = [
  { name: "Next.js", icon: <RiNextjsLine /> },
  { name: "React", icon: <FaReact /> },
  { name: "JavaScript", icon: <FaJs /> },
  { name: "Node.js", icon: <FaNodeJs /> },
  { name: "Tailwind", icon: <RiTailwindCssFill /> },
  { name: "Git", icon: <FaGit /> },
];
const defaultFiles = [
  { name: "homepage.jpg", size: "231kB" },
  { name: "archive view.jpg", size: "231kB" },
  { name: "user-facing part.jpg", size: "231kB" },
  { name: "dashboard home view.jpg", size: "231kB" },
];

export default function ProjectDetails({
  project,
  onBack,
}: ProjectDetailsProps) {
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

  return (
    <div className="w-full px-[6%] mt-5">
      <div className="grid w-full grid-cols-1 gap-4 lg:grid-cols-[360px_minmax(0,1fr)]">
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
            <div className="grid gap-4 p-3 sm:grid-cols-2 lg:grid-cols-3">
              {files.map((file) => (
                <div
                  key={file.name}
                  className="flex items-center justify-between gap-3"
                >
                  <div className="flex items-center gap-3">
                    <span className="flex h-12 w-12 items-center justify-center bg-primary-30">
                      <LuImage className="text-primary text-2xl" />
                    </span>
                    <div className="flex flex-col leading-tight !text-info-light">
                      <h1 className="title16">{file.name}</h1>
                      <p className="title16">{file.size}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </BoxStack>

          <div className="flex flex-wrap items-center justify-between gap-3">
            <Button label="View Project Demo" className="w-max" />
            <Button
              label="Back to all projects"
              variant="outlined"
              className="w-max"
              onClick={onBack}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
