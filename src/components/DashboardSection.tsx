import { motion } from "framer-motion";
import AnimatedBackground from "./AnimatedBackground";
import { TrendingUp, TrendingDown, BarChart3, PieChart, Activity, Bell, Search, User, Settings } from "lucide-react";

const marketData = [
  { name: "RELIANCE", price: "₹2,940", change: "+1.1%", up: true },
  { name: "TCS", price: "₹3,890", change: "-0.4%", up: false },
  { name: "HDFC BANK", price: "₹1,720", change: "+2.3%", up: true },
  { name: "INFOSYS", price: "₹1,620", change: "+0.9%", up: true },
  { name: "WIPRO", price: "₹485", change: "-1.2%", up: false },
];

const newsItems = [
  { category: "MARKETS", title: "RBI holds repo rate at 6.5%, signals accommodative stance", time: "2m ago", impact: "high" },
  { category: "STARTUPS", title: "Zepto raises $350M at $5B valuation in Series F", time: "15m ago", impact: "medium" },
  { category: "POLICY", title: "Union Budget 2026: Key highlights for IT sector", time: "1h ago", impact: "high" },
  { category: "GLOBAL", title: "Fed signals potential rate cut in Q2 2026", time: "2h ago", impact: "high" },
  { category: "TECH", title: "India's AI startups attract record $4.2B in H1 2026", time: "3h ago", impact: "medium" },
];

const sectorData = [
  { name: "IT", value: 85, change: "+2.4%" },
  { name: "Banking", value: 72, change: "+1.8%" },
  { name: "Pharma", value: 45, change: "-0.6%" },
  { name: "Auto", value: 68, change: "+1.2%" },
  { name: "Energy", value: 90, change: "+3.1%" },
];

const MiniChart = ({ up }: { up: boolean }) => {
  const points = up
    ? "0,20 10,18 20,22 30,15 40,12 50,14 60,8 70,5 80,7 90,3 100,2"
    : "0,5 10,8 20,6 30,12 40,15 50,13 60,18 70,20 80,17 90,22 100,20";
  return (
    <svg viewBox="0 0 100 24" className="w-20 h-6">
      <polyline fill="none" stroke={up ? "#34d399" : "#f87171"} strokeWidth="2" points={points} />
    </svg>
  );
};

const DashboardSection = () => {
  return (
    <section id="dashboard" className="relative py-32 px-6">
      <AnimatedBackground variant="dashboard" />

      <div className="relative z-10 max-w-7xl mx-auto">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <span className="inline-block px-4 py-1.5 rounded-full text-xs font-medium tracking-widest uppercase border border-electric/30 text-electric mb-6" style={{ background: "hsl(210 100% 55% / 0.08)" }}>
            Your Newsroom
          </span>
          <h2 className="text-4xl md:text-6xl font-bold tracking-tight font-['Space_Grotesk'] mb-4">
            Professional{" "}
            <span className="text-gradient-electric">Dashboard</span>
          </h2>
          <p className="text-muted-foreground text-lg max-w-xl mx-auto">
            Your personalized command center for business intelligence.
          </p>
        </motion.div>

        {/* Dashboard mockup */}
        <motion.div
          className="rounded-2xl overflow-hidden glass-strong"
          style={{ boxShadow: "0 25px 80px -20px hsl(0 0% 0% / 0.6)" }}
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1 }}
        >
          {/* Top bar */}
          <div className="flex items-center justify-between px-6 py-3 border-b border-border/50">
            <div className="flex items-center gap-4">
              <div className="flex gap-1.5">
                <div className="w-3 h-3 rounded-full bg-red-500/70" />
                <div className="w-3 h-3 rounded-full bg-yellow-500/70" />
                <div className="w-3 h-3 rounded-full bg-green-500/70" />
              </div>
              <span className="text-xs text-muted-foreground font-mono">my-et.dashboard</span>
            </div>
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-secondary/50 text-muted-foreground text-xs">
                <Search className="w-3 h-3" />
                <span>Search news, stocks, topics...</span>
              </div>
              <Bell className="w-4 h-4 text-muted-foreground" />
              <Settings className="w-4 h-4 text-muted-foreground" />
              <div className="w-7 h-7 rounded-full bg-gold/20 flex items-center justify-center">
                <User className="w-3.5 h-3.5 text-gold" />
              </div>
            </div>
          </div>

          <div className="grid lg:grid-cols-12 gap-0">
            {/* Sidebar */}
            <div className="lg:col-span-2 border-r border-border/30 p-4 hidden lg:block">
              <div className="space-y-1 text-sm">
                {["Overview", "My Feed", "Markets", "Watchlist", "Briefings", "Story Arcs", "Video Studio", "Settings"].map((item, i) => (
                  <div
                    key={item}
                    className={`px-3 py-2 rounded-lg cursor-pointer transition-colors ${
                      i === 0 ? "bg-gold/10 text-gold font-medium" : "text-muted-foreground hover:text-foreground hover:bg-secondary/50"
                    }`}
                  >
                    {item}
                  </div>
                ))}
              </div>
            </div>

            {/* Main content */}
            <div className="lg:col-span-7 p-5 space-y-5">
              {/* Portfolio impact */}
              <div className="rounded-xl p-4" style={{ background: "hsl(38 92% 55% / 0.05)", border: "1px solid hsl(38 92% 55% / 0.15)" }}>
                <div className="flex items-center justify-between mb-3">
                  <h3 className="text-sm font-semibold font-['Space_Grotesk'] flex items-center gap-2">
                    <Activity className="w-4 h-4 text-gold" />
                    Portfolio Impact Today
                  </h3>
                  <span className="text-xs text-emerald-400 font-medium">+₹24,500 (+1.8%)</span>
                </div>
                {/* Chart placeholder */}
                <div className="h-32 flex items-end gap-1">
                  {Array.from({ length: 24 }, (_, i) => {
                    const h = 20 + Math.sin(i * 0.5) * 30 + Math.random() * 40;
                    return (
                      <div
                        key={i}
                        className="flex-1 rounded-t transition-all"
                        style={{
                          height: `${h}%`,
                          background: h > 60 ? "hsl(38 92% 55% / 0.6)" : "hsl(38 92% 55% / 0.25)",
                        }}
                      />
                    );
                  })}
                </div>
              </div>

              {/* News feed */}
              <div>
                <h3 className="text-sm font-semibold font-['Space_Grotesk'] mb-3 flex items-center gap-2">
                  <BarChart3 className="w-4 h-4 text-electric" />
                  Personalized News Feed
                </h3>
                <div className="space-y-2">
                  {newsItems.map((item) => (
                    <div
                      key={item.title}
                      className="p-3 rounded-xl bg-secondary/30 hover:bg-secondary/50 transition-colors cursor-pointer group"
                    >
                      <div className="flex items-start justify-between gap-4">
                        <div>
                          <div className="flex items-center gap-2 mb-1">
                            <span className={`text-[10px] font-bold tracking-wider ${
                              item.impact === "high" ? "text-gold" : "text-electric"
                            }`}>
                              {item.category}
                            </span>
                            <span className="text-[10px] text-muted-foreground">{item.time}</span>
                          </div>
                          <p className="text-sm text-foreground/90 group-hover:text-foreground transition-colors">{item.title}</p>
                        </div>
                        {item.impact === "high" && (
                          <span className="shrink-0 text-[9px] px-2 py-0.5 rounded-full font-medium bg-gold/10 text-gold border border-gold/20">
                            HIGH IMPACT
                          </span>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Right panel */}
            <div className="lg:col-span-3 border-l border-border/30 p-5 space-y-5">
              {/* Watchlist */}
              <div>
                <h3 className="text-sm font-semibold font-['Space_Grotesk'] mb-3 flex items-center gap-2">
                  <TrendingUp className="w-4 h-4 text-gold" />
                  Watchlist
                </h3>
                <div className="space-y-2">
                  {marketData.map((stock) => (
                    <div key={stock.name} className="flex items-center justify-between py-2 border-b border-border/20 last:border-0">
                      <div>
                        <div className="text-xs font-medium">{stock.name}</div>
                        <div className="text-[11px] text-muted-foreground">{stock.price}</div>
                      </div>
                      <div className="flex items-center gap-2">
                        <MiniChart up={stock.up} />
                        <span className={`text-xs font-medium ${stock.up ? "text-emerald-400" : "text-red-400"}`}>
                          {stock.change}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Sector heatmap */}
              <div>
                <h3 className="text-sm font-semibold font-['Space_Grotesk'] mb-3 flex items-center gap-2">
                  <PieChart className="w-4 h-4 text-electric" />
                  Sector Pulse
                </h3>
                <div className="space-y-2">
                  {sectorData.map((sector) => (
                    <div key={sector.name}>
                      <div className="flex justify-between text-xs mb-1">
                        <span className="text-muted-foreground">{sector.name}</span>
                        <span className={sector.change.startsWith("+") ? "text-emerald-400" : "text-red-400"}>
                          {sector.change}
                        </span>
                      </div>
                      <div className="h-1.5 rounded-full bg-secondary/50">
                        <div
                          className="h-full rounded-full transition-all"
                          style={{
                            width: `${sector.value}%`,
                            background: sector.change.startsWith("+")
                              ? "linear-gradient(90deg, hsl(38 92% 55% / 0.6), hsl(38 92% 55%))"
                              : "linear-gradient(90deg, hsl(0 84% 60% / 0.4), hsl(0 84% 60% / 0.7))",
                          }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default DashboardSection;
