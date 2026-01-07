const output = document.getElementById('output');

document.getElementById('sendBtn').onclick = async () => {
  const name = document.getElementById('name').value;
  const message = document.getElementById('message').value;

  const res = await fetch('/api/mailer-primus/send', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ name, message })
  });

  output.textContent = JSON.stringify(await res.json(), null, 2);
};
