"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { MdPalette } from "react-icons/md";

type ThemeKey = "primary" | "success" | "warning" | "secondary";

type ThemeOption = {
  key: ThemeKey;
  label: string;
  color: string;
};

const themeOptions: ThemeOption[] = [
  { key: "primary", label: "Primary", color: "#e84a4a" },
  { key: "success", label: "Success", color: "#5de26a" },
  { key: "warning", label: "Warning", color: "#d4a944" },
  { key: "secondary", label: "Secondary", color: "#429dd1" },
];

function getInitialKey(): ThemeKey {
  if (typeof window === "undefined") return "primary";
  const saved = window.localStorage.getItem("theme-primary-key") as ThemeKey | null;
  if (saved && themeOptions.some((option) => option.key === saved)) {
    return saved;
  }
  return "primary";
}

function hexToRgb(hex: string) {
  const normalized = hex.replace("#", "");
  const bigint = parseInt(normalized, 16);
  const r = (bigint >> 16) & 255;
  const g = (bigint >> 8) & 255;
  const b = bigint & 255;
  return { r, g, b };
}

function applyPrimaryColor(color: string) {
  if (typeof document === "undefined") return;
  const root = document.documentElement;
  const { r, g, b } = hexToRgb(color);

  root.style.setProperty("--color-primary", color);
  root.style.setProperty("--color-primary-rgb", `${r}, ${g}, ${b}`);
  root.style.setProperty("--color-primary-90", `rgba(${r}, ${g}, ${b}, 0.9)`);
  root.style.setProperty("--color-primary-70", `rgba(${r}, ${g}, ${b}, 0.7)`);
  root.style.setProperty("--color-primary-50", `rgba(${r}, ${g}, ${b}, 0.5)`);
  root.style.setProperty("--color-primary-30", `rgba(${r}, ${g}, ${b}, 0.3)`);
  root.style.setProperty("--color-primary-20", `rgba(${r}, ${g}, ${b}, 0.2)`);
  root.style.setProperty("--color-primary-10", `rgba(${r}, ${g}, ${b}, 0.1)`);
  root.style.setProperty(
    "--color-primary-linear",
    `linear-gradient(270deg, rgba(${r}, ${g}, ${b}, 0.14) 0%, rgba(${r}, ${g}, ${b}, 0) 100%)`,
  );
  root.style.setProperty(
    "--color-primary-glow-1",
    `radial-gradient(circle at 4% 98%, rgba(${r}, ${g}, ${b}, 0.3), transparent 10%)`,
  );
  root.style.setProperty(
    "--color-primary-glow-2",
    `radial-gradient(circle at 95% 0%, rgba(${r}, ${g}, ${b}, 0.3), transparent 10%)`,
  );
  root.style.setProperty(
    "--color-primary-glow-3",
    `radial-gradient(circle at 50% 50%, rgba(${r}, ${g}, ${b}, 0.25), transparent 50%)`,
  );
}

export default function ThemeSwitcher() {
  const [open, setOpen] = useState(false);
  const [trayOpen, setTrayOpen] = useState(false);
  const [hovered, setHovered] = useState(false);
  const [activeKey, setActiveKey] = useState<ThemeKey>(getInitialKey);
  const containerRef = useRef<HTMLDivElement | null>(null);

  const activeColor = useMemo(
    () => themeOptions.find((theme) => theme.key === activeKey)?.color ?? "#e84a4a",
    [activeKey],
  );

  useEffect(() => {
    applyPrimaryColor(activeColor);
    window.localStorage.setItem("theme-primary-key", activeKey);
  }, [activeColor, activeKey]);

  const expanded = trayOpen || hovered;
  const slideClass = expanded
    ? "translate-x-0"
    : "-translate-x-[calc(100%-14px)]";

  useEffect(() => {
    if (!trayOpen) return undefined;
    const handlePointer = (event: PointerEvent) => {
      if (!containerRef.current) return;
      if (!containerRef.current.contains(event.target as Node)) {
        setTrayOpen(false);
        setOpen(false);
      }
    };
    document.addEventListener("pointerdown", handlePointer);
    return () => document.removeEventListener("pointerdown", handlePointer);
  }, [trayOpen]);

  const handleBarToggle = () => {
    setTrayOpen((prev) => {
      const next = !prev;
      setOpen(next);
      return next;
    });
  };

  return (
    <div
      className="group fixed left-0 top-1/2 z-50 w-56 -translate-y-1/2 lg:top-auto lg:bottom-4 lg:left-6 xl:left-10 2xl:left-20 lg:translate-y-0 lg:w-auto"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      ref={containerRef}
    >
      <div
        className={`relative flex items-center transition-transform duration-200 ease-out ${slideClass} lg:translate-x-0`}
      >
        <div className="flex flex-col items-start">
          {open && (
            <div className="mb-3 w-48 rounded-2xl border border-primary bg-black/70 p-3 shadow-xl backdrop-blur-md">
              <p className="mb-2 text-sm uppercase tracking-[0.16em] text-primary">
                Choose Accent
              </p>
              <div className="flex flex-col gap-2">
                {themeOptions.map((option) => {
                  const isActive = option.key === activeKey;
                  return (
                    <button
                      key={option.key}
                      type="button"
                      onClick={() => setActiveKey(option.key)}
                      className={`flex items-center gap-2 rounded-lg border px-2 py-2 text-xs uppercase tracking-[0.12em] transition cursor-pointer ${
                        isActive ? "border-primary bg-primary-10 text-white" : "border-white/10 bg-white/5 text-white/80"
                      }`}
                    >
                      <span
                        className="inline-block h-4 w-4 rounded-full border border-white/20"
                        style={{ backgroundColor: option.color }}
                      />
                      <span>{option.label}</span>
                    </button>
                  );
                })}
              </div>
            </div>
          )}
          <button
            type="button"
            onClick={() => setOpen((prev) => !prev)}
            className="relative hidden h-12 w-12 items-center justify-center cursor-pointer rounded-full border-2 border-white/20 bg-primary shadow-lg shadow-black/40 transition hover:scale-105 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-black lg:flex"
            style={{ backgroundColor: activeColor }}
            aria-label="Toggle theme color"
          >
            <MdPalette className="text-3xl text-white" />
            <span className="absolute -top-1 -right-1 inline-block h-3 w-3 rounded-full border border-black bg-white" />
          </button>
        </div>
      </div>
      <button
        type="button"
        onClick={handleBarToggle}
        className="absolute left-0 top-1/2 flex h-12 w-3 rounded-tr-2xl rounded-br-2xl -translate-y-1/2 cursor-pointer items-center justify-center bg-primary shadow-[0_0_12px_rgba(0,0,0,0.45)] transition-opacity duration-200 hover:opacity-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-black lg:hidden"
        aria-label="Toggle theme switcher tray"
      />
    </div>
  );
}
