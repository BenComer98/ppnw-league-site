import type { PlayerEventData } from "../types/db_entities/SupabaseTypes";
import type { PlayerAdvanced } from "../types/PlayerAdvanced";

export default function calculateAdvancedStats(playerEventData: PlayerEventData[]): PlayerAdvanced {
    let wins = 0; let losses = 0; let draws = 0; let trophies = 0;
    playerEventData.forEach((eventData: PlayerEventData) => {
        wins += eventData.wins ?? 0;
        losses += eventData.losses ?? 0;
        draws += eventData.draws ?? 0;
        trophies += (eventData.trophy ?? false) ? 1 : 0;
    });

    return {
        win_rate: wins / (wins + losses + draws),
        loss_rate: losses / (wins + losses + draws),
        draw_rate: draws / (wins + losses + draws),
        events_attended: playerEventData.length,
        trophies: trophies
    }
}