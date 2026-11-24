"use client";

import {
  AlertCircle,
  FileText,
  Lightbulb,
  ListChecks,
  MessageSquareText,
  Sliders,
  Table2,
} from "lucide-react";
import { useEffect, useState } from "react";

interface GuideEditorSidebarProps {
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
  exampleCount,
  cheatSheetCount,
  selectedTipsCount,
}: GuideEditorSidebarProps) {
  const [activeSection, setActiveSection] = useState<string>("section-basics");

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
    <aside>
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
    </aside>
  );
}
