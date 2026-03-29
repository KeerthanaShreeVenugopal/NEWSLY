import { useState } from "react";
import { motion } from "framer-motion";
import { User, TrendingUp, Rocket, Save, Check } from "lucide-react";
import VideoBackground from "@/components/VideoBackground";
import Navbar from "@/components/Navbar";

const userTypes = [
  { id: "student", label: "Student", icon: User, desc: "Simplified analysis & explainers" },
  { id: "investor", label: "Investor", icon: TrendingUp, desc: "Market data & portfolio insights" },
  { id: "founder", label: "Founder", icon: Rocket, desc: "Funding & competitor intelligence" },
];

const interests = [
  "Stock Markets", "Mutual Funds", "Startups", "AI & Tech",
  "Policy & Regulation", "Crypto", "Real Estate", "Global Economy",
  "Banking", "Climate & ESG", "Healthcare", "Manufacturing",
];

const ProfilePage = () => {
  const [selectedType, setSelectedType] = useState("investor");
  const [selectedInterests, setSelectedInterests] = useState<string[]>(["Stock Markets", "AI & Tech", "Startups"]);
  const [saved, setSaved] = useState(false);

  const toggleInterest = (interest: string) => {
    setSelectedInterests((prev) =>
      prev.includes(interest) ? prev.filter((i) => i !== interest) : [...prev, interest]
    );
    setSaved(false);
  };

  const handleSave = () => {
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <section className="relative min-h-screen pt-20">
        <VideoBackground variant="dashboard" />

        <div className="relative z-10 max-w-2xl mx-auto px-4 sm:px-6 py-6 sm:py-10">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <div className="text-center mb-8 sm:mb-10">
              <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold font-['Space_Grotesk'] text-foreground">
                Your <span className="text-gradient-gold">Profile</span>
              </h1>
              <p className="text-foreground/65 mt-2 text-sm sm:text-base">Customize your news experience</p>
            </div>

            {/* User type */}
            <div className="glass rounded-2xl p-5 sm:p-6 mb-5 sm:mb-6">
              <h3 className="text-sm font-semibold uppercase tracking-wider text-foreground/55 mb-4">I am a...</h3>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                {userTypes.map((type) => {
                  const Icon = type.icon;
                  const active = selectedType === type.id;
                  return (
                    <button
                      key={type.id}
                      onClick={() => { setSelectedType(type.id); setSaved(false); }}
                      className={`p-4 rounded-xl text-center transition-all ${
                        active
                          ? "glass border-gold/50 shadow-[0_0_24px_-4px_hsl(var(--gold)_/_0.25)]"
                          : "glass hover:border-muted-foreground/30"
                      }`}
                    >
                      <Icon className={`w-6 h-6 mx-auto mb-2 ${active ? "text-gold" : "text-foreground/55"}`} />
                      <div className={`text-sm font-semibold ${active ? "text-gold" : "text-foreground"}`}>{type.label}</div>
                      <div className="text-xs text-foreground/50 mt-0.5">{type.desc}</div>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Interests */}
            <div className="glass rounded-2xl p-5 sm:p-6 mb-5 sm:mb-6">
              <h3 className="text-sm font-semibold uppercase tracking-wider text-foreground/55 mb-4">Interests</h3>
              <div className="flex flex-wrap gap-2">
                {interests.map((interest) => {
                  const active = selectedInterests.includes(interest);
                  return (
                    <button
                      key={interest}
                      onClick={() => toggleInterest(interest)}
                      className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                        active
                          ? "bg-gold/25 text-gold border border-gold/50"
                          : "glass text-foreground/55 hover:text-foreground"
                      }`}
                    >
                      {interest}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Save */}
            <button
              onClick={handleSave}
              className="w-full py-3 sm:py-3.5 rounded-xl font-semibold text-primary-foreground text-sm sm:text-base inline-flex items-center justify-center gap-2"
              style={{ background: saved ? "hsl(var(--gold) / 0.6)" : "var(--gradient-gold)", boxShadow: saved ? "none" : "var(--shadow-gold)" }}
            >
              {saved ? <><Check className="w-5 h-5" /> Saved!</> : <><Save className="w-5 h-5" /> Save Preferences</>}
            </button>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default ProfilePage;
