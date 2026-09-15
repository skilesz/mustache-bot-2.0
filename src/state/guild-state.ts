// IMPORTS
import { VoiceConnection } from "@discordjs/voice";

import { MusicPlayer } from "../audio/music-player.js";



// GuildState interface
export interface GuildState {
    voiceConnection: VoiceConnection | null;
    musicPlayer: MusicPlayer | null;
}