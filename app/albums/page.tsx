import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Image from "next/image";
import { Play, Heart, MoreHorizontal, Clock, Music, Filter } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export default function AlbumsPage() {
  return (
    <div className="h-full p-6 space-y-8">
      <header className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Albums</h1>
          <p className="text-muted-foreground">Votre collection d'albums</p>
        </div>
        <div className="flex items-center gap-2">
          <div className="relative w-64">
            <Input placeholder="Rechercher un album..." className="pl-8" />
            <Music className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          </div>
          <Button variant="outline" size="icon">
            <Filter className="h-4 w-4" />
          </Button>
        </div>
      </header>

      <Tabs defaultValue="all" className="w-full">
        <TabsList className="mb-4">
          <TabsTrigger value="all">Tous</TabsTrigger>
          <TabsTrigger value="recent">Récents</TabsTrigger>
          <TabsTrigger value="favorites">Favoris</TabsTrigger>
          <TabsTrigger value="downloaded">Téléchargés</TabsTrigger>
        </TabsList>
        <TabsContent value="all" className="space-y-4">
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
            {albums.map((album) => (
              <AlbumCard key={album.name} album={album} />
            ))}
          </div>
        </TabsContent>
        <TabsContent value="recent" className="space-y-4">
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
            {albums.filter(a => a.isRecent).map((album) => (
              <AlbumCard key={album.name} album={album} />
            ))}
          </div>
        </TabsContent>
        <TabsContent value="favorites" className="space-y-4">
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
            {albums.filter(a => a.isFavorite).map((album) => (
              <AlbumCard key={album.name} album={album} />
            ))}
          </div>
        </TabsContent>
        <TabsContent value="downloaded" className="space-y-4">
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
            {albums.filter(a => a.isDownloaded).map((album) => (
              <AlbumCard key={album.name} album={album} />
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}

interface Album {
  name: string;
  artist: string;
  cover: string;
  releaseYear: string;
  isRecent?: boolean;
  isFavorite?: boolean;
  isDownloaded?: boolean;
}

function AlbumCard({ album }: { album: Album }) {
  return (
    <div className="space-y-3 relative group">
      <div className="overflow-hidden rounded-md aspect-square relative">
        <Image
          src={album.cover}
          alt={album.name}
          fill
          className="object-cover transition-all duration-300 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
          <Button size="icon" variant="secondary" className="rounded-full shadow-lg">
            <Play className="h-4 w-4 text-primary" />
          </Button>
        </div>
        {album.isFavorite && (
          <div className="absolute top-2 right-2">
            <Heart className="h-5 w-5 text-red-500 fill-red-500" />
          </div>
        )}
      </div>
      <div>
        <h3 className="font-medium leading-none truncate">{album.name}</h3>
        <p className="text-xs text-muted-foreground truncate">{album.artist} • {album.releaseYear}</p>
      </div>
    </div>
  );
}

const albums: Album[] = [
  {
    name: "After Hours",
    artist: "The Weeknd",
    cover: "https://images.unsplash.com/photo-1614613535308-eb5fbd3d2c17?q=80&w=300&h=300&auto=format&fit=crop",
    releaseYear: "2020",
    isRecent: true,
    isFavorite: true,
    isDownloaded: true
  },
  {
    name: "Future Nostalgia",
    artist: "Dua Lipa",
    cover: "https://images.unsplash.com/photo-1598387846148-47e82ee120cc?q=80&w=300&h=300&auto=format&fit=crop",
    releaseYear: "2020",
    isRecent: true,
    isFavorite: true
  },
  {
    name: "When We All Fall Asleep",
    artist: "Billie Eilish",
    cover: "https://images.unsplash.com/photo-1598518619673-16bdcb9e9809?q=80&w=300&h=300&auto=format&fit=crop",
    releaseYear: "2019",
    isFavorite: true,
    isDownloaded: true
  },
  {
    name: "Certified Lover Boy",
    artist: "Drake",
    cover: "https://images.unsplash.com/photo-1605722243979-fe0be8158232?q=80&w=300&h=300&auto=format&fit=crop",
    releaseYear: "2021",
    isRecent: true
  },
  {
    name: "Positions",
    artist: "Ariana Grande",
    cover: "https://images.unsplash.com/photo-1598518619776-89875e614244?q=80&w=300&h=300&auto=format&fit=crop",
    releaseYear: "2020",
    isDownloaded: true
  },
  {
    name: "Justice",
    artist: "Justin Bieber",
    cover: "https://images.unsplash.com/photo-1598518619669-07c0d4ae9c07?q=80&w=300&h=300&auto=format&fit=crop",
    releaseYear: "2021",
    isRecent: true
  },
  {
    name: "Folklore",
    artist: "Taylor Swift",
    cover: "https://images.unsplash.com/photo-1598518619771-c0f7b1d6f18a?q=80&w=300&h=300&auto=format&fit=crop",
    releaseYear: "2020",
    isFavorite: true
  },
  {
    name: "Planet Her",
    artist: "Doja Cat",
    cover: "https://images.unsplash.com/photo-1598518619673-16bdcb9e9809?q=80&w=300&h=300&auto=format&fit=crop",
    releaseYear: "2021",
    isRecent: true,
    isDownloaded: true
  },
  {
    name: "Fine Line",
    artist: "Harry Styles",
    cover: "https://images.unsplash.com/photo-1605722243979-fe0be8158232?q=80&w=300&h=300&auto=format&fit=crop",
    releaseYear: "2019",
    isFavorite: true
  },
  {
    name: "Chromatica",
    artist: "Lady Gaga",
    cover: "https://images.unsplash.com/photo-1598518619776-89875e614244?q=80&w=300&h=300&auto=format&fit=crop",
    releaseYear: "2020",
    isDownloaded: true
  }
];