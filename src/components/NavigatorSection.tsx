import { motion } from "framer-motion";
import AnimatedBackground from "./AnimatedBackground";
import { MessageSquare, Layers, ChevronRight, Sparkles } from "lucide-react";

const briefingTopics = [
  { title: "Union Budget 2026 — Complete Analysis", sources: 12, readTime: "8 min", hot: true },
  { title: "RBI Monetary Policy: What Changed?", sources: 8, readTime: "5 min", hot: true },
  { title: "India's Semiconductor Push: Progress Report", sources: 6, readTime: "6 min", hot: false },
  { title: "EV Market Disruption: Q1 2026 Trends", sources: 9, readTime: "7 min", hot: false },
];

const followUpQuestions = [
  "How does this affect mid-cap IT stocks?",
  "Compare with last year's budget allocation",
  "What are analysts predicting for Q3?",
  "Show me the global context",
];

const NavigatorSection = () => {
  return (
    <section id="navigator" className="relative py-32 px-6">
      <AnimatedBackground variant="navigator" />

      <div className="relative z-10 max-w-6xl mx-auto">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <span className="inline-block px-4 py-1.5 rounded-full text-xs font-medium tracking-widest uppercase border border-gold/30 text-gold mb-6" style={{ background: "hsl(38 92% 55% / 0.08)" }}>
            News Navigator
          </span>
          <h2 className="text-4xl md:text-6xl font-bold tracking-tight font-['Space_Grotesk'] mb-4">
            Interactive{" "}
            <span className="text-gradient-gold">Briefings</span>
          </h2>
          <p className="text-muted-foreground text-lg max-w-xl mx-auto">
            Stop reading 8 articles. Get one AI-powered deep briefing you can explore.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Briefing list */}
          <motion.div
            className="space-y-4"
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider flex items-center gap-2 mb-4">
              <Layers className="w-4 h-4" /> Today's Briefings
            </h3>
            {briefingTopics.map((topic, i) => (
              <div
                key={topic.title}
                className={`p-4 rounded-xl cursor-pointer transition-all hover:scale-[1.01] ${
                  i === 0 ? "glass-strong border-gold/20" : "glass"
                }`}
                style={i === 0 ? { borderColor: "hsl(38 92% 55% / 0.3)" } : {}}
              >
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      {topic.hot && (
                        <span className="text-[9px] px-1.5 py-0.5 rounded bg-gold/15 text-gold font-bold">TRENDING</span>
                      )}
                      <span className="text-[10px] text-muted-foreground">{topic.sources} sources • {topic.readTime}</span>
                    </div>
                    <p className="text-sm font-medium">{topic.title}</p>
                  </div>
                  <ChevronRight className="w-4 h-4 text-muted-foreground shrink-0 mt-1" />
                </div>
              </div>
            ))}
          </motion.div>

          {/* Interactive briefing preview */}
          <motion.div
            className="rounded-2xl glass-strong p-6 space-y-5"
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <div className="flex items-center gap-2 text-gold">
              <Sparkles className="w-4 h-4" />
              <span className="text-xs font-semibold uppercase tracking-wider">AI Briefing Active</span>
            </div>

            <h3 className="text-xl font-bold font-['Space_Grotesk']">Union Budget 2026 — Complete Analysis</h3>

            <div className="space-y-3 text-sm text-muted-foreground leading-relaxed">
              <p>
                Finance Minister announced a <span className="text-foreground font-medium">₹48.2 lakh crore</span> budget with significant focus on infrastructure (+18% YoY) and technology sectors. Key highlights include:
              </p>
              <div className="space-y-2 pl-4 border-l-2 border-gold/30">
                <p>• Defence budget raised to <span className="text-foreground">₹6.2 lakh crore</span> (+12%)</p>
                <p>• New PLI scheme for <span className="text-foreground">AI & semiconductors</span> worth ₹25,000 crore</p>
                <p>• Tax relief for income up to <span className="text-foreground">₹12 lakh</span></p>
                <p>• Green energy allocation doubled to <span className="text-foreground">₹35,000 crore</span></p>
              </div>
            </div>

            <div>
              <p className="text-xs text-muted-foreground uppercase tracking-wider mb-3 flex items-center gap-2">
                <MessageSquare className="w-3 h-3" /> Ask follow-up questions
              </p>
              <div className="flex flex-wrap gap-2">
                {followUpQuestions.map((q) => (
                  <button
                    key={q}
                    className="text-xs px-3 py-1.5 rounded-lg text-electric border border-electric/20 hover:bg-electric/10 transition-colors"
                    style={{ background: "hsl(210 100% 55% / 0.05)" }}
                  >
                    {q}
                  </button>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default NavigatorSection;
