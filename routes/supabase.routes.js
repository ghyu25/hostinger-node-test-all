import express from 'express';
import { testSupabaseConnection } from '../services/supabaseService.js';

const router = express.Router();

router.get('/connect', async (req, res) => {
  try {
    const result = await testSupabaseConnection();
    res.json(result);
  } catch (err) {
    res.status(500).json({ connected: false, error: err.message });
  }
});

router.get('/disconnect', (req, res) => {
  // Conceptual only — no persistent connection exists
  res.json({ disconnected: true });
});

export default router;
