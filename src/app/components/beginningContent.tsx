"use client";

import { useEffect, useRef, useState } from "react";

const DEFAULT_VIDEO = "/videos/video1.mp4";
const CONNECTION_VIDEO = "/videos/video2.mp4";
const VIDEO_CHANGE_EVENT = "connection-video-change";

export default function BeginningContent() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [videoSrc, setVideoSrc] = useState(DEFAULT_VIDEO);
  const [shouldLoadVideo, setShouldLoadVideo] = useState(false);
  const [allowAutoplay, setAllowAutoplay] = useState(false);

  useEffect(() => {
    const handleVideoChange = (event: Event) => {
      const newSrc = (event as CustomEvent<string>).detail;
      if (typeof newSrc === "string" && newSrc.length > 0) {
        setVideoSrc(newSrc);
      }
    };

    window.addEventListener(VIDEO_CHANGE_EVENT, handleVideoChange);
    return () => {
      window.removeEventListener(VIDEO_CHANGE_EVENT, handleVideoChange);
    };
  }, []);

  useEffect(() => {
    const video = videoRef.current;
    if (!video || !shouldLoadVideo) return;

    video.load();
    video.currentTime = 0;
    if (allowAutoplay) {
      void video.play();
    }
  }, [allowAutoplay, shouldLoadVideo, videoSrc]);

  // Kick playback after client-side checks approve autoplay (saves data on slow networks).
  useEffect(() => {
    if (!allowAutoplay || !shouldLoadVideo) return;
    const video = videoRef.current;
    if (!video) return;
    if (video.paused) {
      void video.play();
    }
  }, [allowAutoplay, shouldLoadVideo]);

  // For users with data-saver or reduced motion, only play after first interaction.
  useEffect(() => {
    if (!shouldLoadVideo || allowAutoplay) return;
    const onFirstInteraction = () => {
      const video = videoRef.current;
      if (video) {
        void video.play();
      }
    };
    window.addEventListener("pointerdown", onFirstInteraction, { once: true });
    return () =>
      window.removeEventListener("pointerdown", onFirstInteraction);
  }, [allowAutoplay, shouldLoadVideo]);

  // Delay loading the video until the hero is on screen.
  useEffect(() => {
    const node = containerRef.current;
    if (!node) return;
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries.some((entry) => entry.isIntersecting);
        if (visible) {
          setShouldLoadVideo(true);
          observer.disconnect();
        }
      },
      { threshold: 0.2 }
    );
    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  // Respect save-data and reduced-motion preferences before autoplaying the hero video.
  useEffect(() => {
    if (typeof window === "undefined") return;
    let mounted = true;
    const computeAllowAutoplay = () => {
      const prefersReducedMotion =
        window.matchMedia?.("(prefers-reduced-motion: reduce)").matches;
      const connection =
        (navigator as Navigator & { connection?: { saveData?: boolean } })
          .connection;
      const saveDataEnabled = connection?.saveData;
      return !prefersReducedMotion && !saveDataEnabled;
    };

    const timeoutId = window.setTimeout(() => {
      if (!mounted) return;
      setAllowAutoplay(computeAllowAutoplay());
    }, 0);

    return () => {
      mounted = false;
      window.clearTimeout(timeoutId);
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className="flex h-full w-full flex-col items-center gap-4 relative px-4 py-10 sm:px-6 sm:py-12"
    >
      <div className="max-w-3xl relative z-10">
        <h1 className="text-center title18 hidden md:block">
          Swimming through a vast network of interconnected devices and servers,
          spreading joy and whimsy to users across the globe
        </h1>
      </div>
      <div className="absolute top-0 h-full w-full z-0 ">
        {shouldLoadVideo ? (
          <video
            ref={videoRef}
            src={videoSrc}
            autoPlay={allowAutoplay}
            loop={videoSrc !== CONNECTION_VIDEO}
            muted
            playsInline
            preload="metadata"
            className="block h-full w-full object-cover"
          >
            Your browser does not support the video tag.
          </video>
        ) : (
          <div className="block h-full w-full bg-gradient-to-b from-[#050b14] via-[#0a1a2c] to-[#040912]" />
        )}
      </div>
    </div>
  );
}
