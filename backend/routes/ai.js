const express = require("express");
const router = express.Router();
const OpenAI = require("openai");

// 🔥 Groq client
const client = new OpenAI({
  baseURL: "https://api.groq.com/openai/v1",
  apiKey: process.env.GROQ_API_KEY,
});

// Dummy data
const news = [
  {
    topic: "RBI Policy",
    content: "The Reserve Bank increased repo rate to control inflation."
  },
  {
    topic: "RBI Policy",
    content: "Inflation is rising across sectors affecting consumers."
  },
  {
    topic: "RBI Policy",
    content: "Banks may increase lending rates leading to higher EMIs."
  }
];


// 🔥 BRIEFING API
router.post("/briefing", async (req, res) => {
  try {
    const { topic, userType } = req.body;

    const related = news.filter(n => n.topic === topic);
    const combinedText = related.map(n => n.content).join("\n");

    const response = await client.chat.completions.create({
      model: "llama-3.1-8b-instant",
      messages: [
        {
          role: "user",
          content: `
Create a structured news briefing for a ${userType}.

ONLY for this user type.

Format:
Summary:
...

Key Themes:
- ...
- ...

Impact:
...

What Next:
...

Articles:
${combinedText}
          `
        }
      ],
    });

    res.json({
      briefing: response.choices[0].message.content
    });

  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
});


// 💬 CHAT API
router.post("/chat", async (req, res) => {
  try {
    const { article, question, userType } = req.body;

    const response = await client.chat.completions.create({
      model: "llama-3.1-8b-instant",
      messages: [
        {
          role: "user",
          content: `
User type: ${userType}

Article:
${article}

Question:
${question}

Answer clearly.
          `
        }
      ],
    });

    res.json({
      answer: response.choices[0].message.content
    });

  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;