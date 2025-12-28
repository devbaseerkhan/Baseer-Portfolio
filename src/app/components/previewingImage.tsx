"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { IoChevronBack, IoChevronForward, IoClose } from "react-icons/io5";
import Button from "./Button";

type PreviewImage = {
  src: string;
  alt?: string;
  label?: string;
};

type PreviewingImageProps = {
  images: PreviewImage[];
  projectTitle: string;
  onClose: () => void;
  liveLink?: string;
  initialIndex?: number;
};

export default function PreviewingImage({
  images,
  projectTitle,
  onClose,
  liveLink,
  initialIndex = 0,
}: PreviewingImageProps) {
  const totalImages = images?.length ?? 0;
  const safeInitial = totalImages
    ? Math.min(Math.max(initialIndex, 0), totalImages - 1)
    : 0;
  const [activeIndex, setActiveIndex] = useState(safeInitial);

  useEffect(() => {
    setActiveIndex(safeInitial);
  }, [safeInitial]);

  useEffect(() => {
    if (!totalImages) return undefined;
    const handleKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
      if (event.key === "ArrowRight") {
        setActiveIndex((prevIndex) =>
          prevIndex === totalImages - 1 ? 0 : prevIndex + 1
        );
      }
      if (event.key === "ArrowLeft") {
        setActiveIndex((prevIndex) =>
          prevIndex === 0 ? totalImages - 1 : prevIndex - 1
        );
      }
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [onClose, totalImages]);

  if (!totalImages) return null;

  const prev = () =>
    setActiveIndex((prevIndex) =>
      prevIndex === 0 ? totalImages - 1 : prevIndex - 1
    );
  const next = () =>
    setActiveIndex((prevIndex) =>
      prevIndex === totalImages - 1 ? 0 : prevIndex + 1
    );

  const openLive = () => {
    if (!liveLink) return;
    window.open(liveLink, "_blank", "noopener,noreferrer");
  };

  const current = images[activeIndex] ?? images[0];

  return (
    <div className="fixed inset-0 z-50 bg-black/10 backdrop-blur-sm overflow-y-auto">
      <div className="flex items-center justify-center min-h-full w-full">
        <div className="relative w-full h-max flex flex-col justify-center gap-9 max-w-6xl mx-auto py-10 px-5">
          <div className="flex flex-col items-center gap-1 text-center">
            <p className="title16">Previewing images from</p>
            <h2 className="text-4xl sm:text-5xl font-big font-bold text-primary tracking-[0.16em]">
              {projectTitle}
            </h2>
          </div>
          <div className="relative">
            <div className="absolute left-0 right-0 top-0 h-1 bg-[radial-gradient(circle_at_18%_0%,rgba(232,74,74,0.45),transparent_32%),radial-gradient(circle_at_84%_0%,rgba(66,157,209,0.35),transparent_32%)] opacity-70" />
            <div className="relative overflow-hidden rounded-sm border border-white/10 bg-gradient-to-br from-[#0d1b28]/70 via-[#05111b]/70 to-[#0c0a0f]/80">
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_30%,rgba(232,74,74,0.16),transparent_36%),radial-gradient(circle_at_82%_16%,rgba(66,157,209,0.18),transparent_32%),radial-gradient(circle_at_50%_78%,rgba(232,74,74,0.12),transparent_42%)]" />
              <div className="relative aspect-video w-full">
                <Image
                  src={current.src}
                  alt={current.alt ?? `${projectTitle} preview`}
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, 80vw"
                  priority
                />
              </div>
              <div className="absolute inset-y-0 left-0 flex items-center">
                <button
                  type="button"
                  onClick={prev}
                  className="sm:ml-3 flex h-8 w-8 sm:h-12 sm:w-12 items-center justify-center rounded-full border border-white/20 bg-black/20 text-white/50 transition hover:border-white hover:text-white"
                  aria-label="Previous image"
                >
                  <IoChevronBack className="text-xl sm:text-2xl" />
                </button>
              </div>
              <div className="absolute inset-y-0 right-0 flex items-center">
                <button
                  type="button"
                  onClick={next}
                  className="sm:mr-3 flex h-8 w-8 sm:h-12 sm:w-12 items-center justify-center rounded-full border border-white/20 bg-black/20 text-white/50 transition hover:border-white hover:text-white"
                  aria-label="Next image"
                >
                  <IoChevronForward className="text-xl sm:text-2xl" />
                </button>
              </div>
            </div>

            <div className="mt-5 flex flex-wrap flex-col sm:flex-row sm:items-center justify-between gap-3">
              <span className="title16">
                {activeIndex + 1} of {totalImages}
                {current.label ? ` — ${current.label}` : ""}
              </span>
              <div className="flex flex-wrap flex-col sm:flex-row items-center gap-3">
                {liveLink ? (
                  <Button
                    label="View project live"
                    onClick={openLive}
                    className="w-full sm:w-max px-4 sm:py-2"
                  />
                ) : null}
                <Button
                  label="Close [ESC]"
                  variant="outlined"
                  onClick={onClose}
                  className="w-full sm:w-max px-4 sm:py-2"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
