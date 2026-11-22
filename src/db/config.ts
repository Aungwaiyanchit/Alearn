import path from "node:path";

export function resolveDatabasePath(): string {
  const customPath = process.env.DATABASE_PATH?.trim();
  if (customPath) {
    return customPath;
  }

  // Vercel serverless functions have a read-only project filesystem; only /tmp is writable.
  if (process.env.VERCEL === "1") {
    return path.join("/tmp", "alearn.sqlite");
  }

  return path.join(process.cwd(), "data", "alearn.sqlite");
}
