"use client";

import { motion } from "framer-motion";
import { Trash2 } from "lucide-react";
import { CategoryIcon } from "@/components/categories/CategoryIcon";
import { getAccentPalette } from "@/lib/category-styles";
import { countMasteredInCategory } from "@/lib/local-progress";
import { useProgressStore } from "@/store/use-progress-store";
import type { Category } from "@/types/practice";

interface CategoryCardProps {
  category: Category;
  isSelected: boolean;
  onSelect: (categoryId: string) => void;
  onDelete?: (categoryId: string) => void;
}

export function CategoryCard({
  category,
  isSelected,
  onSelect,
  onDelete,
}: CategoryCardProps) {
  const palette = getAccentPalette(category.accentColor);
  const masteredQuestionIds = useProgressStore(
    (state) => state.progress.masteredQuestionIds,
  );
  const completedCount = countMasteredInCategory(
    category.questionIds,
    masteredQuestionIds,
  );
  const progressPct =
    category.questionCount > 0
      ? Math.min(
          100,
          Math.round((completedCount / category.questionCount) * 100),
        )
      : 0;

  return (
    <motion.div
      layout
      whileTap={{ scale: 0.99 }}
      className={`group relative rounded-xl border transition ${
        isSelected
          ? "border-blue-300 bg-blue-50/70 ring-1 ring-blue-500/20"
          : "border-slate-200/80 bg-white hover:border-slate-300 hover:bg-slate-50/60"
      }`}
    >
      <button
        type="button"
        onClick={() => onSelect(category.id)}
        className="flex w-full items-start gap-3 p-3 text-left"
      >
        <div
          className={`mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-lg ${
            isSelected ? "bg-blue-600 text-white" : palette.iconBg
          }`}
        >
          <CategoryIcon name={category.icon} className="h-4 w-4" />
        </div>

        <div className="min-w-0 flex-1">
          <div className="flex items-center justify-between gap-2">
            <span className="truncate text-xs font-semibold text-slate-900">
              {category.name}
            </span>
            <span className="shrink-0 rounded-md bg-slate-100 px-1.5 py-0.5 text-[10px] font-medium text-slate-500">
              {category.questionCount}
            </span>
          </div>

          <p className="mt-0.5 truncate font-myanmar text-[11px] text-slate-500">
            {category.burmeseName}
          </p>

          <div className="mt-2 flex items-center gap-2">
            <div className="h-1 flex-1 overflow-hidden rounded-full bg-slate-200/80">
              <motion.div
                className="h-full rounded-full bg-blue-600"
                initial={{ width: 0 }}
                animate={{ width: `${progressPct}%` }}
                transition={{ type: "spring", stiffness: 120, damping: 20 }}
              />
            </div>
            <span className="text-[10px] font-medium tabular-nums text-slate-400">
              {completedCount}/{category.questionCount}
            </span>
          </div>
        </div>
      </button>

      {category.isRandom && onDelete && (
        <button
          type="button"
          onClick={(event) => {
            event.stopPropagation();
            onDelete(category.id);
          }}
          aria-label={`Delete ${category.name}`}
          title="Delete custom random category"
          className="absolute right-2 bottom-2 rounded-lg p-1 text-slate-400 opacity-0 transition hover:bg-rose-50 hover:text-rose-600 group-hover:opacity-100 focus:opacity-100"
        >
          <Trash2 className="h-3.5 w-3.5" />
        </button>
      )}
    </motion.div>
  );
}
