"use client";

import { ArrowRight, BookOpen, PenLine, ShieldCheck } from "lucide-react";
import Link from "next/link";
import { useEffect } from "react";
import { GuideHero } from "@/components/guide/GuideHero";
import { TenseLessonDetail } from "@/components/guide/TenseLessonDetail";
import { TenseLessonList } from "@/components/guide/TenseLessonList";
import { AppHeader } from "@/components/layout/AppHeader";
import { useGuideStore } from "@/store/use-guide-store";
import type { TenseLesson, WritingTip } from "@/types/guide";
import type { PracticeStats } from "@/types/practice";

interface LessonsGuideShellProps {
  initialLessons: TenseLesson[];
  initialTips: WritingTip[];
  stats: PracticeStats;
  categoryCount: number;
  showLocalAdmin: boolean;
}

export function LessonsGuideShell({
  initialLessons,
  initialTips,
  stats,
  categoryCount,
  showLocalAdmin,
}: LessonsGuideShellProps) {
  const hydrateInitial = useGuideStore((state) => state.hydrateInitial);
  const storeLessons = useGuideStore((state) => state.lessons);

  useEffect(() => {
    hydrateInitial({ lessons: initialLessons, tips: initialTips });
  }, [hydrateInitial, initialLessons, initialTips]);

  const lessons = storeLessons.length > 0 ? storeLessons : initialLessons;

  return (
    <div className="min-h-screen bg-[#F8FAFC] text-slate-900">
      <AppHeader
        showLocalAdmin={showLocalAdmin}
        initialStats={stats}
        showRandomModalTrigger={false}
      />

      <main className="mx-auto flex max-w-6xl flex-col gap-8 px-4 py-8 sm:px-6 lg:py-10">
        <GuideHero
          lessons={lessons}
          stats={stats}
          categoryCount={categoryCount}
        />

        {lessons.length === 0 ? (
          <section className="flex flex-col items-center justify-center rounded-2xl border border-dashed border-slate-300 bg-white px-6 py-14 text-center">
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-slate-100 text-slate-400">
              <BookOpen className="h-6 w-6" />
            </div>
            <h2 className="mt-4 text-base font-bold text-slate-900">
              No grammar guide lessons yet
            </h2>
            <p className="mt-1 max-w-sm text-xs text-slate-500">
              Add your own tenses and grammar rules in the local Admin panel, or
              jump directly into Writing Practice.
            </p>
            <div className="mt-5 flex flex-wrap items-center justify-center gap-2.5">
              {showLocalAdmin && (
                <Link
                  href="/admin"
                  className="inline-flex items-center gap-1.5 rounded-xl bg-blue-600 px-4 py-2 text-xs font-semibold text-white shadow-xs transition hover:bg-blue-700"
                >
                  <ShieldCheck className="h-3.5 w-3.5" />
                  <span>Open Local Admin</span>
                </Link>
              )}
              <Link
                href="/practice"
                className="inline-flex items-center gap-1.5 rounded-xl border border-slate-200 bg-white px-4 py-2 text-xs font-semibold text-slate-700 transition hover:bg-slate-50"
              >
                <PenLine className="h-3.5 w-3.5" />
                <span>Go to Practice</span>
              </Link>
            </div>
          </section>
        ) : (
          <section className="grid grid-cols-1 items-start gap-6 lg:grid-cols-12">
            <div className="lg:sticky lg:top-24 lg:col-span-4">
              <TenseLessonList />
            </div>
            <div className="lg:col-span-8">
              <TenseLessonDetail />
            </div>
          </section>
        )}

        {/* Clean Practice Callout */}
        <section className="flex flex-col items-start justify-between gap-4 rounded-2xl border border-blue-200/80 bg-blue-50/70 p-6 sm:flex-row sm:items-center sm:p-7">
          <div>
            <h2 className="text-base font-bold text-slate-900">
              Ready to practice writing in English?
            </h2>
            <p className="mt-1 font-myanmar text-xs text-slate-600">
              သင်ခန်းစာစည်းမျဉ်းများကို လေ့လာပြီးပြီဆိုရင် လက်တွေ့ မြန်မာ→အင်္ဂလိပ် ရေးသားလေ့ကျင့်ခန်းကို
              စတင်လိုက်ပါ။
            </p>
          </div>
          <Link
            href="/practice"
            className="inline-flex shrink-0 items-center gap-2 rounded-xl bg-blue-600 px-5 py-2.5 text-xs font-semibold text-white shadow-xs transition hover:bg-blue-700"
          >
            <PenLine className="h-3.5 w-3.5" />
            <span>Open Writing Practice</span>
            <ArrowRight className="h-3.5 w-3.5" />
          </Link>
        </section>
      </main>
    </div>
  );
}
