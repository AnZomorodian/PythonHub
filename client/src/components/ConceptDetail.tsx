import * as React from "react";
import { Link } from "wouter";
import { ArrowLeft, Copy, ExternalLink, Info, Clock } from "lucide-react";
import type { Concept } from "@shared/schema";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { CodePane } from "@/components/CodePane";

export function ConceptDetail({ concept }: { concept: Concept }) {
  const [copied, setCopied] = React.useState(false);
  
  const handleCopyCode = () => {
    navigator.clipboard.writeText(concept.codeSnippet).catch(() => null);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const difficultyColor = {
    beginner: "bg-green-500/20 text-green-700 border-green-200",
    intermediate: "bg-yellow-500/20 text-yellow-700 border-yellow-200",
    advanced: "bg-red-500/20 text-red-700 border-red-200"
  }[concept.difficulty || "beginner"];

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
                <Badge className={`${difficultyColor} border`}>{concept.difficulty}</Badge>
                <Badge variant="outline">{concept.category}</Badge>
                {concept.estimatedMinutes && (
                  <Badge variant="secondary" className="gap-1">
                    <Clock className="h-3 w-3" />
                    {concept.estimatedMinutes}m
                  </Badge>
                )}
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

          {concept.tags && concept.tags.length > 0 && (
            <div className="flex flex-wrap gap-2">
              {concept.tags.map((tag) => (
                <Badge key={tag} variant="outline" className="text-xs">
                  {tag}
                </Badge>
              ))}
            </div>
          )}

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

              <Button
                variant="outline"
                size="sm"
                onClick={handleCopyCode}
                className="gap-2"
              >
                <Copy className="h-4 w-4" />
                {copied ? "Copied!" : "Copy code"}
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
