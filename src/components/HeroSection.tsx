import { motion } from "framer-motion";
import AnimatedBackground from "./AnimatedBackground";
import NewsTicker from "./NewsTicker";

const HeroSection = () => {
  return (
    <section className="relative min-h-[55vh] flex flex-col">
      <AnimatedBackground variant="hero" />

      {/* Nav */}
      <nav className="relative z-10 flex items-center justify-between px-8 py-3">
        <div className="flex items-center gap-3">
          <div
            className="w-10 h-10 rounded-lg flex items-center justify-center"
            style={{ background: "var(--gradient-gold)" }}
          >
            <span className="text-primary-foreground font-bold text-lg font-['Space_Grotesk']">
              ET
            </span>
          </div>

          <span className="text-xl font-semibold tracking-tight font-['Space_Grotesk']">
            My <span className="text-gradient-gold">ET</span>
          </span>
        </div>

        <div className="hidden md:flex items-center gap-5 text-sm text-muted-foreground">
          <a href="#features" className="hover:text-foreground transition-colors">
            Features
          </a>
          <a href="#navigator" className="hover:text-foreground transition-colors">
            Navigator
          </a>
          <a href="#dashboard" className="hover:text-foreground transition-colors">
            Dashboard
          </a>
          <a href="#tracker" className="hover:text-foreground transition-colors">
            Story Arc
          </a>

          <button
            className="px-4 py-2 rounded-lg text-primary-foreground font-medium text-sm"
            style={{ background: "var(--gradient-gold)" }}
          >
            Get Early Access
          </button>
        </div>
      </nav>

      {/* Ticker */}
      <NewsTicker />

      {/* Hero Content */}
      <div className="relative z-10 flex items-center justify-center px-6 py-4">
        <div className="max-w-4xl mx-auto text-center">

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <span
              className="inline-block px-4 py-1.5 rounded-full text-xs font-medium tracking-widest uppercase border border-gold/30 text-gold mb-4"
              style={{ background: "hsl(38 92% 55% / 0.08)" }}
            >
              The Future of Business News
            </span>
          </motion.div>

          <motion.h1
            className="text-4xl md:text-6xl lg:text-7xl font-bold tracking-tight leading-[1.05] mb-3 font-['Space_Grotesk']"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            News That{" "}
            <span className="text-gradient-gold">Knows</span>
            <br />
            <span className="text-gradient-electric">You</span>
          </motion.h1>

          <motion.p
            className="text-base md:text-lg text-muted-foreground max-w-xl mx-auto mb-5"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            AI-powered briefings and personalized insights for every reader.
          </motion.p>

          <motion.div
            className="flex flex-col sm:flex-row gap-3 justify-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            <button
              className="px-6 py-3 rounded-xl font-semibold text-primary-foreground text-sm"
              style={{ background: "var(--gradient-gold)" }}
            >
              Experience →
            </button>

            <button className="px-6 py-3 rounded-xl font-semibold text-foreground text-sm glass">
              Watch Demo
            </button>
          </motion.div>

          {/* Stats */}
          <motion.div
            className="mt-8 grid grid-cols-3 gap-5 max-w-md mx-auto"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
          >
            {[
              { value: "2M+", label: "Readers" },
              { value: "15+", label: "Languages" },
              { value: "98%", label: "Relevance" },
            ].map((stat) => (
              <div key={stat.label} className="text-center">
                <div className="text-xl md:text-2xl font-bold text-gradient-gold">
                  {stat.value}
                </div>
                <div className="text-xs text-muted-foreground mt-1 uppercase">
                  {stat.label}
                </div>
              </div>
            ))}
          </motion.div>

        </div>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        className="relative z-10 flex justify-center pb-2"
        animate={{ y: [0, 5, 0] }}
        transition={{ duration: 2, repeat: Infinity }}
      >
        <div className="w-5 h-8 rounded-full border border-muted-foreground/30 flex justify-center pt-1">
          <div className="w-1 h-2 rounded-full bg-gold" />
        </div>
      </motion.div>

    </section>
  );
};

export default HeroSection;