const output = document.getElementById('output');

document.getElementById('sendBtn').onclick = async () => {
  const name = document.getElementById('name').value;
  const message = document.getElementById('message').value;

  try {
    const res = await fetch('/api/mailer-gmail/send', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name, message })
    });
    const data = await res.json();
    output.textContent = JSON.stringify(data, null, 2);
  } catch (err) {
    output.textContent = err.message;
  }
};
