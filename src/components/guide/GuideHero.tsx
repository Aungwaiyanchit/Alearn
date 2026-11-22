"use client";

import { motion } from "framer-motion";
import { ArrowRight, BookOpenCheck, PenLine, Shuffle } from "lucide-react";
import Link from "next/link";
import type { PracticeStats } from "@/types/practice";

interface GuideHeroProps {
  stats: PracticeStats;
  categoryCount: number;
}

export function GuideHero({ stats, categoryCount }: GuideHeroProps) {
  return (
    <motion.section
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.32, ease: [0.22, 1, 0.36, 1] }}
      className="relative overflow-hidden rounded-3xl border border-stone-200/90 bg-white p-6 shadow-xs sm:p-8"
    >
      <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
        <div className="max-w-2xl">
          <div className="inline-flex items-center gap-1.5 rounded-full border border-amber-200 bg-amber-50 px-3 py-1 text-xs font-semibold text-amber-800">
            <BookOpenCheck className="h-3.5 w-3.5" />
            <span>Lessons Guide · Tenses, Examples &amp; Writing Tricks</span>
          </div>

          <h1 className="mt-3 text-2xl font-bold tracking-tight text-stone-900 sm:text-3xl">
            Understand How English Tenses Work Before You Write
          </h1>

          <p className="mt-2 font-myanmar text-sm leading-relaxed text-stone-600 sm:text-base">
            အင်္ဂလိပ်စာ ကာလများ (Tenses)၊ ဝါကျတည်ဆောက်ပုံများ၊ မြန်မာ→အင်္ဂလိပ် ဥပမာများနှင့်
            ရေးသားရာတွင် သတိထားရမည့် နည်းလမ်းကောင်းများကို အလွယ်တကူ လေ့လာပြီး
            လက်တွေ့ရေးသားလေ့ကျင့်ပါ။
          </p>

          <div className="mt-5 flex flex-wrap items-center gap-2.5">
            <Link
              href="/practice"
              className="inline-flex items-center gap-2 rounded-xl bg-stone-900 px-5 py-2.5 text-sm font-semibold text-white shadow-xs transition hover:bg-stone-800"
            >
              <PenLine className="h-4 w-4 text-amber-400" />
              <span>Start Writing Practice</span>
              <ArrowRight className="h-4 w-4" />
            </Link>

            <Link
              href="/practice?category=random-mix"
              className="inline-flex items-center gap-2 rounded-xl border border-amber-300 bg-amber-50 px-4 py-2.5 text-sm font-semibold text-amber-950 transition hover:bg-amber-100"
            >
              <Shuffle className="h-4 w-4 text-amber-600" />
              <span>Quick Random Mix</span>
            </Link>
          </div>
        </div>

        {/* Compact Progress Snapshot */}
        <div className="grid grid-cols-3 gap-2.5 lg:w-80 lg:shrink-0">
          <div className="rounded-2xl border border-stone-200/80 bg-stone-50/70 p-3.5 text-center">
            <div className="text-xl font-bold tabular-nums text-stone-900">
              {categoryCount}
            </div>
            <div className="mt-0.5 text-[11px] font-medium text-stone-500">
              Categories
            </div>
          </div>
          <div className="rounded-2xl border border-stone-200/80 bg-stone-50/70 p-3.5 text-center">
            <div className="text-xl font-bold tabular-nums text-emerald-600">
              {stats.masteredCount}/{stats.totalQuestions}
            </div>
            <div className="mt-0.5 text-[11px] font-medium text-stone-500">
              Mastered
            </div>
          </div>
          <div className="rounded-2xl border border-stone-200/80 bg-stone-50/70 p-3.5 text-center">
            <div className="text-xl font-bold tabular-nums text-amber-600">
              {stats.averageAccuracy}%
            </div>
            <div className="mt-0.5 text-[11px] font-medium text-stone-500">
              Accuracy
            </div>
          </div>
        </div>
      </div>
    </motion.section>
  );
}
