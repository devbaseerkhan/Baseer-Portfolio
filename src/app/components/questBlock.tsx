import Image from "next/image";
import type React from "react";
import Button from "./Button";
import { CgCheckR, CgCloseR } from "react-icons/cg";
import { IoSettingsOutline } from "react-icons/io5";
import Badge from "./Badge";
import bronz from "../../../public/bronz.png";
import gold from "../../../public/gold.png";

type QuestBlockProps = React.HTMLAttributes<HTMLDivElement> & {
  className?: string;
};

export default function QuestBlock({
  className = "",
  ...rest
}: QuestBlockProps) {
  const questRewards = [
    { label: "+5", icon: bronz },
    { label: "+25", icon: gold },
  ];
  return (
    <div className={`h-full w-full flex flex-col gap-4 ${className}`} {...rest}>
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
              Build this website. Implement a full react with multiple routers,
              UI elements and tricky styling. Make it all work great!
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
    </div>
  );
}
