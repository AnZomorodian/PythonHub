import * as React from "react";
import { BookOpen, Search } from "lucide-react";
import { Button } from "@/components/ui/button";

export function EmptyState({
  title,
  description,
  actionLabel,
  onAction,
  icon = "book",
}: {
  title: string;
  description: string;
  actionLabel?: string;
  onAction?: () => void;
  icon?: "book" | "search";
}) {
  const Icon = icon === "search" ? Search : BookOpen;

  return (
    <div className="rounded-2xl border border-border bg-card p-8 shadow-sm">
      <div className="flex flex-col items-start gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-start gap-3">
          <div className="grid h-11 w-11 place-items-center rounded-2xl bg-muted text-foreground shadow-sm ring-1 ring-border/40">
            <Icon className="h-5 w-5" />
          </div>
          <div>
            <div className="text-base font-semibold">{title}</div>
            <div className="mt-1 text-sm text-muted-foreground">{description}</div>
          </div>
        </div>

        {actionLabel && onAction ? (
          <Button variant="default" onClick={onAction}>
            {actionLabel}
          </Button>
        ) : null}
      </div>
    </div>
  );
}
