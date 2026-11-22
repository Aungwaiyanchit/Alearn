"use client";

import { ArrowRight, PenLine } from "lucide-react";
import Link from "next/link";
import { GuideHero } from "@/components/guide/GuideHero";
import { TenseComparisonTable } from "@/components/guide/TenseComparisonTable";
import { TenseLessonDetail } from "@/components/guide/TenseLessonDetail";
import { TenseLessonList } from "@/components/guide/TenseLessonList";
import { WritingTipsGrid } from "@/components/guide/WritingTipsGrid";
import { AppHeader } from "@/components/layout/AppHeader";
import type { PracticeStats } from "@/types/practice";

interface LessonsGuideShellProps {
  stats: PracticeStats;
  categoryCount: number;
  showLocalAdmin: boolean;
}

export function LessonsGuideShell({
  stats,
  categoryCount,
  showLocalAdmin,
}: LessonsGuideShellProps) {
  return (
    <div className="min-h-screen bg-[#F8FAFC] text-slate-900">
      <AppHeader
        showLocalAdmin={showLocalAdmin}
        initialStats={stats}
        showRandomModalTrigger={false}
      />

      <main className="mx-auto flex max-w-6xl flex-col gap-10 px-4 py-8 sm:px-6 lg:py-10">
        <GuideHero stats={stats} categoryCount={categoryCount} />

        {/* Interactive Curriculum + Lesson Reader */}
        <section className="grid grid-cols-1 items-start gap-6 lg:grid-cols-12">
          <div className="lg:sticky lg:top-24 lg:col-span-4">
            <TenseLessonList />
          </div>
          <div className="lg:col-span-8">
            <TenseLessonDetail />
          </div>
        </section>

        {/* Side-by-Side Comparison Cheat Sheet */}
        <TenseComparisonTable />

        {/* Tips & Tricks */}
        <WritingTipsGrid />

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
