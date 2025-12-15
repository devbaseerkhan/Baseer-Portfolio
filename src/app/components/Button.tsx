import Image from "next/image";
import type { ButtonHTMLAttributes, ReactNode } from "react";

type ButtonVariant = "outlined" | "contained";

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  label: ReactNode;
  variant?: ButtonVariant;
  icon?: ReactNode;
  imgSrc?: string | undefined;
  className?: string;
};

const variantClasses: Record<ButtonVariant, string> = {
  outlined:
    "border-[var(--color-primary)] text-primary bg-transparent",
  contained:
    "border-[var(--color-primary)] bg-primary text-dark",
};

export default function Button({
  label,
  variant = "contained",
  icon,
  imgSrc,
  className = "",
  type = "button",
  ...rest
}: ButtonProps) {
  const hasDecoration = Boolean(icon || imgSrc);
  const justifyClass = hasDecoration ? "justify-between" : "justify-center";

  return (
    <button
      type={type}
      className={`inline-flex w-full items-center ${justifyClass} gap-3 px-2.5 uppercase font-big text-lg font-bold tracking-[0.18em] border transition duration-150 hover:translate-y-px active:translate-y-0 ${variantClasses[variant]} ${className}`}
      {...rest}
    >
      <span>
        {label}
      </span>

      {hasDecoration ? (
        <span className="flex items-center justify-center">
          {icon ? (
            icon
          ) : (
            <Image
              src={imgSrc}
              alt="btn icon"
              className="h-5 w-5 object-contain"
              loading="lazy"
            />
          )}
        </span>
      ) : null}
    </button>
  );
}
