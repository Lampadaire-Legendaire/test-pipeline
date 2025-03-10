import { createClient } from "@supabase/supabase-js";

const supabaseUrl = "https://fjxhsmpkebdpnmgciaix.supabase.co";
const supabaseKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImZqeGhzbXBrZWJkcG5tZ2NpYWl4Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDA2ODA3NzEsImV4cCI6MjA1NjI1Njc3MX0.DFzxX45J39Ff1SWTAv7ttLCxOy4ZyWMhEX-_c_do_VY";

export const supabase = createClient(supabaseUrl, supabaseKey);

export type TrackHistory = {
  id: number;
  session_id: number;
  track_id: string;
  track_name: string;
  artist_id: string;
  artist_name: string;
  album_id: string;
  album_name: string;
  start_time: string;
  duration_ms: number;
  listening_duration_seconds: number;
  listened_completely: boolean;
  spotify_url: string;
  track_start_position: number;
  cover_image_url: string;
  genres: string[];
};
