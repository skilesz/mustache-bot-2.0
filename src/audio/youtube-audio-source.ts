// IMPORTS
import { AudioResource, createAudioResource } from "@discordjs/voice";
import { youtubeDl } from "youtube-dl-exec";

import { AudioSource } from "./audio-source.js";
import { Track } from "./track.js";

// TYPES
interface YouTubeMetadata {
    title: string,
}



// YouTube Audio Source class
export class YouTubeAudioSource implements AudioSource {
    // resolve()
    async resolve(input: string): Promise<Track> {
        const metadata = await youtubeDl(input, {
            dumpSingleJson: true,
            skipDownload: true,
            noWarnings: true,
        }) as YouTubeMetadata;

        return {
            title: metadata.title,
            url: input,
            source: this,
        }
    }

    // createResource()
    async createResource(track: Track): Promise<AudioResource> {
        if (!track.url) {
            throw new Error("YouTube track is missing a URL.");
        }

        const process = youtubeDl.exec(track.url, {
            format: "bestaudio",
            output: "-",
            quiet: true,
        });

        if (!process.stdout) {
            throw new Error("yt-dlp did not provide an audio stream.");
        }

        return createAudioResource(process.stdout);
    }
}