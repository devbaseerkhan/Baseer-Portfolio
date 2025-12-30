"use client";

import { useEffect, useRef, useState } from "react";

const DEFAULT_VIDEO = "/videos/video1.mp4";
const CONNECTION_VIDEO = "/videos/video2.mp4";
const VIDEO_CHANGE_EVENT = "connection-video-change";

export default function BeginningContent() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [videoSrc, setVideoSrc] = useState(DEFAULT_VIDEO);

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
    if (!video) return;

    video.currentTime = 0;
    void video.play();
  }, [videoSrc]);

  return (
    <div className="flex h-full w-full flex-col items-center gap-4 relative px-4 py-10 sm:px-6 sm:py-12">
      <div className="max-w-3xl relative z-10">
        <h1 className="text-center title18 hidden md:block">
          Swimming through a vast network of interconnected devices and servers,
          spreading joy and whimsy to users across the globe
        </h1>
      </div>
      <div className="absolute top-0 h-full w-full z-0 ">
        <video
          ref={videoRef}
          src={videoSrc}
          autoPlay
          loop={videoSrc !== CONNECTION_VIDEO}
          muted
          playsInline
          className="block h-full w-full object-cover"
        >
          Your browser does not support the video tag.
        </video>
      </div>
    </div>
  );
}
