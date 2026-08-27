document.getElementById('generate-codes-btn').addEventListener('click', () => {
  fetch('/api/security/recovery-codes', { method: 'POST' });
});
