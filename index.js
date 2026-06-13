const express = require("express");
const { Client, GatewayIntentBits } = require("discord.js");

const app = express();
app.use(express.json());

// 🔐 VARIABLES RAILWAY
const TOKEN = process.env.TOKEN;
const CHANNEL_ID = process.env.CHANNEL_ID;

// 🤖 DISCORD BOT
const client = new Client({
    intents: [GatewayIntentBits.Guilds]
});

// Logs bot
client.on("debug", console.log);
client.on("error", console.error);

client.once("ready", () => {
    console.log(`✅ Bot connecté : ${client.user.tag}`);
});

// 🌐 ROUTE TEST
app.get("/", (req, res) => {
    res.send("Bot is running ✅");
});

// 📩 ROUTE APPLY (DEBUG ULTRA SIMPLE)
app.post("/apply", (req, res) => {
    console.log("🔥 APPLY HIT");
    console.log("BODY:", req.body);

    res.status(200).send("OK FROM SERVER");
});

// 🚀 START SERVER + BOT
const PORT = process.env.PORT || 3000;

app.listen(PORT, "0.0.0.0", () => {
    console.log(`🌐 API en ligne sur port ${PORT}`);

    client.login(TOKEN).catch(err => {
        console.error("❌ Discord login error:", err);
    });
});