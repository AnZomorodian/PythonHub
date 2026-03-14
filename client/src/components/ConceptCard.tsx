import * as React from "react";
import { Badge } from "@/components/ui/badge";
import { ChevronRight, Text, FlaskConical } from "lucide-react";
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
  const difficultyColor = {
    beginner: "bg-green-500/10 text-green-700 border-green-200",
    intermediate: "bg-yellow-500/10 text-yellow-700 border-yellow-200",
    advanced: "bg-red-500/10 text-red-700 border-red-200",
  }[concept.difficulty || "beginner"];

  const isProject = concept.category === "projects";

  return (
    <button
      type="button"
      onClick={onSelect}
      data-testid={`concept-card-${concept.id}`}
      className={cn(
        "group w-full rounded-xl border border-border bg-card px-3 py-3 text-left shadow-sm transition-all duration-200 ease-out focus-ring",
        "hover:shadow-md",
        selected && "ring-2 ring-ring/25 shadow-md",
        isProject && "border-pink-200/60 dark:border-pink-900/40",
      )}
    >
      <div className="flex items-start justify-between gap-3">
        <div className="min-w-0">
          <div className="flex items-center gap-2">
            <span
              className={cn(
                "grid h-8 w-8 shrink-0 place-items-center rounded-lg border border-border bg-muted text-foreground transition-transform duration-200 ease-out",
                selected
                  ? isProject
                    ? "bg-pink-500 text-white border-pink-500"
                    : "bg-foreground text-background"
                  : "group-hover:-translate-y-0.5",
                isProject && !selected && "bg-pink-500/10 text-pink-600 border-pink-200",
              )}
              aria-hidden="true"
            >
              {isProject ? <FlaskConical className="h-4 w-4" /> : <Text className="h-4 w-4" />}
            </span>
            <div className="min-w-0">
              <div className="truncate text-sm font-semibold">{concept.title}</div>
              <div className="mt-0.5 line-clamp-1 text-xs text-muted-foreground">
                {concept.description}
              </div>
            </div>
          </div>

          <div className="mt-3 flex flex-wrap items-center gap-2 text-xs">
            <Badge className={`${difficultyColor} border text-xs`}>
              {concept.difficulty || "beginner"}
            </Badge>
            {isProject ? (
              <Badge className="text-xs bg-pink-500/10 text-pink-600 border border-pink-200">
                mini project
              </Badge>
            ) : concept.category ? (
              <Badge variant="outline" className="text-xs">
                {concept.category}
              </Badge>
            ) : null}
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
