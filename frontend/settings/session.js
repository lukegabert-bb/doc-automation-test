document.getElementById('save-session-btn').addEventListener('click', () => {
  const minutes = document.getElementById('session-timeout-select').value;
  fetch('/api/security/session-timeout', {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ timeout_minutes: Number(minutes) }),
  });
});
