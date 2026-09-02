import { NextRequest, NextResponse } from "next/server";
import { listPracticeResults } from "@/lib/practice-results";
import type { PracticeStatus, SortField, SortOrder } from "@/lib/types";

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const q = searchParams.get("q")?.trim().toLowerCase() ?? "";
  const statusParam = searchParams.get("status");
  const sort: SortField = searchParams.get("sort") === "name" ? "name" : "date";
  const order: SortOrder = searchParams.get("order") === "asc" ? "asc" : "desc";

  try {
    let results = await listPracticeResults();

    if (q) {
      results = results.filter(
        (result) =>
          result.name.toLowerCase().includes(q) ||
          result.title.toLowerCase().includes(q)
      );
    }

    if (statusParam && statusParam !== "all") {
      const status = statusParam as PracticeStatus;
      results = results.filter((result) => result.status === status);
    }

    const dir = order === "asc" ? 1 : -1;
    results = [...results].sort((a, b) => {
      if (sort === "name") {
        return a.name.localeCompare(b.name, "ja") * dir;
      }
      return (
        (new Date(a.practiceDate).getTime() -
          new Date(b.practiceDate).getTime()) *
        dir
      );
    });

    return NextResponse.json({ results });
  } catch (error) {
    console.error("Failed to list Dropbox practice results:", error);
    const message =
      error instanceof Error ? error.message : "練習結果の取得に失敗しました";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
