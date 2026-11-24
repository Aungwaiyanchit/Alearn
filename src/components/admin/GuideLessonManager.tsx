"use client";

import { Pencil, Plus, Search, Trash2, X } from "lucide-react";
import { useMemo, useState } from "react";
import { PaginationControls } from "@/components/ui/PaginationControls";
import { DIFFICULTY_STYLES } from "@/lib/category-styles";
import { paginateItems } from "@/lib/pagination";
import { useAdminStore } from "@/store/use-admin-store";
import type { LessonTrack } from "@/types/guide";

const GUIDE_PAGE_SIZES = [5, 10, 20] as const;

const TRACK_OPTIONS: Array<{ value: LessonTrack; label: string }> = [
  { value: "all", label: "All Tracks" },
  { value: "tenses", label: "Tenses" },
  { value: "grammar", label: "Grammar Rules" },
];

export function GuideLessonManager() {
  const guideLessons = useAdminStore((state) => state.guideLessons);
  const guideSearchQuery = useAdminStore((state) => state.guideSearchQuery);
  const guideTrackFilter = useAdminStore((state) => state.guideTrackFilter);
  const guidePage = useAdminStore((state) => state.guidePage);
  const guidePageSize = useAdminStore((state) => state.guidePageSize);
  const isSaving = useAdminStore((state) => state.isSaving);

  const setGuideSearchQuery = useAdminStore(
    (state) => state.setGuideSearchQuery,
  );
  const setGuideTrackFilter = useAdminStore(
    (state) => state.setGuideTrackFilter,
  );
  const setGuidePage = useAdminStore((state) => state.setGuidePage);
  const setGuidePageSize = useAdminStore((state) => state.setGuidePageSize);
  const openCreateGuideModal = useAdminStore(
    (state) => state.openCreateGuideModal,
  );
  const openEditGuideModal = useAdminStore((state) => state.openEditGuideModal);
  const deleteGuideLesson = useAdminStore((state) => state.deleteGuideLesson);

  const [pendingDeleteId, setPendingDeleteId] = useState<string | null>(null);

  const filteredLessons = useMemo(() => {
    const query = guideSearchQuery.trim().toLowerCase();

    return guideLessons.filter((lesson) => {
      if (guideTrackFilter !== "all" && lesson.track !== guideTrackFilter) {
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
        lesson.formula.positive,
      ]
        .join(" ")
        .toLowerCase();

      return haystack.includes(query);
    });
  }, [guideLessons, guideSearchQuery, guideTrackFilter]);

  const pagination = useMemo(
    () => paginateItems(filteredLessons, guidePage, guidePageSize),
    [filteredLessons, guidePage, guidePageSize],
  );

  const hasFilters =
    guideSearchQuery.trim().length > 0 || guideTrackFilter !== "all";

  return (
    <section className="flex flex-col gap-4">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <h2 className="text-base font-bold text-slate-900">
            Lessons Guide ({filteredLessons.length}
            {filteredLessons.length !== guideLessons.length
              ? ` of ${guideLessons.length}`
              : ""}
            )
          </h2>
          <p className="text-xs text-slate-500">
            Add, edit, or delete tenses, grammar rules, examples, and cheat
            sheets shown on the default Lessons Guide page.
          </p>
        </div>

        <button
          type="button"
          onClick={openCreateGuideModal}
          className="inline-flex items-center gap-1.5 rounded-xl bg-blue-600 px-4 py-2 text-xs font-semibold text-white shadow-xs transition hover:bg-blue-700"
        >
          <Plus className="h-3.5 w-3.5" />
          <span>New Guide Lesson</span>
        </button>
      </div>

      {/* Search & Track Filter Toolbar */}
      <div className="flex flex-col gap-2.5 rounded-2xl border border-slate-200/80 bg-white p-3.5 shadow-xs sm:flex-row sm:items-center">
        <div className="relative flex-1">
          <Search className="pointer-events-none absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 text-slate-400" />
          <input
            type="text"
            value={guideSearchQuery}
            onChange={(event) => setGuideSearchQuery(event.target.value)}
            placeholder="Search lesson title, Burmese title, or formula..."
            className="w-full rounded-xl border border-slate-200 bg-slate-50/70 py-2 pr-8 pl-9 text-xs text-slate-900 outline-none focus:border-blue-500 focus:bg-white focus:ring-2 focus:ring-blue-500/15"
          />
          {guideSearchQuery && (
            <button
              type="button"
              onClick={() => setGuideSearchQuery("")}
              aria-label="Clear guide search"
              className="absolute top-1/2 right-2.5 -translate-y-1/2 text-slate-400 hover:text-slate-700"
            >
              <X className="h-3.5 w-3.5" />
            </button>
          )}
        </div>

        <select
          aria-label="Filter guide lessons by track"
          value={guideTrackFilter}
          onChange={(event) =>
            setGuideTrackFilter(event.target.value as LessonTrack)
          }
          className="rounded-xl border border-slate-200 bg-slate-50/70 px-3 py-2 text-xs font-medium text-slate-700 outline-none focus:border-blue-500 focus:bg-white"
        >
          {TRACK_OPTIONS.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>

        {hasFilters && (
          <button
            type="button"
            onClick={() => {
              setGuideSearchQuery("");
              setGuideTrackFilter("all");
            }}
            className="rounded-xl px-2.5 py-2 text-xs font-semibold text-blue-600 hover:bg-blue-50"
          >
            Reset
          </button>
        )}
      </div>

      {/* Lessons List */}
      {filteredLessons.length === 0 ? (
        <div className="rounded-2xl border border-dashed border-slate-300 bg-white p-8 text-center text-sm text-slate-500">
          No guide lessons found. Click &ldquo;New Guide Lesson&rdquo; to add
          your first tense or grammar rule.
        </div>
      ) : (
        <>
          <div className="flex flex-col gap-3">
            {pagination.items.map((lesson) => {
              const levelStyle = DIFFICULTY_STYLES[lesson.level];
              const isConfirming = pendingDeleteId === lesson.id;

              return (
                <article
                  key={lesson.id}
                  className="rounded-2xl border border-slate-200/80 bg-white p-4 shadow-xs transition hover:border-slate-300"
                >
                  <div className="flex flex-wrap items-start justify-between gap-3">
                    <div className="min-w-0 flex-1">
                      <div className="flex flex-wrap items-center gap-2">
                        <span className="rounded-md bg-slate-100 px-2 py-0.5 text-[11px] font-semibold text-slate-700">
                          {lesson.track === "tenses" ? "Tense" : "Grammar"} ·{" "}
                          {lesson.subgroup}
                        </span>
                        <span
                          className={`rounded-md border px-2 py-0.5 text-[10px] font-semibold ${levelStyle.className}`}
                        >
                          {levelStyle.label}
                        </span>
                        <span className="text-[11px] text-slate-400">
                          {lesson.examples.length} examples ·{" "}
                          {lesson.cheatSheet.length} cheat rows
                        </span>
                      </div>

                      <h3 className="mt-2 text-sm font-bold text-slate-900">
                        {lesson.title}
                      </h3>
                      <p className="mt-0.5 font-myanmar text-xs text-blue-700">
                        {lesson.burmeseTitle}
                      </p>
                      <p className="mt-1.5 font-mono text-[11px] text-slate-600">
                        + {lesson.formula.positive}
                      </p>
                    </div>

                    <div className="flex shrink-0 items-center gap-1.5">
                      <button
                        type="button"
                        onClick={() => openEditGuideModal(lesson)}
                        className="inline-flex items-center gap-1 rounded-lg border border-slate-200 bg-white px-2.5 py-1.5 text-xs font-medium text-slate-700 transition hover:bg-slate-50"
                      >
                        <Pencil className="h-3.5 w-3.5" />
                        <span>Edit</span>
                      </button>

                      {isConfirming ? (
                        <div className="flex items-center gap-1">
                          <button
                            type="button"
                            disabled={isSaving}
                            onClick={async () => {
                              setPendingDeleteId(null);
                              await deleteGuideLesson(lesson.id);
                            }}
                            className="rounded-lg bg-rose-600 px-2.5 py-1.5 text-xs font-semibold text-white hover:bg-rose-700 disabled:opacity-60"
                          >
                            Confirm
                          </button>
                          <button
                            type="button"
                            onClick={() => setPendingDeleteId(null)}
                            className="rounded-lg border border-slate-200 px-2 py-1.5 text-xs text-slate-600 hover:bg-slate-50"
                          >
                            Cancel
                          </button>
                        </div>
                      ) : (
                        <button
                          type="button"
                          onClick={() => setPendingDeleteId(lesson.id)}
                          className="inline-flex items-center gap-1 rounded-lg border border-slate-200 bg-white px-2.5 py-1.5 text-xs font-medium text-rose-600 transition hover:border-rose-200 hover:bg-rose-50"
                        >
                          <Trash2 className="h-3.5 w-3.5" />
                          <span>Delete</span>
                        </button>
                      )}
                    </div>
                  </div>
                </article>
              );
            })}
          </div>

          <PaginationControls
            currentPage={pagination.currentPage}
            totalPages={pagination.totalPages}
            totalItems={pagination.totalItems}
            startIndex={pagination.startIndex}
            endIndex={pagination.endIndex}
            pageSize={pagination.pageSize}
            pageSizeOptions={GUIDE_PAGE_SIZES}
            itemLabel="guide lessons"
            onPageChange={setGuidePage}
            onPageSizeChange={setGuidePageSize}
          />
        </>
      )}
    </section>
  );
}
