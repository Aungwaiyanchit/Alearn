import { notFound } from "next/navigation";
import { GuideLessonFormView } from "@/components/admin/forms/GuideLessonFormView";
import { resolveDatabasePath } from "@/db/config";
import { getGuideLessonById, listGuideTips } from "@/db/guide-repository";
import { listCategories } from "@/db/repository";
import { isLocalAdminServerPageAllowed } from "@/lib/local-only";

export const dynamic = "force-dynamic";

interface EditGuideLessonPageProps {
  params: Promise<{ id: string }>;
}

export default async function EditAdminGuideLessonPage({
  params,
}: EditGuideLessonPageProps) {
  const allowed = await isLocalAdminServerPageAllowed();
  if (!allowed) {
    notFound();
  }

  const { id } = await params;
  const lesson = getGuideLessonById(id);
  if (!lesson) {
    notFound();
  }

  const categories = listCategories();
  const guideTips = listGuideTips();

  return (
    <GuideLessonFormView
      initialLesson={lesson}
      categories={categories}
      guideTips={guideTips}
      databasePath={resolveDatabasePath()}
    />
  );
}
