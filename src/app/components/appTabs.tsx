"use client";
import { useState, type ReactNode } from "react";
import Badge from "./Badge";

type Tab = {
  label: string;
  content: ReactNode;
};

type AppTabsProps = {
  tabs: Tab[];
};

export default function AppTabs({ tabs }: AppTabsProps) {
  const [activeTab, setActiveTab] = useState(tabs[0]?.label ?? "");
  const [hoveredTab, setHoveredTab] = useState<string | null>(null);
  const activeContent = tabs.find((tab) => tab.label === activeTab)?.content;
  const isTextContent =
    typeof activeContent === "string" || typeof activeContent === "number";

  return (
    <div className="flex flex-1 flex-col">
      <div className="flex-1 ">
        {isTextContent ? (
          <div className="max-w-162.5 mx-auto space-y-3 text-center">
            <p className="title18">{activeContent}</p>
            <span className="title14 !text-white/70">
              Tap through the tabs to explore more lore.
            </span>
          </div>
        ) : (
          activeContent
        )}
      </div>
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3.5 max-w-205 mx-auto -mb-14">
        {tabs.map((tab) => {
          const isActive = tab.label === activeTab;
          const isHovered = tab.label === hoveredTab;
          const isHighlighted = isActive || isHovered;

          return (
            <button
              key={tab.label}
              type="button"
              onClick={() => setActiveTab(tab.label)}
              onMouseEnter={() => setHoveredTab(tab.label)}
              onMouseLeave={() => setHoveredTab(null)}
              className={`border-l-2 transition hover:border-primary-70 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-dark cursor-pointer ${
                isHighlighted ? "border-primary" : "border-light"
              }`}
            >
              <Badge
                label={tab.label}
                variant={isHighlighted ? "active" : "inactive"}
                className="w-full"
              />
              <span className="block text-xs tracking-widest leading-3 uppercase text-white/50 font-iceland text-left p-2 bg-border/10">
                Navigate or consolidate launch since 2016
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
