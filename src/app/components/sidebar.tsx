import type React from "react";
import AvatarReveal from "./avatarReveal";
import Badge from "./Badge";
import ContactLauncher from "./contactLauncher";

type SidebarProps = React.HTMLAttributes<HTMLElement> & {
  className?: string;
};

export default function Sidebar({ className = "", ...rest }: SidebarProps) {
  return (
    <aside className={`flex flex-col gap-4 ${className}`} {...rest}>
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
  );
}
