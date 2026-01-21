import express from 'express';
import dotenv from 'dotenv';
dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

app.get('/env-check', (req, res) => {
res.json({
SUPABASE_URL: process.env.SUPABASE_URL || null,
SUPABASE_ANON_KEY: process.env.SUPABASE_ANON_KEY ? 'SET (hidden)' : null,
});
});

app.listen(PORT, () => {
console.log(`Server running on port ${PORT}`);
});