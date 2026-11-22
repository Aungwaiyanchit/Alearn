"use client";

import { useEffect, useRef } from "react";
import { CategorySidebar } from "@/components/categories/CategorySidebar";
import { RandomCategoryModal } from "@/components/categories/RandomCategoryModal";
import { AppHeader } from "@/components/layout/AppHeader";
import { PracticeWorkspace } from "@/components/practice/PracticeWorkspace";
import { usePracticeStore } from "@/store/use-practice-store";
import type { Category, LessonQuestion, PracticeStats } from "@/types/practice";

interface PracticeAppShellProps {
  initialCategories: Category[];
  initialQuestions: LessonQuestion[];
  initialStats: PracticeStats;
  initialCategoryId: string;
  showLocalAdmin: boolean;
}

export function PracticeAppShell({
  initialCategories,
  initialQuestions,
  initialStats,
  initialCategoryId,
  showLocalAdmin,
}: PracticeAppShellProps) {
  const hydratedRef = useRef(false);
  const hydrateInitial = usePracticeStore((state) => state.hydrateInitial);

  useEffect(() => {
    if (!hydratedRef.current) {
      hydratedRef.current = true;
      hydrateInitial({
        categories: initialCategories,
        questions: initialQuestions,
        stats: initialStats,
        selectedCategoryId: initialCategoryId,
      });
    }
  }, [
    hydrateInitial,
    initialCategories,
    initialQuestions,
    initialStats,
    initialCategoryId,
  ]);

  return (
    <div className="min-h-screen bg-[#F8F7F4] text-stone-900">
      <AppHeader showLocalAdmin={showLocalAdmin} />

      <main className="mx-auto grid max-w-6xl grid-cols-1 gap-6 px-4 py-6 sm:px-6 lg:grid-cols-12 lg:gap-8 lg:py-8">
        <div className="order-2 lg:order-1 lg:col-span-4">
          <CategorySidebar />
        </div>

        <div className="order-1 lg:order-2 lg:col-span-8">
          <PracticeWorkspace />
        </div>
      </main>

      <RandomCategoryModal />
    </div>
  );
}
