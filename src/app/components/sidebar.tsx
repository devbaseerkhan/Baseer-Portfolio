import type React from "react";
import AvatarReveal from "./avatarReveal";
import Badge from "./Badge";
import ContactLauncher from "./contactLauncher";

type SidebarProps = React.HTMLAttributes<HTMLElement> & {
  className?: string;
};

export default function Sidebar({ className = "", ...rest }: SidebarProps) {
  return (
    <aside
      className={`flex-1 sm:flex-none grid sm:grid-cols-[134px_1fr] lg:flex lg:flex-col gap-6 lg:gap-4 ${className}`}
      {...rest}
    >
      <div className="hidden sm:block">
        <AvatarReveal avatar />
      </div>
      <div className="flex flex-col gap-5 lg:gap-4">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:flex lg:flex-col gap-2 md:gap-4 lg:gap-4 uppercase">
          <div className="flex flex-col">
            <span className="text-sm text-white">Name</span>
            <span className="font-big text-md lg:text-lg font-bold tracking-widest text-primary">
              Baseer Ahmed Khan
            </span>
          </div>
          <div className="flex flex-col">
            <span className="text-sm text-white">Occupation</span>
            <span className="font-big text-md lg:text-lg font-bold tracking-widest text-primary">
              Frontend Developer
            </span>
          </div>
          <div className="hidden lg:flex lg:flex-col">
            <span className="text-sm text-white">Corporation</span>
            <span className="font-big text-md lg:text-lg font-bold tracking-widest text-primary">
              Legacy.ai
            </span>
          </div>
        </div>
        <div className="flex flex-col sm:flex-row flex-wrap justify-between md:grid md:grid-cols-3 sm:items-end lg:items-stretch lg:flex lg:flex-col gap-2 md:gap-4 lg:gap-4">
          <div className="flex flex-col flex-1 sm:basis-full lg:hidden">
            <span className="text-sm text-white">Corporation</span>
            <span className="font-big text-md lg:text-lg font-bold tracking-widest text-primary">
              Legacy.ai
            </span>
          </div>
          <div className="flex flex-col gap-1 flex-1 sm:basis-[48%] md:basis-0">
            <span className="text-sm text-white">availability</span>
            <Badge label="open for hire" className="h-7.5 lg:h-auto" />
          </div>
          <ContactLauncher />
        </div>
      </div>
      <div className="mt-auto hidden lg:block">
        <span className="block title18 text-primary">Motto:</span>
        <p className="title16 text-white/70">
          Saep enimis neque numquam recusandae laudantium.
        </p>
      </div>
    </aside>
  );
}
