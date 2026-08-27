document.getElementById('send-invite-btn').addEventListener('click', () => {
  const email = document.getElementById('invite-email').value;
  fetch('/api/team/invite', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email }),
  });
});
