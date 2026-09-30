// IMPORTS
import { describe, expect, it } from "vitest";

import { TrackResolver } from "../audio/track-resolver.js";
import { AudioSource } from "../audio/audio-source.js";
import { Track } from "../audio/track.js";



// Rejecting Source class
class RejectingSource implements AudioSource {
    async resolve(): Promise<Track> {
        throw new Error("Not my source.");
    }

    async createResource(): Promise<never> {
        throw new Error("Not implemented.");
    }
}

// Test Source class
class TestSource implements AudioSource {
    async resolve(input: string): Promise<Track> {
        return {
            title: "Test Track", 
            url: input,
            source: this,
        };
    }

    async createResource(): Promise<never> {
        throw new Error("Not implemented.");
    }
}



// TESTS
describe("TrackResolver", () => {
    // Uses the first source that can resolve the input
    it("uses the first source that can resolve the input", async () => {
        const resolver = new TrackResolver([
            new RejectingSource(),
            new TestSource(),
        ]);

        const track = await resolver.resolve("test-input");

        expect(track.title).toBe("Test Track");
        expect(track.url).toBe("test-input");
    });

    // Throws when no source can resolve the input
    it("throws when no source can resolve the input", async () => {
        const resolver = new TrackResolver([
            new RejectingSource(),
            new RejectingSource(),
        ]);

        await expect(
            resolver.resolve("unsupported-input"),
        ).rejects.toThrow("Unsupported audio source");
    });
});