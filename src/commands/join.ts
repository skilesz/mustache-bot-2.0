// IMPORTS
import {
    ChatInputCommandInteraction,
    SlashCommandBuilder,
} from "discord.js";

import {
    joinVoiceChannel,
} from "@discordjs/voice";

import { GuildStateManager } from "../state/guild-state-manager.js";
import { MusicPlayer } from "../audio/music-player.js";



// Data
export const data = new SlashCommandBuilder()
    .setName("join")
    .setDescription("Entices Mustache Bot to join your voice channel.")

// execute()
export async function execute(
    interaction: ChatInputCommandInteraction,
    guildStateManager: GuildStateManager
) : Promise<void> {
    // Get member that sent interaction
    const member = interaction.member;

    if (!member || !("voice" in member)) {
        await interaction.reply("Mustache Bot doesn't know what voice channel you're in.");
        return;
    }

    // Get member's current voice channel
    const voiceChannel = member.voice.channel;

    if (!voiceChannel) {
        await interaction.reply("You need to be in a voice channel first.");
        return;
    }

    // Get guild state
    const state = guildStateManager.get(voiceChannel.guild.id);

    if (state.voiceConnection) {
        await interaction.reply("Mustache Bot is already in a voice channel!");
        return;
    }

    // Join voice channel
    const connection = joinVoiceChannel({
        channelId: voiceChannel.id,
        guildId: voiceChannel.guild.id,
        adapterCreator: voiceChannel.guild.voiceAdapterCreator,
        selfDeaf: false,
        selfMute: false,
    });

    // Create audio player
    const musicPlayer = new MusicPlayer();
    connection.subscribe(musicPlayer.player);

    // Store state
    state.voiceConnection = connection;
    state.musicPlayer = musicPlayer;

    await interaction.reply(`Mustache Bot joined **${voiceChannel.name}**!`);
}