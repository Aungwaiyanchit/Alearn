import { LessonsGuideShell } from "@/components/guide/LessonsGuideShell";
import { getPracticeStats, listCategories } from "@/db/repository";
import { isLocalAdminServerPageAllowed } from "@/lib/local-only";

export const dynamic = "force-dynamic";

export default async function HomePage() {
  const categories = listCategories();
  const stats = getPracticeStats();
  const showLocalAdmin = await isLocalAdminServerPageAllowed();

  return (
    <LessonsGuideShell
      stats={stats}
      categoryCount={categories.length}
      showLocalAdmin={showLocalAdmin}
    />
  );
}
