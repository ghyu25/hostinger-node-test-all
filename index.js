import express from 'express';
import dotenv from 'dotenv';

import supabaseRoutes from './routes/supabase.routes.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

// -------------------------
// Middleware
// -------------------------
app.use(express.json());
app.use(express.static('public'));

// -------------------------
// Routes
// -------------------------
app.use('/api/supabase', supabaseRoutes);

// -------------------------
// Health check endpoint
// -------------------------
app.get('/health', (req, res) => {
  res.json({
    status: 'ok',
    version: '2026-mm--dd', // bump on every deploy
    pid: process.pid,
    uptime: process.uptime(),
    timestamp: new Date().toISOString()
  });
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
