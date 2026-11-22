"use client";

import { AnimatePresence, motion } from "framer-motion";
import { Loader2, Save, X } from "lucide-react";
import { useEffect, useState } from "react";
import { CategoryIcon } from "@/components/categories/CategoryIcon";
import { useAdminStore } from "@/store/use-admin-store";
import { CATEGORY_COLOR_OPTIONS, CATEGORY_ICON_OPTIONS } from "@/types/admin";

export function CategoryFormModal() {
  const isOpen = useAdminStore((state) => state.isCategoryModalOpen);
  const editingCategory = useAdminStore((state) => state.editingCategory);
  const isSaving = useAdminStore((state) => state.isSaving);
  const closeModal = useAdminStore((state) => state.closeCategoryModal);
  const saveCategory = useAdminStore((state) => state.saveCategory);

  const [name, setName] = useState("");
  const [burmeseName, setBurmeseName] = useState("");
  const [description, setDescription] = useState("");
  const [icon, setIcon] = useState<string>("book-open");
  const [accentColor, setAccentColor] = useState<string>("amber");

  useEffect(() => {
    if (isOpen) {
      if (editingCategory) {
        setName(editingCategory.name);
        setBurmeseName(editingCategory.burmeseName);
        setDescription(editingCategory.description);
        setIcon(editingCategory.icon);
        setAccentColor(editingCategory.accentColor);
      } else {
        setName("");
        setBurmeseName("");
        setDescription("");
        setIcon("book-open");
        setAccentColor("amber");
      }
    }
  }, [isOpen, editingCategory]);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!name.trim() || !burmeseName.trim()) {
      return;
    }

    await saveCategory({
      name,
      burmeseName,
      description,
      icon,
      accentColor,
    });
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={closeModal}
          className="fixed inset-0 z-50 flex items-center justify-center bg-stone-950/45 p-4 backdrop-blur-xs"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 12 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.96, y: 8 }}
            transition={{ type: "spring", stiffness: 320, damping: 26 }}
            onClick={(event) => event.stopPropagation()}
            className="w-full max-w-lg rounded-3xl border border-stone-200 bg-white p-6 shadow-2xl"
          >
            <div className="flex items-start justify-between gap-3">
              <div>
                <h2 className="text-lg font-bold text-stone-900">
                  {editingCategory ? "Edit Category" : "Create Category"}
                </h2>
                <p className="mt-0.5 text-xs text-stone-500">
                  Changes are written directly to your local SQLite database.
                </p>
              </div>
              <button
                type="button"
                onClick={closeModal}
                aria-label="Close category modal"
                className="rounded-xl p-2 text-stone-400 transition hover:bg-stone-100 hover:text-stone-700"
              >
                <X className="h-4 w-4" />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="mt-5 flex flex-col gap-4">
              <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                <div>
                  <label
                    htmlFor="admin-cat-name"
                    className="block text-xs font-semibold text-stone-700"
                  >
                    English Name *
                  </label>
                  <input
                    id="admin-cat-name"
                    type="text"
                    required
                    value={name}
                    onChange={(event) => setName(event.target.value)}
                    placeholder="e.g., Job Interviews"
                    className="mt-1 w-full rounded-xl border border-stone-300 bg-stone-50/70 px-3 py-2 text-sm text-stone-900 outline-none focus:border-amber-500 focus:bg-white focus:ring-2 focus:ring-amber-400/30"
                  />
                </div>

                <div>
                  <label
                    htmlFor="admin-cat-mm"
                    className="block text-xs font-semibold text-stone-700"
                  >
                    Burmese Name (မြန်မာအမည်) *
                  </label>
                  <input
                    id="admin-cat-mm"
                    type="text"
                    required
                    value={burmeseName}
                    onChange={(event) => setBurmeseName(event.target.value)}
                    placeholder="ဥပမာ - အလုပ်အင်တာဗျူး"
                    className="mt-1 w-full rounded-xl border border-stone-300 bg-stone-50/70 px-3 py-2 font-myanmar text-sm text-stone-900 outline-none focus:border-amber-500 focus:bg-white focus:ring-2 focus:ring-amber-400/30"
                  />
                </div>
              </div>

              <div>
                <label
                  htmlFor="admin-cat-desc"
                  className="block text-xs font-semibold text-stone-700"
                >
                  Description
                </label>
                <textarea
                  id="admin-cat-desc"
                  rows={2}
                  value={description}
                  onChange={(event) => setDescription(event.target.value)}
                  placeholder="Short description of what learners will practice."
                  className="mt-1 w-full resize-none rounded-xl border border-stone-300 bg-stone-50/70 px-3 py-2 text-sm text-stone-900 outline-none focus:border-amber-500 focus:bg-white focus:ring-2 focus:ring-amber-400/30"
                />
              </div>

              <div>
                <span className="block text-xs font-semibold text-stone-700">
                  Icon
                </span>
                <div className="mt-1.5 flex flex-wrap gap-2">
                  {CATEGORY_ICON_OPTIONS.map((option) => (
                    <button
                      key={option.value}
                      type="button"
                      onClick={() => setIcon(option.value)}
                      className={`inline-flex items-center gap-1.5 rounded-xl border px-3 py-1.5 text-xs font-medium transition ${
                        icon === option.value
                          ? "border-stone-900 bg-stone-900 text-white"
                          : "border-stone-200 bg-stone-50 text-stone-700 hover:border-stone-300"
                      }`}
                    >
                      <CategoryIcon
                        name={option.value}
                        className="h-3.5 w-3.5"
                      />
                      <span>{option.label}</span>
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <span className="block text-xs font-semibold text-stone-700">
                  Accent Color
                </span>
                <div className="mt-1.5 flex flex-wrap gap-2">
                  {CATEGORY_COLOR_OPTIONS.map((option) => (
                    <button
                      key={option.value}
                      type="button"
                      onClick={() => setAccentColor(option.value)}
                      className={`inline-flex items-center gap-2 rounded-xl border px-3 py-1.5 text-xs font-medium transition ${
                        accentColor === option.value
                          ? "border-stone-900 bg-stone-900 text-white"
                          : "border-stone-200 bg-stone-50 text-stone-700 hover:border-stone-300"
                      }`}
                    >
                      <span
                        className={`h-2.5 w-2.5 rounded-full ${option.swatch}`}
                      />
                      <span>{option.label}</span>
                    </button>
                  ))}
                </div>
              </div>

              <div className="mt-2 flex items-center justify-end gap-2">
                <button
                  type="button"
                  onClick={closeModal}
                  className="rounded-xl px-4 py-2 text-xs font-semibold text-stone-600 hover:bg-stone-100"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isSaving || !name.trim() || !burmeseName.trim()}
                  className="inline-flex items-center gap-1.5 rounded-xl bg-amber-500 px-5 py-2 text-xs font-semibold text-white shadow-xs transition hover:bg-amber-600 disabled:opacity-60"
                >
                  {isSaving ? (
                    <Loader2 className="h-3.5 w-3.5 animate-spin" />
                  ) : (
                    <Save className="h-3.5 w-3.5" />
                  )}
                  <span>
                    {editingCategory ? "Save Changes" : "Create Category"}
                  </span>
                </button>
              </div>
            </form>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
