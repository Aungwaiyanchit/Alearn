"use client";

import { motion } from "framer-motion";
import { Flame, RotateCcw, Shuffle } from "lucide-react";
import { DIFFICULTY_STYLES } from "@/lib/category-styles";
import type { Difficulty } from "@/types/practice";

interface ProgressHeaderProps {
  categoryTitle: string;
  categoryBurmese: string;
  currentIndex: number;
  totalQuestions: number;
  difficulty?: Difficulty;
  streak: number;
  onRestart: (shuffle: boolean) => void;
}

export function ProgressHeader({
  categoryTitle,
  categoryBurmese,
  currentIndex,
  totalQuestions,
  difficulty,
  streak,
  onRestart,
}: ProgressHeaderProps) {
  const progress =
    totalQuestions > 0
      ? Math.round(((currentIndex + 1) / totalQuestions) * 100)
      : 0;
  const diffStyle = difficulty ? DIFFICULTY_STYLES[difficulty] : null;

  return (
    <div className="flex flex-col gap-3">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-lg font-bold tracking-tight text-stone-900 sm:text-xl">
              {categoryTitle}
            </h1>
            {diffStyle && (
              <span
                className={`rounded-full border px-2.5 py-0.5 text-[11px] font-semibold ${diffStyle.className}`}
              >
                {diffStyle.label}
              </span>
            )}
          </div>
          <p className="font-myanmar text-xs text-stone-500">
            {categoryBurmese}
          </p>
        </div>

        <div className="flex items-center gap-2">
          <motion.div
            key={streak}
            initial={streak > 0 ? { scale: 1.25 } : false}
            animate={{ scale: 1 }}
            transition={{ type: "spring", stiffness: 400, damping: 18 }}
            className={`inline-flex items-center gap-1.5 rounded-full border px-3 py-1 text-xs font-semibold tabular-nums ${
              streak > 0
                ? "border-amber-300 bg-amber-50 text-amber-800"
                : "border-stone-200 bg-white text-stone-500"
            }`}
          >
            <Flame
              className={`h-3.5 w-3.5 ${
                streak > 0 ? "fill-amber-500 text-amber-500" : "text-stone-400"
              }`}
            />
            <span>{streak} streak</span>
          </motion.div>

          <button
            type="button"
            onClick={() => onRestart(true)}
            title="Shuffle questions in this set"
            className="inline-flex items-center gap-1 rounded-xl border border-stone-200 bg-white px-2.5 py-1.5 text-xs font-medium text-stone-600 transition hover:border-stone-300 hover:bg-stone-50"
          >
            <Shuffle className="h-3.5 w-3.5" />
            <span className="hidden sm:inline">Shuffle</span>
          </button>

          <button
            type="button"
            onClick={() => onRestart(false)}
            title="Restart lesson"
            className="inline-flex items-center justify-center rounded-xl border border-stone-200 bg-white p-1.5 text-stone-600 transition hover:border-stone-300 hover:bg-stone-50"
            aria-label="Restart lesson"
          >
            <RotateCcw className="h-3.5 w-3.5" />
          </button>
        </div>
      </div>

      {/* Animated Progress Bar */}
      <div className="flex items-center gap-3">
        <div className="h-2 flex-1 overflow-hidden rounded-full bg-stone-200/80">
          <motion.div
            className="h-full rounded-full bg-gradient-to-r from-amber-500 via-orange-500 to-emerald-500"
            initial={false}
            animate={{ width: `${progress}%` }}
            transition={{ type: "spring", stiffness: 160, damping: 24 }}
          />
        </div>
        <span className="text-xs font-semibold tabular-nums text-stone-500">
          {Math.min(currentIndex + 1, totalQuestions)} / {totalQuestions}
        </span>
      </div>
    </div>
  );
}
