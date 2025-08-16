import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import OpenAI from 'openai';

const app = express();
const port = 3000;

// OpenAI API key
const openai = new OpenAI({
  apiKey: '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'
});

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(express.static('public')); // optional: if hosting frontend

// Chat endpoint
app.post('/chat', async (req, res) => {
  try {
    const userMessage = req.body.message;
    if (!userMessage) {
      return res.json({ reply: "Please send a message." });
    }

    // OpenAI Chat Completion
    const completion = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [
        { role: "system", content: "You are a helpful assistant for a Xerox & printing shop." },
        { role: "user", content: userMessage }
      ],
      max_tokens: 200
    });

    const reply = completion.choices[0].message.content;
    res.json({ reply });

  } catch (err) {
    console.error(err);
    res.status(500).json({ reply: "Error: Could not get response from AI." });
  }
});

// Start server
app.listen(port, () => {
  console.log(`Chatbot server running at http://localhost:${port}`);
});
