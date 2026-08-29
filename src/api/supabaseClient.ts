import { createClient, SupabaseClient } from '@supabase/supabase-js';
import type { Database } from '../types/db_entities/Database';

export default function getSupabaseClient(): SupabaseClient {
    return createClient<Database>(import.meta.env.VITE_SUPABASE_URL, import.meta.env.VITE_SUPABASE_KEY);
}
