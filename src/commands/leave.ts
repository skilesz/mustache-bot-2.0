// IMPORTS
import {
    ChatInputCommandInteraction,
    SlashCommandBuilder,
} from "discord.js";

import { GuildStateManager } from "../state/guild-state-manager.js";



// Data
export const data = new SlashCommandBuilder()
    .setName("leave")
    .setDescription("Tells Mustache Bot to fuck off.")

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

    if (!state.voiceConnection) {
        await interaction.reply("I'm not even in voice you fucker.");
        return;
    }

    // Remove state
    state.voiceConnection.destroy();
    guildStateManager.delete(guildId);

    await interaction.reply("Fine. I left. Don't bother asking me to come back.");
}