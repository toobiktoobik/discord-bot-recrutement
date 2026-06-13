const express = require("express");

const app = express();

// ✅ IMPORTANT : fallback port
const PORT = process.env.PORT || 3000;

app.get("/", (req, res) => {
    res.send("OK RAILWAY WORKING");
});

app.listen(PORT, "0.0.0.0", () => {
    console.log("SERVER STARTED ON PORT:", PORT);
});