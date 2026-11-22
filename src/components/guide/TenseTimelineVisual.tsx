"use client";

import { motion } from "framer-motion";
import type { TimelineVisualType } from "@/types/guide";

interface TenseTimelineVisualProps {
  type: TimelineVisualType;
  caption: string;
}

const HABIT_DOTS = ["18%", "34%", "50%", "66%", "82%"] as const;
const PAST_HABIT_DOTS = ["14%", "24%", "34%", "42%"] as const;

export function TenseTimelineVisual({
  type,
  caption,
}: TenseTimelineVisualProps) {
  return (
    <div className="rounded-xl border border-slate-200/80 bg-slate-50/80 px-5 py-4">
      <div className="mb-3 flex items-center justify-between text-[11px] font-medium text-slate-400">
        <span>Past</span>
        <span className="rounded-md bg-slate-900 px-2 py-0.5 text-[10px] font-semibold text-white">
          NOW
        </span>
        <span>Future</span>
      </div>

      <div className="relative flex h-7 items-center">
        <div className="h-1 w-full rounded-full bg-slate-200" />
        <div className="absolute left-1/2 h-4 w-0.5 -translate-x-1/2 rounded-full bg-slate-400" />

        {type === "habit" &&
          HABIT_DOTS.map((left, idx) => (
            <motion.span
              key={left}
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: idx * 0.04, type: "spring", stiffness: 320 }}
              style={{ left }}
              className="absolute h-2.5 w-2.5 -translate-x-1/2 rounded-full border-2 border-white bg-blue-600 shadow-xs"
            />
          ))}

        {type === "past-habit" && (
          <>
            {PAST_HABIT_DOTS.map((left, idx) => (
              <motion.span
                key={left}
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: idx * 0.05 }}
                style={{ left }}
                className="absolute h-2.5 w-2.5 -translate-x-1/2 rounded-full border-2 border-white bg-blue-600 shadow-xs"
              />
            ))}
            <span className="absolute left-[46%] h-4 w-0.5 rounded-full bg-rose-400" />
          </>
        )}

        {type === "now-ongoing" && (
          <motion.div
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ duration: 0.3 }}
            className="absolute left-[41%] h-2.5 w-[18%] rounded-full bg-blue-600 ring-4 ring-blue-100"
          />
        )}

        {type === "past-to-now" && (
          <>
            <motion.div
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ duration: 0.35 }}
              style={{ transformOrigin: "left" }}
              className="absolute left-[22%] h-2 w-[28%] rounded-full bg-blue-600"
            />
            <span className="absolute left-[22%] h-3 w-3 -translate-x-1/2 rounded-full border-2 border-white bg-blue-600" />
            <span className="absolute left-[50%] h-3 w-3 -translate-x-1/2 rounded-full border-2 border-white bg-emerald-500" />
          </>
        )}

        {type === "past-point" && (
          <motion.span
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: "spring", stiffness: 360, damping: 18 }}
            className="absolute left-[26%] h-3.5 w-3.5 -translate-x-1/2 rounded-full border-2 border-white bg-blue-600 ring-4 ring-blue-100"
          />
        )}

        {type === "past-ongoing" && (
          <>
            <motion.div
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ duration: 0.3 }}
              style={{ transformOrigin: "left" }}
              className="absolute left-[14%] h-2 w-[24%] rounded-full bg-blue-400"
            />
            <span className="absolute left-[28%] h-3.5 w-3.5 -translate-x-1/2 rounded-full border-2 border-white bg-blue-700" />
          </>
        )}

        {type === "future-point" && (
          <motion.span
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: "spring", stiffness: 360, damping: 18 }}
            className="absolute left-[74%] h-3.5 w-3.5 -translate-x-1/2 rounded-full border-2 border-white bg-blue-600 ring-4 ring-blue-100"
          />
        )}

        {type === "planned-future" && (
          <>
            <motion.div
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ duration: 0.35 }}
              style={{ transformOrigin: "left" }}
              className="absolute left-[46%] h-1.5 w-[28%] rounded-full border border-dashed border-blue-500 bg-blue-100"
            />
            <span className="absolute left-[46%] h-2.5 w-2.5 -translate-x-1/2 rounded-full border-2 border-white bg-slate-700" />
            <span className="absolute left-[74%] h-3.5 w-3.5 -translate-x-1/2 rounded-full border-2 border-white bg-blue-600 ring-4 ring-blue-100" />
          </>
        )}

        {type === "rule-pattern" && (
          <>
            <motion.div
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ duration: 0.3 }}
              className="absolute left-[32%] h-2 w-[36%] rounded-full bg-blue-600/80"
            />
            <span className="absolute left-[32%] h-3 w-3 -translate-x-1/2 rounded-full border-2 border-white bg-blue-600" />
            <span className="absolute left-[68%] h-3 w-3 -translate-x-1/2 rounded-full border-2 border-white bg-emerald-500" />
          </>
        )}
      </div>

      <p className="mt-2 text-center text-xs text-slate-500">{caption}</p>
    </div>
  );
}
