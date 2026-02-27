import * as React from "react";
import { Skeleton } from "@/components/ui/skeleton";

export function LoadingState() {
  return (
    <div className="grid gap-4 lg:grid-cols-[360px_1fr]">
      <div className="rounded-2xl border border-border bg-card p-4 shadow-sm">
        <div className="space-y-3">
          <Skeleton className="h-6 w-40" />
          <Skeleton className="h-10 w-full" />
          <Skeleton className="h-10 w-full" />
          <Skeleton className="h-10 w-full" />
          <Skeleton className="h-10 w-full" />
        </div>
      </div>

      <div className="rounded-2xl border border-border bg-card p-4 shadow-sm">
        <div className="space-y-3">
          <Skeleton className="h-10 w-2/3" />
          <Skeleton className="h-5 w-full" />
          <Skeleton className="h-5 w-5/6" />
          <Skeleton className="h-[320px] w-full" />
        </div>
      </div>
    </div>
  );
}
