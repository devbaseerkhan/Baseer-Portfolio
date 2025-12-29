import AchievementsContent from "./components/achievementsContent";
import BeginningContent from "./components/beginningContent";
import CreationsContent from "./components/creationsContent";
import LogsContent from "./components/logsContent";
import AppLayout from "./components/appLayout";

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
  return <AppLayout tabs={navTabs} />;
}
