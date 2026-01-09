import express from 'express';
import { createSupabaseClient } from '../config/supabase.js';
import { resendClient } from '../config/mailer.resend.js';

const router = express.Router();

// POST /api/mailer-supabase
router.post('/', async (req, res) => {
  const { name, message } = req.body;

  if (!name || !message) {
    return res.status(400).json({
      success: false,
      error: 'Name and message are required'
    });
  }

  try {
    // 1️⃣ Save to Supabase
    const supabase = createSupabaseClient();
    const { data: dbData, error: dbError } = await supabase
      .from('name_message')
      .insert([{ name, message }])
      .select();

    if (dbError) {
      return res.status(500).json({
        success: false,
        error: dbError.message
      });
    }

    // 2️⃣ Send via Resend (corrected)
    const email = await resendClient.emails.send({
      from: 'Test App <onboarding@resend.dev>',   // VALID SENDER
      to: process.env.RESEND_TEST_RECIPIENT,       // Your inbox
      subject: `Supabase + Resend Test from ${name}`,
      text: message
    });

    // 3️⃣ Correct validation: only fail if Resend reports an error
    if (email?.error) {
      return res.status(500).json({
        success: false,
        error: email.error
      });
    }

    // 4️⃣ Success response
    res.json({
      success: true,
      dbId: dbData[0].id,
      messageId: email?.id || null   // may be null in sandbox mode
    });

  } catch (err) {
    res.status(500).json({
      success: false,
      error: err.message
    });
  }
});

export default router;
