"use client";

import {
  BookOpen,
  FolderKanban,
  RotateCcw,
  Target,
  TrendingUp,
} from "lucide-react";
import { useState } from "react";
import { useAdminStore } from "@/store/use-admin-store";

export function AdminStatsBar() {
  const categories = useAdminStore((state) => state.categories);
  const questions = useAdminStore((state) => state.questions);
  const stats = useAdminStore((state) => state.stats);
  const isSaving = useAdminStore((state) => state.isSaving);
  const resetProgress = useAdminStore((state) => state.resetProgress);
  const [confirmingReset, setConfirmingReset] = useState(false);

  const handleConfirmReset = async () => {
    setConfirmingReset(false);
    await resetProgress();
  };

  return (
    <section className="grid grid-cols-2 gap-3 sm:grid-cols-4">
      <div className="rounded-2xl border border-stone-200/90 bg-white p-4 shadow-xs">
        <div className="flex items-center justify-between text-xs font-medium text-stone-500">
          <span>Categories</span>
          <FolderKanban className="h-4 w-4 text-amber-500" />
        </div>
        <div className="mt-2 text-2xl font-bold tabular-nums text-stone-900">
          {categories.length}
        </div>
        <p className="mt-0.5 text-[11px] text-stone-400">
          {categories.filter((cat) => cat.isRandom).length} custom random
        </p>
      </div>

      <div className="rounded-2xl border border-stone-200/90 bg-white p-4 shadow-xs">
        <div className="flex items-center justify-between text-xs font-medium text-stone-500">
          <span>Questions</span>
          <BookOpen className="h-4 w-4 text-indigo-500" />
        </div>
        <div className="mt-2 text-2xl font-bold tabular-nums text-stone-900">
          {questions.length}
        </div>
        <p className="mt-0.5 text-[11px] text-stone-400">
          {stats.masteredCount} mastered locally
        </p>
      </div>

      <div className="rounded-2xl border border-stone-200/90 bg-white p-4 shadow-xs">
        <div className="flex items-center justify-between text-xs font-medium text-stone-500">
          <span>Avg Accuracy</span>
          <Target className="h-4 w-4 text-emerald-500" />
        </div>
        <div className="mt-2 text-2xl font-bold tabular-nums text-stone-900">
          {stats.averageAccuracy}%
        </div>
        <p className="mt-0.5 text-[11px] text-stone-400">
          {stats.totalAttempts} total attempts
        </p>
      </div>

      <div className="flex flex-col justify-between rounded-2xl border border-stone-200/90 bg-white p-4 shadow-xs">
        <div className="flex items-center justify-between text-xs font-medium text-stone-500">
          <span>Practice Data</span>
          <TrendingUp className="h-4 w-4 text-rose-500" />
        </div>

        {confirmingReset ? (
          <div className="mt-2 flex items-center gap-1.5">
            <button
              type="button"
              disabled={isSaving}
              onClick={handleConfirmReset}
              className="flex-1 rounded-lg bg-rose-600 px-2.5 py-1.5 text-[11px] font-semibold text-white transition hover:bg-rose-700 disabled:opacity-60"
            >
              Confirm Reset
            </button>
            <button
              type="button"
              onClick={() => setConfirmingReset(false)}
              className="rounded-lg border border-stone-200 px-2 py-1.5 text-[11px] font-medium text-stone-600 hover:bg-stone-50"
            >
              Cancel
            </button>
          </div>
        ) : (
          <button
            type="button"
            disabled={isSaving || stats.totalAttempts === 0}
            onClick={() => setConfirmingReset(true)}
            className="mt-2 inline-flex items-center justify-center gap-1.5 rounded-xl border border-stone-200 bg-stone-50 px-3 py-2 text-xs font-semibold text-stone-700 transition hover:border-rose-200 hover:bg-rose-50 hover:text-rose-700 disabled:cursor-not-allowed disabled:opacity-50"
          >
            <RotateCcw className="h-3.5 w-3.5" />
            <span>Reset Attempts</span>
          </button>
        )}
      </div>
    </section>
  );
}
