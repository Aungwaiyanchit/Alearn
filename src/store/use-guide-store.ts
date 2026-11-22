"use client";

import { create } from "zustand";
import { TENSE_LESSONS } from "@/data/lessons-guide-data";
import type { TenseTimeGroup, WritingTip } from "@/types/guide";

export type TipFilterTag = "all" | WritingTip["tag"];

interface GuideState {
  selectedGroup: TenseTimeGroup;
  selectedLessonId: string;
  selectedTipTag: TipFilterTag;
  lessonPage: number;

  setSelectedGroup: (group: TenseTimeGroup) => void;
  selectLesson: (lessonId: string) => void;
  setSelectedTipTag: (tag: TipFilterTag) => void;
  setLessonPage: (page: number) => void;
}

export const useGuideStore = create<GuideState>((set) => ({
  selectedGroup: "all",
  selectedLessonId: TENSE_LESSONS[0]?.id ?? "present-simple",
  selectedTipTag: "all",
  lessonPage: 1,

  setSelectedGroup: (selectedGroup) => {
    const matching =
      selectedGroup === "all"
        ? TENSE_LESSONS
        : TENSE_LESSONS.filter((lesson) => lesson.group === selectedGroup);

    set((state) => {
      const stillVisible = matching.some(
        (lesson) => lesson.id === state.selectedLessonId,
      );
      return {
        selectedGroup,
        lessonPage: 1,
        selectedLessonId: stillVisible
          ? state.selectedLessonId
          : (matching[0]?.id ?? state.selectedLessonId),
      };
    });
  },

  selectLesson: (selectedLessonId) => set({ selectedLessonId }),
  setSelectedTipTag: (selectedTipTag) => set({ selectedTipTag }),
  setLessonPage: (lessonPage) => set({ lessonPage }),
}));
