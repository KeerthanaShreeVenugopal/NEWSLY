import { motion } from "framer-motion";
import AnimatedBackground from "./AnimatedBackground";
import { TrendingUp, Brain, Globe, Play, GitBranch, Zap } from "lucide-react";

const features = [
  {
    icon: Brain,
    title: "AI-Powered Personalization",
    description: "A mutual fund investor gets portfolio-relevant stories. A startup founder gets funding news. A student gets explainer-first content.",
    color: "gold" as const,
  },
  {
    icon: Zap,
    title: "Intelligence Briefings",
    description: "Instead of reading 8 articles about the Union Budget, interact with a single AI-powered deep briefing that synthesizes all coverage.",
    color: "electric" as const,
  },
  {
    icon: Play,
    title: "AI News Video Studio",
    description: "Transform any article into a broadcast-quality 60-120 second video with AI narration, animated data visuals, and contextual overlays.",
    color: "gold" as const,
  },
  {
    icon: GitBranch,
    title: "Story Arc Tracker",
    description: "Visual narrative of any ongoing story: interactive timeline, key players, sentiment shifts, and 'what to watch next' predictions.",
    color: "electric" as const,
  },
  {
    icon: Globe,
    title: "Vernacular Engine",
    description: "Context-aware translation into Hindi, Tamil, Telugu, Bengali — culturally adapted with local context, not literal translation.",
    color: "gold" as const,
  },
  {
    icon: TrendingUp,
    title: "Market Intelligence",
    description: "Real-time portfolio impact analysis, sector heatmaps, and AI-driven alerts on stories that move your investments.",
    color: "electric" as const,
  },
];

const colorStyles = {
  gold: {
    bg: "hsl(38 92% 55% / 0.08)",
    border: "hsl(38 92% 55% / 0.2)",
    icon: "text-gold",
    glow: "hsl(38 92% 55% / 0.15)",
  },
  electric: {
    bg: "hsl(210 100% 55% / 0.08)",
    border: "hsl(210 100% 55% / 0.2)",
    icon: "text-electric",
    glow: "hsl(210 100% 55% / 0.15)",
  },
};

const FeaturesSection = () => {
  return (
    <section id="features" className="relative py-32 px-6">
      <AnimatedBackground variant="features" />

      <div className="relative z-10 max-w-6xl mx-auto">
        <motion.div
          className="text-center mb-20"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <span className="inline-block px-4 py-1.5 rounded-full text-xs font-medium tracking-widest uppercase border border-gold/30 text-gold mb-6" style={{ background: "hsl(38 92% 55% / 0.08)" }}>
            Platform Features
          </span>
          <h2 className="text-4xl md:text-6xl font-bold tracking-tight font-['Space_Grotesk'] mb-4">
            Five Pillars of{" "}
            <span className="text-gradient-gold">Innovation</span>
          </h2>
          <p className="text-muted-foreground text-lg max-w-xl mx-auto">
            Each feature reimagines how business news should work in 2026.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, i) => {
            const style = colorStyles[feature.color];
            return (
              <motion.div
                key={feature.title}
                className="group relative rounded-2xl p-6 transition-all duration-300 hover:scale-[1.02]"
                style={{
                  background: style.bg,
                  border: `1px solid ${style.border}`,
                }}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: i * 0.1 }}
              >
                <div
                  className="w-12 h-12 rounded-xl flex items-center justify-center mb-4"
                  style={{ background: style.glow }}
                >
                  <feature.icon className={`w-6 h-6 ${style.icon}`} />
                </div>
                <h3 className="text-lg font-semibold mb-2 font-['Space_Grotesk']">{feature.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{feature.description}</p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;
