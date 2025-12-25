"use client";

import { useEffect } from "react";
import { IoClose } from "react-icons/io5";
import BoxStack from "./boxStack";
import UserSvg from "./userSvg";

type WhoIsBaseerProps = {
  open: boolean;
  onClose: () => void;
};

export default function WhoIsBaseer({ open, onClose }: WhoIsBaseerProps) {
  useEffect(() => {
    if (!open) return undefined;
    const handleKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [open, onClose]);

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black/70 lg:bg-black/10 backdrop-blur py-6 px-[4%] xl:px-[8%] 2xl:px-[15%] flex justify-center items-center">
      <div className="relative max-h-[90%] overflow-y-auto flex flex-col lg:gap-14 border border-primary bg-primary-10 backdrop-blur-sm">
        <div className="w-full sticky top-0 bg-black/70 lg:bg-primary-10 px-4 md:px-8 py-2 md:py-4 backdrop-blur">
          <div className="flex items-start justify-center gap-3 relative">
            <div className="space-y-1 text-center">
              <p className="title16">The short introduction of my life</p>
              <h2 className="text-xl sm:text-2xl lg:text-4xl font-big font-bold uppercase tracking-[0.2em] text-primary">
                Who is Baseer Ahmed Khan
              </h2>
            </div>
            <button
              type="button"
              onClick={onClose}
              className="absolute top-0 right-0 flex h-10 w-10 items-center justify-center border border-white/20 bg-black/30 text-white/70 transition hover:border-primary hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-dark"
              aria-label="Close bio modal"
            >
              <IoClose className="text-2xl" />
            </button>
          </div>
        </div>
        <div className="w-full p-4 md:p-8">
          <div className="grid gap-8 xl:gap-14 lg:grid-cols-[1.05fr_347px] 2xl:px-[6%]">
            <div className="flex flex-col gap-10">
              <section className="grid grid-cols-1 xl:grid-cols-[180px_1fr] gap-4 xl:gap-7">
                <h3 className="title16 !text-info-light xl:text-right">
                  Career and development
                </h3>
                <p className="title18">
                  I have always been fascinated by how digital experiences can
                  make life easier and more delightful. From frontend frameworks
                  like React and Next.js to backend services and automation, I
                  build resilient web products that are quick, expressive, and
                  accessible. I stay sharp by exploring new tools, refining
                  craft, and shipping often.
                </p>
              </section>

              <section className="grid grid-cols-1 xl:grid-cols-[180px_1fr] gap-4 xl:gap-7">
                <h3 className="title16 !text-info-light xl:text-right">
                  Problem solving
                </h3>
                <p className="title18">
                  My priority is reliability and clarity. I love collaborating
                  with cross-functional teams, understanding the constraints,
                  and delivering solutions that balance technical rigor with a
                  bold aesthetic. Strong attention to detail, thoughtful
                  interactions, and pragmatic decisions are my hallmarks.
                </p>
              </section>

              <section className="grid grid-cols-1 xl:grid-cols-[180px_1fr] gap-4 xl:gap-7">
                <h3 className="title16 !text-info-light xl:text-right">
                  Toolset
                </h3>
                <p className="title18">
                  Comfortable across TypeScript, React, Next.js, Tailwind,
                  animations, and modern tooling. I enjoy shaping design
                  systems, building immersive UI states, and keeping performance
                  budgets in check.
                </p>
              </section>
            </div>
            <BoxStack className="h-full max-h-110 2xl:max-h-173.5 w-full flex justify-center items-center !bg-black backdrop-blur-2xl">
              <UserSvg />
            </BoxStack>
          </div>
        </div>
      </div>
    </div>
  );
}
