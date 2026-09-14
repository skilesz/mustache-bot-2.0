import "dotenv/config";
import { 
    Client,
    Collection,
    Events,
    GatewayIntentBits,
    ChatInputCommandInteraction,
} from "discord.js";

import * as ping from "./commands/ping.js";

const token = process.env.DISCORD_TOKEN;

if (!token) {
    throw new Error("DISCORD_TOKEN is not set.");
}

const client = new Client({
    intents: [ GatewayIntentBits.Guilds ]
});

const commands = new Collection<
    string,
    {
        execute: (
            interaction: ChatInputCommandInteraction
        ) => Promise<void>;
    }
>();

commands.set(ping.data.name, ping);

client.once(Events.ClientReady, (client) => {
    console.log(`Logged in as ${client.user.tag}.`);
});

client.on(Events.InteractionCreate, async (interaction) => {
    if (!interaction.isChatInputCommand()) {
        return;
    }

    const command = commands.get(interaction.commandName);

    if (!command) {
        console.warn(`Unknown command: ${interaction.commandName}.`);
        return;
    }

    try {
        await command.execute(interaction);
    } catch (error) {
        console.error(`Error executing /${interaction.commandName}:`, error);

        if (interaction.replied || interaction.deferred) {
            await interaction.followUp("Something went wrong while executing that command.");
        } else {
            await interaction.reply("Something went wrong while executing that command.");
        }
    }
});

client.login(token);