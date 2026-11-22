"use client";

import { CheckCircle2, Lightbulb, XCircle } from "lucide-react";
import { useMemo } from "react";
import { WRITING_TIPS } from "@/data/lessons-guide-data";
import { type TipFilterTag, useGuideStore } from "@/store/use-guide-store";

const TIP_TAGS: Array<{ value: TipFilterTag; label: string }> = [
  { value: "all", label: "All Tips" },
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
    <section className="flex flex-col gap-4">
      <div className="flex flex-wrap items-end justify-between gap-3">
        <div>
          <div className="inline-flex items-center gap-1.5 text-xs font-semibold tracking-wide text-amber-700 uppercase">
            <Lightbulb className="h-3.5 w-3.5" />
            <span>Tips &amp; Tricks</span>
          </div>
          <h2 className="mt-1 text-xl font-bold text-stone-900">
            Practical English Writing Tricks for Burmese Learners
          </h2>
          <p className="mt-0.5 font-myanmar text-xs text-stone-500">
            မြန်မာလိုတွေးပြီး အင်္ဂလိပ်လိုရေးရာတွင် မကြာခဏမှားတတ်သော အချက်များကို လွယ်ကူစွာ
            ရှောင်ရှားနည်းများ။
          </p>
        </div>

        <div className="flex flex-wrap gap-1.5">
          {TIP_TAGS.map((tag) => {
            const active = selectedTipTag === tag.value;
            return (
              <button
                key={tag.value}
                type="button"
                onClick={() => setSelectedTipTag(tag.value)}
                className={`rounded-xl px-3 py-1.5 text-xs font-semibold transition ${
                  active
                    ? "bg-stone-900 text-white shadow-xs"
                    : "border border-stone-200 bg-white text-stone-600 hover:border-stone-300 hover:bg-stone-50"
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
            className="flex flex-col justify-between gap-4 rounded-3xl border border-stone-200/90 bg-white p-5 shadow-xs"
          >
            <div>
              <span className="inline-block rounded-full bg-amber-100/80 px-2.5 py-0.5 text-[10px] font-bold tracking-wide text-amber-900 uppercase">
                {tip.tag}
              </span>
              <h3 className="mt-2.5 text-sm font-bold text-stone-900">
                {tip.title}
              </h3>
              <p className="mt-0.5 font-myanmar text-xs text-stone-500">
                {tip.burmeseTitle}
              </p>
              <p className="mt-2 text-xs leading-relaxed text-stone-600">
                {tip.summary}
              </p>

              <div className="mt-3 rounded-2xl border border-amber-200/70 bg-amber-50/60 p-3 text-xs leading-relaxed text-amber-950">
                <span className="font-bold">Trick: </span>
                {tip.trick}
              </div>
            </div>

            <div className="flex flex-col gap-1.5 border-t border-stone-100 pt-3 text-xs">
              <div className="flex items-start gap-1.5 text-rose-700">
                <XCircle className="mt-0.5 h-3.5 w-3.5 shrink-0" />
                <span className="line-through opacity-80">{tip.before}</span>
              </div>
              <div className="flex items-start gap-1.5 font-semibold text-emerald-800">
                <CheckCircle2 className="mt-0.5 h-3.5 w-3.5 shrink-0 text-emerald-600" />
                <span>{tip.after}</span>
              </div>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
