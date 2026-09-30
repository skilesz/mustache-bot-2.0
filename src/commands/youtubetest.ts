// IMPORTS
import { ChatInputCommandInteraction, SlashCommandBuilder } from "discord.js";

import { GuildStateManager } from "../state/guild-state-manager.js";
import { Track } from "../audio/track.js";
import { YouTubeAudioSource } from "../audio/youtube-audio-source.js";



// Data
export const data = new SlashCommandBuilder()
    .setName("youtubetest")
    .setDescription("Play audio from a YouTube URL.")
    .addStringOption((option) => 
        option
            .setName("url")
            .setDescription("YouTube URL")
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

    if (!state.voiceConnection || !state.musicPlayer) {
        await interaction.reply("I need to be in a voice channel first.");
        return;
    }

    // Get file
    const url = interaction.options.getString("url", true);

    // Create track
    const source = new YouTubeAudioSource();
    const track = await source.resolve(url);

    console.log("Resolved track:", track);

    await interaction.reply(`Queued **${track.title}**`);

    // Play audio
    void state.musicPlayer.playOrQueue(track).catch((error) => {
        console.error("Failed to start playback:", error);
    });
}