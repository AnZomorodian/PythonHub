import * as React from "react";
import { Link, useLocation } from "wouter";
import { BookOpen, Search, Sparkles } from "lucide-react";
import type { Concept } from "@shared/schema";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { ConceptCard } from "@/components/ConceptCard";
import { EmptyState } from "@/components/EmptyState";
import { cn } from "@/lib/utils";
import { SidebarContent, SidebarGroup, SidebarGroupContent, SidebarGroupLabel } from "@/components/ui/sidebar";

function normalize(s: string) {
  return s.trim().toLowerCase();
}

export function ConceptSidebar({
  concepts,
  selectedId,
  onSelectId,
}: {
  concepts: Concept[];
  selectedId?: string | null;
  onSelectId: (id: string) => void;
}) {
  const [q, setQ] = React.useState("");
  const [location] = useLocation();

  const filtered = React.useMemo(() => {
    const nq = normalize(q);
    if (!nq) return concepts;
    return concepts.filter((c) => {
      const hay = `${c.title} ${c.description} ${c.codeSnippet}`.toLowerCase();
      return hay.includes(nq);
    });
  }, [concepts, q]);

  return (
    <SidebarContent className="p-0">
      <div className="px-3 pt-3">
        <div className="rounded-2xl border border-sidebar-border bg-sidebar/60 p-3 shadow-sm backdrop-blur supports-[backdrop-filter]:bg-sidebar/50">
          <div className="flex items-center gap-2">
            <span className="grid h-9 w-9 place-items-center rounded-xl bg-foreground text-background shadow-sm ring-1 ring-border/30">
              <Sparkles className="h-4 w-4" />
            </span>
            <div className="min-w-0">
              <div className="truncate text-sm font-semibold">Concepts</div>
              <div className="text-xs text-muted-foreground">
                Tiny lessons, big clarity.
              </div>
            </div>
          </div>

          <div className="mt-3 flex items-center gap-2">
            <div className="relative flex-1">
              <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                value={q}
                onChange={(e) => setQ(e.target.value)}
                placeholder="Search: print, variables, if..."
                className="pl-9"
              />
            </div>
          </div>

          <div className="mt-3 flex flex-wrap items-center gap-2 text-xs text-muted-foreground">
            <span className="inline-flex items-center gap-1 rounded-full border border-border bg-background px-2 py-1">
              <BookOpen className="h-3.5 w-3.5" />
              {concepts.length} lessons
            </span>

            <Link
              href="/learn"
              className={cn(
                "rounded-full border border-border bg-background px-2 py-1 focus-ring",
                location.startsWith("/learn") ? "text-foreground" : "text-muted-foreground",
              )}
            >
              Study view
            </Link>
          </div>
        </div>
      </div>

      <SidebarGroup className="px-3 pb-3 pt-4" id="concepts-panel">
        <SidebarGroupLabel className="px-1 text-xs text-muted-foreground">
          Browse
        </SidebarGroupLabel>
        <SidebarGroupContent>
          <ScrollArea className="h-[calc(100vh-220px)] pr-2">
            <div className="grid gap-2">
              {filtered.length === 0 ? (
                <EmptyState
                  icon="search"
                  title="No matches"
                  description="Try a simpler keyword like “print” or “list”."
                  actionLabel="Clear search"
                  onAction={() => setQ("")}
                />
              ) : (
                filtered.map((c) => (
                  <ConceptCard
                    key={c.id}
                    concept={c}
                    selected={c.id === selectedId}
                    onSelect={() => onSelectId(c.id)}
                  />
                ))
              )}
            </div>
            <div className="h-4" />
          </ScrollArea>
        </SidebarGroupContent>
      </SidebarGroup>
    </SidebarContent>
  );
}
