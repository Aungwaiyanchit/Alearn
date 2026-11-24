"use client";

import { Loader2, Save } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { AdminFormLayout } from "@/components/admin/forms/AdminFormLayout";
import {
  createEmptyCheatRow,
  type EditableCheatRow,
  GuideCheatSheetEditor,
} from "@/components/admin/forms/GuideCheatSheetEditor";
import {
  createEmptyExample,
  type EditableGuideExample,
  GuideExamplesEditor,
} from "@/components/admin/forms/GuideExamplesEditor";
import { TenseTimelineVisual } from "@/components/guide/TenseTimelineVisual";
import { SelectDropdown } from "@/components/ui/SelectDropdown";
import { TIMELINE_TYPE_OPTIONS } from "@/types/admin";
import type {
  LessonTrack,
  TenseLesson,
  TimelineVisualType,
  WritingTip,
} from "@/types/guide";
import type { Category, Difficulty } from "@/types/practice";

const LEVELS: Difficulty[] = ["beginner", "intermediate", "advanced"];

interface GuideLessonFormViewProps {
  initialLesson?: TenseLesson | null;
  categories: Category[];
  guideTips: WritingTip[];
  databasePath: string;
}

export function GuideLessonFormView({
  initialLesson = null,
  categories,
  guideTips,
  databasePath,
}: GuideLessonFormViewProps) {
  const router = useRouter();
  const isEditing = Boolean(initialLesson);

  const [title, setTitle] = useState(initialLesson?.title ?? "");
  const [burmeseTitle, setBurmeseTitle] = useState(
    initialLesson?.burmeseTitle ?? "",
  );
  const [track, setTrack] = useState<Exclude<LessonTrack, "all">>(
    initialLesson?.track ?? "grammar",
  );
  const [subgroup, setSubgroup] = useState(
    initialLesson?.subgroup ?? "Grammar",
  );
  const [level, setLevel] = useState<Difficulty>(
    initialLesson?.level ?? "beginner",
  );
  const [practiceCategoryId, setPracticeCategoryId] = useState(
    initialLesson?.practiceCategoryId ?? categories[0]?.id ?? "random-mix",
  );
  const [summary, setSummary] = useState(initialLesson?.summary ?? "");
  const [burmeseSummary, setBurmeseSummary] = useState(
    initialLesson?.burmeseSummary ?? "",
  );
  const [timelineType, setTimelineType] = useState<TimelineVisualType>(
    initialLesson?.timelineType ?? "rule-pattern",
  );
  const [timelineCaption, setTimelineCaption] = useState(
    initialLesson?.timelineCaption ?? "",
  );

  const [formulaPositive, setFormulaPositive] = useState(
    initialLesson?.formula.positive ?? "",
  );
  const [formulaNegative, setFormulaNegative] = useState(
    initialLesson?.formula.negative ?? "",
  );
  const [formulaQuestion, setFormulaQuestion] = useState(
    initialLesson?.formula.question ?? "",
  );

  const [whenToUseText, setWhenToUseText] = useState(
    initialLesson?.whenToUse.join("\n") ?? "",
  );
  const [signalWordsText, setSignalWordsText] = useState(
    initialLesson?.signalWords.join(", ") ?? "",
  );

  const [examples, setExamples] = useState<EditableGuideExample[]>(
    initialLesson && initialLesson.examples.length > 0
      ? initialLesson.examples.map((ex, i) => ({
          ...ex,
          key: ex.id || `ex-${i}`,
        }))
      : [createEmptyExample(0)],
  );

  const [cheatSheet, setCheatSheet] = useState<EditableCheatRow[]>(
    initialLesson && initialLesson.cheatSheet.length > 0
      ? initialLesson.cheatSheet.map((row, i) => ({
          ...row,
          key: `cs-${i}-${row.pattern}`,
        }))
      : [createEmptyCheatRow(0)],
  );

  const [mistakeWrong, setMistakeWrong] = useState(
    initialLesson?.mistake.wrong ?? "",
  );
  const [mistakeCorrect, setMistakeCorrect] = useState(
    initialLesson?.mistake.correct ?? "",
  );
  const [mistakeReason, setMistakeReason] = useState(
    initialLesson?.mistake.reason ?? "",
  );
  const [relatedTipIds, setRelatedTipIds] = useState<string[]>(
    initialLesson?.relatedTipIds ?? [],
  );

  const [isSaving, setIsSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const toggleTipId = (tipId: string) => {
    setRelatedTipIds((prev) =>
      prev.includes(tipId)
        ? prev.filter((id) => id !== tipId)
        : [...prev, tipId],
    );
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (
      !title.trim() ||
      !burmeseTitle.trim() ||
      !summary.trim() ||
      !formulaPositive.trim() ||
      isSaving
    ) {
      return;
    }

    setIsSaving(true);
    setError(null);

    try {
      const endpoint = initialLesson
        ? `/api/admin/guide-lessons/${initialLesson.id}`
        : "/api/admin/guide-lessons";
      const method = initialLesson ? "PATCH" : "POST";

      const response = await fetch(endpoint, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          title,
          burmeseTitle,
          track,
          subgroup,
          level,
          practiceCategoryId,
          summary,
          burmeseSummary,
          timelineType,
          timelineCaption,
          formula: {
            positive: formulaPositive,
            negative: formulaNegative,
            question: formulaQuestion,
          },
          whenToUse: whenToUseText
            .split("\n")
            .map((line) => line.trim())
            .filter(Boolean),
          signalWords: signalWordsText
            .split(",")
            .map((word) => word.trim())
            .filter(Boolean),
          examples: examples
            .filter((ex) => ex.burmese.trim() || ex.english.trim())
            .map(({ key: _key, ...rest }) => rest),
          mistake: {
            wrong: mistakeWrong,
            correct: mistakeCorrect,
            reason: mistakeReason,
          },
          cheatSheet: cheatSheet
            .filter((row) => row.pattern.trim() || row.english.trim())
            .map(({ key: _key, ...rest }) => rest),
          relatedTipIds,
        }),
      });

      const payload = (await response.json()) as { error?: string };
      if (!response.ok) {
        throw new Error(payload.error ?? "Failed to save guide lesson");
      }

      router.push("/admin?tab=guide");
      router.refresh();
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "Failed to save guide lesson",
      );
      setIsSaving(false);
    }
  };

  return (
    <AdminFormLayout
      title={isEditing ? "Edit Guide Lesson" : "Create Guide Lesson"}
      subtitle="Author English tense and grammar explanations, formulas, Burmese examples, cheat sheets, and tips in full-page view."
      backHref="/admin?tab=guide"
      backLabel="Back to Lessons Guide"
      databasePath={databasePath}
      error={error}
    >
      <form onSubmit={handleSubmit} className="flex flex-col gap-6">
        {/* 1. Core Info */}
        <section className="rounded-2xl border border-slate-200/80 bg-white p-6 shadow-xs">
          <h2 className="text-sm font-bold text-slate-900">
            Basic Information
          </h2>

          <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div>
              <label
                htmlFor="guide-title"
                className="block text-xs font-semibold text-slate-700"
              >
                Lesson Title *
              </label>
              <input
                id="guide-title"
                type="text"
                required
                value={title}
                onChange={(event) => setTitle(event.target.value)}
                placeholder="e.g., used to (Past Habits)"
                className="mt-1.5 w-full rounded-xl border border-slate-300 bg-slate-50/70 px-3.5 py-2.5 text-sm text-slate-900 outline-none focus:border-blue-500 focus:bg-white focus:ring-2 focus:ring-blue-500/15"
              />
            </div>

            <div>
              <label
                htmlFor="guide-mm-title"
                className="block text-xs font-semibold text-slate-700"
              >
                Burmese Title (မြန်မာခေါင်းစဉ်) *
              </label>
              <input
                id="guide-mm-title"
                type="text"
                required
                value={burmeseTitle}
                onChange={(event) => setBurmeseTitle(event.target.value)}
                placeholder="ဥပမာ - အရင်က လုပ်လေ့ရှိခဲ့တယ်"
                className="mt-1.5 w-full rounded-xl border border-slate-300 bg-slate-50/70 px-3.5 py-2.5 font-myanmar text-sm text-slate-900 outline-none focus:border-blue-500 focus:bg-white focus:ring-2 focus:ring-blue-500/15"
              />
            </div>
          </div>

          <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-4">
            <div>
              <label
                htmlFor="guide-track"
                className="block text-xs font-semibold text-slate-700"
              >
                Track
              </label>
              <SelectDropdown
                id="guide-track"
                size="sm"
                ariaLabel="Lesson track"
                value={track}
                options={[
                  { value: "tenses", label: "Tenses" },
                  { value: "grammar", label: "Grammar Rule" },
                ]}
                onChange={(nextValue) =>
                  setTrack(nextValue as Exclude<LessonTrack, "all">)
                }
                className="mt-1.5"
              />
            </div>

            <div>
              <label
                htmlFor="guide-subgroup"
                className="block text-xs font-semibold text-slate-700"
              >
                Subgroup Label
              </label>
              <input
                id="guide-subgroup"
                type="text"
                value={subgroup}
                onChange={(event) => setSubgroup(event.target.value)}
                placeholder="e.g., Past Habits"
                className="mt-1.5 w-full rounded-xl border border-slate-200 bg-white px-3 py-2 text-xs text-slate-900 shadow-2xs outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/15"
              />
            </div>

            <div>
              <label
                htmlFor="guide-level"
                className="block text-xs font-semibold text-slate-700"
              >
                Difficulty Level
              </label>
              <SelectDropdown
                id="guide-level"
                size="sm"
                ariaLabel="Difficulty level"
                value={level}
                options={LEVELS.map((lvl) => ({
                  value: lvl,
                  label: lvl.charAt(0).toUpperCase() + lvl.slice(1),
                }))}
                onChange={(nextValue) => setLevel(nextValue as Difficulty)}
                className="mt-1.5"
              />
            </div>

            <div>
              <label
                htmlFor="guide-practice-cat"
                className="block text-xs font-semibold text-slate-700"
              >
                Practice Link
              </label>
              <SelectDropdown
                id="guide-practice-cat"
                size="sm"
                ariaLabel="Linked practice category"
                value={practiceCategoryId}
                options={[
                  {
                    value: "random-mix",
                    label: "Random Mix",
                    description: "ကဏ္ဍစုံမှ ကျပန်း",
                  },
                  ...categories
                    .filter((cat) => !cat.isRandom)
                    .map((cat) => ({
                      value: cat.id,
                      label: cat.name,
                      description: cat.burmeseName,
                    })),
                ]}
                onChange={setPracticeCategoryId}
                className="mt-1.5"
              />
            </div>
          </div>

          <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div>
              <label
                htmlFor="guide-summary"
                className="block text-xs font-semibold text-slate-700"
              >
                English Summary *
              </label>
              <textarea
                id="guide-summary"
                required
                rows={3}
                value={summary}
                onChange={(event) => setSummary(event.target.value)}
                placeholder="Explain clearly when and how this tense or rule is used."
                className="mt-1.5 w-full rounded-xl border border-slate-300 bg-slate-50/70 px-3.5 py-2.5 text-sm text-slate-900 outline-none focus:border-blue-500 focus:bg-white"
              />
            </div>

            <div>
              <label
                htmlFor="guide-mm-summary"
                className="block text-xs font-semibold text-slate-700"
              >
                Burmese Summary (မြန်မာရှင်းလင်းချက်)
              </label>
              <textarea
                id="guide-mm-summary"
                rows={3}
                value={burmeseSummary}
                onChange={(event) => setBurmeseSummary(event.target.value)}
                placeholder="မြန်မာလို အတိုချုပ် ရှင်းပြချက်..."
                className="mt-1.5 w-full rounded-xl border border-slate-300 bg-slate-50/70 px-3.5 py-2.5 font-myanmar text-sm text-slate-900 outline-none focus:border-blue-500 focus:bg-white"
              />
            </div>
          </div>
        </section>

        {/* 2. Timeline & Formulas */}
        <section className="rounded-2xl border border-slate-200/80 bg-white p-6 shadow-xs">
          <h2 className="text-sm font-bold text-slate-900">
            Timeline &amp; Sentence Structure Formulas
          </h2>

          <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div>
              <label
                htmlFor="guide-timeline"
                className="block text-xs font-semibold text-slate-700"
              >
                Timeline Visual Style
              </label>
              <SelectDropdown
                id="guide-timeline"
                size="sm"
                ariaLabel="Timeline visual style"
                value={timelineType}
                options={TIMELINE_TYPE_OPTIONS}
                onChange={(nextValue) =>
                  setTimelineType(nextValue as TimelineVisualType)
                }
                className="mt-1.5"
              />
            </div>

            <div>
              <label
                htmlFor="guide-timeline-caption"
                className="block text-xs font-semibold text-slate-700"
              >
                Timeline Caption
              </label>
              <input
                id="guide-timeline-caption"
                type="text"
                value={timelineCaption}
                onChange={(event) => setTimelineCaption(event.target.value)}
                placeholder="e.g., Repeated in the past, stopped before NOW"
                className="mt-1.5 w-full rounded-xl border border-slate-300 bg-slate-50/70 px-3.5 py-2.5 text-xs text-slate-900 outline-none focus:border-blue-500 focus:bg-white"
              />
            </div>
          </div>

          <div className="mt-4">
            <TenseTimelineVisual
              type={timelineType}
              caption={timelineCaption || "Live timeline preview"}
            />
          </div>

          <div className="mt-5 flex flex-col gap-3">
            <div>
              <label
                htmlFor="guide-f-pos"
                className="block text-xs font-semibold text-emerald-700"
              >
                + Positive Formula *
              </label>
              <input
                id="guide-f-pos"
                type="text"
                required
                value={formulaPositive}
                onChange={(event) => setFormulaPositive(event.target.value)}
                placeholder="Subject + used to + V1"
                className="mt-1 w-full rounded-xl border border-slate-300 bg-slate-50/70 px-3.5 py-2.5 font-mono text-xs text-slate-900 outline-none focus:border-blue-500 focus:bg-white"
              />
            </div>

            <div>
              <label
                htmlFor="guide-f-neg"
                className="block text-xs font-semibold text-rose-700"
              >
                − Negative Formula
              </label>
              <input
                id="guide-f-neg"
                type="text"
                value={formulaNegative}
                onChange={(event) => setFormulaNegative(event.target.value)}
                placeholder="Subject + did not (didn't) + use to + V1"
                className="mt-1 w-full rounded-xl border border-slate-300 bg-slate-50/70 px-3.5 py-2.5 font-mono text-xs text-slate-900 outline-none focus:border-blue-500 focus:bg-white"
              />
            </div>

            <div>
              <label
                htmlFor="guide-f-q"
                className="block text-xs font-semibold text-blue-700"
              >
                ? Question Formula
              </label>
              <input
                id="guide-f-q"
                type="text"
                value={formulaQuestion}
                onChange={(event) => setFormulaQuestion(event.target.value)}
                placeholder="Did + Subject + use to + V1 ...?"
                className="mt-1 w-full rounded-xl border border-slate-300 bg-slate-50/70 px-3.5 py-2.5 font-mono text-xs text-slate-900 outline-none focus:border-blue-500 focus:bg-white"
              />
            </div>
          </div>
        </section>

        {/* 3. When to Use & Signal Words */}
        <section className="rounded-2xl border border-slate-200/80 bg-white p-6 shadow-xs">
          <h2 className="text-sm font-bold text-slate-900">
            Usage &amp; Signal Words
          </h2>

          <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div>
              <label
                htmlFor="guide-when"
                className="block text-xs font-semibold text-slate-700"
              >
                When to Use (one bullet point per line)
              </label>
              <textarea
                id="guide-when"
                rows={4}
                value={whenToUseText}
                onChange={(event) => setWhenToUseText(event.target.value)}
                placeholder={
                  "Past habits you stopped doing\nPast living places or states"
                }
                className="mt-1.5 w-full rounded-xl border border-slate-300 bg-slate-50/70 px-3.5 py-2.5 text-xs leading-relaxed text-slate-900 outline-none focus:border-blue-500 focus:bg-white"
              />
            </div>

            <div>
              <label
                htmlFor="guide-signals"
                className="block text-xs font-semibold text-slate-700"
              >
                Signal Words (comma separated)
              </label>
              <textarea
                id="guide-signals"
                rows={4}
                value={signalWordsText}
                onChange={(event) => setSignalWordsText(event.target.value)}
                placeholder="when I was young, in the past, before, years ago"
                className="mt-1.5 w-full rounded-xl border border-slate-300 bg-slate-50/70 px-3.5 py-2.5 text-xs leading-relaxed text-slate-900 outline-none focus:border-blue-500 focus:bg-white"
              />
            </div>
          </div>
        </section>

        {/* 4. Worked Examples */}
        <GuideExamplesEditor examples={examples} onChange={setExamples} />

        {/* 5. Common Mistake */}
        <section className="rounded-2xl border border-slate-200/80 bg-white p-6 shadow-xs">
          <h2 className="text-sm font-bold text-slate-900">
            Common Mistake Callout
          </h2>

          <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div>
              <label
                htmlFor="guide-wrong"
                className="block text-xs font-semibold text-rose-700"
              >
                Wrong Sentence (Avoid)
              </label>
              <input
                id="guide-wrong"
                type="text"
                value={mistakeWrong}
                onChange={(event) => setMistakeWrong(event.target.value)}
                placeholder="e.g., Did you used to live here?"
                className="mt-1.5 w-full rounded-xl border border-rose-200 bg-rose-50/30 px-3.5 py-2.5 text-sm text-slate-900 outline-none focus:border-rose-400 focus:bg-white"
              />
            </div>

            <div>
              <label
                htmlFor="guide-correct"
                className="block text-xs font-semibold text-emerald-700"
              >
                Correct Sentence (Write)
              </label>
              <input
                id="guide-correct"
                type="text"
                value={mistakeCorrect}
                onChange={(event) => setMistakeCorrect(event.target.value)}
                placeholder="e.g., Did you use to live here?"
                className="mt-1.5 w-full rounded-xl border border-emerald-200 bg-emerald-50/30 px-3.5 py-2.5 text-sm text-slate-900 outline-none focus:border-emerald-400 focus:bg-white"
              />
            </div>

            <div className="sm:col-span-2">
              <label
                htmlFor="guide-reason"
                className="block text-xs font-semibold text-slate-700"
              >
                Explanation
              </label>
              <input
                id="guide-reason"
                type="text"
                value={mistakeReason}
                onChange={(event) => setMistakeReason(event.target.value)}
                placeholder="Explain briefly why the correction works."
                className="mt-1.5 w-full rounded-xl border border-slate-300 bg-slate-50/70 px-3.5 py-2.5 text-xs text-slate-900 outline-none focus:border-blue-500 focus:bg-white"
              />
            </div>
          </div>
        </section>

        {/* 6. Cheat Sheet Rows */}
        <GuideCheatSheetEditor rows={cheatSheet} onChange={setCheatSheet} />

        {/* 7. Related Tips */}
        {guideTips.length > 0 && (
          <section className="rounded-2xl border border-slate-200/80 bg-white p-6 shadow-xs">
            <h2 className="text-sm font-bold text-slate-900">
              Related Tips &amp; Tricks
            </h2>
            <p className="mt-0.5 text-xs text-slate-500">
              Select tips to show underneath this lesson detail.
            </p>
            <div className="mt-4 flex flex-wrap gap-2">
              {guideTips.map((tip) => {
                const selected = relatedTipIds.includes(tip.id);
                return (
                  <button
                    key={tip.id}
                    type="button"
                    onClick={() => toggleTipId(tip.id)}
                    className={`rounded-xl border px-3.5 py-2 text-xs font-semibold transition ${
                      selected
                        ? "border-blue-600 bg-blue-50 text-blue-800"
                        : "border-slate-200 bg-slate-50 text-slate-600 hover:border-slate-300 hover:bg-white"
                    }`}
                  >
                    {tip.title}
                  </button>
                );
              })}
            </div>
          </section>
        )}

        {/* Sticky Footer Bar */}
        <div className="sticky bottom-4 z-20 flex items-center justify-end gap-3 rounded-2xl border border-slate-200 bg-white/95 p-4 shadow-md backdrop-blur-md">
          <Link
            href="/admin?tab=guide"
            className="rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-xs font-semibold text-slate-700 transition hover:bg-slate-50"
          >
            Cancel
          </Link>
          <button
            type="submit"
            disabled={
              isSaving ||
              !title.trim() ||
              !burmeseTitle.trim() ||
              !summary.trim() ||
              !formulaPositive.trim()
            }
            className="inline-flex items-center gap-2 rounded-xl bg-blue-600 px-5 py-2.5 text-xs font-semibold text-white shadow-xs transition hover:bg-blue-700 disabled:opacity-60"
          >
            {isSaving ? (
              <Loader2 className="h-4 w-4 animate-spin" />
            ) : (
              <Save className="h-4 w-4" />
            )}
            <span>{isEditing ? "Save Lesson" : "Create Lesson"}</span>
          </button>
        </div>
      </form>
    </AdminFormLayout>
  );
}
