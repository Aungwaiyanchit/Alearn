import { notFound } from "next/navigation";
import { AdminShell } from "@/components/admin/AdminShell";
import { listAllQuestions } from "@/db/admin-repository";
import { resolveDatabasePath } from "@/db/config";
import { listGuideLessons, listGuideTips } from "@/db/guide-repository";
import { getPracticeStats, listCategories } from "@/db/repository";
import { isLocalAdminServerPageAllowed } from "@/lib/local-only";
import type { AdminTab } from "@/store/use-admin-store";

export const dynamic = "force-dynamic";

const ALLOWED_TABS = new Set<AdminTab>(["questions", "categories", "guide"]);

interface LocalAdminPageProps {
  searchParams: Promise<{ tab?: string }>;
}

export default async function LocalAdminPage({
  searchParams,
}: LocalAdminPageProps) {
  const allowed = await isLocalAdminServerPageAllowed();
  if (!allowed) {
    notFound();
  }

  const resolvedParams = await searchParams;
  const requestedTab = resolvedParams.tab as AdminTab | undefined;
  const initialTab: AdminTab =
    requestedTab && ALLOWED_TABS.has(requestedTab) ? requestedTab : "questions";

  const categories = listCategories();
  const questions = listAllQuestions();
  const guideLessons = listGuideLessons();
  const guideTips = listGuideTips();
  const stats = getPracticeStats();
  const databasePath = resolveDatabasePath();

  return (
    <AdminShell
      initialTab={initialTab}
      initialCategories={categories}
      initialQuestions={questions}
      initialGuideLessons={guideLessons}
      initialGuideTips={guideTips}
      initialStats={stats}
      databasePath={databasePath}
    />
  );
}
