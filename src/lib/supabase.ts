import { createClient } from "@supabase/supabase-js";

export type Guest = {
  id: string;
  first_name: string;
  last_name: string;
  email: string | null;
  attending: boolean | null;
  needs_accommodation: boolean;
  accommodation_notes: string | null;
  dietary_notes: string | null;
  travel_notes: string | null;
  song_request: string | null;
  payment_status: "not_needed" | "pending" | "paid";
  payment_amount: number | null;
  created_at: string;
};

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL?.trim();
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY?.trim();

const isPlaceholder = (value?: string) =>
  !value || value.includes("your-project") || value.includes("your-public-anon-key");

export const isSupabaseConfigured =
  !isPlaceholder(supabaseUrl) && !isPlaceholder(supabaseAnonKey);

export const supabase = isSupabaseConfigured
  ? createClient(supabaseUrl, supabaseAnonKey)
  : null;
