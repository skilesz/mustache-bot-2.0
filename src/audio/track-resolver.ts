// IMPORTS
import { Track } from "./track.js";
import { AudioSource } from "./audio-source.js";



// Track Resolver class
export class TrackResolver {
    // Private vars
    private readonly sources: AudioSource[];

    // Constructor
    constructor(sources: AudioSource[]) {
        this.sources = sources;
    }

    // resolve()
    async resolve(input: string): Promise<Track> {
        for (const source of this.sources) {
            try {
                return await source.resolve(input);
            } catch {
                // This source doesn't handle this input
            }
        }

        throw new Error(`Unsupported audio source: ${input}`);
    }
}