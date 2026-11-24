"use client";

import { Plus, Trash2 } from "lucide-react";
import type { TenseExample } from "@/types/guide";

export interface EditableGuideExample extends TenseExample {
  key: string;
}

interface GuideExamplesEditorProps {
  examples: EditableGuideExample[];
  onChange: (next: EditableGuideExample[]) => void;
}

export function createEmptyExample(index: number): EditableGuideExample {
  return {
    key: `ex-${Date.now()}-${index}`,
    id: "",
    burmese: "",
    english: "",
    highlight: "",
    note: "",
  };
}

export function GuideExamplesEditor({
  examples,
  onChange,
}: GuideExamplesEditorProps) {
  const updateRow = (
    index: number,
    field: keyof TenseExample,
    value: string,
  ) => {
    onChange(
      examples.map((row, idx) =>
        idx === index ? { ...row, [field]: value } : row,
      ),
    );
  };

  return (
    <section className="rounded-2xl border border-slate-200/80 bg-white p-6 shadow-xs">
      <div className="flex flex-wrap items-center justify-between gap-2">
        <div>
          <h2 className="text-sm font-bold text-slate-900">
            Worked Examples (Burmese → English)
          </h2>
          <p className="mt-0.5 text-xs text-slate-500">
            Add natural Burmese sentences paired with English translations and
            highlighted grammar structures.
          </p>
        </div>

        <button
          type="button"
          onClick={() =>
            onChange([...examples, createEmptyExample(examples.length)])
          }
          className="inline-flex items-center gap-1.5 rounded-xl border border-blue-200 bg-blue-50 px-3 py-1.5 text-xs font-semibold text-blue-700 transition hover:bg-blue-100"
        >
          <Plus className="h-3.5 w-3.5" />
          <span>Add Example</span>
        </button>
      </div>

      <div className="mt-4 flex flex-col gap-4">
        {examples.map((example, index) => (
          <div
            key={example.key}
            className="rounded-xl border border-slate-200 bg-slate-50/50 p-4"
          >
            <div className="mb-3 flex items-center justify-between">
              <span className="text-xs font-semibold text-slate-500">
                Example #{index + 1}
              </span>
              {examples.length > 1 && (
                <button
                  type="button"
                  onClick={() =>
                    onChange(examples.filter((_, idx) => idx !== index))
                  }
                  className="inline-flex items-center gap-1 rounded-lg px-2 py-1 text-xs font-medium text-rose-600 transition hover:bg-rose-50"
                >
                  <Trash2 className="h-3.5 w-3.5" />
                  <span>Remove</span>
                </button>
              )}
            </div>

            <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
              <div className="sm:col-span-2">
                <label className="block text-xs font-semibold text-slate-700">
                  Burmese Sentence
                  <input
                    type="text"
                    value={example.burmese}
                    onChange={(event) =>
                      updateRow(index, "burmese", event.target.value)
                    }
                    placeholder="ဥပမာ - ကျွန်တော် အရင်က ကျောင်းကို စက်ဘီးစီးသွားလေ့ရှိတယ်။"
                    className="mt-1 w-full rounded-xl border border-slate-300 bg-white px-3.5 py-2 font-myanmar text-sm font-normal text-slate-900 outline-none focus:border-blue-500"
                  />
                </label>
              </div>

              <div className="sm:col-span-2">
                <label className="block text-xs font-semibold text-slate-700">
                  English Sentence
                  <input
                    type="text"
                    value={example.english}
                    onChange={(event) =>
                      updateRow(index, "english", event.target.value)
                    }
                    placeholder="e.g., I used to ride a bicycle to school."
                    className="mt-1 w-full rounded-xl border border-slate-300 bg-white px-3.5 py-2 text-sm font-normal text-slate-900 outline-none focus:border-blue-500"
                  />
                </label>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700">
                  Highlighted Phrase
                  <input
                    type="text"
                    value={example.highlight}
                    onChange={(event) =>
                      updateRow(index, "highlight", event.target.value)
                    }
                    placeholder="e.g., used to ride"
                    className="mt-1 w-full rounded-xl border border-slate-300 bg-white px-3.5 py-2 font-mono text-xs font-normal text-slate-900 outline-none focus:border-blue-500"
                  />
                </label>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700">
                  Explanation Note
                  <input
                    type="text"
                    value={example.note}
                    onChange={(event) =>
                      updateRow(index, "note", event.target.value)
                    }
                    placeholder="Short grammar note for this example"
                    className="mt-1 w-full rounded-xl border border-slate-300 bg-white px-3.5 py-2 text-xs font-normal text-slate-900 outline-none focus:border-blue-500"
                  />
                </label>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
