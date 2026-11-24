"use client";

import { Loader2, Save } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useMemo, useState } from "react";
import { AdminFormLayout } from "@/components/admin/forms/AdminFormLayout";
import type { Category, Difficulty, LessonQuestion } from "@/types/practice";

const DIFFICULTIES: Difficulty[] = ["beginner", "intermediate", "advanced"];

interface QuestionFormViewProps {
  initialQuestion?: LessonQuestion | null;
  categories: Category[];
  defaultCategoryId?: string;
  databasePath: string;
}

export function QuestionFormView({
  initialQuestion = null,
  categories,
  defaultCategoryId,
  databasePath,
}: QuestionFormViewProps) {
  const router = useRouter();
  const isEditing = Boolean(initialQuestion);

  const regularCategories = useMemo(
    () => categories.filter((cat) => !cat.isRandom),
    [categories],
  );

  const initialCatId =
    initialQuestion?.categoryId ??
    (defaultCategoryId &&
    regularCategories.some((cat) => cat.id === defaultCategoryId)
      ? defaultCategoryId
      : (regularCategories[0]?.id ?? ""));

  const [categoryId, setCategoryId] = useState(initialCatId);
  const [difficulty, setDifficulty] = useState<Difficulty>(
    initialQuestion?.difficulty ?? "beginner",
  );
  const [burmesePrompt, setBurmesePrompt] = useState(
    initialQuestion?.burmesePrompt ?? "",
  );
  const [englishAnswer, setEnglishAnswer] = useState(
    initialQuestion?.englishAnswer ?? "",
  );
  const [acceptedText, setAcceptedText] = useState(
    initialQuestion?.acceptedAnswers.join("\n") ?? "",
  );
  const [hint, setHint] = useState(initialQuestion?.hint ?? "");
  const [grammarNote, setGrammarNote] = useState(
    initialQuestion?.grammarNote ?? "",
  );
  const [isSaving, setIsSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (
      !categoryId ||
      !burmesePrompt.trim() ||
      !englishAnswer.trim() ||
      isSaving
    ) {
      return;
    }

    setIsSaving(true);
    setError(null);

    const acceptedAnswers = acceptedText
      .split("\n")
      .map((line) => line.trim())
      .filter((line) => line.length > 0);

    try {
      const endpoint = initialQuestion
        ? `/api/admin/questions/${initialQuestion.id}`
        : "/api/admin/questions";
      const method = initialQuestion ? "PATCH" : "POST";

      const response = await fetch(endpoint, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          categoryId,
          burmesePrompt,
          englishAnswer,
          acceptedAnswers,
          hint,
          grammarNote,
          difficulty,
        }),
      });

      const payload = (await response.json()) as { error?: string };
      if (!response.ok) {
        throw new Error(payload.error ?? "Failed to save question");
      }

      router.push("/admin?tab=questions");
      router.refresh();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to save question");
      setIsSaving(false);
    }
  };

  return (
    <AdminFormLayout
      title={isEditing ? "Edit Practice Question" : "Create Practice Question"}
      subtitle="Write the Burmese prompt, model English sentence, alternative accepted answers, and learner tips."
      backHref="/admin?tab=questions"
      backLabel="Back to Questions"
      databasePath={databasePath}
      error={error}
    >
      <form onSubmit={handleSubmit} className="flex flex-col gap-6">
        <section className="rounded-2xl border border-slate-200/80 bg-white p-6 shadow-xs">
          <h2 className="text-sm font-bold text-slate-900">Classification</h2>

          <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div>
              <label
                htmlFor="q-category"
                className="block text-xs font-semibold text-slate-700"
              >
                Category *
              </label>
              <select
                id="q-category"
                required
                value={categoryId}
                onChange={(event) => setCategoryId(event.target.value)}
                className="mt-1.5 w-full rounded-xl border border-slate-300 bg-slate-50/70 px-3.5 py-2.5 text-sm text-slate-900 outline-none focus:border-blue-500 focus:bg-white focus:ring-2 focus:ring-blue-500/15"
              >
                {regularCategories.map((category) => (
                  <option key={category.id} value={category.id}>
                    {category.name}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <span className="block text-xs font-semibold text-slate-700">
                Difficulty *
              </span>
              <div className="mt-1.5 grid grid-cols-3 gap-2">
                {DIFFICULTIES.map((level) => (
                  <button
                    key={level}
                    type="button"
                    onClick={() => setDifficulty(level)}
                    className={`rounded-xl border py-2.5 text-xs font-semibold capitalize transition ${
                      difficulty === level
                        ? "border-blue-600 bg-blue-600 text-white"
                        : "border-slate-200 bg-slate-50 text-slate-700 hover:border-slate-300"
                    }`}
                  >
                    {level}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section className="rounded-2xl border border-slate-200/80 bg-white p-6 shadow-xs">
          <h2 className="text-sm font-bold text-slate-900">
            Prompt &amp; Answers
          </h2>

          <div className="mt-4 flex flex-col gap-4">
            <div>
              <label
                htmlFor="q-burmese"
                className="block text-xs font-semibold text-slate-700"
              >
                Burmese Prompt (မြန်မာမေးခွန်း) *
              </label>
              <textarea
                id="q-burmese"
                required
                rows={3}
                value={burmesePrompt}
                onChange={(event) => setBurmesePrompt(event.target.value)}
                placeholder="ဥပမာ - ကျွန်တော် မနက်ဖြန် ရန်ကုန်ကို သွားမယ်။"
                className="mt-1.5 w-full rounded-xl border border-slate-300 bg-slate-50/70 px-4 py-3 font-myanmar text-base leading-relaxed text-slate-900 outline-none focus:border-blue-500 focus:bg-white focus:ring-2 focus:ring-blue-500/15"
              />
            </div>

            <div>
              <label
                htmlFor="q-english"
                className="block text-xs font-semibold text-slate-700"
              >
                Primary English Answer *
              </label>
              <input
                id="q-english"
                type="text"
                required
                value={englishAnswer}
                onChange={(event) => setEnglishAnswer(event.target.value)}
                placeholder="e.g., I will go to Yangon tomorrow."
                className="mt-1.5 w-full rounded-xl border border-slate-300 bg-slate-50/70 px-4 py-2.5 text-sm text-slate-900 outline-none focus:border-blue-500 focus:bg-white focus:ring-2 focus:ring-blue-500/15"
              />
            </div>

            <div>
              <label
                htmlFor="q-accepted"
                className="block text-xs font-semibold text-slate-700"
              >
                Alternative Accepted Answers (one sentence per line)
              </label>
              <textarea
                id="q-accepted"
                rows={4}
                value={acceptedText}
                onChange={(event) => setAcceptedText(event.target.value)}
                placeholder={
                  "I am going to Yangon tomorrow.\nTomorrow I will travel to Yangon."
                }
                className="mt-1.5 w-full rounded-xl border border-slate-300 bg-slate-50/70 px-4 py-3 text-sm leading-relaxed text-slate-900 outline-none focus:border-blue-500 focus:bg-white focus:ring-2 focus:ring-blue-500/15"
              />
            </div>
          </div>
        </section>

        <section className="rounded-2xl border border-slate-200/80 bg-white p-6 shadow-xs">
          <h2 className="text-sm font-bold text-slate-900">Learning Support</h2>

          <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div>
              <label
                htmlFor="q-hint"
                className="block text-xs font-semibold text-slate-700"
              >
                Hint (အရိပ်အမြွက်)
              </label>
              <textarea
                id="q-hint"
                rows={3}
                value={hint}
                onChange={(event) => setHint(event.target.value)}
                placeholder="e.g., မနက်ဖြန် = tomorrow"
                className="mt-1.5 w-full rounded-xl border border-slate-300 bg-slate-50/70 px-3.5 py-2.5 font-myanmar text-sm text-slate-900 outline-none focus:border-blue-500 focus:bg-white focus:ring-2 focus:ring-blue-500/15"
              />
            </div>

            <div>
              <label
                htmlFor="q-grammar"
                className="block text-xs font-semibold text-slate-700"
              >
                Grammar Tip (shown after checking)
              </label>
              <textarea
                id="q-grammar"
                rows={3}
                value={grammarNote}
                onChange={(event) => setGrammarNote(event.target.value)}
                placeholder="Explain the tense, preposition, or structure concisely."
                className="mt-1.5 w-full rounded-xl border border-slate-300 bg-slate-50/70 px-3.5 py-2.5 text-sm text-slate-900 outline-none focus:border-blue-500 focus:bg-white focus:ring-2 focus:ring-blue-500/15"
              />
            </div>
          </div>
        </section>

        <div className="flex items-center justify-end gap-3">
          <Link
            href="/admin?tab=questions"
            className="rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-xs font-semibold text-slate-700 transition hover:bg-slate-50"
          >
            Cancel
          </Link>
          <button
            type="submit"
            disabled={
              isSaving ||
              !categoryId ||
              !burmesePrompt.trim() ||
              !englishAnswer.trim()
            }
            className="inline-flex items-center gap-2 rounded-xl bg-blue-600 px-5 py-2.5 text-xs font-semibold text-white shadow-xs transition hover:bg-blue-700 disabled:opacity-60"
          >
            {isSaving ? (
              <Loader2 className="h-4 w-4 animate-spin" />
            ) : (
              <Save className="h-4 w-4" />
            )}
            <span>{isEditing ? "Save Question" : "Create Question"}</span>
          </button>
        </div>
      </form>
    </AdminFormLayout>
  );
}
