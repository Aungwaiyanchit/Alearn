"use client";

import { create } from "zustand";
import type { LessonTrack, TenseLesson, WritingTip } from "@/types/guide";

interface GuideState {
  lessons: TenseLesson[];
  tips: WritingTip[];
  selectedTrack: LessonTrack;
  searchQuery: string;
  selectedLessonId: string;
  lessonPage: number;

  hydrateInitial: (params: {
    lessons: TenseLesson[];
    tips: WritingTip[];
  }) => void;
  setSelectedTrack: (track: LessonTrack) => void;
  setSearchQuery: (query: string) => void;
  selectLesson: (lessonId: string) => void;
  setLessonPage: (page: number) => void;
}

export const useGuideStore = create<GuideState>((set) => ({
  lessons: [],
  tips: [],
  selectedTrack: "all",
  searchQuery: "",
  selectedLessonId: "",
  lessonPage: 1,

  hydrateInitial: ({ lessons, tips }) =>
    set((state) => {
      const stillExists = lessons.some(
        (lesson) => lesson.id === state.selectedLessonId,
      );
      return {
        lessons,
        tips,
        selectedLessonId: stillExists
          ? state.selectedLessonId
          : (lessons[0]?.id ?? ""),
      };
    }),

  setSelectedTrack: (selectedTrack) =>
    set((state) => {
      const matching =
        selectedTrack === "all"
          ? state.lessons
          : state.lessons.filter((lesson) => lesson.track === selectedTrack);

      const stillVisible = matching.some(
        (lesson) => lesson.id === state.selectedLessonId,
      );
      return {
        selectedTrack,
        lessonPage: 1,
        selectedLessonId: stillVisible
          ? state.selectedLessonId
          : (matching[0]?.id ?? ""),
      };
    }),

  setSearchQuery: (searchQuery) => set({ searchQuery, lessonPage: 1 }),
  selectLesson: (selectedLessonId) => set({ selectedLessonId }),
  setLessonPage: (lessonPage) => set({ lessonPage }),
}));
