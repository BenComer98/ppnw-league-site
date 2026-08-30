import {
    createContext,
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