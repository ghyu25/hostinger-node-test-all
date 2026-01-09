const output = document.getElementById('output');

document.getElementById('submitBtn').onclick = async () => {
  const name = document.getElementById('name').value.trim();
  const message = document.getElementById('message').value.trim();

  if (!name || !message) {
    output.textContent = 'Name and message are required.';
    return;
  }

  try {
    const res = await fetch('/api/mailer-supabase', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name, message })
    });

    const data = await res.json();
    output.textContent = JSON.stringify(data, null, 2);
  } catch (err) {
    output.textContent = `Error: ${err.message}`;
  }
};
