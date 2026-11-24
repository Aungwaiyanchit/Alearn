"use client";

import { Search, X } from "lucide-react";
import { useMemo } from "react";
import { PaginationControls } from "@/components/ui/PaginationControls";
import { paginateItems } from "@/lib/pagination";
import { useGuideStore } from "@/store/use-guide-store";
import type { LessonTrack } from "@/types/guide";

const LESSONS_PER_PAGE = 7;

export function TenseLessonList() {
  const lessons = useGuideStore((state) => state.lessons);
  const selectedTrack = useGuideStore((state) => state.selectedTrack);
  const searchQuery = useGuideStore((state) => state.searchQuery);
  const selectedLessonId = useGuideStore((state) => state.selectedLessonId);
  const lessonPage = useGuideStore((state) => state.lessonPage);

  const setSelectedTrack = useGuideStore((state) => state.setSelectedTrack);
  const setSearchQuery = useGuideStore((state) => state.setSearchQuery);
  const selectLesson = useGuideStore((state) => state.selectLesson);
  const setLessonPage = useGuideStore((state) => state.setLessonPage);

  const trackTabs: Array<{ value: LessonTrack; label: string; count: number }> =
    useMemo(
      () => [
        { value: "all", label: "All", count: lessons.length },
        {
          value: "tenses",
          label: "Tenses",
          count: lessons.filter((l) => l.track === "tenses").length,
        },
        {
          value: "grammar",
          label: "Grammar",
          count: lessons.filter((l) => l.track === "grammar").length,
        },
      ],
      [lessons],
    );

  const filteredLessons = useMemo(() => {
    const query = searchQuery.trim().toLowerCase();

    return lessons.filter((lesson) => {
      if (selectedTrack !== "all" && lesson.track !== selectedTrack) {
        return false;
      }

      if (!query) {
        return true;
      }

      const haystack = [
        lesson.title,
        lesson.burmeseTitle,
        lesson.subgroup,
        lesson.summary,
        ...lesson.signalWords,
      ]
        .join(" ")
        .toLowerCase();

      return haystack.includes(query);
    });
  }, [lessons, selectedTrack, searchQuery]);

  const pagination = useMemo(
    () => paginateItems(filteredLessons, lessonPage, LESSONS_PER_PAGE),
    [filteredLessons, lessonPage],
  );

  return (
    <aside className="flex flex-col gap-3 rounded-2xl border border-slate-200/80 bg-white p-4 shadow-xs">
      {/* Search Input */}
      <div className="relative">
        <Search className="pointer-events-none absolute top-1/2 left-3 h-3.5 w-3.5 -translate-y-1/2 text-slate-400" />
        <input
          type="text"
          value={searchQuery}
          onChange={(event) => setSearchQuery(event.target.value)}
          placeholder="Search used to, going to, past..."
          className="w-full rounded-xl border border-slate-200 bg-slate-50/70 py-2 pr-8 pl-8 text-xs text-slate-900 placeholder:text-slate-400 outline-none transition focus:border-blue-500 focus:bg-white focus:ring-2 focus:ring-blue-500/15"
        />
        {searchQuery && (
          <button
            type="button"
            onClick={() => setSearchQuery("")}
            aria-label="Clear lesson search"
            className="absolute top-1/2 right-2.5 -translate-y-1/2 text-slate-400 hover:text-slate-700"
          >
            <X className="h-3.5 w-3.5" />
          </button>
        )}
      </div>

      {/* Track Tabs */}
      <div className="grid grid-cols-3 gap-1 rounded-xl bg-slate-100 p-1">
        {trackTabs.map((tab) => {
          const active = selectedTrack === tab.value;
          return (
            <button
              key={tab.value}
              type="button"
              onClick={() => setSelectedTrack(tab.value)}
              className={`rounded-lg py-1.5 text-xs font-semibold transition ${
                active
                  ? "bg-white text-slate-900 shadow-xs"
                  : "text-slate-600 hover:text-slate-900"
              }`}
            >
              {tab.label}{" "}
              <span className="text-[10px] opacity-65">({tab.count})</span>
            </button>
          );
        })}
      </div>

      {/* Curriculum List */}
      {pagination.items.length === 0 ? (
        <div className="rounded-xl border border-dashed border-slate-200 p-6 text-center text-xs text-slate-500">
          No lessons match &ldquo;{searchQuery}&rdquo;.
        </div>
      ) : (
        <div className="flex flex-col gap-1">
          {pagination.items.map((lesson) => {
            const isSelected = lesson.id === selectedLessonId;

            return (
              <button
                key={lesson.id}
                type="button"
                onClick={() => selectLesson(lesson.id)}
                className={`group flex items-start justify-between gap-2 rounded-xl border px-3 py-2.5 text-left transition ${
                  isSelected
                    ? "border-blue-200 bg-blue-50/70 text-blue-950"
                    : "border-transparent bg-transparent text-slate-700 hover:bg-slate-50"
                }`}
              >
                <div className="min-w-0 flex-1">
                  <div className="flex items-center gap-2">
                    <span
                      className={`h-1.5 w-1.5 shrink-0 rounded-full ${
                        isSelected
                          ? "bg-blue-600"
                          : "bg-slate-300 group-hover:bg-slate-400"
                      }`}
                    />
                    <span className="truncate text-xs font-semibold">
                      {lesson.title}
                    </span>
                  </div>
                  <p className="mt-0.5 truncate pl-3.5 font-myanmar text-[11px] text-slate-500">
                    {lesson.burmeseTitle}
                  </p>
                </div>

                <span
                  className={`shrink-0 rounded-md px-1.5 py-0.5 text-[10px] font-medium ${
                    isSelected
                      ? "bg-blue-100/80 text-blue-700"
                      : "bg-slate-100 text-slate-500"
                  }`}
                >
                  {lesson.subgroup}
                </span>
              </button>
            );
          })}
        </div>
      )}

      <PaginationControls
        compact
        currentPage={pagination.currentPage}
        totalPages={pagination.totalPages}
        totalItems={pagination.totalItems}
        startIndex={pagination.startIndex}
        endIndex={pagination.endIndex}
        itemLabel="lessons"
        onPageChange={setLessonPage}
      />
    </aside>
  );
}
