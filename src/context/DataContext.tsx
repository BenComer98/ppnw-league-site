import {
    createContext,
    useCallback,
    useContext,
    useEffect,
    useState,
    type ReactNode
} from 'react';

import { getRecords } from '../api/sheetsApi';
import { parseRecords } from '../utils/parseSheetsData';
import type { PlayerEventRecord } from '../types/PlayerEventRecord';
import type { Event } from '../types/Event';

interface PlayerEventRecordsContextType {
    playerEventRecords: PlayerEventRecord[];
    loading: boolean;
    error: string | null;
    hasData: boolean;
    getPlayerEventRecords: (playerId: string) => PlayerEventRecord[] | undefined;
    getEventRecords: (event: Event, date: Date) => PlayerEventRecord[] | undefined;
}

const PlayerEventsRecordsContext = createContext<PlayerEventRecordsContextType | undefined>(undefined);

export function PlayerEventRecordsProvider({ children }: { children: ReactNode }) {
    const [playerEventRecords, setPlayerEventRecords] = useState<PlayerEventRecord[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        let isMounted = true;

        const loadPlayerEventRecords = async () => {
            try {
                const rawRecords = await getRecords();

                if (!isMounted) {
                    return;
                }

                setPlayerEventRecords(parseRecords(rawRecords));
                setError(null);
            } catch (err) {
                if (!isMounted) {
                    return;
                }

                setError(err instanceof Error ? err.message : "Unable to load bulk player event records");
            } finally {
                if (isMounted) {
                    setLoading(false);
                }
            }
        };

        void loadPlayerEventRecords();

        return () => {
            isMounted = false;
        }
    }, []);

    const getPlayerEventRecords = useCallback((playerId: string) => {
        return playerEventRecords.filter(record => record.player.name === playerId);
    }, [playerEventRecords]);

    const getEventRecords = useCallback((event: Event, date: Date) => {
        return playerEventRecords.filter(record => record.event.name === event.name && record.date.getTime() === date.getTime());
    }, [playerEventRecords]);

    return (
        <PlayerEventsRecordsContext.Provider value={{ playerEventRecords, loading, error, hasData: playerEventRecords.length > 0, getPlayerEventRecords, getEventRecords }}>
            {children}
        </PlayerEventsRecordsContext.Provider>
    );
}

export function usePlayerEventRecords() {
    const context = useContext(PlayerEventsRecordsContext);

    if (!context) {
        throw new Error("usePlayerEventRecords must be used within a PlayerEventRecordsProvider");
    }

    return context;
}