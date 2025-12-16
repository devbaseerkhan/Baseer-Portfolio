export default function BeginningContent() {
  return (
    <div className="flex h-full flex-col items-center gap-4 relative px-4 py-10 sm:px-6 sm:py-12">
      <div className="max-w-3xl relative z-10">
        <h1 className="text-center title18">
          Swimming through a vast network of interconnected devices and servers,
          spreading joy and whimsy to users across the globe
        </h1>
      </div>
      <div className="absolute top-0 h-full w-full z-0 ">
        <video
          src="/video.webm"
          autoPlay
          loop
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
