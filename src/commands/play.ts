// IMPORTS
import { ChatInputCommandInteraction, SlashCommandBuilder } from "discord.js";

import { GuildStateManager } from "../state/guild-state-manager.js";
import { TrackResolver } from "../audio/track-resolver.js";



// Data
export const data = new SlashCommandBuilder()
    .setName("play")
    .setDescription("Play specified audio")
    .addStringOption((option) => 
        option
            .setName("query")
            .setDescription("Audio URL or local file")
            .setRequired(true)
    );

// execute()
export async function execute(
    interaction: ChatInputCommandInteraction,
    guildStateManager: GuildStateManager,
    trackResolver: TrackResolver
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

    // Get query
    const input = interaction.options.getString("query", true);

    // Defer reply
    await interaction.deferReply();

    // Try to resolve and queue track based on input
    try {
        const track = await trackResolver.resolve(input);

        void state.musicPlayer.playOrQueue(track).catch((error) => {
            console.error("Failed to start playback:", error);
        });

        await interaction.editReply(`Queued **${track.title}**`);
    } catch (error) {
        console.error("Failed to resolve track:", error);

        await interaction.editReply("I couldn't find a playable audio source for that input.");
    }
}