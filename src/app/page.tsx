import Badge from "./components/Badge";
import Button from "./components/Button";
import AppTabs from "./components/appTabs";
import ThemeSwitcher from "./components/ThemeSwitcher";
import LogsContent from "./components/logsContent";
import BeginningContent from "./components/beginningContent";
import AchievementsContent from "./components/achievementsContent";
import CreationsContent from "./components/creationsContent";
import ContactLauncher from "./components/contactLauncher";
import AvatarReveal from "./components/avatarReveal";
import { IoSettingsOutline } from "react-icons/io5";
import bronz from "../../public/bronz.png";
import gold from "../../public/gold.png";
import { CgCheckR, CgCloseR } from "react-icons/cg";
import BoxStack from "./components/boxStack";
import Image from "next/image";

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
  {
    label: "Games",
    content:
      "Side quests, game jams, and interactive toys built for fun, curiosity, and rapid iteration.",
  },
];

const questRewards = [
  { label: "+5", icon: bronz },
  { label: "+25", icon: gold },
];

export default function Home() {
  return (
    <div className="h-screen px-4 pb-20 lg:px-6 xl:px-10 2xl:px-20">
      <header className="flex h-24 items-center justify-between gap-4">
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
      <div className="grid h-[calc(100vh-176px)] grid-cols-1 gap-4 lg:grid-cols-[200px_1fr_200px]">
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
        <main className="relative flex min-h-[70vh] flex-col">
          <BoxStack className="flex flex-1 flex-col">
            <AppTabs tabs={navTabs} />
          </BoxStack>
        </main>
        <aside className="flex flex-col gap-4">
          <div className="flex flex-col gap-4 border-l-2 border-primary">
            <div className="flex flex-col">
              <Badge label="active quest" variant="active" />
              <Badge label="The React Skill-Up Line" variant="light" />
            </div>
            <div className="flex flex-col gap-6 pl-2">
              <div>
                <p className="title14">quest name</p>
                <p className="title18 font-big text-primary font-bold">
                  React website
                </p>
              </div>
              <div>
                <p className="title14">Goal</p>
                <p className="title14 !text-info-light">
                  Build this website. Implement a full react with multiple
                  routers, UI elements and tricky styling. Make it all work
                  great!
                </p>
              </div>
              <div>
                <div className="title14 mb-2">Rewards</div>
                <div className="flex gap-2">
                  {questRewards.map((reward) => (
                    <div
                      key={reward.label}
                      className="flex flex-col items-center gap-1 text-[12px] uppercase tracking-widest text-info-light"
                    >
                      <Image
                        src={reward.icon}
                        alt="reward"
                        height={40}
                        width={40}
                      />
                      <span>{reward.label}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
          <div className="mt-auto flex flex-col gap-3 border-t border-white/10 pt-3">
            <Button
              label="Sound Effects"
              icon={<CgCheckR className="text-3xl" />}
              variant="outlined"
              className="border-0"
            />
            <Button
              label="Music"
              icon={<CgCloseR className="text-3xl" />}
              variant="outlined"
              className="border-0"
            />
            <Button
              label="Visual Settings"
              icon={<IoSettingsOutline />}
              variant="outlined"
              className="border-white/10"
            />
          </div>
        </aside>
      </div>
      <ThemeSwitcher />
    </div>
  );
}
