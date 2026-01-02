"use client";

import { useEffect, useMemo, useState } from "react";
import Button from "./Button";

type ContactMeProps = {
  open: boolean;
  onClose: () => void;
};

export default function ContactMe({ open, onClose }: ContactMeProps) {
  const frameworks = useMemo(
    () => [
      "React.js",
      "React Native",
      "Next.js",
      "Webflow",
      "WordPress",
      "Shopify",
    ],
    [],
  );
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
    framework: frameworks[0],
  });
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!open) return undefined;
    const handleKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [open, onClose]);

  if (!open) return null;

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setSubmitting(true);
    setError(null);

    try {
      const payload = {
        ...formData,
        name: formData.name.trim(),
        email: formData.email.trim(),
        message: formData.message.trim(),
      };

      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const data = (await response.json().catch(() => null)) as
        | { error?: string }
        | null;

      if (!response.ok) {
        throw new Error(data?.error ?? "Failed to send message.");
      }

      setFormData({
        name: "",
        email: "",
        message: "",
        framework: frameworks[0],
      });
      onClose();
    } catch (sendError) {
      setError(
        sendError instanceof Error
          ? sendError.message
          : "Something went wrong. Please try again.",
      );
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/70 lg:bg-black/10 backdrop-blur-sm px-4 py-6 sm:px-[8%]">
      <div className="flex min-h-full w-full justify-center lg:justify-start items-center">
        <div className="flex w-full max-w-117.5 flex-col justify-center gap-4 sm:gap-7 py-8">
          <div className="space-y-1">
            <h1 className="title26 font-big font-bold">Open for hire</h1>
            <p className="title16 !text-white/70">
              I would love to hear about your projects.
            </p>
          </div>
          <form
            className="flex flex-col gap-4 sm:gap-7"
            onSubmit={handleSubmit}
          >
            <div className="flex flex-col border border-white/10 bg-primary-10 p-5 lg:p-8">
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
                    value={formData.name}
                    onChange={(event) =>
                      setFormData((prev) => ({
                        ...prev,
                        name: event.target.value,
                      }))
                    }
                  />
                </div>
                <div className="flex flex-col gap-2">
                  <label className="title18 text-primary font-big font-bold">Sending from</label>
                  <input
                    type="email"
                    required
                    placeholder="your.name@acme.com"
                    autoComplete="email"
                    inputMode="email"
                    className="h-12 border border-white/25 bg-black/60 px-3 font-iceland text-md tracking-[0.12em] uppercase placeholder:text-white/40 focus:border-white focus:outline-none"
                    value={formData.email}
                    onChange={(event) =>
                      setFormData((prev) => ({
                        ...prev,
                        email: event.target.value,
                      }))
                    }
                  />
                </div>
                <div className="flex flex-col gap-2">
                  <label className="title18 text-primary font-big font-bold">
                    Preferred framework
                  </label>
                  <select
                    className="h-12 border border-white/25 bg-black/60 px-3 font-iceland text-md tracking-[0.12em] uppercase placeholder:text-white/40 focus:border-white focus:outline-none"
                    value={formData.framework}
                    onChange={(event) =>
                      setFormData((prev) => ({
                        ...prev,
                        framework: event.target.value,
                      }))
                    }
                  >
                    {frameworks.map((framework) => (
                      <option key={framework} value={framework}>
                        {framework}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="flex flex-col gap-2">
                  <label className="title18 text-primary font-big font-bold">
                    Transmitted data
                  </label>
                  <textarea
                    required
                    placeholder="Hi, I write to you about..."
                    className="min-h-36 border border-white/25 bg-black/60 px-3 font-iceland text-md tracking-[0.12em] uppercase placeholder:text-white/40 focus:border-white focus:outline-none"
                    value={formData.message}
                    onChange={(event) =>
                      setFormData((prev) => ({
                        ...prev,
                        message: event.target.value,
                      }))
                    }
                  />
                </div>
              </div>
            </div>
            {error ? (
              <p className="title16 text-red-400">{error}</p>
            ) : null}
            <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:gap-4">
              <Button
                type="submit"
                disabled={submitting}
                label={submitting ? "Sending..." : "Send message [Enter]"}
                className="w-full px-4 sm:py-2 bg-primary text-dark border-primary disabled:opacity-60 disabled:cursor-not-allowed"
              />
              <Button
                type="button"
                label="Discard [Esc]"
                variant="outlined"
                onClick={onClose}
                className="w-full px-4 sm:py-2 text-white"
              />
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
