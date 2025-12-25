"use client";

import Image from "next/image";
import { useState } from "react";
import user from "../../../public/user.png";
import BoxStack from "./boxStack";
import WhoIsBaseer from "./whoIsBaseer";
import Button from "./Button";

type AvatarRevealProps = React.HTMLAttributes<HTMLElement> & {
  avatar?: boolean;
};

export default function AvatarReveal({ avatar }: AvatarRevealProps) {
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
      {avatar ? (
        <BoxStack
          className="p-1 lg:p-3 max-h-45.25 cursor-pointer transition hover:-translate-y-[2px]"
          onClick={handleOpen}
          onKeyDown={handleKeyDown}
          role="button"
          tabIndex={0}
          aria-label="Open biography"
        >
          <Image
            src={user}
            alt="user"
            priority
            style={{ width: "100%", height: "100%" }}
          />
        </BoxStack>
      ) : (
        <Button
          label="about"
          variant="outlined"
          className="flex flex-1 h-8.25 md:h-12.5"
          onClick={handleOpen}
        />
      )}
      <WhoIsBaseer open={open} onClose={() => setOpen(false)} />
    </>
  );
}
