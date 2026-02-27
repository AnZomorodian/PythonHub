import * as React from "react";
import { ChevronRight, Terminal, Text } from "lucide-react";
import { cn } from "@/lib/utils";
import type { Concept } from "@shared/schema";

export function ConceptCard({
  concept,
  selected,
  onSelect,
}: {
  concept: Concept;
  selected: boolean;
  onSelect: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onSelect}
      className={cn(
        "group w-full rounded-xl border border-border bg-card px-3 py-3 text-left shadow-sm transition-all duration-200 ease-out focus-ring",
        "hover:shadow-md",
        selected && "ring-2 ring-ring/25 shadow-md",
      )}
    >
      <div className="flex items-start justify-between gap-3">
        <div className="min-w-0">
          <div className="flex items-center gap-2">
            <span
              className={cn(
                "grid h-8 w-8 shrink-0 place-items-center rounded-lg border border-border bg-muted text-foreground transition-transform duration-200 ease-out",
                selected ? "bg-foreground text-background" : "group-hover:-translate-y-0.5",
              )}
              aria-hidden="true"
            >
              <Text className="h-4 w-4" />
            </span>
            <div className="min-w-0">
              <div className="truncate text-sm font-semibold">{concept.title}</div>
              <div className="mt-0.5 line-clamp-1 text-xs text-muted-foreground">
                {concept.description}
              </div>
            </div>
          </div>

          <div className="mt-3 flex flex-wrap items-center gap-2 text-xs text-muted-foreground">
            <span className="inline-flex items-center gap-1 rounded-full border border-border bg-background px-2 py-1">
              <Terminal className="h-3.5 w-3.5" />
              Code + output
            </span>
            <span className="hidden sm:inline-flex items-center gap-1 rounded-full border border-border bg-background px-2 py-1">
              Click to study
              <ChevronRight className="h-3.5 w-3.5 opacity-60" />
            </span>
          </div>
        </div>

        <ChevronRight
          className={cn(
            "mt-1 h-5 w-5 shrink-0 text-muted-foreground transition-transform duration-200 ease-out",
            "group-hover:translate-x-0.5",
            selected && "text-foreground",
          )}
          aria-hidden="true"
        />
      </div>
    </button>
  );
}
