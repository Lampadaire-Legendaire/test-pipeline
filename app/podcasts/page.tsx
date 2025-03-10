import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Image from "next/image";
import { Play, Bookmark, Clock, Mic, Search, Star, Calendar } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export default function PodcastsPage() {
  return (
    <div className="h-full p-6 space-y-8">
      <header className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Podcasts</h1>
          <p className="text-muted-foreground">Découvrez et écoutez des podcasts</p>
        </div>
        <div className="flex items-center gap-2">
          <div className="relative w-64">
            <Input placeholder="Rechercher un podcast..." className="pl-8" />
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          </div>
        </div>
      </header>

      <Tabs defaultValue="discover" className="w-full">
        <TabsList className="mb-4">
          <TabsTrigger value="discover">Découvrir</TabsTrigger>
          <TabsTrigger value="subscribed">Abonnements</TabsTrigger>
          <TabsTrigger value="episodes">Épisodes récents</TabsTrigger>
          <TabsTrigger value="downloaded">Téléchargés</TabsTrigger>
        </TabsList>
        <TabsContent value="discover" className="space-y-6">
          <div>
            <h2 className="text-xl font-semibold mb-4">Catégories populaires</h2>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
              {categories.map((category) => (
                <Card key={category.name} className="overflow-hidden group cursor-pointer">
                  <div className="p-4 text-center">
                    <div className="w-12 h-12 mx-auto mb-2 bg-accent rounded-full flex items-center justify-center">
                      {category.icon}
                    </div>
                    <h3 className="font-medium text-sm">{category.name}</h3>
                  </div>
                </Card>
              ))}
            </div>
          </div>
          
          <div>
            <h2 className="text-xl font-semibold mb-4">Podcasts tendance</h2>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
              {podcasts.filter(p => p.isTrending).map((podcast) => (
                <PodcastCard key={podcast.name} podcast={podcast} />
              ))}
            </div>
          </div>
          
          <div>
            <h2 className="text-xl font-semibold mb-4">Recommandés pour vous</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {episodes.slice(0, 4).map((episode) => (
                <EpisodeCard key={episode.title} episode={episode} />
              ))}
            </div>
          </div>
        </TabsContent>
        <TabsContent value="subscribed" className="space-y-4">
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
            {podcasts.filter(p => p.isSubscribed).map((podcast) => (
              <PodcastCard key={podcast.name} podcast={podcast} />
            ))}
          </div>
        </TabsContent>
        <TabsContent value="episodes" className="space-y-4">
          <div className="grid grid-cols-1 gap-4">
            {episodes.map((episode) => (
              <EpisodeCard key={episode.title} episode={episode} />
            ))}
          </div>
        </TabsContent>
        <TabsContent value="downloaded" className="space-y-4">
          <div className="grid grid-cols-1 gap-4">
            {episodes.filter(e => e.isDownloaded).map((episode) => (
              <EpisodeCard key={episode.title} episode={episode} />
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}

interface Podcast {
  name: string;
  author: string;
  cover: string;
  isTrending?: boolean;
  isSubscribed?: boolean;
  rating?: number;
}

interface Episode {
  title: string;
  podcastName: string;
  cover: string;
  duration: string;
  date: string;
  description: string;
  isDownloaded?: boolean;
}

interface Category {
  name: string;
  icon: React.ReactNode;
}

function PodcastCard({ podcast }: { podcast: Podcast }) {
  return (
    <div className="space-y-3 relative group">
      <div className="overflow-hidden rounded-md aspect-square relative">
        <Image
          src={podcast.cover}
          alt={podcast.name}
          fill
          className="object-cover transition-all duration-300 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
          <Button size="icon" variant="secondary" className="rounded-full shadow-lg">
            <Play className="h-4 w-4 text-primary" />
          </Button>
        </div>
        {podcast.isSubscribed && (
          <div className="absolute top-2 right-2">
            <Bookmark className="h-5 w-5 text-emerald-500 fill-emerald-500" />
          </div>
        )}
      </div>
      <div>
        <h3 className="font-medium leading-none truncate">{podcast.name}</h3>
        <p className="text-xs text-muted-foreground truncate">{podcast.author}</p>
        {podcast.rating && (
          <div className="flex items-center mt-1">
            <Star className="h-3 w-3 text-amber-400 fill-amber-400" />
            <span className="text-xs ml-1">{podcast.rating}</span>
          </div>
        )}
      </div>
    </div>
  );
}

function EpisodeCard({ episode }: { episode: Episode }) {
  return (
    <Card className="overflow-hidden group">
      <div className="flex gap-4 p-4">
        <div className="w-20 h-20 rounded overflow-hidden flex-shrink-0 relative">
          <Image
            src={episode.cover}
            alt={episode.title}
            fill
            className="object-cover"
          />
        </div>
        <div className="flex-1 min-w-0">
          <h3 className="font-semibold truncate">{episode.title}</h3>
          <p className="text-sm text-muted-foreground truncate">{episode.podcastName}</p>
          <p className="text-xs text-muted-foreground mt-1 line-clamp-2">{episode.description}</p>
          <div className="flex items-center gap-4 mt-2">
            <div className="flex items-center text-xs text-muted-foreground">
              <Clock className="h-3 w-3 mr-1" />
              {episode.duration}
            </div>
            <div className="flex items-center text-xs text-muted-foreground">
              <Calendar className="h-3 w-3 mr-1" />
              {episode.date}
            </div>
          </div>
        </div>
        <div className="opacity-0 group-hover:opacity-100 transition-opacity flex items-center">
          <Button size="icon" variant="ghost" className="rounded-full">
            <Play className="h-4 w-4" />
          </Button>
          {episode.isDownloaded ? (
            <div className="w-2 h-2 bg-emerald-500 rounded-full"></div>
          ) : (
            <Button size="icon" variant="ghost" className="rounded-full">
              <Bookmark className="h-4 w-4" />
            </Button>
          )}
        </div>
      </div>
    </Card>
  );
}

const categories: Category[] = [
  {
    name: "Actualités",
    icon: <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-6 w-6"><path d="M4 22h16a2 2 0 0 0 2-2V4a2 2 0 0 0-2-2H8a2 2 0 0 0-2 2v16a2 2 0 0 1-2 2Zm0 0a2 2 0 0 1-2-2v-9c0-1.1.9-2 2-2h2"></path><path d="M18 14h-8"></path><path d="M15 18h-5"></path><path d="M10 6h8v4h-8V6Z"></path></svg>
  },
  {
    name: "Comédie",
    icon: <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-6 w-6"><circle cx="12" cy="12" r="10"></circle><path d="M8 14s1.5 2 4 2 4-2 4-2"></path><line x1="9" x2="9.01" y1="9" y2="9"></line><line x1="15" x2="15.01" y1="9" y2="9"></line></svg>
  },
  {
    name: "Science",
    icon: <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-6 w-6"><path d="M10 2v8.5a2.5 2.5 0 0 1-5 0V2"></path><path d="M7 2v8.5a2.5 2.5 0 0 0 5 0V2"></path><path d="M8.5 2h-2"></path><path d="M14 22l5-5"></path><path d="M8.5 22H7a5 5 0 0 1-5-5c0-1.8 1.2-3.4 3-4"></path><path d="M17 17h.01"></path><path d="M19 17h.01"></path><path d="M21 17h.01"></path><path d="M23 17h.01"></path><path d="M23 19h.01"></path><path d="M21 19h.01"></path><path d="M19 19h.01"></path><path d="M17 19h.01"></path><path d="M17 21h.01"></path><path d="M19 21h.01"></path><path d="M21 21h.01"></path><path d="M23 21h.01"></path></svg>
  },
  {
    name: "Histoire",
    icon: <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-6 w-6"><path d="M3 5v14"></path><path d="M21 5v14"></path><path d="M12 5v14"></path><path d="M3 5h18"></path><path d="M3 10h18"></path><path d="M3 15h18"></path><path d="M3 19h18"></path></svg>
  },
  {
    name: "Sport",
    icon: <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-6 w-6"><path d="M12 22a9 9 0 0 0 9-9H3a9 9 0 0 0 9 9Z"></path><path d="M12 2a9 9 0 0 1 9 9"></path><path d="M3 11a9 9 0 0 1 9-9"></path></svg>
  },
  {
    name: "Business",
    icon: <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-6 w-6"><rect width="20" height="14" x="2" y="7" rx="2" ry="2"></rect><path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"></path></svg>
  }
];

const podcasts: Podcast[] = [
  {
    name: "Science Expliquée",
    author: "Dr. Marie Laurent",
    cover: "https://images.unsplash.com/photo-1532094349884-543bc11b234d?q=80&w=300&h=300&auto=format&fit=crop",
    isTrending: true,
    isSubscribed: true,
    rating: 4.8
  },
  {
    name: "Histoire du Monde",
    author: "Pierre Dubois",
    cover: "https://images.unsplash.com/photo-1461360370896-922624d12aa1?q=80&w=300&h=300&auto=format&fit=crop",
    isTrending: true,
    rating: 4.6
  },
  {
    name: "Tech Today",
    author: "Sophie Martin",
    cover: "https://images.unsplash.com/photo-1550745165-9bc0b252726f?q=80&w=300&h=300&auto=format&fit=crop",
    isTrending: true,
    isSubscribed: true,
    rating: 4.7
  },
  {
    name: "Business Insights",
    author: "Thomas Leroy",
    cover: "https://images.unsplash.com/photo-1507679799987-c73779587ccf?q=80&w=300&h=300&auto=format&fit=crop",
    isTrending: true,
    rating: 4.5
  },
  {
    name: "Mindfulness",
    author: "Claire Dupont",
    cover: "https://images.unsplash.com/photo-1506126613408-eca07ce68773?q=80&w=300&h=300&auto=format&fit=crop",
    isSubscribed: true,
    rating: 4.9
  },
  {
    name: "Sport Analysis",
    author: "Jean Petit",
    cover: "https://images.unsplash.com/photo-1461896836934-ffe607ba8211?q=80&w=300&h=300&auto=format&fit=crop",
    isSubscribed: true,
    rating: 4.4
  },
  {
    name: "Comedy Hour",
    author: "Luc Rire",
    cover: "https://images.unsplash.com/photo-1527224538127-2104bb71c51b?q=80&w=300&h=300&auto=format&fit=crop",
    isTrending: true,
    rating: 4.7
  },
  {
    name: "True Crime",
    author: "Nathalie Enquête",
    cover: "https://images.unsplash.com/photo-1589903308904-1010c2294adc?q=80&w=300&h=300&auto=format&fit=crop",
    isSubscribed: true,
    rating: 4.8
  }
];

const episodes: Episode[] = [
  {
    title: "Les mystères de l'univers expliqués",
    podcastName: "Science Expliquée",
    cover: "https://images.unsplash.com/photo-1532094349884-543bc11b234d?q=80&w=300&h=300&auto=format&fit=crop",
    duration: "45 min",
    date: "Aujourd'hui",
    description: "Dans cet épisode, nous explorons les mystères les plus profonds de notre univers et comment la science moderne tente de les expliquer.",
    isDownloaded: true
  },
  {
    title: "La chute de l'Empire romain",
    podcastName: "Histoire du Monde",
    cover: "https://images.unsplash.com/photo-1461360370896-922624d12aa1?q=80&w=300&h=300&auto=format&fit=crop",
    duration: "52 min",
    date: "Hier",
    description: "Découvrez les causes complexes qui ont mené à la chute de l'un des plus grands empires de l'histoire."
  },
  {
    title: "L'avenir de l'intelligence artificielle",
    podcastName: "Tech Today",
    cover: "https://images.unsplash.com/photo-1550745165-9bc0b252726f?q=80&w=300&h=300&auto=format&fit=crop",
    duration: "38 min",
    date: "2 jours",
    description: "Comment l'IA va transformer notre société dans les prochaines décennies et les défis é thiques qu'elle soulève.",
    isDownloaded: true
  },
  {
    title: "Stratégies d'investissement pour 2025",
    podcastName: "Business Insights",
    cover: "https://images.unsplash.com/photo-1507679799987-c73779587ccf?q=80&w=300&h=300&auto=format&fit=crop",
    duration: "41 min",
    date: "3 jours",
    description: "Les experts partagent leurs prévisions et stratégies d'investissement pour l'année à venir dans un contexte économique incertain."
  },
  {
    title: "Méditation guidée pour débutants",
    podcastName: "Mindfulness",
    cover: "https://images.unsplash.com/photo-1506126613408-eca07ce68773?q=80&w=300&h=300&auto=format&fit=crop",
    duration: "25 min",
    date: "4 jours",
    description: "Une séance de méditation guidée accessible à tous pour apprendre les bases de la pleine conscience.",
    isDownloaded: true
  },
  {
    title: "Analyse de la dernière saison de football",
    podcastName: "Sport Analysis",
    cover: "https://images.unsplash.com/photo-1461896836934-ffe607ba8211?q=80&w=300&h=300&auto=format&fit=crop",
    duration: "56 min",
    date: "5 jours",
    description: "Retour sur les moments forts de la saison et les performances des équipes favorites."
  }
];