import './StorePanel.css';
import { ClientContext } from '../context/ClientContext';
import { useContext, useEffect, useState } from 'react';
import { getStoreByIdWithWeeklies } from '../api/supabaseApi';
import type { StoreWithWeeklies, Weekly } from '../types/db_entities/SupabaseTypes';

export interface StorePanelProps {
    store_id: number;
    hide?: boolean;
}

export default function StorePanel(props: StorePanelProps) {
    const context = useContext(ClientContext);
    const [store, setStore] = useState<StoreWithWeeklies | null>(null);

    useEffect(() => {
        if (!context) return;

        async function fetchStore() {
            try {
                const data = await getStoreByIdWithWeeklies(
                    context!.client,
                    props.store_id
                );

                setStore(data ?? null);
            } catch (error) {
                console.error('Failed to fetch store:', error);
            }
        }

        fetchStore();
    }, [context, props.store_id]);

    if (!store) {
        return null;
    }

    return (
        <div className="StorePanel">
            <p>{store.name}</p>
            <p>{store.location}</p>
            <p>{store.phone}</p>
            <div>
                {store.weeklies.map((weekly: Weekly) => {
                    return (
                        <div key={weekly.id}>{weekly.weekday}, {weekly.time}</div>
                    );
                })}
            </div>
        </div>
    );
}
