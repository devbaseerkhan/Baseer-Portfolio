"use client";

import { useEffect, useRef, useState } from "react";
import { IoBluetooth } from "react-icons/io5";
import Button from "./Button";
import ContactMe from "./contactMe";

const VIDEO_CHANGE_EVENT = "connection-video-change";
const DEFAULT_VIDEO = "/videos/video1.mp4";
const CONNECTION_VIDEO = "/videos/video2.mp4";
const MODAL_DELAY_MS = 1500;

export default function ContactLauncher() {
  const [isOpen, setIsOpen] = useState(false);
  const openTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    return () => {
      if (openTimerRef.current) clearTimeout(openTimerRef.current);
    };
  }, []);

  const handleOpenWithDelay = () => {
    window.dispatchEvent(
      new CustomEvent(VIDEO_CHANGE_EVENT, { detail: CONNECTION_VIDEO })
    );

    if (openTimerRef.current) clearTimeout(openTimerRef.current);
    openTimerRef.current = setTimeout(() => setIsOpen(true), MODAL_DELAY_MS);
  };

  const handleClose = () => {
    if (openTimerRef.current) clearTimeout(openTimerRef.current);
    setIsOpen(false);
    window.dispatchEvent(
      new CustomEvent(VIDEO_CHANGE_EVENT, { detail: DEFAULT_VIDEO })
    );
  };

  return (
    <>
      <div className="flex flex-col gap-1 flex-1 sm:basis-[48%] md:basis-0">
        <span className="text-sm text-white">social</span>
        <Button
          label="Open Connection"
          icon={<IoBluetooth />}
          variant="outlined"
          onClick={handleOpenWithDelay}
          className="text-[16px] lg:text-lg h-7.5 lg:h-auto"
        />
      </div>
      <ContactMe open={isOpen} onClose={handleClose} />
    </>
  );
}
