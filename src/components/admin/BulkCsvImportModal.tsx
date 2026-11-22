"use client";

import { AnimatePresence, motion } from "framer-motion";
import {
  AlertCircle,
  CheckCircle2,
  Download,
  FileSpreadsheet,
  Loader2,
  Upload,
  X,
} from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import {
  CSV_HEADERS,
  generateQuestionsCsvTemplate,
  parseQuestionsCsv,
} from "@/lib/csv-questions";
import { useAdminStore } from "@/store/use-admin-store";

export function BulkCsvImportModal() {
  const isOpen = useAdminStore((state) => state.isBulkImportModalOpen);
  const isSaving = useAdminStore((state) => state.isSaving);
  const closeModal = useAdminStore((state) => state.closeBulkImportModal);
  const bulkImportCsv = useAdminStore((state) => state.bulkImportCsv);

  const [fileName, setFileName] = useState<string>("");
  const [csvText, setCsvText] = useState<string>("");
  const [isDragging, setIsDragging] = useState(false);

  useEffect(() => {
    if (isOpen) {
      setFileName("");
      setCsvText("");
      setIsDragging(false);
    }
  }, [isOpen]);

  const parsed = useMemo(() => {
    if (!csvText.trim()) {
      return null;
    }
    return parseQuestionsCsv(csvText);
  }, [csvText]);

  const readFile = async (file: File) => {
    const text = await file.text();
    setFileName(file.name);
    setCsvText(text);
  };

  const handleFileInputChange = async (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    const file = event.target.files?.[0];
    if (file) {
      await readFile(file);
    }
    event.target.value = "";
  };

  const handleDrop = async (event: React.DragEvent<HTMLLabelElement>) => {
    event.preventDefault();
    setIsDragging(false);
    const file = event.dataTransfer.files?.[0];
    if (file) {
      await readFile(file);
    }
  };

  const handleLoadSample = () => {
    setFileName("sample-template.csv");
    setCsvText(generateQuestionsCsvTemplate());
  };

  const handleImport = async () => {
    if (!parsed || parsed.errors.length > 0 || parsed.rows.length === 0) {
      return;
    }
    await bulkImportCsv(csvText);
  };

  const canImport =
    Boolean(parsed) &&
    (parsed?.errors.length ?? 0) === 0 &&
    (parsed?.rows.length ?? 0) > 0 &&
    !isSaving;

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={closeModal}
          className="fixed inset-0 z-50 flex items-center justify-center overflow-y-auto bg-stone-950/45 p-4 backdrop-blur-xs"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 12 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.96, y: 8 }}
            transition={{ type: "spring", stiffness: 320, damping: 26 }}
            onClick={(event) => event.stopPropagation()}
            className="my-auto w-full max-w-3xl rounded-3xl border border-stone-200 bg-white p-6 shadow-2xl"
          >
            <div className="flex items-start justify-between gap-3">
              <div>
                <div className="inline-flex items-center gap-1.5 rounded-full bg-amber-100 px-2.5 py-1 text-[11px] font-semibold text-amber-800">
                  <FileSpreadsheet className="h-3.5 w-3.5" />
                  <span>Bulk CSV Insert</span>
                </div>
                <h2 className="mt-2 text-lg font-bold text-stone-900">
                  Import Questions from CSV
                </h2>
                <p className="mt-0.5 text-xs text-stone-500">
                  Upload a UTF-8 CSV file. Missing categories are created
                  automatically and all rows insert atomically.
                </p>
              </div>
              <button
                type="button"
                onClick={closeModal}
                aria-label="Close bulk import modal"
                className="rounded-xl p-2 text-stone-400 transition hover:bg-stone-100 hover:text-stone-700"
              >
                <X className="h-4 w-4" />
              </button>
            </div>

            {/* Template & Column Guide */}
            <div className="mt-4 flex flex-wrap items-center justify-between gap-2 rounded-2xl border border-stone-200/80 bg-stone-50/70 px-4 py-3">
              <div className="min-w-0 flex-1 text-xs text-stone-600">
                <span className="font-semibold text-stone-800">Columns: </span>
                <code className="break-all font-mono text-[11px] text-stone-600">
                  {CSV_HEADERS.join(", ")}
                </code>
                <p className="mt-0.5 text-[11px] text-stone-400">
                  Separate multiple accepted answers with{" "}
                  <code className="font-mono text-stone-600">|</code> (pipe).
                </p>
              </div>

              <div className="flex shrink-0 items-center gap-2">
                <button
                  type="button"
                  onClick={handleLoadSample}
                  className="rounded-xl border border-stone-200 bg-white px-3 py-1.5 text-xs font-semibold text-stone-700 transition hover:bg-stone-100"
                >
                  Load Example
                </button>
                <a
                  href="/api/admin/questions/template"
                  download="alearn-questions-template.csv"
                  className="inline-flex items-center gap-1.5 rounded-xl border border-amber-300 bg-amber-50 px-3 py-1.5 text-xs font-semibold text-amber-900 transition hover:bg-amber-100"
                >
                  <Download className="h-3.5 w-3.5" />
                  <span>Download Template</span>
                </a>
              </div>
            </div>

            {/* File Dropzone */}
            <label
              htmlFor="bulk-csv-file-input"
              onDragOver={(event) => {
                event.preventDefault();
                setIsDragging(true);
              }}
              onDragLeave={() => setIsDragging(false)}
              onDrop={handleDrop}
              className={`mt-4 flex cursor-pointer flex-col items-center justify-center rounded-2xl border-2 border-dashed p-5 text-center transition ${
                isDragging
                  ? "border-amber-500 bg-amber-50/60"
                  : "border-stone-200 bg-stone-50/40 hover:border-stone-300"
              }`}
            >
              <input
                id="bulk-csv-file-input"
                type="file"
                accept=".csv,text/csv"
                onChange={handleFileInputChange}
                className="hidden"
              />
              <Upload className="h-6 w-6 text-stone-400" />
              <p className="mt-2 text-xs font-semibold text-stone-700">
                {fileName
                  ? `Loaded file: ${fileName}`
                  : "Drop a .csv file here or click to choose"}
              </p>
              <span className="mt-2.5 rounded-xl border border-stone-300 bg-white px-3.5 py-1.5 text-xs font-semibold text-stone-800 shadow-xs transition hover:bg-stone-50">
                Choose CSV File
              </span>
            </label>

            {/* Editable Raw CSV Textarea */}
            <div className="mt-4">
              <label
                htmlFor="bulk-csv-text"
                className="block text-xs font-semibold text-stone-700"
              >
                CSV Content Preview / Paste
              </label>
              <textarea
                id="bulk-csv-text"
                rows={4}
                value={csvText}
                onChange={(event) => setCsvText(event.target.value)}
                placeholder="Paste CSV rows here or upload a .csv file above..."
                className="mt-1 w-full rounded-xl border border-stone-300 bg-stone-50/70 p-3 font-mono text-xs text-stone-800 outline-none focus:border-amber-500 focus:bg-white focus:ring-2 focus:ring-amber-400/20"
              />
            </div>

            {/* Validation Status & Preview Table */}
            {parsed && (
              <div className="mt-4">
                {parsed.errors.length > 0 ? (
                  <div className="rounded-2xl border border-rose-200 bg-rose-50/80 p-3.5 text-xs text-rose-800">
                    <div className="flex items-center gap-1.5 font-semibold">
                      <AlertCircle className="h-4 w-4 shrink-0" />
                      <span>
                        {parsed.errors.length} validation issue(s) found
                      </span>
                    </div>
                    <ul className="mt-2 list-disc space-y-1 pl-5">
                      {parsed.errors.slice(0, 5).map((issue) => (
                        <li key={`${issue.rowNumber}-${issue.message}`}>
                          Row {issue.rowNumber}: {issue.message}
                        </li>
                      ))}
                    </ul>
                  </div>
                ) : (
                  <div className="rounded-2xl border border-emerald-200 bg-emerald-50/60 p-3.5">
                    <div className="flex items-center gap-1.5 text-xs font-semibold text-emerald-800">
                      <CheckCircle2 className="h-4 w-4 shrink-0" />
                      <span>
                        Ready to import {parsed.rows.length}{" "}
                        {parsed.rows.length === 1 ? "question" : "questions"}
                      </span>
                    </div>
                    <div className="mt-2.5 overflow-x-auto rounded-xl border border-emerald-200/70 bg-white">
                      <table className="w-full text-left text-xs">
                        <thead className="border-b border-stone-100 bg-stone-50 text-[11px] text-stone-500">
                          <tr>
                            <th className="px-3 py-2 font-semibold">
                              Category
                            </th>
                            <th className="px-3 py-2 font-semibold">
                              Burmese Prompt
                            </th>
                            <th className="px-3 py-2 font-semibold">
                              English Answer
                            </th>
                            <th className="px-3 py-2 font-semibold">Level</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-stone-100">
                          {parsed.rows.slice(0, 4).map((row) => (
                            <tr key={row.rowNumber}>
                              <td className="px-3 py-2 font-medium text-stone-700">
                                {row.category}
                              </td>
                              <td className="max-w-[200px] truncate px-3 py-2 font-myanmar text-stone-800">
                                {row.burmesePrompt}
                              </td>
                              <td className="max-w-[220px] truncate px-3 py-2 text-emerald-800">
                                {row.englishAnswer}
                              </td>
                              <td className="px-3 py-2 capitalize text-stone-500">
                                {row.difficulty}
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                      {parsed.rows.length > 4 && (
                        <div className="border-t border-stone-100 bg-stone-50 px-3 py-1.5 text-[11px] text-stone-500">
                          +{parsed.rows.length - 4} more rows ready to import
                        </div>
                      )}
                    </div>
                  </div>
                )}
              </div>
            )}

            <div className="mt-5 flex items-center justify-end gap-2">
              <button
                type="button"
                onClick={closeModal}
                className="rounded-xl px-4 py-2 text-xs font-semibold text-stone-600 hover:bg-stone-100"
              >
                Cancel
              </button>
              <button
                type="button"
                disabled={!canImport}
                onClick={handleImport}
                className="inline-flex items-center gap-1.5 rounded-xl bg-stone-900 px-5 py-2 text-xs font-semibold text-white shadow-xs transition hover:bg-stone-800 disabled:cursor-not-allowed disabled:bg-stone-300"
              >
                {isSaving ? (
                  <Loader2 className="h-3.5 w-3.5 animate-spin" />
                ) : (
                  <Upload className="h-3.5 w-3.5" />
                )}
                <span>
                  Import{" "}
                  {parsed && parsed.errors.length === 0
                    ? `${parsed.rows.length} `
                    : ""}
                  Questions
                </span>
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
