import { notFound } from "next/navigation";
import { GuideLessonFormView } from "@/components/admin/forms/GuideLessonFormView";
import { resolveDatabasePath } from "@/db/config";
import { listGuideLessons, listGuideTips } from "@/db/guide-repository";
import { listCategories } from "@/db/repository";
import { isLocalAdminServerPageAllowed } from "@/lib/local-only";

export const dynamic = "force-dynamic";

export default async function NewAdminGuideLessonPage() {
  const allowed = await isLocalAdminServerPageAllowed();
  if (!allowed) {
    notFound();
  }

  const allLessons = listGuideLessons();
  const categories = listCategories();
  const guideTips = listGuideTips();

  return (
    <GuideLessonFormView
      allLessons={allLessons}
      categories={categories}
      guideTips={guideTips}
      databasePath={resolveDatabasePath()}
    />
  );
}
