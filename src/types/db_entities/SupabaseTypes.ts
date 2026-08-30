import type { Tables } from "./Database"

export type Event = Tables<'events'>;
export type Player = Tables<'players'>;
export type PlayerEventData = Tables<'player_event_data'>;
export type Archetype = Tables<'archetypes'>;
export type Deck = Tables<'decks'>;
export type Weekly = Tables<'weeklies'>;
export type Store = Tables<'stores'>;

export type StoreWithWeeklies = Store & {
    weeklies: Weekly[];
}

export type PlayerWithFKs = Player & {
    favorite_deck: Deck;
    home_store: Store;
}