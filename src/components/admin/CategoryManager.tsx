"use client";

import { Pencil, Plus, Shuffle, Trash2 } from "lucide-react";
import { useMemo, useState } from "react";
import { CategoryIcon } from "@/components/categories/CategoryIcon";
import { PaginationControls } from "@/components/ui/PaginationControls";
import { getAccentPalette } from "@/lib/category-styles";
import { paginateItems } from "@/lib/pagination";
import { useAdminStore } from "@/store/use-admin-store";

const CATEGORY_PAGE_SIZES = [4, 6, 12] as const;

export function CategoryManager() {
  const categories = useAdminStore((state) => state.categories);
  const categoryPage = useAdminStore((state) => state.categoryPage);
  const categoryPageSize = useAdminStore((state) => state.categoryPageSize);
  const isSaving = useAdminStore((state) => state.isSaving);
  const openCreateCategoryModal = useAdminStore(
    (state) => state.openCreateCategoryModal,
  );
  const openEditCategoryModal = useAdminStore(
    (state) => state.openEditCategoryModal,
  );
  const deleteCategory = useAdminStore((state) => state.deleteCategory);
  const setCategoryPage = useAdminStore((state) => state.setCategoryPage);
  const setCategoryPageSize = useAdminStore(
    (state) => state.setCategoryPageSize,
  );
  const setFilterCategoryId = useAdminStore(
    (state) => state.setFilterCategoryId,
  );
  const setActiveTab = useAdminStore((state) => state.setActiveTab);

  const [pendingDeleteId, setPendingDeleteId] = useState<string | null>(null);

  const pagination = useMemo(
    () => paginateItems(categories, categoryPage, categoryPageSize),
    [categories, categoryPage, categoryPageSize],
  );

  const handleViewQuestions = (categoryId: string) => {
    setFilterCategoryId(categoryId);
    setActiveTab("questions");
  };

  return (
    <section className="flex flex-col gap-4">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <h2 className="text-base font-bold text-stone-900">
            Categories ({categories.length})
          </h2>
          <p className="text-xs text-stone-500">
            Create, edit, or remove lesson categories stored in local SQLite.
          </p>
        </div>

        <button
          type="button"
          onClick={openCreateCategoryModal}
          className="inline-flex items-center gap-1.5 rounded-xl bg-stone-900 px-4 py-2 text-xs font-semibold text-white shadow-xs transition hover:bg-stone-800"
        >
          <Plus className="h-3.5 w-3.5" />
          <span>New Category</span>
        </button>
      </div>

      <div className="grid grid-cols-1 gap-3 md:grid-cols-2">
        {pagination.items.map((category) => {
          const palette = getAccentPalette(category.accentColor);
          const isConfirming = pendingDeleteId === category.id;

          return (
            <div
              key={category.id}
              className="flex flex-col justify-between gap-4 rounded-2xl border border-stone-200/90 bg-white p-4 shadow-xs"
            >
              <div className="flex items-start gap-3">
                <div
                  className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-xl ${palette.iconBg}`}
                >
                  <CategoryIcon name={category.icon} className="h-5 w-5" />
                </div>

                <div className="min-w-0 flex-1">
                  <div className="flex flex-wrap items-center gap-2">
                    <h3 className="truncate text-sm font-bold text-stone-900">
                      {category.name}
                    </h3>
                    {category.isRandom && (
                      <span className="inline-flex items-center gap-1 rounded-full bg-amber-100 px-2 py-0.5 text-[10px] font-semibold text-amber-800">
                        <Shuffle className="h-2.5 w-2.5" />
                        Random Set
                      </span>
                    )}
                  </div>
                  <p className="mt-0.5 font-myanmar text-xs text-stone-600">
                    {category.burmeseName}
                  </p>
                  <p className="mt-1.5 text-xs text-stone-500">
                    {category.description}
                  </p>
                </div>
              </div>

              <div className="flex flex-wrap items-center justify-between gap-2 border-t border-stone-100 pt-3">
                <button
                  type="button"
                  onClick={() => handleViewQuestions(category.id)}
                  className="rounded-lg bg-stone-100 px-2.5 py-1 text-xs font-semibold text-stone-700 transition hover:bg-amber-100 hover:text-amber-900"
                >
                  {category.questionCount}{" "}
                  {category.questionCount === 1 ? "question" : "questions"} →
                </button>

                <div className="flex items-center gap-1.5">
                  <button
                    type="button"
                    onClick={() => openEditCategoryModal(category)}
                    className="inline-flex items-center gap-1 rounded-lg border border-stone-200 bg-white px-2.5 py-1.5 text-xs font-medium text-stone-700 transition hover:bg-stone-50"
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
                          await deleteCategory(category.id);
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
                      onClick={() => setPendingDeleteId(category.id)}
                      className="inline-flex items-center gap-1 rounded-lg border border-stone-200 bg-white px-2.5 py-1.5 text-xs font-medium text-rose-600 transition hover:border-rose-200 hover:bg-rose-50"
                    >
                      <Trash2 className="h-3.5 w-3.5" />
                      <span>Delete</span>
                    </button>
                  )}
                </div>
              </div>
            </div>
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
        pageSizeOptions={CATEGORY_PAGE_SIZES}
        itemLabel="categories"
        onPageChange={setCategoryPage}
        onPageSizeChange={setCategoryPageSize}
      />
    </section>
  );
}
