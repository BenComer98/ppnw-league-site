export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  // Allows to automatically instantiate createClient with right options
  // instead of createClient<Database, { PostgrestVersion: 'XX' }>(URL, KEY)
  __InternalSupabase: {
    PostgrestVersion: "14.5"
  }
  public: {
    Tables: {
      archetypes: {
        Row: {
          card_image: string | null
          id: number
          name: string | null
        }
        Insert: {
          card_image?: string | null
          id?: number
          name?: string | null
        }
        Update: {
          card_image?: string | null
          id?: number
          name?: string | null
        }
        Relationships: []
      }
      decks: {
        Row: {
          archetype_id: number | null
          brew: boolean | null
          card_image: string | null
          id: number
          meta: boolean | null
          name: string
        }
        Insert: {
          archetype_id?: number | null
          brew?: boolean | null
          card_image?: string | null
          id?: number
          meta?: boolean | null
          name: string
        }
        Update: {
          archetype_id?: number | null
          brew?: boolean | null
          card_image?: string | null
          id?: number
          meta?: boolean | null
          name?: string
        }
        Relationships: [
          {
            foreignKeyName: "decks_archetype_id_fkey"
            columns: ["archetype_id"]
            isOneToOne: false
            referencedRelation: "archetypes"
            referencedColumns: ["id"]
          },
        ]
      }
      events: {
        Row: {
          cpc: boolean | null
          date: string
          id: number
          name: string
          store_id: number | null
          weekly_id: number | null
        }
        Insert: {
          cpc?: boolean | null
          date: string
          id?: number
          name: string
          store_id?: number | null
          weekly_id?: number | null
        }
        Update: {
          cpc?: boolean | null
          date?: string
          id?: number
          name?: string
          store_id?: number | null
          weekly_id?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "events_store_id_fkey"
            columns: ["store_id"]
            isOneToOne: false
            referencedRelation: "stores"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "events_weekly_id_fkey"
            columns: ["weekly_id"]
            isOneToOne: false
            referencedRelation: "weeklies"
            referencedColumns: ["id"]
          },
        ]
      }
      player_event_data: {
        Row: {
          deck_id: number | null
          draws: number | null
          event_id: number | null
          finish: number | null
          id: number
          losses: number | null
          notes: string | null
          player_id: number | null
          trophy: boolean | null
          wins: number | null
        }
        Insert: {
          deck_id?: number | null
          draws?: number | null
          event_id?: number | null
          finish?: number | null
          id?: number
          losses?: number | null
          notes?: string | null
          player_id?: number | null
          trophy?: boolean | null
          wins?: number | null
        }
        Update: {
          deck_id?: number | null
          draws?: number | null
          event_id?: number | null
          finish?: number | null
          id?: number
          losses?: number | null
          notes?: string | null
          player_id?: number | null
          trophy?: boolean | null
          wins?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "player_event_data_deck_id_fkey"
            columns: ["deck_id"]
            isOneToOne: false
            referencedRelation: "decks"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "player_event_data_event_id_fkey"
            columns: ["event_id"]
            isOneToOne: false
            referencedRelation: "events"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "player_event_data_player_id_fkey"
            columns: ["player_id"]
            isOneToOne: false
            referencedRelation: "players"
            referencedColumns: ["id"]
          },
        ]
      }
      players: {
        Row: {
          favorite_deck_id: number | null
          home_store_id: number | null
          id: number
          league_ok: boolean
          name: string
        }
        Insert: {
          favorite_deck_id?: number | null
          home_store_id?: number | null
          id?: number
          league_ok?: boolean
          name: string
        }
        Update: {
          favorite_deck_id?: number | null
          home_store_id?: number | null
          id?: number
          league_ok?: boolean
          name?: string
        }
        Relationships: [
          {
            foreignKeyName: "players_favorite_deck_id_fkey"
            columns: ["favorite_deck_id"]
            isOneToOne: false
            referencedRelation: "decks"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "players_home_store_id_fkey"
            columns: ["home_store_id"]
            isOneToOne: false
            referencedRelation: "stores"
            referencedColumns: ["id"]
          },
        ]
      }
      stores: {
        Row: {
          id: number
          league_store: boolean | null
          location: string | null
          name: string
          phone: string | null
        }
        Insert: {
          id?: number
          league_store?: boolean | null
          location?: string | null
          name: string
          phone?: string | null
        }
        Update: {
          id?: number
          league_store?: boolean | null
          location?: string | null
          name?: string
          phone?: string | null
        }
        Relationships: []
      }
      weeklies: {
        Row: {
          id: number
          store_id: number | null
          time: string
          weekday: Database["public"]["Enums"]["weekday"]
        }
        Insert: {
          id?: number
          store_id?: number | null
          time: string
          weekday: Database["public"]["Enums"]["weekday"]
        }
        Update: {
          id?: number
          store_id?: number | null
          time?: string
          weekday?: Database["public"]["Enums"]["weekday"]
        }
        Relationships: [
          {
            foreignKeyName: "weeklies_store_id_fkey"
            columns: ["store_id"]
            isOneToOne: false
            referencedRelation: "stores"
            referencedColumns: ["id"]
          },
        ]
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      weekday:
        | "Monday"
        | "Tuesday"
        | "Wednesday"
        | "Thursday"
        | "Friday"
        | "Saturday"
        | "Sunday"
        | "Every other Monday"
        | "Every other Tuesday"
        | "Every other Wednesday"
        | "Every other Thursday"
        | "Every other Friday"
        | "Every other Saturday"
        | "Every other Sunday"
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DatabaseWithoutInternals = Omit<Database, "__InternalSupabase">

type DefaultSchema = DatabaseWithoutInternals[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof DatabaseWithoutInternals },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof DatabaseWithoutInternals },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {
      weekday: [
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday",
        "Saturday",
        "Sunday",
        "Every other Monday",
        "Every other Tuesday",
        "Every other Wednesday",
        "Every other Thursday",
        "Every other Friday",
        "Every other Saturday",
        "Every other Sunday",
      ],
    },
  },
} as const
