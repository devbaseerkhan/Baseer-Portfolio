"use client";

/* eslint-disable react-hooks/set-state-in-effect */

import { useEffect, useMemo, useState } from "react";
import { fetchProfile, updateProfileCoins } from "@/lib/contentApi";
import { fallbackProfile } from "@/lib/fallbackContent";
import type { ProfileRecord } from "@/lib/contentTypes";

type HeaderProps = React.HTMLAttributes<HTMLElement> & {
  className?: string;
  credits?: boolean;
};

const DEFAULT_LEVEL = 25; // developer-defined level
const DEFAULT_BASE_COINS = 500; // starting coins set by developer
const DEFAULT_REWARD = 1; // reward per click
const VISITED_KEY = "portfolio-coin-visited-v1";

export default function Header({
  className = "",
  credits = true,
  ...rest
}: HeaderProps) {
  const [profile, setProfile] = useState<ProfileRecord | null>(null);
  const resolvedLevel = profile?.level ?? fallbackProfile.level ?? DEFAULT_LEVEL;
  const baseCoins =
    profile?.base_coins ?? fallbackProfile.base_coins ?? DEFAULT_BASE_COINS;
  const coinReward =
    profile?.coin_reward_per_click ??
    fallbackProfile.coin_reward_per_click ??
    DEFAULT_REWARD;

  const visitedKey = `${VISITED_KEY}-${profile?.id ?? "default"}`;

  const [coins, setCoins] = useState(
    profile?.coin_balance ??
      fallbackProfile.coin_balance ??
      baseCoins,
  );
  const [visited, setVisited] = useState(false);
  const [toast, setToast] = useState<string | null>(null);
  const [saving, setSaving] = useState(false);

  // hydrate visited flag per profile
  useEffect(() => {
    if (typeof window === "undefined") return;
    const storedVisited = window.localStorage.getItem(visitedKey) === "1";
    setVisited(storedVisited);
    window.localStorage.setItem(visitedKey, storedVisited ? "1" : "0");
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [visitedKey]);

  useEffect(() => {
    let mounted = true;
    fetchProfile()
      .then((result) => {
        if (!mounted) return;
        if (result.data[0]) {
          setProfile(result.data[0]);
        } else {
          setProfile(fallbackProfile);
        }
      })
      .catch(() => {
        setProfile(fallbackProfile);
      });
    return () => {
      mounted = false;
    };
  }, []);

  useEffect(() => {
    if (!profile) return;
    const nextCoins =
      profile.coin_balance ??
      fallbackProfile.coin_balance ??
      baseCoins;
    setCoins(nextCoins);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [profile?.id, baseCoins]);

  const showToast = (message: string) => {
    setToast(message);
    window.setTimeout(() => setToast(null), 2200);
  };

  const addCoins = () => {
    if (!profile?.id) {
      showToast("Profile not loaded yet.");
      return;
    }
    if (visited) {
      showToast("You already visited.");
      return;
    }
    if (saving) return;

    const next = coins + coinReward;
    setSaving(true);
    void updateProfileCoins(profile.id, next)
      .then((result) => {
        if (!result.success) {
          showToast(result.error ?? "Failed to save coins.");
          return;
        }
        setCoins(next);
        setVisited(true);
        if (typeof window !== "undefined") {
          window.localStorage.setItem(visitedKey, "1");
        }
        showToast(`+${coinReward} coin added`);
      })
      .catch(() => {
        showToast("Failed to save coins.");
      })
      .finally(() => {
        setSaving(false);
      });
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
            {resolvedLevel}
          </span>
          <span className="text-sm md:text-[16px] font-big !text-white/60">Level</span>
        </div>
        <div className="relative flex items-center gap-1.5 md:gap-3">
          <button
            type="button"
            onClick={addCoins}
            className="flex h-8 w-8 items-center justify-center border border-primary bg-white/5 font-big text-xl font-semibold text-primary hover:bg-white/10 transition cursor-pointer"
            aria-label={`Add ${coinReward} coins`}
            title={`Add ${coinReward} coins`}
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
