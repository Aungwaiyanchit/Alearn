"use client";

import {
  AlertCircle,
  BookOpen,
  FileText,
  Lightbulb,
  ListChecks,
  MessageSquareText,
  Plus,
  Search,
  Sliders,
  Table2,
} from "lucide-react";
import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import type { TenseLesson } from "@/types/guide";

export interface GuideSectionNavItem {
  id: string;
  label: string;
  count?: number;
}

interface GuideEditorSidebarProps {
  currentLessonId?: string | null;
  allLessons: TenseLesson[];
  exampleCount: number;
  cheatSheetCount: number;
  selectedTipsCount: number;
}

const SECTION_META = [
  { id: "section-basics", label: "Basic Info", icon: FileText },
  { id: "section-formulas", label: "Timeline & Formulas", icon: Sliders },
  { id: "section-usage", label: "Usage & Signals", icon: ListChecks },
  { id: "section-examples", label: "Worked Examples", icon: MessageSquareText },
  { id: "section-mistake", label: "Common Mistake", icon: AlertCircle },
  { id: "section-cheat-sheet", label: "Quick Cheat Sheet", icon: Table2 },
  { id: "section-tips", label: "Related Tips", icon: Lightbulb },
] as const;

export function GuideEditorSidebar({
  currentLessonId,
  allLessons,
  exampleCount,
  cheatSheetCount,
  selectedTipsCount,
}: GuideEditorSidebarProps) {
  const [activeSection, setActiveSection] = useState<string>("section-basics");
  const [lessonFilter, setLessonFilter] = useState("");

  useEffect(() => {
    const elements = SECTION_META.map((item) =>
      document.getElementById(item.id),
    ).filter((el): el is HTMLElement => Boolean(el));

    if (elements.length === 0) {
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);

        if (visible[0]?.target.id) {
          setActiveSection(visible[0].target.id);
        }
      },
      {
        rootMargin: "-96px 0px -65% 0px",
        threshold: 0,
      },
    );

    for (const el of elements) {
      observer.observe(el);
    }

    return () => observer.disconnect();
  }, []);

  const filteredLessons = useMemo(() => {
    const query = lessonFilter.trim().toLowerCase();
    if (!query) {
      return allLessons;
    }
    return allLessons.filter(
      (lesson) =>
        lesson.title.toLowerCase().includes(query) ||
        lesson.burmeseTitle.toLowerCase().includes(query) ||
        lesson.subgroup.toLowerCase().includes(query),
    );
  }, [allLessons, lessonFilter]);

  const getBadgeCount = (id: string): number | undefined => {
    if (id === "section-examples") return exampleCount;
    if (id === "section-cheat-sheet") return cheatSheetCount;
    if (id === "section-tips") return selectedTipsCount;
    return undefined;
  };

  const handleScrollToSection = (sectionId: string) => {
    setActiveSection(sectionId);
    const target = document.getElementById(sectionId);
    if (target) {
      target.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  return (
    <aside className="flex flex-col gap-4">
      {/* Card 1: In-page Section Navigation */}
      <nav
        aria-label="Lesson form sections"
        className="rounded-2xl border border-slate-200/80 bg-white p-3.5 shadow-xs"
      >
        <div className="mb-2 px-2 text-[11px] font-semibold tracking-wider text-slate-400 uppercase">
          On This Page
        </div>

        <ul className="flex flex-col gap-0.5">
          {SECTION_META.map((section) => {
            const Icon = section.icon;
            const isActive = activeSection === section.id;
            const count = getBadgeCount(section.id);

            return (
              <li key={section.id}>
                <button
                  type="button"
                  onClick={() => handleScrollToSection(section.id)}
                  className={`flex w-full items-center justify-between gap-2 rounded-xl px-2.5 py-2 text-left text-xs font-medium transition ${
                    isActive
                      ? "bg-blue-50 font-semibold text-blue-700"
                      : "text-slate-600 hover:bg-slate-50 hover:text-slate-900"
                  }`}
                >
                  <span className="flex min-w-0 items-center gap-2">
                    <Icon
                      className={`h-3.5 w-3.5 shrink-0 ${
                        isActive ? "text-blue-600" : "text-slate-400"
                      }`}
                    />
                    <span className="truncate">{section.label}</span>
                  </span>

                  {count !== undefined && (
                    <span
                      className={`shrink-0 rounded-md px-1.5 py-0.5 text-[10px] font-semibold tabular-nums ${
                        isActive
                          ? "bg-blue-100 text-blue-700"
                          : "bg-slate-100 text-slate-500"
                      }`}
                    >
                      {count}
                    </span>
                  )}
                </button>
              </li>
            );
          })}
        </ul>
      </nav>

      {/* Card 2: Direct Lesson Route Switcher */}
      <nav
        aria-label="Switch guide lesson"
        className="rounded-2xl border border-slate-200/80 bg-white p-3.5 shadow-xs"
      >
        <div className="mb-2.5 flex items-center justify-between gap-2 px-1">
          <span className="inline-flex items-center gap-1.5 text-[11px] font-semibold tracking-wider text-slate-400 uppercase">
            <BookOpen className="h-3.5 w-3.5" />
            <span>Lessons ({allLessons.length})</span>
          </span>
          <Link
            href="/admin/guide-lessons/new"
            className={`inline-flex items-center gap-1 rounded-lg px-2 py-1 text-[11px] font-semibold transition ${
              !currentLessonId
                ? "bg-blue-600 text-white"
                : "bg-blue-50 text-blue-700 hover:bg-blue-100"
            }`}
          >
            <Plus className="h-3 w-3" />
            <span>New</span>
          </Link>
        </div>

        <div className="relative mb-2">
          <Search className="pointer-events-none absolute top-1/2 left-2.5 h-3.5 w-3.5 -translate-y-1/2 text-slate-400" />
          <input
            type="text"
            value={lessonFilter}
            onChange={(event) => setLessonFilter(event.target.value)}
            placeholder="Jump to lesson..."
            className="w-full rounded-xl border border-slate-200 bg-slate-50/70 py-1.5 pr-2.5 pl-8 text-xs text-slate-800 placeholder:text-slate-400 outline-none focus:border-blue-500 focus:bg-white"
          />
        </div>

        <ul className="flex max-h-64 flex-col gap-0.5 overflow-y-auto pr-0.5">
          {filteredLessons.length === 0 ? (
            <li className="px-2 py-4 text-center text-[11px] text-slate-400">
              No matching lessons
            </li>
          ) : (
            filteredLessons.map((lesson) => {
              const isCurrent = lesson.id === currentLessonId;
              return (
                <li key={lesson.id}>
                  <Link
                    href={`/admin/guide-lessons/${lesson.id}/edit`}
                    className={`flex flex-col rounded-xl px-2.5 py-2 transition ${
                      isCurrent
                        ? "bg-blue-50 text-blue-900 ring-1 ring-blue-200"
                        : "text-slate-700 hover:bg-slate-50 hover:text-slate-900"
                    }`}
                  >
                    <div className="flex items-center gap-1.5">
                      <span
                        className={`h-1.5 w-1.5 shrink-0 rounded-full ${
                          isCurrent ? "bg-blue-600" : "bg-slate-300"
                        }`}
                      />
                      <span className="truncate text-xs font-semibold">
                        {lesson.title}
                      </span>
                    </div>
                    <span className="mt-0.5 truncate pl-3 font-myanmar text-[10px] text-slate-500">
                      {lesson.burmeseTitle}
                    </span>
                  </Link>
                </li>
              );
            })
          )}
        </ul>
      </nav>
    </aside>
  );
}
