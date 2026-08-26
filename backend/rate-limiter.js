// Rate limits API key creation to prevent abuse: max 10 new keys per
// account per hour. Applied server-side in the /api/api-keys POST handler.
const WINDOW_MS = 60 * 60 * 1000;
const MAX_KEYS_PER_WINDOW = 10;

const attempts = new Map();

function checkRateLimit(accountId) {
  const now = Date.now();
  const windowStart = now - WINDOW_MS;
  const timestamps = (attempts.get(accountId) || []).filter((t) => t > windowStart);
  if (timestamps.length >= MAX_KEYS_PER_WINDOW) {
    return { allowed: false, retryAfterMs: timestamps[0] + WINDOW_MS - now };
  }
  timestamps.push(now);
  attempts.set(accountId, timestamps);
  return { allowed: true };
}

module.exports = { checkRateLimit, MAX_KEYS_PER_WINDOW };
