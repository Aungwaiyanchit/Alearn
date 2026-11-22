"use client";

import { motion } from "framer-motion";
import type { TimelineVisualType } from "@/types/guide";

interface TenseTimelineVisualProps {
  type: TimelineVisualType;
  caption: string;
}

const HABIT_DOTS = ["18%", "34%", "50%", "66%", "82%"] as const;

export function TenseTimelineVisual({
  type,
  caption,
}: TenseTimelineVisualProps) {
  return (
    <div className="rounded-2xl border border-stone-200/80 bg-stone-50/70 p-4">
      <div className="mb-3 flex items-center justify-between text-[11px] font-semibold tracking-wide text-stone-400 uppercase">
        <span>Past</span>
        <span className="rounded-full bg-stone-900 px-2 py-0.5 text-[10px] text-white">
          NOW
        </span>
        <span>Future</span>
      </div>

      {/* Timeline Track */}
      <div className="relative flex h-8 items-center">
        <div className="h-1 w-full rounded-full bg-stone-200" />
        {/* Center NOW tick */}
        <div className="absolute left-1/2 h-5 w-0.5 -translate-x-1/2 rounded-full bg-stone-400" />

        {type === "habit" &&
          HABIT_DOTS.map((left, idx) => (
            <motion.span
              key={left}
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: idx * 0.05, type: "spring", stiffness: 320 }}
              style={{ left }}
              className="absolute h-3 w-3 -translate-x-1/2 rounded-full border-2 border-white bg-amber-500 shadow-xs"
            />
          ))}

        {type === "now-ongoing" && (
          <motion.div
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ duration: 0.35 }}
            className="absolute left-[40%] h-3 w-[20%] rounded-full bg-emerald-500/85 ring-4 ring-emerald-200"
          />
        )}

        {type === "past-to-now" && (
          <>
            <motion.div
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ duration: 0.4 }}
              style={{ transformOrigin: "left" }}
              className="absolute left-[22%] h-2.5 w-[28%] rounded-full bg-gradient-to-r from-indigo-500 to-emerald-500"
            />
            <span className="absolute left-[22%] h-3.5 w-3.5 -translate-x-1/2 rounded-full border-2 border-white bg-indigo-600" />
            <span className="absolute left-[50%] h-3.5 w-3.5 -translate-x-1/2 rounded-full border-2 border-white bg-emerald-600" />
          </>
        )}

        {type === "past-point" && (
          <motion.span
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: "spring", stiffness: 360, damping: 18 }}
            className="absolute left-[26%] h-4 w-4 -translate-x-1/2 rounded-full border-2 border-white bg-rose-500 ring-4 ring-rose-200"
          />
        )}

        {type === "past-ongoing" && (
          <>
            <motion.div
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ duration: 0.35 }}
              style={{ transformOrigin: "left" }}
              className="absolute left-[14%] h-2.5 w-[24%] rounded-full bg-sky-400"
            />
            <span className="absolute left-[28%] h-4 w-4 -translate-x-1/2 rounded-full border-2 border-white bg-rose-500 shadow-xs" />
          </>
        )}

        {type === "future-point" && (
          <motion.span
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: "spring", stiffness: 360, damping: 18 }}
            className="absolute left-[74%] h-4 w-4 -translate-x-1/2 rounded-full border-2 border-white bg-amber-500 ring-4 ring-amber-200"
          />
        )}

        {type === "conditional" && (
          <>
            <motion.div
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ duration: 0.35 }}
              style={{ transformOrigin: "left" }}
              className="absolute left-[56%] h-2 w-[26%] rounded-full border border-dashed border-violet-500 bg-violet-100"
            />
            <span className="absolute left-[56%] h-3.5 w-3.5 -translate-x-1/2 rounded-full border-2 border-white bg-violet-600" />
            <span className="absolute left-[82%] h-3.5 w-3.5 -translate-x-1/2 rounded-full border-2 border-white bg-emerald-500" />
          </>
        )}

        {type === "modal" && (
          <motion.div
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ duration: 0.35 }}
            className="absolute left-[46%] h-2.5 w-[26%] rounded-full bg-gradient-to-r from-amber-500 to-emerald-500"
          />
        )}
      </div>

      <p className="mt-2 text-center text-xs font-medium text-stone-500">
        {caption}
      </p>
    </div>
  );
}
