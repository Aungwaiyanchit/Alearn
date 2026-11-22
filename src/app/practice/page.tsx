import { PracticeAppShell } from "@/components/PracticeAppShell";
import {
  getPracticeStats,
  getQuestionsForCategory,
  listCategories,
} from "@/db/repository";
import { isLocalAdminServerPageAllowed } from "@/lib/local-only";

export const dynamic = "force-dynamic";

interface PracticePageProps {
  searchParams: Promise<{ category?: string }>;
}

export default async function PracticePage({
  searchParams,
}: PracticePageProps) {
  const resolvedParams = await searchParams;
  const categories = listCategories();
  const requestedCategory = resolvedParams.category?.trim();

  const hasRequestedCategory =
    requestedCategory === "random-mix" ||
    categories.some((cat) => cat.id === requestedCategory);

  const initialCategoryId = hasRequestedCategory
    ? (requestedCategory ?? "random-mix")
    : (categories[0]?.id ?? "random-mix");

  const initialQuestions = getQuestionsForCategory(initialCategoryId, {
    count: initialCategoryId === "random-mix" ? 8 : undefined,
  });
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
