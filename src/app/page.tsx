import { PracticeAppShell } from "@/components/PracticeAppShell";
import {
  getPracticeStats,
  getQuestionsForCategory,
  listCategories,
} from "@/db/repository";

export const dynamic = "force-dynamic";

export default function HomePage() {
  const categories = listCategories();
  const initialCategoryId = categories[0]?.id ?? "random-mix";
  const initialQuestions = getQuestionsForCategory(initialCategoryId);
  const initialStats = getPracticeStats();

  return (
    <PracticeAppShell
      initialCategories={categories}
      initialQuestions={initialQuestions}
      initialStats={initialStats}
      initialCategoryId={initialCategoryId}
    />
  );
}
