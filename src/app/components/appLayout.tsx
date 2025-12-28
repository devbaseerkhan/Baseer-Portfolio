"use client";

import { useMemo, useState, type ReactNode } from "react";
import ThemeSwitcher from "./ThemeSwitcher";
import Header from "./header";
import BoxStack from "./boxStack";
import QuestBlock from "./questBlock";
import QuestDrawer from "./questDrawer";
import Sidebar from "./sidebar";
import AvatarReveal from "./avatarReveal";
import NavigationDrawer from "./navigationDrawer";
import AppTabs from "./appTabs";

type LayoutTab = {
  label: string;
  content: ReactNode;
  description?: string;
};

type AppLayoutProps = {
  tabs: LayoutTab[];
  mobileIntro?: ReactNode;
};

export default function AppLayout({ tabs, mobileIntro }: AppLayoutProps) {
  const [activeTab, setActiveTab] = useState(tabs[0]?.label ?? "");
  const currentActiveTab = tabs.some((tab) => tab.label === activeTab)
    ? activeTab
    : tabs[0]?.label ?? "";
  const activeContent = useMemo(
    () => tabs.find((tab) => tab.label === currentActiveTab)?.content,
    [currentActiveTab, tabs]
  );

  return (
    <div className="h-screen pb-6 pt-0 lg:pb-20 lg:px-6 xl:px-10 2xl:px-20">
      <div className="w-full hidden md:block sticky top-0 z-40 border-b border-white/10 px-4 lg:px-0">
        <Header />
      </div>
      <div className="h-[calc(100vh-24px)] md:h-[calc(100vh-106px)] lg:h-[calc(100vh-176px)] flex flex-col gap-4 lg:grid lg:grid-cols-[200px_1fr] 2xl:grid-cols-[200px_1fr_200px]">
        <div className="w-full flex flex-col gap-4 flex-1 lg:hidden">
          {mobileIntro}
          {currentActiveTab === "Beginning" ? (
            <div className="w-full flex flex-col gap-4 pt-6 md:pt-0 flex-1 px-4">
              <h1 className="text-center title16 md:hidden">
                Swimming through a vast network of interconnected devices and
                servers, spreading joy and whimsy to users across the globe
              </h1>
              <BoxStack>{activeContent}</BoxStack>
            </div>
          ) : (
            <div className="w-full">{activeContent}</div>
          )}
        </div>
        <Sidebar
          className={`${
            currentActiveTab === "Beginning" ? "px-4 lg:px-0" : "hidden"
          } lg:flex`}
        />
        <BoxStack className="relative hidden lg:flex min-h-[70vh] flex-1">
          <AppTabs
            tabs={tabs}
            activeTab={currentActiveTab}
            onTabChange={setActiveTab}
          />
        </BoxStack>
        <aside className="hidden 2xl:block">
          <QuestBlock />
        </aside>
        <div className="w-full flex lg:hidden items-center gap-2 px-4 lg:px-0">
          <NavigationDrawer
            triggerClassName="flex flex-1 h-8.25 md:h-12.5"
            items={tabs.map(({ label, description }) => ({
              label,
              description,
            }))}
            activeLabel={currentActiveTab}
            onSelect={setActiveTab}
          />
          <AvatarReveal />
        </div>
      </div>
      <ThemeSwitcher />
      <QuestDrawer />
    </div>
  );
}
