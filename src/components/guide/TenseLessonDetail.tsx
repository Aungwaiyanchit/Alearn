"use client";

import { AnimatePresence, motion } from "framer-motion";
import {
  AlertCircle,
  ArrowRight,
  CheckCircle2,
  Clock,
  Sparkles,
} from "lucide-react";
import Link from "next/link";
import { TenseTimelineVisual } from "@/components/guide/TenseTimelineVisual";
import { TENSE_LESSONS } from "@/data/lessons-guide-data";
import { DIFFICULTY_STYLES } from "@/lib/category-styles";
import { useGuideStore } from "@/store/use-guide-store";

export function TenseLessonDetail() {
  const selectedLessonId = useGuideStore((state) => state.selectedLessonId);
  const lesson =
    TENSE_LESSONS.find((item) => item.id === selectedLessonId) ??
    TENSE_LESSONS[0];

  if (!lesson) {
    return null;
  }

  const levelStyle = DIFFICULTY_STYLES[lesson.level];

  return (
    <AnimatePresence mode="wait">
      <motion.article
        key={lesson.id}
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -8 }}
        transition={{ duration: 0.24, ease: [0.22, 1, 0.36, 1] }}
        className="flex flex-col gap-5 rounded-3xl border border-stone-200/90 bg-white p-6 shadow-xs sm:p-7"
      >
        {/* Header */}
        <div className="flex flex-wrap items-start justify-between gap-3 border-b border-stone-100 pb-4">
          <div>
            <div className="flex flex-wrap items-center gap-2">
              <h2 className="text-xl font-bold text-stone-900 sm:text-2xl">
                {lesson.title}
              </h2>
              <span
                className={`rounded-full border px-2.5 py-0.5 text-[11px] font-semibold ${levelStyle.className}`}
              >
                {levelStyle.label}
              </span>
            </div>
            <p className="mt-1 font-myanmar text-sm font-medium text-amber-800">
              {lesson.burmeseTitle}
            </p>
            <p className="mt-2 text-sm text-stone-700">{lesson.summary}</p>
            <p className="mt-1 font-myanmar text-xs leading-relaxed text-stone-500">
              {lesson.burmeseSummary}
            </p>
          </div>

          <Link
            href={`/practice?category=${lesson.practiceCategoryId}`}
            className="inline-flex shrink-0 items-center gap-1.5 rounded-xl bg-amber-500 px-4 py-2 text-xs font-semibold text-white shadow-xs transition hover:bg-amber-600"
          >
            <span>Practice This Now</span>
            <ArrowRight className="h-3.5 w-3.5" />
          </Link>
        </div>

        {/* Visual Timeline */}
        <TenseTimelineVisual
          type={lesson.timelineType}
          caption={lesson.timelineCaption}
        />

        {/* Sentence Structure Formulas */}
        <div>
          <h3 className="text-xs font-semibold tracking-wide text-stone-400 uppercase">
            Sentence Structure Formula
          </h3>
          <div className="mt-2.5 grid grid-cols-1 gap-2.5 sm:grid-cols-3">
            <div className="rounded-2xl border border-emerald-200/80 bg-emerald-50/50 p-3.5">
              <span className="text-[11px] font-bold text-emerald-700 uppercase">
                + Positive
              </span>
              <p className="mt-1 font-mono text-xs font-semibold text-stone-800">
                {lesson.formula.positive}
              </p>
            </div>
            <div className="rounded-2xl border border-rose-200/80 bg-rose-50/40 p-3.5">
              <span className="text-[11px] font-bold text-rose-700 uppercase">
                − Negative
              </span>
              <p className="mt-1 font-mono text-xs font-semibold text-stone-800">
                {lesson.formula.negative}
              </p>
            </div>
            <div className="rounded-2xl border border-sky-200/80 bg-sky-50/50 p-3.5">
              <span className="text-[11px] font-bold text-sky-700 uppercase">
                ? Question
              </span>
              <p className="mt-1 font-mono text-xs font-semibold text-stone-800">
                {lesson.formula.question}
              </p>
            </div>
          </div>
        </div>

        {/* When to Use + Signal Words */}
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          <div className="rounded-2xl border border-stone-200/80 bg-stone-50/60 p-4">
            <div className="flex items-center gap-1.5 text-xs font-semibold text-stone-700">
              <Sparkles className="h-3.5 w-3.5 text-amber-500" />
              <span>When to Use</span>
            </div>
            <ul className="mt-2 space-y-1.5 text-xs leading-relaxed text-stone-600">
              {lesson.whenToUse.map((point) => (
                <li key={point} className="flex items-start gap-2">
                  <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-amber-500" />
                  <span>{point}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="rounded-2xl border border-stone-200/80 bg-stone-50/60 p-4">
            <div className="flex items-center gap-1.5 text-xs font-semibold text-stone-700">
              <Clock className="h-3.5 w-3.5 text-indigo-500" />
              <span>Signal Words (Clues)</span>
            </div>
            <div className="mt-2.5 flex flex-wrap gap-1.5">
              {lesson.signalWords.map((word) => (
                <span
                  key={word}
                  className="rounded-lg border border-stone-200 bg-white px-2.5 py-1 text-xs font-medium text-stone-700"
                >
                  {word}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Burmese -> English Worked Examples */}
        <div>
          <h3 className="text-xs font-semibold tracking-wide text-stone-400 uppercase">
            Burmese → English Examples
          </h3>
          <div className="mt-2.5 flex flex-col gap-2.5">
            {lesson.examples.map((example) => (
              <div
                key={example.id}
                className="rounded-2xl border border-stone-200/80 bg-stone-50/50 p-4"
              >
                <p className="font-myanmar text-sm font-semibold text-stone-800">
                  {example.burmese}
                </p>
                <div className="mt-1.5 flex flex-wrap items-center gap-2">
                  <p className="text-sm font-bold text-emerald-800">
                    {example.english}
                  </p>
                  <span className="rounded-md bg-amber-100 px-2 py-0.5 font-mono text-[11px] font-semibold text-amber-900">
                    {example.highlight}
                  </span>
                </div>
                <p className="mt-1.5 text-xs text-stone-500">{example.note}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Common Mistake Callout */}
        <div className="rounded-2xl border border-rose-200/80 bg-rose-50/40 p-4">
          <div className="flex items-center gap-1.5 text-xs font-bold text-rose-800">
            <AlertCircle className="h-4 w-4" />
            <span>Common Mistake to Watch Out For</span>
          </div>
          <div className="mt-2.5 grid grid-cols-1 gap-2 sm:grid-cols-2">
            <div className="rounded-xl border border-rose-200 bg-white px-3.5 py-2.5 text-xs">
              <span className="font-bold text-rose-600">✗ Avoid: </span>
              <span className="text-stone-700 line-through">
                {lesson.mistake.wrong}
              </span>
            </div>
            <div className="rounded-xl border border-emerald-200 bg-white px-3.5 py-2.5 text-xs">
              <span className="inline-flex items-center gap-1 font-bold text-emerald-700">
                <CheckCircle2 className="h-3.5 w-3.5" />
                Write:{" "}
              </span>
              <span className="font-semibold text-stone-900">
                {lesson.mistake.correct}
              </span>
            </div>
          </div>
          <p className="mt-2 text-xs text-stone-600">{lesson.mistake.reason}</p>
        </div>
      </motion.article>
    </AnimatePresence>
  );
}
