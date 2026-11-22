"use client";

import { AnimatePresence, motion } from "framer-motion";
import { Lightbulb } from "lucide-react";
import type { LessonQuestion } from "@/types/practice";

interface BurmesePromptCardProps {
  question: LessonQuestion;
  showHint: boolean;
  onToggleHint: () => void;
}

export function BurmesePromptCard({
  question,
  showHint,
  onToggleHint,
}: BurmesePromptCardProps) {
  return (
    <AnimatePresence mode="wait">
      <motion.section
        key={question.id}
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -8 }}
        transition={{ duration: 0.22, ease: [0.22, 1, 0.36, 1] }}
        className="rounded-2xl border border-slate-200/80 bg-white p-6 shadow-xs sm:p-7"
      >
        <div className="flex flex-wrap items-center justify-between gap-2">
          <span className="text-xs font-semibold tracking-wide text-slate-400 uppercase">
            Translate into English ·{" "}
            <span className="font-myanmar font-normal normal-case text-slate-500">
              အင်္ဂလိပ်လို ရေးပါ
            </span>
          </span>

          {question.categoryName && (
            <span className="rounded-md bg-slate-100 px-2 py-0.5 text-[11px] font-medium text-slate-600">
              {question.categoryName}
            </span>
          )}
        </div>

        {/* Burmese Question */}
        <p className="mt-4 font-myanmar text-2xl leading-relaxed font-semibold text-slate-900 sm:text-[1.65rem]">
          {question.burmesePrompt}
        </p>

        {/* Hint Toggle */}
        <div className="mt-5 flex flex-col gap-2.5">
          <div>
            <button
              type="button"
              onClick={onToggleHint}
              className={`inline-flex items-center gap-1.5 rounded-lg border px-3 py-1.5 text-xs font-semibold transition ${
                showHint
                  ? "border-amber-200 bg-amber-50 text-amber-800"
                  : "border-slate-200 bg-slate-50 text-slate-600 hover:border-slate-300 hover:bg-slate-100"
              }`}
            >
              <Lightbulb className="h-3.5 w-3.5 text-amber-500" />
              <span>{showHint ? "Hide Hint" : "Show Hint"}</span>
              <span className="font-myanmar font-normal opacity-75">
                (အရိပ်အမြွက်)
              </span>
            </button>
          </div>

          <AnimatePresence initial={false}>
            {showHint && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.18 }}
                className="overflow-hidden"
              >
                <div className="rounded-xl border border-amber-200/80 bg-amber-50/70 px-4 py-3 text-xs text-amber-950">
                  <span className="font-semibold">Hint: </span>
                  <span className="font-myanmar">{question.hint}</span>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </motion.section>
    </AnimatePresence>
  );
}
