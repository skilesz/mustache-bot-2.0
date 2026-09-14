// IMPORTS
import "dotenv/config";
import { REST, Routes } from "discord.js";

import { loadCommands } from "./command-loader.js";



// Load tokens/IDs
const token = process.env.DISCORD_TOKEN;
const clientId = process.env.CLIENT_ID;
const guildId = process.env.GUILD_ID;

if (!token || !clientId || !guildId) {
    throw new Error(
        "DISCORD_TOKEN, CLIENT_ID, and GUILD_ID must be set."
    );
}



// Load commands
const commands = await loadCommands();

const commandData = commands.map((command) => {
    command.data.toJSON();
});



// Register commands
const rest = new REST({ version: "10" }).setToken(token);

await rest.put(
    Routes.applicationGuildCommands(clientId, guildId),
    { body: commandData }
);

console.log("Successfully registered commands.");