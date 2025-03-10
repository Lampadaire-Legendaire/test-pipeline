import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Image from "next/image";
import { Play, Heart, MoreHorizontal, Clock, Music, Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export default function ArtistesPage() {
  return (
    <div className="h-full p-6 space-y-8">
      <header className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Artistes</h1>
          <p className="text-muted-foreground">Vos artistes préférés</p>
        </div>
        <div className="flex items-center gap-2">
          <div className="relative w-64">
            <Input placeholder="Rechercher un artiste..." className="pl-8" />
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          </div>
        </div>
      </header>

      <Tabs defaultValue="all" className="w-full">
        <TabsList className="mb-4">
          <TabsTrigger value="all">Tous</TabsTrigger>
          <TabsTrigger value="followed">Suivis</TabsTrigger>
          <TabsTrigger value="popular">Populaires</TabsTrigger>
          <TabsTrigger value="genres">Par genre</TabsTrigger>
        </TabsList>
        <TabsContent value="all" className="space-y-4">
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
            {artists.map((artist) => (
              <ArtistCard key={artist.name} artist={artist} />
            ))}
          </div>
        </TabsContent>
        <TabsContent value="followed" className="space-y-4">
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
            {artists.filter(a => a.isFollowed).map((artist) => (
              <ArtistCard key={artist.name} artist={artist} />
            ))}
          </div>
        </TabsContent>
        <TabsContent value="popular" className="space-y-4">
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
            {artists.filter(a => a.isPopular).map((artist) => (
              <ArtistCard key={artist.name} artist={artist} />
            ))}
          </div>
        </TabsContent>
        <TabsContent value="genres" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {genres.map((genre) => (
              <Card key={genre.name} className="overflow-hidden">
                <CardHeader className="pb-2">
                  <CardTitle>{genre.name}</CardTitle>
                  <CardDescription>{genre.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-wrap gap-2">
                    {genre.artists.map((artistName) => {
                      const artist = artists.find(a => a.name === artistName);
                      return artist ? (
                        <div key={artist.name} className="flex items-center gap-2 bg-accent/50 rounded-full px-3 py-1">
                          <div className="w-6 h-6 rounded-full overflow-hidden relative">
                            <Image
                              src={artist.image}
                              alt={artist.name}
                              fill
                              className="object-cover"
                            />
                          </div>
                          <span className="text-sm">{artist.name}</span>
                        </div>
                      ) : null;
                    })}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}

interface Artist {
  name: string;
  image: string;
  followers: string;
  isFollowed?: boolean;
  isPopular?: boolean;
  genres?: string[];
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
        <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
          <Button size="icon" variant="secondary" className="rounded-full shadow-lg">
            <Play className="h-4 w-4 text-primary" />
          </Button>
        </div>
        {artist.isFollowed && (
          <div className="absolute bottom-1 right-1 bg-emerald-500 rounded-full w-4 h-4 flex items-center justify-center">
            <Heart className="h-2 w-2 text-white fill-white" />
          </div>
        )}
      </div>
      <div>
        <h3 className="font-medium leading-none">{artist.name}</h3>
        <p className="text-xs text-muted-foreground mt-1">{artist.followers} abonnés</p>
        {artist.genres && (
          <p className="text-xs text-muted-foreground mt-1">{artist.genres.join(", ")}</p>
        )}
      </div>
    </div>
  );
}

const artists: Artist[] = [
  {
    name: "The Weeknd",
    image: "https://images.unsplash.com/photo-1529068755536-a5ade0dcb4e8?q=80&w=150&h=150&auto=format&fit=crop",
    followers: "45,6M",
    isFollowed: true,
    isPopular: true,
    genres: ["Pop", "R&B"]
  },
  {
    name: "Dua Lipa",
    image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=150&h=150&auto=format&fit=crop",
    followers: "32,1M",
    isFollowed: true,
    isPopular: true,
    genres: ["Pop"]
  },
  {
    name: "Billie Eilish",
    image: "https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e?q=80&w=150&h=150&auto=format&fit=crop",
    followers: "38,7M",
    isFollowed: true,
    isPopular: true,
    genres: ["Pop", "Alternative"]
  },
  {
    name: "Drake",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=150&h=150&auto=format&fit=crop",
    followers: "50,2M",
    isPopular: true,
    genres: ["Hip-Hop", "Rap"]
  },
  {
    name: "Ariana Grande",
    image: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=150&h=150&auto=format&fit=crop",
    followers: "42,9M",
    isFollowed: true,
    isPopular: true,
    genres: ["Pop", "R&B"]
  },
  {
    name: "Taylor Swift",
    image: "https://images.unsplash.com/photo-1535324492437-d8dea70a38a7?q=80&w=150&h=150&auto=format&fit=crop",
    followers: "48,3M",
    isFollowed: true,
    isPopular: true,
    genres: ["Pop", "Country"]
  },
  {
    name: "Kendrick Lamar",
    image: "https://images.unsplash.com/photo-1531384441138-2736e62e0919?q=80&w=150&h=150&auto=format&fit=crop",
    followers: "28,7M",
    genres: ["Hip-Hop", "Rap"]
  },
  {
    name: "Doja Cat",
    image: "https://images.unsplash.com/photo-1534751516642-a1af1ef26a56?q=80&w=150&h=150&auto=format&fit=crop",
    followers: "25,4M",
    isPopular: true,
    genres: ["Pop", "Hip-Hop"]
  },
  {
    name: "Bad Bunny",
    image: "https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?q=80&w=150&h=150&auto=format&fit=crop",
    followers: "39,8M",
    isPopular: true,
    genres: ["Reggaeton", "Latin"]
  },
  {
    name: "Harry Styles",
    image: "https://images.unsplash.com/photo-1552374196-c4e7ffc6e126?q=80&w=150&h=150&auto=format&fit=crop",
    followers: "35,2M",
    isFollowed: true,
    genres: ["Pop", "Rock"]
  }
];

const genres = [
  {
    name: "Pop",
    description: "Les artistes pop les plus populaires",
    artists: ["Dua Lipa", "Taylor Swift", "Ariana Grande", "Harry Styles"]
  },
  {
    name: "Hip-Hop & Rap",
    description: "Les meilleurs rappeurs et artistes hip-hop",
    artists: ["Drake", "Kendrick Lamar", "Doja Cat"]
  },
  {
    name: "R&B",
    description: "Le meilleur du R&B contemporain",
    artists: ["The Weeknd", "Ariana Grande"]
  },
  {
    name: "Alternative",
    description: "Artistes alternatifs et indie",
    artists: ["Billie Eilish"]
  }
];