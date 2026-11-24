"use client";

import { ArrowLeft, BookOpen, Database, ShieldCheck } from "lucide-react";
import Link from "next/link";
import { useAdminStore } from "@/store/use-admin-store";

interface AdminHeaderProps {
  databasePath?: string;
}

export function AdminHeader({ databasePath }: AdminHeaderProps = {}) {
  const storeDbPath = useAdminStore((state) => state.databasePath);
  const resolvedPath = databasePath || storeDbPath || "data/alearn.sqlite";

  return (
    <header className="sticky top-0 z-30 border-b border-slate-200/80 bg-white/95 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-6xl flex-wrap items-center justify-between gap-4 px-4 sm:px-6">
        <div className="flex items-center gap-3">
          <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-blue-600 text-white shadow-xs">
            <ShieldCheck className="h-4 w-4" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-sm font-bold tracking-tight text-slate-900">
                ALearn Local Admin
              </span>
              <span className="inline-flex items-center rounded-md border border-emerald-200 bg-emerald-50 px-2 py-0.5 text-[10px] font-semibold text-emerald-700 uppercase">
                Local Only
              </span>
            </div>
            <p className="mt-0.5 flex items-center gap-1.5 font-mono text-[11px] text-slate-500">
              <Database className="h-3 w-3 shrink-0 text-slate-400" />
              <span className="max-w-xs truncate sm:max-w-md">
                {resolvedPath}
              </span>
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <Link
            href="/"
            className="inline-flex items-center gap-1.5 rounded-xl border border-slate-200 bg-white px-3 py-2 text-xs font-semibold text-slate-700 shadow-xs transition hover:bg-slate-50"
          >
            <BookOpen className="h-3.5 w-3.5 text-blue-600" />
            <span>Lessons</span>
          </Link>

          <Link
            href="/practice"
            className="inline-flex items-center gap-1.5 rounded-xl bg-blue-600 px-3.5 py-2 text-xs font-semibold text-white shadow-xs transition hover:bg-blue-700"
          >
            <ArrowLeft className="h-3.5 w-3.5" />
            <span>Practice</span>
          </Link>
        </div>
      </div>
    </header>
  );
}
