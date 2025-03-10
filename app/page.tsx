import { Card } from "@/components/ui/card";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Image from "next/image";
import { Play, Heart } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function Home() {
  return (
    <div className="h-full p-6 space-y-8">
      <header className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Bonjour</h1>
          <p className="text-muted-foreground">
            Bienvenue sur votre dashboard musical
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm">
            Mettre à jour
          </Button>
        </div>
      </header>

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold tracking-tight">
          Écoutés récemment
        </h2>
        <div className="relative">
          <ScrollArea>
            <div className="flex space-x-4 pb-4">
              {recentlyPlayed.map((album) => (
                <AlbumCard key={album.name} album={album} />
              ))}
            </div>
            <ScrollBar orientation="horizontal" />
          </ScrollArea>
        </div>
      </section>

      <section>
        <Tabs defaultValue="playlists" className="w-full">
          <TabsList className="mb-4">
            <TabsTrigger value="playlists">Playlists</TabsTrigger>
            <TabsTrigger value="artists">Artistes</TabsTrigger>
            <TabsTrigger value="albums">Albums</TabsTrigger>
          </TabsList>
          <TabsContent value="playlists" className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {playlists.map((playlist) => (
                <PlaylistCard key={playlist.name} playlist={playlist} />
              ))}
            </div>
          </TabsContent>
          <TabsContent value="artists" className="space-y-4">
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
              {artists.map((artist) => (
                <ArtistCard key={artist.name} artist={artist} />
              ))}
            </div>
          </TabsContent>
          <TabsContent value="albums" className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {albums.map((album) => (
                <AlbumListCard key={album.name} album={album} />
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </section>
    </div>
  );
}

interface Album {
  name: string;
  artist: string;
  cover: string;
}

interface Playlist {
  name: string;
  description: string;
  cover: string;
  songCount: number;
}

interface Artist {
  name: string;
  image: string;
  followers: string;
}

function AlbumCard({ album }: { album: Album }) {
  return (
    <div className="w-[150px] space-y-3 relative group">
      <div className="overflow-hidden rounded-md aspect-square relative">
        <Image
          src={album.cover}
          alt={album.name}
          fill
          className="object-cover transition-all duration-300 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
          <Button
            size="icon"
            variant="secondary"
            className="rounded-full shadow-lg"
          >
            <Play className="h-4 w-4 text-primary" />
          </Button>
        </div>
      </div>
      <div>
        <h3 className="font-medium leading-none truncate">{album.name}</h3>
        <p className="text-xs text-muted-foreground truncate">{album.artist}</p>
      </div>
    </div>
  );
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
          <p className="text-sm text-muted-foreground truncate">
            {playlist.description}
          </p>
          <p className="text-xs text-muted-foreground mt-1">
            {playlist.songCount} titres
          </p>
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

function ArtistCard({ artist }: { artist: Artist }) {
  return (
    <div className="space-y-3 text-center group">
      <div className="overflow-hidden rounded-full aspect-square relative mx-auto w-full max-w-[120px]">
        <Image
          src={artist.image}
          alt={artist.name}
          fill
          className="object-cover transition-all duration-300 group-hover:scale-105"
        />
      </div>
      <div>
        <h3 className="font-medium leading-none">{artist.name}</h3>
        <p className="text-xs text-muted-foreground mt-1">
          {artist.followers} abonnés
        </p>
      </div>
    </div>
  );
}

function AlbumListCard({ album }: { album: Album }) {
  return (
    <Card className="overflow-hidden group">
      <div className="flex gap-4 p-4">
        <div className="w-16 h-16 rounded overflow-hidden flex-shrink-0 relative">
          <Image
            src={album.cover}
            alt={album.name}
            fill
            className="object-cover"
          />
        </div>
        <div className="flex-1 min-w-0">
          <h3 className="font-semibold truncate">{album.name}</h3>
          <p className="text-sm text-muted-foreground truncate">
            Album • {album.artist}
          </p>
        </div>
        <div className="opacity-0 group-hover:opacity-100 transition-opacity flex items-center gap-1">
          <Button size="icon" variant="ghost" className="h-8 w-8 rounded-full">
            <Heart className="h-4 w-4" />
          </Button>
          <Button size="icon" variant="ghost" className="h-8 w-8 rounded-full">
            <Play className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </Card>
  );
}

const recentlyPlayed: Album[] = [
  {
    name: "After Hours",
    artist: "The Weeknd",
    cover:
      "https://images.unsplash.com/photo-1614613535308-eb5fbd3d2c17?q=80&w=300&h=300&auto=format&fit=crop",
  },
  {
    name: "Future Nostalgia",
    artist: "Dua Lipa",
    cover:
      "https://images.unsplash.com/photo-1598387846148-47e82ee120cc?q=80&w=300&h=300&auto=format&fit=crop",
  },
  {
    name: "Chromatica",
    artist: "Lady Gaga",
    cover:
      "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?q=80&w=300&h=300&auto=format&fit=crop",
  },
  {
    name: "Fine Line",
    artist: "Harry Styles",
    cover:
      "https://images.unsplash.com/photo-1605722243979-fe0be8158232?q=80&w=300&h=300&auto=format&fit=crop",
  },
  {
    name: "Folklore",
    artist: "Taylor Swift",
    cover:
      "https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?q=80&w=300&h=300&auto=format&fit=crop",
  },
  {
    name: "Planet Her",
    artist: "Doja Cat",
    cover:
      "https://images.unsplash.com/photo-1514525253161-7a46d19cd819?q=80&w=300&h=300&auto=format&fit=crop",
  },
  {
    name: "Justice",
    artist: "Justin Bieber",
    cover:
      "https://images.unsplash.com/photo-1504898770365-14faca6a7320?q=80&w=300&h=300&auto=format&fit=crop",
  },
];

const playlists: Playlist[] = [
  {
    name: "Chill Vibes",
    description: "Détendez-vous avec ces morceaux relaxants",
    cover:
      "https://images.unsplash.com/photo-1494232410401-ad00d5433cfa?q=80&w=150&h=150&auto=format&fit=crop",
    songCount: 42,
  },
  {
    name: "Workout Mix",
    description: "Boostez votre énergie pendant l'entraînement",
    cover:
      "https://images.unsplash.com/photo-1583454110551-21f2fa2afe61?q=80&w=150&h=150&auto=format&fit=crop",
    songCount: 28,
  },
  {
    name: "Road Trip",
    description: "La playlist parfaite pour la route",
    cover:
      "https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?q=80&w=150&h=150&auto=format&fit=crop",
    songCount: 36,
  },
  {
    name: "Années 80",
    description: "Les meilleurs hits des années 80",
    cover:
      "https://images.unsplash.com/photo-1558584673-c834fb1cc3ca?q=80&w=150&h=150&auto=format&fit=crop",
    songCount: 50,
  },
  {
    name: "Jazz Lounge",
    description: "Jazz classique et contemporain",
    cover:
      "https://images.unsplash.com/photo-1415201364774-f6f0bb35f28f?q=80&w=150&h=150&auto=format&fit=crop",
    songCount: 32,
  },
  {
    name: "Découvertes de la semaine",
    description: "Nouveaux artistes et titres à découvrir",
    cover:
      "https://images.unsplash.com/photo-1511379938547-c1f69419868d?q=80&w=150&h=150&auto=format&fit=crop",
    songCount: 25,
  },
];

const artists: Artist[] = [
  {
    name: "The Weeknd",
    image:
      "https://images.unsplash.com/photo-1529068755536-a5ade0dcb4e8?q=80&w=150&h=150&auto=format&fit=crop",
    followers: "45,6M",
  },
  {
    name: "Dua Lipa",
    image:
      "https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=150&h=150&auto=format&fit=crop",
    followers: "32,1M",
  },
  {
    name: "Billie Eilish",
    image:
      "https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e?q=80&w=150&h=150&auto=format&fit=crop",
    followers: "38,7M",
  },
  {
    name: "Drake",
    image:
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=150&h=150&auto=format&fit=crop",
    followers: "50,2M",
  },
  {
    name: "Ariana Grande",
    image:
      "https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=150&h=150&auto=format&fit=crop",
    followers: "42,9M",
  },
];

const albums: Album[] = [
  {
    name: "After Hours",
    artist: "The Weeknd",
    cover:
      "https://images.unsplash.com/photo-1614613535308-eb5fbd3d2c17?q=80&w=150&h=150&auto=format&fit=crop",
  },
  {
    name: "Future Nostalgia",
    artist: "Dua Lipa",
    cover:
      "https://images.unsplash.com/photo-1598387846148-47e82ee120cc?q=80&w=150&h=150&auto=format&fit=crop",
  },
  {
    name: "When We All Fall Asleep",
    artist: "Billie Eilish",
    cover:
      "https://images.unsplash.com/photo-1598518619673-16bdcb9e9809?q=80&w=150&h=150&auto=format&fit=crop",
  },
  {
    name: "Certified Lover Boy",
    artist: "Drake",
    cover:
      "https://images.unsplash.com/photo-1605722243979-fe0be8158232?q=80&w=150&h=150&auto=format&fit=crop",
  },
  {
    name: "Positions",
    artist: "Ariana Grande",
    cover:
      "https://images.unsplash.com/photo-1598518619776-89875e614244?q=80&w=150&h=150&auto=format&fit=crop",
  },
  {
    name: "Justice",
    artist: "Justin Bieber",
    cover:
      "https://images.unsplash.com/photo-1598518619669-07c0d4ae9c07?q=80&w=150&h=150&auto=format&fit=crop",
  },
];
