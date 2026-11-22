"use client";

import { AnimatePresence, motion } from "framer-motion";
import { BookOpen, CheckCircle2, FolderKanban, X, XCircle } from "lucide-react";
import { useEffect, useRef } from "react";
import { AdminHeader } from "@/components/admin/AdminHeader";
import { AdminStatsBar } from "@/components/admin/AdminStatsBar";
import { BulkCsvImportModal } from "@/components/admin/BulkCsvImportModal";
import { CategoryFormModal } from "@/components/admin/CategoryFormModal";
import { CategoryManager } from "@/components/admin/CategoryManager";
import { DestroyAllModal } from "@/components/admin/DestroyAllModal";
import { QuestionFormModal } from "@/components/admin/QuestionFormModal";
import { QuestionManager } from "@/components/admin/QuestionManager";
import { useAdminStore } from "@/store/use-admin-store";
import type { Category, LessonQuestion, PracticeStats } from "@/types/practice";

interface AdminShellProps {
  initialCategories: Category[];
  initialQuestions: LessonQuestion[];
  initialStats: PracticeStats;
  databasePath: string;
}

export function AdminShell({
  initialCategories,
  initialQuestions,
  initialStats,
  databasePath,
}: AdminShellProps) {
  const hydratedRef = useRef(false);
  const hydrateInitial = useAdminStore((state) => state.hydrateInitial);
  const activeTab = useAdminStore((state) => state.activeTab);
  const setActiveTab = useAdminStore((state) => state.setActiveTab);
  const notice = useAdminStore((state) => state.notice);
  const clearNotice = useAdminStore((state) => state.clearNotice);

  useEffect(() => {
    if (!hydratedRef.current) {
      hydratedRef.current = true;
      hydrateInitial({
        categories: initialCategories,
        questions: initialQuestions,
        stats: initialStats,
        databasePath,
      });
    }
  }, [
    hydrateInitial,
    initialCategories,
    initialQuestions,
    initialStats,
    databasePath,
  ]);

  useEffect(() => {
    if (!notice) {
      return;
    }
    const timer = setTimeout(() => {
      clearNotice();
    }, 3500);
    return () => clearTimeout(timer);
  }, [notice, clearNotice]);

  return (
    <div className="min-h-screen bg-[#F8F7F4] text-stone-900">
      <AdminHeader />

      <main className="mx-auto flex max-w-6xl flex-col gap-6 px-4 py-6 sm:px-6 lg:py-8">
        <AdminStatsBar />

        {/* Toast Notification */}
        <AnimatePresence>
          {notice && (
            <motion.div
              key={notice.id}
              initial={{ opacity: 0, y: -8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              className={`flex items-center justify-between gap-3 rounded-2xl border px-4 py-3 text-xs font-semibold ${
                notice.type === "success"
                  ? "border-emerald-200 bg-emerald-50 text-emerald-800"
                  : "border-rose-200 bg-rose-50 text-rose-800"
              }`}
            >
              <div className="flex items-center gap-2">
                {notice.type === "success" ? (
                  <CheckCircle2 className="h-4 w-4 shrink-0" />
                ) : (
                  <XCircle className="h-4 w-4 shrink-0" />
                )}
                <span>{notice.message}</span>
              </div>
              <button
                type="button"
                onClick={clearNotice}
                aria-label="Dismiss notification"
                className="rounded-lg p-1 opacity-70 hover:opacity-100"
              >
                <X className="h-3.5 w-3.5" />
              </button>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Tab Navigation */}
        <div className="inline-flex w-fit items-center gap-1 rounded-2xl border border-stone-200/90 bg-white p-1 shadow-xs">
          <button
            type="button"
            onClick={() => setActiveTab("questions")}
            className={`inline-flex items-center gap-2 rounded-xl px-4 py-2 text-xs font-semibold transition ${
              activeTab === "questions"
                ? "bg-stone-900 text-white shadow-xs"
                : "text-stone-600 hover:bg-stone-100 hover:text-stone-900"
            }`}
          >
            <BookOpen className="h-3.5 w-3.5" />
            <span>Questions</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab("categories")}
            className={`inline-flex items-center gap-2 rounded-xl px-4 py-2 text-xs font-semibold transition ${
              activeTab === "categories"
                ? "bg-stone-900 text-white shadow-xs"
                : "text-stone-600 hover:bg-stone-100 hover:text-stone-900"
            }`}
          >
            <FolderKanban className="h-3.5 w-3.5" />
            <span>Categories</span>
          </button>
        </div>

        {activeTab === "questions" ? <QuestionManager /> : <CategoryManager />}
      </main>

      <CategoryFormModal />
      <QuestionFormModal />
      <BulkCsvImportModal />
      <DestroyAllModal />
    </div>
  );
}
