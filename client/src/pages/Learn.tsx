import * as React from "react";
import { useLocation } from "wouter";
import { z } from "zod";
import { AppShell } from "@/components/AppShell";
import { AppSidebar } from "@/components/AppSidebar";
import { ConceptDetail } from "@/components/ConceptDetail";
import { EmptyState } from "@/components/EmptyState";
import { LoadingState } from "@/components/LoadingState";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { SidebarProvider } from "@/components/ui/sidebar";
import { useConcept, useConcepts, useRememberSelectedConcept, useSelectedConceptId } from "@/hooks/use-concepts";
import type { Concept } from "@shared/schema";

function parseSelectedFromUrl(pathname: string): string | null {
  // /learn/:id
  const match = pathname.match(/^\/learn\/([^/]+)$/);
  return match?.[1] ?? null;
}

export default function Learn() {
  const [location, navigate] = useLocation();
  const selectedFromUrl = parseSelectedFromUrl(location);
  const { data: concepts, isLoading, error } = useConcepts();

  const { data: storedSelected } = useSelectedConceptId();
  const remember = useRememberSelectedConcept();

  const effectiveSelectedId =
    selectedFromUrl || storedSelected || (concepts?.[0]?.id ?? null);

  const { data: selectedConcept, isLoading: isLoadingConcept } = useConcept(effectiveSelectedId);

  React.useEffect(() => {
    if (!concepts || concepts.length === 0) return;
    // If user hits /learn without id, nudge url for shareability.
    if (location === "/learn" && effectiveSelectedId) {
      navigate(`/learn/${effectiveSelectedId}`, { replace: true });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [concepts?.length]);

  const onSelectId = (id: string) => {
    remember.mutate(id);
    navigate(`/learn/${id}`);
  };

  const style = {
    "--sidebar-width": "22rem",
    "--sidebar-width-icon": "4.25rem",
  } as React.CSSProperties;

  if (isLoading) {
    return (
      <AppShell>
        <LoadingState />
      </AppShell>
    );
  }

  if (error) {
    return (
      <AppShell>
        <EmptyState
          title="Couldn’t load concepts"
          description={(error as Error).message ?? "Unknown error"}
          actionLabel="Retry"
          onAction={() => window.location.reload()}
        />
      </AppShell>
    );
  }

  const list = (concepts ?? []) as Concept[];

  if (list.length === 0) {
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

  return (
    <AppShell>
      <SidebarProvider style={style}>
        <div className="flex h-[calc(100vh-84px)] w-full gap-4">
          <div className="hidden md:block">
            <AppSidebar concepts={list} selectedId={effectiveSelectedId} onSelectId={onSelectId} />
          </div>

          <div className="flex min-w-0 flex-1 flex-col gap-4">
            <Card className="glass rounded-2xl p-4 md:p-5">
              <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
                <div className="min-w-0">
                  <div className="text-sm font-semibold">Study</div>
                  <div className="mt-1 text-sm text-muted-foreground">
                    Choose a lesson on the left. On mobile, use the “Open concepts” button in the header.
                  </div>
                </div>

                <div className="flex flex-wrap items-center gap-2">
                  <Button
                    variant="outline"
                    onClick={() => {
                      // Quick "random concept"
                      const next = list[Math.floor(Math.random() * list.length)];
                      if (!next) return;
                      onSelectId(next.id);
                    }}
                  >
                    Surprise me
                  </Button>

                  <Button
                    variant="secondary"
                    onClick={() => {
                      // Share current
                      const url = window.location.origin + `/learn/${effectiveSelectedId ?? ""}`;
                      navigator.clipboard
                        .writeText(url)
                        .catch(() => null);
                    }}
                  >
                    Copy link
                  </Button>
                </div>
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
                description="This concept id doesn’t exist (or was removed)."
                actionLabel="Go to first concept"
                onAction={() => onSelectId(list[0]!.id)}
              />
            ) : (
              <ConceptDetail concept={selectedConcept} />
            )}
          </div>
        </div>
      </SidebarProvider>
    </AppShell>
  );
}
