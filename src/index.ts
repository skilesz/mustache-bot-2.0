import "dotenv/config";
import { 
    Client,
    Events,
    GatewayIntentBits,
    Interaction,
} from "discord.js";

const token = process.env.DISCORD_TOKEN;

if (!token) {
    throw new Error("DISCORD_TOKEN is not set.");
}

const client = new Client({
    intents: [
        GatewayIntentBits.Guilds
    ]
});

client.once(Events.ClientReady, (client) => {
    console.log(`Logged in as ${client.user.tag}.`);
});

client.on(Events.InteractionCreate, async (interaction: Interaction) => {
    if (!interaction.isChatInputCommand()) {
        return;
    }

    if (interaction.commandName === "ping") {
        await interaction.reply("Don't worry daddy, I am here.");
    }
});

client.login(token);