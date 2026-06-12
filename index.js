const { Client, GatewayIntentBits } = require("discord.js");
const express = require("express");
const bodyParser = require("body-parser");

const TOKEN = process.env.TOKEN;
const CHANNEL_ID = "1515114466948288522";

const client = new Client({
  intents: [GatewayIntentBits.Guilds]
});

const app = express();
app.use(bodyParser.json());

client.once("ready", () => {
  console.log(`✅ Bot connecté : ${client.user.tag}`);
});

// 🔥 API endpoint sécurisé
app.post("/apply", async (req, res) => {
  try {
    const data = req.body;

    const channel = await client.channels.fetch(CHANNEL_ID);

    if (!channel) {
      return res.status(404).send("Channel introuvable");
    }

    const embed = {
      title: `📥 Nouvelle candidature - ${data.pseudoIG || "Inconnu"}`,
      color: 0x2ecc71,
      fields: [
        { name: "🎮 IG", value: data.pseudoIG || "N/A", inline: true },
        { name: "💬 Discord", value: data.discord || "N/A", inline: true },
        { name: "🆔 BattleNet", value: data.battleNet || "N/A" },
        { name: "⚔️ Classe", value: data.classe || "N/A", inline: true },
        {
          name: "🔗 Logs",
          value: data.logs ? `[WarcraftLogs](${data.logs})` : "N/A"
        },
        {
          name: "🏆 RaiderIO",
          value: data.rio ? `[RaiderIO](${data.rio})` : "N/A"
        },
        { name: "📚 Expérience", value: data.exp || "N/A" },
        { name: "🕒 Dispo", value: data.dispo || "N/A" }
      ],
      timestamp: new Date().toISOString()
    };

    await channel.send({ embeds: [embed] });

    res.status(200).send("OK");
  } catch (err) {
    console.error(err);
    res.status(500).send("Erreur serveur");
  }
});

client.login(TOKEN);

app.listen(3000, () => {
  console.log("🌐 API en ligne sur port 3000");
});