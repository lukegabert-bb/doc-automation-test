document.getElementById('save-notifications-btn').addEventListener('click', () => {
  const weeklyDigest = document.getElementById('weekly-digest-toggle').checked;
  fetch('/api/notification-preferences', {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ weekly_digest: weeklyDigest }),
  });
});
