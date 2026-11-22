"use client";

import { CheckCircle2, Lightbulb, XCircle } from "lucide-react";
import { WRITING_TIPS } from "@/data/lessons-guide-data";

interface LessonRelatedTipsProps {
  tipIds: string[];
}

export function LessonRelatedTips({ tipIds }: LessonRelatedTipsProps) {
  const tips = tipIds
    .map((id) => WRITING_TIPS.find((tip) => tip.id === id))
    .filter((tip): tip is (typeof WRITING_TIPS)[number] => Boolean(tip));

  if (tips.length === 0) {
    return null;
  }

  return (
    <div>
      <div className="flex items-center justify-between gap-2">
        <h3 className="inline-flex items-center gap-1.5 text-xs font-semibold tracking-wider text-slate-400 uppercase">
          <Lightbulb className="h-3.5 w-3.5 text-blue-600" />
          <span>Related Tips &amp; Tricks</span>
        </h3>
        <span className="font-myanmar text-[11px] text-slate-400">
          သတိထားရန် နည်းလမ်းများ
        </span>
      </div>

      <div className="mt-2.5 grid grid-cols-1 gap-3 md:grid-cols-2">
        {tips.map((tip) => (
          <div
            key={tip.id}
            className="flex flex-col justify-between gap-3 rounded-xl border border-slate-200/80 bg-slate-50/60 p-4"
          >
            <div>
              <span className="inline-block rounded-md bg-blue-50 px-2 py-0.5 text-[10px] font-semibold tracking-wide text-blue-700 uppercase">
                {tip.tag}
              </span>
              <h4 className="mt-2 text-xs font-bold text-slate-900">
                {tip.title}
              </h4>
              <p className="mt-0.5 font-myanmar text-[11px] text-slate-500">
                {tip.burmeseTitle}
              </p>
              <p className="mt-2 text-xs leading-relaxed text-slate-600">
                {tip.trick}
              </p>
            </div>

            <div className="flex flex-col gap-1 border-t border-slate-200/70 pt-2.5 text-[11px]">
              <div className="flex items-start gap-1.5 text-rose-600">
                <XCircle className="mt-0.5 h-3.5 w-3.5 shrink-0" />
                <span className="line-through opacity-80">{tip.before}</span>
              </div>
              <div className="flex items-start gap-1.5 font-semibold text-emerald-700">
                <CheckCircle2 className="mt-0.5 h-3.5 w-3.5 shrink-0" />
                <span>{tip.after}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
