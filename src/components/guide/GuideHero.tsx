"use client";

import { ArrowRight, PenLine, Shuffle } from "lucide-react";
import Link from "next/link";
import { TENSE_LESSONS } from "@/data/lessons-guide-data";
import type { PracticeStats } from "@/types/practice";

interface GuideHeroProps {
  stats: PracticeStats;
  categoryCount: number;
}

export function GuideHero({ stats, categoryCount }: GuideHeroProps) {
  const tenseCount = TENSE_LESSONS.filter((l) => l.track === "tenses").length;
  const grammarCount = TENSE_LESSONS.filter(
    (l) => l.track === "grammar",
  ).length;

  return (
    <section className="flex flex-col justify-between gap-6 border-b border-slate-200/80 pb-8 lg:flex-row lg:items-end">
      <div className="max-w-2xl">
        <p className="text-xs font-semibold tracking-wider text-blue-600 uppercase">
          English Writing Handbook · {tenseCount} Tenses &amp; {grammarCount}{" "}
          Grammar Rules
        </p>

        <h1 className="mt-2 text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl">
          Learn Tenses &amp; Everyday Grammar Rules
        </h1>

        <p className="mt-2 font-myanmar text-sm leading-relaxed text-slate-600">
          အင်္ဂလိပ်စာ ကာလများ (Tenses)၊{" "}
          <span className="font-sans font-semibold text-slate-800">
            used to
          </span>
          ,{" "}
          <span className="font-sans font-semibold text-slate-800">
            be going to
          </span>{" "}
          နှင့် မရှိမဖြစ် သဒ္ဒါစည်းမျဉ်းများကို ဥပမာများဖြင့် ရှင်းလင်းစွာ လေ့လာပါ။
        </p>
      </div>

      <div className="flex flex-wrap items-center gap-2.5">
        <div className="mr-2 hidden items-center gap-4 border-r border-slate-200 pr-5 text-xs text-slate-500 sm:flex">
          <div>
            <span className="block text-base font-bold tabular-nums text-slate-900">
              {categoryCount}
            </span>
            <span>Categories</span>
          </div>
          <div>
            <span className="block text-base font-bold tabular-nums text-emerald-600">
              {stats.averageAccuracy}%
            </span>
            <span>Avg Accuracy</span>
          </div>
        </div>

        <Link
          href="/practice?category=random-mix"
          className="inline-flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-xs font-semibold text-slate-700 shadow-xs transition hover:border-slate-300 hover:bg-slate-50"
        >
          <Shuffle className="h-3.5 w-3.5 text-blue-600" />
          <span>Random Mix</span>
        </Link>

        <Link
          href="/practice"
          className="inline-flex items-center gap-2 rounded-xl bg-blue-600 px-4 py-2.5 text-xs font-semibold text-white shadow-xs transition hover:bg-blue-700"
        >
          <PenLine className="h-3.5 w-3.5" />
          <span>Start Writing Practice</span>
          <ArrowRight className="h-3.5 w-3.5" />
        </Link>
      </div>
    </section>
  );
}
