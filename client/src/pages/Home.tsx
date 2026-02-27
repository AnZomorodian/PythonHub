import * as React from "react";
import { Link, useLocation } from "wouter";
import { ArrowRight, BookOpen, Sparkles, Terminal } from "lucide-react";
import { AppShell } from "@/components/AppShell";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

export default function Home() {
  const [, navigate] = useLocation();

  return (
    <AppShell>
      <div className="grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
        <Card className="glass rounded-2xl p-6 md:p-8">
          <div className="flex items-start justify-between gap-4">
            <div>
              <div className="inline-flex items-center gap-2 rounded-full border border-border bg-background/60 px-3 py-1 text-xs text-muted-foreground">
                <Sparkles className="h-3.5 w-3.5" />
                Minimal. Interactive. Beginner-proof.
              </div>

              <h1 className="mt-4 text-3xl leading-tight md:text-4xl">
                Learn Python basics—
                <span className="block title-ink">one tiny concept at a time.</span>
              </h1>

              <p className="mt-4 max-w-xl text-sm leading-relaxed text-muted-foreground md:text-base">
                Pick a concept, read a short explanation, then study a clean code snippet with an
                output preview. Designed to feel calm, fast, and focused.
              </p>
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
              { title: "Read", desc: "Clean snippets, no clutter.", icon: Terminal },
              { title: "Remember", desc: "Pick up patterns fast.", icon: Sparkles },
            ].map((f) => (
              <div
                key={f.title}
                className="rounded-2xl border border-border bg-background/60 p-4 shadow-sm"
              >
                <div className="grid h-10 w-10 place-items-center rounded-2xl bg-muted text-foreground shadow-sm ring-1 ring-border/40">
                  <f.icon className="h-5 w-5" />
                </div>
                <div className="mt-3 text-sm font-semibold">{f.title}</div>
                <div className="mt-1 text-sm text-muted-foreground">{f.desc}</div>
              </div>
            ))}
          </div>
        </Card>

        <Card className="glass rounded-2xl p-6 md:p-8">
          <div className="text-sm font-semibold">How this is meant to be used</div>
          <ol className="mt-3 space-y-3 text-sm text-muted-foreground">
            <li>
              <span className="font-semibold text-foreground">1.</span> Open{" "}
              <Link href="/learn" className="underline underline-offset-4 focus-ring">
                Learn
              </Link>{" "}
              and pick a concept.
            </li>
            <li>
              <span className="font-semibold text-foreground">2.</span> Read the description until
              you can paraphrase it in your own words.
            </li>
            <li>
              <span className="font-semibold text-foreground">3.</span> Predict the output before
              you look at it.
            </li>
            <li>
              <span className="font-semibold text-foreground">4.</span> Copy the snippet into a
              local file and run it.
            </li>
          </ol>

          <div className="mt-6 rounded-2xl border border-border bg-background/60 p-4">
            <div className="text-xs font-semibold text-foreground">Pro tip</div>
            <div className="mt-1 text-sm text-muted-foreground">
              If a concept feels confusing, slow down and reduce it. Change one line at a time, run
              again, and observe.
            </div>
          </div>

          <div className="mt-6">
            <Button variant="secondary" size="lg" onClick={() => navigate("/learn")} className="w-full gap-2">
              Go to Learn <ArrowRight className="h-4 w-4" />
            </Button>
          </div>
        </Card>
      </div>
    </AppShell>
  );
}
