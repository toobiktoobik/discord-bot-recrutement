const express = require("express");
const { Client, GatewayIntentBits, EmbedBuilder } = require("discord.js");

const app = express();
app.use(express.json());

// 🔐 VARIABLES RAILWAY
const TOKEN = process.env.TOKEN;
const CHANNEL_ID = process.env.CHANNEL_ID;

// 🤖 DISCORD BOT
const client = new Client({
    intents: [GatewayIntentBits.Guilds]
});

client.once("ready", () => {
    console.log(`✅ Bot connecté : ${client.user.tag}`);
    console.log("🌐 API en ligne");
});

// 🌐 ROUTE TEST (Railway)
app.get("/", (req, res) => {
    res.send("Bot is running ✅");
});

// 📩 ROUTE GOOGLE FORM → DISCORD
app.post("/apply", async (req, res) => {
    try {
        const data = req.body;

        const channel = await client.channels.fetch(CHANNEL_ID);

        if (!channel) {
            console.log("❌ Salon introuvable");
            return res.status(500).send("Channel not found");
        }

        const embed = new EmbedBuilder()
            .setTitle(`📥 Nouvelle candidature - ${data.pseudoIG || "Inconnu"}`)
            .setColor(0x2ecc71)
            .addFields(
                { name: "🎮 IG", value: data.pseudoIG || "N/A", inline: true },
                { name: "💬 Discord", value: data.discord || "N/A", inline: true },
                { name: "🆔 BattleNet", value: data.battleNet || "N/A" },
                { name: "⚔️ Classe", value: data.classe || "N/A", inline: true },
                { name: "🔗 Logs", value: data.logs ? `[WarcraftLogs](${data.logs})` : "N/A" },
                { name: "🏆 RaiderIO", value: data.rio ? `[RaiderIO](${data.rio})` : "N/A" },
                { name: "📚 Expérience", value: data.exp || "N/A" },
                { name: "🕒 Dispo", value: data.dispo || "N/A" }
            )
            .setTimestamp();

        await channel.send({ embeds: [embed] });

        console.log("📩 Candidature envoyée !");
        res.status(200).send("OK");

    } catch (err) {
        console.error("❌ ERREUR /apply :", err);
        res.status(500).send("Error");
    }
});

// 🚀 LANCEMENT SERVEUR + BOT
const PORT = process.env.PORT || 3000;

app.listen(PORT, "0.0.0.0", () => {
    console.log(`🌐 API en ligne sur port ${PORT}`);
    client.login(TOKEN);
});