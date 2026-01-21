import express from 'express';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(express.static('public'));

app.get('/', (req, res) => {
res.send('Minimal + dotenv OK');
});

app.get('/health', (req, res) => {
res.json({
status: 'ok',
version: 'minimal+dotenv',
pid: process.pid,
uptime: process.uptime(),
timestamp: new Date().toISOString(),
});
});

app.listen(PORT, () => {
console.log(`Server running on port ${PORT}`);
});
