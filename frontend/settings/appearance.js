document.getElementById('save-appearance-btn').addEventListener('click', () => {
  const darkMode = document.getElementById('dark-mode-toggle').checked;
  fetch('/api/appearance', {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ dark_mode: darkMode }),
  });
});
