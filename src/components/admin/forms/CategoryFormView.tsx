"use client";

import { Loader2, Save } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { AdminFormLayout } from "@/components/admin/forms/AdminFormLayout";
import { CategoryIcon } from "@/components/categories/CategoryIcon";
import { getAccentPalette } from "@/lib/category-styles";
import { CATEGORY_COLOR_OPTIONS, CATEGORY_ICON_OPTIONS } from "@/types/admin";
import type { Category } from "@/types/practice";

interface CategoryFormViewProps {
  initialCategory?: Category | null;
  databasePath: string;
}

export function CategoryFormView({
  initialCategory = null,
  databasePath,
}: CategoryFormViewProps) {
  const router = useRouter();
  const isEditing = Boolean(initialCategory);

  const [name, setName] = useState(initialCategory?.name ?? "");
  const [burmeseName, setBurmeseName] = useState(
    initialCategory?.burmeseName ?? "",
  );
  const [description, setDescription] = useState(
    initialCategory?.description ?? "",
  );
  const [icon, setIcon] = useState(initialCategory?.icon ?? "book-open");
  const [accentColor, setAccentColor] = useState(
    initialCategory?.accentColor ?? "amber",
  );
  const [isSaving, setIsSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const previewPalette = getAccentPalette(accentColor);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!name.trim() || !burmeseName.trim() || isSaving) {
      return;
    }

    setIsSaving(true);
    setError(null);

    try {
      const endpoint = initialCategory
        ? `/api/admin/categories/${initialCategory.id}`
        : "/api/admin/categories";
      const method = initialCategory ? "PATCH" : "POST";

      const response = await fetch(endpoint, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name,
          burmeseName,
          description,
          icon,
          accentColor,
        }),
      });

      const payload = (await response.json()) as { error?: string };
      if (!response.ok) {
        throw new Error(payload.error ?? "Failed to save category");
      }

      router.push("/admin?tab=categories");
      router.refresh();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to save category");
      setIsSaving(false);
    }
  };

  return (
    <AdminFormLayout
      title={isEditing ? "Edit Category" : "Create New Category"}
      subtitle="Manage practice lesson categories stored in your local SQLite database."
      backHref="/admin?tab=categories"
      backLabel="Back to Categories"
      databasePath={databasePath}
      error={error}
    >
      <form onSubmit={handleSubmit} className="flex flex-col gap-6">
        <section className="rounded-2xl border border-slate-200/80 bg-white p-6 shadow-xs">
          <h2 className="text-sm font-bold text-slate-900">Category Details</h2>

          <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div>
              <label
                htmlFor="cat-name"
                className="block text-xs font-semibold text-slate-700"
              >
                English Name *
              </label>
              <input
                id="cat-name"
                type="text"
                required
                value={name}
                onChange={(event) => setName(event.target.value)}
                placeholder="e.g., Job Interviews"
                className="mt-1.5 w-full rounded-xl border border-slate-300 bg-slate-50/70 px-3.5 py-2.5 text-sm text-slate-900 outline-none focus:border-blue-500 focus:bg-white focus:ring-2 focus:ring-blue-500/15"
              />
            </div>

            <div>
              <label
                htmlFor="cat-burmese"
                className="block text-xs font-semibold text-slate-700"
              >
                Burmese Name (မြန်မာအမည်) *
              </label>
              <input
                id="cat-burmese"
                type="text"
                required
                value={burmeseName}
                onChange={(event) => setBurmeseName(event.target.value)}
                placeholder="ဥပမာ - အလုပ်အင်တာဗျူး"
                className="mt-1.5 w-full rounded-xl border border-slate-300 bg-slate-50/70 px-3.5 py-2.5 font-myanmar text-sm text-slate-900 outline-none focus:border-blue-500 focus:bg-white focus:ring-2 focus:ring-blue-500/15"
              />
            </div>
          </div>

          <div className="mt-4">
            <label
              htmlFor="cat-desc"
              className="block text-xs font-semibold text-slate-700"
            >
              Description
            </label>
            <textarea
              id="cat-desc"
              rows={3}
              value={description}
              onChange={(event) => setDescription(event.target.value)}
              placeholder="Short description of what learners will practice in this category."
              className="mt-1.5 w-full rounded-xl border border-slate-300 bg-slate-50/70 px-3.5 py-2.5 text-sm text-slate-900 outline-none focus:border-blue-500 focus:bg-white focus:ring-2 focus:ring-blue-500/15"
            />
          </div>
        </section>

        <section className="rounded-2xl border border-slate-200/80 bg-white p-6 shadow-xs">
          <h2 className="text-sm font-bold text-slate-900">Appearance</h2>

          <div className="mt-4">
            <span className="block text-xs font-semibold text-slate-700">
              Icon
            </span>
            <div className="mt-2 flex flex-wrap gap-2">
              {CATEGORY_ICON_OPTIONS.map((option) => (
                <button
                  key={option.value}
                  type="button"
                  onClick={() => setIcon(option.value)}
                  className={`inline-flex items-center gap-2 rounded-xl border px-3.5 py-2 text-xs font-semibold transition ${
                    icon === option.value
                      ? "border-blue-600 bg-blue-600 text-white"
                      : "border-slate-200 bg-slate-50 text-slate-700 hover:border-slate-300"
                  }`}
                >
                  <CategoryIcon name={option.value} className="h-4 w-4" />
                  <span>{option.label}</span>
                </button>
              ))}
            </div>
          </div>

          <div className="mt-5">
            <span className="block text-xs font-semibold text-slate-700">
              Icon Tint
            </span>
            <div className="mt-2 flex flex-wrap gap-2">
              {CATEGORY_COLOR_OPTIONS.map((option) => (
                <button
                  key={option.value}
                  type="button"
                  onClick={() => setAccentColor(option.value)}
                  className={`inline-flex items-center gap-2 rounded-xl border px-3.5 py-2 text-xs font-semibold transition ${
                    accentColor === option.value
                      ? "border-blue-600 bg-blue-50 text-blue-900"
                      : "border-slate-200 bg-slate-50 text-slate-700 hover:border-slate-300"
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

          {/* Live Preview */}
          <div className="mt-6 border-t border-slate-100 pt-5">
            <span className="text-[11px] font-semibold tracking-wider text-slate-400 uppercase">
              Sidebar Preview
            </span>
            <div className="mt-2.5 flex max-w-sm items-center gap-3 rounded-xl border border-slate-200 bg-slate-50/50 p-3.5">
              <div
                className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-lg ${previewPalette.iconBg}`}
              >
                <CategoryIcon name={icon} className="h-4 w-4" />
              </div>
              <div className="min-w-0">
                <div className="truncate text-sm font-semibold text-slate-900">
                  {name.trim() || "Category Name"}
                </div>
                <div className="truncate font-myanmar text-xs text-slate-500">
                  {burmeseName.trim() || "မြန်မာအမည်"}
                </div>
              </div>
            </div>
          </div>
        </section>

        <div className="flex items-center justify-end gap-3">
          <Link
            href="/admin?tab=categories"
            className="rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-xs font-semibold text-slate-700 transition hover:bg-slate-50"
          >
            Cancel
          </Link>
          <button
            type="submit"
            disabled={isSaving || !name.trim() || !burmeseName.trim()}
            className="inline-flex items-center gap-2 rounded-xl bg-blue-600 px-5 py-2.5 text-xs font-semibold text-white shadow-xs transition hover:bg-blue-700 disabled:opacity-60"
          >
            {isSaving ? (
              <Loader2 className="h-4 w-4 animate-spin" />
            ) : (
              <Save className="h-4 w-4" />
            )}
            <span>{isEditing ? "Save Changes" : "Create Category"}</span>
          </button>
        </div>
      </form>
    </AdminFormLayout>
  );
}
