// IMPORTS
import {
    ChatInputCommandInteraction,
    SlashCommandBuilder,
} from "discord.js";

import { createAudioResource } from "@discordjs/voice";
import { createReadStream } from "node:fs";

import { GuildStateManager } from "../state/guild-state-manager.js";



// Data
export const data = new SlashCommandBuilder()
    .setName("playtest")
    .setDescription("Play the local test audio file.");

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

    // Create audio stream and resource
    const audioStream = createReadStream("audio/test.mp3");

    const resource = createAudioResource(audioStream);

    // Play audio
    state.audioPlayer.play(resource);

    await interaction.reply("Playing test audio.");
}