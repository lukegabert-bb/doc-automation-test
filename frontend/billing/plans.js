document.getElementById('upgrade-btn').addEventListener('click', () => {
  const selected = document.querySelector('input[name="plan"]:checked');
  fetch('/api/billing/upgrade', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ plan: selected ? selected.value : null }),
  });
});
