import * as React from "react";
import { Sidebar } from "@/components/ui/sidebar";
import type { Concept } from "@shared/schema";
import { ConceptSidebar } from "@/components/ConceptSidebar";

export function AppSidebar({
  concepts,
  selectedId,
  onSelectId,
}: {
  concepts: Concept[];
  selectedId?: string | null;
  onSelectId: (id: string) => void;
}) {
  return (
    <Sidebar>
      <ConceptSidebar concepts={concepts} selectedId={selectedId} onSelectId={onSelectId} />
    </Sidebar>
  );
}
