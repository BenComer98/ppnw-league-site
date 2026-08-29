import { useContext, useEffect, useState } from 'react';
import { ClientContext } from '../context/ClientContext';
import StorePanel from '../objects/StorePanel';
import './StoresPage.css';
import { getStores, getStoresWithWeeklies } from '../api/supabaseApi';
import type { Store, StoreWithWeeklies } from '../types/db_entities/SupabaseTypes';

function StoresPage() {
    const context = useContext(ClientContext);
    const [stores, setStores] = useState<Store[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (!context) {
            setLoading(false);
            return;
        }

        async function fetchStores() {
            try {
                const data = (await getStoresWithWeeklies(context!.client)).filter((store: StoreWithWeeklies) => {
                    return store.weeklies.length != 0;
                });
                setStores(data);
            } catch (error) {
                console.error('Failed to fetch stores:', error);
            } finally {
                setLoading(false);
            }
        }

        fetchStores();
    }, [context]);

    return (
        <div className="StoresPage">
            <div className="StoresPage-header">
                <h1>STORES</h1>
            </div>

            <div className="StoresPage-list">
                {loading ? (
                    <p>Loading stores...</p>
                ) : (
                    stores.map((row) => (
                        <StorePanel
                            key={row.id}
                            store_id={row.id}
                        />
                    ))
                )}
            </div>
        </div>
    );
}

export default StoresPage;
