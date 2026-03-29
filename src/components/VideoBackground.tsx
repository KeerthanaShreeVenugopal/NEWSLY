export default function GlobalBackground() {
  return (
    <div className="fixed inset-0 z-0 overflow-hidden">
      
      {/* VIDEO */}
      <video
        autoPlay
        loop
        muted
        playsInline
        className="absolute w-full h-full object-cover opacity-40"
      >
        <source src="/videos/bg.mp4" type="video/mp4" />
      </video>

      {/* OVERLAY */}
      <div className="absolute inset-0 bg-black/40"></div>
    </div>
  );
}