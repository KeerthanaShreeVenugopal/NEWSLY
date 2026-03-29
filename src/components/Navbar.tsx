import { Link, useLocation } from "react-router-dom";
import { motion } from "framer-motion";
import { Newspaper, Menu, X } from "lucide-react";
import { useState, useEffect } from "react";
import { supabase } from "../lib/supabase";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";

import { useLanguage } from "./Language"; // ✅ ADD
import { translateText } from "@/hooks/translate"; // ✅ ADD

const navItems = [
  { label: "Home", path: "/" },
  { label: "Profile", path: "/profile" },
];

const Navbar = () => {
  const location = useLocation();
  const [mobileOpen, setMobileOpen] = useState(false);
  const navigate = useNavigate();
  const { user } = useAuth();

  const { lang, setLang } = useLanguage(); // ✅ GLOBAL LANGUAGE

  const [translatedNav, setTranslatedNav] = useState(navItems);

  const handleLogout = async () => {
    await supabase.auth.signOut();
  };

  // 🔥 TRANSLATE NAV LABELS
  useEffect(() => {
    const run = async () => {
      if (lang === "en") {
        setTranslatedNav(navItems);
        return;
      }

      const updated = await Promise.all(
        navItems.map(async (item) => ({
          ...item,
          label: await translateText(item.label, lang),
        }))
      );

      setTranslatedNav(updated);
    };

    run();
  }, [lang]);

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 glass-strong">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">

          {/* Logo */}
          <Link to="/" className="flex items-center gap-2.5">
            <div
              className="w-9 h-9 rounded-lg flex items-center justify-center"
              style={{ background: "var(--gradient-gold)" }}
            >
              <Newspaper className="w-5 h-5 text-primary-foreground" />
            </div>
            <span className="text-lg font-bold tracking-tight font-['Space_Grotesk']">
               <span className="text-gradient-gold">Newsly</span>
            </span>
          </Link>

          {/* Desktop nav */}
          <div className="hidden md:flex items-center gap-2">

            {translatedNav
              .filter((item) => {
                if (item.path === "/profile" && !user) return false;
                return true;
              })
              .map((item) => {
                const isActive = location.pathname === item.path;
                return (
                  <Link
                    key={item.path}
                    to={item.path}
                    className={`relative px-4 py-2 text-sm font-medium rounded-lg ${
                      isActive
                        ? "text-gold"
                        : "text-muted-foreground hover:text-foreground"
                    }`}
                  >
                    {item.label}
                    {isActive && (
                      <motion.div
                        layoutId="nav-indicator"
                        className="absolute bottom-0 left-2 right-2 h-0.5 bg-gold"
                      />
                    )}
                  </Link>
                );
              })}

            {/* USER */}
            {user && (
              <span className="px-3 text-sm text-gray-300">
                {user.name || user.email}
              </span>
            )}

            {/* LOGIN / LOGOUT */}
            {user ? (
              <button
                onClick={handleLogout}
                className="px-3 text-sm text-red-400"
              >
                Logout
              </button>
            ) : (
              <Link to="/login" className="px-3 text-sm">
                Login
              </Link>
            )}

            {/* 🌐 LANGUAGE DROPDOWN */}
            <select
              value={lang}
              onChange={(e) => setLang(e.target.value as any)}
              className="ml-3 px-2 py-1 rounded border bg-black text-white text-sm"
            >
              <option value="en">EN</option>
              <option value="hi">HI</option>
              <option value="ta">TA</option>
              <option value="te">TE</option>
            </select>
          </div>

          {/* MOBILE BUTTON */}
          <button
            className="md:hidden p-2"
            onClick={() => setMobileOpen(!mobileOpen)}
          >
            {mobileOpen ? <X /> : <Menu />}
          </button>
        </div>
      </div>

      {/* MOBILE MENU */}
      {mobileOpen && (
        <motion.div className="md:hidden border-t">
          <div className="px-4 py-3 space-y-2">

            {translatedNav.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                onClick={() => setMobileOpen(false)}
                className="block px-4 py-2"
              >
                {item.label}
              </Link>
            ))}

            {/* LANGUAGE IN MOBILE */}
            <select
              value={lang}
              onChange={(e) => setLang(e.target.value as any)}
              className="w-full mt-2 px-2 py-1 border rounded"
            >
              <option value="en">English</option>
              <option value="hi">Hindi</option>
              <option value="ta">Tamil</option>
              <option value="te">Telugu</option>
            </select>

          </div>
        </motion.div>
      )}
    </nav>
  );
};

export default Navbar;