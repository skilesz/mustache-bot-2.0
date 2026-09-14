// IMPORTS
import {
    ChatInputCommandInteraction,
    SlashCommandBuilder,
} from "discord.js";

import { GuildStateManager } from "./state/guild-state-manager.js";



// Command interface
export interface Command {
    data: SlashCommandBuilder;
    execute: (
        Interaction: ChatInputCommandInteraction,
        guildStateManager: GuildStateManager
    ) => Promise<void>;
}