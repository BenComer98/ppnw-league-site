import { useParams } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import { ClientContext } from "../context/ClientContext";
import type {
    Player,
    PlayerEventData
} from "../types/db_entities/SupabaseTypes";
import {
    getPlayerById,
    getPlayerEventDataByPlayerId
} from "../api/supabaseApi";
import safeConvertStoN from "../utils/parsers/safeConvert";
import type { PlayerAdvanced } from "../types/PlayerAdvanced";
import calculateAdvancedStats from "../utils/calculateAdvancedStats";

export default function PlayerDetailPage() {
    const { player_id } = useParams();

    const [playerId, setPlayerId] = useState(0);
    const [loading, setLoading] = useState(true);
    const [invalidPlayerId, setInvalidPlayerId] = useState(false);
    const [playerInfo, setPlayerInfo] = useState<Player | null>(null);
    const [playerEventData, setPlayerEventData] = useState<PlayerEventData[] | null>(null);
    const [playerAdvanced, setPlayerAdvanced] = useState<PlayerAdvanced>({});

    const context = useContext(ClientContext);

    useEffect(() => {
        if (!player_id) {
            setInvalidPlayerId(true);
            setLoading(false);
            return;
        }

        let id: number;

        try {
            id = safeConvertStoN(player_id);
        } catch (error) {
            setInvalidPlayerId(true);
            setLoading(false);
            return;
        }

        setPlayerId(id);

        if (!context) {
            return;
        }

        async function fetchData() {
            setLoading(true);

            try {
                const [playerData, eventData] = await Promise.all([
                    getPlayerById(context!.client, id),
                    getPlayerEventDataByPlayerId(context!.client, id)
                ]);

                setPlayerInfo(playerData);
                setPlayerEventData(eventData);
                setPlayerAdvanced(calculateAdvancedStats(eventData));
            } catch (error) {
                console.error("Failed to fetch player data:", error);
            } finally {
                setLoading(false);
            }
        }

        fetchData();
    }, [context, player_id]);


    if (loading) {
        return (
            <div className="PlayerDetailPage">
                <h1>PLAYER</h1>
                <p>Loading player information...</p>
            </div>
        );
    }

    if (invalidPlayerId || !playerInfo) {
        return (
            <div className="PlayerDetailPage">
                <h1>PLAYER NOT FOUND</h1>
                <p>
                    No player could be found for ID {playerId}.
                </p>
            </div>
        );
    }

    return (
        <div className="PlayerDetailPage">
            <div className="PlayerDetailPage-header">
                <h1>{playerInfo.name}</h1>
                <p>Player ID: {playerId}</p>
            </div>

            <div className="PlayerDetailPage-info">
                <h2>PLAYER INFORMATION</h2>

                <div className="PlayerDetailPage-info-row">
                    <strong>Name </strong>
                    <span>{playerInfo.name}</span>
                </div>

                <div className="PlayerDetailPage-info-row">
                    <strong>Player ID </strong>
                    <span>{playerInfo.id}</span>
                </div>

                <div className="PlayerDetailPage-info-row">
                    <strong>Trophies </strong>
                    <span>{playerAdvanced.trophies}</span>
                </div>
            </div>

            <div className="PlayerDetailPage-events">
                <h2>EVENT HISTORY</h2>

                {!playerEventData || playerEventData.length === 0 ? (
                    <p>No event data available.</p>
                ) : (
                    <div className="PlayerDetailPage-events-list">
                        {playerEventData.map((event) => (
                            <div
                                className="PlayerDetailPage-event"
                                key={event.id}
                            >
                                <p>
                                    <strong>Event ID:</strong>{" "}
                                    {event.event_id ?? "Unknown"}
                                </p>

                                <p>
                                    <strong>Wins:</strong>{" "}
                                    {event.wins ?? 0}
                                </p>

                                <p>
                                    <strong>Losses:</strong>{" "}
                                    {event.losses ?? 0}
                                </p>

                                <p>
                                    <strong>Finish:</strong>{" "}
                                    {event.finish ?? "N/A"}
                                </p>

                                {event.notes && (
                                    <p>
                                        <strong>Notes:</strong>{" "}
                                        {event.notes}
                                    </p>
                                )}
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}
