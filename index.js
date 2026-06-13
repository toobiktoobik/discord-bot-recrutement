const express = require("express");

const app = express();

app.get("/", (req, res) => {
    res.send("OK RAILWAY WORKING");
});

const PORT = process.env.PORT;

app.listen(PORT, "0.0.0.0", () => {
    console.log("SERVER STARTED ON PORT:", PORT);
});