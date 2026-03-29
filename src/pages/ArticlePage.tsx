import { useParams, Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Clock, User, Sparkles, Send } from "lucide-react";
import { useState, useEffect } from "react";
import ArticleTabs from "@/components/ArticleTabs";
import Navbar from "@/components/Navbar";
import { newsArticles, categoryColors } from "@/data/newsData";
import { getTimeAgo } from "@/utils/timeAgo";

// ✅ GLOBAL LANGUAGE
import { useLanguage } from "@/components/Language";
import { translateText } from "@/hooks/translate";

const ArticlePage = () => {
  const { id } = useParams();
  const { lang } = useLanguage();

  const article = newsArticles.find(
    (a) => String(a.id) === String(id)
  );

  const [question, setQuestion] = useState("");
  const [chatMessages, setChatMessages] = useState<
    { role: "user" | "ai"; text: string }[]
  >([]);

  const [translatedData, setTranslatedData] = useState({
    title: "",
    summary: "",
    content: "",
  });

  const [loadingLang, setLoadingLang] = useState(false);

  if (!article) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Navbar />
        <div>
          <h2>Article not found</h2>
          <Link to="/">Go home</Link>
        </div>
      </div>
    );
  }

  // 🔥 GLOBAL TRANSLATION
  useEffect(() => {
    const run = async () => {
      if (lang === "en") {
        setTranslatedData({
          title: "",
          summary: "",
          content: "",
        });
        return;
      }

      setLoadingLang(true);

      try {
        const [t1, t2, t3] = await Promise.all([
          translateText(article.title, lang),
          translateText(article.summary, lang),
          translateText(article.content, lang),
        ]);

        setTranslatedData({
          title: t1,
          summary: t2,
          content: t3,
        });
      } catch (err) {
        console.error("❌ Translation error:", err);
      } finally {
        setLoadingLang(false);
      }
    };

    run();
  }, [lang, id]);

  // ✅ AI CHAT
  const handleAsk = () => {
    if (!question.trim()) return;

    setChatMessages((prev) => [
      ...prev,
      { role: "user", text: question },
      {
        role: "ai",
        text: `Based on "${article.title}", here's insight.`,
      },
    ]);

    setQuestion("");
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <section className="pt-20">
        <div className="max-w-4xl mx-auto px-4 py-10">
          <ArticleTabs />

          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>

            {/* CATEGORY */}
            <div className="flex gap-3 mb-4">
              <span className={`px-3 py-1 text-xs border ${categoryColors[article.category]}`}>
                {article.category}
              </span>
              {/* <span className="flex items-center gap-1 text-xs text-muted-foreground">
                <Clock className="w-3.5 h-3.5" /> {article.readTime}
              </span> */}
              <span className="text-xs text-muted-foreground">
                {getTimeAgo(article.date)}
              </span>
              <span className="text-xs">{article.date}</span>
            </div>

            {/* 🔥 IMAGE (ADDED) */}
            {article.image && (
              <div className="relative mb-6">
                <img
                  src={article.image || "/fallback.jpg"}
                  onError={(e) => (e.currentTarget.src = "/fallback.jpg")}
                  alt={article.title}
                  className="w-full max-h-[400px] object-cover rounded-xl transition duration-500 hover:scale-105"
                />

                {/* Dark overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent rounded-xl" />

                {/* Title on image */}
                <h1 className="absolute bottom-4 left-4 text-white text-2xl font-bold">
                  {translatedData.title || article.title}
                </h1>
              </div>
            )}

            {/* TITLE */}
            {/* <h1 className="text-3xl font-bold mb-4">
              {translatedData.title || article.title}
            </h1> */}

            {/* AUTHOR */}
            <div className="flex gap-2 text-sm mb-6">
              <User size={14} /> {article.author}
            </div>

            {/* AI Summary */}
            <div className="glass rounded-2xl p-6 mb-8 border-gold/20">
              <div className="flex items-center gap-2 mb-3">
                {/* <Sparkles className="w-5 h-5 text-gold" /> */}
                <h3 className="text-sm font-semibold text-gold uppercase tracking-wider">Summary</h3>
              </div>
              <p className="text-sm text-muted-foreground leading-relaxed">
                {article.summary} This article explores the broader implications for India's business landscape, examining how stakeholders from retail investors to institutional players are positioning themselves in response to these developments.
              </p>
            </div>
            {/* SUMMARY */}
            <div className="border p-4 rounded mb-6">
              <b className="flex items-center gap-2 mb-2">
                <Sparkles size={14} /> Summary
              </b>

              <p>
                {translatedData.summary || article.summary}
              </p>
            </div>

            {/* CONTENT */}
            <div className="border p-4 rounded mb-6">
              <p>
                {loadingLang
                  ? "🌐 Translating..."
                  : translatedData.content || article.content}
              </p>
            </div>

            {/* AI CHAT */}
            <div className="border p-4 rounded">
              <h3 className="mb-3 flex gap-2 items-center">
                <Sparkles size={14} /> Ask AI
              </h3>

              {chatMessages.map((msg, i) => (
                <div key={i}>
                  <b>{msg.role === "user" ? "You" : "AI"}:</b> {msg.text}
                </div>
              ))}

              <div className="flex gap-2 mt-3">
                <input
                  value={question}
                  onChange={(e) => setQuestion(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && handleAsk()}
                  className="flex-1 border px-2 py-1"
                  placeholder="Ask..."
                />

                <button
                  onClick={handleAsk}
                  className="bg-blue-500 text-white px-3"
                >
                  <Send size={14} />
                </button>
              </div>
            </div>

          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default ArticlePage;