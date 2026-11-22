"use client";

import { ArrowLeft, Database, ShieldCheck } from "lucide-react";
import Link from "next/link";
import { useAdminStore } from "@/store/use-admin-store";

export function AdminHeader() {
  const databasePath = useAdminStore((state) => state.databasePath);

  return (
    <header className="sticky top-0 z-30 border-b border-stone-200/90 bg-[#F8F7F4]/95 backdrop-blur-md">
      <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-4 px-4 py-3.5 sm:px-6">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-stone-900 text-amber-400 shadow-xs">
            <ShieldCheck className="h-5 w-5" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-base font-bold tracking-tight text-stone-900">
                ALearn Local Admin
              </span>
              <span className="inline-flex items-center gap-1 rounded-full border border-emerald-200 bg-emerald-50 px-2.5 py-0.5 text-[10px] font-bold tracking-wide text-emerald-700 uppercase">
                Local Only
              </span>
            </div>
            <p className="mt-0.5 flex items-center gap-1.5 font-mono text-[11px] text-stone-500">
              <Database className="h-3 w-3 shrink-0 text-stone-400" />
              <span className="max-w-xs truncate sm:max-w-md">
                {databasePath || "data/alearn.sqlite"}
              </span>
            </p>
          </div>
        </div>

        <Link
          href="/"
          className="inline-flex items-center gap-1.5 rounded-xl border border-stone-300 bg-white px-3.5 py-2 text-xs font-semibold text-stone-800 shadow-xs transition hover:border-stone-400 hover:bg-stone-50"
        >
          <ArrowLeft className="h-3.5 w-3.5" />
          <span>Back to Practice</span>
        </Link>
      </div>
    </header>
  );
}
