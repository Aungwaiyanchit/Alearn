"use client";

import { Plus, Trash2 } from "lucide-react";
import type { LessonCheatSheetRow } from "@/types/guide";

export interface EditableCheatRow extends LessonCheatSheetRow {
  key: string;
}

interface GuideCheatSheetEditorProps {
  rows: EditableCheatRow[];
  onChange: (next: EditableCheatRow[]) => void;
}

export function createEmptyCheatRow(index: number): EditableCheatRow {
  return {
    key: `cs-${Date.now()}-${index}`,
    pattern: "",
    english: "",
    burmese: "",
    usage: "",
  };
}

export function GuideCheatSheetEditor({
  rows,
  onChange,
}: GuideCheatSheetEditorProps) {
  const updateRow = (
    index: number,
    field: keyof LessonCheatSheetRow,
    value: string,
  ) => {
    onChange(
      rows.map((row, idx) =>
        idx === index ? { ...row, [field]: value } : row,
      ),
    );
  };

  return (
    <section className="rounded-2xl border border-slate-200/80 bg-white p-6 shadow-xs">
      <div className="flex flex-wrap items-center justify-between gap-2">
        <div>
          <h2 className="text-sm font-bold text-slate-900">
            Quick Cheat Sheet Rows
          </h2>
          <p className="mt-0.5 text-xs text-slate-500">
            Displayed as a quick reference table directly underneath this lesson
            detail.
          </p>
        </div>

        <button
          type="button"
          onClick={() => onChange([...rows, createEmptyCheatRow(rows.length)])}
          className="inline-flex items-center gap-1.5 rounded-xl border border-blue-200 bg-blue-50 px-3 py-1.5 text-xs font-semibold text-blue-700 transition hover:bg-blue-100"
        >
          <Plus className="h-3.5 w-3.5" />
          <span>Add Row</span>
        </button>
      </div>

      <div className="mt-4 flex flex-col gap-3">
        {rows.map((row, index) => (
          <div
            key={row.key}
            className="rounded-xl border border-slate-200 bg-slate-50/50 p-4"
          >
            <div className="mb-2.5 flex items-center justify-between">
              <span className="text-xs font-semibold text-slate-500">
                Row #{index + 1}
              </span>
              {rows.length > 1 && (
                <button
                  type="button"
                  onClick={() =>
                    onChange(rows.filter((_, idx) => idx !== index))
                  }
                  className="inline-flex items-center gap-1 rounded-lg px-2 py-1 text-xs font-medium text-rose-600 transition hover:bg-rose-50"
                >
                  <Trash2 className="h-3.5 w-3.5" />
                  <span>Remove</span>
                </button>
              )}
            </div>

            <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
              <label className="block text-xs font-semibold text-slate-700">
                Pattern
                <input
                  type="text"
                  value={row.pattern}
                  onChange={(event) =>
                    updateRow(index, "pattern", event.target.value)
                  }
                  placeholder="e.g., used to + V1"
                  className="mt-1 w-full rounded-xl border border-slate-300 bg-white px-3 py-2 font-mono text-xs font-normal text-slate-900 outline-none focus:border-blue-500"
                />
              </label>

              <label className="block text-xs font-semibold text-slate-700">
                Usage Badge
                <input
                  type="text"
                  value={row.usage}
                  onChange={(event) =>
                    updateRow(index, "usage", event.target.value)
                  }
                  placeholder="e.g., Past habit (stopped)"
                  className="mt-1 w-full rounded-xl border border-slate-300 bg-white px-3 py-2 text-xs font-normal text-slate-900 outline-none focus:border-blue-500"
                />
              </label>

              <label className="block text-xs font-semibold text-slate-700">
                English Example
                <input
                  type="text"
                  value={row.english}
                  onChange={(event) =>
                    updateRow(index, "english", event.target.value)
                  }
                  placeholder="e.g., I used to write in a notebook."
                  className="mt-1 w-full rounded-xl border border-slate-300 bg-white px-3 py-2 text-xs font-normal text-slate-900 outline-none focus:border-blue-500"
                />
              </label>

              <label className="block text-xs font-semibold text-slate-700">
                Burmese Meaning
                <input
                  type="text"
                  value={row.burmese}
                  onChange={(event) =>
                    updateRow(index, "burmese", event.target.value)
                  }
                  placeholder="ဥပမာ - အရင်က စာအုပ်ထဲ ရေးလေ့ရှိခဲ့တယ်။"
                  className="mt-1 w-full rounded-xl border border-slate-300 bg-white px-3 py-2 font-myanmar text-xs font-normal text-slate-900 outline-none focus:border-blue-500"
                />
              </label>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
