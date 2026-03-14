import * as React from "react";
import { useLocation } from "wouter";
import {
  ChevronRight,
  Copy,
  Check,
  BookOpen,
  Zap,
  FlaskConical,
  Search,
  X,
  ArrowRight,
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
import { Input } from "@/components/ui/input";

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

const DIFF_TABS = [
  { id: null, label: "All" },
  { id: "beginner", label: "Beginner" },
  { id: "intermediate", label: "Intermediate" },
  { id: "advanced", label: "Advanced" },
  { id: "__projects__", label: "Projects", icon: FlaskConical },
];

export default function Learn() {
  const [location, navigate] = useLocation();
  const [activeTab, setActiveTab] = React.useState<string | null>(null);
  const [categoryFilter, setCategoryFilter] = React.useState<string | null>(null);
  const [search, setSearch] = React.useState("");
  const [copiedLink, setCopiedLink] = React.useState(false);
  const selectedFromUrl = parseSelectedFromUrl(location);
  const { data: concepts, isLoading, error } = useConcepts();

  const { data: storedSelected } = useSelectedConceptId();
  const remember = useRememberSelectedConcept();

  const filteredConcepts = React.useMemo(() => {
    if (!concepts) return [];
    return concepts.filter((c) => {
      const isProjects = activeTab === "__projects__";
      const diffMatch = !activeTab || isProjects ? true : c.difficulty === activeTab;
      const projMatch = isProjects ? c.category === "projects" : true;
      const catMatch = !categoryFilter || c.category === categoryFilter;
      const sq = search.trim().toLowerCase();
      const searchMatch =
        !sq ||
        `${c.title} ${c.description} ${c.codeSnippet} ${(c.tags ?? []).join(" ")}`.toLowerCase().includes(sq);
      return diffMatch && projMatch && catMatch && searchMatch;
    });
  }, [concepts, activeTab, categoryFilter, search]);

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
      if (c.category && c.category !== "projects") cats.add(c.category);
    });
    return Array.from(cats).sort();
  }, [concepts]);

  const projectCount = React.useMemo(() => concepts?.filter(c => c.category === "projects").length ?? 0, [concepts]);

  const list = (filteredConcepts ?? []) as Concept[];

  const hasActiveFilters = activeTab !== null || categoryFilter !== null || search.trim().length > 0;

  const clearFilters = () => {
    setActiveTab(null);
    setCategoryFilter(null);
    setSearch("");
  };

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

  if (list.length === 0 && hasActiveFilters) {
    return (
      <AppShell>
        <EmptyState
          title="No concepts match your filters"
          description="Try adjusting the difficulty, category, or search query."
          actionLabel="Clear all filters"
          onAction={clearFilters}
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
            {/* Top control bar */}
            <Card className="glass rounded-2xl p-4 md:p-5">
              <div className="space-y-3">
                <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
                  <div className="min-w-0">
                    <div className="text-sm font-semibold">
                      Study{" "}
                      {list.length > 0 && (
                        <span className="text-xs font-normal text-muted-foreground">
                          ({currentIndex + 1} of {list.length})
                        </span>
                      )}
                    </div>
                    <div className="mt-1 text-sm text-muted-foreground">
                      Choose a lesson on the left. On mobile, use the sidebar toggle.
                    </div>
                  </div>

                  <div className="flex flex-wrap items-center gap-2">
                    <Button
                      data-testid="button-surprise-me"
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
                      data-testid="button-copy-link"
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

                {/* Tab filter row */}
                <div className="flex flex-wrap gap-2 pt-2 border-t border-border/40">
                  <div className="flex flex-wrap gap-1.5">
                    {DIFF_TABS.map((tab) => (
                      <Badge
                        key={tab.id ?? "all"}
                        data-testid={`filter-tab-${tab.id ?? "all"}`}
                        variant={activeTab === tab.id ? "default" : "outline"}
                        className={`cursor-pointer text-xs flex items-center gap-1 ${
                          tab.id === "__projects__" && activeTab !== tab.id
                            ? "border-pink-200 text-pink-600 bg-pink-500/10"
                            : ""
                        }`}
                        onClick={() => setActiveTab(activeTab === tab.id ? null : tab.id)}
                      >
                        {tab.icon && <tab.icon className="h-3 w-3" />}
                        {tab.label}
                        {tab.id === "__projects__" && (
                          <span className="ml-0.5 rounded-full bg-pink-500/20 px-1 text-[10px] font-bold text-pink-700">
                            {projectCount}
                          </span>
                        )}
                      </Badge>
                    ))}
                  </div>

                  {/* Category sub-filters (hidden when projects tab active) */}
                  {activeTab !== "__projects__" && categories.length > 0 && (
                    <div className="flex flex-wrap gap-1.5">
                      {categories.map((cat) => (
                        <Badge
                          key={cat}
                          data-testid={`filter-category-${cat}`}
                          variant={categoryFilter === cat ? "default" : "secondary"}
                          className="cursor-pointer text-xs"
                          onClick={() => setCategoryFilter(categoryFilter === cat ? null : cat)}
                        >
                          {cat}
                        </Badge>
                      ))}
                    </div>
                  )}

                  {hasActiveFilters && (
                    <Button
                      data-testid="button-clear-filters"
                      variant="ghost"
                      size="sm"
                      className="h-6 text-xs gap-1"
                      onClick={clearFilters}
                    >
                      <X className="h-3 w-3" />
                      Clear
                    </Button>
                  )}
                </div>

                {/* Search bar */}
                <div className="relative">
                  <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                  <Input
                    data-testid="input-search-concepts"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    placeholder="Search concepts, code, tags…"
                    className="pl-9 h-9 text-sm"
                  />
                  {search && (
                    <button
                      onClick={() => setSearch("")}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                    >
                      <X className="h-4 w-4" />
                    </button>
                  )}
                </div>
              </div>
            </Card>

            {/* Projects banner — shown when projects tab is active */}
            {activeTab === "__projects__" && (
              <Card className="glass rounded-2xl p-4 border-pink-200/60 bg-pink-500/5">
                <div className="flex items-center gap-3">
                  <div className="grid h-9 w-9 place-items-center rounded-xl bg-pink-500 text-white shadow-sm">
                    <FlaskConical className="h-4.5 w-4.5" />
                  </div>
                  <div>
                    <div className="text-sm font-semibold text-pink-700 dark:text-pink-400">
                      Mini Projects — apply everything you've learned
                    </div>
                    <div className="text-xs text-muted-foreground mt-0.5">
                      {projectCount} real Python programs, each building on core concepts.
                    </div>
                  </div>
                </div>
              </Card>
            )}

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
                    <div className="flex items-center justify-between gap-4">
                      <div className="min-w-0">
                        <div className="text-xs font-semibold text-muted-foreground mb-1 flex items-center gap-1">
                          {nextConcept.category === "projects" ? (
                            <>
                              <FlaskConical className="h-3 w-3 text-pink-500" />
                              Next: Mini Project
                            </>
                          ) : (
                            "Next concept"
                          )}
                        </div>
                        <div className="font-semibold truncate">{nextConcept.title}</div>
                        <div className="text-xs text-muted-foreground mt-1 line-clamp-1">
                          {nextConcept.description}
                        </div>
                      </div>
                      <Button
                        data-testid="button-next-concept"
                        variant={nextConcept.category === "projects" ? "default" : "outline"}
                        size="sm"
                        onClick={() => onSelectId(nextConcept.id)}
                        className="shrink-0 gap-1"
                      >
                        <ArrowRight className="h-4 w-4" />
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
