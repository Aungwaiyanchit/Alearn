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
    <div className="min-h-screen bg-[#F8F7F4] text-stone-900">
      <AppHeader
        showLocalAdmin={showLocalAdmin}
        initialStats={stats}
        showRandomModalTrigger={false}
      />

      <main className="mx-auto flex max-w-6xl flex-col gap-8 px-4 py-6 sm:px-6 lg:py-8">
        <GuideHero stats={stats} categoryCount={categoryCount} />

        {/* Interactive Tenses Explorer */}
        <section className="flex flex-col gap-4">
          <div>
            <h2 className="text-xl font-bold text-stone-900">
              How English Tenses Work
            </h2>
            <p className="mt-0.5 font-myanmar text-xs text-stone-500">
              ကာလတစ်ခုချင်းစီ၏ ဖွဲ့စည်းပုံ၊ အချိန်ပြမျဉ်းနှင့် ဥပမာဝါကျများကို ရွေးချယ်လေ့လာပါ။
            </p>
          </div>

          <div className="grid grid-cols-1 gap-6 lg:grid-cols-12">
            <div className="lg:col-span-4">
              <TenseLessonList />
            </div>
            <div className="lg:col-span-8">
              <TenseLessonDetail />
            </div>
          </div>
        </section>

        {/* Side-by-Side Same-Verb Cheat Sheet */}
        <TenseComparisonTable />

        {/* Tips & Tricks Section */}
        <WritingTipsGrid />

        {/* Bottom Practice CTA */}
        <section className="flex flex-col items-center justify-between gap-4 rounded-3xl border border-stone-200/90 bg-stone-900 p-6 text-white shadow-sm sm:flex-row sm:p-7">
          <div>
            <h2 className="text-lg font-bold">
              Ready to test these tenses in action?
            </h2>
            <p className="mt-1 font-myanmar text-xs text-stone-300">
              သင်ခန်းစာလမ်းညွှန်ကို ဖတ်ပြီးပြီဆိုရင် အင်္ဂလိပ်စာ လက်တွေ့ရေးသားလေ့ကျင့်ခန်းကို စတင်လိုက်ပါ။
            </p>
          </div>
          <Link
            href="/practice"
            className="inline-flex shrink-0 items-center gap-2 rounded-xl bg-amber-500 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-amber-600"
          >
            <PenLine className="h-4 w-4" />
            <span>Open Writing Practice</span>
            <ArrowRight className="h-4 w-4" />
          </Link>
        </section>
      </main>
    </div>
  );
}
