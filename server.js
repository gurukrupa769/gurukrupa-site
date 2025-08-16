import express from 'express';
import cors from 'cors';
import OpenAI from 'openai';

const app = express();
app.use(cors());
app.use(express.json());

const openai = new OpenAI({ apiKey: 'import express from 'express';
import cors from 'cors';
import OpenAI from 'openai';

const app = express();
app.use(cors());
app.use(express.json());

const openai = new OpenAI({ apiKey: 'import express from 'express';
import cors from 'cors';
import OpenAI from 'openai';

const app = express();
app.use(cors());
app.use(express.json());

const openai = new OpenAI({ apiKey: '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' }); // Replace with your API key

app.post('/chat', async (req, res) => {
  const { message } = req.body;
  try {
    const response = await openai.chat.completions.create({
      model: 'gpt-3.5-turbo',
      messages: [{role:'user', content: message}],
      max_tokens: 200
    });
    const reply = response.choices[0].message.content;
    res.json({reply});
  } catch(err) {
    console.error(err);
    res.status(500).json({reply:'Error connecting to AI'});
  }
});

app.listen(3000, () => {
  console.log('Server running on http://localhost:3000');
});
' }); // Replace with your API key

app.post('/chat', async (req, res) => {
  const { message } = req.body;
  try {
    const response = await openai.chat.completions.create({
      model: 'gpt-3.5-turbo',
      messages: [{role:'user', content: message}],
      max_tokens: 200
    });
    const reply = response.choices[0].message.content;
    res.json({reply});
  } catch(err) {
    console.error(err);
    res.status(500).json({reply:'Error connecting to AI'});
  }
});

app.listen(3000, () => {
  console.log('Server running on http://localhost:3000');
});
' }); // Replace with your API key

app.post('/chat', async (req, res) => {
  const { message } = req.body;
  try {
    const response = await openai.chat.completions.create({
      model: 'gpt-3.5-turbo',
      messages: [{role:'user', content: message}],
      max_tokens: 200
    });
    const reply = response.choices[0].message.content;
    res.json({reply});
  } catch(err) {
    console.error(err);
    res.status(500).json({reply:'Error connecting to AI'});
  }
});

app.listen(3000, () => {
  console.log('Server running on http://localhost:3000');
});
