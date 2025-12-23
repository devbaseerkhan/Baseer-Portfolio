import ThemeSwitcher from "./components/ThemeSwitcher";
import AchievementsContent from "./components/achievementsContent";
import AppTabs from "./components/appTabs";
import BeginningContent from "./components/beginningContent";
import CreationsContent from "./components/creationsContent";
import LogsContent from "./components/logsContent";
import Header from "./components/header";

import BoxStack from "./components/boxStack";
import QuestBlock from "./components/questBlock";
import QuestDrawer from "./components/questDrawer";
import Sidebar from "./components/sidebar";

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
      <Header />
      <div className="grid h-[calc(100vh-176px)] grid-cols-1 gap-4 lg:grid-cols-[200px_1fr] 2xl:grid-cols-[200px_1fr_200px]">
        <Sidebar />
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
