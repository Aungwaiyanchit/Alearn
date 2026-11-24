import type {
  CommonMistake,
  LessonCheatSheetRow,
  LessonTrack,
  TenseExample,
  TenseFormula,
  TimelineVisualType,
} from "@/types/guide";
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

export interface GuideLessonMutationInput {
  title: string;
  burmeseTitle: string;
  track: Exclude<LessonTrack, "all">;
  subgroup: string;
  level: Difficulty;
  summary: string;
  burmeseSummary: string;
  timelineType: TimelineVisualType;
  timelineCaption: string;
  formula: TenseFormula;
  whenToUse: string[];
  signalWords: string[];
  examples: TenseExample[];
  mistake: CommonMistake;
  cheatSheet: LessonCheatSheetRow[];
  relatedTipIds: string[];
  practiceCategoryId: string;
}

export const TIMELINE_TYPE_OPTIONS: Array<{
  value: TimelineVisualType;
  label: string;
}> = [
  { value: "rule-pattern", label: "Grammar Pattern" },
  { value: "habit", label: "Repeating Habit" },
  { value: "now-ongoing", label: "Happening Now" },
  { value: "past-to-now", label: "Past → Now Bridge" },
  { value: "past-point", label: "Past Point" },
  { value: "past-ongoing", label: "Past Ongoing" },
  { value: "past-habit", label: "Stopped Past Habit (used to)" },
  { value: "future-point", label: "Future Point (will)" },
  { value: "planned-future", label: "Planned Future (going to)" },
];

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
