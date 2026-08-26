// Settings > API Keys page component.
// Renders a masked list of the user's keys and handles creating a new one.

const state = {
  keys: [
    { id: "key_1", name: "Production", masked: "sk_live_••••••••••••4f2a", createdAt: "2026-06-02" },
    { id: "key_2", name: "Staging", masked: "sk_live_••••••••••••9c31", createdAt: "2026-07-19" },
  ],
};

const keyListEl = document.getElementById("key-list");
const emptyStateEl = document.getElementById("empty-state");
const createBtn = document.getElementById("create-key-btn");
const banner = document.getElementById("new-key-banner");
const newKeyValueEl = document.getElementById("new-key-value");
const dismissBannerBtn = document.getElementById("dismiss-banner-btn");

function maskKey(rawKey) {
  const last4 = rawKey.slice(-4);
  return `sk_live_••••••••••••${last4}`;
}

function renderKeys() {
  keyListEl.innerHTML = "";
  emptyStateEl.hidden = state.keys.length > 0;

  for (const key of state.keys) {
    const li = document.createElement("li");
    li.className = "key-row";
    li.innerHTML = `
      <div>
        <div class="key-name">${key.name}</div>
        <div class="key-meta">Created ${key.createdAt}</div>
      </div>
      <div class="key-masked">${key.masked}</div>
    `;
    keyListEl.appendChild(li);
  }
}

async function createKey() {
  createBtn.disabled = true;
  createBtn.textContent = "Creating…";

  try {
    const response = await fetch("/api/api-keys", { method: "POST" });
    const data = await response.json();

    state.keys.unshift({
      id: data.id,
      name: `New key`,
      masked: maskKey(data.key),
      createdAt: data.createdAt.slice(0, 10),
    });

    newKeyValueEl.textContent = data.key;
    banner.hidden = false;
    renderKeys();
  } catch (err) {
    alert("Something went wrong creating your key. Please try again.");
  } finally {
    createBtn.disabled = false;
    createBtn.textContent = "Create new key";
  }
}

createBtn.addEventListener("click", createKey);
dismissBannerBtn.addEventListener("click", () => {
  banner.hidden = true;
});

renderKeys();
