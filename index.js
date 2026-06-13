const express = require("express");
const { Client, GatewayIntentBits, EmbedBuilder } = require("discord.js");

const app = express();
app.use(express.json());

// 🔐 VARIABLES RAILWAY
const TOKEN = process.env.TOKEN;
const CHANNEL_ID = process.env.CHANNEL_ID;

// 🚨 Vérif sécurité (très important)
if (!TOKEN) console.error("❌ TOKEN manquant");
if (!CHANNEL_ID) console.error("❌ CHANNEL_ID manquant");

// 🤖 DISCORD BOT
const client = new Client({
    intents: [GatewayIntentBits.Guilds]
});

client.once("ready", () => {
    console.log(`✅ Bot connecté : ${client.user.tag}`);
});

// 🌐 ROUTE TEST (Railway)
app.get("/", (req, res) => {
    res.send("Bot is running ✅");
});

// 📩 ROUTE /apply (Google Form → Discord)
app.post("/apply", async (req, res) => {
    try {
        console.log("📩 REQUÊTE REÇUE :", req.body);

        if (!CHANNEL_ID) {
            console.log("❌ CHANNEL_ID manquant");
            return res.status(500).send("Missing CHANNEL_ID");
        }

        const channel = await client.channels.fetch(CHANNEL_ID).catch(err => {
            console.error("❌ Erreur fetch channel :", err);
            return null;
        });

        if (!channel) {
            console.log("❌ Salon introuvable");
            return res.status(500).send("Channel not found");
        }

        const data = req.body;

        const embed = new EmbedBuilder()
            .setTitle(`📥 Nouvelle candidature - ${data.pseudoIG || "Inconnu"}`)
            .setColor(0x2ecc71)
            .addFields(
                { name: "Pseudo IG", value: data.pseudoIG || "N/A" },
                { name: "Discord", value: data.discord || "N/A" },
                { name: "BattleNet", value: data.battleNet || "N/A" },
                { name: "Classe & Spé", value: data.classe || "N/A" },
                { name: "WarcraftLogs", value: data.logs || "N/A" },
                { name: "RaiderIO", value: data.rio || "N/A" },
                { name: "Expérience", value: data.experience || "N/A" },
                { name: "Vocal", value: data.vocal || "N/A" },
                { name: "Extra", value: data.extra || "N/A" }
            )
            .setTimestamp();

        await channel.send({ embeds: [embed] });

        console.log("📩 MESSAGE ENVOYÉ SUR DISCORD");

        res.status(200).send("OK");

    } catch (err) {
        console.error("❌ ERREUR /apply :", err);
        res.status(500).send("Error");
    }
});

// 🚀 START SERVER + BOT
const PORT = process.env.PORT || 3000;

app.listen(PORT, "0.0.0.0", () => {
    console.log(`🌐 API en ligne sur port ${PORT}`);
    client.login(TOKEN);
});