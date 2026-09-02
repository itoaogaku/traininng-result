import type { PracticeTeam } from "@/lib/types";

const STYLES: Record<PracticeTeam, { label: string; className: string } | null> = {
  male: {
    label: "男子",
    className:
      "bg-sky-50 text-sky-700 ring-sky-600/20 dark:bg-sky-500/10 dark:text-sky-400 dark:ring-sky-500/30",
  },
  female: {
    label: "女子",
    className:
      "bg-pink-50 text-pink-700 ring-pink-600/20 dark:bg-pink-500/10 dark:text-pink-400 dark:ring-pink-500/30",
  },
  // フォルダ名から判定できない場合はバッジ自体を表示しない
  unknown: null,
};

export default function TeamBadge({ team }: { team: PracticeTeam }) {
  const style = STYLES[team];
  if (!style) return null;

  return (
    <span
      className={`inline-flex shrink-0 items-center rounded-full px-2.5 py-0.5 text-xs font-medium ring-1 ring-inset ${style.className}`}
    >
      {style.label}
    </span>
  );
}
