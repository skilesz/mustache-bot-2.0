// IMPORTS
import {
    ChatInputCommandInteraction,
    SlashCommandBuilder,
} from "discord.js";

import { GuildStateManager } from "../state/guild-state-manager.js";



// Data
export const data = new SlashCommandBuilder()
    .setName("leave")
    .setDescription("Leaves the current voice channel.")

// execute()
export async function execute(
    interaction: ChatInputCommandInteraction,
    guildStateManager: GuildStateManager
) : Promise<void> {
    // Get guildId
    const guildId = interaction.guildId;

    if (!guildId) {
        await interaction.reply("This command can only be used in a server.");
        return;
    }

    // Get state
    const state = guildStateManager.get(guildId);

    if (!state.voiceConnection || !state.musicPlayer) {
        await interaction.reply("I'm not currently in a voice channel.");
        return;
    }

    // Remove state
    state.musicPlayer.stop();
    state.voiceConnection.destroy();
    guildStateManager.delete(guildId);

    await interaction.reply("Mustache Bot has disconnected.");
}