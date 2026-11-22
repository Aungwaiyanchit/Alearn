"use client";

import { motion } from "framer-motion";
import { Dices, Plus, Shuffle } from "lucide-react";
import { useMemo, useState } from "react";
import { CategoryCard } from "@/components/categories/CategoryCard";
import { PaginationControls } from "@/components/ui/PaginationControls";
import { paginateItems } from "@/lib/pagination";
import { usePracticeStore } from "@/store/use-practice-store";

const SIDEBAR_CORE_PAGE_SIZE = 5;
const SIDEBAR_RANDOM_PAGE_SIZE = 4;

export function CategorySidebar() {
  const categories = usePracticeStore((state) => state.categories);
  const selectedCategoryId = usePracticeStore(
    (state) => state.selectedCategoryId,
  );
  const selectCategory = usePracticeStore((state) => state.selectCategory);
  const openRandomModal = usePracticeStore((state) => state.openRandomModal);
  const deleteRandomCategory = usePracticeStore(
    (state) => state.deleteRandomCategory,
  );

  const [corePage, setCorePage] = useState(1);
  const [randomPage, setRandomPage] = useState(1);

  const builtInCategories = useMemo(
    () => categories.filter((category) => !category.isRandom),
    [categories],
  );
  const randomCategories = useMemo(
    () => categories.filter((category) => category.isRandom),
    [categories],
  );

  const corePagination = useMemo(
    () => paginateItems(builtInCategories, corePage, SIDEBAR_CORE_PAGE_SIZE),
    [builtInCategories, corePage],
  );
  const randomPagination = useMemo(
    () => paginateItems(randomCategories, randomPage, SIDEBAR_RANDOM_PAGE_SIZE),
    [randomCategories, randomPage],
  );

  const isRandomMixActive = selectedCategoryId === "random-mix";

  return (
    <aside className="flex flex-col gap-5">
      {/* Quick Random Modes */}
      <div className="rounded-2xl border border-slate-200/80 bg-white p-3.5 shadow-xs">
        <div className="mb-2.5 flex items-center justify-between">
          <span className="text-[11px] font-semibold tracking-wider text-slate-400 uppercase">
            Random Practice
          </span>
          <span className="font-myanmar text-[11px] text-slate-400">
            ကျပန်းလေ့ကျင့်ရန်
          </span>
        </div>

        <div className="flex flex-col gap-2">
          <motion.button
            type="button"
            whileTap={{ scale: 0.98 }}
            onClick={() => selectCategory("random-mix", { count: 8 })}
            className={`flex w-full items-center gap-3 rounded-xl border px-3 py-2.5 text-left transition ${
              isRandomMixActive
                ? "border-blue-300 bg-blue-50/70 text-blue-950 ring-1 ring-blue-500/20"
                : "border-slate-200 bg-slate-50/70 text-slate-800 hover:border-slate-300 hover:bg-slate-100/70"
            }`}
          >
            <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-blue-600 text-white">
              <Shuffle className="h-4 w-4" />
            </div>
            <div className="min-w-0 flex-1">
              <div className="text-xs font-semibold">Instant Random Mix</div>
              <div className="font-myanmar text-[11px] text-slate-500">
                ကဏ္ဍစုံမှ ကျပန်း ၈ ပုဒ်
              </div>
            </div>
          </motion.button>

          <button
            type="button"
            onClick={openRandomModal}
            className="flex w-full items-center justify-center gap-1.5 rounded-xl border border-slate-200 bg-white px-3 py-2 text-xs font-semibold text-slate-700 transition hover:border-slate-300 hover:bg-slate-50"
          >
            <Plus className="h-3.5 w-3.5 text-blue-600" />
            <span>Make Random Category</span>
            <Dices className="h-3.5 w-3.5 text-slate-400" />
          </button>
        </div>
      </div>

      {/* Custom Saved Random Categories */}
      {randomCategories.length > 0 && (
        <section>
          <div className="mb-2 flex items-center justify-between px-1">
            <h2 className="text-[11px] font-semibold tracking-wider text-slate-400 uppercase">
              Your Random Sets ({randomCategories.length})
            </h2>
          </div>
          <div className="flex flex-col gap-2">
            {randomPagination.items.map((category) => (
              <CategoryCard
                key={category.id}
                category={category}
                isSelected={selectedCategoryId === category.id}
                onSelect={(id) => selectCategory(id)}
                onDelete={(id) => deleteRandomCategory(id)}
              />
            ))}
          </div>
          <PaginationControls
            compact
            currentPage={randomPagination.currentPage}
            totalPages={randomPagination.totalPages}
            totalItems={randomPagination.totalItems}
            startIndex={randomPagination.startIndex}
            endIndex={randomPagination.endIndex}
            itemLabel="random categories"
            onPageChange={setRandomPage}
          />
        </section>
      )}

      {/* Core Practice Categories */}
      <section>
        <div className="mb-2 flex items-center justify-between px-1">
          <h2 className="text-[11px] font-semibold tracking-wider text-slate-400 uppercase">
            Categories ({builtInCategories.length})
          </h2>
          <span className="font-myanmar text-[11px] text-slate-400">
            သင်ခန်းစာ ကဏ္ဍများ
          </span>
        </div>
        <div className="flex flex-col gap-2">
          {corePagination.items.map((category) => (
            <CategoryCard
              key={category.id}
              category={category}
              isSelected={selectedCategoryId === category.id}
              onSelect={(id) => selectCategory(id)}
            />
          ))}
        </div>
        <PaginationControls
          compact
          currentPage={corePagination.currentPage}
          totalPages={corePagination.totalPages}
          totalItems={corePagination.totalItems}
          startIndex={corePagination.startIndex}
          endIndex={corePagination.endIndex}
          itemLabel="practice categories"
          onPageChange={setCorePage}
        />
      </section>
    </aside>
  );
}
