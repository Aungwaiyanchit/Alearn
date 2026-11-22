"use client";

import { motion } from "framer-motion";
import {
  CheckCircle2,
  Flame,
  RotateCcw,
  Shuffle,
  Trophy,
  XCircle,
} from "lucide-react";
import type { SessionResultItem } from "@/types/practice";

interface SessionSummaryProps {
  categoryTitle: string;
  results: SessionResultItem[];
  bestStreak: number;
  onRestart: (shuffle: boolean) => void;
  onRandomMix: () => void;
}

export function SessionSummary({
  categoryTitle,
  results,
  bestStreak,
  onRestart,
  onRandomMix,
}: SessionSummaryProps) {
  const correctCount = results.filter(
    (item) => item.evaluation.isCorrect,
  ).length;
  const averageAccuracy =
    results.length > 0
      ? Math.round(
          results.reduce((sum, item) => sum + item.evaluation.accuracy, 0) /
            results.length,
        )
      : 0;

  return (
    <motion.section
      initial={{ opacity: 0, y: 18, scale: 0.97 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ type: "spring", stiffness: 240, damping: 22 }}
      className="rounded-3xl border border-stone-200 bg-white p-6 shadow-sm sm:p-8"
    >
      <div className="flex flex-col items-center text-center">
        <motion.div
          initial={{ scale: 0, rotate: -18 }}
          animate={{ scale: 1, rotate: 0 }}
          transition={{
            type: "spring",
            stiffness: 320,
            damping: 18,
            delay: 0.1,
          }}
          className="flex h-16 w-16 items-center justify-center rounded-2xl bg-amber-100 text-amber-600"
        >
          <Trophy className="h-8 w-8" />
        </motion.div>

        <h2 className="mt-4 text-2xl font-bold text-stone-900">
          Lesson Complete!
        </h2>
        <p className="mt-1 font-myanmar text-sm text-stone-500">
          {categoryTitle} သင်ခန်းစာကို အောင်မြင်စွာ လေ့ကျင့်ပြီးပါပြီ။
        </p>

        {/* Key Metrics */}
        <div className="mt-6 grid w-full max-w-md grid-cols-3 gap-3">
          <div className="rounded-2xl border border-stone-200 bg-stone-50/70 p-3.5">
            <div className="text-2xl font-bold tabular-nums text-emerald-600">
              {correctCount}/{results.length}
            </div>
            <div className="mt-0.5 text-[11px] font-medium text-stone-500">
              Correct
            </div>
          </div>

          <div className="rounded-2xl border border-stone-200 bg-stone-50/70 p-3.5">
            <div className="text-2xl font-bold tabular-nums text-amber-600">
              {averageAccuracy}%
            </div>
            <div className="mt-0.5 text-[11px] font-medium text-stone-500">
              Avg Accuracy
            </div>
          </div>

          <div className="rounded-2xl border border-stone-200 bg-stone-50/70 p-3.5">
            <div className="inline-flex items-center justify-center gap-1 text-2xl font-bold tabular-nums text-stone-900">
              <Flame className="h-5 w-5 fill-amber-500 text-amber-500" />
              <span>{bestStreak}</span>
            </div>
            <div className="mt-0.5 text-[11px] font-medium text-stone-500">
              Best Streak
            </div>
          </div>
        </div>

        {/* Actions */}
        <div className="mt-6 flex flex-wrap items-center justify-center gap-2.5">
          <button
            type="button"
            onClick={() => onRestart(false)}
            className="inline-flex items-center gap-2 rounded-xl border border-stone-200 bg-white px-4 py-2.5 text-sm font-semibold text-stone-800 transition hover:bg-stone-50"
          >
            <RotateCcw className="h-4 w-4" />
            <span>Practice Again</span>
          </button>

          <button
            type="button"
            onClick={() => onRestart(true)}
            className="inline-flex items-center gap-2 rounded-xl border border-stone-200 bg-stone-100 px-4 py-2.5 text-sm font-semibold text-stone-800 transition hover:bg-stone-200/70"
          >
            <Shuffle className="h-4 w-4" />
            <span>Shuffle Set</span>
          </button>

          <button
            type="button"
            onClick={onRandomMix}
            className="inline-flex items-center gap-2 rounded-xl bg-amber-500 px-5 py-2.5 text-sm font-semibold text-white shadow-xs transition hover:bg-amber-600"
          >
            <Shuffle className="h-4 w-4" />
            <span>Try Random Mix</span>
          </button>
        </div>
      </div>

      {/* Review List */}
      {results.length > 0 && (
        <div className="mt-8 border-t border-stone-100 pt-6">
          <h3 className="text-xs font-semibold tracking-wide text-stone-400 uppercase">
            Session Recap
          </h3>
          <div className="mt-3 flex flex-col gap-2.5">
            {results.map((item, index) => (
              <motion.div
                key={item.question.id}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.04 }}
                className="rounded-2xl border border-stone-200/80 bg-stone-50/50 p-3.5"
              >
                <div className="flex items-start justify-between gap-2">
                  <p className="font-myanmar text-sm font-medium text-stone-800">
                    {item.question.burmesePrompt}
                  </p>
                  {item.evaluation.isCorrect ? (
                    <CheckCircle2 className="h-4 w-4 shrink-0 text-emerald-600" />
                  ) : (
                    <XCircle className="h-4 w-4 shrink-0 text-rose-500" />
                  )}
                </div>
                <p className="mt-1.5 text-xs text-stone-600">
                  <span className="font-semibold text-stone-800">You: </span>
                  {item.userAnswer}
                </p>
                {!item.evaluation.isCorrect && (
                  <p className="mt-0.5 text-xs text-emerald-700">
                    <span className="font-semibold">Model: </span>
                    {item.evaluation.matchedTarget}
                  </p>
                )}
              </motion.div>
            ))}
          </div>
        </div>
      )}
    </motion.section>
  );
}
