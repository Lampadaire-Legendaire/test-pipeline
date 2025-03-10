"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import {
  LayoutDashboard,
  BarChart2,
  History,
  Music,
  Disc,
  Mic2,
  Radio,
  User,
  Settings,
  Headphones,
} from "lucide-react";
import { motion } from "framer-motion";

interface NavItem {
  title: string;
  href: string;
  icon: React.ReactNode;
}

const mainNavItems: NavItem[] = [
  {
    title: "Dashboard",
    href: "/",
    icon: <LayoutDashboard className="h-5 w-5" />,
  },
  {
    title: "Statistiques",
    href: "/statistiques",
    icon: <BarChart2 className="h-5 w-5" />,
  },
  {
    title: "Historique",
    href: "/historique",
    icon: <History className="h-5 w-5" />,
  },
  {
    title: "Sessions",
    href: "/sessions",
    icon: <Headphones className="h-5 w-5" />,
  },
];

const libraryNavItems: NavItem[] = [
  {
    title: "Playlists",
    href: "/playlists",
    icon: <Music className="h-5 w-5" />,
  },
  {
    title: "Albums",
    href: "/albums",
    icon: <Disc className="h-5 w-5" />,
  },
  {
    title: "Artistes",
    href: "/artistes",
    icon: <Mic2 className="h-5 w-5" />,
  },
  {
    title: "Podcasts",
    href: "/podcasts",
    icon: <Radio className="h-5 w-5" />,
  },
];

export default function Sidebar() {
  const pathname = usePathname();
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div
      className="sidebar w-64 border-r border-white/10 bg-gradient-to-b from-card to-background text-card-foreground h-screen overflow-hidden relative"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="flex flex-col h-full">
        <div className="p-6 bg-gradient-to-r from-accent/10 to-transparent">
          <h2 className="text-2xl font-bold tracking-tight mb-2 flex items-center gap-2">
            <Music className="h-6 w-6 text-emerald-400 flex-shrink-0" />
            <span className="bg-gradient-to-r from-emerald-400 to-blue-500 text-transparent bg-clip-text truncate font-extrabold">
              Spotify Tracker
            </span>
          </h2>
        </div>
        <ScrollArea className="flex-1 px-4">
          <div className="space-y-8">
            <div>
              <h3 className="text-xs uppercase text-gray-400 font-bold mb-3 px-2 tracking-wider">
                MENU PRINCIPAL
              </h3>
              <nav className="space-y-1">
                {mainNavItems.map((item, index) => (
                  <NavItem
                    key={item.href}
                    item={item}
                    isActive={pathname === item.href}
                    index={index}
                    isHovered={isHovered}
                  />
                ))}
              </nav>
            </div>
            <Separator className="bg-white/10" />
            <div>
              <h3 className="text-xs uppercase text-gray-400 font-bold mb-3 px-2 tracking-wider">
                BIBLIOTHÈQUE
              </h3>
              <nav className="space-y-1">
                {libraryNavItems.map((item, index) => (
                  <NavItem
                    key={item.href}
                    item={item}
                    isActive={pathname === item.href}
                    index={index + mainNavItems.length}
                    isHovered={isHovered}
                  />
                ))}
              </nav>
            </div>
          </div>
        </ScrollArea>
        <div className="p-4 mt-auto bg-gradient-to-t from-background/80 to-transparent">
          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="icon"
              className="rounded-full bg-white/5 border-white/10 hover:bg-white/10"
            >
              <User className="h-5 w-5 text-emerald-400" />
            </Button>
            <Button
              variant="outline"
              size="icon"
              className="rounded-full bg-white/5 border-white/10 hover:bg-white/10"
            >
              <Settings className="h-5 w-5 text-emerald-400" />
            </Button>
          </div>
        </div>
      </div>

      {/* Overlay pour masquer tout contenu qui pourrait déborder */}
      <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-background to-transparent pointer-events-none" />
    </div>
  );
}

interface NavItemProps {
  item: NavItem;
  isActive: boolean;
  index: number;
  isHovered: boolean;
}

function NavItem({ item, isActive, index, isHovered }: NavItemProps) {
  return (
    <Link
      href={item.href}
      className={cn(
        "flex items-center gap-3 rounded-md px-4 py-3 text-sm font-medium transition-all relative group overflow-hidden",
        isActive
          ? "bg-white/10 text-white shadow-sm"
          : "text-gray-400 hover:text-white hover:bg-white/5"
      )}
    >
      {isActive && (
        <motion.div
          layoutId="activeNavIndicator"
          className="absolute left-0 w-1 h-full bg-emerald-500 rounded-r-full"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
        />
      )}
      <motion.div
        initial={{ x: -5, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ delay: 0.05 * index, duration: 0.3 }}
        className={`flex-shrink-0 ${isActive ? "text-emerald-400" : ""}`}
      >
        {item.icon}
      </motion.div>
      <motion.span
        initial={{ x: -5, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ delay: 0.05 * index + 0.1, duration: 0.3 }}
        className="truncate"
      >
        {item.title}
      </motion.span>
      {!isActive && (
        <motion.div
          initial={{ width: 0 }}
          whileHover={{ width: "100%" }}
          className="absolute bottom-0 left-0 h-[2px] bg-emerald-500/50 rounded-full"
        />
      )}
    </Link>
  );
}
