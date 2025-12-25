"use client";

import { useState } from "react";
import { IoBluetooth } from "react-icons/io5";
import Button from "./Button";
import ContactMe from "./contactMe";

export default function ContactLauncher() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <div className="flex flex-col gap-1 flex-1 sm:basis-[48%] md:basis-0">
        <span className="text-sm text-white">social</span>
        <Button
          label="Open Connection"
          icon={<IoBluetooth />}
          variant="outlined"
          onClick={() => setIsOpen(true)}
          className="text-[16px] lg:text-lg h-7.5 lg:h-auto"
        />
      </div>
      <ContactMe open={isOpen} onClose={() => setIsOpen(false)} />
    </>
  );
}
