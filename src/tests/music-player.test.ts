// IMPORTS
import { describe, expect, it, vi } from "vitest";

import { MusicPlayer } from "../audio/music-player.ts";

import { createAudioResource } from "@discordjs/voice";



// Music Player tests
describe("MusicPlayer", () => {
    // Loads and plays a track when idle
    it("loads and plays a track when idle", async () => {
        const loadAudioResource = vi.fn().mockRejectedValue(new Error("test loader"));

        const player = new MusicPlayer(loadAudioResource);

        await player.playOrQueue({
            filename: "song.mp3",
        });

        expect(loadAudioResource).toHaveBeenCalledWith("song.mp3");
    });
});