import { notFound } from "next/navigation";
import { AdminShell } from "@/components/admin/AdminShell";
import { listAllQuestions } from "@/db/admin-repository";
import { resolveDatabasePath } from "@/db/config";
import { listGuideLessons, listGuideTips } from "@/db/guide-repository";
import { getPracticeStats, listCategories } from "@/db/repository";
import { isLocalAdminServerPageAllowed } from "@/lib/local-only";

export const dynamic = "force-dynamic";

export default async function LocalAdminPage() {
  const allowed = await isLocalAdminServerPageAllowed();
  if (!allowed) {
    notFound();
  }

  const categories = listCategories();
  const questions = listAllQuestions();
  const guideLessons = listGuideLessons();
  const guideTips = listGuideTips();
  const stats = getPracticeStats();
  const databasePath = resolveDatabasePath();

  return (
    <AdminShell
      initialCategories={categories}
      initialQuestions={questions}
      initialGuideLessons={guideLessons}
      initialGuideTips={guideTips}
      initialStats={stats}
      databasePath={databasePath}
    />
  );
}
