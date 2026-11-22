"use client";

import { motion } from "framer-motion";
import { Dices, Plus, Shuffle } from "lucide-react";
import { CategoryCard } from "@/components/categories/CategoryCard";
import { usePracticeStore } from "@/store/use-practice-store";

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

  const builtInCategories = categories.filter((category) => !category.isRandom);
  const randomCategories = categories.filter((category) => category.isRandom);
  const isRandomMixActive = selectedCategoryId === "random-mix";

  return (
    <aside className="flex flex-col gap-5">
      {/* Instant Random Mix + Make Random Category Controls */}
      <div className="rounded-2xl border border-stone-200/90 bg-white p-3.5 shadow-xs">
        <div className="mb-2.5 flex items-center justify-between">
          <span className="text-xs font-semibold tracking-wide text-stone-500 uppercase">
            Random Practice
          </span>
          <span className="font-myanmar text-[11px] text-stone-400">
            ကျပန်းလေ့ကျင့်ရန်
          </span>
        </div>

        <div className="flex flex-col gap-2">
          <motion.button
            type="button"
            whileHover={{ y: -1 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => selectCategory("random-mix", { count: 8 })}
            className={`flex w-full items-center gap-3 rounded-xl border px-3.5 py-2.5 text-left transition ${
              isRandomMixActive
                ? "border-amber-400 bg-amber-50 text-amber-950 ring-2 ring-amber-400/30"
                : "border-stone-200 bg-stone-50/70 text-stone-800 hover:border-amber-300 hover:bg-amber-50/50"
            }`}
          >
            <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-amber-500 text-white shadow-xs">
              <Shuffle className="h-4 w-4" />
            </div>
            <div className="min-w-0 flex-1">
              <div className="text-sm font-semibold">Instant Random Mix</div>
              <div className="font-myanmar text-[11px] text-stone-500">
                ကဏ္ဍစုံမှ ကျပန်း ၈ ပုဒ်
              </div>
            </div>
          </motion.button>

          <motion.button
            type="button"
            whileHover={{ y: -1 }}
            whileTap={{ scale: 0.98 }}
            onClick={openRandomModal}
            className="flex w-full items-center justify-center gap-2 rounded-xl bg-stone-900 px-3.5 py-2.5 text-xs font-semibold text-white transition hover:bg-stone-800"
          >
            <Plus className="h-3.5 w-3.5" />
            <span>Make Random Category</span>
            <Dices className="h-3.5 w-3.5 text-amber-400" />
          </motion.button>
        </div>
      </div>

      {/* Custom Saved Random Categories */}
      {randomCategories.length > 0 && (
        <section>
          <div className="mb-2.5 flex items-center justify-between px-1">
            <h2 className="text-xs font-semibold tracking-wide text-stone-500 uppercase">
              Your Random Sets ({randomCategories.length})
            </h2>
            <span className="font-myanmar text-[11px] text-stone-400">
              သိမ်းထားသော ကျပန်းကဏ္ဍများ
            </span>
          </div>
          <div className="flex flex-col gap-2">
            {randomCategories.map((category) => (
              <CategoryCard
                key={category.id}
                category={category}
                isSelected={selectedCategoryId === category.id}
                onSelect={(id) => selectCategory(id)}
                onDelete={(id) => deleteRandomCategory(id)}
              />
            ))}
          </div>
        </section>
      )}

      {/* Core Practice Categories */}
      <section>
        <div className="mb-2.5 flex items-center justify-between px-1">
          <h2 className="text-xs font-semibold tracking-wide text-stone-500 uppercase">
            Practice Categories
          </h2>
          <span className="font-myanmar text-[11px] text-stone-400">
            သင်ခန်းစာ ကဏ္ဍများ
          </span>
        </div>
        <div className="flex flex-col gap-2">
          {builtInCategories.map((category) => (
            <CategoryCard
              key={category.id}
              category={category}
              isSelected={selectedCategoryId === category.id}
              onSelect={(id) => selectCategory(id)}
            />
          ))}
        </div>
      </section>
    </aside>
  );
}
