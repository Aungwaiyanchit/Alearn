"use client";

import { AnimatePresence, motion } from "framer-motion";
import { ArrowLeft, ArrowRight, CheckCircle2, XCircle } from "lucide-react";
import Link from "next/link";
import { TenseTimelineVisual } from "@/components/guide/TenseTimelineVisual";
import { TENSE_LESSONS } from "@/data/lessons-guide-data";
import { DIFFICULTY_STYLES } from "@/lib/category-styles";
import { useGuideStore } from "@/store/use-guide-store";

export function TenseLessonDetail() {
  const selectedLessonId = useGuideStore((state) => state.selectedLessonId);
  const selectLesson = useGuideStore((state) => state.selectLesson);

  const currentIndex = Math.max(
    0,
    TENSE_LESSONS.findIndex((item) => item.id === selectedLessonId),
  );
  const lesson = TENSE_LESSONS[currentIndex] ?? TENSE_LESSONS[0];
  const prevLesson = currentIndex > 0 ? TENSE_LESSONS[currentIndex - 1] : null;
  const nextLesson =
    currentIndex < TENSE_LESSONS.length - 1
      ? TENSE_LESSONS[currentIndex + 1]
      : null;

  if (!lesson) {
    return null;
  }

  const levelStyle = DIFFICULTY_STYLES[lesson.level];

  return (
    <AnimatePresence mode="wait">
      <motion.article
        key={lesson.id}
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -6 }}
        transition={{ duration: 0.2, ease: [0.22, 1, 0.36, 1] }}
        className="flex flex-col gap-6 rounded-2xl border border-slate-200/80 bg-white p-6 shadow-xs sm:p-8"
      >
        {/* Lesson Title Header */}
        <div className="flex flex-wrap items-start justify-between gap-4 border-b border-slate-100 pb-5">
          <div className="max-w-xl">
            <div className="flex flex-wrap items-center gap-2">
              <span className="rounded-md bg-slate-100 px-2 py-0.5 text-[11px] font-semibold text-slate-600">
                {lesson.track === "tenses" ? "Tense" : "Grammar Rule"} ·{" "}
                {lesson.subgroup}
              </span>
              <span
                className={`rounded-md border px-2 py-0.5 text-[11px] font-semibold ${levelStyle.className}`}
              >
                {levelStyle.label}
              </span>
            </div>

            <h2 className="mt-2.5 text-xl font-bold tracking-tight text-slate-900 sm:text-2xl">
              {lesson.title}
            </h2>
            <p className="mt-1 font-myanmar text-sm font-medium text-blue-700">
              {lesson.burmeseTitle}
            </p>
            <p className="mt-3 text-sm leading-relaxed text-slate-600">
              {lesson.summary}
            </p>
            <p className="mt-1.5 font-myanmar text-xs leading-relaxed text-slate-500">
              {lesson.burmeseSummary}
            </p>
          </div>

          <Link
            href={`/practice?category=${lesson.practiceCategoryId}`}
            className="inline-flex shrink-0 items-center gap-1.5 rounded-xl bg-blue-600 px-4 py-2 text-xs font-semibold text-white shadow-xs transition hover:bg-blue-700"
          >
            <span>Practice This</span>
            <ArrowRight className="h-3.5 w-3.5" />
          </Link>
        </div>

        {/* Visual Timeline */}
        <TenseTimelineVisual
          type={lesson.timelineType}
          caption={lesson.timelineCaption}
        />

        {/* Unified Formula Table */}
        <div>
          <h3 className="text-xs font-semibold tracking-wider text-slate-400 uppercase">
            Formula
          </h3>
          <div className="mt-2.5 divide-y divide-slate-100 overflow-hidden rounded-xl border border-slate-200/80">
            <div className="grid grid-cols-1 gap-1 px-4 py-3 sm:grid-cols-12 sm:items-center">
              <span className="text-xs font-semibold text-emerald-700 sm:col-span-3">
                + Positive
              </span>
              <code className="font-mono text-xs font-medium text-slate-800 sm:col-span-9">
                {lesson.formula.positive}
              </code>
            </div>
            <div className="grid grid-cols-1 gap-1 bg-slate-50/50 px-4 py-3 sm:grid-cols-12 sm:items-center">
              <span className="text-xs font-semibold text-rose-700 sm:col-span-3">
                − Negative
              </span>
              <code className="font-mono text-xs font-medium text-slate-800 sm:col-span-9">
                {lesson.formula.negative}
              </code>
            </div>
            <div className="grid grid-cols-1 gap-1 px-4 py-3 sm:grid-cols-12 sm:items-center">
              <span className="text-xs font-semibold text-blue-700 sm:col-span-3">
                ? Question
              </span>
              <code className="font-mono text-xs font-medium text-slate-800 sm:col-span-9">
                {lesson.formula.question}
              </code>
            </div>
          </div>
        </div>

        {/* When to Use & Signal Words */}
        <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
          <div>
            <h3 className="text-xs font-semibold tracking-wider text-slate-400 uppercase">
              When to Use
            </h3>
            <ul className="mt-2.5 space-y-2 text-xs leading-relaxed text-slate-600">
              {lesson.whenToUse.map((point) => (
                <li key={point} className="flex items-start gap-2.5">
                  <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-blue-600" />
                  <span>{point}</span>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-xs font-semibold tracking-wider text-slate-400 uppercase">
              Key Signal Words
            </h3>
            <div className="mt-2.5 flex flex-wrap gap-1.5">
              {lesson.signalWords.map((word) => (
                <span
                  key={word}
                  className="rounded-lg border border-slate-200 bg-slate-50 px-2.5 py-1 text-xs font-medium text-slate-700"
                >
                  {word}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Burmese -> English Worked Examples */}
        <div>
          <h3 className="text-xs font-semibold tracking-wider text-slate-400 uppercase">
            Examples (Burmese → English)
          </h3>
          <div className="mt-2.5 divide-y divide-slate-100 rounded-xl border border-slate-200/80">
            {lesson.examples.map((example) => (
              <div key={example.id} className="p-4">
                <p className="font-myanmar text-sm font-medium text-slate-800">
                  {example.burmese}
                </p>
                <div className="mt-1.5 flex flex-wrap items-center gap-2">
                  <p className="text-sm font-semibold text-slate-900">
                    {example.english}
                  </p>
                  <span className="rounded-md bg-blue-50 px-2 py-0.5 font-mono text-[11px] font-semibold text-blue-700">
                    {example.highlight}
                  </span>
                </div>
                <p className="mt-1 text-xs text-slate-500">{example.note}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Common Mistake Callout */}
        <div className="rounded-xl border border-slate-200/80 bg-slate-50/70 p-4">
          <span className="text-xs font-semibold text-slate-700">
            Common Mistake to Avoid
          </span>
          <div className="mt-2.5 grid grid-cols-1 gap-2 sm:grid-cols-2">
            <div className="flex items-start gap-2 rounded-lg border border-rose-200/70 bg-white px-3 py-2.5 text-xs">
              <XCircle className="mt-0.5 h-4 w-4 shrink-0 text-rose-500" />
              <span className="text-slate-600 line-through">
                {lesson.mistake.wrong}
              </span>
            </div>
            <div className="flex items-start gap-2 rounded-lg border border-emerald-200/80 bg-white px-3 py-2.5 text-xs">
              <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-emerald-600" />
              <span className="font-semibold text-slate-900">
                {lesson.mistake.correct}
              </span>
            </div>
          </div>
          <p className="mt-2 text-xs text-slate-500">{lesson.mistake.reason}</p>
        </div>

        {/* Prev / Next Lesson Footer */}
        <div className="flex items-center justify-between gap-3 border-t border-slate-100 pt-4">
          {prevLesson ? (
            <button
              type="button"
              onClick={() => selectLesson(prevLesson.id)}
              className="inline-flex items-center gap-1.5 rounded-xl border border-slate-200 bg-white px-3.5 py-2 text-xs font-semibold text-slate-700 transition hover:bg-slate-50"
            >
              <ArrowLeft className="h-3.5 w-3.5" />
              <span className="max-w-[140px] truncate sm:max-w-none">
                {prevLesson.title}
              </span>
            </button>
          ) : (
            <span />
          )}

          {nextLesson && (
            <button
              type="button"
              onClick={() => selectLesson(nextLesson.id)}
              className="inline-flex items-center gap-1.5 rounded-xl border border-slate-200 bg-white px-3.5 py-2 text-xs font-semibold text-slate-700 transition hover:bg-slate-50"
            >
              <span className="max-w-[140px] truncate sm:max-w-none">
                {nextLesson.title}
              </span>
              <ArrowRight className="h-3.5 w-3.5" />
            </button>
          )}
        </div>
      </motion.article>
    </AnimatePresence>
  );
}
