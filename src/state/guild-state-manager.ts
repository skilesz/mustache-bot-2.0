// IMPORTS
import { GuildState } from "./guild-state.js";



// GuildStateManager class
export class GuildStateManager {
    // States
    private states = new Map<string, GuildState>();

    // get()
    get(guildId: string) : GuildState {
        let state = this.states.get(guildId);

        if (!state) {
            state = {
                voiceConnection: null,
                musicPlayer: null,
            };

            this.states.set(guildId, state);
        }

        return state;
    }

    // delete()
    delete(guildId: string) : void {
        this.states.delete(guildId);
    }
}