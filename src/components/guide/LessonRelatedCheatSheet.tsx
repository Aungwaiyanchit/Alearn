"use client";

import type { LessonCheatSheetRow } from "@/types/guide";

interface LessonRelatedCheatSheetProps {
  rows: LessonCheatSheetRow[];
  lessonTitle: string;
}

export function LessonRelatedCheatSheet({
  rows,
  lessonTitle,
}: LessonRelatedCheatSheetProps) {
  if (rows.length === 0) {
    return null;
  }

  return (
    <div>
      <div className="flex items-center justify-between gap-2">
        <h3 className="text-xs font-semibold tracking-wider text-slate-400 uppercase">
          Quick Cheat Sheet · {lessonTitle}
        </h3>
        <span className="font-myanmar text-[11px] text-slate-400">အမြန်မှတ်စု</span>
      </div>

      <div className="mt-2.5 overflow-x-auto rounded-xl border border-slate-200/80">
        <table className="w-full min-w-[520px] text-left text-xs">
          <thead className="border-b border-slate-200 bg-slate-50 text-[11px] font-semibold tracking-wide text-slate-500 uppercase">
            <tr>
              <th className="px-3.5 py-2.5">Pattern</th>
              <th className="px-3.5 py-2.5">Example</th>
              <th className="px-3.5 py-2.5">Burmese</th>
              <th className="px-3.5 py-2.5">Usage</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {rows.map((row) => (
              <tr key={row.pattern} className="bg-white">
                <td className="px-3.5 py-2.5 font-mono text-[11px] font-semibold text-blue-700">
                  {row.pattern}
                </td>
                <td className="px-3.5 py-2.5 font-medium text-slate-900">
                  {row.english}
                </td>
                <td className="px-3.5 py-2.5 font-myanmar text-slate-600">
                  {row.burmese}
                </td>
                <td className="px-3.5 py-2.5">
                  <span className="rounded-md bg-slate-100 px-2 py-0.5 text-[11px] font-medium text-slate-600">
                    {row.usage}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
