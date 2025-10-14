// Ron Penones | October 13th 2025 - Feel free to share and reproduce, the core idea is mine with some assistance of AI. Padayon!

const express = require("express");
const path = require("path");
const app = express();
const PORT = 3000;

// Serve all static files from the current directory basta iyong server.js is i-copy and pasted sa root directory.
app.use(express.static(__dirname));

// For direct URL access like pag nagre-refresh ng page.
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "index.html"));
});

app.listen(PORT, "0.0.0.0", () => {
  console.log(`Ready na ang URL bes! Access mo na siya dito: http://localhost:${PORT}`);
});
