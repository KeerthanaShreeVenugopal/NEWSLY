import { useEffect, useRef, useState } from "react";

interface Particle {
  id: number;
  x: number;
  y: number;
  size: number;
  delay: number;
  duration: number;
  color: "gold" | "electric" | "muted";
}

type BgVariant = "hero" | "features" | "navigator" | "dashboard" | "storyarc";

const bgImages: Record<BgVariant, string> = {
  hero: "/images/bg-hero.jpg",
  features: "/images/bg-hero.jpg",
  navigator: "/images/bg-navigator.jpg",
  dashboard: "/images/bg-dashboard.jpg",
  storyarc: "/images/bg-storyarc.jpg",
};

const AnimatedBackground = ({ variant = "hero" }: { variant?: BgVariant }) => {
  const ref = useRef<HTMLDivElement>(null);
  const [offsetY, setOffsetY] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      if (ref.current) {
        const rect = ref.current.getBoundingClientRect();
        setOffsetY(rect.top * -0.15);
      }
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const [particles] = useState<Particle[]>(() =>
    Array.from({ length: 20 }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * 4 + 1,
      delay: Math.random() * 5,
      duration: Math.random() * 8 + 6,
      color: i % 3 === 0 ? "gold" : i % 3 === 1 ? "electric" : "muted",
    }))
  );

  const colorMap = {
    gold: "bg-gold/40",
    electric: "bg-electric/30",
    muted: "bg-muted-foreground/15",
  };

//   return (
//     <div ref={ref} className="absolute inset-0 overflow-hidden pointer-events-none">
  
//       {/* 🎬 BASE VIDEO (newspaper) */}
//       {/* 🎬 BASE VIDEO */}
// <video
//   autoPlay
//   muted
//   loop
//   playsInline
//   className="absolute inset-[-80px] w-[calc(100%+160px)] h-[calc(100%+160px)] object-cover z-0"
//   style={{
//     transform: `translateY(${offsetY}px)`,
//     willChange: "transform",
//   }}
// >
//   <source src="/videos/topvdo.mp4" type="video/mp4" />
// </video>

// {/* ✨ GLOW VIDEO */}
// <video
//   autoPlay
//   muted
//   loop
//   playsInline
//   className="absolute inset-0 w-full h-full object-cover opacity-30 mix-blend-screen blur-sm z-10"
// >
//   <source src="/videos/bottomvdo.mp4" type="video/mp4" />
// </video>

// {/* 🌑 OVERLAY */}
// <div className="absolute inset-0 bg-black/30 z-20" />
  
//       {/* 🎨 GRADIENT OVERLAY */}
//       <div
//         className="absolute inset-0 animate-bg-shift opacity-30"
//         style={{
//           background:
//             "linear-gradient(135deg, hsl(38 92% 55% / 0.06) 0%, transparent 30%, hsl(210 100% 55% / 0.05) 60%, transparent 100%)",
//           backgroundSize: "400% 400%",
//         }}
//       />
  
//       {/* 🧱 GRID LINES */}
//       <div
//         className="absolute inset-0 opacity-[0.025]"
//         style={{
//           backgroundImage:
//             "linear-gradient(hsl(38 92% 55% / 0.4) 1px, transparent 1px), linear-gradient(90deg, hsl(38 92% 55% / 0.4) 1px, transparent 1px)",
//           backgroundSize: "80px 80px",
//         }}
//       />
  
//       {/* 📡 SCAN LINE */}
//       <div className="absolute inset-0">
//         <div
//           className="absolute w-full h-[2px] animate-scan-line"
//           style={{
//             background:
//               "linear-gradient(90deg, transparent, hsl(38 92% 55% / 0.12), transparent)",
//           }}
//         />
//       </div>
  
//       {/* ✨ PARTICLES */}
//       {particles.map((p) => (
//         <div
//           key={p.id}
//           className={`absolute rounded-full ${colorMap[p.color]} animate-float`}
//           style={{
//             left: `${p.x}%`,
//             top: `${p.y}%`,
//             width: `${p.size}px`,
//             height: `${p.size}px`,
//             animationDelay: `${p.delay}s`,
//             animationDuration: `${p.duration}s`,
//             filter: `blur(${p.size > 3 ? 1 : 0}px)`,
//           }}
//         />
//       ))}
  
//       {/* 🌟 AMBIENT ORBS */}
//       <div
//         className="absolute w-[500px] h-[500px] rounded-full animate-pulse-glow"
//         style={{
//           top: "-10%",
//           right: "-10%",
//           background:
//             "radial-gradient(circle, hsl(38 92% 55% / 0.07), transparent 70%)",
//         }}
//       />
//       <div
//         className="absolute w-[400px] h-[400px] rounded-full animate-pulse-glow"
//         style={{
//           bottom: "10%",
//           left: "-5%",
//           background:
//             "radial-gradient(circle, hsl(210 100% 55% / 0.05), transparent 70%)",
//           animationDelay: "2s",
//         }}
//       />
  
//       {/* 🌑 VIGNETTE */}
//       <div
//         className="absolute inset-0"
//         style={{
//           background:
//             "radial-gradient(ellipse at center, transparent 40%, hsl(222 47% 4% / 0.6) 100%)",
//         }}
//       />
//     </div>
//   );
return (
  <div className="w-screen h-screen">
    <video
      autoPlay
      muted
      loop
      playsInline
      className="w-full h-full object-cover"
    >
      <source src="/videos/topvdo.mp4" type="video/mp4" />
    </video>
  </div>
);
};

export default AnimatedBackground;
