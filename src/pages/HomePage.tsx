import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import VideoBackground from "../components/VideoBackground";
import Navbar from "@/components/Navbar";
import NewsCard from "@/components/NewsCard";
import NewsTicker from "@/components/NewsTicker";
import { newsArticles } from "@/data/newsData";
import { User, TrendingUp, Rocket } from "lucide-react";
import { useNavigate } from "react-router-dom";
// ✅ GLOBAL LANGUAGE
import { useLanguage } from "@/components/Language";
import { translateText } from "@/hooks/translate";

const userTypes = [
  { id: "student", label: "Student", icon: User, desc: "Explainer-first content & simplified analysis" },
  { id: "investor", label: "Investor", icon: TrendingUp, desc: "Portfolio-relevant stories & market data" },
  { id: "founder", label: "Founder", icon: Rocket, desc: "Funding news & competitor intelligence" },
];

const categories = ["All", "Finance", "Startup", "Tech", "Policy"];

const roleStyles = {
  student: "border-blue-400/20",
  investor: "border-green-400/20",
  founder: "border-purple-400/20",
};

const HomePage = () => {
  const [selectedType, setSelectedType] = useState("investor");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [displayNews, setDisplayNews] = useState<any[]>([]);
  const [topCategory, setTopCategory] = useState<string | null>(null);

  // ✅ GLOBAL LANGUAGE
  const { lang } = useLanguage();

  const navigate = useNavigate();
  const isLoggedIn = !!localStorage.getItem("token");

  useEffect(() => {
    const saved = localStorage.getItem("userType");
    if (saved) setSelectedType(saved);
  }, []);

  // 🔥 MAIN LOGIC + TRANSLATION
  useEffect(() => {
    const run = async () => {
      let baseData: any[] = [];

      if (isLoggedIn) {
        baseData = getRecommendedNews();
      } else {
        baseData =
          selectedCategory === "All"
            ? newsArticles
            : newsArticles.filter((a) => a.category === selectedCategory);
      }

      // ✅ IF ENGLISH → NO TRANSLATION
      if (lang === "en") {
        setDisplayNews(baseData);
        return;
      }

      // 🔥 TRANSLATE EVERYTHING
      const translated = await Promise.all(
        baseData.map(async (a) => ({
          ...a,
          title: await translateText(a.title, lang),
          summary: await translateText(a.summary, lang),
        }))
      );

      setDisplayNews(translated);
    };

    run();
  }, [selectedCategory, selectedType, isLoggedIn, lang]);

  const handleRoleChange = (role: string) => {
    setSelectedType(role);
    localStorage.setItem("userType", role);
  };

  const trackUserActivity = (article: any) => {
    const history = JSON.parse(localStorage.getItem("history") || "[]");

    history.push({
      category: article.category,
      title: article.title,
    });

    localStorage.setItem("history", JSON.stringify(history));
  };

  const getRecommendedNews = () => {
    const history = JSON.parse(localStorage.getItem("history") || "[]");

    if (history.length === 0) {
      setTopCategory(null);

      if (selectedType === "investor") {
        return newsArticles.filter((a) => a.category === "Finance");
      }
      if (selectedType === "founder") {
        return newsArticles.filter((a) => a.category === "Startup");
      }
      return newsArticles.filter((a) => a.category === "Tech");
    }

    const freq: any = {};

    history.forEach((item: any) => {
      freq[item.category] = (freq[item.category] || 0) + 1;
    });

    const top = Object.keys(freq).reduce((a, b) =>
      freq[a] > freq[b] ? a : b
    );

    setTopCategory(top);

    return newsArticles.filter((a) => a.category === top);
  };

  const handleGenerateBriefing = (article: any) => {
    trackUserActivity(article);
    navigate(`/news/${article.id}/briefing`);
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      {/* HERO */}
      <section className="relative min-h-[65vh] flex flex-col justify-center pt-10">
        <VideoBackground />
        <NewsTicker />

        <div className="relative z-10 max-w-6xl mx-auto px-4 py-10 text-center">
          <span className="inline-block px-4 py-1.5 rounded-full text-xs border border-gold/30 text-gold mb-4">
            AI-Powered News Platform
          </span>

          <motion.h1 className="text-5xl font-bold mb-4">
            News That <span className="text-gradient-gold">Knows You</span>
          </motion.h1>

          <p className="text-muted-foreground mb-6">
            AI-powered briefings, interactive insights, and personalized news.
          </p>

          {/* ROLE SELECT */}
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            {userTypes.map((type) => {
              const Icon = type.icon;
              const active = selectedType === type.id;

              return (
                <button
                  key={type.id}
                  onClick={() => handleRoleChange(type.id)}
                  className={`flex items-center gap-3 px-5 py-3 rounded-xl ${
                    active ? "glass border-gold" : "glass"
                  }`}
                >
                  <Icon className={active ? "text-gold" : ""} />
                  <div>
                    <div>{type.label}</div>
                    <div className="text-xs text-muted-foreground">
                      {type.desc}
                    </div>
                  </div>
                </button>
              );
            })}
          </div>
        </div>
      </section>

      {/* NEWS */}
      <section className="py-10">
        <div className="max-w-6xl mx-auto px-4">
          <div className="grid md:grid-cols-3 gap-5">
            {displayNews.map((article, i) => (
              <div key={article.id} className={`glass p-4 rounded-xl`}>
                <NewsCard article={article} index={i} />

                <button
                  onClick={() => handleGenerateBriefing(article)}
                  className="mt-3 text-gold text-sm"
                >
                  ✨ Generate AI Briefing
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default HomePage;