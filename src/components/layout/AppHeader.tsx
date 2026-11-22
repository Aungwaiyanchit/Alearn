"use client";

import { BookCheck, Dices, PenLine, Target } from "lucide-react";
import { usePracticeStore } from "@/store/use-practice-store";

export function AppHeader() {
  const stats = usePracticeStore((state) => state.stats);
  const openRandomModal = usePracticeStore((state) => state.openRandomModal);

  return (
    <header className="sticky top-0 z-30 border-b border-stone-200/80 bg-[#F8F7F4]/90 backdrop-blur-md">
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-4 py-3.5 sm:px-6">
        {/* Brand */}
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-stone-900 text-amber-400 shadow-xs">
            <PenLine className="h-5 w-5" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-base font-bold tracking-tight text-stone-900">
                ALearn
              </span>
              <span className="rounded-full bg-amber-100 px-2 py-0.5 text-[10px] font-bold tracking-wide text-amber-800 uppercase">
                MM → EN
              </span>
            </div>
            <p className="font-myanmar text-xs text-stone-500">
              အင်္ဂလိပ်စာ ရေးသားမှု လေ့ကျင့်ရေး
            </p>
          </div>
        </div>

        {/* Persisted SQLite Progress Pills */}
        <div className="flex items-center gap-2.5">
          <div className="hidden items-center gap-2 rounded-2xl border border-stone-200/90 bg-white px-3.5 py-1.5 text-xs sm:flex">
            <BookCheck className="h-4 w-4 text-emerald-600" />
            <span className="font-semibold tabular-nums text-stone-900">
              {stats.masteredCount}/{stats.totalQuestions}
            </span>
            <span className="text-stone-400">mastered</span>
          </div>

          <div className="hidden items-center gap-2 rounded-2xl border border-stone-200/90 bg-white px-3.5 py-1.5 text-xs md:flex">
            <Target className="h-4 w-4 text-amber-500" />
            <span className="font-semibold tabular-nums text-stone-900">
              {stats.averageAccuracy}%
            </span>
            <span className="text-stone-400">accuracy</span>
          </div>

          <button
            type="button"
            onClick={openRandomModal}
            className="inline-flex items-center gap-1.5 rounded-xl bg-amber-500 px-3.5 py-2 text-xs font-semibold text-white shadow-xs transition hover:bg-amber-600"
          >
            <Dices className="h-3.5 w-3.5" />
            <span>New Random Set</span>
          </button>
        </div>
      </div>
    </header>
  );
}
