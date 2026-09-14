// IMPORTS
import { VoiceConnection, AudioPlayer } from "@discordjs/voice";



// GuildState interface
export interface GuildState {
    voiceConnection: VoiceConnection | null;
    audioPlayer: AudioPlayer | null;
}