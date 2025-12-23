"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { IoSettingsOutline } from "react-icons/io5";
import { IoClose } from "react-icons/io5";
import QuestBlock from "./questBlock";

export default function QuestDrawer() {
  const [open, setOpen] = useState<boolean>(false);
  const [mounted, setMounted] = useState<boolean>(false);
  const [animateIn, setAnimateIn] = useState<boolean>(false);
  const rafRef = useRef<number | null>(null);
  const timeoutRef = useRef<number | null>(null);

  useEffect(() => {
    return () => {
      if (rafRef.current !== null) window.cancelAnimationFrame(rafRef.current);
      if (timeoutRef.current !== null) window.clearTimeout(timeoutRef.current);
    };
  }, []);

  const clearTimers = useCallback(() => {
    if (rafRef.current !== null) {
      window.cancelAnimationFrame(rafRef.current);
      rafRef.current = null;
    }
    if (timeoutRef.current !== null) {
      window.clearTimeout(timeoutRef.current);
      timeoutRef.current = null;
    }
  }, []);

  const openDrawer = useCallback(() => {
    clearTimers();
    setMounted(true);
    setOpen(true);
    rafRef.current = window.requestAnimationFrame(() => setAnimateIn(true));
  }, [clearTimers]);

  const closeDrawer = useCallback(() => {
    clearTimers();
    setAnimateIn(false);
    setOpen(false);
    timeoutRef.current = window.setTimeout(() => setMounted(false), 300);
  }, [clearTimers]);

  useEffect(() => {
    if (!open) return undefined;
    const handleKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") closeDrawer();
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [closeDrawer, open]);

  return (
    <>
      <button
        type="button"
        onClick={() => (open ? closeDrawer() : openDrawer())}
        className="fixed bottom-4 lg:right-6 xl:right-10 2xl:right-20 z-50 flex h-12 w-12 items-center justify-center cursor-pointer rounded-full border-2 border-white/20 bg-primary text-white shadow-lg shadow-black/40 transition hover:scale-105 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-black 2xl:hidden"
        aria-label={open ? "Close quests" : "Open quests"}
      >
        <IoSettingsOutline className="text-2xl" />
      </button>

      {mounted ? (
        <div
          className={`fixed inset-0 z-40 flex justify-end bg-black/50 backdrop-blur-sm transition-opacity duration-300 2xl:hidden ${
            animateIn ? "opacity-100" : "opacity-0 pointer-events-none"
          }`}
          aria-label="Quest drawer"
        >
          <button
            type="button"
            onClick={closeDrawer}
            className="absolute inset-0 cursor-default"
            aria-hidden
          />
          <div
            className={`relative h-full w-[min(90vw,360px)] bg-black/85 border-l border-white/10 shadow-[0_0_40px_rgba(0,0,0,0.6)] transition-transform duration-300 transform-gpu ${
              animateIn ? "translate-x-0" : "translate-x-full"
            }`}
          >
            <div className="flex items-center justify-between border-b border-white/10 px-4 py-3">
              <p className="title14">Active Quest</p>
              <button
                type="button"
                onClick={closeDrawer}
                className="flex h-9 w-9 items-center justify-center rounded-sm border border-white/20 bg-white/5 text-white/80 transition hover:border-primary hover:text-white"
                aria-label="Close quests drawer"
              >
                <IoClose className="text-xl" />
              </button>
            </div>
            <div className="h-[calc(100%-56px)] overflow-y-auto p-4">
              <QuestBlock />
            </div>
          </div>
        </div>
      ) : null}
    </>
  );
}
