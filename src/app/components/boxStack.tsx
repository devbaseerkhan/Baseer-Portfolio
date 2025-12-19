type BoxStackProps = {
  className?: string;
  children?: React.ReactNode;
  lg?: boolean;
};

const cornerClass =
  "pointer-events-none absolute border-[1.5px] border-[var(--color-primary)]";

export default function BoxStack({
  className = "",
  lg = false,
  children,
}: BoxStackProps) {
  return (
    <div
      className={`relative h-full w-full border border-white/10 bg-transparent ${className}`}
    >
      <span
        className={`${cornerClass} -left-[0.75px] -top-[0.75px] border-b-0 border-r-0 ${
          lg ? "h-5 w-5" : "h-3 w-3"
        }`}
        aria-hidden
      />
      <span
        className={`${cornerClass} -right-[0.75px] -top-[0.75px] border-b-0 border-l-0 ${
          lg ? "h-5 w-5" : "h-3 w-3"
        }`}
        aria-hidden
      />
      <span
        className={`${cornerClass} -bottom-[0.75px] -left-[0.75px] border-r-0 border-t-0 ${
          lg ? "h-5 w-5" : "h-3 w-3"
        }`}
        aria-hidden
      />
      <span
        className={`${cornerClass} -bottom-[0.75px] -right-[0.75px] border-l-0 border-t-0 ${
          lg ? "h-5 w-5" : "h-3 w-3"
        }`}
        aria-hidden
      />
      {children}
    </div>
  );
}
