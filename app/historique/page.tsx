"use client";

import { useEffect, useState } from "react";
import { supabase, TrackHistory } from "@/lib/supabase";
import { format } from "date-fns";
import { fr } from "date-fns/locale";
import Image from "next/image";

export default function HistoriquePage() {
  const [tracks, setTracks] = useState<TrackHistory[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchHistory() {
      try {
        const { data, error } = await supabase
          .from("tracks_history")
          .select("*")
          .order("start_time", { ascending: false })
          .limit(100);

        if (error) {
          throw error;
        }

        setTracks(data);
      } catch (error) {
        console.error("Erreur lors de la récupération de l'historique:", error);
      } finally {
        setLoading(false);
      }
    }

    fetchHistory();
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-full">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-emerald-500" />
      </div>
    );
  }

  return (
    <div className="flex flex-col h-full">
      <div className="flex flex-col gap-6 p-6">
        <div>
          <h1 className="text-3xl font-bold">Historique</h1>
          <p className="text-sm text-muted-foreground mt-1">
            Consultez votre historique d'écoute
          </p>
        </div>

        <div className="flex items-center gap-4">
          <input
            type="text"
            placeholder="Rechercher dans l'historique..."
            className="flex-1 h-10 px-4 bg-[#282828] rounded-full text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500"
          />
          <select className="h-10 px-4 bg-[#282828] rounded-full text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500">
            <option value="recent">Récent</option>
            <option value="today">Aujourd'hui</option>
            <option value="week">Cette semaine</option>
            <option value="month">Ce mois</option>
          </select>
        </div>
      </div>

      <div className="flex-1 overflow-auto px-6">
        <table className="w-full">
          <thead className="text-sm text-muted-foreground sticky top-0 bg-background z-10">
            <tr className="border-b border-[#282828]">
              <th className="pb-2 font-normal text-left w-12">#</th>
              <th className="pb-2 font-normal text-left">Titre</th>
              <th className="pb-2 font-normal text-left">Artiste</th>
              <th className="pb-2 font-normal text-left">Album</th>
              <th className="pb-2 font-normal text-left">Date d'écoute</th>
              <th className="pb-2 font-normal text-left">Durée d'écoute</th>
              <th className="pb-2 font-normal text-left">Écouté entièrement</th>
            </tr>
          </thead>
          <tbody>
            {tracks.map((track, index) => (
              <tr
                key={track.id}
                className="group hover:bg-[#282828] transition-colors"
              >
                <td className="py-2">
                  <div className="relative h-10 w-10">
                    <Image
                      src={track.cover_image_url}
                      alt={track.album_name}
                      fill
                      className="object-cover rounded"
                    />
                  </div>
                </td>
                <td className="py-2">
                  <a
                    href={track.spotify_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:underline font-medium"
                  >
                    {track.track_name}
                  </a>
                </td>
                <td className="py-2 text-muted-foreground">
                  {track.artist_name}
                </td>
                <td className="py-2 text-muted-foreground">
                  {track.album_name}
                </td>
                <td className="py-2 text-muted-foreground">
                  {format(new Date(track.start_time), "dd MMM yyyy à HH:mm", {
                    locale: fr,
                  })}
                </td>
                <td className="py-2 text-muted-foreground">
                  {Math.floor(track.listening_duration_seconds / 60)}:
                  {String(track.listening_duration_seconds % 60).padStart(
                    2,
                    "0"
                  )}
                </td>
                <td className="py-2">
                  {track.listened_completely ? (
                    <span className="text-emerald-500">Oui</span>
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
  );
}
