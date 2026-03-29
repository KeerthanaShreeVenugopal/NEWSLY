import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Send } from "lucide-react";
import Navbar from "@/components/Navbar";
import { useParams } from "react-router-dom";
import { newsArticles } from "@/data/newsData";
import ArticleTabs from "@/components/ArticleTabs";
import VideoBackground from "@/components/VideoBackground";

// ✅ GLOBAL LANGUAGE
import { useLanguage } from "@/components/Language";
import { translateText } from "@/hooks/translate";

const BriefingsPage = () => {
  const { id } = useParams();
  const { lang } = useLanguage();

  const article = newsArticles.find((a) => String(a.id) === String(id));

  if (!article) {
    return <div className="text-center mt-20">Article not found</div>;
  }

  const [followUp, setFollowUp] = useState("");
  const [chatResponse, setChatResponse] = useState<any>(null); // ✅ OBJECT
  const [translatedChat, setTranslatedChat] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [activeTab, setActiveTab] = useState("overview");
  const [aiSummary, setAiSummary] = useState<string | null>(null);
  const handleGenerate = () => {
    setLoading(true);
    setAiSummary(null);

    setTimeout(() => {
      const summary = `🧠 AI Insight:
  
  ${article.summary}
  
  📊 Sector Impact:
  This affects the ${article.category} sector significantly.
  
  ⚡ Key Takeaway:
  This is an important trend to watch closely.`;

      setAiSummary(summary);
      setLoading(false);
    }, 3000); // 3 sec delay
  };

  const [translatedSummary, setTranslatedSummary] = useState("");
  const [loadingLang, setLoadingLang] = useState(false);

  // 🔥 AI CHAT FIXED
  const handleAsk = async () => {
    if (!followUp.trim()) return;

    setLoading(true);

    try {
      const res = await fetch("http://localhost:5000/ai-agent", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          article: article.content,
          question: followUp,
          userType: "Student",
        }),
      });

      const data = await res.json();

      // ✅ FIX: parse JSON properly
      let parsed;

      try {
        parsed =
          typeof data.answer === "string"
            ? JSON.parse(data.answer)
            : data.answer;
      } catch {
        parsed = { points: ["⚠️ Failed to parse AI response"] };
      }

      setChatResponse(parsed);
      setFollowUp("");

    } catch (err) {
      console.error(err);
      setChatResponse({ points: ["⚠️ AI failed. Try again."] });
    }

    setLoading(false);
  };

  // 🔥 TRANSLATE SUMMARY
  useEffect(() => {
    const run = async () => {
      if (lang === "en") {
        setTranslatedSummary("");
        return;
      }

      setLoadingLang(true);

      const translated = await translateText(article.summary, lang);
      setTranslatedSummary(translated);

      setLoadingLang(false);
    };

    run();
  }, [lang, article.summary]);

  // 🔥 TRANSLATE CHAT POINTS
  useEffect(() => {
    const run = async () => {
      if (lang === "en") {
        setTranslatedChat(null);
        return;
      }

      if (!chatResponse?.points) return;

      const translatedPoints = await Promise.all(
        chatResponse.points.map((p: string) =>
          translateText(p, lang)
        )
      );

      setTranslatedChat({ points: translatedPoints });
    };

    run();
  }, [lang, chatResponse]);

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <section className="relative min-h-screen pt-32">
        <VideoBackground variant="dashboard" />

        <div className="relative z-10 max-w-4xl mx-auto px-4 py-10">
     
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>

            <ArticleTabs />

            {/* TITLE */}
            <div className="flex justify-center mt-6 mb-6">
              <button
                onClick={handleGenerate}
                disabled={loading}
                className="px-6 py-3 bg-electric text-white rounded-lg hover:scale-105 transition disabled:opacity-50"
              >
                {loading ? "Generating..." : "Generate AI Briefing ✨"}
              </button>
            </div>
            {loading && (
              <p className="text-center text-muted-foreground animate-pulse">
                🤖 AI is generating briefing...
              </p>
            )}

            {/* {aiSummary && (
              <div className="glass p-6 rounded-xl mb-6">
                <h1 className="text-4xl font-bold mb-6 text-center">
                  🧠 AI Briefing
                </h1>

                <h2 className="text-gold font-bold mb-3">Summary</h2>

                <p className="text-sm whitespace-pre-wrap">
                  {aiSummary}
                </p>
              </div>
            )} */}
            {aiSummary && (
              <div className="glass p-6 rounded-xl mb-6">

                <h1 className="text-4xl font-bold mb-6 text-center">
                  🧠 AI Briefing
                  <p className="text-xs text-muted-foreground mb-2">
                    Synthesized from multiple reports
                  </p>
                </h1>

                {/* 🔥 TABS */}
                <div className="flex gap-3 mb-4 flex-wrap justify-center">
                  {["overview", "insights", "risks", "future"].map((tab) => (
                    <button
                      key={tab}
                      onClick={() => setActiveTab(tab)}
                      className={`px-4 py-1 rounded-full text-xs capitalize ${activeTab === tab
                        ? "bg-electric text-white"
                        : "bg-secondary text-muted-foreground"
                        }`}
                    >
                      {tab}
                    </button>
                  ))}
                </div>

                {/* 🔥 CONTENT */}
                <div className="text-sm text-center">

                  {activeTab === "overview" && (
                    <p>{article.summary}</p>
                  )}

                  {activeTab === "insights" && (
                    <ul className="space-y-2">
                      {article?.story?.briefing?.insights?.map((item, i) => (
                        <li key={i}>• {item}</li>
                      ))}
                    </ul>
                  )}

                  {activeTab === "risks" && (
                    <ul className="space-y-2">
                      {article?.story?.briefing?.risks?.map((item, i) => (
                        <li key={i}>• {item}</li>
                      ))}
                    </ul>
                  )}

                  {activeTab === "future" && (
                    <p>{article?.story?.briefing?.future}</p>
                  )}

                </div>


              </div>
            )}

            {/* <div className="glass p-6 rounded-xl mb-6">
            <h1 className="text-4xl font-bold mb-6 text-center">
              🧠 AI Briefing
            </h1>

            {/* SUMMARY */}
            {/* <div className="glass p-6 rounded-xl mb-6">
              <h2 className="text-gold font-bold mb-3">Summary</h2>

              <p className="text-sm whitespace-pre-wrap">
                {loadingLang
                  ? "🌐 Translating..."
                  : translatedSummary || article.summary}
              </p>
            </div>  */}

            {/* CHAT */}
            <div className="glass p-6 rounded-xl">
              <h3 className="mb-3">Ask AI</h3>

              <div className="flex gap-2">
                <input
                  value={followUp}
                  onChange={(e) => setFollowUp(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && handleAsk()}
                  className="flex-1 px-4 py-2 rounded-lg bg-secondary"
                  placeholder="Ask: why, impact, future..."
                />

                <button
                  onClick={handleAsk}
                  disabled={loading}
                  className="bg-gold px-4 rounded-lg disabled:opacity-50"
                >
                  <Send size={16} />
                </button>
              </div>

              {loading && (
                <p className="text-sm text-muted-foreground mt-3">
                  🤖 Thinking...
                </p>
              )}

              {/* ✅ FIXED DISPLAY */}
              {(translatedChat || chatResponse) && (
                <motion.div
                  className="mt-4 p-4 rounded-lg bg-secondary/40"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                >
                  <div className="space-y-2 text-sm">
                    {(translatedChat?.points || chatResponse?.points || []).map(
                      (point: string, i: number) => (
                        <p key={i}>• {point}</p>
                      )
                    )}
                  </div>
                </motion.div>
              )}

            </div>

          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default BriefingsPage;