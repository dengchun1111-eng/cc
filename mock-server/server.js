const express = require('express');
const cors = require('cors');
const fs = require('fs');
const path = require('path');

const app = express();
app.use(cors());
app.use(express.json());

const DB_PATH = path.join(__dirname, 'data', 'mock_db.json');
function readDb() {
  return JSON.parse(fs.readFileSync(DB_PATH, 'utf8'));
}

// Health check
app.get('/health', (req, res) => res.json({ status: 'ok' }));

// GET transparency
app.get('/api/foundations/:id/transparency', (req, res) => {
  const db = readDb();
  const f = db.foundations.find(x => x.foundation_id === req.params.id);
  if (!f) return res.status(404).json({ error: 'Foundation not found' });

  // return transparency object (as defined in spec)
  return res.json(f.transparency);
});

// GET financials (optionally ?year=YYYY)
app.get('/api/foundations/:id/financials', (req, res) => {
  const db = readDb();
  const f = db.foundations.find(x => x.foundation_id === req.params.id);
  if (!f) return res.status(404).json({ error: 'Foundation not found' });

  const year = req.query.year ? parseInt(req.query.year, 10) : null;
  if (year) {
    const rec = f.financials.find(r => r.year === year);
    if (!rec) return res.status(404).json({ error: 'Financials for requested year not found' });
    return res.json(rec);
  } else {
    return res.json(f.financials);
  }
});

// GET foundation summary (for header / overview)
app.get('/api/foundations/:id/summary', (req, res) => {
  const db = readDb();
  const f = db.foundations.find(x => x.foundation_id === req.params.id);
  if (!f) return res.status(404).json({ error: 'Foundation not found' });
  // minimal summary
  const summary = {
    foundation_id: f.foundation_id,
    name: f.name,
    latest_assessment: f.latest_assessment || null,
    score_total: f.latest_assessment ? f.latest_assessment.score_total : null,
    grade: f.latest_assessment ? f.latest_assessment.grade : null
  };
  res.json(summary);
});

// Fallback
app.use((req, res) => res.status(404).json({ error: 'Not found' }));

const PORT = process.env.PORT || 5002;
app.listen(PORT, () => {
  console.log(`Mock server running on http://localhost:${PORT}`);
});
