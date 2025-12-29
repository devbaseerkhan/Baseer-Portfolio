"use client";

import {
  useCallback,
  useEffect,
  useRef,
  type ButtonHTMLAttributes,
  type ReactNode,
} from "react";

type ButtonVariant = "outlined" | "contained";

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  label: ReactNode;
  variant?: ButtonVariant;
  icon?: ReactNode;
  className?: string;
};

const variantClasses: Record<ButtonVariant, string> = {
  outlined: "border-[var(--color-primary)] text-primary bg-transparent",
  contained: "border-[var(--color-primary)] bg-primary text-dark",
};

export default function Button({
  label,
  variant = "contained",
  icon,
  className = "",
  type = "button",
  onMouseEnter,
  onClick,
  ...rest
}: ButtonProps) {
  const hasDecoration = Boolean(icon);
  const justifyClass = hasDecoration ? "justify-between" : "justify-center";
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
    osc.type = "square";
    osc.frequency.value = frequency;
    gain.gain.setValueAtTime(0, now);
    gain.gain.linearRampToValueAtTime(0.12, now + 0.02);
    gain.gain.exponentialRampToValueAtTime(0.0001, now + duration);
    osc.connect(gain);
    gain.connect(ctx.destination);
    osc.start(now);
    osc.stop(now + duration);
  }, []);

  const handleMouseEnter: ButtonProps["onMouseEnter"] = (event) => {
    playTone(760, 0.1);
    onMouseEnter?.(event);
  };

  const handleClick: ButtonProps["onClick"] = (event) => {
    playTone(520, 0.14);
    onClick?.(event);
  };

  return (
    <button
      type={type}
      className={`inline-flex w-full items-center ${justifyClass} cursor-pointer gap-1.5 lg:gap-3 px-1.5 lg:px-2.5 uppercase font-big text-lg font-bold tracking-[0.18em] border transition duration-150 hover:translate-y-px active:translate-y-0 ${variantClasses[variant]} ${className}`}
      onMouseEnter={handleMouseEnter}
      onClick={handleClick}
      {...rest}
    >
      <span>{label}</span>

      {hasDecoration ? (
        <span className="flex items-center justify-center">{icon && icon}</span>
      ) : null}
    </button>
  );
}
