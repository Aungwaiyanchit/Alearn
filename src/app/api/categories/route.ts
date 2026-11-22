import { NextResponse } from "next/server";
import {
  createRandomCategory,
  getPracticeStats,
  listCategories,
} from "@/db/repository";
import type { Difficulty } from "@/types/practice";

const ALLOWED_DIFFICULTIES = new Set<Difficulty | "all">([
  "all",
  "beginner",
  "intermediate",
  "advanced",
]);

export async function GET() {
  try {
    const categories = listCategories();
    const stats = getPracticeStats();
    return NextResponse.json({ categories, stats });
  } catch (error) {
    console.error("Failed to fetch categories:", error);
    return NextResponse.json(
      { error: "Failed to load categories" },
      { status: 500 },
    );
  }
}

export async function POST(request: Request) {
  try {
    const body = (await request.json()) as {
      name?: unknown;
      count?: unknown;
      difficulty?: unknown;
    };

    const name = typeof body.name === "string" ? body.name : "";
    const count = typeof body.count === "number" ? body.count : 6;
    const rawDifficulty =
      typeof body.difficulty === "string" ? body.difficulty : "all";
    const difficulty: Difficulty | "all" = ALLOWED_DIFFICULTIES.has(
      rawDifficulty as Difficulty | "all",
    )
      ? (rawDifficulty as Difficulty | "all")
      : "all";

    const category = createRandomCategory({ name, count, difficulty });
    const categories = listCategories();

    return NextResponse.json({ category, categories }, { status: 201 });
  } catch (error) {
    console.error("Failed to create random category:", error);
    return NextResponse.json(
      { error: "Failed to create random category" },
      { status: 500 },
    );
  }
}
