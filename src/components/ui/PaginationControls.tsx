"use client";

import { ChevronLeft, ChevronRight } from "lucide-react";
import { getVisiblePageSlots } from "@/lib/pagination";

interface PaginationControlsProps {
  currentPage: number;
  totalPages: number;
  totalItems: number;
  startIndex: number;
  endIndex: number;
  pageSize?: number;
  pageSizeOptions?: readonly number[];
  compact?: boolean;
  itemLabel?: string;
  onPageChange: (page: number) => void;
  onPageSizeChange?: (pageSize: number) => void;
}

export function PaginationControls({
  currentPage,
  totalPages,
  totalItems,
  startIndex,
  endIndex,
  pageSize,
  pageSizeOptions,
  compact = false,
  itemLabel = "items",
  onPageChange,
  onPageSizeChange,
}: PaginationControlsProps) {
  if (totalItems === 0) {
    return null;
  }

  if (compact) {
    if (totalPages <= 1) {
      return null;
    }

    return (
      <nav
        aria-label={`${itemLabel} pagination`}
        className="mt-2 flex items-center justify-between gap-2 px-1"
      >
        <span className="text-[11px] font-medium tabular-nums text-slate-400">
          Page {currentPage} of {totalPages}
        </span>
        <div className="flex items-center gap-1">
          <button
            type="button"
            disabled={currentPage <= 1}
            onClick={() => onPageChange(currentPage - 1)}
            aria-label="Previous page"
            className="inline-flex h-7 w-7 items-center justify-center rounded-lg border border-slate-200 bg-white text-slate-600 transition hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-40"
          >
            <ChevronLeft className="h-3.5 w-3.5" />
          </button>
          <button
            type="button"
            disabled={currentPage >= totalPages}
            onClick={() => onPageChange(currentPage + 1)}
            aria-label="Next page"
            className="inline-flex h-7 w-7 items-center justify-center rounded-lg border border-slate-200 bg-white text-slate-600 transition hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-40"
          >
            <ChevronRight className="h-3.5 w-3.5" />
          </button>
        </div>
      </nav>
    );
  }

  const pageSlots = getVisiblePageSlots(currentPage, totalPages);

  return (
    <nav
      aria-label={`${itemLabel} pagination`}
      className="flex flex-col gap-3 rounded-2xl border border-slate-200/80 bg-white px-4 py-3 shadow-xs sm:flex-row sm:items-center sm:justify-between"
    >
      <div className="flex flex-wrap items-center gap-3 text-xs text-slate-500">
        <span className="tabular-nums">
          Showing{" "}
          <strong className="font-semibold text-slate-900">
            {startIndex}–{endIndex}
          </strong>{" "}
          of{" "}
          <strong className="font-semibold text-slate-900">{totalItems}</strong>{" "}
          {itemLabel}
        </span>

        {pageSizeOptions && pageSize && onPageSizeChange && (
          <label className="inline-flex items-center gap-1.5 text-xs text-slate-500">
            <span>Per page</span>
            <select
              value={pageSize}
              onChange={(event) =>
                onPageSizeChange(Number.parseInt(event.target.value, 10))
              }
              className="rounded-lg border border-slate-200 bg-slate-50 px-2 py-1 text-xs font-semibold text-slate-700 outline-none focus:border-blue-500 focus:bg-white"
            >
              {pageSizeOptions.map((option) => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            </select>
          </label>
        )}
      </div>

      <div className="flex items-center gap-1">
        <button
          type="button"
          disabled={currentPage <= 1}
          onClick={() => onPageChange(currentPage - 1)}
          aria-label="Previous page"
          className="inline-flex items-center gap-1 rounded-xl border border-slate-200 bg-white px-2.5 py-1.5 text-xs font-semibold text-slate-700 transition hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-40"
        >
          <ChevronLeft className="h-3.5 w-3.5" />
          <span className="hidden sm:inline">Prev</span>
        </button>

        <div className="flex items-center gap-1">
          {pageSlots.map((slot) => {
            if (typeof slot !== "number") {
              return (
                <span
                  key={slot}
                  className="px-1.5 text-xs font-medium text-slate-400"
                >
                  …
                </span>
              );
            }

            const isActive = slot === currentPage;
            return (
              <button
                key={slot}
                type="button"
                aria-current={isActive ? "page" : undefined}
                onClick={() => onPageChange(slot)}
                className={`h-8 min-w-8 rounded-xl px-2.5 text-xs font-semibold tabular-nums transition ${
                  isActive
                    ? "bg-blue-600 text-white shadow-xs"
                    : "border border-slate-200 bg-white text-slate-700 hover:bg-slate-50"
                }`}
              >
                {slot}
              </button>
            );
          })}
        </div>

        <button
          type="button"
          disabled={currentPage >= totalPages}
          onClick={() => onPageChange(currentPage + 1)}
          aria-label="Next page"
          className="inline-flex items-center gap-1 rounded-xl border border-slate-200 bg-white px-2.5 py-1.5 text-xs font-semibold text-slate-700 transition hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-40"
        >
          <span className="hidden sm:inline">Next</span>
          <ChevronRight className="h-3.5 w-3.5" />
        </button>
      </div>
    </nav>
  );
}
