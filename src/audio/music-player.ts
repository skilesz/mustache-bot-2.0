// IMPORTS
import {
    AudioPlayer,
    AudioPlayerStatus,
    createAudioPlayer,
} from "@discordjs/voice";

import { Queue } from "./queue.js";
import { Track } from "./track.js";
import { createLocalAudioResource } from "./audio-service.js";



// MusicPlayer class
export class MusicPlayer {
    // Private vars
    private readonly audioPlayer: AudioPlayer;
    private readonly queue: Queue<Track>;

    // Constructor
    constructor() {
        this.audioPlayer = createAudioPlayer();
        this.queue = new Queue<Track>;

        this.audioPlayer.on(AudioPlayerStatus.Idle, () => {
            console.log("Music player is idle.");

            void this.playNext();
        });
    }

    // Get player
    get player(): AudioPlayer {
        return this.audioPlayer;
    }

    // Get queue size
    get queueSize(): number {
        return this.queue.size;
    }

    // play()
    async play(track: Track): Promise<void> {
        const resource = await createLocalAudioResource(track.filename);

        this.audioPlayer.play(resource);
    }

    // playNext()
    private async playNext(): Promise<void> {
        const nextTrack = this.queue.dequeue();

        if (!nextTrack) {
            console.log("Queue is empty.");
            return;
        }

        console.log(`Playing next track: ${nextTrack.filename}`);

        await this.play(nextTrack);
    }

    // playOrQueue()
    async playOrQueue(track: Track): Promise<void> {
        if (this.audioPlayer.state.status === AudioPlayerStatus.Idle) {
            await this.play(track);
            return;
        }

        this.enqueue(track);

        console.log(`Queued track: ${track.filename}`);
    }

    // enqueue()
    enqueue(track: Track): void {
        this.queue.enqueue(track);
    }

    // peek()
    peek(): Track | undefined {
        return this.queue.peek();
    }

    // stop()
    stop(): void {
        this.queue.clear();
        this.audioPlayer.stop();
    }

    // clearQueue()
    clearQueue(): void {
        this.queue.clear();
    }
}