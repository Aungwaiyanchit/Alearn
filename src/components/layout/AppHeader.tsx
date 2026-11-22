"use client";

import { BookOpen, Dices, PenLine, ShieldCheck } from "lucide-react";
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
    <header className="sticky top-0 z-30 border-b border-slate-200/80 bg-white/90 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between gap-4 px-4 sm:px-6">
        {/* Brand */}
        <Link href="/" className="flex items-center gap-2.5">
          <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-blue-600 text-white shadow-xs">
            <PenLine className="h-4 w-4" />
          </div>
          <div className="leading-tight">
            <span className="text-base font-bold tracking-tight text-slate-900">
              ALearn
            </span>
            <span className="ml-2 hidden rounded-md bg-slate-100 px-1.5 py-0.5 text-[10px] font-semibold text-slate-500 sm:inline">
              MM → EN
            </span>
          </div>
        </Link>

        {/* Clean Center Navigation */}
        <nav
          aria-label="Primary navigation"
          className="flex items-center gap-1 rounded-xl bg-slate-100/90 p-1"
        >
          <Link
            href="/"
            className={`inline-flex items-center gap-1.5 rounded-lg px-3.5 py-1.5 text-xs font-semibold transition ${
              isGuideActive
                ? "bg-white text-slate-900 shadow-xs"
                : "text-slate-600 hover:text-slate-900"
            }`}
          >
            <BookOpen className="h-3.5 w-3.5" />
            <span>Lessons</span>
          </Link>

          <Link
            href="/practice"
            className={`inline-flex items-center gap-1.5 rounded-lg px-3.5 py-1.5 text-xs font-semibold transition ${
              isPracticeActive
                ? "bg-white text-slate-900 shadow-xs"
                : "text-slate-600 hover:text-slate-900"
            }`}
          >
            <PenLine className="h-3.5 w-3.5" />
            <span>Practice</span>
          </Link>

          {showLocalAdmin && (
            <Link
              href="/admin"
              title="Local-only Admin panel"
              className="inline-flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-xs font-semibold text-slate-600 transition hover:text-slate-900"
            >
              <ShieldCheck className="h-3.5 w-3.5 text-emerald-600" />
              <span className="hidden sm:inline">Admin</span>
            </Link>
          )}
        </nav>

        {/* Right Compact Stat + Primary Action */}
        <div className="flex items-center gap-3">
          <div className="hidden items-center gap-1.5 text-xs text-slate-500 md:flex">
            <span className="h-2 w-2 rounded-full bg-emerald-500" />
            <span className="font-semibold tabular-nums text-slate-800">
              {stats.masteredCount}/{stats.totalQuestions}
            </span>
            <span>mastered</span>
          </div>

          {showRandomModalTrigger ? (
            <button
              type="button"
              onClick={openRandomModal}
              className="inline-flex items-center gap-1.5 rounded-xl bg-blue-600 px-3.5 py-2 text-xs font-semibold text-white shadow-xs transition hover:bg-blue-700"
            >
              <Dices className="h-3.5 w-3.5" />
              <span className="hidden sm:inline">Random Set</span>
            </button>
          ) : (
            <Link
              href="/practice"
              className="inline-flex items-center gap-1.5 rounded-xl bg-blue-600 px-3.5 py-2 text-xs font-semibold text-white shadow-xs transition hover:bg-blue-700"
            >
              <PenLine className="h-3.5 w-3.5" />
              <span>Start Practice</span>
            </Link>
          )}
        </div>
      </div>
    </header>
  );
}
