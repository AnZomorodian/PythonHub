import * as React from "react";
import { Link, useLocation } from "wouter";
import { ArrowRight, BookOpen, Sparkles, Terminal, Code, Zap, Gauge } from "lucide-react";
import { AppShell } from "@/components/AppShell";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { useConcepts } from "@/hooks/use-concepts";
import { Badge } from "@/components/ui/badge";

export default function Home() {
  const [, navigate] = useLocation();
  const { data: concepts } = useConcepts();

  const stats = React.useMemo(() => {
    if (!concepts) return { total: 0, beginner: 0, intermediate: 0, advanced: 0, categories: new Set<string>() };
    return {
      total: concepts.length,
      beginner: concepts.filter(c => c.difficulty === "beginner").length,
      intermediate: concepts.filter(c => c.difficulty === "intermediate").length,
      advanced: concepts.filter(c => c.difficulty === "advanced").length,
      categories: new Set(concepts.map(c => c.category).filter(Boolean)),
    };
  }, [concepts]);

  return (
    <AppShell>
      <div className="grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
        <Card className="glass rounded-2xl p-6 md:p-8">
          <div className="flex items-start justify-between gap-4">
            <div className="flex-1">
              <div className="inline-flex items-center gap-2 rounded-full border border-border bg-background/60 px-3 py-1 text-xs text-muted-foreground">
                <Sparkles className="h-3.5 w-3.5" />
                Minimal. Interactive. Beginner-proof.
              </div>

              <h1 className="mt-4 text-3xl leading-tight md:text-4xl font-bold">
                Learn Python basics—
                <span className="block title-ink">one tiny concept at a time.</span>
              </h1>

              <p className="mt-4 max-w-xl text-sm leading-relaxed text-muted-foreground md:text-base">
                Pick a concept, read a short explanation, then study a clean code snippet with an
                output preview. Designed to feel calm, fast, and focused.
              </p>

              <div className="mt-6 flex flex-wrap gap-2">
                <Badge variant="secondary" className="text-xs">
                  {stats.total} concepts
                </Badge>
                <Badge variant="outline" className="text-xs">
                  {stats.categories.size} categories
                </Badge>
                <Badge variant="outline" className="text-xs">
                  ~{Math.round((stats.total * 5) / 60)} min total
                </Badge>
              </div>
            </div>

            <div className="hidden lg:block">
              <div className="grid h-14 w-14 place-items-center rounded-3xl bg-foreground text-background shadow-lg ring-1 ring-border/30">
                <Terminal className="h-6 w-6" />
              </div>
            </div>
          </div>

          <div className="mt-6 flex flex-wrap items-center gap-3">
            <Button
              variant="default"
              size="lg"
              onClick={() => navigate("/learn")}
              className="gap-2"
            >
              Start learning <ArrowRight className="h-4 w-4" />
            </Button>

            <Button
              variant="outline"
              size="lg"
              onClick={() => {
                document.documentElement.classList.toggle("dark");
                localStorage.setItem(
                  "theme",
                  document.documentElement.classList.contains("dark") ? "dark" : "light",
                );
              }}
            >
              Toggle theme
            </Button>
          </div>

          <div className="mt-8 grid gap-3 sm:grid-cols-3">
            {[
              { title: "Explain", desc: "Short, honest descriptions.", icon: BookOpen },
              { title: "Read", desc: "Clean snippets, no clutter.", icon: Code },
              { title: "Remember", desc: "Pick up patterns fast.", icon: Zap },
            ].map((f) => (
              <div
                key={f.title}
                className="rounded-2xl border border-border bg-background/60 p-4 shadow-sm hover:shadow-md transition-shadow duration-200"
              >
                <div className="grid h-10 w-10 place-items-center rounded-2xl bg-muted text-foreground shadow-sm ring-1 ring-border/40">
                  <f.icon className="h-5 w-5" />
                </div>
                <div className="mt-3 text-sm font-semibold">{f.title}</div>
                <div className="mt-1 text-sm text-muted-foreground">{f.desc}</div>
              </div>
            ))}
          </div>

          <div className="mt-8 pt-6 border-t border-border/40">
            <div className="text-xs font-semibold text-muted-foreground mb-3">Difficulty Breakdown</div>
            <div className="flex gap-2">
              {stats.beginner > 0 && (
                <div className="flex-1 p-3 rounded-lg bg-green-500/10 border border-green-200">
                  <div className="text-xs font-semibold text-green-700">{stats.beginner}</div>
                  <div className="text-xs text-green-600">Beginner</div>
                </div>
              )}
              {stats.intermediate > 0 && (
                <div className="flex-1 p-3 rounded-lg bg-yellow-500/10 border border-yellow-200">
                  <div className="text-xs font-semibold text-yellow-700">{stats.intermediate}</div>
                  <div className="text-xs text-yellow-600">Intermediate</div>
                </div>
              )}
              {stats.advanced > 0 && (
                <div className="flex-1 p-3 rounded-lg bg-red-500/10 border border-red-200">
                  <div className="text-xs font-semibold text-red-700">{stats.advanced}</div>
                  <div className="text-xs text-red-600">Advanced</div>
                </div>
              )}
            </div>
          </div>
        </Card>

        <Card className="glass rounded-2xl p-6 md:p-8">
          <div className="text-sm font-semibold">How to get the most out of this</div>
          <ol className="mt-4 space-y-4 text-sm text-muted-foreground">
            <li className="flex gap-3">
              <span className="font-semibold text-foreground shrink-0 mt-0.5">1.</span>
              <div>
                <span className="font-semibold text-foreground block">Pick a concept</span>
                Open <Link href="/learn" className="underline underline-offset-4 focus-ring">Learn</Link> and select by difficulty.
              </div>
            </li>
            <li className="flex gap-3">
              <span className="font-semibold text-foreground shrink-0 mt-0.5">2.</span>
              <div>
                <span className="font-semibold text-foreground block">Read carefully</span>
                Understand the explanation. Can you explain it in your own words?
              </div>
            </li>
            <li className="flex gap-3">
              <span className="font-semibold text-foreground shrink-0 mt-0.5">3.</span>
              <div>
                <span className="font-semibold text-foreground block">Predict first</span>
                Guess the output before looking. Then compare with the actual result.
              </div>
            </li>
            <li className="flex gap-3">
              <span className="font-semibold text-foreground shrink-0 mt-0.5">4.</span>
              <div>
                <span className="font-semibold text-foreground block">Run locally</span>
                Copy the code and execute it. Tweak it. Break it. Learn from it.
              </div>
            </li>
          </ol>

          <div className="mt-6 rounded-2xl border border-yellow-200 bg-yellow-500/10 p-4">
            <div className="flex gap-2 items-start">
              <Gauge className="h-4 w-4 text-yellow-700 mt-0.5 shrink-0" />
              <div>
                <div className="text-xs font-semibold text-yellow-700">Pro tip</div>
                <div className="mt-1 text-sm text-yellow-600">
                  Stuck? Change one line at a time, run again, and observe what changes.
                </div>
              </div>
            </div>
          </div>

          <div className="mt-6 space-y-2">
            <Button variant="secondary" size="lg" onClick={() => navigate("/learn")} className="w-full gap-2">
              Go to Learn <ArrowRight className="h-4 w-4" />
            </Button>
            <Button variant="ghost" size="lg" onClick={() => document.documentElement.classList.toggle("dark")} className="w-full">
              Switch theme
            </Button>
          </div>
        </Card>
      </div>
    </AppShell>
  );
}
