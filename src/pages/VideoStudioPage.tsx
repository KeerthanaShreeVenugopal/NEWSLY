import { useState } from "react";
import { motion } from "framer-motion";
import { Play, Loader2, Video, Sparkles } from "lucide-react";
import VideoBackground from "@/components/VideoBackground";
import Navbar from "@/components/Navbar";
import ArticleTabs from "@/components/ArticleTabs";

const VideoStudioPage = () => {
  const [generating, setGenerating] = useState(false);
  const [progress, setProgress] = useState(0);
  const [generated, setGenerated] = useState(false);

  const handleGenerate = () => {
    setGenerating(true);
    setProgress(0);
    setGenerated(false);
    const interval = setInterval(() => {
      setProgress((p) => {
        if (p >= 100) {
          clearInterval(interval);
          setGenerating(false);
          setGenerated(true);
          return 100;
        }
        return p + 2;
      });
    }, 80);
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <section className="pt-20">
        <ArticleTabs />
        {/* Page content */}
      
      <section className="relative min-h-screen pt-20">
        <VideoBackground variant="hero" />

        <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 py-6 sm:py-10">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <div className="text-center mb-8 sm:mb-10">
              <span className="inline-block px-4 py-1.5 rounded-full text-xs font-medium tracking-widest uppercase border border-gold/40 text-gold mb-4" style={{ background: "hsl(var(--gold) / 0.12)" }}>
                AI Video Studio
              </span>
              <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold font-['Space_Grotesk'] text-foreground">
                AI News <span className="text-gradient-gold">Video</span>
              </h1>
              <p className="text-foreground/65 mt-2 text-sm sm:text-base">Transform any article into a broadcast-quality video</p>
            </div>

            {/* Video Player Placeholder */}
            <div className="glass rounded-2xl overflow-hidden mb-6 sm:mb-8 aspect-video flex items-center justify-center relative">
              {generated ? (
                <div className="absolute inset-0 flex items-center justify-center bg-background/40">
                  <div className="text-center">
                    <Video className="w-12 sm:w-16 h-12 sm:h-16 text-gold mx-auto mb-3" />
                    <p className="text-sm text-foreground/65">AI-generated news video ready</p>
                    <button className="mt-4 px-6 py-2.5 rounded-xl text-sm font-medium text-primary-foreground flex items-center gap-2 mx-auto" style={{ background: "var(--gradient-gold)" }}>
                      <Play className="w-4 h-4" /> Play Video
                    </button>
                  </div>
                </div>
              ) : generating ? (
                <div className="text-center px-6 sm:px-10 w-full">
                  <Loader2 className="w-10 sm:w-12 h-10 sm:h-12 text-gold mx-auto mb-4 animate-spin" />
                  <p className="text-sm text-foreground/65 mb-3">Generating AI video...</p>
                  <div className="w-full max-w-md mx-auto bg-secondary/60 rounded-full h-2 overflow-hidden">
                    <motion.div
                      className="h-full rounded-full"
                      style={{ background: "var(--gradient-gold)", width: `${progress}%` }}
                    />
                  </div>
                  <p className="text-xs text-foreground/50 mt-2">{progress}% — {progress < 30 ? "Analyzing article..." : progress < 60 ? "Generating visuals..." : progress < 90 ? "Adding narration..." : "Finalizing..."}</p>
                </div>
              ) : (
                <div className="text-center">
                  <Video className="w-12 sm:w-16 h-12 sm:h-16 text-foreground/25 mx-auto mb-3" />
                  <p className="text-sm text-foreground/55">Select an article and generate a video</p>
                </div>
              )}
            </div>

            {/* Generate button */}
            <div className="text-center mb-8 sm:mb-10">
              <button
                onClick={handleGenerate}
                disabled={generating}
                className="px-6 sm:px-8 py-3 sm:py-3.5 rounded-xl font-semibold text-primary-foreground text-sm sm:text-base inline-flex items-center gap-2 disabled:opacity-50"
                style={{ background: "var(--gradient-gold)", boxShadow: "var(--shadow-gold)" }}
              >
                <Sparkles className="w-5 h-5" />
                {generating ? "Generating..." : "Generate Video"}
              </button>
            </div>

            {/* Features */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4">
              {[
                { title: "AI Narration", desc: "Natural-sounding voiceover in multiple languages" },
                { title: "Data Visuals", desc: "Animated charts, graphs, and infographics" },
                { title: "60-120 Seconds", desc: "Optimized for social media and quick consumption" },
              ].map((f, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  className="glass rounded-2xl p-4 sm:p-5 text-center"
                >
                  <h4 className="text-sm font-semibold font-['Space_Grotesk'] text-gold mb-1">{f.title}</h4>
                  <p className="text-xs text-foreground/60">{f.desc}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>
      </section>
    </div>
  );
};

export default VideoStudioPage;
