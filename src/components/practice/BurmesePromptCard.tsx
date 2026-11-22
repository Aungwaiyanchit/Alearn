"use client";

import { AnimatePresence, motion } from "framer-motion";
import { Lightbulb, Sparkles } from "lucide-react";
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
        initial={{ opacity: 0, y: 14, scale: 0.985 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: -12, scale: 0.985 }}
        transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
        className="relative overflow-hidden rounded-3xl border border-stone-200/90 bg-white p-6 shadow-xs sm:p-7"
      >
        <div className="flex flex-wrap items-center justify-between gap-2">
          <div className="inline-flex items-center gap-1.5 rounded-full bg-stone-100 px-3 py-1 text-xs font-medium text-stone-600">
            <Sparkles className="h-3.5 w-3.5 text-amber-500" />
            <span>Translate into English</span>
            <span className="text-stone-300">·</span>
            <span className="font-myanmar text-stone-500">အင်္ဂလိပ်လို ရေးပါ</span>
          </div>

          {question.categoryName && (
            <span className="rounded-full border border-stone-200 bg-stone-50 px-2.5 py-0.5 text-[11px] font-medium text-stone-500">
              {question.categoryName}
            </span>
          )}
        </div>

        {/* Burmese Question */}
        <motion.p
          initial={{ opacity: 0, y: 6 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.06, duration: 0.3 }}
          className="mt-5 font-myanmar text-2xl leading-relaxed font-semibold text-stone-900 sm:text-[1.75rem]"
        >
          {question.burmesePrompt}
        </motion.p>

        {/* Hint Trigger + Expandable Drawer */}
        <div className="mt-5 flex flex-col gap-2.5">
          <div>
            <button
              type="button"
              onClick={onToggleHint}
              className={`inline-flex items-center gap-1.5 rounded-xl border px-3 py-1.5 text-xs font-semibold transition ${
                showHint
                  ? "border-amber-300 bg-amber-50 text-amber-800"
                  : "border-stone-200 bg-stone-50 text-stone-600 hover:border-amber-300 hover:bg-amber-50/50 hover:text-amber-800"
              }`}
            >
              <Lightbulb className="h-3.5 w-3.5" />
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
                transition={{ duration: 0.2 }}
                className="overflow-hidden"
              >
                <div className="rounded-2xl border border-amber-200/80 bg-amber-50/70 px-4 py-3 text-sm text-amber-950">
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
