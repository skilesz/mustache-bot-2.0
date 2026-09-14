// IMPORTS
import { readdir } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";

import { Collection } from "discord.js";

import { Command } from "./types.js";



// loadCommands()
export async function loadCommands(): Promise<Collection<string, Command>> {
    const commands = new Collection<string, Command>();

    // Construct path to ./commands folder
    const commandsPath = path.join(
        path.dirname(fileURLToPath(import.meta.url)),
        "commands"
    );

    // Fetch commands files
    const commandFiles = (await readdir(commandsPath)).filter(
        (file) => file.endsWith(".ts") || file.endsWith(".js")
    );

    // Import each command file and register in commands array
    for (const file of commandFiles) {
        const filePath = path.join(commandsPath, file);
        const module = await import(pathToFileURL(filePath).href);

        const command = module as Command;

        commands.set(command.data.name, command);
    }

    return commands;
}