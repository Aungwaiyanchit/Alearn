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
            <h1 className="text-lg font-bold tracking-tight text-slate-900 sm:text-xl">
              {categoryTitle}
            </h1>
            {diffStyle && (
              <span
                className={`rounded-md border px-2 py-0.5 text-[11px] font-semibold ${diffStyle.className}`}
              >
                {diffStyle.label}
              </span>
            )}
          </div>
          <p className="font-myanmar text-xs text-slate-500">
            {categoryBurmese}
          </p>
        </div>

        <div className="flex items-center gap-2">
          <motion.div
            key={streak}
            initial={streak > 0 ? { scale: 1.2 } : false}
            animate={{ scale: 1 }}
            transition={{ type: "spring", stiffness: 400, damping: 18 }}
            className={`inline-flex items-center gap-1.5 rounded-lg border px-2.5 py-1.5 text-xs font-semibold tabular-nums ${
              streak > 0
                ? "border-amber-200 bg-amber-50 text-amber-700"
                : "border-slate-200 bg-white text-slate-500"
            }`}
          >
            <Flame
              className={`h-3.5 w-3.5 ${
                streak > 0 ? "fill-amber-500 text-amber-500" : "text-slate-400"
              }`}
            />
            <span>{streak}</span>
          </motion.div>

          <button
            type="button"
            onClick={() => onRestart(true)}
            title="Shuffle questions in this set"
            className="inline-flex items-center gap-1 rounded-lg border border-slate-200 bg-white px-2.5 py-1.5 text-xs font-medium text-slate-600 transition hover:bg-slate-50"
          >
            <Shuffle className="h-3.5 w-3.5" />
            <span className="hidden sm:inline">Shuffle</span>
          </button>

          <button
            type="button"
            onClick={() => onRestart(false)}
            title="Restart lesson"
            className="inline-flex items-center justify-center rounded-lg border border-slate-200 bg-white p-1.5 text-slate-600 transition hover:bg-slate-50"
            aria-label="Restart lesson"
          >
            <RotateCcw className="h-3.5 w-3.5" />
          </button>
        </div>
      </div>

      {/* Clean Progress Bar */}
      <div className="flex items-center gap-3">
        <div className="h-1.5 flex-1 overflow-hidden rounded-full bg-slate-200/80">
          <motion.div
            className="h-full rounded-full bg-blue-600"
            initial={false}
            animate={{ width: `${progress}%` }}
            transition={{ type: "spring", stiffness: 160, damping: 24 }}
          />
        </div>
        <span className="text-xs font-semibold tabular-nums text-slate-500">
          {Math.min(currentIndex + 1, totalQuestions)} / {totalQuestions}
        </span>
      </div>
    </div>
  );
}
