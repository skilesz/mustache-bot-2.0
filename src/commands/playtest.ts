// IMPORTS
import {
    ChatInputCommandInteraction,
    SlashCommandBuilder,
} from "discord.js";

import { GuildStateManager } from "../state/guild-state-manager.js";
import { Track } from "../audio/track.js";



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

    if (!state.voiceConnection || !state.musicPlayer) {
        await interaction.reply("I need to be in a voice channel first.");
        return;
    }

    // Get file
    const file = interaction.options.getString("file", true);

    // Create track
    const track: Track = {
        filename: file,
    };

    // Play audio
    await state.musicPlayer.playOrQueue(track);

    await interaction.reply(`Added **${file}** to the queue.`);
}