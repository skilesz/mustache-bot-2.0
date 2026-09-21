// IMPORTS
import {
    ChatInputCommandInteraction,
    SlashCommandBuilder,
} from "discord.js";

import { GuildStateManager } from "../state/guild-state-manager.js";



// Data
export const data = new SlashCommandBuilder()
    .setName("queue")
    .setDescription("Show the current music queue.");

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

    // Get queued tracks
    const tracks = state.musicPlayer.queuedTracks;

    if (tracks.length === 0) {
        await interaction.reply("The queue is empty.");
        return;
    }

    const queueText = tracks
        .map((track, index) => `${index + 1}. ${track.filename}`)
        .join("\n");

    await interaction.reply(`**Queue:**\n${queueText}`);
}