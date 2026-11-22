import { PracticeAppShell } from "@/components/PracticeAppShell";
import {
  getPracticeStats,
  getQuestionsForCategory,
  listCategories,
} from "@/db/repository";
import { isLocalAdminServerPageAllowed } from "@/lib/local-only";

export const dynamic = "force-dynamic";

export default async function HomePage() {
  const categories = listCategories();
  const initialCategoryId = categories[0]?.id ?? "random-mix";
  const initialQuestions = getQuestionsForCategory(initialCategoryId);
  const initialStats = getPracticeStats();
  const showLocalAdmin = await isLocalAdminServerPageAllowed();

  return (
    <PracticeAppShell
      initialCategories={categories}
      initialQuestions={initialQuestions}
      initialStats={initialStats}
      initialCategoryId={initialCategoryId}
      showLocalAdmin={showLocalAdmin}
    />
  );
}
