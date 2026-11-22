"use client";

import { AnimatePresence } from "framer-motion";
import { Loader2 } from "lucide-react";
import { AnimatedTypingInput } from "@/components/practice/AnimatedTypingInput";
import { AnswerFeedback } from "@/components/practice/AnswerFeedback";
import { BurmesePromptCard } from "@/components/practice/BurmesePromptCard";
import { CelebrationBurst } from "@/components/practice/CelebrationBurst";
import { ProgressHeader } from "@/components/practice/ProgressHeader";
import { SessionSummary } from "@/components/practice/SessionSummary";
import { usePracticeStore } from "@/store/use-practice-store";

export function PracticeWorkspace() {
  const categories = usePracticeStore((state) => state.categories);
  const selectedCategoryId = usePracticeStore(
    (state) => state.selectedCategoryId,
  );
  const questions = usePracticeStore((state) => state.questions);
  const currentIndex = usePracticeStore((state) => state.currentIndex);
  const typedAnswer = usePracticeStore((state) => state.typedAnswer);
  const keystrokePulse = usePracticeStore((state) => state.keystrokePulse);
  const shakeCount = usePracticeStore((state) => state.shakeCount);
  const celebrationCount = usePracticeStore((state) => state.celebrationCount);
  const showHint = usePracticeStore((state) => state.showHint);
  const evaluation = usePracticeStore((state) => state.evaluation);
  const streak = usePracticeStore((state) => state.streak);
  const bestStreak = usePracticeStore((state) => state.bestStreak);
  const sessionResults = usePracticeStore((state) => state.sessionResults);
  const isSessionComplete = usePracticeStore(
    (state) => state.isSessionComplete,
  );
  const isLoadingQuestions = usePracticeStore(
    (state) => state.isLoadingQuestions,
  );
  const error = usePracticeStore((state) => state.error);

  const setTypedAnswer = usePracticeStore((state) => state.setTypedAnswer);
  const toggleHint = usePracticeStore((state) => state.toggleHint);
  const submitAnswer = usePracticeStore((state) => state.submitAnswer);
  const retryCurrent = usePracticeStore((state) => state.retryCurrent);
  const nextQuestion = usePracticeStore((state) => state.nextQuestion);
  const restartSession = usePracticeStore((state) => state.restartSession);
  const selectCategory = usePracticeStore((state) => state.selectCategory);

  const activeCategory = categories.find(
    (category) => category.id === selectedCategoryId,
  );

  const categoryTitle =
    selectedCategoryId === "random-mix"
      ? "Instant Random Mix"
      : (activeCategory?.name ?? "English Writing Practice");

  const categoryBurmese =
    selectedCategoryId === "random-mix"
      ? "ကဏ္ဍစုံမှ ကျပန်းရွေးချယ်ထားသော မေးခွန်းများ"
      : (activeCategory?.burmeseName ?? "အင်္ဂလိပ်စာ ရေးသားမှု လေ့ကျင့်ခန်း");

  const currentQuestion = questions[currentIndex];

  if (isLoadingQuestions) {
    return (
      <div className="flex min-h-[380px] flex-col items-center justify-center rounded-3xl border border-stone-200 bg-white p-10 text-stone-500">
        <Loader2 className="h-7 w-7 animate-spin text-amber-500" />
        <p className="mt-3 text-sm font-medium">Loading practice prompts...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="rounded-3xl border border-rose-200 bg-rose-50 p-6 text-sm text-rose-800">
        {error}
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-5">
      <CelebrationBurst triggerKey={celebrationCount} />

      {isSessionComplete ? (
        <SessionSummary
          categoryTitle={categoryTitle}
          results={sessionResults}
          bestStreak={bestStreak}
          onRestart={(shuffle) => restartSession(shuffle)}
          onRandomMix={() => selectCategory("random-mix", { count: 8 })}
        />
      ) : currentQuestion ? (
        <>
          <ProgressHeader
            categoryTitle={categoryTitle}
            categoryBurmese={categoryBurmese}
            currentIndex={currentIndex}
            totalQuestions={questions.length}
            difficulty={currentQuestion.difficulty}
            streak={streak}
            onRestart={(shuffle) => restartSession(shuffle)}
          />

          <BurmesePromptCard
            question={currentQuestion}
            showHint={showHint}
            onToggleHint={toggleHint}
          />

          <AnimatedTypingInput
            questionId={currentQuestion.id}
            value={typedAnswer}
            keystrokePulse={keystrokePulse}
            shakeCount={shakeCount}
            evaluation={evaluation}
            onChange={setTypedAnswer}
            onSubmit={submitAnswer}
            onNext={nextQuestion}
            onToggleHint={toggleHint}
          />

          <AnimatePresence>
            {evaluation && (
              <AnswerFeedback
                question={currentQuestion}
                evaluation={evaluation}
                isLastQuestion={currentIndex >= questions.length - 1}
                onRetry={retryCurrent}
                onNext={nextQuestion}
              />
            )}
          </AnimatePresence>
        </>
      ) : (
        <div className="rounded-3xl border border-stone-200 bg-white p-8 text-center text-sm text-stone-500">
          Select a category from the sidebar to begin writing practice.
        </div>
      )}
    </div>
  );
}
