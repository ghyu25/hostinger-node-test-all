import express from 'express';
import { gmailTransporter } from '../config/mailer.gmail.js';

const router = express.Router();

router.post('/send', async (req, res) => {
  const { name, message } = req.body;

  try {
    const info = await gmailTransporter.sendMail({
      from: process.env.GMAIL_USER,
      to: process.env.GMAIL_USER, // sending to self for testing
      subject: `Gmail Test Form Message from ${name}`,
      text: message
    });

    res.json({ success: true, messageId: info.messageId });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

export default router;
