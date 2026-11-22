import type { Difficulty } from "@/types/practice";

export interface AccentPalette {
  badge: string;
  iconBg: string;
  activeBorder: string;
  ring: string;
  bar: string;
}

const ACCENT_PALETTES: Record<string, AccentPalette> = {
  amber: {
    badge: "bg-amber-100 text-amber-800 border-amber-200",
    iconBg: "bg-amber-100 text-amber-700",
    activeBorder: "border-amber-400 bg-amber-50/70",
    ring: "ring-amber-400/30",
    bar: "bg-amber-500",
  },
  indigo: {
    badge: "bg-indigo-100 text-indigo-800 border-indigo-200",
    iconBg: "bg-indigo-100 text-indigo-700",
    activeBorder: "border-indigo-400 bg-indigo-50/70",
    ring: "ring-indigo-400/30",
    bar: "bg-indigo-500",
  },
  emerald: {
    badge: "bg-emerald-100 text-emerald-800 border-emerald-200",
    iconBg: "bg-emerald-100 text-emerald-700",
    activeBorder: "border-emerald-400 bg-emerald-50/70",
    ring: "ring-emerald-400/30",
    bar: "bg-emerald-500",
  },
  rose: {
    badge: "bg-rose-100 text-rose-800 border-rose-200",
    iconBg: "bg-rose-100 text-rose-700",
    activeBorder: "border-rose-400 bg-rose-50/70",
    ring: "ring-rose-400/30",
    bar: "bg-rose-500",
  },
  sky: {
    badge: "bg-sky-100 text-sky-800 border-sky-200",
    iconBg: "bg-sky-100 text-sky-700",
    activeBorder: "border-sky-400 bg-sky-50/70",
    ring: "ring-sky-400/30",
    bar: "bg-sky-500",
  },
  violet: {
    badge: "bg-violet-100 text-violet-800 border-violet-200",
    iconBg: "bg-violet-100 text-violet-700",
    activeBorder: "border-violet-400 bg-violet-50/70",
    ring: "ring-violet-400/30",
    bar: "bg-violet-500",
  },
};

export function getAccentPalette(color: string): AccentPalette {
  return ACCENT_PALETTES[color] ?? ACCENT_PALETTES.amber;
}

export const DIFFICULTY_STYLES: Record<
  Difficulty,
  { label: string; burmese: string; className: string }
> = {
  beginner: {
    label: "Beginner",
    burmese: "အခြေခံ",
    className: "bg-emerald-50 text-emerald-700 border-emerald-200",
  },
  intermediate: {
    label: "Intermediate",
    burmese: "အလယ်အလတ်",
    className: "bg-amber-50 text-amber-700 border-amber-200",
  },
  advanced: {
    label: "Advanced",
    burmese: "အဆင့်မြင့်",
    className: "bg-rose-50 text-rose-700 border-rose-200",
  },
};

export const RANDOM_CATEGORY_NAME_IDEAS = [
  "Morning Writing Sprint",
  "Yangon Coffee Mix",
  "Daily Fluency Shuffle",
  "Mixed Grammar Challenge",
  "Quick Translation Drill",
  "Weekend Writing Boost",
  "Surprise Sentence Lab",
  "Evening Expression Mix",
];
