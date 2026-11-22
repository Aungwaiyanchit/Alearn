"use client";

import { motion } from "framer-motion";
import { Trash2 } from "lucide-react";
import { CategoryIcon } from "@/components/categories/CategoryIcon";
import { getAccentPalette } from "@/lib/category-styles";
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
  const progressPct =
    category.questionCount > 0
      ? Math.min(
          100,
          Math.round((category.completedCount / category.questionCount) * 100),
        )
      : 0;

  return (
    <motion.div
      layout
      whileHover={{ y: -1 }}
      whileTap={{ scale: 0.99 }}
      className={`group relative rounded-2xl border transition-colors ${
        isSelected
          ? `${palette.activeBorder} ring-2 ${palette.ring}`
          : "border-stone-200/90 bg-white hover:border-stone-300 hover:bg-stone-50/70"
      }`}
    >
      <button
        type="button"
        onClick={() => onSelect(category.id)}
        className="flex w-full items-start gap-3 p-3.5 text-left"
      >
        <div
          className={`mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-xl ${palette.iconBg}`}
        >
          <CategoryIcon name={category.icon} className="h-4 w-4" />
        </div>

        <div className="min-w-0 flex-1">
          <div className="flex items-center justify-between gap-2">
            <span className="truncate text-sm font-semibold text-stone-900">
              {category.name}
            </span>
            <span className="shrink-0 rounded-full bg-stone-100 px-2 py-0.5 text-[11px] font-medium text-stone-600">
              {category.questionCount} Qs
            </span>
          </div>

          <p className="mt-0.5 truncate font-myanmar text-xs text-stone-500">
            {category.burmeseName}
          </p>

          <div className="mt-2.5 flex items-center gap-2">
            <div className="h-1.5 flex-1 overflow-hidden rounded-full bg-stone-200/80">
              <motion.div
                className={`h-full rounded-full ${palette.bar}`}
                initial={{ width: 0 }}
                animate={{ width: `${progressPct}%` }}
                transition={{ type: "spring", stiffness: 120, damping: 20 }}
              />
            </div>
            <span className="text-[10px] font-medium tabular-nums text-stone-400">
              {category.completedCount}/{category.questionCount}
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
          className="absolute right-2.5 bottom-2.5 rounded-lg p-1.5 text-stone-400 opacity-0 transition hover:bg-rose-50 hover:text-rose-600 group-hover:opacity-100 focus:opacity-100"
        >
          <Trash2 className="h-3.5 w-3.5" />
        </button>
      )}
    </motion.div>
  );
}
