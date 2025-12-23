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
import Button from "./components/Button";

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
    <div className="h-screen px-4 pb-9 lg:pb-20 lg:px-6 xl:px-10 2xl:px-20">
      <Header />
      <div className="h-[calc(100vh-116px)] lg:h-[calc(100vh-176px)] flex flex-col gap-4 lg:grid lg:grid-cols-[200px_1fr] 2xl:grid-cols-[200px_1fr_200px]">
        <BoxStack className="flex flex-1 lg:hidden">
          <BeginningContent />
        </BoxStack>
        <Sidebar />
        <BoxStack className="relative hidden lg:flex min-h-[70vh] flex-1">
          <AppTabs tabs={navTabs} />
        </BoxStack>
        <aside className="hidden 2xl:block">
          <QuestBlock />
        </aside>
        <div className="w-full flex lg:hidden items-center gap-2">
          <Button label="navigation" className="flex flex-1 h-8.25 md:h-12.5" />
          <Button label="about" variant="outlined" className="flex flex-1 h-8.25 md:h-12.5" />
        </div>
      </div>
      <ThemeSwitcher />
      <QuestDrawer />
    </div>
  );
}
