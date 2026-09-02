"use client";

import { useCallback, useEffect, useState } from "react";
import { AlertTriangle, Inbox, Loader2 } from "lucide-react";
import type {
  PracticeResult,
  PracticeStatus,
  SortField,
  SortOrder,
} from "@/lib/types";
import FilterBar from "@/components/FilterBar";
import ResultCard from "@/components/ResultCard";

export default function ResultsList() {
  const [results, setResults] = useState<PracticeResult[] | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const [query, setQuery] = useState("");
  const [status, setStatus] = useState<PracticeStatus | "all">("all");
  const [sort, setSort] = useState<SortField>("date");
  const [order, setOrder] = useState<SortOrder>("desc");

  const fetchResults = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
      const params = new URLSearchParams({ sort, order });
      if (query) params.set("q", query);
      if (status !== "all") params.set("status", status);

      const res = await fetch(`/api/dropbox/list?${params.toString()}`, {
        cache: "no-store",
      });
      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error ?? "練習結果の取得に失敗しました");
      }

      setResults(data.results as PracticeResult[]);
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "練習結果の取得に失敗しました"
      );
      setResults(null);
    } finally {
      setIsLoading(false);
    }
  }, [query, status, sort, order]);

  useEffect(() => {
    const timer = setTimeout(fetchResults, 250);
    return () => clearTimeout(timer);
  }, [fetchResults]);

  return (
    <div className="flex flex-col gap-4">
      <FilterBar
        query={query}
        onQueryChange={setQuery}
        status={status}
        onStatusChange={setStatus}
        sort={sort}
        onSortChange={setSort}
        order={order}
        onOrderToggle={() => setOrder((o) => (o === "asc" ? "desc" : "asc"))}
        onRefresh={fetchResults}
        isLoading={isLoading}
      />

      {error && (
        <div className="flex items-start gap-2 rounded-md border border-rose-200 bg-rose-50 px-4 py-3 text-sm text-rose-700 dark:border-rose-500/30 dark:bg-rose-500/10 dark:text-rose-400">
          <AlertTriangle className="mt-0.5 h-4 w-4 shrink-0" />
          <span>{error}</span>
        </div>
      )}

      {!error && isLoading && !results && (
        <div className="flex items-center justify-center gap-2 py-16 text-zinc-400">
          <Loader2 className="h-5 w-5 animate-spin" />
          読み込み中...
        </div>
      )}

      {!error && results && results.length === 0 && (
        <div className="flex flex-col items-center gap-2 py-16 text-zinc-400">
          <Inbox className="h-8 w-8" />
          <p className="text-sm">該当する練習結果が見つかりませんでした。</p>
        </div>
      )}

      {results && results.length > 0 && (
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {results.map((result) => (
            <ResultCard key={result.id} result={result} />
          ))}
        </div>
      )}
    </div>
  );
}
