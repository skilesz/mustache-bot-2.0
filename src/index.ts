// IMPORTS
import "dotenv/config";
import { 
    Client,
    Collection,
    Events,
    GatewayIntentBits,
} from "discord.js";

import { loadCommands } from "./command-loader.js";

import { GuildStateManager } from "./state/guild-state-manager.js";



// SETUP

// Fetch token from .env
const token = process.env.DISCORD_TOKEN;

if (!token) {
    throw new Error("DISCORD_TOKEN is not set.");
}

// Create client object
const client = new Client({
    intents: [ GatewayIntentBits.Guilds, GatewayIntentBits.GuildVoiceStates ]
});

// Load and register commands
const commands = await loadCommands();

// Create state manager
const guildStateManager = new GuildStateManager();



// EVENT HANDLERS

// When client connects
client.once(Events.ClientReady, (client) => {
    console.log(`Logged in as ${client.user.tag}.`);
});

// When interaction is created
client.on(Events.InteractionCreate, async (interaction) => {
    // Check if input command
    if (!interaction.isChatInputCommand()) {
        return;
    }

    // Get command
    const command = commands.get(interaction.commandName);

    if (!command) {
        console.warn(`Unknown command: ${interaction.commandName}.`);
        return;
    }

    // Run command
    try {
        await command.execute(interaction, guildStateManager);
    } catch (error) {
        console.error(`Error executing /${interaction.commandName}:`, error);

        if (interaction.replied || interaction.deferred) {
            await interaction.followUp("Something went wrong while executing that command.");
        } else {
            await interaction.reply("Something went wrong while executing that command.");
        }
    }
});



// Client login
client.login(token);