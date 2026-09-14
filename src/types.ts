// IMPORTS
import {
    ChatInputCommandInteraction,
    SlashCommandBuilder,
} from "discord.js";



// Command interface
export interface Command {
    data: SlashCommandBuilder;
    execute: (
        Interaction: ChatInputCommandInteraction
    ) => Promise<void>;
}