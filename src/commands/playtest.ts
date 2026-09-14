// IMPORTS
import {
    ChatInputCommandInteraction,
    SlashCommandBuilder,
} from "discord.js";

import { createLocalAudioResource } from "../audio/audio-service.js";

import { GuildStateManager } from "../state/guild-state-manager.js";



// Data
export const data = new SlashCommandBuilder()
    .setName("playtest")
    .setDescription("Play a local audio file.")
    .addStringOption((option) => 
        option
            .setName("file")
            .setDescription("The audio file to play.")
            .setRequired(true)
    );

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

    if (!state.voiceConnection || !state.audioPlayer) {
        await interaction.reply("I need to be in a voice channel first.");
        return;
    }

    // Get file
    const file = interaction.options.getString("file", true);

    // Create audio stream and resource
    const resource = await createLocalAudioResource(file);

    // Play audio
    state.audioPlayer.play(resource);

    await interaction.reply("Playing test audio.");
}