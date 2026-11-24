"use client";

import { AnimatePresence, motion } from "framer-motion";
import { Loader2, Plus, Save, Trash2, X } from "lucide-react";
import { useEffect, useState } from "react";
import { useAdminStore } from "@/store/use-admin-store";
import { TIMELINE_TYPE_OPTIONS } from "@/types/admin";
import type {
  LessonCheatSheetRow,
  LessonTrack,
  TenseExample,
  TimelineVisualType,
} from "@/types/guide";
import type { Difficulty } from "@/types/practice";

const LEVELS: Difficulty[] = ["beginner", "intermediate", "advanced"];

interface EditableExample extends TenseExample {
  key: string;
}

interface EditableCheatRow extends LessonCheatSheetRow {
  key: string;
}

function makeExample(index: number): EditableExample {
  return {
    key: `ex-${Date.now()}-${index}`,
    id: "",
    burmese: "",
    english: "",
    highlight: "",
    note: "",
  };
}

function makeCheatRow(index: number): EditableCheatRow {
  return {
    key: `cs-${Date.now()}-${index}`,
    pattern: "",
    english: "",
    burmese: "",
    usage: "",
  };
}

export function GuideLessonFormModal() {
  const isOpen = useAdminStore((state) => state.isGuideModalOpen);
  const editingLesson = useAdminStore((state) => state.editingGuideLesson);
  const categories = useAdminStore((state) => state.categories);
  const guideTips = useAdminStore((state) => state.guideTips);
  const isSaving = useAdminStore((state) => state.isSaving);
  const closeModal = useAdminStore((state) => state.closeGuideModal);
  const saveGuideLesson = useAdminStore((state) => state.saveGuideLesson);

  const [title, setTitle] = useState("");
  const [burmeseTitle, setBurmeseTitle] = useState("");
  const [track, setTrack] = useState<Exclude<LessonTrack, "all">>("grammar");
  const [subgroup, setSubgroup] = useState("Grammar");
  const [level, setLevel] = useState<Difficulty>("beginner");
  const [practiceCategoryId, setPracticeCategoryId] = useState("random-mix");
  const [summary, setSummary] = useState("");
  const [burmeseSummary, setBurmeseSummary] = useState("");
  const [timelineType, setTimelineType] =
    useState<TimelineVisualType>("rule-pattern");
  const [timelineCaption, setTimelineCaption] = useState("");

  const [formulaPositive, setFormulaPositive] = useState("");
  const [formulaNegative, setFormulaNegative] = useState("");
  const [formulaQuestion, setFormulaQuestion] = useState("");

  const [whenToUseText, setWhenToUseText] = useState("");
  const [signalWordsText, setSignalWordsText] = useState("");

  const [examples, setExamples] = useState<EditableExample[]>([]);
  const [cheatSheet, setCheatSheet] = useState<EditableCheatRow[]>([]);

  const [mistakeWrong, setMistakeWrong] = useState("");
  const [mistakeCorrect, setMistakeCorrect] = useState("");
  const [mistakeReason, setMistakeReason] = useState("");
  const [relatedTipIds, setRelatedTipIds] = useState<string[]>([]);

  useEffect(() => {
    if (!isOpen) {
      return;
    }

    if (editingLesson) {
      setTitle(editingLesson.title);
      setBurmeseTitle(editingLesson.burmeseTitle);
      setTrack(editingLesson.track);
      setSubgroup(editingLesson.subgroup);
      setLevel(editingLesson.level);
      setPracticeCategoryId(editingLesson.practiceCategoryId);
      setSummary(editingLesson.summary);
      setBurmeseSummary(editingLesson.burmeseSummary);
      setTimelineType(editingLesson.timelineType);
      setTimelineCaption(editingLesson.timelineCaption);
      setFormulaPositive(editingLesson.formula.positive);
      setFormulaNegative(editingLesson.formula.negative);
      setFormulaQuestion(editingLesson.formula.question);
      setWhenToUseText(editingLesson.whenToUse.join("\n"));
      setSignalWordsText(editingLesson.signalWords.join(", "));
      setExamples(
        editingLesson.examples.length > 0
          ? editingLesson.examples.map((ex, i) => ({
              ...ex,
              key: ex.id || `ex-${i}`,
            }))
          : [makeExample(0)],
      );
      setCheatSheet(
        editingLesson.cheatSheet.length > 0
          ? editingLesson.cheatSheet.map((row, i) => ({
              ...row,
              key: `cs-${i}-${row.pattern}`,
            }))
          : [makeCheatRow(0)],
      );
      setMistakeWrong(editingLesson.mistake.wrong);
      setMistakeCorrect(editingLesson.mistake.correct);
      setMistakeReason(editingLesson.mistake.reason);
      setRelatedTipIds(editingLesson.relatedTipIds);
    } else {
      setTitle("");
      setBurmeseTitle("");
      setTrack("grammar");
      setSubgroup("Grammar");
      setLevel("beginner");
      setPracticeCategoryId(categories[0]?.id ?? "random-mix");
      setSummary("");
      setBurmeseSummary("");
      setTimelineType("rule-pattern");
      setTimelineCaption("");
      setFormulaPositive("");
      setFormulaNegative("");
      setFormulaQuestion("");
      setWhenToUseText("");
      setSignalWordsText("");
      setExamples([makeExample(0)]);
      setCheatSheet([makeCheatRow(0)]);
      setMistakeWrong("");
      setMistakeCorrect("");
      setMistakeReason("");
      setRelatedTipIds([]);
    }
  }, [isOpen, editingLesson, categories]);

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
      !formulaPositive.trim()
    ) {
      return;
    }

    await saveGuideLesson({
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
    });
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={closeModal}
          className="fixed inset-0 z-50 flex items-center justify-center overflow-y-auto bg-slate-950/45 p-4 backdrop-blur-xs"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.96, y: 10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.96, y: 8 }}
            transition={{ type: "spring", stiffness: 320, damping: 26 }}
            onClick={(event) => event.stopPropagation()}
            className="my-auto max-h-[90vh] w-full max-w-3xl overflow-y-auto rounded-2xl border border-slate-200 bg-white p-6 shadow-2xl"
          >
            <div className="flex items-start justify-between gap-3 border-b border-slate-100 pb-4">
              <div>
                <h2 className="text-lg font-bold text-slate-900">
                  {editingLesson ? "Edit Guide Lesson" : "New Guide Lesson"}
                </h2>
                <p className="mt-0.5 text-xs text-slate-500">
                  Saved directly to SQLite and displayed on the Lessons Guide
                  page.
                </p>
              </div>
              <button
                type="button"
                onClick={closeModal}
                aria-label="Close guide lesson modal"
                className="rounded-xl p-2 text-slate-400 transition hover:bg-slate-100 hover:text-slate-700"
              >
                <X className="h-4 w-4" />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="mt-5 flex flex-col gap-5">
              {/* Basic Details */}
              <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
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
                    className="mt-1 w-full rounded-xl border border-slate-300 bg-slate-50/70 px-3 py-2 text-xs text-slate-900 outline-none focus:border-blue-500 focus:bg-white"
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
                    className="mt-1 w-full rounded-xl border border-slate-300 bg-slate-50/70 px-3 py-2 font-myanmar text-xs text-slate-900 outline-none focus:border-blue-500 focus:bg-white"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 gap-3 sm:grid-cols-4">
                <div>
                  <label
                    htmlFor="guide-track"
                    className="block text-xs font-semibold text-slate-700"
                  >
                    Track
                  </label>
                  <select
                    id="guide-track"
                    value={track}
                    onChange={(event) =>
                      setTrack(
                        event.target.value as Exclude<LessonTrack, "all">,
                      )
                    }
                    className="mt-1 w-full rounded-xl border border-slate-300 bg-slate-50/70 px-2.5 py-2 text-xs text-slate-900 outline-none focus:border-blue-500 focus:bg-white"
                  >
                    <option value="tenses">Tenses</option>
                    <option value="grammar">Grammar Rule</option>
                  </select>
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
                    className="mt-1 w-full rounded-xl border border-slate-300 bg-slate-50/70 px-3 py-2 text-xs text-slate-900 outline-none focus:border-blue-500 focus:bg-white"
                  />
                </div>

                <div>
                  <label
                    htmlFor="guide-level"
                    className="block text-xs font-semibold text-slate-700"
                  >
                    Level
                  </label>
                  <select
                    id="guide-level"
                    value={level}
                    onChange={(event) =>
                      setLevel(event.target.value as Difficulty)
                    }
                    className="mt-1 w-full rounded-xl border border-slate-300 bg-slate-50/70 px-2.5 py-2 text-xs capitalize text-slate-900 outline-none focus:border-blue-500 focus:bg-white"
                  >
                    {LEVELS.map((lvl) => (
                      <option key={lvl} value={lvl}>
                        {lvl}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label
                    htmlFor="guide-practice-cat"
                    className="block text-xs font-semibold text-slate-700"
                  >
                    Practice Link
                  </label>
                  <select
                    id="guide-practice-cat"
                    value={practiceCategoryId}
                    onChange={(event) =>
                      setPracticeCategoryId(event.target.value)
                    }
                    className="mt-1 w-full rounded-xl border border-slate-300 bg-slate-50/70 px-2.5 py-2 text-xs text-slate-900 outline-none focus:border-blue-500 focus:bg-white"
                  >
                    <option value="random-mix">Random Mix</option>
                    {categories
                      .filter((cat) => !cat.isRandom)
                      .map((cat) => (
                        <option key={cat.id} value={cat.id}>
                          {cat.name}
                        </option>
                      ))}
                  </select>
                </div>
              </div>

              {/* Summaries */}
              <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
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
                    rows={2}
                    value={summary}
                    onChange={(event) => setSummary(event.target.value)}
                    placeholder="Short explanation of when and why to use this rule."
                    className="mt-1 w-full resize-none rounded-xl border border-slate-300 bg-slate-50/70 px-3 py-2 text-xs text-slate-900 outline-none focus:border-blue-500 focus:bg-white"
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
                    rows={2}
                    value={burmeseSummary}
                    onChange={(event) => setBurmeseSummary(event.target.value)}
                    placeholder="မြန်မာလို အတိုချုပ် ရှင်းပြချက်..."
                    className="mt-1 w-full resize-none rounded-xl border border-slate-300 bg-slate-50/70 px-3 py-2 font-myanmar text-xs text-slate-900 outline-none focus:border-blue-500 focus:bg-white"
                  />
                </div>
              </div>

              {/* Timeline */}
              <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                <div>
                  <label
                    htmlFor="guide-timeline"
                    className="block text-xs font-semibold text-slate-700"
                  >
                    Timeline Visual Style
                  </label>
                  <select
                    id="guide-timeline"
                    value={timelineType}
                    onChange={(event) =>
                      setTimelineType(event.target.value as TimelineVisualType)
                    }
                    className="mt-1 w-full rounded-xl border border-slate-300 bg-slate-50/70 px-3 py-2 text-xs text-slate-900 outline-none focus:border-blue-500 focus:bg-white"
                  >
                    {TIMELINE_TYPE_OPTIONS.map((option) => (
                      <option key={option.value} value={option.value}>
                        {option.label}
                      </option>
                    ))}
                  </select>
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
                    className="mt-1 w-full rounded-xl border border-slate-300 bg-slate-50/70 px-3 py-2 text-xs text-slate-900 outline-none focus:border-blue-500 focus:bg-white"
                  />
                </div>
              </div>

              {/* Formulas */}
              <div className="rounded-xl border border-slate-200 bg-slate-50/60 p-4">
                <span className="text-xs font-bold text-slate-800">
                  Sentence Structure Formulas
                </span>
                <div className="mt-2.5 grid grid-cols-1 gap-2.5 sm:grid-cols-3">
                  <div>
                    <label
                      htmlFor="guide-f-pos"
                      className="block text-[11px] font-semibold text-emerald-700"
                    >
                      + Positive *
                    </label>
                    <input
                      id="guide-f-pos"
                      type="text"
                      required
                      value={formulaPositive}
                      onChange={(event) =>
                        setFormulaPositive(event.target.value)
                      }
                      placeholder="Subject + used to + V1"
                      className="mt-1 w-full rounded-lg border border-slate-300 bg-white px-2.5 py-1.5 font-mono text-xs text-slate-900 outline-none focus:border-blue-500"
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="guide-f-neg"
                      className="block text-[11px] font-semibold text-rose-700"
                    >
                      − Negative
                    </label>
                    <input
                      id="guide-f-neg"
                      type="text"
                      value={formulaNegative}
                      onChange={(event) =>
                        setFormulaNegative(event.target.value)
                      }
                      placeholder="Subject + didn't use to + V1"
                      className="mt-1 w-full rounded-lg border border-slate-300 bg-white px-2.5 py-1.5 font-mono text-xs text-slate-900 outline-none focus:border-blue-500"
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="guide-f-q"
                      className="block text-[11px] font-semibold text-blue-700"
                    >
                      ? Question
                    </label>
                    <input
                      id="guide-f-q"
                      type="text"
                      value={formulaQuestion}
                      onChange={(event) =>
                        setFormulaQuestion(event.target.value)
                      }
                      placeholder="Did + Subject + use to + V1?"
                      className="mt-1 w-full rounded-lg border border-slate-300 bg-white px-2.5 py-1.5 font-mono text-xs text-slate-900 outline-none focus:border-blue-500"
                    />
                  </div>
                </div>
              </div>

              {/* When to Use & Signal Words */}
              <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                <div>
                  <label
                    htmlFor="guide-when"
                    className="block text-xs font-semibold text-slate-700"
                  >
                    When to Use (one bullet per line)
                  </label>
                  <textarea
                    id="guide-when"
                    rows={3}
                    value={whenToUseText}
                    onChange={(event) => setWhenToUseText(event.target.value)}
                    placeholder="Past habits you stopped doing&#10;Past living places or states"
                    className="mt-1 w-full resize-none rounded-xl border border-slate-300 bg-slate-50/70 px-3 py-2 text-xs text-slate-900 outline-none focus:border-blue-500 focus:bg-white"
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
                    rows={3}
                    value={signalWordsText}
                    onChange={(event) => setSignalWordsText(event.target.value)}
                    placeholder="in the past, before, years ago, not anymore"
                    className="mt-1 w-full resize-none rounded-xl border border-slate-300 bg-slate-50/70 px-3 py-2 text-xs text-slate-900 outline-none focus:border-blue-500 focus:bg-white"
                  />
                </div>
              </div>

              {/* Dynamic Worked Examples */}
              <div className="rounded-xl border border-slate-200 bg-slate-50/50 p-4">
                <div className="flex items-center justify-between gap-2">
                  <span className="text-xs font-bold text-slate-800">
                    Worked Examples (Burmese → English)
                  </span>
                  <button
                    type="button"
                    onClick={() =>
                      setExamples((prev) => [...prev, makeExample(prev.length)])
                    }
                    className="inline-flex items-center gap-1 rounded-lg border border-slate-200 bg-white px-2.5 py-1 text-[11px] font-semibold text-blue-600 hover:bg-blue-50"
                  >
                    <Plus className="h-3 w-3" />
                    <span>Add Example</span>
                  </button>
                </div>

                <div className="mt-3 flex flex-col gap-2.5">
                  {examples.map((example, idx) => (
                    <div
                      key={example.key}
                      className="grid grid-cols-1 gap-2 rounded-xl border border-slate-200 bg-white p-3 sm:grid-cols-2"
                    >
                      <input
                        type="text"
                        value={example.burmese}
                        onChange={(event) =>
                          setExamples((prev) =>
                            prev.map((row, i) =>
                              i === idx
                                ? { ...row, burmese: event.target.value }
                                : row,
                            ),
                          )
                        }
                        placeholder="Burmese sentence"
                        className="rounded-lg border border-slate-200 px-2.5 py-1.5 font-myanmar text-xs outline-none focus:border-blue-500"
                      />
                      <input
                        type="text"
                        value={example.english}
                        onChange={(event) =>
                          setExamples((prev) =>
                            prev.map((row, i) =>
                              i === idx
                                ? { ...row, english: event.target.value }
                                : row,
                            ),
                          )
                        }
                        placeholder="English sentence"
                        className="rounded-lg border border-slate-200 px-2.5 py-1.5 text-xs outline-none focus:border-blue-500"
                      />
                      <input
                        type="text"
                        value={example.highlight}
                        onChange={(event) =>
                          setExamples((prev) =>
                            prev.map((row, i) =>
                              i === idx
                                ? { ...row, highlight: event.target.value }
                                : row,
                            ),
                          )
                        }
                        placeholder="Highlight phrase (e.g., used to ride)"
                        className="rounded-lg border border-slate-200 px-2.5 py-1.5 font-mono text-xs outline-none focus:border-blue-500"
                      />
                      <div className="flex gap-1.5">
                        <input
                          type="text"
                          value={example.note}
                          onChange={(event) =>
                            setExamples((prev) =>
                              prev.map((row, i) =>
                                i === idx
                                  ? { ...row, note: event.target.value }
                                  : row,
                              ),
                            )
                          }
                          placeholder="Short explanation note"
                          className="flex-1 rounded-lg border border-slate-200 px-2.5 py-1.5 text-xs outline-none focus:border-blue-500"
                        />
                        {examples.length > 1 && (
                          <button
                            type="button"
                            onClick={() =>
                              setExamples((prev) =>
                                prev.filter((_, i) => i !== idx),
                              )
                            }
                            aria-label="Remove example"
                            className="rounded-lg p-1.5 text-slate-400 hover:bg-rose-50 hover:text-rose-600"
                          >
                            <Trash2 className="h-3.5 w-3.5" />
                          </button>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Common Mistake */}
              <div className="rounded-xl border border-slate-200 bg-slate-50/50 p-4">
                <span className="text-xs font-bold text-slate-800">
                  Common Mistake Callout
                </span>
                <div className="mt-2.5 grid grid-cols-1 gap-2 sm:grid-cols-2">
                  <input
                    type="text"
                    value={mistakeWrong}
                    onChange={(event) => setMistakeWrong(event.target.value)}
                    placeholder="Wrong sentence (Avoid)"
                    className="rounded-lg border border-rose-200 bg-white px-2.5 py-1.5 text-xs outline-none focus:border-rose-400"
                  />
                  <input
                    type="text"
                    value={mistakeCorrect}
                    onChange={(event) => setMistakeCorrect(event.target.value)}
                    placeholder="Correct sentence (Write)"
                    className="rounded-lg border border-emerald-200 bg-white px-2.5 py-1.5 text-xs outline-none focus:border-emerald-400"
                  />
                  <input
                    type="text"
                    value={mistakeReason}
                    onChange={(event) => setMistakeReason(event.target.value)}
                    placeholder="Why? Short explanation..."
                    className="rounded-lg border border-slate-200 bg-white px-2.5 py-1.5 text-xs outline-none focus:border-blue-500 sm:col-span-2"
                  />
                </div>
              </div>

              {/* Dynamic Cheat Sheet Rows */}
              <div className="rounded-xl border border-slate-200 bg-slate-50/50 p-4">
                <div className="flex items-center justify-between gap-2">
                  <span className="text-xs font-bold text-slate-800">
                    Quick Cheat Sheet Rows
                  </span>
                  <button
                    type="button"
                    onClick={() =>
                      setCheatSheet((prev) => [
                        ...prev,
                        makeCheatRow(prev.length),
                      ])
                    }
                    className="inline-flex items-center gap-1 rounded-lg border border-slate-200 bg-white px-2.5 py-1 text-[11px] font-semibold text-blue-600 hover:bg-blue-50"
                  >
                    <Plus className="h-3 w-3" />
                    <span>Add Row</span>
                  </button>
                </div>

                <div className="mt-3 flex flex-col gap-2">
                  {cheatSheet.map((row, idx) => (
                    <div
                      key={row.key}
                      className="grid grid-cols-1 gap-2 rounded-xl border border-slate-200 bg-white p-3 sm:grid-cols-4"
                    >
                      <input
                        type="text"
                        value={row.pattern}
                        onChange={(event) =>
                          setCheatSheet((prev) =>
                            prev.map((item, i) =>
                              i === idx
                                ? { ...item, pattern: event.target.value }
                                : item,
                            ),
                          )
                        }
                        placeholder="Pattern"
                        className="rounded-lg border border-slate-200 px-2 py-1.5 font-mono text-xs outline-none focus:border-blue-500"
                      />
                      <input
                        type="text"
                        value={row.english}
                        onChange={(event) =>
                          setCheatSheet((prev) =>
                            prev.map((item, i) =>
                              i === idx
                                ? { ...item, english: event.target.value }
                                : item,
                            ),
                          )
                        }
                        placeholder="English example"
                        className="rounded-lg border border-slate-200 px-2 py-1.5 text-xs outline-none focus:border-blue-500"
                      />
                      <input
                        type="text"
                        value={row.burmese}
                        onChange={(event) =>
                          setCheatSheet((prev) =>
                            prev.map((item, i) =>
                              i === idx
                                ? { ...item, burmese: event.target.value }
                                : item,
                            ),
                          )
                        }
                        placeholder="Burmese meaning"
                        className="rounded-lg border border-slate-200 px-2 py-1.5 font-myanmar text-xs outline-none focus:border-blue-500"
                      />
                      <div className="flex gap-1.5">
                        <input
                          type="text"
                          value={row.usage}
                          onChange={(event) =>
                            setCheatSheet((prev) =>
                              prev.map((item, i) =>
                                i === idx
                                  ? { ...item, usage: event.target.value }
                                  : item,
                              ),
                            )
                          }
                          placeholder="Usage badge"
                          className="flex-1 rounded-lg border border-slate-200 px-2 py-1.5 text-xs outline-none focus:border-blue-500"
                        />
                        {cheatSheet.length > 1 && (
                          <button
                            type="button"
                            onClick={() =>
                              setCheatSheet((prev) =>
                                prev.filter((_, i) => i !== idx),
                              )
                            }
                            aria-label="Remove cheat row"
                            className="rounded-lg p-1.5 text-slate-400 hover:bg-rose-50 hover:text-rose-600"
                          >
                            <Trash2 className="h-3.5 w-3.5" />
                          </button>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Related Tips Multi-Select */}
              {guideTips.length > 0 && (
                <div>
                  <span className="block text-xs font-semibold text-slate-700">
                    Related Tips &amp; Tricks
                  </span>
                  <div className="mt-2 flex flex-wrap gap-1.5">
                    {guideTips.map((tip) => {
                      const selected = relatedTipIds.includes(tip.id);
                      return (
                        <button
                          key={tip.id}
                          type="button"
                          onClick={() => toggleTipId(tip.id)}
                          className={`rounded-lg border px-2.5 py-1.5 text-xs font-medium transition ${
                            selected
                              ? "border-blue-500 bg-blue-50 text-blue-800"
                              : "border-slate-200 bg-white text-slate-600 hover:bg-slate-50"
                          }`}
                        >
                          {tip.title}
                        </button>
                      );
                    })}
                  </div>
                </div>
              )}

              <div className="flex items-center justify-end gap-2 border-t border-slate-100 pt-4">
                <button
                  type="button"
                  onClick={closeModal}
                  className="rounded-xl px-4 py-2 text-xs font-semibold text-slate-600 hover:bg-slate-100"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={
                    isSaving ||
                    !title.trim() ||
                    !burmeseTitle.trim() ||
                    !summary.trim() ||
                    !formulaPositive.trim()
                  }
                  className="inline-flex items-center gap-1.5 rounded-xl bg-blue-600 px-5 py-2 text-xs font-semibold text-white shadow-xs transition hover:bg-blue-700 disabled:opacity-60"
                >
                  {isSaving ? (
                    <Loader2 className="h-3.5 w-3.5 animate-spin" />
                  ) : (
                    <Save className="h-3.5 w-3.5" />
                  )}
                  <span>{editingLesson ? "Save Lesson" : "Create Lesson"}</span>
                </button>
              </div>
            </form>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
