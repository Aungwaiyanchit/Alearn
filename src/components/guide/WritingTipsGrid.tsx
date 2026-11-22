"use client";

import { CheckCircle2, XCircle } from "lucide-react";
import { useMemo } from "react";
import { WRITING_TIPS } from "@/data/lessons-guide-data";
import { type TipFilterTag, useGuideStore } from "@/store/use-guide-store";

const TIP_TAGS: Array<{ value: TipFilterTag; label: string }> = [
  { value: "all", label: "All" },
  { value: "structure", label: "Word Order" },
  { value: "grammar", label: "Grammar" },
  { value: "vocabulary", label: "Connectors" },
  { value: "polish", label: "Self-Check" },
];

export function WritingTipsGrid() {
  const selectedTipTag = useGuideStore((state) => state.selectedTipTag);
  const setSelectedTipTag = useGuideStore((state) => state.setSelectedTipTag);

  const visibleTips = useMemo(
    () =>
      selectedTipTag === "all"
        ? WRITING_TIPS
        : WRITING_TIPS.filter((tip) => tip.tag === selectedTipTag),
    [selectedTipTag],
  );

  return (
    <section className="flex flex-col gap-5">
      <div className="flex flex-wrap items-end justify-between gap-3">
        <div>
          <p className="text-xs font-semibold tracking-wider text-blue-600 uppercase">
            Tips &amp; Tricks
          </p>
          <h2 className="mt-1 text-lg font-bold text-slate-900">
            Writing Shortcuts for Burmese Learners
          </h2>
          <p className="mt-0.5 font-myanmar text-xs text-slate-500">
            မြန်မာလိုတွေးပြီး အင်္ဂလိပ်လိုရေးရာတွင် မကြာခဏမှားတတ်သော အချက်များကို လွယ်ကူစွာ
            ရှောင်ရှားနည်းများ။
          </p>
        </div>

        <div className="flex flex-wrap gap-1 rounded-xl bg-slate-100 p-1">
          {TIP_TAGS.map((tag) => {
            const active = selectedTipTag === tag.value;
            return (
              <button
                key={tag.value}
                type="button"
                onClick={() => setSelectedTipTag(tag.value)}
                className={`rounded-lg px-3 py-1.5 text-xs font-semibold transition ${
                  active
                    ? "bg-white text-slate-900 shadow-xs"
                    : "text-slate-600 hover:text-slate-900"
                }`}
              >
                {tag.label}
              </button>
            );
          })}
        </div>
      </div>

      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
        {visibleTips.map((tip) => (
          <article
            key={tip.id}
            className="flex flex-col justify-between gap-4 rounded-2xl border border-slate-200/80 bg-white p-5 shadow-xs"
          >
            <div>
              <span className="inline-block rounded-md bg-blue-50 px-2 py-0.5 text-[10px] font-semibold tracking-wide text-blue-700 uppercase">
                {tip.tag}
              </span>
              <h3 className="mt-2.5 text-sm font-bold text-slate-900">
                {tip.title}
              </h3>
              <p className="mt-0.5 font-myanmar text-xs text-slate-500">
                {tip.burmeseTitle}
              </p>
              <p className="mt-2 text-xs leading-relaxed text-slate-600">
                {tip.summary}
              </p>

              <p className="mt-3 rounded-xl bg-slate-50 p-3 text-xs leading-relaxed text-slate-700">
                <span className="font-semibold text-blue-700">Tip: </span>
                {tip.trick}
              </p>
            </div>

            <div className="flex flex-col gap-1.5 border-t border-slate-100 pt-3 text-xs">
              <div className="flex items-start gap-1.5 text-rose-600">
                <XCircle className="mt-0.5 h-3.5 w-3.5 shrink-0" />
                <span className="line-through opacity-80">{tip.before}</span>
              </div>
              <div className="flex items-start gap-1.5 font-semibold text-emerald-700">
                <CheckCircle2 className="mt-0.5 h-3.5 w-3.5 shrink-0" />
                <span>{tip.after}</span>
              </div>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
