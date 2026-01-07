const output = document.getElementById('output');

// WRITE: insert name + message
document.getElementById('writeBtn').onclick = async () => {
  const name = document.getElementById('name').value;
  const message = document.getElementById('message').value;

  const res = await fetch('/api/supabase/name-message/write', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ name, message })
  });

  output.textContent = JSON.stringify(await res.json(), null, 2);
};

// READ: fetch last 5 messages
document.getElementById('readBtn').onclick = async () => {
  const res = await fetch('/api/supabase/name-message/read');
  output.textContent = JSON.stringify(await res.json(), null, 2);
};

// CLEAR: delete all rows (safe version with confirm=true)
document.getElementById('clearBtn').onclick = async () => {
  if (!confirm('Delete all rows?')) return;

  const res = await fetch('/api/supabase/name-message/clear?confirm=true', {
    method: 'DELETE'
  });

  output.textContent = JSON.stringify(await res.json(), null, 2);
};
