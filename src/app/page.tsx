import Image from "next/image";
import user from "../../public/user.png";
import BoxStack from "./components/boxStack";
import Badge from "./components/Badge";
import Button from "./components/Button";
import { IoBluetooth, IoSettingsOutline } from "react-icons/io5";
import bronz from "../../public/bronz.png";
import gold from "../../public/gold.png";
import { CgCheckR, CgCloseR } from "react-icons/cg";

const navTabs = [
  { label: "Beginning", active: true },
  { label: "Logs" },
  { label: "Achievements" },
  { label: "Creations" },
  { label: "Games" },
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
            <span className="font-big title26 font-bold !text-slate ">48</span>
            <span className="title16 font-big !text-white/60">Level</span>
          </div>
          <div className="flex items-center gap-3">
            <button className="flex h-8 w-8 items-center justify-center border border-white/20 bg-white/5 font-big text-lg font-semibold text-white">
              +
            </button>
            <div className="flex items-baseline gap-2">
              <span className="font-big title26 font-bold !text-success ">
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
          <BoxStack className="p-3 max-h-45.25">
            <Image src={user} alt="user" priority style={{ width: "100%" }} />
          </BoxStack>
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
            <div className="flex flex-col gap-1">
              <span className="text-sm text-white">social</span>
              <Button
                label="Open Connection"
                icon={<IoBluetooth />}
                variant="outlined"
              />
            </div>
          </div>

          <div className="mt-auto">
            <span className="block title18 !text-primary">Motto:</span>
            <p className="title16 text-white/70">
              Saep enimis neque numquam recusandae laudantium.
            </p>
          </div>
        </aside>
        <main className="relative flex min-h-[70vh] flex-col">
          <BoxStack className="flex flex-1 flex-col">
            <div className="flex-1">
              <div className="flex h-full flex-col gap-6 px-6 py-12">
                <div className="text-center max-w-162.5 mx-auto">
                  <p className="title18">
                    Swimming through a vast network of interconnected devices
                    and servers, spreading joy and whimsy to users across the
                    globe
                  </p>
                  <span className="title14 !text-white/70">
                    Artwork generated with Midjourney
                  </span>
                </div>
              </div>
            </div>
            <div className="grid grid-cols-5 gap-3.5 max-w-205 mx-auto -mb-14">
              {navTabs.map((tab) => (
                <button
                  key={tab.label}
                  className={`border-l-2 transition hover:border-[#ff1f4b88] cursor-pointer ${
                    tab.active ? "border-[#ff1f4bb3]" : "border-light"
                  }`}
                >
                  <Badge
                    label={tab.label}
                    variant={tab.active ? "active" : "inactive"}
                    className="w-full"
                  />
                  <span className="block text-xs tracking-widest leading-3 uppercase text-white/50 font-iceland text-left p-2 bg-border/10">
                    Navigate or consolidate launch since 2016
                  </span>
                </button>
              ))}
            </div>
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
                <p className="title18 font-big !text-primary font-bold">
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
    </div>
  );
}
