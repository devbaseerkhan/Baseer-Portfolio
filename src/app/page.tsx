import Badge from "./components/Badge";
import ThemeSwitcher from "./components/ThemeSwitcher";
import AchievementsContent from "./components/achievementsContent";
import AppTabs from "./components/appTabs";
import AvatarReveal from "./components/avatarReveal";
import BeginningContent from "./components/beginningContent";
import ContactLauncher from "./components/contactLauncher";
import CreationsContent from "./components/creationsContent";
import LogsContent from "./components/logsContent";

import BoxStack from "./components/boxStack";
import QuestBlock from "./components/questBlock";
import QuestDrawer from "./components/questDrawer";

const navTabs = [
  {
    label: "Beginning",
    content: <BeginningContent />,
  },
  {
    label: "Logs",
    content: <LogsContent />,
  },
  {
    label: "Achievements",
    content: <AchievementsContent />,
  },
  {
    label: "Creations",
    content: <CreationsContent />,
  },
];

export default function Home() {
  return (
    <div className="h-screen px-4 pb-20 lg:px-6 xl:px-10 2xl:px-20">
      <header className="flex h-20 lg:h-24 items-center justify-between gap-4">
        <div className="flex items-center gap-11">
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

        <div className="flex items-center gap-6 title14">
          <span>Credits</span>
          <span>
            <span className="!text-info-light">Server Time:</span> 08:42
          </span>
          <span>
            <span className="!text-info-light">Local Time:</span> 15:42
          </span>
        </div>
      </header>
      <div className="grid h-[calc(100vh-176px)] grid-cols-1 gap-4 lg:grid-cols-[200px_1fr] 2xl:grid-cols-[200px_1fr_200px]">
        <aside className="flex flex-col gap-4 ">
          <AvatarReveal />
          <div className="flex flex-col gap-4 uppercase">
            <div className="flex flex-col">
              <span className="text-sm text-white">Name</span>
              <span className="font-big text-lg font-bold tracking-widest text-primary">
                Baseer Ahmed Khan
              </span>
            </div>
            <div className="flex flex-col">
              <span className="text-sm text-white">Occupation</span>
              <span className="font-big text-lg font-bold tracking-widest text-primary">
                Frontend Developer
              </span>
            </div>
            <div className="flex flex-col">
              <span className="text-sm text-white">Corporation</span>
              <span className="font-big text-lg font-bold tracking-widest text-primary">
                Legacy.ai
              </span>
            </div>
          </div>

          <div className="flex flex-col gap-3">
            <div className="flex flex-col gap-1">
              <span className="text-sm text-white">availability</span>
              <Badge label="open for hire" />
            </div>
            <ContactLauncher />
          </div>

          <div className="mt-auto">
            <span className="block title18 text-primary">Motto:</span>
            <p className="title16 text-white/70">
              Saep enimis neque numquam recusandae laudantium.
            </p>
          </div>
        </aside>
        <main className="relative hidden lg:flex min-h-[70vh]">
          <BoxStack className="flex flex-1">
            <AppTabs tabs={navTabs} />
          </BoxStack>
        </main>
        <aside className="hidden 2xl:block">
          <QuestBlock />
        </aside>
      </div>
      <ThemeSwitcher />
      <QuestDrawer />
    </div>
  );
}
