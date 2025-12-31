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

const MUSIC_ENABLED_KEY = "controls-music-enabled";
const SFX_ENABLED_KEY = "controls-sfx-enabled";

const tracks: Track[] = [
  {
    id: "lake-at-night",
    name: "Lake at Night",
    src: "/mp3/lake-at-night.mp3",
    volume: 0.9,
  },
];

export default function ControlsButtons({
  className = "",
  ...rest
}: ControlsButtonsProps) {
  const [isMusicOn, setIsMusicOn] = useState(true);
  const [sfxOn, setSfxOn] = useState(true);
  const [settingsReady, setSettingsReady] = useState(false);
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
      setMusicState(false);
      return;
    }

    const started = await playTrack(track);
    setMusicState(started);
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
    if (typeof window === "undefined") return;
    const storedMusic = window.localStorage.getItem(MUSIC_ENABLED_KEY);
    const storedSfx = window.localStorage.getItem(SFX_ENABLED_KEY);
    // Respect stored music preference; default to on if nothing stored.
    const musicEnabled = storedMusic === null ? true : storedMusic === "true";
    setIsMusicOn(musicEnabled);
    if (storedMusic === null) {
      window.localStorage.setItem(MUSIC_ENABLED_KEY, "true");
    }
    if (storedSfx !== null) {
      setSfxOn(storedSfx === "true");
    }
    setSettingsReady(true);
  }, []);

  useEffect(() => {
    if (!settingsReady || typeof window === "undefined") return;
    window.localStorage.setItem(MUSIC_ENABLED_KEY, String(isMusicOn));
  }, [isMusicOn, settingsReady]);

  useEffect(() => {
    if (!settingsReady || typeof window === "undefined") return;
    window.localStorage.setItem(SFX_ENABLED_KEY, String(sfxOn));
  }, [settingsReady, sfxOn]);

  const setMusicState = useCallback(
    (enabled: boolean) => {
      setIsMusicOn(enabled);
      if (typeof window !== "undefined") {
        window.localStorage.setItem(MUSIC_ENABLED_KEY, String(enabled));
      }
    },
    [],
  );

  const setSfxState = useCallback((enabled: boolean) => {
    setSfxOn(enabled);
    if (typeof window !== "undefined") {
      window.localStorage.setItem(SFX_ENABLED_KEY, String(enabled));
    }
  }, []);

  useEffect(() => {
    const track = getTrack(selectedTrackId);
    if (!settingsReady) return;
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
    if (!settingsReady || !isMusicOn) return;
    const track = getTrack(selectedTrackId);
    const timer = window.setTimeout(() => {
      if (!hasStartedRef.current) {
        void playTrack(track);
      }
    }, 250);
    return () => window.clearTimeout(timer);
  }, [getTrack, isMusicOn, playTrack, selectedTrackId, settingsReady]);

  // Initialize audio on mount so default-on can start as soon as allowed.
  useEffect(() => {
    if (!settingsReady) return;
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
  }, [applyTrackSettings, ensureAudio, getTrack, isMusicOn, playTrack, selectedTrackId, settingsReady]);

  useEffect(() => {
    if (!settingsReady || !isMusicOn) return;
    const onFirstInteraction = () => {
      if (hasStartedRef.current) return;
      const track = getTrack(selectedTrackId);
      void playTrack(track);
    };
    window.addEventListener("pointerdown", onFirstInteraction, { once: true });
    return () =>
      window.removeEventListener("pointerdown", onFirstInteraction);
  }, [getTrack, isMusicOn, playTrack, selectedTrackId, settingsReady]);

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
    if (!settingsReady) return;
    broadcastSfx(sfxOn);
  }, [settingsReady, sfxOn]);

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
        onClick={() => setSfxState(!sfxOn)}
        variant="outlined"
        className="border-0"
      />
    </div>
  );
}
