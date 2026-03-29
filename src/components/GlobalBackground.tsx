export default function GlobalBackground() {
  return (
    <div className="fixed top-0 left-0 w-full h-full -z-10 overflow-hidden">
      
      {/* VIDEO BACKGROUND */}
      <video
        autoPlay
        loop
        muted
        playsInline
        className="w-full h-full object-cover opacity-50 brightness-125"
      >
        <source src="/videos/bg.mp4" type="video/mp4" />
      </video>

      {/* DARK OVERLAY (important for readability) */}
      <div className="absolute inset-0 bg-black/50"></div>
    </div>
  );
}