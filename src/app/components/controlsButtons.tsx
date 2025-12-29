"use client";

import type React from "react";
import { useCallback, useEffect, useRef, useState } from "react";
import { CgCheckR, CgCloseR } from "react-icons/cg";
import Button from "./Button";

type ControlsButtonsProps = React.HTMLAttributes<HTMLDivElement> & {
  className?: string;
};

type Track = {
  id: string;
  name: string;
  src: string;
  volume?: number;
};

const tracks: Track[] = [
  {
    id: "retro-chase",
    name: "Retro Chase",
    src: "/mp3/retro-gaming.mp3",
    volume: 0.5,
  },
  {
    id: "epic-cinematic",
    name: "Epic Cinematic",
    src: "/mp3/epic-cinematic.mp3",
    volume: 0.5,
  },
  {
    id: "edm-gaming",
    name: "Edm Gaming",
    src: "/mp3/edm-gaming.mp3",
    volume: 0.5,
  },
  {
    id: "cybernetic-overload",
    name: "Cybernetic",
    src: "/mp3/cybernetic-overload.mp3",
    volume: 0.5,
  },
  {
    id: "echoes-of-a-lost-kingdom",
    name: "Lost Kingdom",
    src: "/mp3/echoes-of-a-lost-kingdom.mp3",
    volume: 0.5,
  },
  {
    id: "whispering-bamboo",
    name: "Whispering",
    src: "/mp3/whispering-bamboo.mp3",
    volume: 0.5,
  },
];

export default function ControlsButtons({
  className = "",
  ...rest
}: ControlsButtonsProps) {
  const [isMusicOn, setIsMusicOn] = useState(true);
  const [sfxOn, setSfxOn] = useState(true);
  const [selectedTrackId, setSelectedTrackId] = useState(tracks[0].id);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const hasStartedRef = useRef(false);
  const broadcastSfx = (enabled: boolean) => {
    if (typeof window === "undefined") return;
    window.dispatchEvent(
      new CustomEvent("button-sfx-toggle", { detail: { enabled } }),
    );
  };

  const getTrack = useCallback(
    (id: string) => tracks.find((t) => t.id === id) ?? tracks[0],
    []
  );

  const ensureAudio = useCallback(() => {
    if (typeof Audio === "undefined") return null;
    if (!audioRef.current) {
      const audio = new Audio();
      audio.loop = true;
      audio.preload = "auto";
      audio.crossOrigin = "anonymous";
      audioRef.current = audio;
    }
    return audioRef.current;
  }, []);

  const applyTrackSettings = useCallback((audio: HTMLAudioElement, track: Track) => {
    audio.src = track.src;
    audio.volume = track.volume ?? 0.3;
  }, []);

  const playTrack = useCallback(async (track: Track) => {
    const audio = ensureAudio();
    if (!audio) return false;
    audio.pause();
    audio.currentTime = 0;
    applyTrackSettings(audio, track);
    try {
      await audio.play();
      hasStartedRef.current = true;
      return true;
    } catch {
      return false;
    }
  }, [applyTrackSettings, ensureAudio]);

  const handleToggleMusic = async () => {
    const track = getTrack(selectedTrackId);
    const audio = ensureAudio();
    if (!audio) return;

    if (isMusicOn) {
      audio.pause();
      setIsMusicOn(false);
      return;
    }

    const started = await playTrack(track);
    setIsMusicOn(started);
  };

  const handleTrackChange: React.ChangeEventHandler<HTMLSelectElement> = (
    event,
  ) => {
    const nextId = event.target.value;
    const track = getTrack(nextId);
    setSelectedTrackId(nextId);

    void (async () => {
      if (isMusicOn) {
        const started = await playTrack(track);
        if (!started) {
          // leave isMusicOn true so user can trigger playback with a click if autoplay is blocked
        }
      } else {
        const audio = ensureAudio();
        if (audio) {
          applyTrackSettings(audio, track);
          audio.load();
        }
      }
    })();
  };

  useEffect(() => {
    const track = getTrack(selectedTrackId);
    if (isMusicOn) {
      void playTrack(track);
    } else {
      const audio = ensureAudio();
      if (audio) {
        audio.pause();
        applyTrackSettings(audio, track);
      }
    }
  }, [applyTrackSettings, ensureAudio, getTrack, isMusicOn, playTrack, selectedTrackId]);

  // Try to kick off playback shortly after mount (helps default-on behavior).
  useEffect(() => {
    if (!isMusicOn) return;
    const track = getTrack(selectedTrackId);
    const timer = window.setTimeout(() => {
      if (!hasStartedRef.current) {
        void playTrack(track);
      }
    }, 250);
    return () => window.clearTimeout(timer);
  }, [getTrack, isMusicOn, playTrack, selectedTrackId]);

  // Initialize audio on mount so default-on can start as soon as allowed.
  useEffect(() => {
    const track = getTrack(selectedTrackId);
    const audio = ensureAudio();
    if (!audio) return;
    applyTrackSettings(audio, track);
    if (isMusicOn) {
      void playTrack(track);
    } else {
      audio.load();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []); // run once on mount

  useEffect(() => {
    if (!isMusicOn) return;
    const onFirstInteraction = () => {
      if (hasStartedRef.current) return;
      const track = getTrack(selectedTrackId);
      void playTrack(track);
    };
    window.addEventListener("pointerdown", onFirstInteraction, { once: true });
    return () =>
      window.removeEventListener("pointerdown", onFirstInteraction);
  }, [getTrack, isMusicOn, playTrack, selectedTrackId]);

  useEffect(
    () => () => {
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current = null;
      }
    },
    [],
  );

  useEffect(() => {
    broadcastSfx(sfxOn);
  }, [sfxOn]);

  return (
    <div
      className={`flex flex-col gap-3 border-t border-white/10 pt-3 ${className}`}
      {...rest}
    >
      <div className="flex flex-col gap-3">
        <div className="w-full px-2.5">
          <select
            className="flex-1 w-full rounded border border-primary bg-white/5 px-3 py-2 text-sm uppercase tracking-[0.14em] text-primary outline-none"
            value={selectedTrackId}
            onChange={handleTrackChange}
            aria-label="Select background music"
          >
            {tracks.map((track) => (
              <option key={track.id} value={track.id}>
                {track.name}
              </option>
            ))}
          </select>
        </div>
        <Button
          label={isMusicOn ? "Music On" : "Music Off"}
          icon={
            isMusicOn ? (
              <CgCheckR className="text-3xl" />
            ) : (
              <CgCloseR className="text-3xl" />
            )
          }
          onClick={handleToggleMusic}
          variant="outlined"
          className="border-0"
        />
      </div>
      <Button
        label={sfxOn ? "Sound On" : "Sound Off"}
        icon={
          sfxOn ? (
            <CgCheckR className="text-3xl" />
          ) : (
            <CgCloseR className="text-3xl" />
          )
        }
        onClick={() => setSfxOn((prev) => !prev)}
        variant="outlined"
        className="border-0"
      />
    </div>
  );
}
