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
    badge: "bg-amber-50 text-amber-700 border-amber-200",
    iconBg: "bg-amber-50 text-amber-600",
    activeBorder: "border-blue-600/40 bg-blue-50/50",
    ring: "ring-blue-600/15",
    bar: "bg-blue-600",
  },
  indigo: {
    badge: "bg-indigo-50 text-indigo-700 border-indigo-200",
    iconBg: "bg-indigo-50 text-indigo-600",
    activeBorder: "border-blue-600/40 bg-blue-50/50",
    ring: "ring-blue-600/15",
    bar: "bg-blue-600",
  },
  emerald: {
    badge: "bg-emerald-50 text-emerald-700 border-emerald-200",
    iconBg: "bg-emerald-50 text-emerald-600",
    activeBorder: "border-blue-600/40 bg-blue-50/50",
    ring: "ring-blue-600/15",
    bar: "bg-blue-600",
  },
  rose: {
    badge: "bg-rose-50 text-rose-700 border-rose-200",
    iconBg: "bg-rose-50 text-rose-600",
    activeBorder: "border-blue-600/40 bg-blue-50/50",
    ring: "ring-blue-600/15",
    bar: "bg-blue-600",
  },
  sky: {
    badge: "bg-sky-50 text-sky-700 border-sky-200",
    iconBg: "bg-sky-50 text-sky-600",
    activeBorder: "border-blue-600/40 bg-blue-50/50",
    ring: "ring-blue-600/15",
    bar: "bg-blue-600",
  },
  violet: {
    badge: "bg-violet-50 text-violet-700 border-violet-200",
    iconBg: "bg-violet-50 text-violet-600",
    activeBorder: "border-blue-600/40 bg-blue-50/50",
    ring: "ring-blue-600/15",
    bar: "bg-blue-600",
  },
};

export function getAccentPalette(color: string): AccentPalette {
  return ACCENT_PALETTES[color] ?? ACCENT_PALETTES.indigo;
}

export const DIFFICULTY_STYLES: Record<
  Difficulty,
  { label: string; burmese: string; className: string }
> = {
  beginner: {
    label: "Beginner",
    burmese: "အခြေခံ",
    className: "bg-emerald-50 text-emerald-700 border-emerald-200/80",
  },
  intermediate: {
    label: "Intermediate",
    burmese: "အလယ်အလတ်",
    className: "bg-blue-50 text-blue-700 border-blue-200/80",
  },
  advanced: {
    label: "Advanced",
    burmese: "အဆင့်မြင့်",
    className: "bg-slate-100 text-slate-700 border-slate-200",
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
