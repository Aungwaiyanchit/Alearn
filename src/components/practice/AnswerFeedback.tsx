"use client";

import { motion } from "framer-motion";
import {
  ArrowRight,
  BookMarked,
  CheckCircle2,
  RotateCcw,
  XCircle,
} from "lucide-react";
import type { EvaluationResult, LessonQuestion } from "@/types/practice";

interface AnswerFeedbackProps {
  question: LessonQuestion;
  evaluation: EvaluationResult;
  isLastQuestion: boolean;
  onRetry: () => void;
  onNext: () => void;
}

export function AnswerFeedback({
  question,
  evaluation,
  isLastQuestion,
  onRetry,
  onNext,
}: AnswerFeedbackProps) {
  const isCorrect = evaluation.isCorrect;

  return (
    <motion.section
      initial={{ opacity: 0, y: 16, scale: 0.98 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: 8 }}
      transition={{ type: "spring", stiffness: 280, damping: 24 }}
      className={`rounded-2xl border p-5 shadow-xs sm:p-6 ${
        isCorrect
          ? "border-emerald-200 bg-emerald-50/50"
          : "border-rose-200 bg-rose-50/40"
      }`}
    >
      {/* Status Banner */}
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-2.5">
          {isCorrect ? (
            <CheckCircle2 className="h-6 w-6 shrink-0 text-emerald-600" />
          ) : (
            <XCircle className="h-6 w-6 shrink-0 text-rose-500" />
          )}
          <div>
            <h3
              className={`text-sm font-bold ${
                isCorrect ? "text-emerald-900" : "text-rose-900"
              }`}
            >
              {isCorrect ? "Well written!" : "Almost there — let's refine it"}
            </h3>
            <p
              className={`text-xs ${
                isCorrect ? "text-emerald-700" : "text-rose-700"
              }`}
            >
              {evaluation.feedbackMessage}
            </p>
          </div>
        </div>

        <span
          className={`rounded-full px-3 py-1 text-xs font-bold tabular-nums ${
            isCorrect ? "bg-emerald-600 text-white" : "bg-rose-600 text-white"
          }`}
        >
          {evaluation.accuracy}% match
        </span>
      </div>

      {/* Word-by-Word Animated Diff */}
      <div className="mt-4 rounded-2xl border border-stone-200/80 bg-white p-4">
        <span className="text-[11px] font-semibold tracking-wide text-stone-400 uppercase">
          Word Breakdown
        </span>
        <div className="mt-2 flex flex-wrap gap-1.5">
          {evaluation.wordTokens.map((token, index) => {
            const key = `${index}-${token.status}-${token.word}`;
            if (token.status === "correct") {
              return (
                <motion.span
                  key={key}
                  initial={{ opacity: 0, y: 5 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.03 }}
                  className="rounded-lg border border-emerald-200 bg-emerald-50 px-2.5 py-1 text-sm font-medium text-emerald-800"
                >
                  {token.word}
                </motion.span>
              );
            }

            if (token.status === "incorrect") {
              return (
                <motion.span
                  key={key}
                  initial={{ opacity: 0, y: 5 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.03 }}
                  className="inline-flex items-center gap-1 rounded-lg border border-rose-200 bg-rose-50 px-2.5 py-1 text-sm font-medium text-rose-800"
                >
                  <span className="line-through opacity-70">{token.word}</span>
                  {token.expected && (
                    <span className="font-semibold text-emerald-700">
                      → {token.expected}
                    </span>
                  )}
                </motion.span>
              );
            }

            if (token.status === "missing") {
              return (
                <motion.span
                  key={key}
                  initial={{ opacity: 0, y: 5 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.03 }}
                  className="rounded-lg border border-dashed border-amber-300 bg-amber-50 px-2.5 py-1 text-sm font-medium text-amber-800"
                >
                  + {token.word}
                </motion.span>
              );
            }

            return (
              <motion.span
                key={key}
                initial={{ opacity: 0, y: 5 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.03 }}
                className="rounded-lg border border-stone-200 bg-stone-100 px-2.5 py-1 text-sm font-medium text-stone-500 line-through"
              >
                {token.word}
              </motion.span>
            );
          })}
        </div>

        {/* Model Answer */}
        <div className="mt-4 border-t border-stone-100 pt-3">
          <div className="text-[11px] font-semibold tracking-wide text-stone-400 uppercase">
            Model English Sentence
          </div>
          <p className="mt-1 text-base font-semibold text-stone-900">
            {evaluation.matchedTarget}
          </p>

          {question.acceptedAnswers.length > 0 && (
            <p className="mt-1.5 text-xs text-stone-500">
              <span className="font-medium text-stone-600">Also natural: </span>
              {question.acceptedAnswers
                .filter((answer) => answer !== evaluation.matchedTarget)
                .slice(0, 2)
                .join("  ·  ")}
            </p>
          )}
        </div>
      </div>

      {/* Grammar Note */}
      <div className="mt-3 flex items-start gap-2.5 rounded-2xl border border-stone-200/70 bg-white/80 px-4 py-3 text-xs leading-relaxed text-stone-700">
        <BookMarked className="mt-0.5 h-4 w-4 shrink-0 text-amber-600" />
        <div>
          <span className="font-semibold text-stone-900">Grammar tip: </span>
          {question.grammarNote}
        </div>
      </div>

      {/* Action Buttons */}
      <div className="mt-4 flex flex-wrap items-center justify-end gap-2.5">
        {!isCorrect && (
          <button
            type="button"
            onClick={onRetry}
            className="inline-flex items-center gap-1.5 rounded-xl border border-stone-300 bg-white px-4 py-2 text-xs font-semibold text-stone-700 transition hover:bg-stone-50"
          >
            <RotateCcw className="h-3.5 w-3.5" />
            <span>Try Again</span>
          </button>
        )}
        <motion.button
          type="button"
          whileTap={{ scale: 0.98 }}
          onClick={onNext}
          className="inline-flex items-center gap-1.5 rounded-xl bg-blue-600 px-5 py-2 text-xs font-semibold text-white transition hover:bg-blue-700"
        >
          <span>{isLastQuestion ? "Finish Session" : "Next Question"}</span>
          <ArrowRight className="h-3.5 w-3.5" />
        </motion.button>
      </div>
    </motion.section>
  );
}
