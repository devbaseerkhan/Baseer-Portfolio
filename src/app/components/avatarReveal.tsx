"use client";

import Image from "next/image";
import { useState } from "react";
import user from "../../../public/user.png";
import BoxStack from "./boxStack";
import WhoIsBaseer from "./whoIsBaseer";

export default function AvatarReveal() {
  const [open, setOpen] = useState(false);

  const handleOpen = () => setOpen(true);
  const handleKeyDown = (event: React.KeyboardEvent<HTMLDivElement>) => {
    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      handleOpen();
    }
  };

  return (
    <>
      <BoxStack
        className="p-3 max-h-45.25 cursor-pointer transition hover:-translate-y-[2px]"
        onClick={handleOpen}
        onKeyDown={handleKeyDown}
        role="button"
        tabIndex={0}
        aria-label="Open biography"
      >
        <Image src={user} alt="user" priority style={{ width: "100%" }} />
      </BoxStack>
      <WhoIsBaseer open={open} onClose={() => setOpen(false)} />
    </>
  );
}
