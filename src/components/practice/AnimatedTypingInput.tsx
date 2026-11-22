"use client";

import { AnimatePresence, motion } from "framer-motion";
import {
  ArrowRight,
  Check,
  CornerDownLeft,
  Eraser,
  Keyboard,
} from "lucide-react";
import { useEffect, useMemo, useRef } from "react";
import type { EvaluationResult } from "@/types/practice";

interface AnimatedTypingInputProps {
  questionId: string;
  value: string;
  keystrokePulse: number;
  shakeCount: number;
  evaluation: EvaluationResult | null;
  onChange: (value: string) => void;
  onSubmit: () => void;
  onNext: () => void;
  onToggleHint: () => void;
}

const RHYTHM_BARS = [0.4, 0.75, 1, 0.65, 0.9] as const;

export function AnimatedTypingInput({
  questionId,
  value,
  keystrokePulse,
  shakeCount,
  evaluation,
  onChange,
  onSubmit,
  onNext,
  onToggleHint,
}: AnimatedTypingInputProps) {
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    if (!evaluation && questionId) {
      textareaRef.current?.focus();
    }
  }, [questionId, evaluation]);

  const typedWords = useMemo(() => {
    const rawWords = value
      .trim()
      .split(/\s+/)
      .filter((word) => word.length > 0);
    const counts = new Map<string, number>();

    return rawWords.map((word) => {
      const seen = counts.get(word) ?? 0;
      counts.set(word, seen + 1);
      return { id: `${word}-${seen}`, text: word };
    });
  }, [value]);

  const handleKeyDown = (event: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (event.key === "Enter" && event.shiftKey) {
      event.preventDefault();
      onToggleHint();
      return;
    }

    if (event.key === "Enter" && !event.shiftKey) {
      event.preventDefault();
      if (evaluation) {
        onNext();
      } else if (value.trim()) {
        onSubmit();
      }
      return;
    }

    if (event.key === "Escape" && !evaluation) {
      onChange("");
    }
  };

  const borderStyle = evaluation
    ? evaluation.isCorrect
      ? "border-emerald-400 bg-emerald-50/30 ring-4 ring-emerald-500/10"
      : "border-rose-300 bg-rose-50/25 ring-4 ring-rose-500/10"
    : "border-slate-200/90 bg-white focus-within:border-blue-500 focus-within:ring-4 focus-within:ring-blue-500/10";

  return (
    <motion.div
      key={`shake-${shakeCount}`}
      animate={
        shakeCount > 0 && evaluation && !evaluation.isCorrect
          ? { x: [0, -8, 8, -5, 5, -2, 2, 0] }
          : { x: 0 }
      }
      transition={{ duration: 0.38, ease: "easeInOut" }}
      className={`rounded-2xl border p-5 shadow-xs transition-all sm:p-6 ${borderStyle}`}
    >
      {/* Header + Kinetic Keystroke Bars */}
      <div className="mb-3 flex items-center justify-between gap-3">
        <div className="flex items-center gap-2 text-xs font-semibold text-slate-500">
          <Keyboard className="h-4 w-4 text-blue-600" />
          <span>Your English Answer</span>
          <div className="ml-1 flex h-3.5 items-end gap-0.5" aria-hidden="true">
            {RHYTHM_BARS.map((multiplier, index) => (
              <motion.span
                key={`bar-${multiplier}`}
                animate={{
                  scaleY:
                    value.length > 0 && !evaluation
                      ? [
                          0.35,
                          Math.min(
                            1,
                            0.45 +
                              ((keystrokePulse + index) % 4) *
                                0.18 *
                                multiplier,
                          ),
                          0.35,
                        ]
                      : 0.28,
                }}
                transition={{ duration: 0.24, ease: "easeOut" }}
                className={`h-full w-0.5 origin-bottom rounded-full ${
                  evaluation?.isCorrect
                    ? "bg-emerald-500"
                    : value.length > 0
                      ? "bg-blue-600"
                      : "bg-slate-300"
                }`}
              />
            ))}
          </div>
        </div>

        <div className="flex items-center gap-2 text-[11px] font-medium tabular-nums text-slate-400">
          <span>
            {typedWords.length} {typedWords.length === 1 ? "word" : "words"}
          </span>
          <span>·</span>
          <span>{value.length} chars</span>
        </div>
      </div>

      {/* Main English Input */}
      <textarea
        ref={textareaRef}
        rows={3}
        value={value}
        disabled={Boolean(evaluation)}
        onChange={(event) => onChange(event.target.value)}
        onKeyDown={handleKeyDown}
        placeholder="Type your English sentence here..."
        spellCheck={false}
        autoComplete="off"
        className="w-full resize-none bg-transparent text-lg leading-relaxed font-medium text-slate-900 placeholder:text-slate-400 focus:outline-none disabled:cursor-default disabled:opacity-80 sm:text-xl"
      />

      {/* Live Animated Word Chips */}
      <div className="mt-2 min-h-8">
        <AnimatePresence mode="popLayout">
          {typedWords.length > 0 && !evaluation && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="flex flex-wrap gap-1.5"
            >
              {typedWords.map((word) => (
                <motion.span
                  key={word.id}
                  layout
                  initial={{ opacity: 0, scale: 0.78, y: 5 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.8, y: -4 }}
                  transition={{ type: "spring", stiffness: 460, damping: 26 }}
                  className="inline-flex items-center rounded-lg border border-blue-200/80 bg-blue-50/70 px-2.5 py-0.5 text-xs font-medium text-blue-800"
                >
                  {word.text}
                </motion.span>
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Footer Actions */}
      <div className="mt-4 flex flex-wrap items-center justify-between gap-3 border-t border-slate-100 pt-4">
        <div className="flex items-center gap-3 text-[11px] text-slate-400">
          <span className="inline-flex items-center gap-1">
            <kbd className="rounded-md border border-slate-200 bg-slate-100 px-1.5 py-0.5 font-mono text-[10px] text-slate-600">
              Enter
            </kbd>
            <span>{evaluation ? "Next" : "Check"}</span>
          </span>
          <span className="hidden items-center gap-1 sm:inline-flex">
            <kbd className="rounded-md border border-slate-200 bg-slate-100 px-1.5 py-0.5 font-mono text-[10px] text-slate-600">
              Shift+Enter
            </kbd>
            <span>Hint</span>
          </span>
        </div>

        <div className="flex items-center gap-2">
          {!evaluation && value.length > 0 && (
            <button
              type="button"
              onClick={() => onChange("")}
              className="inline-flex items-center gap-1.5 rounded-xl border border-slate-200 bg-white px-3 py-2 text-xs font-medium text-slate-600 transition hover:bg-slate-50"
            >
              <Eraser className="h-3.5 w-3.5" />
              <span>Clear</span>
            </button>
          )}

          {!evaluation ? (
            <motion.button
              type="button"
              disabled={!value.trim()}
              whileTap={value.trim() ? { scale: 0.98 } : undefined}
              onClick={onSubmit}
              className="inline-flex items-center gap-2 rounded-xl bg-blue-600 px-5 py-2.5 text-xs font-semibold text-white shadow-xs transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:bg-slate-300"
            >
              <Check className="h-4 w-4" />
              <span>Check Answer</span>
              <CornerDownLeft className="h-3.5 w-3.5 opacity-60" />
            </motion.button>
          ) : (
            <motion.button
              type="button"
              initial={{ scale: 0.96, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              whileTap={{ scale: 0.98 }}
              onClick={onNext}
              className="inline-flex items-center gap-2 rounded-xl bg-emerald-600 px-5 py-2.5 text-xs font-semibold text-white shadow-xs transition hover:bg-emerald-700"
            >
              <span>Continue</span>
              <ArrowRight className="h-4 w-4" />
            </motion.button>
          )}
        </div>
      </div>
    </motion.div>
  );
}
