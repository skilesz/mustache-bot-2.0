// IMPORTS
import {
    ChatInputCommandInteraction,
    SlashCommandBuilder,
} from "discord.js";

import { GuildStateManager } from "./state/guild-state-manager.js";

import { TrackResolver } from "./audio/track-resolver.js";



// Command interface
export interface Command {
    data: SlashCommandBuilder;
    execute: (
        Interaction: ChatInputCommandInteraction,
        guildStateManager: GuildStateManager,
        trackResolver: TrackResolver
    ) => Promise<void>;
}