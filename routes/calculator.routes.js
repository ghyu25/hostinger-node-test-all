import express from 'express';
const router = express.Router();

router.post('/', (req, res) => {
  const { num1, num2, op } = req.body;

  if (typeof num1 !== 'number' || typeof num2 !== 'number') {
    return res.status(400).json({ success: false, error: 'Both numbers are required' });
  }

  let result;
  switch (op) {
    case 'add': result = num1 + num2; break;
    case 'subtract': result = num1 - num2; break;
    case 'multiply': result = num1 * num2; break;
    case 'divide':
      if (num2 === 0) return res.status(400).json({ success: false, error: 'Cannot divide by zero' });
      result = num1 / num2;
      break;
    default:
      return res.status(400).json({ success: false, error: 'Invalid operation' });
  }

  res.json({ success: true, result });
});

export default router;
