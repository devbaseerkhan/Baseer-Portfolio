"use client";

import { useState } from "react";
import { IoBluetooth } from "react-icons/io5";
import Button from "./Button";
import ContactMe from "./contactMe";

export default function ContactLauncher() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <div className="flex flex-col gap-1">
        <span className="text-sm text-white">social</span>
        <Button
          label="Open Connection"
          icon={<IoBluetooth />}
          variant="outlined"
          onClick={() => setIsOpen(true)}
        />
      </div>
      <ContactMe open={isOpen} onClose={() => setIsOpen(false)} />
    </>
  );
}
