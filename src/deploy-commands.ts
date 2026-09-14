// IMPORTS
import "dotenv/config";
import { REST, Routes } from "discord.js";

import { loadCommands } from "./command-loader.js";



// Load tokens/IDs
const token = process.env.DISCORD_TOKEN;
const clientId = process.env.CLIENT_ID;
const guildId = process.env.GUILD_ID;
const guildId2 = process.env.GUILD_ID_2;

if (!token || !clientId || !guildId || !guildId2) {
    throw new Error(
        "DISCORD_TOKEN, CLIENT_ID, and GUILD_ID must be set."
    );
}



// Load commands
const commands = await loadCommands();

const commandData = commands.map((command) =>
    command.data.toJSON()
);



const rest = new REST({ version: "10" }).setToken(token);

// Register commands on shadowstorm77's Server
await rest.put(
    Routes.applicationGuildCommands(clientId, guildId),
    { body: commandData }
);

// Register commands on Mustache World
await rest.put(
    Routes.applicationGuildCommands(clientId, guildId2),
    { body: commandData }
);

console.log("Successfully registered commands.");