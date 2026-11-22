"use client";

import { TENSE_COMPARISON_ROWS } from "@/data/lessons-guide-data";
import { useGuideStore } from "@/store/use-guide-store";

export function TenseComparisonTable() {
  const selectedLessonId = useGuideStore((state) => state.selectedLessonId);
  const setSelectedTrack = useGuideStore((state) => state.setSelectedTrack);
  const setSearchQuery = useGuideStore((state) => state.setSearchQuery);
  const selectLesson = useGuideStore((state) => state.selectLesson);

  const handleRowClick = (tenseId: string) => {
    setSelectedTrack("all");
    setSearchQuery("");
    selectLesson(tenseId);
  };

  return (
    <section className="rounded-2xl border border-slate-200/80 bg-white p-6 shadow-xs sm:p-7">
      <div className="flex flex-wrap items-end justify-between gap-2">
        <div>
          <p className="text-xs font-semibold tracking-wider text-blue-600 uppercase">
            Quick Cheat Sheet
          </p>
          <h2 className="mt-1 text-lg font-bold text-slate-900">
            Same Idea Across Tenses &amp; Rules
          </h2>
          <p className="mt-0.5 font-myanmar text-xs text-slate-500">
            တူညီသော ကြိယာ (write) ကို ကာလနှင့် စည်းမျဉ်းအလိုက် နှိုင်းယှဉ်ကြည့်ပါ — အသေးစိတ်ကြည့်ရန်
            တစ်ကြောင်းချင်းနှိပ်နိုင်သည်။
          </p>
        </div>
      </div>

      <div className="mt-5 overflow-x-auto rounded-xl border border-slate-200/80">
        <table className="w-full min-w-[640px] text-left text-xs">
          <thead className="border-b border-slate-200 bg-slate-50 text-[11px] font-semibold tracking-wide text-slate-500 uppercase">
            <tr>
              <th className="px-4 py-3">Rule / Tense</th>
              <th className="px-4 py-3">English Example</th>
              <th className="px-4 py-3">Burmese Meaning</th>
              <th className="px-4 py-3">Focus</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {TENSE_COMPARISON_ROWS.map((row) => {
              const isSelected = selectedLessonId === row.tenseId;
              return (
                <tr
                  key={row.tenseId}
                  onClick={() => handleRowClick(row.tenseId)}
                  className={`cursor-pointer transition ${
                    isSelected
                      ? "bg-blue-50/70"
                      : "bg-white hover:bg-slate-50/80"
                  }`}
                >
                  <td className="px-4 py-3">
                    <div className="font-semibold text-slate-900">
                      {row.tenseName}
                    </div>
                    <div className="font-myanmar text-[11px] text-slate-500">
                      {row.burmeseLabel}
                    </div>
                  </td>
                  <td className="px-4 py-3 font-medium text-blue-700">
                    {row.englishSentence}
                  </td>
                  <td className="px-4 py-3 font-myanmar text-slate-700">
                    {row.burmeseMeaning}
                  </td>
                  <td className="px-4 py-3">
                    <span className="rounded-md bg-slate-100 px-2 py-0.5 text-[11px] font-medium text-slate-600">
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
