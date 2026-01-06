import express from 'express';
import { askGemini } from '../config/gemini.js';

const router = express.Router();

router.post('/ask-gemini', async (req, res) => {
  try {
    const result = await askGemini("Reply with the word: OK");
    res.json({ success: true, result });
  } catch (err) {
    res.status(500).json({
      success: false,
      error: err.message
    });
  }
});

export default router;
