import { NextResponse } from "next/server";
import {
  createGuideLesson,
  listGuideLessons,
  listGuideTips,
} from "@/db/guide-repository";
import { parseGuideLessonMutationBody } from "@/lib/guide-validation";
import { guardLocalAdminApiRequest } from "@/lib/local-only";

export async function GET(request: Request) {
  const blocked = guardLocalAdminApiRequest(request);
  if (blocked) {
    return blocked;
  }

  return NextResponse.json({
    guideLessons: listGuideLessons(),
    guideTips: listGuideTips(),
  });
}

export async function POST(request: Request) {
  const blocked = guardLocalAdminApiRequest(request);
  if (blocked) {
    return blocked;
  }

  try {
    const body: unknown = await request.json();
    const parsed = parseGuideLessonMutationBody(body);
    if ("error" in parsed) {
      return NextResponse.json({ error: parsed.error }, { status: 400 });
    }

    const lesson = createGuideLesson(parsed.data);
    return NextResponse.json(
      {
        lesson,
        guideLessons: listGuideLessons(),
      },
      { status: 201 },
    );
  } catch (error) {
    console.error("Admin failed to create guide lesson:", error);
    return NextResponse.json(
      { error: "Failed to create guide lesson" },
      { status: 500 },
    );
  }
}
