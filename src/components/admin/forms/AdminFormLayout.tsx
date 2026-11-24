"use client";

import { AlertCircle, ArrowLeft } from "lucide-react";
import Link from "next/link";
import { AdminHeader } from "@/components/admin/AdminHeader";

interface AdminFormLayoutProps {
  title: string;
  subtitle: string;
  backHref: string;
  backLabel: string;
  databasePath: string;
  wide?: boolean;
  error?: string | null;
  children: React.ReactNode;
}

export function AdminFormLayout({
  title,
  subtitle,
  backHref,
  backLabel,
  databasePath,
  wide = false,
  error,
  children,
}: AdminFormLayoutProps) {
  return (
    <div className="min-h-screen bg-[#F8FAFC] text-slate-900">
      <AdminHeader databasePath={databasePath} />

      <main
        className={`mx-auto flex flex-col gap-6 px-4 py-8 sm:px-6 lg:py-10 ${
          wide ? "max-w-6xl" : "max-w-4xl"
        }`}
      >
        <div>
          <Link
            href={backHref}
            className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-500 transition hover:text-blue-600"
          >
            <ArrowLeft className="h-3.5 w-3.5" />
            <span>{backLabel}</span>
          </Link>

          <h1 className="mt-3 text-2xl font-bold tracking-tight text-slate-900">
            {title}
          </h1>
          <p className="mt-1 text-sm text-slate-500">{subtitle}</p>
        </div>

        {error && (
          <div className="flex items-center gap-2 rounded-xl border border-rose-200 bg-rose-50 px-4 py-3 text-xs font-semibold text-rose-800">
            <AlertCircle className="h-4 w-4 shrink-0" />
            <span>{error}</span>
          </div>
        )}

        {children}
      </main>
    </div>
  );
}
