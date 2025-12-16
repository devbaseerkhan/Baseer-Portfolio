"use client";

import { useEffect, useMemo, useState } from "react";
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
  root.style.setProperty("--color-primary-90", `rgba(${r}, ${g}, ${b}, 0.9)`);
  root.style.setProperty("--color-primary-70", `rgba(${r}, ${g}, ${b}, 0.7)`);
  root.style.setProperty("--color-primary-50", `rgba(${r}, ${g}, ${b}, 0.5)`);
  root.style.setProperty("--color-primary-30", `rgba(${r}, ${g}, ${b}, 0.3)`);
  root.style.setProperty("--color-primary-20", `rgba(${r}, ${g}, ${b}, 0.2)`);
  root.style.setProperty("--color-primary-10", `rgba(${r}, ${g}, ${b}, 0.1)`);
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
  const [activeKey, setActiveKey] = useState<ThemeKey>(getInitialKey);

  const activeColor = useMemo(
    () => themeOptions.find((theme) => theme.key === activeKey)?.color ?? "#e84a4a",
    [activeKey],
  );

  useEffect(() => {
    applyPrimaryColor(activeColor);
    window.localStorage.setItem("theme-primary-key", activeKey);
  }, [activeColor, activeKey]);

  return (
    <div className="fixed bottom-4 lg:left-6 xl:left-10 2xl:left-20 z-50">
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
        className="relative flex h-12 w-12 items-center justify-center cursor-pointer rounded-full border-2 border-white/20 bg-primary shadow-lg shadow-black/40 transition hover:scale-105 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-black"
        style={{ backgroundColor: activeColor }}
        aria-label="Toggle theme color"
      >
        <MdPalette className="text-xl text-white" />
        <span className="absolute -top-1 -right-1 inline-block h-3 w-3 rounded-full border border-black bg-white" />
      </button>
    </div>
  );
}
