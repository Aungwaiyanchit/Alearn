import { LessonsGuideShell } from "@/components/guide/LessonsGuideShell";
import { listGuideLessons, listGuideTips } from "@/db/guide-repository";
import { getPracticeStats, listCategories } from "@/db/repository";
import { isLocalAdminServerPageAllowed } from "@/lib/local-only";

export const dynamic = "force-dynamic";

export default async function HomePage() {
  const categories = listCategories();
  const stats = getPracticeStats();
  const guideLessons = listGuideLessons();
  const guideTips = listGuideTips();
  const showLocalAdmin = await isLocalAdminServerPageAllowed();

  return (
    <LessonsGuideShell
      initialLessons={guideLessons}
      initialTips={guideTips}
      stats={stats}
      categoryCount={categories.length}
      showLocalAdmin={showLocalAdmin}
    />
  );
}
