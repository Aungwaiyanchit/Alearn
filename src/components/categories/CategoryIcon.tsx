"use client";

import {
  BookOpen,
  Briefcase,
  Compass,
  MessageCircle,
  Shuffle,
  Sparkles,
  Utensils,
} from "lucide-react";

interface CategoryIconProps {
  name: string;
  className?: string;
}

export function CategoryIcon({
  name,
  className = "h-4 w-4",
}: CategoryIconProps) {
  switch (name) {
    case "message-circle":
      return <MessageCircle className={className} />;
    case "briefcase":
      return <Briefcase className={className} />;
    case "compass":
      return <Compass className={className} />;
    case "utensils":
      return <Utensils className={className} />;
    case "book-open":
      return <BookOpen className={className} />;
    case "sparkles":
      return <Sparkles className={className} />;
    case "shuffle":
      return <Shuffle className={className} />;
    default:
      return <BookOpen className={className} />;
  }
}
