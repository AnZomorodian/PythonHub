import * as React from "react";
import { useLocation } from "wouter";
import {
  ChevronRight,
  Copy,
  Check,
  BookOpen,
  Zap,
} from "lucide-react";
import { SidebarProvider } from "@/components/ui/sidebar";
import { AppShell } from "@/components/AppShell";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { AppSidebar } from "@/components/AppSidebar";
import { ConceptDetail } from "@/components/ConceptDetail";
import { useConcepts, useConcept, useSelectedConceptId, useRememberSelectedConcept } from "@/hooks/use-concepts";
import type { Concept } from "@shared/schema";
import { Badge } from "@/components/ui/badge";

const style = { "--sidebar-width": "320px" } as React.CSSProperties;

function parseSelectedFromUrl(location: string): string | null {
  const match = location.match(/^\/learn\/([^/]+)$/);
  return match?.[1] ?? null;
}

function EmptyState({
  title,
  description,
  actionLabel,
  onAction,
}: {
  title: string;
  description: string;
  actionLabel?: string;
  onAction?: () => void;
}) {
  return (
    <Card className="glass rounded-2xl p-8 text-center">
      <BookOpen className="mx-auto h-12 w-12 text-muted-foreground/50 mb-3" />
      <div className="text-lg font-semibold">{title}</div>
      <div className="mt-2 text-sm text-muted-foreground">{description}</div>
      {actionLabel && onAction && (
        <Button
          variant="outline"
          className="mt-4"
          onClick={onAction}
        >
          {actionLabel}
        </Button>
      )}
    </Card>
  );
}

function LoadingState() {
  return (
    <Card className="glass rounded-2xl p-8">
      <div className="space-y-3 animate-pulse">
        <div className="h-8 bg-muted rounded w-1/3" />
        <div className="h-4 bg-muted rounded w-2/3" />
        <div className="h-40 bg-muted rounded mt-6" />
      </div>
    </Card>
  );
}

export default function Learn() {
  const [location, navigate] = useLocation();
  const [difficultyFilter, setDifficultyFilter] = React.useState<string | null>(null);
  const [categoryFilter, setCategoryFilter] = React.useState<string | null>(null);
  const [copiedLink, setCopiedLink] = React.useState(false);
  const selectedFromUrl = parseSelectedFromUrl(location);
  const { data: concepts, isLoading, error } = useConcepts();

  const { data: storedSelected } = useSelectedConceptId();
  const remember = useRememberSelectedConcept();

  const filteredConcepts = React.useMemo(() => {
    if (!concepts) return [];
    return concepts.filter((c) => {
      const diffMatch = !difficultyFilter || c.difficulty === difficultyFilter;
      const catMatch = !categoryFilter || c.category === categoryFilter;
      return diffMatch && catMatch;
    });
  }, [concepts, difficultyFilter, categoryFilter]);

  const effectiveSelectedId =
    selectedFromUrl || storedSelected || (filteredConcepts?.[0]?.id ?? null);

  const { data: selectedConcept, isLoading: isLoadingConcept } = useConcept(effectiveSelectedId);

  React.useEffect(() => {
    if (effectiveSelectedId) {
      localStorage.setItem("selectedConceptId", effectiveSelectedId);
    }
  }, [effectiveSelectedId]);

  React.useEffect(() => {
    if (selectedFromUrl && effectiveSelectedId !== selectedFromUrl) {
      navigate(`/learn/${effectiveSelectedId}`);
    }
  }, [selectedFromUrl, effectiveSelectedId, navigate]);

  const onSelectId = (id: string) => {
    navigate(`/learn/${id}`);
  };

  const currentIndex = filteredConcepts.findIndex(c => c.id === effectiveSelectedId);
  const nextConcept = currentIndex !== -1 && currentIndex < filteredConcepts.length - 1
    ? filteredConcepts[currentIndex + 1]
    : null;

  const categories = React.useMemo(() => {
    if (!concepts) return [];
    const cats = new Set<string>();
    concepts.forEach(c => {
      if (c.category) cats.add(c.category);
    });
    return Array.from(cats).sort();
  }, [concepts]);

  const list = (filteredConcepts ?? []) as Concept[];

  if (concepts && concepts.length === 0) {
    return (
      <AppShell>
        <EmptyState
          title="No concepts yet"
          description="Add a few concepts on the backend, then refresh this page."
          actionLabel="Refresh"
          onAction={() => window.location.reload()}
        />
      </AppShell>
    );
  }

  if (list.length === 0 && (difficultyFilter || categoryFilter)) {
    return (
      <AppShell>
        <EmptyState
          title="No concepts match your filters"
          description="Try adjusting the difficulty or category filter."
          actionLabel="Clear filters"
          onAction={() => {
            setDifficultyFilter(null);
            setCategoryFilter(null);
          }}
        />
      </AppShell>
    );
  }

  return (
    <AppShell>
      <SidebarProvider style={style}>
        <div className="flex h-[calc(100vh-84px)] w-full gap-4">
          <div className="hidden md:block">
            <AppSidebar concepts={list} selectedId={effectiveSelectedId} onSelectId={onSelectId} />
          </div>

          <div className="flex min-w-0 flex-1 flex-col gap-4">
            <Card className="glass rounded-2xl p-4 md:p-5">
              <div className="space-y-3">
                <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
                  <div className="min-w-0">
                    <div className="text-sm font-semibold">
                      Study {list.length > 0 && <span className="text-xs font-normal text-muted-foreground">({currentIndex + 1} of {list.length})</span>}
                    </div>
                    <div className="mt-1 text-sm text-muted-foreground">
                      Choose a lesson on the left. On mobile, use the sidebar toggle.
                    </div>
                  </div>

                  <div className="flex flex-wrap items-center gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => {
                        const next = list[Math.floor(Math.random() * list.length)];
                        if (!next) return;
                        onSelectId(next.id);
                      }}
                    >
                      <Zap className="h-4 w-4 mr-1.5" />
                      Surprise me
                    </Button>

                    <Button
                      variant="secondary"
                      size="sm"
                      onClick={async () => {
                        const url = window.location.origin + `/learn/${effectiveSelectedId ?? ""}`;
                        try {
                          await navigator.clipboard.writeText(url);
                          setCopiedLink(true);
                          setTimeout(() => setCopiedLink(false), 2000);
                        } catch {
                          // Fallback
                        }
                      }}
                    >
                      {copiedLink ? (
                        <>
                          <Check className="h-4 w-4 mr-1.5" />
                          Copied
                        </>
                      ) : (
                        <>
                          <Copy className="h-4 w-4 mr-1.5" />
                          Copy link
                        </>
                      )}
                    </Button>
                  </div>
                </div>

                {(concepts && concepts.length > 5) && (
                  <div className="flex flex-wrap gap-2 pt-2 border-t border-border/40">
                    <div className="text-xs font-semibold text-muted-foreground">Filter by:</div>
                    <div className="flex flex-wrap gap-1.5">
                      {["beginner", "intermediate", "advanced"].map((d) => (
                        <Badge
                          key={d}
                          variant={difficultyFilter === d ? "default" : "outline"}
                          className="cursor-pointer text-xs"
                          onClick={() => setDifficultyFilter(difficultyFilter === d ? null : d)}
                        >
                          {d}
                        </Badge>
                      ))}
                    </div>
                    {categories.length > 0 && (
                      <div className="flex flex-wrap gap-1.5">
                        {categories.map((cat) => (
                          <Badge
                            key={cat}
                            variant={categoryFilter === cat ? "default" : "secondary"}
                            className="cursor-pointer text-xs"
                            onClick={() => setCategoryFilter(categoryFilter === cat ? null : cat)}
                          >
                            {cat}
                          </Badge>
                        ))}
                      </div>
                    )}
                    {(difficultyFilter || categoryFilter) && (
                      <Button
                        variant="ghost"
                        size="sm"
                        className="h-6 text-xs"
                        onClick={() => {
                          setDifficultyFilter(null);
                          setCategoryFilter(null);
                        }}
                      >
                        Clear
                      </Button>
                    )}
                  </div>
                )}
              </div>
            </Card>

            {!effectiveSelectedId ? (
              <EmptyState
                title="Pick a concept"
                description="Choose a lesson from the sidebar to begin."
              />
            ) : isLoadingConcept ? (
              <LoadingState />
            ) : !selectedConcept ? (
              <EmptyState
                title="Concept not found"
                description="This concept id doesn't exist (or was removed)."
                actionLabel="Go to first concept"
                onAction={() => onSelectId(list[0]!.id)}
              />
            ) : (
              <>
                <ConceptDetail concept={selectedConcept} />

                {nextConcept && (
                  <Card className="glass rounded-2xl p-4 md:p-5 border-border/60">
                    <div className="flex items-center justify-between">
                      <div>
                        <div className="text-xs font-semibold text-muted-foreground mb-1">Next concept</div>
                        <div className="font-semibold">{nextConcept.title}</div>
                        <div className="text-xs text-muted-foreground mt-1">{nextConcept.description}</div>
                      </div>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => onSelectId(nextConcept.id)}
                        className="shrink-0"
                      >
                        <ChevronRight className="h-4 w-4" />
                      </Button>
                    </div>
                  </Card>
                )}
              </>
            )}
          </div>
        </div>
      </SidebarProvider>
    </AppShell>
  );
}
