import { notFound } from "next/navigation";
import { QuestionFormView } from "@/components/admin/forms/QuestionFormView";
import { resolveDatabasePath } from "@/db/config";
import { listCategories } from "@/db/repository";
import { isLocalAdminServerPageAllowed } from "@/lib/local-only";

export const dynamic = "force-dynamic";

interface NewQuestionPageProps {
  searchParams: Promise<{ categoryId?: string }>;
}

export default async function NewAdminQuestionPage({
  searchParams,
}: NewQuestionPageProps) {
  const allowed = await isLocalAdminServerPageAllowed();
  if (!allowed) {
    notFound();
  }

  const resolvedParams = await searchParams;
  const categories = listCategories();

  return (
    <QuestionFormView
      categories={categories}
      defaultCategoryId={resolvedParams.categoryId}
      databasePath={resolveDatabasePath()}
    />
  );
}
