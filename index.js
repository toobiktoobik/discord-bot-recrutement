const express = require("express");
const { Client, GatewayIntentBits, EmbedBuilder } = require("discord.js");

const app = express();
app.use(express.json());

const TOKEN = process.env.TOKEN;
const CHANNEL_ID = process.env.CHANNEL_ID;

const client = new Client({
    intents: [GatewayIntentBits.Guilds]
});

let isReady = false;

client.once("ready", () => {
    console.log(`✅ Bot connecté : ${client.user.tag}`);
    isReady = true;
});

// 🌐 TEST ROUTE
app.get("/", (req, res) => {
    res.send("Bot is running ✅");
});

// 📩 APPLY ROUTE SAFE
app.post("/apply", async (req, res) => {
    try {
        console.log("📩 REQUÊTE REÇUE :", req.body);

        if (!isReady) {
            console.log("⏳ Bot pas encore prêt");
            return res.status(503).send("Bot not ready");
        }

        const channel = await client.channels.fetch(CHANNEL_ID).catch(err => {
            console.error("❌ channel fetch error:", err);
            return null;
        });

        if (!channel) {
            console.log("❌ Channel introuvable");
            return res.status(500).send("Channel not found");
        }

        const embed = new EmbedBuilder()
            .setTitle("📥 Test candidature")
            .setColor(0x2ecc71)
            .addFields(
                { name: "Test", value: "OK" }
            )
            .setTimestamp();

        await channel.send({ embeds: [embed] });

        console.log("📩 MESSAGE ENVOYÉ DISCORD");

        res.status(200).send("OK");

    } catch (err) {
        console.error("❌ ERREUR /apply :", err);
        res.status(500).send("Error");
    }
});

// 🚀 START
const PORT = process.env.PORT || 3000;

app.listen(PORT, "0.0.0.0", () => {
    console.log(`🌐 API en ligne sur port ${PORT}`);
    client.login(TOKEN);
});