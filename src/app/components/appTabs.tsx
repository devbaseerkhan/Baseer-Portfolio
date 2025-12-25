"use client";
import { useState, type ReactNode } from "react";
import TabButton from "./tabButton";

type Tab = {
  label: string;
  content: ReactNode;
};

type AppTabsProps = {
  tabs: Tab[];
};

export default function AppTabs({ tabs }: AppTabsProps) {
  const [activeTab, setActiveTab] = useState(tabs[0]?.label ?? "");
  const activeContent = tabs.find((tab) => tab.label === activeTab)?.content;
  const isTextContent =
    typeof activeContent === "string" || typeof activeContent === "number";

  return (
    <div className="flex flex-1 flex-col relative">
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
      <div className="grid grid-cols-4 gap-3.5 w-full max-w-170 mx-auto  absolute -bottom-14 left-1/2 -translate-x-1/2">
        {tabs.map((tab) => (
          <TabButton
            key={tab.label}
            label={tab.label}
            active={tab.label === activeTab}
            onClick={() => setActiveTab(tab.label)}
          />
        ))}
      </div>
    </div>
  );
}
