"use client";

import { AnimatePresence, motion } from "framer-motion";
import { Loader2, Save, X } from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import { useAdminStore } from "@/store/use-admin-store";
import type { Difficulty } from "@/types/practice";

const DIFFICULTIES: Difficulty[] = ["beginner", "intermediate", "advanced"];

export function QuestionFormModal() {
  const isOpen = useAdminStore((state) => state.isQuestionModalOpen);
  const editingQuestion = useAdminStore((state) => state.editingQuestion);
  const categories = useAdminStore((state) => state.categories);
  const filterCategoryId = useAdminStore((state) => state.filterCategoryId);
  const isSaving = useAdminStore((state) => state.isSaving);
  const closeModal = useAdminStore((state) => state.closeQuestionModal);
  const saveQuestion = useAdminStore((state) => state.saveQuestion);

  const regularCategories = useMemo(
    () => categories.filter((category) => !category.isRandom),
    [categories],
  );

  const [categoryId, setCategoryId] = useState("");
  const [burmesePrompt, setBurmesePrompt] = useState("");
  const [englishAnswer, setEnglishAnswer] = useState("");
  const [acceptedText, setAcceptedText] = useState("");
  const [hint, setHint] = useState("");
  const [grammarNote, setGrammarNote] = useState("");
  const [difficulty, setDifficulty] = useState<Difficulty>("beginner");

  useEffect(() => {
    if (!isOpen) {
      return;
    }

    if (editingQuestion) {
      setCategoryId(editingQuestion.categoryId);
      setBurmesePrompt(editingQuestion.burmesePrompt);
      setEnglishAnswer(editingQuestion.englishAnswer);
      setAcceptedText(editingQuestion.acceptedAnswers.join("\n"));
      setHint(editingQuestion.hint);
      setGrammarNote(editingQuestion.grammarNote);
      setDifficulty(editingQuestion.difficulty);
    } else {
      const preferredCategory =
        filterCategoryId !== "all" &&
        regularCategories.some((cat) => cat.id === filterCategoryId)
          ? filterCategoryId
          : (regularCategories[0]?.id ?? "");
      setCategoryId(preferredCategory);
      setBurmesePrompt("");
      setEnglishAnswer("");
      setAcceptedText("");
      setHint("");
      setGrammarNote("");
      setDifficulty("beginner");
    }
  }, [isOpen, editingQuestion, filterCategoryId, regularCategories]);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!categoryId || !burmesePrompt.trim() || !englishAnswer.trim()) {
      return;
    }

    const acceptedAnswers = acceptedText
      .split("\n")
      .map((line) => line.trim())
      .filter((line) => line.length > 0);

    await saveQuestion({
      categoryId,
      burmesePrompt,
      englishAnswer,
      acceptedAnswers,
      hint,
      grammarNote,
      difficulty,
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
          className="fixed inset-0 z-50 flex items-center justify-center overflow-y-auto bg-stone-950/45 p-4 backdrop-blur-xs"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 12 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.96, y: 8 }}
            transition={{ type: "spring", stiffness: 320, damping: 26 }}
            onClick={(event) => event.stopPropagation()}
            className="my-auto w-full max-w-2xl rounded-3xl border border-stone-200 bg-white p-6 shadow-2xl"
          >
            <div className="flex items-start justify-between gap-3">
              <div>
                <h2 className="text-lg font-bold text-stone-900">
                  {editingQuestion ? "Edit Question" : "Add New Question"}
                </h2>
                <p className="mt-0.5 text-xs text-stone-500">
                  Enter the Burmese question and expected English writing
                  answer.
                </p>
              </div>
              <button
                type="button"
                onClick={closeModal}
                aria-label="Close question modal"
                className="rounded-xl p-2 text-stone-400 transition hover:bg-stone-100 hover:text-stone-700"
              >
                <X className="h-4 w-4" />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="mt-5 flex flex-col gap-4">
              <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                <div>
                  <label
                    htmlFor="admin-q-category"
                    className="block text-xs font-semibold text-stone-700"
                  >
                    Category *
                  </label>
                  <select
                    id="admin-q-category"
                    required
                    value={categoryId}
                    onChange={(event) => setCategoryId(event.target.value)}
                    className="mt-1 w-full rounded-xl border border-stone-300 bg-stone-50/70 px-3 py-2 text-sm text-stone-900 outline-none focus:border-amber-500 focus:bg-white"
                  >
                    {regularCategories.map((category) => (
                      <option key={category.id} value={category.id}>
                        {category.name}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <span className="block text-xs font-semibold text-stone-700">
                    Difficulty *
                  </span>
                  <div className="mt-1 grid grid-cols-3 gap-1.5">
                    {DIFFICULTIES.map((level) => (
                      <button
                        key={level}
                        type="button"
                        onClick={() => setDifficulty(level)}
                        className={`rounded-xl border py-2 text-xs font-semibold capitalize transition ${
                          difficulty === level
                            ? "border-stone-900 bg-stone-900 text-white"
                            : "border-stone-200 bg-stone-50 text-stone-700 hover:border-stone-300"
                        }`}
                      >
                        {level}
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              <div>
                <label
                  htmlFor="admin-q-burmese"
                  className="block text-xs font-semibold text-stone-700"
                >
                  Burmese Prompt (မြန်မာမေးခွန်း) *
                </label>
                <textarea
                  id="admin-q-burmese"
                  required
                  rows={2}
                  value={burmesePrompt}
                  onChange={(event) => setBurmesePrompt(event.target.value)}
                  placeholder="ဥပမာ - ကျွန်တော် မနက်ဖြန် ရန်ကုန်ကို သွားမယ်။"
                  className="mt-1 w-full resize-none rounded-xl border border-stone-300 bg-stone-50/70 px-3.5 py-2.5 font-myanmar text-base text-stone-900 outline-none focus:border-amber-500 focus:bg-white focus:ring-2 focus:ring-amber-400/30"
                />
              </div>

              <div>
                <label
                  htmlFor="admin-q-english"
                  className="block text-xs font-semibold text-stone-700"
                >
                  Primary English Answer *
                </label>
                <input
                  id="admin-q-english"
                  type="text"
                  required
                  value={englishAnswer}
                  onChange={(event) => setEnglishAnswer(event.target.value)}
                  placeholder="e.g., I will go to Yangon tomorrow."
                  className="mt-1 w-full rounded-xl border border-stone-300 bg-stone-50/70 px-3.5 py-2.5 text-sm text-stone-900 outline-none focus:border-amber-500 focus:bg-white focus:ring-2 focus:ring-amber-400/30"
                />
              </div>

              <div>
                <label
                  htmlFor="admin-q-accepted"
                  className="block text-xs font-semibold text-stone-700"
                >
                  Alternative Accepted Answers (one per line)
                </label>
                <textarea
                  id="admin-q-accepted"
                  rows={3}
                  value={acceptedText}
                  onChange={(event) => setAcceptedText(event.target.value)}
                  placeholder={
                    "I am going to Yangon tomorrow.\nTomorrow I will travel to Yangon."
                  }
                  className="mt-1 w-full resize-none rounded-xl border border-stone-300 bg-stone-50/70 px-3.5 py-2 text-xs text-stone-900 outline-none focus:border-amber-500 focus:bg-white focus:ring-2 focus:ring-amber-400/30"
                />
              </div>

              <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                <div>
                  <label
                    htmlFor="admin-q-hint"
                    className="block text-xs font-semibold text-stone-700"
                  >
                    Hint (အရိပ်အမြွက်)
                  </label>
                  <input
                    id="admin-q-hint"
                    type="text"
                    value={hint}
                    onChange={(event) => setHint(event.target.value)}
                    placeholder="e.g., မနက်ဖြန် = tomorrow"
                    className="mt-1 w-full rounded-xl border border-stone-300 bg-stone-50/70 px-3 py-2 font-myanmar text-xs text-stone-900 outline-none focus:border-amber-500 focus:bg-white"
                  />
                </div>

                <div>
                  <label
                    htmlFor="admin-q-grammar"
                    className="block text-xs font-semibold text-stone-700"
                  >
                    Grammar Tip
                  </label>
                  <input
                    id="admin-q-grammar"
                    type="text"
                    value={grammarNote}
                    onChange={(event) => setGrammarNote(event.target.value)}
                    placeholder="Short explanation shown after checking"
                    className="mt-1 w-full rounded-xl border border-stone-300 bg-stone-50/70 px-3 py-2 text-xs text-stone-900 outline-none focus:border-amber-500 focus:bg-white"
                  />
                </div>
              </div>

              <div className="mt-2 flex items-center justify-end gap-2">
                <button
                  type="button"
                  onClick={closeModal}
                  className="rounded-xl px-4 py-2 text-xs font-semibold text-stone-600 hover:bg-stone-100"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={
                    isSaving ||
                    !categoryId ||
                    !burmesePrompt.trim() ||
                    !englishAnswer.trim()
                  }
                  className="inline-flex items-center gap-1.5 rounded-xl bg-amber-500 px-5 py-2 text-xs font-semibold text-white shadow-xs transition hover:bg-amber-600 disabled:opacity-60"
                >
                  {isSaving ? (
                    <Loader2 className="h-3.5 w-3.5 animate-spin" />
                  ) : (
                    <Save className="h-3.5 w-3.5" />
                  )}
                  <span>
                    {editingQuestion ? "Save Question" : "Add Question"}
                  </span>
                </button>
              </div>
            </form>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
