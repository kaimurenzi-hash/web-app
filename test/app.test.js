const test = require("node:test");
const assert = require("node:assert/strict");
const app = require("../server");

test("GET /health returns healthy status", async () => {
  const server = app.listen(0);
  try {
    const address = server.address();
    const response = await fetch(`http://127.0.0.1:${address.port}/health`);
    assert.equal(response.status, 200);
    assert.deepEqual(await response.json(), { status: "ok", app: "WebApp Project" });
  } finally {
    server.close();
  }
});

test("POST /login rejects missing credentials", async () => {
  const server = app.listen(0);
  try {
    const address = server.address();
    const response = await fetch(`http://127.0.0.1:${address.port}/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username: "", password: "" })
    });
    assert.equal(response.status, 400);
  } finally {
    server.close();
  }
});

test("POST /register accepts complete details", async () => {
  const server = app.listen(0);
  try {
    const address = server.address();
    const response = await fetch(`http://127.0.0.1:${address.port}/register`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username: "student", email: "student@example.com", password: "example123" })
    });
    assert.equal(response.status, 201);
  } finally {
    server.close();
  }
});
