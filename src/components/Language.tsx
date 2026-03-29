import { createContext, useContext, useState, useEffect } from "react";

type LangType = "en" | "hi" | "ta" | "te";

const LanguageContext = createContext<{
  lang: LangType;
  setLang: (l: LangType) => void;
} | null>(null);

export const LanguageProvider = ({ children }: { children: React.ReactNode }) => {
  const [lang, setLang] = useState<LangType>(
    (localStorage.getItem("lang") as LangType) || "en"
  );

  useEffect(() => {
    localStorage.setItem("lang", lang);
  }, [lang]);

  return (
    <LanguageContext.Provider value={{ lang, setLang }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const ctx = useContext(LanguageContext);
  if (!ctx) throw new Error("useLanguage must be used inside LanguageProvider");
  return ctx;
};