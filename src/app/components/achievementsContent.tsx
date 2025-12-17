"use client";
import Image from "next/image";
import { useMemo, useState } from "react";
import Button from "./Button";

type AchievementStatus = "achieved" | "in-progress" | "todo";
type AchievementRarity = "legendary" | "epic" | "rare" | "uncommon";

type Achievement = {
  id: string;
  title: string;
  status: AchievementStatus;
  rarity: AchievementRarity;
  description?: string;
  achievedOn?: string;
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
const statusPriority: Record<AchievementStatus, number> = {
  achieved: 0,
  "in-progress": 1,
  todo: 2,
};

const rarityTokens: Record<
  AchievementRarity,
  { label: string; pill: string; text: string; glow: string; bgLinear?: string }
> = {
  legendary: {
    label: "Legendary",
    pill: "#d4a944",
    text: "#0a0606",
    glow: "rgba(212, 169, 68, 0.6)",
    bgLinear: "var(--color-warning-linear)",
  },
  epic: {
    label: "Epic",
    pill: "#e84a4a",
    text: "var(--color-white)",
    glow: "rgba(232, 74, 74, 0.55)",
    bgLinear: "var(--color-primary-linear)",
  },
  rare: {
    label: "Rare",
    pill: "#429dd1",
    text: "var(--color-white)",
    glow: "rgba(66, 157, 209, 0.55)",
    bgLinear: "var(--color-secondary-linear)",
  },
  uncommon: {
    label: "Uncommon",
    pill: "#5de26a",
    text: "#061308",
    glow: "rgba(93, 226, 106, 0.55)",
    bgLinear: "var(--color-success-linear)",
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
    achievedOn: "14 / 02 / 2022",
    description:
      "I have contributed to Gutenberg, Moment.js and React repositories in GitHub.",
  },
  {
    id: "personal-website",
    title: "Release personal website",
    status: "achieved",
    rarity: "epic",
    achievedOn: "14 / 02 / 2022",
    description:
      "The site you are looking at right now — yes, I did it! And it took me a few months.",
  },
  {
    id: "oss-plugin",
    title: "Developed my open source plugin",
    status: "achieved",
    rarity: "rare",
    achievedOn: "14 / 02 / 2022",
    description:
      "Created a JS library for managing absolute positioned elements.",
  },
  {
    id: "markup-master",
    title: "Master of markup",
    status: "achieved",
    rarity: "epic",
    description:
      "Ship semantic, accessible HTML paired with efficient styling systems.",
  },
  {
    id: "pixel-perfect-1",
    title: "Pixel-perfect perfectionist",
    status: "achieved",
    rarity: "epic",
    description: "Match comps to the pixel while preserving responsive sanity.",
  },
  {
    id: "speed-demon",
    title: '"Speed demon"',
    status: "in-progress",
    rarity: "rare",
    description: "Make builds, bundles, and runtime interactions feel instant.",
  },
  {
    id: "pixel-perfect-2",
    title: "Pixel-perfect perfectionist",
    status: "achieved",
    rarity: "epic",
    description: "Alternate skin unlocked.",
    note: "Alternate skin unlocked",
  },
  {
    id: "accessibility",
    title: "Accessibility advocate",
    status: "todo",
    rarity: "uncommon",
    description: "AA+ compliance, full keyboard flows, screen reader parity.",
  },
  {
    id: "browser-compat",
    title: '"Browser compatibility"',
    status: "in-progress",
    rarity: "rare",
    description: "Polyfills, graceful degradation, and evergreen builds.",
  },
  {
    id: "worth-noting",
    title: "Additional worth noting event",
    status: "todo",
    rarity: "uncommon",
    description: "Queued milestone in the next sprint cycle.",
  },
  {
    id: "code-quality",
    title: "Code quality guardian",
    status: "in-progress",
    rarity: "rare",
    description: "Static analysis, linting, testing, and DX guardrails.",
  },
  {
    id: "milestone",
    title: "Another awesome milestone",
    status: "achieved",
    rarity: "epic",
    achievedOn: "14 / 02 / 2022",
    description: "Another major project landed with polish.",
  },
  {
    id: "worth-noting-2",
    title: "Additional worth noting event",
    status: "todo",
    rarity: "uncommon",
    description: "Placeholder for the next notable win.",
  },
  {
    id: "ui-polish",
    title: "UI polish sprint",
    status: "todo",
    rarity: "uncommon",
    description: "Micro-interactions, layout cleanup, and motion tweaks.",
  },
];

export default function AchievementsContent() {
  const [activeStatuses, setActiveStatuses] = useState<AchievementStatus[]>([
    "achieved",
    "in-progress",
    "todo",
  ]);
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");

  const filtered = useMemo(
    () =>
      achievements
        .filter((item) => activeStatuses.includes(item.status))
        .sort((a, b) => statusPriority[a.status] - statusPriority[b.status]),
    [activeStatuses]
  );

  const progressStats = useMemo(() => {
    const totalCount = achievements.length;
    const achievedCount = achievements.filter(
      (item) => item.status === "achieved"
    ).length;
    const inProgressCount = achievements.filter(
      (item) => item.status === "in-progress"
    ).length;
    const todoCount = achievements.filter(
      (item) => item.status === "todo"
    ).length;

    const numeratorByStatus: Record<AchievementStatus, number> = {
      achieved: achievedCount,
      "in-progress": inProgressCount,
      todo: todoCount,
    };

    const isSingle = activeStatuses.length === 1;
    const isAll = activeStatuses.length === statusOrder.length;

    const numerator = isSingle
      ? numeratorByStatus[activeStatuses[0]]
      : isAll
      ? achievedCount
      : activeStatuses.reduce(
          (acc, status) => acc + numeratorByStatus[status],
          0
        );

    const completionPercent =
      totalCount === 0 ? 0 : Math.round((numerator / totalCount) * 100);

    const label = isSingle
      ? statusTokens[activeStatuses[0]].label
      : isAll
      ? "Progress"
      : "Selected";

    return {
      totalCount,
      achievedCount,
      numerator,
      completionPercent,
      label,
    };
  }, [activeStatuses]);

  const toggleStatus = (status: AchievementStatus) => {
    setActiveStatuses((prev) =>
      prev.includes(status)
        ? prev.filter((value) => value !== status)
        : [...prev, status]
    );
  };

  const resetFilters = () =>
    setActiveStatuses(["achieved", "in-progress", "todo"]);

  const renderListCard = (item: Achievement) => {
    const rarity = rarityTokens[item.rarity];
    const status = statusTokens[item.status];
    const iconSrc = rarityIcon[item.rarity];
    const isInProgress = item.status === "in-progress";
    const isTodo = item.status === "todo";
    const isMuted = isInProgress || isTodo;
    const statusLabel =
      isTodo || isInProgress ? (isTodo ? "In queue" : "In progress") : null;
    const cardHoverClasses = isMuted
      ? ""
      : "hover:shadow-[0_0_22px_var(--rarity-glow)] hover:border-[var(--rarity-border)]";
    return (
      <article
        key={item.id}
        className={`relative flex w-full border border-border/90 rounded-sm ${cardHoverClasses}`}
        style={{
          opacity: isMuted ? 0.5 : 1,
          ["--rarity-border" as string]: rarity.pill,
          ["--rarity-glow" as string]: rarity.glow,
          background: rarity.bgLinear,
        }}
      >
        <div className="flex flex-col items-center justify-between border-r border-border/70">
          <div className="relative h-28 w-28">
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
            className={`flex w-full items-center justify-center px-1 py-0.5 text-center transition-shadow duration-200 ${cardHoverClasses}`}
            style={{
              backgroundColor: rarity.pill,
            }}
          >
            <p className="title16 !text-dark">{rarity.label}</p>
          </div>
        </div>
        <div className="w-full flex flex-col justify-between">
          <div className="p-5">
            <p
              className="title18 font-big font-semibold"
              style={{ color: rarity.pill }}
            >
              {item.title}
            </p>
            {item.description ? (
              <p className="title16 !text-info-light">{item.description}</p>
            ) : null}

            {item.note ? (
              <p className="text-xs uppercase leading-normal tracking-widest text-info-light">
                {item.note}
              </p>
            ) : null}
          </div>
          <div
            className="w-full px-5 py-1 flex items-center"
            style={{ background: rarity.bgLinear }}
          >
            <p className="title12">
              {item.achievedOn ? `Achieved: ${item.achievedOn}` : status.label}
            </p>
          </div>
        </div>
      </article>
    );
  };

  const renderProgressPanel = () => {
    const radius = 58;
    const circumference = 2 * Math.PI * radius;
    const dashOffset =
      circumference * (1 - progressStats.completionPercent / 100);

    return (
      <aside className="flex flex-col gap-4 sticky top-0">
        <div
          className="flex flex-col items-center gap-4 rounded-sm border border-primary px-4 py-6"
          style={{
            background:
              "linear-gradient(180deg, rgba(232, 74, 74, 0.14) 0%, rgba(232, 74, 74, 0) 100%)",
          }}
        >
          <div className="relative h-36 w-36">
            <svg
              viewBox="0 0 140 140"
              role="img"
              aria-label={`${progressStats.label} ${progressStats.numerator} of ${progressStats.totalCount}`}
              className="h-full w-full"
            >
              <circle
                cx="70"
                cy="70"
                r={radius}
                fill="none"
                stroke="rgba(232, 74, 74, 0.2)"
                strokeWidth="10"
              />
              <circle
                cx="70"
                cy="70"
                r={radius}
                fill="none"
                stroke="var(--color-primary)"
                strokeWidth="10"
                strokeLinecap="round"
                strokeDasharray={`${circumference} ${circumference}`}
                strokeDashoffset={dashOffset}
                transform="rotate(-90 70 70)"
              />
            </svg>
            <div className="absolute inset-0 flex items-center justify-center">
              <span className="title26 font-big font-bold text-primary">
                {progressStats.numerator}/{progressStats.totalCount}
              </span>
            </div>
          </div>
          <p className="title14 !text-info-light tracking-[0.18em]">
            {progressStats.label}
          </p>
        </div>

        <p className="title16 !text-info-light leading-relaxed">
          I have created a set of achievements for myself and I use this page to
          track them.
        </p>
        <p className="title16 !text-info-light leading-relaxed">
          If you want to give me a challenge and rate it, please feel free to
          submit it with the button below!
        </p>

        <Button label="Challenge me" variant="outlined" className="mt-2" />
      </aside>
    );
  };

  return (
    <div className="h-full w-full overflow-hidden pt-10 sm:pt-12">
      <div className="flex h-full flex-col gap-6">
        <div className="flex flex-col gap-6 px-4 sm:px-6 lg:px-9">
          <div className="flex flex-col items-center gap-2">
            <h1 className="title18 text-center">Achievements</h1>
          </div>
          <div className="flex flex-wrap items-center justify-between gap-3 border-t border-primary bg-primary-10 px-2 py-2">
            <div className="flex items-center gap-5">
              <span className="title16 !text-info-light">Filter:</span>
              <div className="flex flex-wrap gap-4">
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

            <div className="flex items-center gap-3">
              <div className="flex rounded border border-primary">
                {(["grid", "list"] as const).map((mode) => (
                  <button
                    key={mode}
                    type="button"
                    onClick={() => setViewMode(mode)}
                    className={`px-3 py-1 text-sm uppercase tracking-[0.14em] font-big font-bold transition ${
                      viewMode === mode
                        ? "bg-primary text-dark"
                        : "text-primary hover:bg-primary-20"
                    }`}
                  >
                    {mode}
                  </button>
                ))}
              </div>
              <button
                type="button"
                onClick={resetFilters}
                className="title16 uppercase text-primary text-shadow-primary-10"
              >
                Show all
              </button>
            </div>
          </div>
        </div>
        <div className="h-full max-h-[calc(100vh-360px)] w-full overflow-y-auto px-4 sm:px-6 lg:px-9 pb-7">
          {viewMode === "grid" ? (
            <div className="flex flex-wrap items-stretch gap-4">
              {filtered.map((item) => {
                const rarity = rarityTokens[item.rarity];
                const status = statusTokens[item.status];
                const iconSrc = rarityIcon[item.rarity];
                const isInProgress = item.status === "in-progress";
                const isTodo = item.status === "todo";
                const isMuted = isInProgress || isTodo;

                const cardHoverClasses = isMuted
                  ? ""
                  : "hover:shadow-[0_0_22px_var(--rarity-glow)] hover:border-[var(--rarity-border)]";

                return (
                  <article
                    key={item.id}
                    className="relative flex flex-col w-full max-w-43.75"
                    style={{ opacity: isMuted ? 0.5 : 1 }}
                  >
                    <div
                      className={`flex flex-col items-center justify-between border border-border/90 bg-dark transition-shadow duration-200 ${cardHoverClasses}`}
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
                      {isTodo ? (
                        <p className="text-xs uppercase leading-normal tracking-widest text-white">
                          In queue
                        </p>
                      ) : null}
                      {isInProgress ? (
                        <p className="text-xs uppercase leading-normal tracking-widest text-info-light">
                          In progress
                        </p>
                      ) : null}
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
                <div className="col-span-full flex flex-col items-center justify-center gap-2 w-full min-h-52 border border-border/90 bg-black/40 px-4 py-6 text-center">
                  <h1 className="text-2xl font-big font-bold text-primary">
                    No achievements in this filter.
                  </h1>
                  <p className="title16 !text-white/70">
                    Relax the filters to see everything again.
                  </p>
                  <Button
                    label="Reset filters"
                    onClick={resetFilters}
                    className="w-max mt-5"
                    variant="outlined"
                  />
                </div>
              ) : null}
            </div>
          ) : (
            <div className="w-full max-w-205 mx-auto">
              <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_320px] relative">
                <div className="flex flex-col gap-3">
                  {statusOrder.map((statusKey) => {
                    const section = filtered.filter(
                      (item) => item.status === statusKey
                    );
                    if (section.length === 0) return null;
                    return (
                      <div key={statusKey} className="space-y-2">
                        <p className="title16 uppercase tracking-[0.16em] text-info-light">
                          {statusTokens[statusKey].label}
                        </p>
                        <div className="space-y-3">
                          {section.map((item) => renderListCard(item))}
                        </div>
                      </div>
                    );
                  })}
                  {filtered.length === 0 ? (
                    <div className="flex flex-col items-center justify-center gap-2 w-full min-h-52 border border-border/90 bg-black/40 px-4 py-6 text-center">
                      <h1 className="text-2xl font-big font-bold text-primary">
                        No achievements in this filter.
                      </h1>
                      <p className="title16 !text-white/70">
                        Relax the filters to see everything again.
                      </p>
                      <Button
                        label="Reset filters"
                        onClick={resetFilters}
                        className="w-max mt-5"
                        variant="outlined"
                      />
                    </div>
                  ) : null}
                </div>
                <div className="sticky top-0">{renderProgressPanel()}</div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
