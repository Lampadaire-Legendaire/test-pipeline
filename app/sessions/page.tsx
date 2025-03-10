"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import { format } from "date-fns";
import { fr } from "date-fns/locale";
import {
  Music,
  Clock,
  Headphones,
  User,
  Disc,
  BarChart2,
  Calendar,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";

type TrackHistory = {
  id: number;
  track_name: string;
  artist_name: string;
  album_name: string;
  cover_image_url: string;
  genres: string[];
};

type SessionStats = {
  topArtists: { name: string; count: number }[];
  topGenres: { name: string; count: number }[];
  completionRate: number;
};

type ListeningSession = {
  id: number;
  start_time: string;
  end_time: string | null;
  duration_seconds: number;
  track_ids: string[];
  is_active: boolean;
  track_count?: number;
  tracks?: TrackHistory[];
  stats?: SessionStats;
};

export default function SessionsPage() {
  const [sessions, setSessions] = useState<ListeningSession[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchSessions() {
      try {
        // Récupérer les sessions
        const { data: sessionsData, error: sessionsError } = await supabase
          .from("listening_sessions")
          .select("*")
          .order("start_time", { ascending: false });

        if (sessionsError) throw sessionsError;

        // Pour chaque session, récupérer des informations supplémentaires
        const enhancedSessions = await Promise.all(
          sessionsData.map(async (session) => {
            // Compter le nombre de pistes
            const { count, error: countError } = await supabase
              .from("tracks_history")
              .select("*", { count: "exact", head: true })
              .eq("session_id", session.id);

            // Récupérer un échantillon de pistes pour cette session
            const { data: tracksData, error: tracksError } = await supabase
              .from("tracks_history")
              .select(
                "id, track_name, artist_name, album_name, cover_image_url, genres"
              )
              .eq("session_id", session.id)
              .limit(3);

            if (tracksError)
              console.error(
                "Erreur lors de la récupération des pistes:",
                tracksError
              );

            // Calculer des statistiques pour cette session
            const { data: allTracks, error: allTracksError } = await supabase
              .from("tracks_history")
              .select("artist_name, genres, listened_completely")
              .eq("session_id", session.id);

            let stats: SessionStats = {
              topArtists: [],
              topGenres: [],
              completionRate: 0,
            };

            if (!allTracksError && allTracks) {
              // Top artistes
              const artistCounts: Record<string, number> = {};
              allTracks.forEach((track) => {
                artistCounts[track.artist_name] =
                  (artistCounts[track.artist_name] || 0) + 1;
              });

              stats.topArtists = Object.entries(artistCounts)
                .map(([name, count]) => ({ name, count }))
                .sort((a, b) => b.count - a.count)
                .slice(0, 3);

              // Top genres
              const genreCounts: Record<string, number> = {};
              allTracks.forEach((track) => {
                if (Array.isArray(track.genres)) {
                  track.genres.forEach((genre) => {
                    genreCounts[genre] = (genreCounts[genre] || 0) + 1;
                  });
                }
              });

              stats.topGenres = Object.entries(genreCounts)
                .map(([name, count]) => ({ name, count }))
                .sort((a, b) => b.count - a.count)
                .slice(0, 3);

              // Taux de complétion
              const completedTracks = allTracks.filter(
                (track) => track.listened_completely
              ).length;
              stats.completionRate =
                allTracks.length > 0
                  ? Math.round((completedTracks / allTracks.length) * 100)
                  : 0;
            }

            return {
              ...session,
              track_count: count || 0,
              tracks: tracksData || [],
              stats,
            };
          })
        );

        setSessions(enhancedSessions);
      } catch (error) {
        console.error("Erreur lors de la récupération des sessions:", error);
      } finally {
        setLoading(false);
      }
    }

    fetchSessions();
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-full">
        <div className="animate-spin rounded-full h-10 w-10 border-4 border-emerald-500 border-t-transparent" />
      </div>
    );
  }

  function formatSessionDuration(seconds: number): string {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const remainingSeconds = seconds % 60;

    if (hours > 0) {
      return `${hours}h ${minutes}m ${remainingSeconds}s`;
    } else {
      return `${minutes}m ${remainingSeconds}s`;
    }
  }

  // Fonction pour obtenir une couleur de fond basée sur l'ID de session
  function getSessionColor(sessionId: number) {
    const colors = [
      "from-emerald-600/20 to-blue-600/10",
      "from-purple-600/20 to-pink-600/10",
      "from-amber-600/20 to-red-600/10",
      "from-blue-600/20 to-indigo-600/10",
      "from-teal-600/20 to-cyan-600/10",
    ];
    return colors[sessionId % colors.length];
  }

  return (
    <div className="p-8 max-w-7xl mx-auto">
      <div className="mb-10">
        <h1 className="text-4xl font-bold mb-3 text-white">
          Sessions d'écoute
        </h1>
        <p className="text-lg text-gray-300">
          Consultez l'historique détaillé de vos sessions d'écoute Spotify
        </p>
      </div>

      <div className="space-y-12">
        {sessions.map((session) => (
          <div
            key={session.id}
            className={`bg-gradient-to-br ${getSessionColor(
              session.id
            )} rounded-2xl border-2 border-white/10 shadow-xl overflow-hidden hover:shadow-2xl transition-shadow duration-300`}
          >
            {/* En-tête de la session */}
            <div className="bg-black/30 p-6 border-b border-white/10">
              <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                <div className="flex items-center gap-4">
                  <div className="bg-emerald-500 rounded-full p-3 flex-shrink-0 shadow-lg">
                    <Headphones className="h-6 w-6 text-black" />
                  </div>
                  <div>
                    <div className="text-2xl font-bold flex items-center gap-2 text-white">
                      Session #{session.id}
                      {session.is_active && (
                        <span className="ml-2 text-xs bg-emerald-500 text-black px-3 py-1 rounded-full font-bold">
                          ACTIVE
                        </span>
                      )}
                    </div>
                    <div className="flex items-center gap-2 text-gray-300 mt-1">
                      <Calendar className="h-4 w-4" />
                      {format(
                        new Date(session.start_time),
                        "d MMMM yyyy à HH:mm",
                        { locale: fr }
                      )}
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-4 text-base">
                  <div className="flex items-center gap-3 bg-black/40 px-4 py-2 rounded-lg border border-white/10">
                    <Clock className="h-5 w-5 text-emerald-400" />
                    <div>
                      <span className="font-bold text-white">
                        {session.duration_seconds
                          ? formatSessionDuration(session.duration_seconds)
                          : "En cours..."}
                      </span>
                      <div className="text-xs text-gray-400">Durée totale</div>
                    </div>
                  </div>

                  <div className="flex items-center gap-3 bg-black/40 px-4 py-2 rounded-lg border border-white/10">
                    <Music className="h-5 w-5 text-emerald-400" />
                    <div>
                      <span className="font-bold text-white">
                        {session.track_count}
                      </span>
                      <div className="text-xs text-gray-400">
                        Pistes écoutées
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Contenu de la session */}
            <div className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {/* Statistiques de la session */}
                <div className="bg-black/30 rounded-xl p-5 border border-white/10 shadow-inner">
                  <h3 className="text-lg font-bold flex items-center gap-2 mb-4 pb-2 border-b border-white/10 text-white">
                    <BarChart2 className="h-5 w-5 text-emerald-400" />
                    Statistiques
                  </h3>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="bg-black/40 p-4 rounded-lg border border-white/5">
                      <div className="text-sm text-gray-400 mb-1">
                        Taux de complétion
                      </div>
                      <div className="text-2xl font-bold text-emerald-400">
                        {session.stats?.completionRate}%
                      </div>
                    </div>

                    <div className="bg-black/40 p-4 rounded-lg border border-white/5">
                      <div className="text-sm text-gray-400 mb-1">
                        Durée moyenne
                      </div>
                      <div className="text-2xl font-bold text-emerald-400">
                        {session.track_count && session.duration_seconds
                          ? Math.round(
                              session.duration_seconds /
                                session.track_count /
                                60
                            ) + "m"
                          : "-"}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Top artistes */}
                <div className="bg-black/30 rounded-xl p-5 border border-white/10 shadow-inner">
                  <h3 className="text-lg font-bold flex items-center gap-2 mb-4 pb-2 border-b border-white/10 text-white">
                    <User className="h-5 w-5 text-emerald-400" />
                    Top artistes
                  </h3>

                  <div className="space-y-3">
                    {session.stats?.topArtists.map((artist, index) => (
                      <div
                        key={index}
                        className="flex justify-between items-center bg-black/40 p-3 rounded-lg border border-white/5"
                      >
                        <div className="font-medium text-white">
                          {artist.name}
                        </div>
                        <div className="text-xs bg-emerald-500/30 text-emerald-300 px-2 py-1 rounded-full font-bold">
                          {artist.count} pistes
                        </div>
                      </div>
                    ))}

                    {(!session.stats?.topArtists ||
                      session.stats.topArtists.length === 0) && (
                      <div className="text-base text-gray-400 bg-black/20 p-4 rounded-lg text-center">
                        Aucune donnée disponible
                      </div>
                    )}
                  </div>
                </div>

                {/* Top genres */}
                <div className="bg-black/30 rounded-xl p-5 border border-white/10 shadow-inner">
                  <h3 className="text-lg font-bold flex items-center gap-2 mb-4 pb-2 border-b border-white/10 text-white">
                    <Disc className="h-5 w-5 text-emerald-400" />
                    Top genres
                  </h3>

                  <div className="space-y-3">
                    {session.stats?.topGenres.map((genre, index) => (
                      <div
                        key={index}
                        className="flex justify-between items-center bg-black/40 p-3 rounded-lg border border-white/5"
                      >
                        <div className="font-medium text-white capitalize">
                          {genre.name}
                        </div>
                        <div className="text-xs bg-emerald-500/30 text-emerald-300 px-2 py-1 rounded-full font-bold">
                          {genre.count} pistes
                        </div>
                      </div>
                    ))}

                    {(!session.stats?.topGenres ||
                      session.stats.topGenres.length === 0) && (
                      <div className="text-base text-gray-400 bg-black/20 p-4 rounded-lg text-center">
                        Aucune donnée disponible
                      </div>
                    )}
                  </div>
                </div>
              </div>

              {/* Aperçu des pistes */}
              <div className="mt-6 bg-black/30 rounded-xl p-5 border border-white/10 shadow-inner">
                <h3 className="text-lg font-bold flex items-center gap-2 mb-4 pb-2 border-b border-white/10 text-white">
                  <Music className="h-5 w-5 text-emerald-400" />
                  Aperçu des pistes
                </h3>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {session.tracks &&
                    session.tracks.map((track) => (
                      <div
                        key={track.id}
                        className="flex items-center gap-4 bg-black/40 p-4 rounded-lg border border-white/5 hover:bg-black/50 transition-colors"
                      >
                        <div className="relative h-16 w-16 flex-shrink-0 rounded-md overflow-hidden shadow-md">
                          <Image
                            src={track.cover_image_url}
                            alt={track.album_name}
                            fill
                            className="object-cover"
                          />
                        </div>
                        <div className="min-w-0">
                          <div className="font-bold truncate text-white">
                            {track.track_name}
                          </div>
                          <div className="text-sm text-gray-300 truncate">
                            {track.artist_name}
                          </div>
                          <div className="text-xs text-gray-400 truncate">
                            {track.album_name}
                          </div>
                        </div>
                      </div>
                    ))}

                  {(!session.tracks || session.tracks.length === 0) && (
                    <div className="text-base text-gray-400 bg-black/20 p-4 rounded-lg text-center col-span-3">
                      Aucune piste disponible
                    </div>
                  )}
                </div>

                {session.track_count && session.track_count > 3 && (
                  <div className="mt-6 text-center">
                    <Link href={`/sessions/${session.id}`}>
                      <button className="bg-emerald-500 hover:bg-emerald-600 text-black px-6 py-3 rounded-lg text-base font-bold transition-colors shadow-lg">
                        Voir toutes les {session.track_count} pistes
                      </button>
                    </Link>
                  </div>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
