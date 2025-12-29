"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import type React from "react";
import Badge from "./Badge";

type TabButtonProps = {
  label: string;
  active?: boolean;
  subtitle?: string;
  className?: string;
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
};

const defaultSubtitle = "Navigate or consolidate launch since 2016";

export default function TabButton({
  label,
  active = false,
  subtitle = defaultSubtitle,
  className = "",
  onClick,
}: TabButtonProps) {
  const [isHovered, setIsHovered] = useState(false);
  const isHighlighted = active || isHovered;
  const audioCtxRef = useRef<AudioContext | null>(null);
  const soundEnabledRef = useRef(true);

  useEffect(() => {
    if (typeof window === "undefined" || typeof AudioContext === "undefined") {
      return undefined;
    }
    audioCtxRef.current = new AudioContext();
    const handleToggle = (event: Event) => {
      const detail =
        (event as CustomEvent<{ enabled: boolean }>).detail?.enabled ?? true;
      soundEnabledRef.current = detail;
    };
    window.addEventListener("button-sfx-toggle", handleToggle);
    return () => {
      audioCtxRef.current?.close();
      audioCtxRef.current = null;
      window.removeEventListener("button-sfx-toggle", handleToggle);
    };
  }, []);

  const playTone = useCallback((frequency: number, duration = 0.12) => {
    if (!soundEnabledRef.current) return;
    const ctx = audioCtxRef.current;
    if (!ctx) return;
    const now = ctx.currentTime;
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.type = "triangle";
    osc.frequency.value = frequency;
    gain.gain.setValueAtTime(0, now);
    gain.gain.linearRampToValueAtTime(0.1, now + 0.02);
    gain.gain.exponentialRampToValueAtTime(0.0001, now + duration);
    osc.connect(gain);
    gain.connect(ctx.destination);
    osc.start(now);
    osc.stop(now + duration);
  }, []);

  const handleMouseEnter = () => {
    playTone(950, 0.09);
    setIsHovered(true);
  };

  const handleClick: TabButtonProps["onClick"] = (event) => {
    playTone(640, 0.12);
    onClick?.(event);
  };

  return (
    <button
      type="button"
      onClick={handleClick}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={() => setIsHovered(false)}
      onFocus={() => {
        playTone(950, 0.09);
        setIsHovered(true);
      }}
      onBlur={() => setIsHovered(false)}
      className={`border-l-2 transition hover:border-primary-70 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-dark cursor-pointer ${
        isHighlighted ? "border-primary" : "border-light"
      } ${className}`}
      aria-pressed={active}
    >
      <Badge
        label={label}
        variant={isHighlighted ? "active" : "inactive"}
        className="w-full"
      />
      {subtitle ? (
        <span className="block text-xs tracking-widest leading-3 uppercase text-white/50 font-iceland text-left p-2 bg-border/10">
          {subtitle}
        </span>
      ) : null}
    </button>
  );
}
