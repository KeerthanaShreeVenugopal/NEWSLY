export const translateText = async (text: string, lang: string) => {
    if (lang === "en") return text;
  
    const res = await fetch("http://localhost:5000/translate", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ text, target: lang }),
    });
  
    const data = await res.json();
    return data.translatedText || text;
  };