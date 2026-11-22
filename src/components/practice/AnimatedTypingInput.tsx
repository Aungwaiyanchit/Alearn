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
      ? "border-emerald-400 bg-emerald-50/35 ring-4 ring-emerald-400/15"
      : "border-rose-300 bg-rose-50/25 ring-4 ring-rose-400/10"
    : "border-stone-200/90 bg-white focus-within:border-amber-400 focus-within:ring-4 focus-within:ring-amber-400/15";

  return (
    <motion.div
      key={`shake-${shakeCount}`}
      animate={
        shakeCount > 0 && evaluation && !evaluation.isCorrect
          ? { x: [0, -10, 10, -7, 7, -3, 3, 0] }
          : { x: 0 }
      }
      transition={{ duration: 0.42, ease: "easeInOut" }}
      className={`rounded-3xl border p-5 shadow-xs transition-all sm:p-6 ${borderStyle}`}
    >
      {/* Typing Header with Kinetic Pulse Bars */}
      <div className="mb-3 flex items-center justify-between gap-3">
        <div className="flex items-center gap-2 text-xs font-semibold text-stone-500">
          <Keyboard className="h-4 w-4 text-amber-500" />
          <span>Your English Answer</span>
          {/* Live keystroke equalizer animation */}
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
                      ? "bg-amber-500"
                      : "bg-stone-300"
                }`}
              />
            ))}
          </div>
        </div>

        <div className="flex items-center gap-2 text-[11px] font-medium tabular-nums text-stone-400">
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
        className="w-full resize-none bg-transparent text-lg leading-relaxed font-medium text-stone-900 placeholder:text-stone-400 focus:outline-none disabled:cursor-default disabled:opacity-80 sm:text-xl"
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
                  initial={{ opacity: 0, scale: 0.72, y: 6 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.75, y: -4 }}
                  transition={{ type: "spring", stiffness: 460, damping: 26 }}
                  className="inline-flex items-center rounded-lg border border-amber-200/80 bg-amber-50/70 px-2.5 py-0.5 text-xs font-medium text-amber-900"
                >
                  {word.text}
                </motion.span>
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Footer Actions & Keyboard Shortcuts */}
      <div className="mt-4 flex flex-wrap items-center justify-between gap-3 border-t border-stone-100 pt-4">
        <div className="flex items-center gap-3 text-[11px] text-stone-400">
          <span className="inline-flex items-center gap-1">
            <kbd className="rounded-md border border-stone-200 bg-stone-100 px-1.5 py-0.5 font-mono text-[10px] text-stone-600">
              Enter
            </kbd>
            <span>{evaluation ? "Next" : "Check"}</span>
          </span>
          <span className="hidden items-center gap-1 sm:inline-flex">
            <kbd className="rounded-md border border-stone-200 bg-stone-100 px-1.5 py-0.5 font-mono text-[10px] text-stone-600">
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
              className="inline-flex items-center gap-1.5 rounded-xl border border-stone-200 bg-stone-50 px-3 py-2 text-xs font-medium text-stone-600 transition hover:bg-stone-100"
            >
              <Eraser className="h-3.5 w-3.5" />
              <span>Clear</span>
            </button>
          )}

          {!evaluation ? (
            <motion.button
              type="button"
              disabled={!value.trim()}
              whileHover={value.trim() ? { scale: 1.02 } : undefined}
              whileTap={value.trim() ? { scale: 0.97 } : undefined}
              onClick={onSubmit}
              className="inline-flex items-center gap-2 rounded-xl bg-stone-900 px-5 py-2.5 text-sm font-semibold text-white shadow-xs transition hover:bg-stone-800 disabled:cursor-not-allowed disabled:bg-stone-300"
            >
              <Check className="h-4 w-4" />
              <span>Check Answer</span>
              <CornerDownLeft className="h-3.5 w-3.5 opacity-60" />
            </motion.button>
          ) : (
            <motion.button
              type="button"
              initial={{ scale: 0.94, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.97 }}
              onClick={onNext}
              className="inline-flex items-center gap-2 rounded-xl bg-emerald-600 px-5 py-2.5 text-sm font-semibold text-white shadow-xs transition hover:bg-emerald-700"
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
