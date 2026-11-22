"use client";

import { create } from "zustand";
import { TENSE_LESSONS } from "@/data/lessons-guide-data";
import type { LessonTrack } from "@/types/guide";

interface GuideState {
  selectedTrack: LessonTrack;
  searchQuery: string;
  selectedLessonId: string;
  lessonPage: number;

  setSelectedTrack: (track: LessonTrack) => void;
  setSearchQuery: (query: string) => void;
  selectLesson: (lessonId: string) => void;
  setLessonPage: (page: number) => void;
}

export const useGuideStore = create<GuideState>((set) => ({
  selectedTrack: "all",
  searchQuery: "",
  selectedLessonId: TENSE_LESSONS[0]?.id ?? "present-simple",
  lessonPage: 1,

  setSelectedTrack: (selectedTrack) => {
    const matching =
      selectedTrack === "all"
        ? TENSE_LESSONS
        : TENSE_LESSONS.filter((lesson) => lesson.track === selectedTrack);

    set((state) => {
      const stillVisible = matching.some(
        (lesson) => lesson.id === state.selectedLessonId,
      );
      return {
        selectedTrack,
        lessonPage: 1,
        selectedLessonId: stillVisible
          ? state.selectedLessonId
          : (matching[0]?.id ?? state.selectedLessonId),
      };
    });
  },

  setSearchQuery: (searchQuery) => set({ searchQuery, lessonPage: 1 }),
  selectLesson: (selectedLessonId) => set({ selectedLessonId }),
  setLessonPage: (lessonPage) => set({ lessonPage }),
}));
