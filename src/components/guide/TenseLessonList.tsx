"use client";

import { useMemo } from "react";
import { PaginationControls } from "@/components/ui/PaginationControls";
import { TENSE_LESSONS } from "@/data/lessons-guide-data";
import { DIFFICULTY_STYLES } from "@/lib/category-styles";
import { paginateItems } from "@/lib/pagination";
import { useGuideStore } from "@/store/use-guide-store";
import type { TenseTimeGroup } from "@/types/guide";

const TIME_GROUPS: Array<{ value: TenseTimeGroup; label: string }> = [
  { value: "all", label: "All" },
  { value: "present", label: "Present" },
  { value: "past", label: "Past" },
  { value: "future", label: "Future" },
  { value: "patterns", label: "Patterns" },
];

const LESSONS_PER_PAGE = 5;

export function TenseLessonList() {
  const selectedGroup = useGuideStore((state) => state.selectedGroup);
  const selectedLessonId = useGuideStore((state) => state.selectedLessonId);
  const lessonPage = useGuideStore((state) => state.lessonPage);
  const setSelectedGroup = useGuideStore((state) => state.setSelectedGroup);
  const selectLesson = useGuideStore((state) => state.selectLesson);
  const setLessonPage = useGuideStore((state) => state.setLessonPage);

  const filteredLessons = useMemo(
    () =>
      selectedGroup === "all"
        ? TENSE_LESSONS
        : TENSE_LESSONS.filter((lesson) => lesson.group === selectedGroup),
    [selectedGroup],
  );

  const pagination = useMemo(
    () => paginateItems(filteredLessons, lessonPage, LESSONS_PER_PAGE),
    [filteredLessons, lessonPage],
  );

  return (
    <aside className="flex flex-col gap-4">
      <div className="rounded-2xl border border-stone-200/90 bg-white p-3.5 shadow-xs">
        <div className="mb-2.5 flex items-center justify-between">
          <span className="text-xs font-semibold tracking-wide text-stone-500 uppercase">
            Filter by Time
          </span>
          <span className="font-myanmar text-[11px] text-stone-400">
            ကာလအလိုက်ရွေးရန်
          </span>
        </div>

        <div className="flex flex-wrap gap-1.5">
          {TIME_GROUPS.map((group) => {
            const active = selectedGroup === group.value;
            return (
              <button
                key={group.value}
                type="button"
                onClick={() => setSelectedGroup(group.value)}
                className={`rounded-xl px-3 py-1.5 text-xs font-semibold transition ${
                  active
                    ? "bg-stone-900 text-white shadow-xs"
                    : "border border-stone-200 bg-stone-50 text-stone-600 hover:border-stone-300 hover:bg-stone-100"
                }`}
              >
                {group.label}
              </button>
            );
          })}
        </div>
      </div>

      <div className="flex flex-col gap-2">
        {pagination.items.map((lesson) => {
          const isSelected = lesson.id === selectedLessonId;
          const levelStyle = DIFFICULTY_STYLES[lesson.level];

          return (
            <button
              key={lesson.id}
              type="button"
              onClick={() => selectLesson(lesson.id)}
              className={`flex flex-col rounded-2xl border p-3.5 text-left transition ${
                isSelected
                  ? "border-amber-400 bg-amber-50/75 ring-2 ring-amber-400/25"
                  : "border-stone-200/90 bg-white hover:border-stone-300 hover:bg-stone-50/60"
              }`}
            >
              <div className="flex items-center justify-between gap-2">
                <span className="text-sm font-bold text-stone-900">
                  {lesson.title}
                </span>
                <span
                  className={`shrink-0 rounded-full border px-2 py-0.5 text-[10px] font-semibold ${levelStyle.className}`}
                >
                  {levelStyle.label}
                </span>
              </div>
              <span className="mt-0.5 font-myanmar text-xs text-stone-500">
                {lesson.burmeseTitle}
              </span>
            </button>
          );
        })}

        <PaginationControls
          compact
          currentPage={pagination.currentPage}
          totalPages={pagination.totalPages}
          totalItems={pagination.totalItems}
          startIndex={pagination.startIndex}
          endIndex={pagination.endIndex}
          itemLabel="tense lessons"
          onPageChange={setLessonPage}
        />
      </div>
    </aside>
  );
}
