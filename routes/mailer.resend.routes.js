// routes/mailer.resend.routes.js
import express from 'express';
import { resendClient } from '../config/mailer.resend.js';

const router = express.Router();

// POST /api/resend
router.post('/', async (req, res) => {
  const { name, message } = req.body;

  if (!name || !message) {
    return res.status(400).json({
      success: false,
      error: 'Name and message are required'
    });
  }

  try {
    const email = await resendClient.emails.send({
      from: 'Resend Test <onboarding@resend.dev>',
      to: process.env.RESEND_TEST_RECIPIENT,
      subject: `Resend Test from ${name}`,
      text: message
    });

    res.json({ success: true, id: email.id });
  } catch (err) {
    res.status(500).json({
      success: false,
      error: err.message
    });
  }
});

export default router;
