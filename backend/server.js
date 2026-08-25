// Minimal stub server backing the Settings > API Keys page.
// Dependency-free so it can run with just `node backend/server.js`.

const http = require("http");
const store = require("./store");

const PORT = process.env.PORT || 4000;

function sendJson(res, status, body) {
  res.writeHead(status, { "Content-Type": "application/json" });
  res.end(JSON.stringify(body));
}

const server = http.createServer((req, res) => {
  const start = Date.now();
  res.on("finish", () => {
    console.log(`${req.method} ${req.url} ${res.statusCode} ${Date.now() - start}ms`);
  });

  if (req.url === "/api/api-keys") {
    if (req.method === "GET") {
      sendJson(res, 200, { keys: store.listKeys() });
      return;
    }

    if (req.method === "POST") {
      sendJson(res, 201, store.createKey());
      return;
    }

    sendJson(res, 405, { error: "Method not allowed" });
    return;
  }

  sendJson(res, 404, { error: "Not found" });
});

server.listen(PORT, () => {
  console.log(`API server listening on port ${PORT}`);
});
