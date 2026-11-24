import { notFound } from "next/navigation";
import { QuestionFormView } from "@/components/admin/forms/QuestionFormView";
import { getQuestionById } from "@/db/admin-repository";
import { resolveDatabasePath } from "@/db/config";
import { listCategories } from "@/db/repository";
import { isLocalAdminServerPageAllowed } from "@/lib/local-only";

export const dynamic = "force-dynamic";

interface EditQuestionPageProps {
  params: Promise<{ id: string }>;
}

export default async function EditAdminQuestionPage({
  params,
}: EditQuestionPageProps) {
  const allowed = await isLocalAdminServerPageAllowed();
  if (!allowed) {
    notFound();
  }

  const { id } = await params;
  const question = getQuestionById(id);
  if (!question) {
    notFound();
  }

  const categories = listCategories();

  return (
    <QuestionFormView
      initialQuestion={question}
      categories={categories}
      databasePath={resolveDatabasePath()}
    />
  );
}
