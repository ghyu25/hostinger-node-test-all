import express from 'express';
import { testSupabaseConnection } from '../services/supabaseService.js';
import { createSupabaseClient } from '../config/supabase.js';

const router = express.Router();

/* ----------------------------------
   Existing routes
---------------------------------- */
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

/* ----------------------------------
   name_message table routes
---------------------------------- */

// WRITE: insert name + message
router.post('/name-message/write', async (req, res) => {
  const { name, message } = req.body;
  const supabase = createSupabaseClient();

  const { data, error } = await supabase
    .from('name_message')
    .insert([{ name, message }]);

  if (error) {
    return res.status(500).json({ success: false, error: error.message });
  }

  res.json({ success: true, data });
});

// READ: last 5 messages
router.get('/name-message/read', async (req, res) => {
  const supabase = createSupabaseClient();

  const { data, error } = await supabase
    .from('name_message')
    .select('*')
    .order('created_at', { ascending: false })
    .limit(5);

  if (error) {
    return res.status(500).json({ success: false, error: error.message });
  }

  res.json(data);
});

// CLEAR: delete all rows (safe for testing, satisfies WHERE clause requirement)
router.delete('/name-message/clear', async (req, res) => {
  const supabase = createSupabaseClient();

  // Require a "confirm" query param to avoid accidental deletion
  if (req.query.confirm !== 'true') {
    return res.status(400).json({
      success: false,
      error: 'Missing confirm=true query parameter to clear table'
    });
  }

  const { error } = await supabase
    .from('name_message')
    .delete()
    .not('id', 'is', null); // delete all rows where id is not null

  if (error) {
    return res.status(500).json({ success: false, error: error.message });
  }

  res.json({ success: true });
});

export default router;
