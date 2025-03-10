import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Image from "next/image";
import { Play, Heart, MoreHorizontal, Clock, Music, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function PlaylistsPage() {
  return (
    <div className="h-full p-6 space-y-8">
      <header className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Playlists</h1>
          <p className="text-muted-foreground">Vos playlists personnalisées et recommandées</p>
        </div>
        <div className="flex items-center gap-2">
          <Button>
            <Plus className="mr-2 h-4 w-4" />
            Créer une playlist
          </Button>
        </div>
      </header>

      <Tabs defaultValue="all" className="w-full">
        <TabsList className="mb-4">
          <TabsTrigger value="all">Toutes</TabsTrigger>
          <TabsTrigger value="created">Créées</TabsTrigger>
          <TabsTrigger value="saved">Enregistrées</TabsTrigger>
          <TabsTrigger value="suggested">Suggérées</TabsTrigger>
        </TabsList>
        <TabsContent value="all" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {playlists.map((playlist) => (
              <PlaylistCard key={playlist.name} playlist={playlist} />
            ))}
          </div>
        </TabsContent>
        <TabsContent value="created" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {playlists.filter(p => p.type === "created").map((playlist) => (
              <PlaylistCard key={playlist.name} playlist={playlist} />
            ))}
          </div>
        </TabsContent>
        <TabsContent value="saved" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {playlists.filter(p => p.type === "saved").map((playlist) => (
              <PlaylistCard key={playlist.name} playlist={playlist} />
            ))}
          </div>
        </TabsContent>
        <TabsContent value="suggested" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {playlists.filter(p => p.type === "suggested").map((playlist) => (
              <PlaylistCard key={playlist.name} playlist={playlist} />
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}

interface Playlist {
  name: string;
  description: string;
  cover: string;
  songCount: number;
  type: "created" | "saved" | "suggested";
}

function PlaylistCard({ playlist }: { playlist: Playlist }) {
  return (
    <Card className="overflow-hidden group">
      <div className="flex gap-4 p-4">
        <div className="w-16 h-16 rounded overflow-hidden flex-shrink-0 relative">
          <Image
            src={playlist.cover}
            alt={playlist.name}
            fill
            className="object-cover"
          />
        </div>
        <div className="flex-1 min-w-0">
          <h3 className="font-semibold truncate">{playlist.name}</h3>
          <p className="text-sm text-muted-foreground truncate">{playlist.description}</p>
          <p className="text-xs text-muted-foreground mt-1">{playlist.songCount} titres</p>
        </div>
        <div className="opacity-0 group-hover:opacity-100 transition-opacity">
          <Button size="icon" variant="ghost" className="rounded-full">
            <Play className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </Card>
  );
}

const playlists: Playlist[] = [
  {
    name: "Chill Vibes",
    description: "Détendez-vous avec ces morceaux relaxants",
    cover: "https://images.unsplash.com/photo-1494232410401-ad00d5433cfa?q=80&w=150&h=150&auto=format&fit=crop",
    songCount: 42,
    type: "created"
  },
  {
    name: "Workout Mix",
    description: "Boostez votre énergie pendant l'entraînement",
    cover: "https://images.unsplash.com/photo-1583454110551-21f2fa2afe61?q=80&w=150&h=150&auto=format&fit=crop",
    songCount: 28,
    type: "created"
  },
  {
    name: "Road Trip",
    description: "La playlist parfaite pour la route",
    cover: "https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?q=80&w=150&h=150&auto=format&fit=crop",
    songCount: 36,
    type: "saved"
  },
  {
    name: "Années 80",
    description: "Les meilleurs hits des années 80",
    cover: "https://images.unsplash.com/photo-1558584673-c834fb1cc3ca?q=80&w=150&h=150&auto=format&fit=crop",
    songCount: 50,
    type: "saved"
  },
  {
    name: "Jazz Lounge",
    description: "Jazz classique et contemporain",
    cover: "https://images.unsplash.com/photo-1415201364774-f6f0bb35f28f?q=80&w=150&h=150&auto=format&fit=crop",
    songCount: 32,
    type: "suggested"
  },
  {
    name: "Découvertes de la semaine",
    description: "Nouveaux artistes et titres à découvrir",
    cover: "https://images.unsplash.com/photo-1511379938547-c1f69419868d?q=80&w=150&h=150&auto=format&fit=crop",
    songCount: 25,
    type: "suggested"
  },
  {
    name: "Soirée dansante",
    description: "Les meilleurs hits pour faire la fête",
    cover: "https://images.unsplash.com/photo-1429962714451-bb934ecdc4ec?q=80&w=150&h=150&auto=format&fit=crop",
    songCount: 45,
    type: "created"
  },
  {
    name: "Musique classique",
    description: "Les plus grands compositeurs classiques",
    cover: "https://images.unsplash.com/photo-1507838153414-b4b713384a76?q=80&w=150&h=150&auto=format&fit=crop",
    songCount: 38,
    type: "saved"
  },
  {
    name: "Hip-Hop Essentials",
    description: "Le meilleur du hip-hop d'hier et d'aujourd'hui",
    cover: "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?q=80&w=150&h=150&auto=format&fit=crop",
    songCount: 56,
    type: "suggested"
  }
];