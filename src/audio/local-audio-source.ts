// IMPORTS
import { AudioResource } from "@discordjs/voice";

import { createLocalAudioResource } from "./audio-service.js";
import { AudioSource } from "./audio-source.js";
import { Track } from "./track.js";



// Local Audio Source class
export class LocalAudioSource implements AudioSource {
    // resolve()
    async resolve(input: string): Promise<Track> {
        return {
            title: input,
            filename: input,
            source: this,
        }
    }

    // createResource()
    async createResource(track: Track): Promise<AudioResource> {
        if (!track.filename) {
            throw new Error("Local track is missing a filename.");
        }

        return createLocalAudioResource(track.filename);
    }
}