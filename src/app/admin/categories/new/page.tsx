import { notFound } from "next/navigation";
import { CategoryFormView } from "@/components/admin/forms/CategoryFormView";
import { resolveDatabasePath } from "@/db/config";
import { isLocalAdminServerPageAllowed } from "@/lib/local-only";

export const dynamic = "force-dynamic";

export default async function NewAdminCategoryPage() {
  const allowed = await isLocalAdminServerPageAllowed();
  if (!allowed) {
    notFound();
  }

  return <CategoryFormView databasePath={resolveDatabasePath()} />;
}
