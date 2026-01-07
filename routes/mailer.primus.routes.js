import express from 'express';
import { createPrimusMailer } from '../config/mailer.primus.js';

const router = express.Router();

router.post('/send', async (req, res) => {
  const { name, message } = req.body;

  if (!name || !message) {
    return res.status(400).json({
      success: false,
      error: 'Name and message are required'
    });
  }

  try {
    const transporter = createPrimusMailer();

    const info = await transporter.sendMail({
      from: `"Node Test" <${process.env.PRIMUS_SMTP_USER}>`,
      to: 'vwt2000@primus.ca',
      subject: 'Node.js Nodemailer (Primus) Test',
      text: `From: ${name}\n\n${message}`
    });

    res.json({
      success: true,
      messageId: info.messageId
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      error: err.message
    });
  }
});

export default router;
