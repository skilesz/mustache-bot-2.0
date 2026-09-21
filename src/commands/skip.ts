// IMPORTS
import {
    ChatInputCommandInteraction,
    SlashCommandBuilder,
} from "discord.js";

import { GuildStateManager } from "../state/guild-state-manager.js";



// Data
export const data = new SlashCommandBuilder()
    .setName("skip")
    .setDescription("Skip the currently playing track.");

// execute()
export async function execute(
    interaction: ChatInputCommandInteraction,
    guildStateManager: GuildStateManager
): Promise<void> {
    // Get guildId
    const guildId = interaction.guildId;

    if (!guildId) {
        await interaction.reply("This command can only be used in a server.");
        return;
    }

    // Get state
    const state = guildStateManager.get(guildId);

    if (!state.musicPlayer) {
        await interaction.reply("There isn't a music player available.");
        return;
    }

    // Skip track
    state.musicPlayer.skip();

    await interaction.reply("Skipped the current track.");
}