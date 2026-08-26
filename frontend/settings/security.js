document.getElementById('enable-tfa-btn').addEventListener('click', () => {
  const enabled = document.getElementById('tfa-toggle').checked;
  fetch('/api/security/two-factor', {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ enabled }),
  });
});
