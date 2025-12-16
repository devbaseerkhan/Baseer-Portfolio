"use client";
import Image from "next/image";
import { useMemo, useState } from "react";

type AchievementStatus = "achieved" | "in-progress" | "todo";
type AchievementRarity = "legendary" | "epic" | "rare" | "uncommon";

type Achievement = {
  id: string;
  title: string;
  status: AchievementStatus;
  rarity: AchievementRarity;
  note?: string;
};

const statusTokens: Record<
  AchievementStatus,
  { label: string; tint: string; bar: string }
> = {
  achieved: {
    label: "Achieved",
    tint: "var(--color-primary)",
    bar: "var(--color-primary)",
  },
  "in-progress": {
    label: "In Progress",
    tint: "var(--color-secondary-90)",
    bar: "var(--color-secondary-90)",
  },
  todo: {
    label: "Todo",
    tint: "var(--color-success)",
    bar: "var(--color-success)",
  },
};

const statusOrder: AchievementStatus[] = ["achieved", "in-progress", "todo"];

const rarityTokens: Record<
  AchievementRarity,
  { label: string; pill: string; text: string; glow: string }
> = {
  legendary: {
    label: "Legendary",
    pill: "var(--color-warning-90)",
    text: "#0a0606",
    glow: "rgba(212, 169, 68, 0.6)",
  },
  epic: {
    label: "Epic",
    pill: "var(--color-primary-50)",
    text: "var(--color-white)",
    glow: "rgba(232, 74, 74, 0.55)",
  },
  rare: {
    label: "Rare",
    pill: "var(--color-secondary-90)",
    text: "var(--color-white)",
    glow: "rgba(66, 157, 209, 0.55)",
  },
  uncommon: {
    label: "Uncommon",
    pill: "var(--color-success-90)",
    text: "#061308",
    glow: "rgba(93, 226, 106, 0.55)",
  },
};

const rarityIcon: Record<AchievementRarity, string> = {
  legendary: "/achievements/rarity-legendary.svg",
  epic: "/achievements/rarity-epic.svg",
  rare: "/achievements/rarity-rare.svg",
  uncommon: "/achievements/rarity-uncommon.svg",
};

const achievements: Achievement[] = [
  {
    id: "legendary-stars",
    title: "1000 stars on my project",
    status: "achieved",
    rarity: "legendary",
  },
  {
    id: "personal-website",
    title: "Release personal website",
    status: "achieved",
    rarity: "epic",
  },
  {
    id: "oss-plugin",
    title: "Developed my open source plugin",
    status: "achieved",
    rarity: "rare",
  },
  {
    id: "markup-master",
    title: "Master of markup",
    status: "achieved",
    rarity: "epic",
  },
  {
    id: "pixel-perfect-1",
    title: "Pixel-perfect perfectionist",
    status: "achieved",
    rarity: "epic",
  },
  {
    id: "speed-demon",
    title: '"Speed demon"',
    status: "in-progress",
    rarity: "rare",
  },
  {
    id: "pixel-perfect-2",
    title: "Pixel-perfect perfectionist",
    status: "achieved",
    rarity: "epic",
    note: "Alternate skin unlocked",
  },
  {
    id: "accessibility",
    title: "Accessibility advocate",
    status: "todo",
    rarity: "uncommon",
  },
  {
    id: "browser-compat",
    title: '"Browser compatibility"',
    status: "in-progress",
    rarity: "rare",
  },
  {
    id: "worth-noting",
    title: "Additional worth noting event",
    status: "todo",
    rarity: "uncommon",
  },
  {
    id: "code-quality",
    title: "Code quality guardian",
    status: "in-progress",
    rarity: "rare",
  },
  {
    id: "milestone",
    title: "Another awesome milestone",
    status: "achieved",
    rarity: "epic",
  },
  {
    id: "worth-noting-2",
    title: "Additional worth noting event",
    status: "todo",
    rarity: "uncommon",
  },
  {
    id: "ui-polish",
    title: "UI polish sprint",
    status: "todo",
    rarity: "uncommon",
  },
];

export default function AchievementsContent() {
  const [activeStatuses, setActiveStatuses] = useState<AchievementStatus[]>([
    "achieved",
    "in-progress",
    "todo",
  ]);

  const filtered = useMemo(
    () => achievements.filter((item) => activeStatuses.includes(item.status)),
    [activeStatuses]
  );

  const toggleStatus = (status: AchievementStatus) => {
    setActiveStatuses((prev) =>
      prev.includes(status)
        ? prev.filter((value) => value !== status)
        : [...prev, status]
    );
  };

  const resetFilters = () =>
    setActiveStatuses(["achieved", "in-progress", "todo"]);

  return (
    <div className="h-full w-full overflow-y-auto px-4 py-10 sm:px-6 lg:px-9 sm:py-12">
      <div className="flex h-full flex-col gap-6">
        <div className="flex flex-col items-center gap-2">
          <h1 className="title18 text-center">Achievements</h1>
        </div>

        <div className="flex flex-wrap items-center justify-between gap-3 border-t border-primary bg-primary-10 px-2 py-2">
          <div className="flex items-center gap-7">
            <span className="title16 !text-info-light">Filter:</span>
            <div className="flex flex-wrap gap-7">
              {statusOrder.map((status) => {
                const token = statusTokens[status];
                const isActive = activeStatuses.includes(status);
                return (
                  <button
                    key={status}
                    type="button"
                    onClick={() => toggleStatus(status)}
                    className="flex items-center gap-2 title16 uppercase text-primary text-shadow-primary-10"
                  >
                    <div className="h-5 w-5 flex justify-center items-center border border-primary rounded">
                      {isActive && (
                        <span
                          className="h-3 w-3 rounded bg-primary"
                          aria-hidden
                        />
                      )}
                    </div>
                    <span>{token.label}</span>
                  </button>
                );
              })}
            </div>
          </div>
          <button
            type="button"
            onClick={resetFilters}
            className="title16 uppercase text-primary text-shadow-primary-10"
          >
            Show all
          </button>
        </div>

        <div className="grid grid-cols-2 gap-4 sm:grid-cols-4 lg:grid-cols-6 xl:grid-cols-8 2xl:grid-cols-10">
          {filtered.map((item) => {
            const rarity = rarityTokens[item.rarity];
            const status = statusTokens[item.status];
            const iconSrc = rarityIcon[item.rarity];
            return (
              <article key={item.id} className="relative flex flex-col">
                <div
                  className="flex flex-col items-center justify-between border border-border/90 bg-dark transition-shadow duration-200 hover:shadow-[0_0_22px_var(--rarity-glow)] hover:border-[var(--rarity-border)]"
                  style={{
                    ["--rarity-border" as string]: rarity.pill,
                    ["--rarity-glow" as string]: rarity.glow,
                  }}
                >
                  <div className="relative h-28 w-28 my-3">
                    <Image
                      src={iconSrc}
                      alt={item.title}
                      fill
                      sizes="140px"
                      className="object-contain"
                      priority={item.rarity === "legendary"}
                    />
                  </div>
                  <div
                    className="flex w-full items-center justify-center px-1 py-0.5 text-center"
                    style={{
                      backgroundColor: rarity.pill,
                    }}
                  >
                    <p className="title16 !text-dark">{rarity.label}</p>
                  </div>
                </div>
                <div className="py-3 text-center">
                  <p
                    className="title16 font-big font-semibold"
                    style={{ color: rarity.pill }}
                  >
                    {item.title}
                  </p>
                  {item.note ? (
                    <p className="text-xs uppercase leading-normal tracking-widest text-info-light">
                      {item.note}
                    </p>
                  ) : null}
                </div>
              </article>
            );
          })}
          {filtered.length === 0 ? (
            <div className="col-span-full flex flex-col items-center justify-center gap-3 border border-white/10 bg-black/40 px-4 py-6 text-center text-white/80">
              <p className="title16 font-big text-white">
                No achievements in this filter.
              </p>
              <p className="text-[12px] uppercase tracking-[0.16em] text-info-light">
                Relax the filters to see everything again.
              </p>
              <button
                type="button"
                onClick={resetFilters}
                className="border border-primary px-3 py-1 text-[12px] font-big uppercase tracking-[0.18em] text-primary transition hover:bg-primary hover:text-dark focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-dark"
              >
                Reset filters
              </button>
            </div>
          ) : null}
        </div>
      </div>
    </div>
  );
}
