"use client";

import { AnimatePresence, motion } from "framer-motion";
import { Dices, Loader2, Sparkles, X } from "lucide-react";
import { useState } from "react";
import { RANDOM_CATEGORY_NAME_IDEAS } from "@/lib/category-styles";
import { usePracticeStore } from "@/store/use-practice-store";
import type { Difficulty } from "@/types/practice";

const QUESTION_COUNTS = [4, 6, 8, 12] as const;

const DIFFICULTY_OPTIONS: Array<{
  value: Difficulty | "all";
  label: string;
  burmese: string;
}> = [
  { value: "all", label: "All Levels", burmese: "အဆင့်စုံ" },
  { value: "beginner", label: "Beginner", burmese: "အခြေခံ" },
  { value: "intermediate", label: "Intermediate", burmese: "အလယ်အလတ်" },
  { value: "advanced", label: "Advanced", burmese: "အဆင့်မြင့်" },
];

export function RandomCategoryModal() {
  const isOpen = usePracticeStore((state) => state.isRandomModalOpen);
  const isCreating = usePracticeStore((state) => state.isCreatingRandom);
  const closeModal = usePracticeStore((state) => state.closeRandomModal);
  const createRandomCategory = usePracticeStore(
    (state) => state.createRandomCategory,
  );

  const [name, setName] = useState("Daily Fluency Shuffle");
  const [count, setCount] = useState<number>(6);
  const [difficulty, setDifficulty] = useState<Difficulty | "all">("all");

  const handleRollRandomName = () => {
    const others = RANDOM_CATEGORY_NAME_IDEAS.filter((idea) => idea !== name);
    const picked = others[Math.floor(Math.random() * others.length)];
    if (picked) {
      setName(picked);
    }
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    await createRandomCategory({
      name: name.trim() || "Random Challenge",
      count,
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
          className="fixed inset-0 z-50 flex items-center justify-center bg-stone-950/45 p-4 backdrop-blur-xs"
          onClick={closeModal}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.94, y: 12 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 8 }}
            transition={{ type: "spring", stiffness: 320, damping: 26 }}
            onClick={(event) => event.stopPropagation()}
            className="w-full max-w-md rounded-3xl border border-stone-200 bg-white p-6 shadow-2xl"
          >
            <div className="flex items-start justify-between gap-3">
              <div>
                <div className="inline-flex items-center gap-1.5 rounded-full bg-amber-100 px-2.5 py-1 text-xs font-semibold text-amber-800">
                  <Sparkles className="h-3.5 w-3.5" />
                  <span>Random Category Builder</span>
                </div>
                <h2 className="mt-2 text-lg font-bold text-stone-900">
                  Create a Custom Random Set
                </h2>
                <p className="mt-0.5 font-myanmar text-xs text-stone-500">
                  ကျပန်းမေးခွန်းများ စုစည်းပြီး ကိုယ်ပိုင်ကဏ္ဍအသစ် ဖန်တီးပါ။
                </p>
              </div>
              <button
                type="button"
                onClick={closeModal}
                aria-label="Close modal"
                className="rounded-xl p-2 text-stone-400 transition hover:bg-stone-100 hover:text-stone-700"
              >
                <X className="h-4 w-4" />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="mt-5 flex flex-col gap-5">
              {/* Name Input */}
              <div>
                <label
                  htmlFor="random-category-name"
                  className="block text-xs font-semibold text-stone-700"
                >
                  Category Name
                </label>
                <div className="mt-1.5 flex gap-2">
                  <input
                    id="random-category-name"
                    type="text"
                    value={name}
                    onChange={(event) => setName(event.target.value)}
                    placeholder="e.g., Morning Writing Sprint"
                    maxLength={48}
                    className="flex-1 rounded-xl border border-stone-300 bg-stone-50/70 px-3.5 py-2.5 text-sm text-stone-900 outline-none transition focus:border-amber-500 focus:bg-white focus:ring-2 focus:ring-amber-400/30"
                  />
                  <motion.button
                    type="button"
                    whileTap={{ rotate: 180, scale: 0.92 }}
                    onClick={handleRollRandomName}
                    title="Generate a random category name"
                    className="flex items-center justify-center rounded-xl border border-stone-200 bg-stone-100 px-3 text-stone-700 transition hover:bg-amber-100 hover:text-amber-800"
                  >
                    <Dices className="h-4 w-4" />
                  </motion.button>
                </div>
              </div>

              {/* Question Count */}
              <div>
                <span className="block text-xs font-semibold text-stone-700">
                  Number of Random Questions
                </span>
                <div className="mt-1.5 grid grid-cols-4 gap-2">
                  {QUESTION_COUNTS.map((option) => (
                    <button
                      key={option}
                      type="button"
                      onClick={() => setCount(option)}
                      className={`rounded-xl border py-2 text-sm font-semibold transition ${
                        count === option
                          ? "border-stone-900 bg-stone-900 text-white"
                          : "border-stone-200 bg-stone-50 text-stone-700 hover:border-stone-300"
                      }`}
                    >
                      {option} Qs
                    </button>
                  ))}
                </div>
              </div>

              {/* Difficulty Filter */}
              <div>
                <span className="block text-xs font-semibold text-stone-700">
                  Difficulty Pool
                </span>
                <div className="mt-1.5 grid grid-cols-2 gap-2">
                  {DIFFICULTY_OPTIONS.map((option) => (
                    <button
                      key={option.value}
                      type="button"
                      onClick={() => setDifficulty(option.value)}
                      className={`flex flex-col items-start rounded-xl border px-3 py-2 text-left transition ${
                        difficulty === option.value
                          ? "border-amber-500 bg-amber-50 text-amber-950"
                          : "border-stone-200 bg-stone-50/70 text-stone-700 hover:border-stone-300"
                      }`}
                    >
                      <span className="text-xs font-semibold">
                        {option.label}
                      </span>
                      <span className="font-myanmar text-[11px] text-stone-500">
                        {option.burmese}
                      </span>
                    </button>
                  ))}
                </div>
              </div>

              <div className="mt-1 flex items-center justify-end gap-2.5">
                <button
                  type="button"
                  onClick={closeModal}
                  className="rounded-xl px-4 py-2.5 text-sm font-medium text-stone-600 transition hover:bg-stone-100"
                >
                  Cancel
                </button>
                <motion.button
                  type="submit"
                  disabled={isCreating}
                  whileHover={{ scale: 1.01 }}
                  whileTap={{ scale: 0.98 }}
                  className="inline-flex items-center gap-2 rounded-xl bg-amber-500 px-5 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:bg-amber-600 disabled:opacity-60"
                >
                  {isCreating ? (
                    <>
                      <Loader2 className="h-4 w-4 animate-spin" />
                      <span>Generating...</span>
                    </>
                  ) : (
                    <>
                      <Dices className="h-4 w-4" />
                      <span>Create &amp; Practice</span>
                    </>
                  )}
                </motion.button>
              </div>
            </form>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
