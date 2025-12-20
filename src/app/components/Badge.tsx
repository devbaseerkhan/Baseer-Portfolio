import Image from "next/image";
import type { ReactNode } from "react";
import hexIcon from "../../../public/hexa.png";

type BadgeVariant = "default" | "active" | "inactive" | "light";

type BadgeProps = {
  label: ReactNode;
  variant?: BadgeVariant;
  className?: string;
  labelClassName?: string;
  children?: ReactNode;
};

type VariantStyles = {
  container: string;
};

const variantStyles: Record<BadgeVariant, VariantStyles> = {
  default: {
    container: "bg-primary-70 text-dark font-big text-lg font-bold",
  },
  active: {
    container: "bg-primary-70 text-white font-big text-lg font-bold",
  },
  inactive: {
    container: "bg-light/70 text-white font-big text-lg font-bold",
  },
  light: {
    container: "bg-primary-10 text-info-light font-iceland text-sm",
  },
};

export default function Badge({
  label,
  variant = "default",
  className = "",
  labelClassName,
  children,
}: BadgeProps) {
  const { container } = variantStyles[variant];

  return (
    <div
      className={`relative isolate inline-flex h-6 items-center overflow-hidden px-2.5 uppercase tracking-[0.16em] transition-all duration-200 ${container} ${className}`}
    >
      <span className={labelClassName}>{label}</span>
      {variant === "light" || (
        <Image
          src={hexIcon}
          alt="hexaicon"
          className="w-7 h-full absolute right-0"
        />
      )}
      {children}
    </div>
  );
}
