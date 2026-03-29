import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import fetch from "node-fetch";
import { GoogleGenAI } from "@google/genai";

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

// ==============================
// 🔑 CHECK API KEY
// ==============================
if (!process.env.GEMINI_API_KEY) {
  console.error("❌ GEMINI_API_KEY missing in .env");
  process.exit(1);
}

// ==============================
// 🤖 GEMINI SETUP
// ==============================
const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY,
});

// ==============================
// 🤖 AI AGENT (Q&A)
// ==============================
app.post("/ai-agent", async (req, res) => {
  try {
    const { article, question, userType } = req.body;

    if (!article || !question) {
      return res.status(400).json({ error: "Missing inputs" });
    }

    const prompt = `
You are an AI news analyst.

User Type: ${userType || "General"}

Article:
${article}

Question:
${question}

Return STRICT JSON:

{
  "points": ["point 1", "point 2", "point 3"]
}
`;

    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: prompt,
      config: {
        responseMimeType: "application/json",
      },
    });

    let parsed;

    try {
      const raw = response.candidates[0].content.parts[0].text;
      parsed = JSON.parse(raw);
    } catch {
      parsed = { points: ["⚠️ AI parsing failed"] };
    }

    res.json({ answer: parsed });

  } catch (err) {
    console.error("❌ AI ERROR:", err);
    res.status(500).json({ error: "AI failed" });
  }
});

// ==============================
// 📊 STORY GENERATION
// ==============================
app.post("/ai-story", async (req, res) => {
    try {
        const { article } = req.body;

        if (!article) {
            return res.status(400).json({
                error: "Article is required",
            });
        }

        const prompt = `
You are an AI system.

Generate a story arc EXACTLY like this structure:

{
  "timeline": [
    {
      "date": "Mar 2026",
      "title": "Event title",
      "sentiment": "positive | negative | neutral",
      "detail": "Short explanation"
    }
  ],
  "keyPlayers": [
    {
      "name": "Person/Org",
      "role": "Who they are",
      "impact": "Their impact"
    }
  ],
  "prediction": "Future insight"
}

STRICT RULES:
- Return ONLY JSON
- No explanation
- No markdown
- Follow format EXACTLY

        Article:
${article}
        `;

        const response = await ai.models.generateContent({
            model: "gemini-2.5-flash",
            contents: prompt,

            config: {
                responseMimeType: "application/json",
                responseSchema: {
                    type: "object",
                    properties: {
                        timeline: {
                            type: "array",
                            items: {
                                type: "object",
                                properties: {
                                    date: { type: "string" },
                                    title: { type: "string" },
                                    sentiment: { type: "string" },
                                    detail: { type: "string" },
                                },
                            },
                        },
                        keyPlayers: {
                            type: "array",
                            items: {
                                type: "object",
                                properties: {
                                    name: { type: "string" },
                                    role: { type: "string" },
                                    impact: { type: "string" },
                                },
                            },
                        },
                        prediction: { type: "string" },
                    },
                },
            },
        });

        // ✅ Safe JSON parsing
        // let parsed;
        // try {
        //     // parsed = JSON.parse(response.text);
        //     parsed = response.candidates[0].content.parts[0].text;
        //     parsed = JSON.parse(parsed);
        // } catch {
        //     console.warn("⚠️ JSON parse failed, returning raw text");
        //     parsed = { raw: response.text };
        // }
        // ✅ Safe JSON parsing (FIXED)
        let parsed;

        try {
            let raw = response?.candidates?.[0]?.content?.parts?.[0]?.text;

            console.log("RAW AI:", raw); // debug

            if (!raw) throw new Error("Empty AI response");

            // 🔥 Extract JSON safely
            const start = raw.indexOf("{");
            const end = raw.lastIndexOf("}") + 1;

            raw = raw.slice(start, end);

            parsed = JSON.parse(raw);

        } catch (err) {
            console.error("❌ JSON parse failed:", err);

            // 🔥 FALLBACK (VERY IMPORTANT)
            parsed = {
                timeline: [
                    {
                        date: "Now",
                        title: "Fallback Story",
                        sentiment: "neutral",
                        detail: "AI response formatting failed"
                    }
                ],
                keyPlayers: [
                    {
                        name: "System",
                        role: "Fallback Mode",
                        impact: "Ensures UI always works"
                    }
                ],
                prediction: "AI output failed. Please retry."
            };
        }

        res.json({ data: parsed });

    } catch (err) {
        console.error("🔥 STORY ERROR:", err);
        res.status(500).json({
            error: err.message || "Story AI failed",
        });
    }

} );
 

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on ${PORT}`);
});