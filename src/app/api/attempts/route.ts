import { NextResponse } from "next/server";
import {
  getPracticeStats,
  listCategories,
  recordAttempt,
} from "@/db/repository";

export async function POST(request: Request) {
  try {
    const body = (await request.json()) as {
      questionId?: unknown;
      userAnswer?: unknown;
      isCorrect?: unknown;
      accuracy?: unknown;
    };

    if (
      typeof body.questionId !== "string" ||
      typeof body.userAnswer !== "string" ||
      typeof body.isCorrect !== "boolean" ||
      typeof body.accuracy !== "number"
    ) {
      return NextResponse.json(
        { error: "Invalid attempt payload" },
        { status: 400 },
      );
    }

    recordAttempt({
      questionId: body.questionId,
      userAnswer: body.userAnswer,
      isCorrect: body.isCorrect,
      accuracy: Math.min(Math.max(Math.round(body.accuracy), 0), 100),
    });

    const stats = getPracticeStats();
    const categories = listCategories();

    return NextResponse.json({ stats, categories });
  } catch (error) {
    console.error("Failed to record practice attempt:", error);
    return NextResponse.json(
      { error: "Failed to record attempt" },
      { status: 500 },
    );
  }
}
