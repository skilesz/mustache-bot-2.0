import "dotenv/config";
import { REST, Routes, SlashCommandBuilder } from "discord.js";

const token = process.env.DISCORD_TOKEN;
const clientId = process.env.CLIENT_ID;
const guildId = process.env.GUILD_ID;

if (!token || !clientId || !guildId) {
    throw new Error(
        "DISCORD_TOKEN, CLIENT_ID, and GUILD_ID must be set."
    );
}

const commands = [
    new SlashCommandBuilder()
        .setName("ping")
        .setDescription("Checks on Mustache Bot")
        .toJSON(),
];

const rest = new REST({ version: "10" }).setToken(token);

await rest.put(
    Routes.applicationGuildCommands(clientId, guildId),
    { body: commands }
);

console.log("Successfully registered commands.");