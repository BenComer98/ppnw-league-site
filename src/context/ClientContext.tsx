import {
    createContext,
    useContext,
    useState,
    type ReactNode
} from 'react';

import getSupabaseClient from '../api/supabaseClient';
import { SupabaseClient } from '@supabase/supabase-js';

interface ClientContextType {
    client: SupabaseClient;
}

export const ClientContext = createContext<ClientContextType | undefined>(undefined);

export function ClientProvider({ children }: { children: ReactNode }) {
    const [client, _] = useState<SupabaseClient>(getSupabaseClient());

    return (
        <ClientContext.Provider value={{ client }}>
            {children}
        </ClientContext.Provider>
    );
}

export function useplayerEventData() {
    const context = useContext(ClientContext);

    if (!context) {
        throw new Error("useplayerEventData must be used within a playerEventDataProvider");
    }

    return context;
}