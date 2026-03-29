import { motion } from "framer-motion";
import { useParams } from "react-router-dom";
import { newsArticles } from "@/data/newsData";
import { useEffect, useState } from "react";
import { GitBranch } from "lucide-react";

const sentimentDot = {
  positive: "bg-emerald-400",
  neutral: "bg-gray-400",
  negative: "bg-red-400",
};

const sentimentColor = {
  positive: "border-emerald-400/30",
  neutral: "border-gray-400/30",
  negative: "border-red-400/30",
};

const sentimentIcon = {
  positive: "😊",
  neutral: "😐",
  negative: "😡",
};

const StoryArcSection = () => {
  const { id } = useParams();
  const article = newsArticles.find((a) => a.id === id);
  const [aiStory, setAiStory] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const timelineEvents = aiStory?.timeline || [];
  const sentimentScore = {
    positive: 1,
    neutral: 0,
    negative: -1,
  };


  const [story, setStory] = useState<any>(null);
  // const [loading, setLoading] = useState(false);
  const sentimentTrend = timelineEvents.map((event) => ({
    value: sentimentScore[event.sentiment],
  }));
  // const handleGenerate = async () => {
  //   try {
  //     setLoading(true);
  //     setAiStory(null); // reset

  //     // const res = await fetch("http://localhost:5000/ai-story", {
  //     //   method: "POST",
  //     //   headers: {
  //     //     "Content-Type": "application/json",
  //     //   },
  //     //   body: JSON.stringify({
  //     //     article: article?.content,
  //     //   }),
  //     // });

  //     // const data = await res.json();
  //     // setAiStory(data.data);
  //     const data = await res.json();

  //     if (!data || !data.data) {
  //       throw new Error("Invalid AI response");
  //     }

  //     setAiStory(data.data);
  //   } catch (err) {
  //     console.error("AI Story failed:", err);
  //   } finally {
  //     setLoading(false);
  //   }
  // };
  const handleGenerate = async () => {
    setLoading(true);
    setAiStory(null);

    // ⏳ simulate AI delay
    setTimeout(() => {
      setAiStory(article?.story); // 🔥 use mock data
      setLoading(false);
    }, 5000); // 5 seconds
  };

  return (
    <section className="py-12 px-6">
      <div className="max-w-4xl mx-auto">

        {/* HEADER */}
        <motion.div
          className="text-center mb-8"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        >
          <h2 className="text-3xl font-bold">📊 Story Arc</h2>
          <p className="text-muted-foreground mt-2">
            {article?.title}
          </p>
        </motion.div>

        {/* CARD */}
        <motion.div
          className="rounded-2xl glass-strong p-6 md:p-8"
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
        >
          {/* TITLE */}
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-3">
              <GitBranch className="w-5 h-5 text-electric" />
              <h3 className="text-lg font-bold">
                {article?.title}
              </h3>
            </div>

            <span className="text-xs px-3 py-1 rounded-full bg-emerald-400/10 text-emerald-400">
              AI Analysis
            </span>
          </div>


          <div className="flex justify-center mb-6">
            <button
              onClick={handleGenerate}
              disabled={loading}
              className="px-6 py-3 bg-electric text-white rounded-lg hover:opacity-90 disabled:opacity-50 text-base font-medium"
            >
              {loading ? "Generating..." : "Generate Story Arc ✨"}
            </button>
          </div>

          {/* 🔥 LOADING / EMPTY */}
          {/* {loading ? (
            <p className="text-center text-muted-foreground">
              Generating AI Story Arc...
            </p>
          ) : timelineEvents.length === 0 && (
            <p className="text-center text-muted-foreground">
              No story data available
            </p>
          )} */}
          {loading && (
            <p className="text-center text-muted-foreground">
              Generating AI Story Arc...
            </p>
          )}

          {/* TIMELINE */}
          {!loading && aiStory?.timeline && (
            <div className="relative">
              <div className="absolute left-4 top-0 bottom-0 w-px bg-border/50" />

              <div className="space-y-6">
                {timelineEvents.map((event, i) => (
                  <motion.div
                    key={i}
                    className="relative pl-10"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.1 }}
                  >
                    <div
                      className={`absolute left-[11px] top-2 w-2.5 h-2.5 rounded-full ${sentimentDot[event.sentiment]}`}
                    />

                    <div
                      className={`p-4 rounded-xl bg-secondary/30 border ${sentimentColor[event.sentiment]}`}
                    >
                      <div className="flex items-center gap-2 mb-1">
                        <span className="text-xs text-muted-foreground">
                          {event.date}
                        </span>
                        {sentimentIcon[event.sentiment]}
                      </div>

                      <p className="text-sm font-medium">{event.title}</p>
                      <p className="text-xs text-muted-foreground">
                        {event.detail}
                      </p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          )}
          {/* 📊 SENTIMENT TREND */}
          {!loading && aiStory?.timeline && (
            <div className="mt-8">
              <h3 className="text-sm text-electric mb-3">📊 Sentiment Trend</h3>

              <div className="flex items-end gap-2 h-20">
                {sentimentTrend.map((s, i) => (
                  <div
                    key={i}
                    className={`w-4 rounded ${s.value > 0
                      ? "bg-emerald-400"
                      : s.value < 0
                        ? "bg-red-400"
                        : "bg-gray-400"
                      }`}
                    style={{
                      height: `${Math.abs(s.value) * 40 + 10}px`,
                    }}
                  />
                ))}
              </div>

              <p className="text-xs text-muted-foreground mt-2">
                Tracks how sentiment evolves across events
              </p>
            </div>
          )}
          {/* 👥 KEY PLAYERS */}
          {!loading && aiStory?.keyPlayers && (
            <div className="mt-8">
              <h3 className="text-sm text-gold mb-3">👥 Key Players</h3>

              <div className="grid sm:grid-cols-2 gap-3">
                {aiStory.keyPlayers.map((player, i) => (
                  <div
                    key={i}
                    className="p-3 rounded-lg bg-secondary/30 border border-border/40"
                  >
                    <p className="text-sm font-medium">{player.name}</p>
                    <p className="text-xs text-muted-foreground">
                      {player.role}
                    </p>
                    <p className="text-xs mt-1 text-muted-foreground">
                      {player.impact}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* 🔮 PREDICTION */}
          {!loading && aiStory?.prediction && (
            <div className="mt-8 p-4 rounded-xl border border-gold/20">
              <p className="text-xs text-gold mb-2">🔮 What to Watch Next</p>

              <p className="text-sm text-muted-foreground">
                {aiStory.prediction}
              </p>
            </div>
          )}
          {/* ⚠️ CONTRARIAN VIEW */}
          {!loading && aiStory?.contrarian && (
            <div className="mt-6 p-4 rounded-xl border border-red-400/20 bg-red-400/5">
              <p className="text-xs text-red-400 mb-2">
                ⚠️ Alternative Perspective
              </p>

              <p className="text-sm text-muted-foreground">
                {aiStory.contrarian}
              </p>
            </div>
          )}

        </motion.div>
      </div>
    </section>

  );
};

export default StoryArcSection;