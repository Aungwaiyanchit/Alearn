import { afterEach, describe, expect, test } from "bun:test";
import path from "node:path";
import { resolveDatabasePath } from "@/db/config";

describe("database path resolution", () => {
  const originalVercel = process.env.VERCEL;
  const originalDatabasePath = process.env.DATABASE_PATH;

  afterEach(() => {
    if (originalVercel === undefined) {
      delete process.env.VERCEL;
    } else {
      process.env.VERCEL = originalVercel;
    }

    if (originalDatabasePath === undefined) {
      delete process.env.DATABASE_PATH;
    } else {
      process.env.DATABASE_PATH = originalDatabasePath;
    }
  });

  test("uses local data directory by default", () => {
    delete process.env.VERCEL;
    delete process.env.DATABASE_PATH;

    expect(resolveDatabasePath()).toBe(
      path.join(process.cwd(), "data", "alearn.sqlite"),
    );
  });

  test("uses writable /tmp path when running on Vercel", () => {
    process.env.VERCEL = "1";
    delete process.env.DATABASE_PATH;

    expect(resolveDatabasePath()).toBe(path.join("/tmp", "alearn.sqlite"));
  });

  test("prefers explicit DATABASE_PATH environment variable", () => {
    process.env.VERCEL = "1";
    process.env.DATABASE_PATH = "/custom/path/practice.sqlite";

    expect(resolveDatabasePath()).toBe("/custom/path/practice.sqlite");
  });
});
