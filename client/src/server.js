// server.js
import express from 'express';
import fs from 'fs/promises';
import path from 'path';
import cors from 'cors';

const app = express();
const DATA_FILE = path.join(process.cwd(), 'notes.json');

app.use(cors());
app.use(express.json());

// Helper to load and save
async function loadNotes() {
  const raw = await fs.readFile(DATA_FILE, 'utf-8');
  return JSON.parse(raw);
}
async function saveNotes(data) {
  await fs.writeFile(DATA_FILE, JSON.stringify(data, null, 2));
}

// GET all notes
app.get('/api/notes', async (req, res) => {
  const notes = await loadNotes();
  res.json(notes);
});

// Replace entire notes object
app.post('/api/notes', async (req, res) => {
  const newData = req.body;
  await saveNotes(newData);
  res.status(204).end();
});

const PORT = 4000;
app.listen(PORT, () => console.log(`API listening on http://localhost:${PORT}`));
