"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { BarChart, LineChart, PieChart } from "@/components/ui/chart";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

export default function StatistiquesPage() {
  const [timeRange, setTimeRange] = useState("month");

  return (
    <div className="h-full p-6 space-y-8">
      <header className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Statistiques</h1>
          <p className="text-muted-foreground">Analysez vos habitudes d'écoute</p>
        </div>
        <div className="flex items-center gap-2">
          <Select value={timeRange} onValueChange={setTimeRange}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Période" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="week">Cette semaine</SelectItem>
              <SelectItem value="month">Ce mois</SelectItem>
              <SelectItem value="year">Cette année</SelectItem>
              <SelectItem value="all">Tout le temps</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard title="Heures d'écoute" value="42h" change="+12%" />
        <StatCard title="Artistes écoutés" value="28" change="+5%" />
        <StatCard title="Titres écoutés" value="345" change="+18%" />
        <StatCard title="Genres favoris" value="Pop, Rock" change="" />
      </div>

      <Tabs defaultValue="overview" className="w-full">
        <TabsList className="mb-4">
          <TabsTrigger value="overview">Vue d'ensemble</TabsTrigger>
          <TabsTrigger value="artists">Artistes</TabsTrigger>
          <TabsTrigger value="tracks">Titres</TabsTrigger>
          <TabsTrigger value="genres">Genres</TabsTrigger>
        </TabsList>
        <TabsContent value="overview" className="space-y-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            <Card>
              <CardHeader>
                <CardTitle>Temps d'écoute par jour</CardTitle>
                <CardDescription>Heures d'écoute quotidiennes</CardDescription>
              </CardHeader>
              <CardContent>
                <LineChart 
                  data={listeningTimeData}
                  categories={["heures"]}
                  index="jour"
                  colors={["chart-1"]}
                  valueFormatter={(value) => `${value}h`}
                  className="aspect-[4/3]"
                />
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>Répartition par genre</CardTitle>
                <CardDescription>Vos genres musicaux préférés</CardDescription>
              </CardHeader>
              <CardContent>
                <PieChart 
                  data={genreData}
                  category="valeur"
                  index="genre"
                  colors={["chart-1", "chart-2", "chart-3", "chart-4", "chart-5"]}
                  valueFormatter={(value) => `${value}%`}
                  className="aspect-[4/3]"
                />
              </CardContent>
            </Card>
          </div>
        </TabsContent>
        <TabsContent value="artists" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Artistes les plus écoutés</CardTitle>
              <CardDescription>Basé sur votre temps d'écoute</CardDescription>
            </CardHeader>
            <CardContent>
              <BarChart 
                data={topArtistsData}
                categories={["heures"]}
                index="artiste"
                colors={["chart-1"]}
                layout="vertical"
                valueFormatter={(value) => `${value}h`}
                className="aspect-[3/2]"
              />
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="tracks" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Titres les plus écoutés</CardTitle>
              <CardDescription>Basé sur le nombre d'écoutes</CardDescription>
            </CardHeader>
            <CardContent>
              <BarChart 
                data={topTracksData}
                categories={["écoutes"]}
                index="titre"
                colors={["chart-2"]}
                layout="vertical"
                valueFormatter={(value) => `${value} fois`}
                className="aspect-[3/2]"
              />
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="genres" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Évolution des genres</CardTitle>
              <CardDescription>Tendances d'écoute par genre au fil du temps</CardDescription>
            </CardHeader>
            <CardContent>
              <LineChart 
                data={genreEvolutionData}
                categories={["Pop", "Rock", "Hip-Hop", "Électronique", "Jazz"]}
                index="mois"
                colors={["chart-1", "chart-2", "chart-3", "chart-4", "chart-5"]}
                valueFormatter={(value) => `${value}h`}
                className="aspect-[3/2]"
              />
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}

interface StatCardProps {
  title: string;
  value: string;
  change: string;
}

function StatCard({ title, value, change }: StatCardProps) {
  const isPositive = change.startsWith("+");
  
  return (
    <Card>
      <CardHeader className="pb-2">
        <CardTitle className="text-sm font-medium text-muted-foreground">
          {title}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">{value}</div>
        {change && (
          <p className={`text-xs ${isPositive ? "text-emerald-500" : "text-red-500"}`}>
            {change} depuis la dernière période
          </p>
        )}
      </CardContent>
    </Card>
  );
}

const listeningTimeData = [
  { jour: "Lun", heures: 2.5 },
  { jour: "Mar", heures: 3.2 },
  { jour: "Mer", heures: 2.8 },
  { jour: "Jeu", heures: 4.1 },
  { jour: "Ven", heures: 5.3 },
  { jour: "Sam", heures: 6.2 },
  { jour: "Dim", heures: 4.8 },
];

const genreData = [
  { genre: "Pop", valeur: 35 },
  { genre: "Rock", valeur: 25 },
  { genre: "Hip-Hop", valeur: 20 },
  { genre: "Électronique", valeur: 15 },
  { genre: "Jazz", valeur: 5 },
];

const topArtistsData = [
  { artiste: "The Weeknd", heures: 12.5 },
  { artiste: "Dua Lipa", heures: 10.2 },
  { artiste: "Billie Eilish", heures: 8.7 },
  { artiste: "Drake", heures: 7.5 },
  { artiste: "Ariana Grande", heures: 6.8 },
  { artiste: "Taylor Swift", heures: 5.4 },
  { artiste: "Kendrick Lamar", heures: 4.9 },
];

const topTracksData = [
  { titre: "Blinding Lights", écoutes: 42 },
  { titre: "Save Your Tears", écoutes: 38 },
  { titre: "Levitating", écoutes: 35 },
  { titre: "Bad Guy", écoutes: 32 },
  { titre: "Positions", écoutes: 28 },
  { titre: "Stay", écoutes: 25 },
  { titre: "As It Was", écoutes: 22 },
];

const genreEvolutionData = [
  { mois: "Jan", "Pop": 8, "Rock": 6, "Hip-Hop": 4, "Électronique": 3, "Jazz": 1 },
  { mois: "Fév", "Pop": 7, "Rock": 7, "Hip-Hop": 5, "Électronique": 4, "Jazz": 2 },
  { mois: "Mar", "Pop": 9, "Rock": 5, "Hip-Hop": 6, "Électronique": 3, "Jazz": 1 },
  { mois: "Avr", "Pop": 10, "Rock": 4, "Hip-Hop": 7, "Électronique": 5, "Jazz": 2 },
  { mois: "Mai", "Pop": 8, "Rock": 6, "Hip-Hop": 8, "Électronique": 6, "Jazz": 1 },
  { mois: "Juin", "Pop": 9, "Rock": 5, "Hip-Hop": 7, "Électronique": 7, "Jazz": 2 },
];