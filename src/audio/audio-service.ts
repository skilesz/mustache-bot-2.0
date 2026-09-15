// IMPORTS
import { createAudioResource, AudioResource } from "@discordjs/voice";
import { createReadStream } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { access, constants } from "node:fs/promises";



// Audio directory
const audioDirectory = path.dirname(fileURLToPath(import.meta.url));



// createLocalAudioResource()
export async function createLocalAudioResource(
    filename: string
) : Promise<AudioResource> {
    const filePath = path.resolve(audioDirectory, filename);

    if (!filePath.startsWith(audioDirectory + path.sep)) {
        throw new Error("Invalid audio filename.");
    }

    await access(filePath, constants.R_OK);

    const audioStream = createReadStream(filePath);

    return createAudioResource(audioStream);
}