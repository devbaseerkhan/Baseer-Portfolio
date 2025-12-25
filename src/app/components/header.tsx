type HeaderProps = React.HTMLAttributes<HTMLElement> & {
  className?: string;
};

export default function Header({ className = "", ...rest }: HeaderProps) {
  return (
    <header
      className={`flex h-20 lg:h-24 items-center justify-between gap-4 ${className}`}
      {...rest}
    >
      <div className="flex items-center gap-5 lg:gap-11">
        <div className="flex items-baseline gap-2">
          <span className="font-big title26 font-bold text-primary ">48</span>
          <span className="title16 font-big !text-white/60">Level</span>
        </div>
        <div className="flex items-center gap-3">
          <button className="flex h-8 w-8 items-center justify-center border border-white/20 bg-white/5 font-big text-lg font-semibold text-white">
            +
          </button>
          <div className="flex items-baseline gap-2">
            <span className="font-big title26 font-bold text-primary ">
              1,425
            </span>
            <span className="title16 font-big !text-white/60">
              Coins Awarded
            </span>
          </div>
        </div>
      </div>
      <div className="flex items-center gap-2 lg:gap-6 title14">
        <span>Credits</span>
        <span>
          <span className="!text-info-light">Server Time:</span> 08:42
        </span>
        <span>
          <span className="!text-info-light">Local Time:</span> 15:42
        </span>
      </div>
    </header>
  );
}
