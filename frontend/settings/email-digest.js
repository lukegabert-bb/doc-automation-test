document.getElementById('digest-toggle').addEventListener('change', (e) => {
  fetch('/api/settings/email-digest', {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ enabled: e.target.checked }),
  });
});
