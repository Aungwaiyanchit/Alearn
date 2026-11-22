import type { Difficulty } from "@/types/practice";

export interface CategoryMutationInput {
  name: string;
  burmeseName: string;
  description: string;
  icon: string;
  accentColor: string;
}

export interface QuestionMutationInput {
  categoryId: string;
  burmesePrompt: string;
  englishAnswer: string;
  acceptedAnswers: string[];
  hint: string;
  grammarNote: string;
  difficulty: Difficulty;
}

export const CATEGORY_ICON_OPTIONS = [
  { value: "message-circle", label: "Chat" },
  { value: "briefcase", label: "Work" },
  { value: "compass", label: "Travel" },
  { value: "utensils", label: "Dining" },
  { value: "book-open", label: "Grammar" },
  { value: "sparkles", label: "Ideas" },
  { value: "shuffle", label: "Mixed" },
] as const;

export const CATEGORY_COLOR_OPTIONS = [
  { value: "amber", label: "Amber", swatch: "bg-amber-500" },
  { value: "indigo", label: "Indigo", swatch: "bg-indigo-500" },
  { value: "emerald", label: "Emerald", swatch: "bg-emerald-500" },
  { value: "rose", label: "Rose", swatch: "bg-rose-500" },
  { value: "sky", label: "Sky", swatch: "bg-sky-500" },
  { value: "violet", label: "Violet", swatch: "bg-violet-500" },
] as const;
