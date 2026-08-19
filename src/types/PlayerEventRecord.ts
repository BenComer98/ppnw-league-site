import type { Archetype } from "./Archetype";
import type { Player } from "./Player";
import type { PlayerEventStats } from "./PlayerEventStats";
import type { Event } from "./Event";
import type { Location } from "./Location";

export interface PlayerEventRecord {
    finish?: number;
    player: Player;
    event: Event;
    date: Date;
    archetype?: Archetype;
    record: PlayerEventStats;
    location: Location; // Should match event, but we can match on this for easy groups
    cpc: boolean;
    trophy: boolean;
    notes?: string;
}