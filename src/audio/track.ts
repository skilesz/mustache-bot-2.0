// IMPORTS
import { AudioSource } from "./audio-source.js";



// Track interface
export interface Track {
    title: string,
    source: AudioSource;
    filename?: string;
    url?: string;
}