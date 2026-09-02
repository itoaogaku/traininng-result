import { CheckCircle2, HelpCircle, XCircle, type LucideIcon } from "lucide-react";
import type { PracticeStatus } from "@/lib/types";

const STYLES: Record<
  PracticeStatus,
  { label: string; className: string; Icon: LucideIcon }
> = {
  pass: {
    label: "合格",
    className:
      "bg-emerald-50 text-emerald-700 ring-emerald-600/20 dark:bg-emerald-500/10 dark:text-emerald-400 dark:ring-emerald-500/30",
    Icon: CheckCircle2,
  },
  fail: {
    label: "不合格",
    className:
      "bg-rose-50 text-rose-700 ring-rose-600/20 dark:bg-rose-500/10 dark:text-rose-400 dark:ring-rose-500/30",
    Icon: XCircle,
  },
  unclassified: {
    label: "未分類",
    className:
      "bg-zinc-100 text-zinc-600 ring-zinc-500/20 dark:bg-zinc-500/10 dark:text-zinc-400 dark:ring-zinc-500/30",
    Icon: HelpCircle,
  },
};

export default function StatusBadge({ status }: { status: PracticeStatus }) {
  const { label, className, Icon } = STYLES[status];
  return (
    <span
      className={`inline-flex shrink-0 items-center gap-1 rounded-full px-2.5 py-0.5 text-xs font-medium ring-1 ring-inset ${className}`}
    >
      <Icon className="h-3.5 w-3.5" />
      {label}
    </span>
  );
}
