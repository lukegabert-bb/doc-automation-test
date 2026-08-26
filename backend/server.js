// Minimal stub server backing the Settings > API Keys page.
// Dependency-free so it can run with just `node backend/server.js`.

const http = require("http");
const crypto = require("crypto");

const PORT = process.env.PORT || 4000;

function generateFakeKey() {
  return `sk_live_${crypto.randomBytes(18).toString("hex")}`;
}

const server = http.createServer((req, res) => {
  if (req.method === "POST" && req.url === "/api/api-keys") {
    const body = {
      id: `key_${crypto.randomBytes(6).toString("hex")}`,
      key: generateFakeKey(),
      createdAt: new Date().toISOString(),
    };
    res.writeHead(201, { "Content-Type": "application/json" });
    res.end(JSON.stringify(body));
    return;
  }

  res.writeHead(404, { "Content-Type": "application/json" });
  res.end(JSON.stringify({ error: "Not found" }));
});

server.listen(PORT, () => {
  console.log(`API server listening on port ${PORT}`);
});
