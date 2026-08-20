import type { PlayerEventRecord } from "../types/PlayerEventRecord";
import type { PlayerEventRecordRaw } from "../types/PlayerEventRecordRaw";

export function parseRecords(rawData: PlayerEventRecordRaw[]): PlayerEventRecord[] {
    console.log("Raw Records:", rawData);

    const rawData1 = rawData[0];
    console.log(rawData1);
    console.log(Object.keys(rawData1));
    console.log(rawData1.finish);

    const data = rawData.map((record) => ({
        finish: record.finish,
        player: {
            name: record.player || "",
        },
        event: {
            name: record.event || "",
            location: {
                region: record.region || "",
                city: record.city || "",
                name: record.location || ""
                // TODO: Add address matching
            },
            rounds: record.rounds || 0
        },
        date: record.date ? new Date(record.date) : new Date("1970-01-01T00:00:00Z"),
        archetype: { name: record.archetype || "" }, // TODO: Match archetype to archetype if logged
        record: {
            wins: record.wins || 0,
            losses: record.losses || 0,
            draws: record.draws || 0,
            rounds: record.rounds || (record.wins || 0) + (record.losses || 0) + (record.draws || 0),
            maxRounds: record.maxRounds || (record.rounds || (record.wins || 0) + (record.losses || 0) + (record.draws || 0)),
        },
        location: {
            region: record.region || "",
            city: record.city || "",
            name: record.location || ""
        },
        cpc: record.cpc === "Y",
        trophy: record.trophy === "Y",
        notes: record.notes,
    }));

    console.log("Parsed Records:", data);
    return data;
}