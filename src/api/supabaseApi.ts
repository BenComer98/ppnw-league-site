import type { SupabaseClient } from "@supabase/supabase-js";
import type { Player, Event, PlayerEventData, Deck, Archetype, Store, Weekly, StoreWithWeeklies } from "../types/db_entities/SupabaseTypes";

export async function getData<T>(client: SupabaseClient, tableName: string): Promise<T[]> {
    const { data, error } = await client
        .from(tableName)
        .select('*')
    if (error) throw error;
    return data ?? [];
}

export async function getDataById<T>(client: SupabaseClient, tableName: string, id: number): Promise<T[]> {
    const { data, error } = await client
        .from(tableName)
        .select('*')
        .eq('id', id);
    if (error) throw error;
    return data ?? [];
}


export async function getEvents(client: SupabaseClient): Promise<Event[]> {
    return getData<Event>(client, 'events');
}

export async function getEventsById(client: SupabaseClient, id: number): Promise<Event[]> {
    return getDataById<Event>(client, 'events', id);
}

export async function getEventsWithNameLike(client: SupabaseClient, nameMatch: string): Promise<Event[]> {
    const { data, error } = await client
        .from('events')
        .select('*')
        .ilike('name', nameMatch);
    if (error) throw error;
    return data ?? [];
}


export async function getPlayers(client: SupabaseClient): Promise<Player[]> {
    return getData<Player>(client, 'players');
}

export async function getPlayerById(client: SupabaseClient, id: number): Promise<Player[]> {
    return getDataById<Player>(client, 'players', id);
}

export async function getPlayersWithNameLike(client: SupabaseClient, nameMatch: string): Promise<Player[]> {
    const { data, error } = await client
        .from('players')
        .select('*')
        .ilike('name', nameMatch);
    if (error) throw error;
    return data ?? [];
}


export async function getPlayerEventData(client: SupabaseClient): Promise<PlayerEventData[]> {
    return getData<PlayerEventData>(client, 'player_event_data');
}

export async function getPlayerEventDataById(client: SupabaseClient, id: number): Promise<PlayerEventData[]> {
    return getDataById<PlayerEventData>(client, 'player_event_data', id);
}


export async function getDecks(client: SupabaseClient): Promise<Deck[]> {
    return getData<Deck>(client, 'decks');
}

export async function getDeckById(client: SupabaseClient, id: number): Promise<Deck[]> {
    return getDataById<Deck>(client, 'decks', id);
}

export async function getDecksWithNameLike(client: SupabaseClient, nameMatch: string): Promise<Deck[]> {
    const { data, error } = await client
        .from('decks')
        .select('*')
        .ilike('name', nameMatch);
    if (error) throw error;
    return data ?? [];
}

export async function getDecksWithArchetype(client: SupabaseClient, archetype_id: number): Promise<Deck[]> {
    const { data, error } = await client
        .from('decks')
        .select('*')
        .eq('archetype_id', archetype_id);
    if (error) throw error;
    return data ?? [];
}


export async function getArchetypes(client: SupabaseClient): Promise<Archetype[]> {
    return getData<Archetype>(client, 'archetypes');
}

export async function getArchetypeById(client: SupabaseClient, id: number): Promise<Archetype[]> {
    return getDataById<Archetype>(client, 'archetypes', id);
}

export async function getArchetypesWithNameLike(client: SupabaseClient, nameMatch: string): Promise<Archetype[]> {
    const { data, error } = await client
        .from('archetypes')
        .select('*')
        .ilike('name', nameMatch);
    if (error) throw error;
    return data ?? [];
}


export async function getStores(client: SupabaseClient): Promise<Store[]> {
    return getData<Store>(client, 'stores');
}

export async function getStoreById(client: SupabaseClient, id: number): Promise<Store[]> {
    return getDataById<Store>(client, 'stores', id);
}

export async function getStoresWithNameLike(client: SupabaseClient, nameMatch: string): Promise<Store[]> {
    const { data, error } = await client
        .from('stores')
        .select('*')
        .ilike('name', nameMatch);
    if (error) throw error;
    return data ?? [];
}

export async function getStoresWithWeeklies(
    client: SupabaseClient
): Promise<StoreWithWeeklies[]> {
    const { data, error } = await client
        .from('stores')
        .select(`
            *,
            weeklies (*)
        `);

    if (error) throw error;

    return data ?? [];
}

export async function getStoreByIdWithWeeklies(client: SupabaseClient, id: number): Promise<StoreWithWeeklies> {
    const { data, error } = await client
        .from('stores')
        .select(`
            *,
            weeklies (*)
        `)
        .eq('id', id);
    if (error) throw error;

    return data[0] ?? [];
}


export async function getWeeklies(client: SupabaseClient): Promise<Weekly[]> {
    return getData<Weekly>(client, 'weeklies');
}

export async function getWeeklyById(client: SupabaseClient, id: number): Promise<Weekly[]> {
    return getDataById<Weekly>(client, 'weeklies', id);
}
