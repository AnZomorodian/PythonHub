import * as React from "react";
import { Link, useLocation } from "wouter";
import {
  ArrowRight,
  BookOpen,
  Sparkles,
  Terminal,
  Code,
  Zap,
  Gauge,
  Trophy,
  Puzzle,
  Layers,
  CheckCircle2,
  FlaskConical,
  GitBranch,
  Globe,
  Database,
  Cpu,
  Star,
  Clock,
  Users,
  Play,
  Lightbulb,
  Target,
  TrendingUp,
  Shield,
} from "lucide-react";
import { AppShell } from "@/components/AppShell";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { useConcepts } from "@/hooks/use-concepts";
import { Badge } from "@/components/ui/badge";

const FEATURED_PROJECTS = [
  {
    title: "Number Guessing Game",
    desc: "Random numbers, loops & conditionals working together.",
    difficulty: "intermediate",
    icon: Puzzle,
    tags: ["random", "loops", "input"],
  },
  {
    title: "FizzBuzz",
    desc: "The classic interview challenge — solved step by step.",
    difficulty: "beginner",
    icon: Target,
    tags: ["loops", "modulo"],
  },
  {
    title: "Password Generator",
    desc: "Create strong passwords using the string module.",
    difficulty: "intermediate",
    icon: Shield,
    tags: ["random", "string"],
  },
  {
    title: "Simple Calculator",
    desc: "Functions + arithmetic + user input in one project.",
    difficulty: "beginner",
    icon: Cpu,
    tags: ["functions", "math"],
  },
];

const CATEGORIES = [
  { name: "fundamentals", label: "Fundamentals", icon: BookOpen, color: "text-blue-600 bg-blue-500/10 border-blue-200" },
  { name: "data-structures", label: "Data Structures", icon: Database, color: "text-purple-600 bg-purple-500/10 border-purple-200" },
  { name: "control-flow", label: "Control Flow", icon: GitBranch, color: "text-green-600 bg-green-500/10 border-green-200" },
  { name: "functions", label: "Functions", icon: Layers, color: "text-orange-600 bg-orange-500/10 border-orange-200" },
  { name: "error-handling", label: "Error Handling", icon: Shield, color: "text-red-600 bg-red-500/10 border-red-200" },
  { name: "advanced-syntax", label: "Advanced Syntax", icon: Cpu, color: "text-yellow-600 bg-yellow-500/10 border-yellow-200" },
  { name: "oop", label: "OOP", icon: Globe, color: "text-teal-600 bg-teal-500/10 border-teal-200" },
  { name: "projects", label: "Mini Projects", icon: FlaskConical, color: "text-pink-600 bg-pink-500/10 border-pink-200" },
];

const LEARNING_PATH = [
  { step: 1, label: "Syntax & Output", desc: "Variables, print, types", color: "bg-green-500" },
  { step: 2, label: "Flow Control", desc: "If/else, loops", color: "bg-blue-500" },
  { step: 3, label: "Data Structures", desc: "Lists, dicts, sets", color: "bg-purple-500" },
  { step: 4, label: "Functions", desc: "Define, call, return", color: "bg-orange-500" },
  { step: 5, label: "Mini Projects", desc: "Apply everything", color: "bg-pink-500" },
];

const WHY_PYTHON = [
  { icon: TrendingUp, title: "Most popular language", desc: "Consistently ranked #1 or #2 worldwide." },
  { icon: Lightbulb, title: "Clean, readable syntax", desc: "Code that looks almost like plain English." },
  { icon: Globe, title: "Used everywhere", desc: "Web, AI, science, automation, and more." },
  { icon: Users, title: "Huge community", desc: "Millions of learners and developers to learn from." },
  { icon: Zap, title: "Fast to prototype", desc: "Go from idea to working code in minutes." },
  { icon: Trophy, title: "High job demand", desc: "One of the top 5 most hired-for languages." },
];

const QUICK_TIPS = [
  "Read the error message first — it tells you exactly what's wrong.",
  "Change one thing at a time when debugging.",
  "Print intermediate values to see what your code is doing.",
  "The Python REPL (just type `python`) is your best friend for quick experiments.",
  "Indentation in Python isn't style — it's syntax. It matters.",
];

export default function Home() {
  const [, navigate] = useLocation();
  const { data: concepts } = useConcepts();
  const [tipIndex, setTipIndex] = React.useState(0);

  const stats = React.useMemo(() => {
    if (!concepts) return { total: 0, beginner: 0, intermediate: 0, advanced: 0, projects: 0, categories: new Set<string>() };
    return {
      total: concepts.length,
      beginner: concepts.filter(c => c.difficulty === "beginner").length,
      intermediate: concepts.filter(c => c.difficulty === "intermediate").length,
      advanced: concepts.filter(c => c.difficulty === "advanced").length,
      projects: concepts.filter(c => c.category === "projects").length,
      categories: new Set(concepts.map(c => c.category).filter(Boolean)),
    };
  }, [concepts]);

  React.useEffect(() => {
    const id = setInterval(() => setTipIndex(i => (i + 1) % QUICK_TIPS.length), 4000);
    return () => clearInterval(id);
  }, []);

  const difficultyBar = (count: number, total: number) =>
    `${total > 0 ? Math.round((count / total) * 100) : 0}%`;

  return (
    <AppShell>
      <div className="space-y-6">

        {/* ── Hero grid ── */}
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
                <div className="mt-5 flex flex-wrap gap-2">
                  <Badge variant="secondary" className="text-xs gap-1">
                    <BookOpen className="h-3 w-3" /> {stats.total} concepts
                  </Badge>
                  <Badge variant="outline" className="text-xs gap-1">
                    <Layers className="h-3 w-3" /> {stats.categories.size} categories
                  </Badge>
                  <Badge variant="outline" className="text-xs gap-1">
                    <FlaskConical className="h-3 w-3" /> {stats.projects} mini projects
                  </Badge>
                  <Badge variant="outline" className="text-xs gap-1">
                    <Clock className="h-3 w-3" /> ~{Math.round((stats.total * 5) / 60)} hrs total
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
                data-testid="button-start-learning"
                variant="default"
                size="lg"
                onClick={() => navigate("/learn")}
                className="gap-2"
              >
                Start learning <ArrowRight className="h-4 w-4" />
              </Button>
              <Button
                data-testid="button-toggle-theme"
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

            {/* Difficulty breakdown */}
            <div className="mt-8 pt-6 border-t border-border/40">
              <div className="text-xs font-semibold text-muted-foreground mb-3">Difficulty Breakdown</div>
              <div className="space-y-2">
                {[
                  { label: "Beginner", count: stats.beginner, color: "bg-green-500" },
                  { label: "Intermediate", count: stats.intermediate, color: "bg-yellow-500" },
                  { label: "Advanced", count: stats.advanced, color: "bg-red-500" },
                ].map(({ label, count, color }) => (
                  <div key={label} className="flex items-center gap-3">
                    <div className="w-24 text-xs text-muted-foreground">{label}</div>
                    <div className="flex-1 rounded-full bg-muted h-2 overflow-hidden">
                      <div
                        className={`h-full rounded-full ${color} transition-all duration-700`}
                        style={{ width: difficultyBar(count, stats.total) }}
                      />
                    </div>
                    <div className="w-6 text-xs font-semibold text-right">{count}</div>
                  </div>
                ))}
              </div>
            </div>
          </Card>

          {/* Right column — how to use */}
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
                  <span className="font-semibold text-foreground block">Build the project</span>
                  Try the mini projects — apply what you've learned for real.
                </div>
              </li>
            </ol>

            {/* Rotating tip */}
            <div className="mt-6 rounded-2xl border border-yellow-200 bg-yellow-500/10 p-4 min-h-[80px]">
              <div className="flex gap-2 items-start">
                <Gauge className="h-4 w-4 text-yellow-700 mt-0.5 shrink-0" />
                <div>
                  <div className="text-xs font-semibold text-yellow-700">Pro tip #{tipIndex + 1}/{QUICK_TIPS.length}</div>
                  <div className="mt-1 text-sm text-yellow-600 transition-all duration-500">
                    {QUICK_TIPS[tipIndex]}
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-6 space-y-2">
              <Button
                data-testid="button-go-to-learn"
                variant="secondary"
                size="lg"
                onClick={() => navigate("/learn")}
                className="w-full gap-2"
              >
                Go to Learn <ArrowRight className="h-4 w-4" />
              </Button>
              <Button
                data-testid="button-switch-theme"
                variant="ghost"
                size="lg"
                onClick={() => document.documentElement.classList.toggle("dark")}
                className="w-full"
              >
                Switch theme
              </Button>
            </div>
          </Card>
        </div>

        {/* ── NEW 1: Featured Mini Projects ── */}
        <div>
          <div className="flex items-center justify-between mb-4">
            <div>
              <h2 className="text-lg font-bold flex items-center gap-2">
                <FlaskConical className="h-5 w-5 text-pink-500" />
                Featured Mini Projects
              </h2>
              <p className="text-sm text-muted-foreground mt-0.5">
                Apply your knowledge with real, runnable Python programs.
              </p>
            </div>
            <Button
              data-testid="button-view-all-projects"
              variant="outline"
              size="sm"
              onClick={() => navigate("/learn")}
              className="gap-1 shrink-0"
            >
              View all <ArrowRight className="h-3.5 w-3.5" />
            </Button>
          </div>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {FEATURED_PROJECTS.map((p) => (
              <Card
                key={p.title}
                data-testid={`card-project-${p.title.replace(/\s+/g, "-").toLowerCase()}`}
                className="glass rounded-2xl p-5 cursor-pointer hover:shadow-lg transition-all duration-200 group"
                onClick={() => navigate("/learn")}
              >
                <div className="grid h-10 w-10 place-items-center rounded-2xl bg-primary/10 text-primary shadow-sm ring-1 ring-primary/20">
                  <p.icon className="h-5 w-5" />
                </div>
                <div className="mt-3 font-semibold text-sm leading-snug group-hover:text-primary transition-colors">
                  {p.title}
                </div>
                <div className="mt-1 text-xs text-muted-foreground leading-relaxed">{p.desc}</div>
                <div className="mt-3 flex flex-wrap gap-1">
                  <Badge
                    variant="outline"
                    className={`text-xs ${p.difficulty === "beginner" ? "text-green-600 border-green-200" : "text-yellow-600 border-yellow-200"}`}
                  >
                    {p.difficulty}
                  </Badge>
                  {p.tags.slice(0, 2).map(t => (
                    <Badge key={t} variant="secondary" className="text-xs">{t}</Badge>
                  ))}
                </div>
              </Card>
            ))}
          </div>
        </div>

        {/* ── NEW 2: Learning Path ── */}
        <Card className="glass rounded-2xl p-6 md:p-8">
          <h2 className="text-lg font-bold flex items-center gap-2">
            <TrendingUp className="h-5 w-5 text-primary" />
            Your Learning Path
          </h2>
          <p className="text-sm text-muted-foreground mt-1">Follow this order for the smoothest learning experience.</p>
          <div className="mt-6 flex flex-col sm:flex-row items-start sm:items-center gap-0">
            {LEARNING_PATH.map((item, i) => (
              <React.Fragment key={item.step}>
                <div className="flex sm:flex-col items-center sm:items-center gap-3 sm:gap-2 flex-1">
                  <div className={`grid h-9 w-9 shrink-0 place-items-center rounded-full text-white text-sm font-bold shadow-md ${item.color}`}>
                    {item.step}
                  </div>
                  <div className="sm:text-center">
                    <div className="text-sm font-semibold">{item.label}</div>
                    <div className="text-xs text-muted-foreground">{item.desc}</div>
                  </div>
                </div>
                {i < LEARNING_PATH.length - 1 && (
                  <div className="hidden sm:block h-px w-8 bg-border shrink-0 mt-[-16px]" />
                )}
              </React.Fragment>
            ))}
          </div>
          <div className="mt-6">
            <Button
              data-testid="button-start-path"
              onClick={() => navigate("/learn")}
              className="gap-2"
            >
              <Play className="h-4 w-4" />
              Start from the beginning
            </Button>
          </div>
        </Card>

        {/* ── NEW 3: Category Explorer ── */}
        <div>
          <div className="mb-4">
            <h2 className="text-lg font-bold flex items-center gap-2">
              <Layers className="h-5 w-5 text-purple-500" />
              Explore by Category
            </h2>
            <p className="text-sm text-muted-foreground mt-0.5">Jump straight to the topic you care about most.</p>
          </div>
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            {CATEGORIES.map((cat) => (
              <Card
                key={cat.name}
                data-testid={`card-category-${cat.name}`}
                className="glass rounded-2xl p-4 cursor-pointer hover:shadow-lg transition-all duration-200 group"
                onClick={() => navigate("/learn")}
              >
                <div className={`inline-flex items-center gap-2 rounded-xl border px-2.5 py-1.5 text-xs font-semibold ${cat.color}`}>
                  <cat.icon className="h-3.5 w-3.5" />
                  {cat.label}
                </div>
                <div className="mt-2 text-xs text-muted-foreground">
                  {concepts?.filter(c => c.category === cat.name).length ?? 0} concepts
                </div>
              </Card>
            ))}
          </div>
        </div>

        {/* ── NEW 4: Why Python ── */}
        <Card className="glass rounded-2xl p-6 md:p-8">
          <h2 className="text-lg font-bold flex items-center gap-2">
            <Star className="h-5 w-5 text-yellow-500" />
            Why learn Python first?
          </h2>
          <p className="text-sm text-muted-foreground mt-1">
            Python is the most recommended language for beginners — here's why.
          </p>
          <div className="mt-5 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {WHY_PYTHON.map((item) => (
              <div
                key={item.title}
                data-testid={`card-why-${item.title.replace(/\s+/g, "-").toLowerCase()}`}
                className="flex gap-3 rounded-xl border border-border/60 bg-background/50 p-4"
              >
                <div className="grid h-9 w-9 shrink-0 place-items-center rounded-xl bg-primary/10 text-primary">
                  <item.icon className="h-4.5 w-4.5" />
                </div>
                <div>
                  <div className="text-sm font-semibold">{item.title}</div>
                  <div className="mt-0.5 text-xs text-muted-foreground">{item.desc}</div>
                </div>
              </div>
            ))}
          </div>
        </Card>

        {/* ── NEW 5: Live code preview ── */}
        <Card className="glass rounded-2xl p-6 md:p-8">
          <div className="flex items-start justify-between gap-4">
            <div className="flex-1">
              <h2 className="text-lg font-bold flex items-center gap-2">
                <Code className="h-5 w-5 text-blue-500" />
                What the code looks like
              </h2>
              <p className="text-sm text-muted-foreground mt-1">
                Every concept has a clean snippet and a real output — no guessing.
              </p>
            </div>
          </div>
          <div className="mt-5 grid gap-4 lg:grid-cols-2">
            <div className="code-surface rounded-2xl p-4 overflow-x-auto">
              <div className="flex items-center gap-2 mb-3">
                <div className="h-2.5 w-2.5 rounded-full bg-red-400" />
                <div className="h-2.5 w-2.5 rounded-full bg-yellow-400" />
                <div className="h-2.5 w-2.5 rounded-full bg-green-400" />
                <span className="ml-2 text-xs text-slate-400 font-mono">example.py</span>
              </div>
              <pre className="text-sm font-mono text-slate-200 whitespace-pre-wrap">{`# FizzBuzz — the classic challenge
for n in range(1, 16):
    if n % 15 == 0:
        print("FizzBuzz")
    elif n % 3 == 0:
        print("Fizz")
    elif n % 5 == 0:
        print("Buzz")
    else:
        print(n)`}</pre>
            </div>
            <div className="rounded-2xl border border-border bg-background/60 p-4">
              <div className="text-xs font-semibold text-muted-foreground mb-3">Output</div>
              <pre className="text-sm font-mono text-foreground whitespace-pre">{`1\n2\nFizz\n4\nBuzz\nFizz\n7\n8\nFizz\nBuzz\n11\nFizz\n13\n14\nFizzBuzz`}</pre>
            </div>
          </div>
          <div className="mt-4">
            <Button
              data-testid="button-try-it"
              variant="outline"
              onClick={() => navigate("/learn")}
              className="gap-2"
            >
              Try it in the Learn section <ArrowRight className="h-4 w-4" />
            </Button>
          </div>
        </Card>

        {/* ── NEW 6: Stats Row ── */}
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {[
            { label: "Total Concepts", value: stats.total, icon: BookOpen, color: "text-blue-600", bg: "bg-blue-500/10 border-blue-200" },
            { label: "Mini Projects", value: stats.projects, icon: FlaskConical, color: "text-pink-600", bg: "bg-pink-500/10 border-pink-200" },
            { label: "Categories", value: stats.categories.size, icon: Layers, color: "text-purple-600", bg: "bg-purple-500/10 border-purple-200" },
            { label: "Beginner-Friendly", value: stats.beginner, icon: CheckCircle2, color: "text-green-600", bg: "bg-green-500/10 border-green-200" },
          ].map((s) => (
            <Card
              key={s.label}
              data-testid={`stat-${s.label.replace(/\s+/g, "-").toLowerCase()}`}
              className={`glass rounded-2xl p-5 border ${s.bg}`}
            >
              <div className="flex items-center gap-3">
                <s.icon className={`h-5 w-5 ${s.color}`} />
                <div className={`text-2xl font-bold ${s.color}`}>{s.value}</div>
              </div>
              <div className="mt-1 text-sm text-muted-foreground">{s.label}</div>
            </Card>
          ))}
        </div>

        {/* ── NEW 7: Quick challenge CTA ── */}
        <Card className="glass rounded-2xl p-6 md:p-8 border-primary/20 bg-primary/5">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div className="flex gap-4 items-start">
              <div className="grid h-12 w-12 shrink-0 place-items-center rounded-2xl bg-primary text-primary-foreground shadow-md">
                <Trophy className="h-6 w-6" />
              </div>
              <div>
                <h2 className="text-lg font-bold">Ready to start?</h2>
                <p className="text-sm text-muted-foreground mt-1">
                  Pick any concept and spend just 5 minutes with it. That's all it takes to start building.
                </p>
              </div>
            </div>
            <Button
              data-testid="button-begin-journey"
              size="lg"
              onClick={() => navigate("/learn")}
              className="shrink-0 gap-2"
            >
              Begin your journey <ArrowRight className="h-4 w-4" />
            </Button>
          </div>
        </Card>

      </div>
    </AppShell>
  );
}
