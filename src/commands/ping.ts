import { SlashCommandBuilder, ChatInputCommandInteraction } from "discord.js";

export const data = new SlashCommandBuilder()
    .setName("ping")
    .setDescription("Checks on Mustache Bot");

export async function execute(
    interaction: ChatInputCommandInteraction
) {
    await interaction.reply("Don't worry daddy/mommy, I am here.");
}