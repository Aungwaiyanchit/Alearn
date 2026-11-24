import { notFound } from "next/navigation";
import { CategoryFormView } from "@/components/admin/forms/CategoryFormView";
import { getCategoryById } from "@/db/admin-repository";
import { resolveDatabasePath } from "@/db/config";
import { isLocalAdminServerPageAllowed } from "@/lib/local-only";

export const dynamic = "force-dynamic";

interface EditCategoryPageProps {
  params: Promise<{ id: string }>;
}

export default async function EditAdminCategoryPage({
  params,
}: EditCategoryPageProps) {
  const allowed = await isLocalAdminServerPageAllowed();
  if (!allowed) {
    notFound();
  }

  const { id } = await params;
  const category = getCategoryById(id);
  if (!category) {
    notFound();
  }

  return (
    <CategoryFormView
      initialCategory={category}
      databasePath={resolveDatabasePath()}
    />
  );
}
