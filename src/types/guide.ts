export type LessonTrack = "all" | "tenses" | "grammar";

export type TimelineVisualType =
  | "habit"
  | "now-ongoing"
  | "past-to-now"
  | "past-point"
  | "past-ongoing"
  | "future-point"
  | "past-habit"
  | "planned-future"
  | "rule-pattern";

export interface TenseFormula {
  positive: string;
  negative: string;
  question: string;
}

export interface TenseExample {
  id: string;
  burmese: string;
  english: string;
  highlight: string;
  note: string;
}

export interface CommonMistake {
  wrong: string;
  correct: string;
  reason: string;
}

export interface TenseLesson {
  id: string;
  title: string;
  burmeseTitle: string;
  track: Exclude<LessonTrack, "all">;
  subgroup: string;
  level: "beginner" | "intermediate" | "advanced";
  summary: string;
  burmeseSummary: string;
  timelineType: TimelineVisualType;
  timelineCaption: string;
  formula: TenseFormula;
  whenToUse: string[];
  signalWords: string[];
  examples: TenseExample[];
  mistake: CommonMistake;
  practiceCategoryId: string;
}

export interface WritingTip {
  id: string;
  tag: "structure" | "grammar" | "vocabulary" | "polish";
  title: string;
  burmeseTitle: string;
  summary: string;
  trick: string;
  before: string;
  after: string;
}

export interface TenseComparisonRow {
  tenseId: string;
  tenseName: string;
  burmeseLabel: string;
  englishSentence: string;
  burmeseMeaning: string;
  focus: string;
}
