"use client";

import {
  Download,
  Pencil,
  Plus,
  Search,
  Trash2,
  Upload,
  X,
} from "lucide-react";
import Link from "next/link";
import { useMemo, useState } from "react";
import { PaginationControls } from "@/components/ui/PaginationControls";
import { SelectDropdown } from "@/components/ui/SelectDropdown";
import { DIFFICULTY_STYLES } from "@/lib/category-styles";
import { paginateItems } from "@/lib/pagination";
import { useAdminStore } from "@/store/use-admin-store";
import type { Difficulty } from "@/types/practice";

const QUESTION_PAGE_SIZES = [5, 10, 20] as const;

const DIFFICULTY_FILTERS: Array<{ value: Difficulty | "all"; label: string }> =
  [
    { value: "all", label: "All Levels" },
    { value: "beginner", label: "Beginner" },
    { value: "intermediate", label: "Intermediate" },
    { value: "advanced", label: "Advanced" },
  ];

export function QuestionManager() {
  const questions = useAdminStore((state) => state.questions);
  const categories = useAdminStore((state) => state.categories);
  const searchQuery = useAdminStore((state) => state.searchQuery);
  const filterCategoryId = useAdminStore((state) => state.filterCategoryId);
  const filterDifficulty = useAdminStore((state) => state.filterDifficulty);
  const questionPage = useAdminStore((state) => state.questionPage);
  const questionPageSize = useAdminStore((state) => state.questionPageSize);
  const isSaving = useAdminStore((state) => state.isSaving);

  const setSearchQuery = useAdminStore((state) => state.setSearchQuery);
  const setFilterCategoryId = useAdminStore(
    (state) => state.setFilterCategoryId,
  );
  const setFilterDifficulty = useAdminStore(
    (state) => state.setFilterDifficulty,
  );
  const setQuestionPage = useAdminStore((state) => state.setQuestionPage);
  const setQuestionPageSize = useAdminStore(
    (state) => state.setQuestionPageSize,
  );
  const openBulkImportModal = useAdminStore(
    (state) => state.openBulkImportModal,
  );
  const deleteQuestion = useAdminStore((state) => state.deleteQuestion);

  const [pendingDeleteId, setPendingDeleteId] = useState<string | null>(null);

  const regularCategories = useMemo(
    () => categories.filter((category) => !category.isRandom),
    [categories],
  );

  const filteredQuestions = useMemo(() => {
    const query = searchQuery.trim().toLowerCase();

    return questions.filter((question) => {
      if (
        filterCategoryId !== "all" &&
        question.categoryId !== filterCategoryId
      ) {
        return false;
      }

      if (
        filterDifficulty !== "all" &&
        question.difficulty !== filterDifficulty
      ) {
        return false;
      }

      if (!query) {
        return true;
      }

      const haystack = [
        question.burmesePrompt,
        question.englishAnswer,
        question.hint,
        question.grammarNote,
        question.categoryName ?? "",
        ...question.acceptedAnswers,
      ]
        .join(" ")
        .toLowerCase();

      return haystack.includes(query);
    });
  }, [questions, searchQuery, filterCategoryId, filterDifficulty]);

  const pagination = useMemo(
    () => paginateItems(filteredQuestions, questionPage, questionPageSize),
    [filteredQuestions, questionPage, questionPageSize],
  );

  const hasActiveFilters =
    searchQuery.trim().length > 0 ||
    filterCategoryId !== "all" ||
    filterDifficulty !== "all";

  return (
    <section className="flex flex-col gap-4">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <h2 className="text-base font-bold text-stone-900">
            Questions ({filteredQuestions.length}
            {filteredQuestions.length !== questions.length
              ? ` of ${questions.length}`
              : ""}
            )
          </h2>
          <p className="text-xs text-stone-500">
            Add Burmese prompts, accepted English answers, hints, and grammar
            tips.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          <a
            href="/api/admin/questions/template"
            download="alearn-questions-template.csv"
            className="inline-flex items-center gap-1.5 rounded-xl border border-stone-200 bg-white px-3 py-2 text-xs font-semibold text-stone-700 shadow-xs transition hover:border-stone-300 hover:bg-stone-50"
          >
            <Download className="h-3.5 w-3.5 text-amber-600" />
            <span>CSV Template</span>
          </a>

          <button
            type="button"
            onClick={openBulkImportModal}
            className="inline-flex items-center gap-1.5 rounded-xl border border-amber-300 bg-amber-50 px-3.5 py-2 text-xs font-semibold text-amber-950 shadow-xs transition hover:bg-amber-100"
          >
            <Upload className="h-3.5 w-3.5" />
            <span>Bulk Import CSV</span>
          </button>

          {regularCategories.length > 0 ? (
            <Link
              href={
                filterCategoryId !== "all"
                  ? `/admin/questions/new?categoryId=${filterCategoryId}`
                  : "/admin/questions/new"
              }
              className="inline-flex items-center gap-1.5 rounded-xl bg-blue-600 px-4 py-2 text-xs font-semibold text-white shadow-xs transition hover:bg-blue-700"
            >
              <Plus className="h-3.5 w-3.5" />
              <span>New Question</span>
            </Link>
          ) : (
            <span className="inline-flex cursor-not-allowed items-center gap-1.5 rounded-xl bg-slate-300 px-4 py-2 text-xs font-semibold text-white">
              <Plus className="h-3.5 w-3.5" />
              <span>New Question</span>
            </span>
          )}
        </div>
      </div>

      {/* Search & Filter Toolbar */}
      <div className="flex flex-col gap-2.5 rounded-2xl border border-stone-200/90 bg-white p-3.5 shadow-xs sm:flex-row sm:items-center">
        <div className="relative flex-1">
          <Search className="pointer-events-none absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 text-stone-400" />
          <input
            type="text"
            value={searchQuery}
            onChange={(event) => setSearchQuery(event.target.value)}
            placeholder="Search Burmese prompt, English answer, or hint..."
            className="w-full rounded-xl border border-stone-200 bg-stone-50/70 py-2 pr-8 pl-9 text-xs text-stone-900 outline-none focus:border-amber-500 focus:bg-white focus:ring-2 focus:ring-amber-400/20"
          />
          {searchQuery && (
            <button
              type="button"
              onClick={() => setSearchQuery("")}
              aria-label="Clear search"
              className="absolute top-1/2 right-2.5 -translate-y-1/2 text-stone-400 hover:text-stone-700"
            >
              <X className="h-3.5 w-3.5" />
            </button>
          )}
        </div>

        <SelectDropdown
          size="sm"
          ariaLabel="Filter by category"
          value={filterCategoryId}
          options={[
            { value: "all", label: "All Categories" },
            ...regularCategories.map((category) => ({
              value: category.id,
              label: category.name,
              description: category.burmeseName,
            })),
          ]}
          onChange={setFilterCategoryId}
          className="sm:w-52"
        />

        <SelectDropdown
          size="sm"
          ariaLabel="Filter by difficulty"
          value={filterDifficulty}
          options={DIFFICULTY_FILTERS}
          onChange={(nextValue) =>
            setFilterDifficulty(nextValue as Difficulty | "all")
          }
          className="sm:w-40"
        />

        {hasActiveFilters && (
          <button
            type="button"
            onClick={() => {
              setSearchQuery("");
              setFilterCategoryId("all");
              setFilterDifficulty("all");
            }}
            className="rounded-xl px-2.5 py-2 text-xs font-semibold text-amber-700 hover:bg-amber-50"
          >
            Reset
          </button>
        )}
      </div>

      {/* Question List */}
      {filteredQuestions.length === 0 ? (
        <div className="rounded-2xl border border-dashed border-stone-300 bg-white p-8 text-center text-sm text-stone-500">
          No matching questions found. Try clearing filters or add a new prompt.
        </div>
      ) : (
        <>
          <div className="flex flex-col gap-3">
            {pagination.items.map((question) => {
              const diffStyle = DIFFICULTY_STYLES[question.difficulty];
              const isConfirming = pendingDeleteId === question.id;

              return (
                <article
                  key={question.id}
                  className="rounded-2xl border border-stone-200/90 bg-white p-4 shadow-xs transition hover:border-stone-300"
                >
                  <div className="flex flex-wrap items-start justify-between gap-3">
                    <div className="min-w-0 flex-1">
                      <div className="flex flex-wrap items-center gap-2">
                        <span className="rounded-full bg-stone-100 px-2.5 py-0.5 text-[11px] font-semibold text-stone-700">
                          {question.categoryName ?? question.categoryId}
                        </span>
                        <span
                          className={`rounded-full border px-2 py-0.5 text-[10px] font-semibold ${diffStyle.className}`}
                        >
                          {diffStyle.label}
                        </span>
                        {question.acceptedAnswers.length > 0 && (
                          <span className="text-[11px] text-stone-400">
                            +{question.acceptedAnswers.length} accepted alt
                            {question.acceptedAnswers.length === 1 ? "" : "s"}
                          </span>
                        )}
                      </div>

                      <p className="mt-2 font-myanmar text-base font-semibold text-stone-900">
                        {question.burmesePrompt}
                      </p>
                      <p className="mt-1 text-sm font-medium text-emerald-800">
                        {question.englishAnswer}
                      </p>

                      {question.hint && (
                        <p className="mt-1.5 font-myanmar text-xs text-stone-500">
                          <span className="font-sans font-semibold text-stone-600">
                            Hint:{" "}
                          </span>
                          {question.hint}
                        </p>
                      )}
                    </div>

                    <div className="flex shrink-0 items-center gap-1.5">
                      <Link
                        href={`/admin/questions/${question.id}/edit`}
                        className="inline-flex items-center gap-1 rounded-lg border border-slate-200 bg-white px-2.5 py-1.5 text-xs font-medium text-slate-700 transition hover:bg-slate-50"
                      >
                        <Pencil className="h-3.5 w-3.5" />
                        <span>Edit</span>
                      </Link>

                      {isConfirming ? (
                        <div className="flex items-center gap-1">
                          <button
                            type="button"
                            disabled={isSaving}
                            onClick={async () => {
                              setPendingDeleteId(null);
                              await deleteQuestion(question.id);
                            }}
                            className="rounded-lg bg-rose-600 px-2.5 py-1.5 text-xs font-semibold text-white hover:bg-rose-700 disabled:opacity-60"
                          >
                            Confirm
                          </button>
                          <button
                            type="button"
                            onClick={() => setPendingDeleteId(null)}
                            className="rounded-lg border border-stone-200 px-2 py-1.5 text-xs text-stone-600 hover:bg-stone-50"
                          >
                            Cancel
                          </button>
                        </div>
                      ) : (
                        <button
                          type="button"
                          onClick={() => setPendingDeleteId(question.id)}
                          className="inline-flex items-center gap-1 rounded-lg border border-stone-200 bg-white px-2.5 py-1.5 text-xs font-medium text-rose-600 transition hover:border-rose-200 hover:bg-rose-50"
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
            pageSizeOptions={QUESTION_PAGE_SIZES}
            itemLabel="questions"
            onPageChange={setQuestionPage}
            onPageSizeChange={setQuestionPageSize}
          />
        </>
      )}
    </section>
  );
}
