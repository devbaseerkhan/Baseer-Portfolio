"use client";

import { useEffect } from "react";
import { IoClose } from "react-icons/io5";
import Button from "./Button";

type ContactMeProps = {
  open: boolean;
  onClose: () => void;
};

export default function ContactMe({ open, onClose }: ContactMeProps) {
  useEffect(() => {
    if (!open) return undefined;
    const handleKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [open, onClose]);

  if (!open) return null;

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/10 backdrop-blur-sm px-4 py-6 sm:px-[8%]">
      <div className="flex min-h-full w-full items-center">
        <div className="flex w-full max-w-117.5 flex-col justify-center gap-7 py-8">
          <div className="space-y-1">
            <h1 className="title26 font-big font-bold">Open for hire</h1>
            <p className="title16 !text-white/70">
              I would love to hear about your projects.
            </p>
          </div>
          <form
            className="flex flex-col gap-7"
            onSubmit={handleSubmit}
          >
            <div className="flex flex-col border border-white/10 bg-primary-10 p-5 sm:p-8">
              <div className="flex flex-col gap-5">
                <div className="flex flex-col gap-2">
                  <label className="title18 text-primary font-big font-bold ">
                    How should I call you?
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="Your name"
                    className="h-12 border border-white/25 bg-black/60 px-3 font-iceland text-md tracking-[0.12em] uppercase placeholder:text-white/40 focus:border-white focus:outline-none"
                  />
                </div>
                <div className="flex flex-col gap-2">
                  <label className="title18 text-primary font-big font-bold">Sending from</label>
                  <input
                    type="email"
                    required
                    placeholder="your.name@acme.com"
                    className="h-12 border border-white/25 bg-black/60 px-3 font-iceland text-md tracking-[0.12em] uppercase placeholder:text-white/40 focus:border-white focus:outline-none"
                  />
                </div>
                <div className="flex flex-col gap-2">
                  <label className="title18 text-primary font-big font-bold">
                    Transmitted data
                  </label>
                  <textarea
                    required
                    placeholder="Hi, I write to you about..."
                    className="min-h-[9rem] border border-white/25 bg-black/60 px-3 font-iceland text-md tracking-[0.12em] uppercase placeholder:text-white/40 focus:border-white focus:outline-none"
                  />
                </div>
              </div>
            </div>
            <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:gap-4">
              <Button
                type="submit"
                label="Send message [Enter]"
                className="w-full px-4 py-2 bg-primary text-dark border-primary"
              />
              <Button
                type="button"
                label="Discard [Esc]"
                variant="outlined"
                onClick={onClose}
                className="w-full px-4 py-2 text-white"
              />
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
