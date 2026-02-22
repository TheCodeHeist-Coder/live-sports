import express from 'express';
import { db } from './db/db.js';
import { users } from './db/schema.js';
import { initDB } from './db/db-init.js';

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

// Ensure tables exist on startup (non-blocking)
initDB().catch((err) => console.error('DB init failed', err));

app.get('/', (req, res) => {
  res.send('Hello, World!');
});

app.post('/users', async (req, res) => {
  const { name } = req.body;
  if (!name) return res.status(400).json({ error: 'name required' });
  try {
    const inserted = await db.insert(users).values({ name }).returning();
    res.status(201).json(inserted);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Insert failed' });
  }
});

app.get('/users', async (req, res) => {
  try {
    const all = await db.select().from(users);
    res.json(all);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Select failed' });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});