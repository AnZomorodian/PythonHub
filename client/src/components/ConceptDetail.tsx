import * as React from "react";
import { Link } from "wouter";
import { ArrowLeft, ExternalLink, Info } from "lucide-react";
import type { Concept } from "@shared/schema";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { CodePane } from "@/components/CodePane";

export function ConceptDetail({ concept }: { concept: Concept }) {
  return (
    <div className="grid gap-4 lg:grid-cols-[1.2fr_1fr]">
      <Card className="glass rounded-2xl p-5 md:p-6">
        <div className="flex flex-wrap items-center justify-between gap-2">
          <div className="flex min-w-0 items-center gap-3">
            <div className="grid h-11 w-11 shrink-0 place-items-center rounded-2xl bg-muted text-foreground shadow-sm ring-1 ring-border/40">
              <Info className="h-5 w-5" />
            </div>
            <div className="min-w-0">
              <h1 className="title-ink truncate text-2xl md:text-3xl">{concept.title}</h1>
              <div className="mt-1 flex flex-wrap items-center gap-2">
                <Badge variant="secondary">Beginner</Badge>
                <Badge variant="outline">Python</Badge>
              </div>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            <Button variant="outline" size="sm" onClick={() => window.history.back()} className="gap-2">
              <ArrowLeft className="h-4 w-4" />
              Back
            </Button>
            <Button
              variant="secondary"
              size="sm"
              onClick={() => {
                const url =
                  "https://docs.python.org/3/tutorial/index.html";
                window.open(url, "_blank", "noreferrer");
              }}
              className="gap-2"
            >
              <ExternalLink className="h-4 w-4" />
              Python docs
            </Button>
          </div>
        </div>

        <div className="mt-5 space-y-4">
          <p className="text-sm leading-relaxed text-muted-foreground">{concept.description}</p>

          <div className="rounded-2xl border border-border bg-background/60 p-4">
            <div className="text-xs font-semibold text-foreground">Quick mental model</div>
            <div className="mt-1 text-sm text-muted-foreground">
              Read the code from top to bottom. If you can predict the output, you understand it.
            </div>

            <div className="mt-3 flex flex-wrap items-center gap-2">
              <Button
                variant="default"
                size="sm"
                onClick={() => {
                  const el = document.getElementById("code-pane");
                  el?.scrollIntoView({ behavior: "smooth", block: "start" });
                }}
              >
                Jump to code
              </Button>

              <Link
                href="/learn"
                className="inline-flex items-center justify-center rounded-md px-3 py-2 text-sm font-medium text-muted-foreground focus-ring"
              >
                Study mode
              </Link>
            </div>
          </div>
        </div>
      </Card>

      <div id="code-pane">
        <CodePane code={concept.codeSnippet} output={concept.output ?? null} title="Code & output" />
      </div>
    </div>
  );
}
