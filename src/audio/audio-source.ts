// IMPORTS
import { AudioResource } from "@discordjs/voice";

import { Track } from "./track.js";



// Audio Source interface
export interface AudioSource {
    resolve(input: string): Promise<Track>;
    createResource(track: Track): Promise<AudioResource>;
}