// public/form-nodejs-resend-api.js

const form = document.getElementById('resendForm');
const output = document.getElementById('output');

form.addEventListener('submit', async (e) => {
  e.preventDefault(); // Prevent page reload

  const name = form.name.value.trim();
  const message = form.message.value.trim();

  if (!name || !message) {
    output.textContent = 'Name and Message are required.';
    return;
  }

  try {
      const res = await fetch('/api/resend', {

      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name, message })
    });

    const data = await res.json();
    output.textContent = JSON.stringify(data, null, 2);
  } catch (err) {
    output.textContent = JSON.stringify({ success: false, error: err.message }, null, 2);
  }
});
