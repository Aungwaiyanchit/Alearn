"use client";

import { AnimatePresence, motion } from "framer-motion";
import { AlertTriangle, Loader2, Trash2, X } from "lucide-react";
import { useEffect, useState } from "react";
import { useAdminStore } from "@/store/use-admin-store";

export function DestroyAllModal() {
  const isOpen = useAdminStore((state) => state.isDestroyModalOpen);
  const categories = useAdminStore((state) => state.categories);
  const questions = useAdminStore((state) => state.questions);
  const guideLessons = useAdminStore((state) => state.guideLessons);
  const stats = useAdminStore((state) => state.stats);
  const isSaving = useAdminStore((state) => state.isSaving);
  const closeModal = useAdminStore((state) => state.closeDestroyModal);
  const destroyEverything = useAdminStore((state) => state.destroyEverything);

  const [confirmText, setConfirmText] = useState("");

  useEffect(() => {
    if (isOpen) {
      setConfirmText("");
    }
  }, [isOpen]);

  const isConfirmed = confirmText.trim() === "DESTROY";

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!isConfirmed || isSaving) {
      return;
    }
    await destroyEverything("DESTROY");
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={closeModal}
          className="fixed inset-0 z-50 flex items-center justify-center bg-stone-950/55 p-4 backdrop-blur-xs"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.94, y: 12 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 8 }}
            transition={{ type: "spring", stiffness: 320, damping: 26 }}
            onClick={(event) => event.stopPropagation()}
            className="w-full max-w-md rounded-3xl border border-rose-200 bg-white p-6 shadow-2xl"
          >
            <div className="flex items-start justify-between gap-3">
              <div className="flex items-start gap-3">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl bg-rose-100 text-rose-600">
                  <AlertTriangle className="h-5 w-5" />
                </div>
                <div>
                  <h2 className="text-base font-bold text-stone-900">
                    Destroy Everything
                  </h2>
                  <p className="mt-0.5 text-xs text-stone-500">
                    This permanently clears all local SQLite records.
                  </p>
                </div>
              </div>
              <button
                type="button"
                onClick={closeModal}
                aria-label="Close destroy confirmation"
                className="rounded-xl p-2 text-stone-400 transition hover:bg-stone-100 hover:text-stone-700"
              >
                <X className="h-4 w-4" />
              </button>
            </div>

            <div className="mt-4 rounded-2xl border border-rose-200/80 bg-rose-50/70 p-3.5 text-xs text-rose-900">
              <p className="font-semibold">
                The following local data will be deleted:
              </p>
              <ul className="mt-1.5 list-disc space-y-0.5 pl-5">
                <li>
                  <strong>{categories.length}</strong> categories (including
                  random sets)
                </li>
                <li>
                  <strong>{questions.length}</strong> practice questions
                </li>
                <li>
                  <strong>{guideLessons.length}</strong> guide lessons
                </li>
                <li>
                  <strong>{stats.totalAttempts}</strong> practice attempts
                </li>
              </ul>
            </div>

            <form onSubmit={handleSubmit} className="mt-4 flex flex-col gap-4">
              <div>
                <label
                  htmlFor="destroy-confirm-input"
                  className="block text-xs font-semibold text-stone-700"
                >
                  Type <code className="font-mono text-rose-700">DESTROY</code>{" "}
                  to confirm
                </label>
                <input
                  id="destroy-confirm-input"
                  type="text"
                  autoComplete="off"
                  value={confirmText}
                  onChange={(event) => setConfirmText(event.target.value)}
                  placeholder="DESTROY"
                  className="mt-1.5 w-full rounded-xl border border-stone-300 bg-stone-50/70 px-3.5 py-2.5 font-mono text-sm text-stone-900 outline-none focus:border-rose-500 focus:bg-white focus:ring-2 focus:ring-rose-400/30"
                />
              </div>

              <div className="flex items-center justify-end gap-2">
                <button
                  type="button"
                  onClick={closeModal}
                  className="rounded-xl px-4 py-2 text-xs font-semibold text-stone-600 hover:bg-stone-100"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={!isConfirmed || isSaving}
                  className="inline-flex items-center gap-1.5 rounded-xl bg-rose-600 px-4 py-2 text-xs font-semibold text-white shadow-xs transition hover:bg-rose-700 disabled:cursor-not-allowed disabled:bg-rose-300"
                >
                  {isSaving ? (
                    <Loader2 className="h-3.5 w-3.5 animate-spin" />
                  ) : (
                    <Trash2 className="h-3.5 w-3.5" />
                  )}
                  <span>Destroy Everything</span>
                </button>
              </div>
            </form>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
