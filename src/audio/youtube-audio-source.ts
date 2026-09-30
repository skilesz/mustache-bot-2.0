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
        let url: URL;

        try {
            url = new URL(input);
        } catch {
            throw new Error("Input is not a valid URL.");
        }

        const isYouTube =
            url.hostname === "youtube.com" ||
            url.hostname === "www.youtube.com" ||
            url.hostname === "youtu.be" ||
            url.hostname === "www.youtu.be";

        if (!isYouTube) {
            throw new Error("Input is not a YouTube url.");
        }

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