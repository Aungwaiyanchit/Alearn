"use client";

import { Layers } from "lucide-react";
import { TENSE_COMPARISON_ROWS } from "@/data/lessons-guide-data";
import { useGuideStore } from "@/store/use-guide-store";

export function TenseComparisonTable() {
  const selectedLessonId = useGuideStore((state) => state.selectedLessonId);
  const setSelectedGroup = useGuideStore((state) => state.setSelectedGroup);
  const selectLesson = useGuideStore((state) => state.selectLesson);

  const handleRowClick = (tenseId: string) => {
    setSelectedGroup("all");
    selectLesson(tenseId);
  };

  return (
    <section className="rounded-3xl border border-stone-200/90 bg-white p-6 shadow-xs sm:p-7">
      <div className="flex flex-wrap items-center justify-between gap-2">
        <div>
          <div className="inline-flex items-center gap-1.5 text-xs font-semibold tracking-wide text-amber-700 uppercase">
            <Layers className="h-3.5 w-3.5" />
            <span>Quick Tense Cheat Sheet</span>
          </div>
          <h2 className="mt-1 text-lg font-bold text-stone-900">
            Same Idea, Six Different Tenses
          </h2>
          <p className="mt-0.5 font-myanmar text-xs text-stone-500">
            တူညီသော ကြိယာ (write) တစ်ခုတည်း ကာလအလိုက် မည်သို့ပြောင်းလဲသွားသည်ကို နှိုင်းယှဉ်ကြည့်ပါ။
          </p>
        </div>
        <span className="text-[11px] font-medium text-stone-400">
          Click any row to inspect its formula
        </span>
      </div>

      <div className="mt-4 overflow-x-auto rounded-2xl border border-stone-200/80">
        <table className="w-full min-w-[640px] text-left text-xs">
          <thead className="border-b border-stone-200 bg-stone-50 text-[11px] font-semibold tracking-wide text-stone-500 uppercase">
            <tr>
              <th className="px-4 py-3">Tense</th>
              <th className="px-4 py-3">English Example</th>
              <th className="px-4 py-3">Burmese Meaning</th>
              <th className="px-4 py-3">Focus</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-stone-100">
            {TENSE_COMPARISON_ROWS.map((row) => {
              const isSelected = selectedLessonId === row.tenseId;
              return (
                <tr
                  key={row.tenseId}
                  onClick={() => handleRowClick(row.tenseId)}
                  className={`cursor-pointer transition ${
                    isSelected
                      ? "bg-amber-50/75"
                      : "bg-white hover:bg-stone-50/80"
                  }`}
                >
                  <td className="px-4 py-3">
                    <div className="font-bold text-stone-900">
                      {row.tenseName}
                    </div>
                    <div className="font-myanmar text-[11px] text-stone-500">
                      {row.burmeseLabel}
                    </div>
                  </td>
                  <td className="px-4 py-3 font-semibold text-emerald-800">
                    {row.englishSentence}
                  </td>
                  <td className="px-4 py-3 font-myanmar text-stone-700">
                    {row.burmeseMeaning}
                  </td>
                  <td className="px-4 py-3">
                    <span className="rounded-full bg-stone-100 px-2.5 py-0.5 text-[11px] font-medium text-stone-600">
                      {row.focus}
                    </span>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </section>
  );
}
