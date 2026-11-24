const express = require("express");
const path = require("path");

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(express.static(path.join(__dirname, "public")));

app.get("/health", (_req, res) => {
  res.status(200).json({ status: "ok", app: "WebApp Project" });
});

app.post("/login", (req, res) => {
  const { username, password } = req.body || {};
  if (!username || !password) {
    return res.status(400).json({ message: "Username and password are required." });
  }
  return res.status(200).json({ message: `Welcome, ${username}!` });
});

app.post("/register", (req, res) => {
  const { username, email, password } = req.body || {};
  if (!username || !email || !password) {
    return res.status(400).json({ message: "Username, email, and password are required." });
  }
  return res.status(201).json({ message: "Registration details received." });
});

if (require.main === module) {
  app.listen(PORT, "0.0.0.0", () => {
    console.log(`WebApp Project running on port ${PORT}`);
  });
}

module.exports = app;
