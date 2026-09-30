// IMPORTS
import {
    AudioPlayer,
    AudioPlayerStatus,
    createAudioPlayer,
} from "@discordjs/voice";

import { Queue } from "./queue.js";
import { Track } from "./track.js";



// MusicPlayer class
export class MusicPlayer {
    // Private vars
    private readonly audioPlayer: AudioPlayer;
    private readonly queue: Queue<Track>;
    private playbackGeneration = 0;
    private isTransitioning = false;

    // Constructor
    constructor() {
        this.audioPlayer = createAudioPlayer();
        this.queue = new Queue<Track>;

        this.audioPlayer.on(AudioPlayerStatus.Idle, () => {
            void this.playNext().catch((error) => {
                console.error("Failed to play next track:", error);
            });
        });

        this.audioPlayer.on("error", (error) => {
            console.error("Audio player error:", error);
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

    // Get queued tracks
    get queuedTracks(): Track[] {
        return this.queue.toArray();
    }

    // playNext()
    private async playNext(): Promise<void> {
        if (this.isTransitioning) {
            return;
        }

        this.isTransitioning = true;

        try {
            const generation = this.playbackGeneration;

            while (generation === this.playbackGeneration) {
                const nextTrack = this.queue.peek();

                if (!nextTrack) {
                    console.log("Queue is empty.");
                    return;
                }

                console.log(`Playing next track: ${nextTrack.title}`);

                try {
                    const resource = await nextTrack.source.createResource(nextTrack);

                    if (generation !== this.playbackGeneration) {
                        console.log("Playback operation is no longer current.");
                        return;
                    }

                    this.queue.dequeue();
                    this.audioPlayer.play(resource);

                    return;
                } catch (error) {
                    if (generation !== this.playbackGeneration) {
                        console.log("Playback operation is no longer current.");
                        return;
                    }

                    console.error(`Failed to load track ${nextTrack.title}:`, error);

                    this.queue.dequeue();

                    console.log(`Skipping unavailable track: ${nextTrack.title}`);
                }
            }
        } finally {
            this.isTransitioning = false;
        }
    }

    // playOrQueue()
    async playOrQueue(track: Track): Promise<void> {
        this.enqueue(track);

        console.log(`Queued track: ${track.title}`);

        if (this.audioPlayer.state.status === AudioPlayerStatus.Idle &&
            !this.isTransitioning
        ) {
            await this.playNext();
        }
    }

    // skip()
    skip(): void {
        if (this.audioPlayer.state.status === AudioPlayerStatus.Idle) {
            return;
        }

        this.audioPlayer.stop();
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
        this.playbackGeneration++;

        this.queue.clear();
        this.audioPlayer.stop();
    }

    // clearQueue()
    clearQueue(): void {
        this.queue.clear();
    }
}