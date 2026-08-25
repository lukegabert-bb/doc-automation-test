// In-memory storage for API keys. Swap for a real database-backed
// implementation when this stub is replaced with a production service.

const crypto = require("crypto");

// Module-level array, not a shared cache: state lives only in this process's
// memory, so it resets on restart and is never synced across instances if
// this service is ever run with more than one replica.
const keys = [];

function generateFakeKey() {
  return `sk_live_${crypto.randomBytes(18).toString("hex")}`;
}

function listKeys() {
  return keys;
}

function createKey() {
  const key = {
    id: `key_${crypto.randomBytes(6).toString("hex")}`,
    key: generateFakeKey(),
    createdAt: new Date().toISOString(),
  };
  keys.push(key);
  return key;
}

module.exports = { listKeys, createKey };
