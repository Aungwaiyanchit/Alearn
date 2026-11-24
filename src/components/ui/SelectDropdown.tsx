"use client";

import { AnimatePresence, motion } from "framer-motion";
import { Check, ChevronDown } from "lucide-react";
import { useEffect, useId, useRef, useState } from "react";

export interface SelectOption<T extends string = string> {
  value: T;
  label: string;
  description?: string;
}

interface SelectDropdownProps<T extends string = string> {
  id?: string;
  value: T;
  options: readonly SelectOption<T>[];
  onChange: (value: T) => void;
  placeholder?: string;
  ariaLabel?: string;
  size?: "sm" | "md";
  menuPlacement?: "bottom" | "top";
  disabled?: boolean;
  className?: string;
}

export function SelectDropdown<T extends string = string>({
  id,
  value,
  options,
  onChange,
  placeholder = "Select an option",
  ariaLabel,
  size = "md",
  menuPlacement = "bottom",
  disabled = false,
  className = "",
}: SelectDropdownProps<T>) {
  const generatedId = useId();
  const listboxId = `${id ?? generatedId}-listbox`;
  const containerRef = useRef<HTMLDivElement>(null);

  const [isOpen, setIsOpen] = useState(false);
  const [activeIndex, setActiveIndex] = useState<number>(() =>
    Math.max(
      0,
      options.findIndex((option) => option.value === value),
    ),
  );

  const selectedOption = options.find((option) => option.value === value);

  useEffect(() => {
    if (!isOpen) {
      return;
    }

    const handlePointerDown = (event: MouseEvent) => {
      if (
        containerRef.current &&
        !containerRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handlePointerDown);
    document.addEventListener("keydown", handleEscape);
    return () => {
      document.removeEventListener("mousedown", handlePointerDown);
      document.removeEventListener("keydown", handleEscape);
    };
  }, [isOpen]);

  const openMenu = () => {
    if (disabled) {
      return;
    }
    const selectedIdx = options.findIndex((option) => option.value === value);
    setActiveIndex(Math.max(selectedIdx, 0));
    setIsOpen(true);
  };

  const handleSelect = (nextValue: T) => {
    onChange(nextValue);
    setIsOpen(false);
  };

  const handleTriggerKeyDown = (
    event: React.KeyboardEvent<HTMLButtonElement>,
  ) => {
    if (disabled) {
      return;
    }

    if (event.key === "ArrowDown") {
      event.preventDefault();
      if (!isOpen) {
        openMenu();
      } else {
        setActiveIndex((prev) => (prev + 1) % Math.max(options.length, 1));
      }
      return;
    }

    if (event.key === "ArrowUp") {
      event.preventDefault();
      if (!isOpen) {
        openMenu();
      } else {
        setActiveIndex(
          (prev) =>
            (prev - 1 + Math.max(options.length, 1)) %
            Math.max(options.length, 1),
        );
      }
      return;
    }

    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      if (!isOpen) {
        openMenu();
      } else {
        const option = options[activeIndex];
        if (option) {
          handleSelect(option.value);
        }
      }
      return;
    }

    if (event.key === "Tab" && isOpen) {
      setIsOpen(false);
    }
  };

  const triggerPadding =
    size === "sm"
      ? "rounded-xl px-3 py-2 text-xs gap-2"
      : "rounded-xl px-3.5 py-2.5 text-sm gap-2.5";

  const placementClasses =
    menuPlacement === "top"
      ? "bottom-full mb-1.5 origin-bottom"
      : "top-full mt-1.5 origin-top";

  return (
    <div ref={containerRef} className={`relative ${className}`}>
      <button
        id={id}
        type="button"
        role="combobox"
        disabled={disabled}
        aria-label={ariaLabel}
        aria-expanded={isOpen}
        aria-haspopup="listbox"
        aria-controls={listboxId}
        onClick={() => (isOpen ? setIsOpen(false) : openMenu())}
        onKeyDown={handleTriggerKeyDown}
        className={`flex w-full items-center justify-between border bg-white font-medium text-slate-900 shadow-2xs transition outline-none disabled:cursor-not-allowed disabled:opacity-50 ${triggerPadding} ${
          isOpen
            ? "border-blue-500 ring-2 ring-blue-500/15"
            : "border-slate-200 hover:border-slate-300 focus-visible:border-blue-500 focus-visible:ring-2 focus-visible:ring-blue-500/15"
        }`}
      >
        <span className="truncate text-left">
          {selectedOption ? (
            selectedOption.label
          ) : (
            <span className="text-slate-400">{placeholder}</span>
          )}
        </span>
        <ChevronDown
          className={`h-4 w-4 shrink-0 text-slate-400 transition-transform duration-150 ${
            isOpen ? "rotate-180 text-blue-600" : ""
          }`}
        />
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.ul
            id={listboxId}
            role="listbox"
            aria-label={ariaLabel}
            initial={{
              opacity: 0,
              scale: 0.97,
              y: menuPlacement === "top" ? 4 : -4,
            }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{
              opacity: 0,
              scale: 0.97,
              y: menuPlacement === "top" ? 4 : -4,
            }}
            transition={{ duration: 0.14, ease: [0.22, 1, 0.36, 1] }}
            className={`absolute left-0 z-50 max-h-64 min-w-full overflow-y-auto rounded-xl border border-slate-200/90 bg-white p-1 shadow-lg shadow-slate-900/10 ${placementClasses}`}
          >
            {options.map((option, index) => {
              const isSelected = option.value === value;
              const isHighlighted = index === activeIndex;

              return (
                <li key={option.value} role="none">
                  <button
                    type="button"
                    role="option"
                    aria-selected={isSelected}
                    onMouseEnter={() => setActiveIndex(index)}
                    onClick={() => handleSelect(option.value)}
                    className={`flex w-full items-center justify-between gap-3 rounded-lg px-3 py-2 text-left transition ${
                      size === "sm" ? "text-xs" : "text-sm"
                    } ${
                      isSelected
                        ? "bg-blue-50 font-semibold text-blue-700"
                        : isHighlighted
                          ? "bg-slate-100 text-slate-900"
                          : "text-slate-700 hover:bg-slate-50"
                    }`}
                  >
                    <div className="min-w-0 flex-1">
                      <div className="truncate">{option.label}</div>
                      {option.description && (
                        <div className="truncate font-myanmar text-[11px] font-normal text-slate-400">
                          {option.description}
                        </div>
                      )}
                    </div>
                    {isSelected && (
                      <Check className="h-3.5 w-3.5 shrink-0 text-blue-600" />
                    )}
                  </button>
                </li>
              );
            })}
          </motion.ul>
        )}
      </AnimatePresence>
    </div>
  );
}
