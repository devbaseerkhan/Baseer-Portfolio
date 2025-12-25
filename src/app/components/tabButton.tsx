"use client";

import { useState } from "react";
import Badge from "./Badge";

type TabButtonProps = {
  label: string;
  active?: boolean;
  subtitle?: string;
  className?: string;
  onClick?: () => void;
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

  return (
    <button
      type="button"
      onClick={onClick}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onFocus={() => setIsHovered(true)}
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
