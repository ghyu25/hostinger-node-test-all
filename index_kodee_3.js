import express from 'express';

const app = express();
const PORT = process.env.PORT || 3000;

app.get('/', (req, res) => {
res.send('Minimal test OK');
});

app.get('/health', (req, res) => {
res.json({
status: 'ok',
version: 'minimal-test',
pid: process.pid,
uptime: process.uptime(),
timestamp: new Date().toISOString(),
});
});

app.listen(PORT, () => {
console.log(`Server running on port ${PORT}`);
});
