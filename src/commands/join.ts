// IMPORTS
import {
    ChatInputCommandInteraction,
    SlashCommandBuilder,
} from "discord.js";

import {
    joinVoiceChannel,
} from "@discordjs/voice";



// Data
export const data = new SlashCommandBuilder()
    .setName("join")
    .setDescription("Entices Mustache Bot to join your voice channel.")

// execute()
export async function execute(
    interaction: ChatInputCommandInteraction
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

    // Join voice channel
    joinVoiceChannel({
        channelId: voiceChannel.id,
        guildId: voiceChannel.guild.id,
        adapterCreator: voiceChannel.guild.voiceAdapterCreator,
    });

    await interaction.reply(`Mustache Bot joined **${voiceChannel.name}**!`);
}