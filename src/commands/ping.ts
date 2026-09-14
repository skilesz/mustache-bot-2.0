// IMPORTS
import { SlashCommandBuilder, ChatInputCommandInteraction } from "discord.js";



// Data
export const data = new SlashCommandBuilder()
    .setName("ping")
    .setDescription("Checks on Mustache Bot");

// execute()
export async function execute(
    interaction: ChatInputCommandInteraction
) : Promise<void> {
    await interaction.reply("Don't worry daddy/mommy, I am here.");
}