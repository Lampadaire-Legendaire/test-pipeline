"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import { format } from "date-fns";
import { fr } from "date-fns/locale";
import { Music, Clock, ArrowLeft, Headphones } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useParams } from "next/navigation";

type TrackHistory = {
  id: number;
  track_name: string;
  artist_name: string;
  album_name: string;
  cover_image_url: string;
  spotify_url: string;
  start_time: string;
  listening_duration_seconds: number;
  listened_completely: boolean;
};

type SessionDetail = {
  id: number;
  start_time: string;
  end_time: string | null;
  duration_seconds: number;
  is_active: boolean;
};

export default function SessionDetailPage() {
  const params = useParams();
  const sessionId = params.id as string;

  const [session, setSession] = useState<SessionDetail | null>(null);
  const [tracks, setTracks] = useState<TrackHistory[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchSessionDetails() {
      try {
        // Récupérer les détails de la session
        const { data: sessionData, error: sessionError } = await supabase
          .from("listening_sessions")
          .select("*")
          .eq("id", sessionId)
          .single();

        if (sessionError) throw sessionError;
        setSession(sessionData);

        // Récupérer toutes les pistes de la session
        const { data: tracksData, error: tracksError } = await supabase
          .from("tracks_history")
          .select("*")
          .eq("session_id", sessionId)
          .order("start_time", { ascending: true });

        if (tracksError) throw tracksError;
        setTracks(tracksData || []);
      } catch (error) {
        console.error(
          "Erreur lors de la récupération des détails de la session:",
          error
        );
      } finally {
        setLoading(false);
      }
    }

    if (sessionId) {
      fetchSessionDetails();
    }
  }, [sessionId]);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-full">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-emerald-500" />
      </div>
    );
  }

  if (!session) {
    return (
      <div className="flex flex-col items-center justify-center h-full p-6">
        <h1 className="text-2xl font-bold mb-4">Session non trouvée</h1>
        <p className="text-muted-foreground mb-6">
          La session que vous recherchez n'existe pas.
        </p>
        <Link href="/sessions">
          <button className="bg-emerald-500 hover:bg-emerald-600 text-black px-4 py-2 rounded-lg text-sm font-medium transition-colors">
            Retour aux sessions
          </button>
        </Link>
      </div>
    );
  }

  function formatDuration(seconds: number): string {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${String(remainingSeconds).padStart(2, "0")}`;
  }

  return (
    <div className="flex flex-col h-full">
      <div className="bg-gradient-to-r from-emerald-500/20 to-blue-500/10 p-6 border-b">
        <div className="flex items-center gap-2 mb-6">
          <Link href="/sessions">
            <button className="bg-black/20 hover:bg-black/30 p-2 rounded-full transition-colors">
              <ArrowLeft className="h-5 w-5" />
            </button>
          </Link>
          <h1 className="text-2xl font-bold">
            Détails de la session #{sessionId}
          </h1>
        </div>

        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="bg-emerald-500 rounded-full p-3">
              <Headphones className="h-6 w-6 text-black" />
            </div>
            <div>
              <div className="text-lg">
                Session du{" "}
                {format(new Date(session.start_time), "d MMMM yyyy", {
                  locale: fr,
                })}
                {session.is_active && (
                  <span className="ml-2 text-xs bg-emerald-500 text-black px-2 py-0.5 rounded-full">
                    Active
                  </span>
                )}
              </div>
              <div className="text-sm text-muted-foreground">
                De{" "}
                {format(new Date(session.start_time), "HH:mm", { locale: fr })}
                {session.end_time &&
                  ` à ${format(new Date(session.end_time), "HH:mm", {
                    locale: fr,
                  })}`}
              </div>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2 bg-black/20 px-4 py-2 rounded-lg">
              <Clock className="h-5 w-5 text-emerald-400" />
              <span>
                {session.duration_seconds
                  ? `${Math.floor(session.duration_seconds / 60)} min ${
                      session.duration_seconds % 60
                    } sec`
                  : "En cours..."}
              </span>
            </div>
            <div className="flex items-center gap-2 bg-black/20 px-4 py-2 rounded-lg">
              <Music className="h-5 w-5 text-emerald-400" />
              <span>{tracks.length} pistes</span>
            </div>
          </div>
        </div>
      </div>

      <div className="flex-1 overflow-auto p-6">
        <div className="bg-card rounded-xl border overflow-hidden">
          <table className="w-full">
            <thead className="bg-muted/50">
              <tr>
                <th className="py-3 px-4 text-left font-medium text-sm">#</th>
                <th className="py-3 px-4 text-left font-medium text-sm">
                  Titre
                </th>
                <th className="py-3 px-4 text-left font-medium text-sm">
                  Artiste
                </th>
                <th className="py-3 px-4 text-left font-medium text-sm">
                  Album
                </th>
                <th className="py-3 px-4 text-left font-medium text-sm">
                  Heure d'écoute
                </th>
                <th className="py-3 px-4 text-left font-medium text-sm">
                  Durée d'écoute
                </th>
                <th className="py-3 px-4 text-left font-medium text-sm">
                  Écouté entièrement
                </th>
              </tr>
            </thead>
            <tbody>
              {tracks.map((track, index) => (
                <tr
                  key={track.id}
                  className="border-t border-muted hover:bg-muted/30 transition-colors"
                >
                  <td className="py-3 px-4">
                    <div className="relative h-10 w-10">
                      <Image
                        src={track.cover_image_url}
                        alt={track.album_name}
                        fill
                        className="object-cover rounded"
                      />
                    </div>
                  </td>
                  <td className="py-3 px-4 font-medium">
                    <a
                      href={track.spotify_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="hover:text-emerald-400 transition-colors"
                    >
                      {track.track_name}
                    </a>
                  </td>
                  <td className="py-3 px-4 text-muted-foreground">
                    {track.artist_name}
                  </td>
                  <td className="py-3 px-4 text-muted-foreground">
                    {track.album_name}
                  </td>
                  <td className="py-3 px-4 text-muted-foreground">
                    {format(new Date(track.start_time), "HH:mm:ss", {
                      locale: fr,
                    })}
                  </td>
                  <td className="py-3 px-4 text-muted-foreground">
                    {formatDuration(track.listening_duration_seconds)}
                  </td>
                  <td className="py-3 px-4">
                    {track.listened_completely ? (
                      <span className="text-emerald-400">Oui</span>
                    ) : (
                      <span className="text-muted-foreground">Non</span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
