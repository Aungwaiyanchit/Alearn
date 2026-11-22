"use client";

import {
  BookCheck,
  BookOpen,
  Dices,
  PenLine,
  ShieldCheck,
  Target,
} from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { usePracticeStore } from "@/store/use-practice-store";
import type { PracticeStats } from "@/types/practice";

interface AppHeaderProps {
  showLocalAdmin?: boolean;
  initialStats?: PracticeStats;
  showRandomModalTrigger?: boolean;
}

export function AppHeader({
  showLocalAdmin = false,
  initialStats,
  showRandomModalTrigger = true,
}: AppHeaderProps) {
  const pathname = usePathname();
  const storeStats = usePracticeStore((state) => state.stats);
  const openRandomModal = usePracticeStore((state) => state.openRandomModal);

  const stats =
    storeStats.totalQuestions > 0 ? storeStats : (initialStats ?? storeStats);

  const isGuideActive = pathname === "/";
  const isPracticeActive = pathname.startsWith("/practice");

  return (
    <header className="sticky top-0 z-30 border-b border-stone-200/80 bg-[#F8F7F4]/90 backdrop-blur-md">
      <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-3 px-4 py-3 sm:px-6">
        {/* Brand + Primary Navigation */}
        <div className="flex items-center gap-4">
          <Link href="/" className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-stone-900 text-amber-400 shadow-xs">
              <PenLine className="h-5 w-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-base font-bold tracking-tight text-stone-900">
                  ALearn
                </span>
                <span className="rounded-full bg-amber-100 px-2 py-0.5 text-[10px] font-bold tracking-wide text-amber-800 uppercase">
                  MM → EN
                </span>
              </div>
              <p className="hidden font-myanmar text-xs text-stone-500 sm:block">
                အင်္ဂလိပ်စာ ရေးသားမှု လေ့ကျင့်ရေး
              </p>
            </div>
          </Link>

          <nav
            aria-label="Primary navigation"
            className="flex items-center gap-1 rounded-2xl border border-stone-200/90 bg-white p-1 shadow-xs"
          >
            <Link
              href="/"
              className={`inline-flex items-center gap-1.5 rounded-xl px-3 py-1.5 text-xs font-semibold transition ${
                isGuideActive
                  ? "bg-stone-900 text-white shadow-xs"
                  : "text-stone-600 hover:bg-stone-100 hover:text-stone-900"
              }`}
            >
              <BookOpen className="h-3.5 w-3.5" />
              <span>Lessons Guide</span>
            </Link>

            <Link
              href="/practice"
              className={`inline-flex items-center gap-1.5 rounded-xl px-3 py-1.5 text-xs font-semibold transition ${
                isPracticeActive
                  ? "bg-stone-900 text-white shadow-xs"
                  : "text-stone-600 hover:bg-stone-100 hover:text-stone-900"
              }`}
            >
              <PenLine className="h-3.5 w-3.5" />
              <span>Practice</span>
            </Link>
          </nav>
        </div>

        {/* Progress Pills & Actions */}
        <div className="flex items-center gap-2">
          <div className="hidden items-center gap-2 rounded-2xl border border-stone-200/90 bg-white px-3 py-1.5 text-xs lg:flex">
            <BookCheck className="h-4 w-4 text-emerald-600" />
            <span className="font-semibold tabular-nums text-stone-900">
              {stats.masteredCount}/{stats.totalQuestions}
            </span>
            <span className="text-stone-400">mastered</span>
          </div>

          <div className="hidden items-center gap-2 rounded-2xl border border-stone-200/90 bg-white px-3 py-1.5 text-xs xl:flex">
            <Target className="h-4 w-4 text-amber-500" />
            <span className="font-semibold tabular-nums text-stone-900">
              {stats.averageAccuracy}%
            </span>
            <span className="text-stone-400">accuracy</span>
          </div>

          {showRandomModalTrigger ? (
            <button
              type="button"
              onClick={openRandomModal}
              className="inline-flex items-center gap-1.5 rounded-xl bg-amber-500 px-3.5 py-2 text-xs font-semibold text-white shadow-xs transition hover:bg-amber-600"
            >
              <Dices className="h-3.5 w-3.5" />
              <span>New Random Set</span>
            </button>
          ) : (
            <Link
              href="/practice"
              className="inline-flex items-center gap-1.5 rounded-xl bg-amber-500 px-3.5 py-2 text-xs font-semibold text-white shadow-xs transition hover:bg-amber-600"
            >
              <PenLine className="h-3.5 w-3.5" />
              <span>Start Practice</span>
            </Link>
          )}

          {showLocalAdmin && (
            <Link
              href="/admin"
              title="Local-only Admin panel"
              className="inline-flex items-center gap-1.5 rounded-xl border border-stone-300 bg-white px-3 py-2 text-xs font-semibold text-stone-700 shadow-xs transition hover:border-stone-400 hover:bg-stone-50"
            >
              <ShieldCheck className="h-3.5 w-3.5 text-emerald-600" />
              <span className="hidden sm:inline">Admin</span>
            </Link>
          )}
        </div>
      </div>
    </header>
  );
}
