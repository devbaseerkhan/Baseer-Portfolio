"use client";

/* eslint-disable react-hooks/set-state-in-effect */

import { useEffect, useMemo, useState } from "react";

type HeaderProps = React.HTMLAttributes<HTMLElement> & {
  className?: string;
  credits?: boolean;
};

const DEFAULT_LEVEL = 25; // developer-defined level
const BASE_COINS = 500; // starting coins set by developer
const COIN_REWARD = 1; // reward per click
const STORAGE_KEY = "portfolio-coin-balance-v1";
const VISITED_KEY = "portfolio-coin-visited-v1";

export default function Header({
  className = "",
  credits = true,
  ...rest
}: HeaderProps) {
  const [coins, setCoins] = useState(BASE_COINS);
  const [visited, setVisited] = useState(false);
  const [toast, setToast] = useState<string | null>(null);

  // hydrate from localStorage after mount and seed defaults if missing
  useEffect(() => {
    if (typeof window === "undefined") return;
    const storedCoins = Number.parseInt(
      window.localStorage.getItem(STORAGE_KEY) ?? "",
      10,
    );
    const storedVisited = window.localStorage.getItem(VISITED_KEY) === "1";
    const nextCoins = Number.isFinite(storedCoins) ? storedCoins : BASE_COINS;
    setCoins(nextCoins);
    setVisited(storedVisited);
    window.localStorage.setItem(STORAGE_KEY, String(nextCoins));
    window.localStorage.setItem(VISITED_KEY, storedVisited ? "1" : "0");
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const showToast = (message: string) => {
    setToast(message);
    window.setTimeout(() => setToast(null), 2200);
  };

  const addCoins = () => {
    if (visited) {
      showToast("You already visited.");
      return;
    }
    setCoins((prev) => {
      const next = prev + COIN_REWARD;
      window.localStorage.setItem(STORAGE_KEY, String(next));
      window.localStorage.setItem(VISITED_KEY, "1");
      return next;
    });
    setVisited(true);
    showToast(`+${COIN_REWARD} coin added`);
  };

  const formattedCoins = useMemo(
    () => coins.toLocaleString("en-US"),
    [coins],
  );

  return (
    <header
      className={`flex h-20 lg:h-24 items-center justify-between gap-4 ${className}`}
      {...rest}
    >
      <div className="flex items-center gap-3 md:gap-5 lg:gap-11">
        <div className="flex items-baseline gap-1 md:gap-2">
          <span className="text-2xl md:text-[26px] font-big font-bold text-primary ">
            {DEFAULT_LEVEL}
          </span>
          <span className="text-sm md:text-[16px] font-big !text-white/60">Level</span>
        </div>
        <div className="relative flex items-center gap-1.5 md:gap-3">
          <button
            type="button"
            onClick={addCoins}
            className="flex h-8 w-8 items-center justify-center border border-primary bg-white/5 font-big text-xl font-semibold text-primary hover:bg-white/10 transition cursor-pointer"
            aria-label={`Add ${COIN_REWARD} coins`}
            title={`Add ${COIN_REWARD} coins`}
          >
            +
          </button>
          {toast ? (
            <span className="text-sm font-semibold text-primary bg-primary-10 p-2 border border-primary rounded-sm absolute top-9 left-0 z-30">
              {toast}
            </span>
          ) : null}
          <div className="flex items-baseline gap-1 md:gap-2">
            <span
              className="text-2xl md:text-[26px] font-big font-bold text-primary "
              suppressHydrationWarning
            >
              {formattedCoins}
            </span>
            <span className="text-sm md:text-[16px] font-big !text-white/60">
              Coins Awarded
            </span>
          </div>
        </div>
      </div>
      {credits && (
        <div className="flex items-center gap-2 lg:gap-6 title14">
          <span>Credits</span>
          <span>
            <span className="!text-info-light">Server Time:</span> 08:42
          </span>
          <span>
            <span className="!text-info-light">Local Time:</span> 15:42
          </span>
        </div>
      )}
    </header>
  );
}
