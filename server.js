import express from "express";
import cors from "cors";
import OpenAI from "openai";

const app = express();
const port = 3000;

app.use(cors());
app.use(express.json());

const openai = new OpenAI({
  apiKey: "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" // Replace with your actual API key
});

app.post("/chat", async (req, res) => {
  try {
    const { message } = req.body;

    const completion = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [{ role: "user", content: message }]
    });

    const reply = completion.choices[0].message.content;
    res.json({ reply });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
});

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
