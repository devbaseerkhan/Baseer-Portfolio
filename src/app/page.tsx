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
  return (
    <AppLayout
      tabs={navTabs}
      // mobileIntro={
      //   <h1 className="text-center text-sm md:text-lg font-iceland leading-none w-full sm:max-w-[70%] mx-auto">
      //     Swimming through a vast network of interconnected devices and
      //     servers, spreading joy and whimsy to users across the globe
      //   </h1>
      // }
    />
  );
}
