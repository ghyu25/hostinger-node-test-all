import express from 'express';
import { readFileSync } from 'fs';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const router = express.Router();

// Load data
const dataPath = join(__dirname, '../data/items.json');
const data = JSON.parse(readFileSync(dataPath, 'utf-8'));

router.get('/', (req, res) => {
  const query = req.query.q?.toLowerCase() || '';
  
  if (!query) {
    return res.json(data);
  }
  
  const results = data.filter(item =>
    item.name.toLowerCase().includes(query) ||
    item.description.toLowerCase().includes(query)
  );
  
  res.json(results);
});

export default router;