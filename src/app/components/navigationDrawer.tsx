"use client";

import { useEffect, useMemo, useState } from "react";
import { IoClose, IoTriangleSharp } from "react-icons/io5";
import ControlsButtons from "./controlsButtons";
import TabButton from "./tabButton";
import Header from "./header";
import Button from "./Button";

type NavigationItem = {
  label: string;
  description?: string;
};

type NavigationDrawerProps = {
  items?: NavigationItem[];
  onSelect?: (label: string) => void;
  triggerClassName?: string;
};

const defaultDescription =
  "Subject est consequat aliqua magna veniam est laborum scraps.";

export default function NavigationDrawer({
  items,
  onSelect,
  triggerClassName = "",
}: NavigationDrawerProps) {
  const [open, setOpen] = useState(false);
  const fallbackItems = useMemo<NavigationItem[]>(
    () => [
      { label: "Beginning", description: defaultDescription },
      { label: "Logs", description: defaultDescription },
      { label: "Achievements", description: defaultDescription },
      { label: "Creations", description: defaultDescription },
      { label: "Games", description: defaultDescription },
    ],
    []
  );

  const navigationItems = items?.length ? items : fallbackItems ?? [];
  const [activeLabel, setActiveLabel] = useState(
    navigationItems[0]?.label ?? ""
  );

  const closeDrawer = () => setOpen(false);
  const openDrawer = () => setOpen(true);

  useEffect(() => {
    setActiveLabel(navigationItems[0]?.label ?? "");
  }, [navigationItems]);

  useEffect(() => {
    if (!open) return undefined;
    const handleKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") closeDrawer();
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [open]);

  return (
    <>
      <div className="relative flex flex-1 justify-center">
        {open && (
          <IoTriangleSharp className="text-sm text-primary mx-auto -mt-2 absolute top-0" />
        )}
        <Button
          label="navigation"
          className="h-8.25 md:h-12.5"
          onClick={openDrawer}
        />
      </div>
      {open && navigationItems.length ? (
        <div
          className="fixed inset-0 z-50 flex items-end px-2 sm:px-4 pt-2 sm:pt-6 pb-16 md:pb-24"
          onClick={closeDrawer}
        >
          <div
            className="relative h-full w-full border border-white/15 bg-black/90 backdrop-blur-sm shadow-[0_0_48px_rgba(0,0,0,0.5)]"
            onClick={(event) => event.stopPropagation()}
          >
            <div className="flex items-center justify-between border-b border-white/10 px-4 md:px-5 py-2.5">
              <span className="title26 font-big font-bold">Navigation</span>
              <button
                type="button"
                onClick={closeDrawer}
                className="flex h-10 w-10 items-center justify-center rounded-sm border border-white/20 bg-white/5 text-white/70 transition hover:border-primary hover:text-white"
                aria-label="Close navigation"
              >
                <IoClose className="text-2xl" />
              </button>
            </div>
            <div className="h-full max-h-[calc(100vh-135px)] sm:max-h-[calc(100vh-150px)] md:max-h-[calc(100vh-183px)] overflow-y-auto w-full flex flex-col justify-between gap-10 px-4 md:px-5 pb-6">
              <div className="w-full h-full">
                <Header credits={false} className="!h-14.25" />
                <div className="grid grid-cols-1 sm:grid-cols-2  md:grid-cols-3 gap-5">
                  {navigationItems.map((item) => {
                    const isActive = item.label === activeLabel;
                    return (
                      <TabButton
                        key={item.label}
                        label={item.label}
                        subtitle={item.description ?? defaultDescription}
                        onClick={() => {
                          setActiveLabel(item.label);
                          onSelect?.(item.label);
                          closeDrawer();
                        }}
                        active={isActive}
                      />
                    );
                  })}
                </div>
              </div>
              <ControlsButtons className="border-0 pt-0" />
            </div>
          </div>
        </div>
      ) : null}
    </>
  );
}
