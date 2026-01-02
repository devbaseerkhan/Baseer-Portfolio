"use client";

import { useEffect, useState } from "react";
import { IoClose } from "react-icons/io5";
import BoxStack from "./boxStack";
import UserSvg from "./userSvg";
import { fetchProfile } from "@/lib/contentApi";
import { fallbackProfile } from "@/lib/fallbackContent";
import type { ProfileRecord } from "@/lib/contentTypes";

type WhoIsBaseerProps = {
  open: boolean;
  onClose: () => void;
};

export default function WhoIsBaseer({ open, onClose }: WhoIsBaseerProps) {
  const [profile, setProfile] = useState<ProfileRecord>(fallbackProfile);

  useEffect(() => {
    if (!open) return undefined;
    const handleKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [open, onClose]);

  useEffect(() => {
    let mounted = true;
    fetchProfile()
      .then((result) => {
        if (!mounted) return;
        if (result.data[0]) {
          setProfile({
            ...fallbackProfile,
            ...result.data[0],
          });
        } else {
          setProfile(fallbackProfile);
        }
      })
      .catch(() => {
        setProfile(fallbackProfile);
      });
    return () => {
      mounted = false;
    };
  }, []);

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black/70 lg:bg-black/10 backdrop-blur py-6 px-[4%] xl:px-[8%] 2xl:px-[15%] flex justify-center items-center">
      <div className="relative max-h-[90%] overflow-y-auto flex flex-col lg:gap-14 border border-primary bg-primary-10 backdrop-blur-sm">
        <div className="w-full sticky top-0 bg-black/70 lg:bg-primary-10 px-4 md:px-8 py-2 md:py-4 backdrop-blur z-20">
          <div className="flex items-start justify-center gap-3 relative">
            <div className="space-y-1 text-center">
              <p className="title16">The short introduction of my life</p>
              <h2 className="text-xl sm:text-2xl lg:text-4xl font-big font-bold uppercase tracking-[0.2em] text-primary">
                {profile.who_is ?? "Who is Baseer Ahmed Khan"}
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
                <p className="title18">{profile.career_and_development}</p>
              </section>

              <section className="grid grid-cols-1 xl:grid-cols-[180px_1fr] gap-4 xl:gap-7">
                <h3 className="title16 !text-info-light xl:text-right">
                  Problem solving
                </h3>
                <p className="title18">{profile.problem_solving}</p>
              </section>

              <section className="grid grid-cols-1 xl:grid-cols-[180px_1fr] gap-4 xl:gap-7">
                <h3 className="title16 !text-info-light xl:text-right">
                  Toolset
                </h3>
                <p className="title18">{profile.toolset}</p>
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
