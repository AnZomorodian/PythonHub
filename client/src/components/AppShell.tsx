import * as React from "react";
import { Link, useLocation } from "wouter";
import { BookOpen, Code2, Home, Moon, Sun, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { Footer } from "@/components/Footer";

function useTheme() {
  const [theme, setTheme] = React.useState<"light" | "dark">(() => {
    const stored = localStorage.getItem("theme");
    if (stored === "dark" || stored === "light") return stored;
    return document.documentElement.classList.contains("dark") ? "dark" : "light";
  });

  React.useEffect(() => {
    document.documentElement.classList.toggle("dark", theme === "dark");
    localStorage.setItem("theme", theme);
  }, [theme]);

  return { theme, setTheme };
}

export function AppShell({
  title = "PyBasics",
  children,
}: {
  title?: string;
  children: React.ReactNode;
}) {
  const [location] = useLocation();
  const { theme, setTheme } = useTheme();

  return (
    <div className="flex flex-col min-h-screen bg-background app-grid">
      <div className="pointer-events-none fixed inset-0 -z-10">
        <div className="absolute inset-0 bg-[radial-gradient(1200px_circle_at_20%_10%,hsl(var(--primary)/0.14),transparent_55%),radial-gradient(900px_circle_at_80%_10%,hsl(var(--accent)/0.14),transparent_55%),radial-gradient(900px_circle_at_50%_80%,hsl(var(--foreground)/0.08),transparent_55%)]" />
      </div>

      <header className="sticky top-0 z-50 border-b border-border/70 bg-background/70 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-3 px-4 py-3 sm:px-6 lg:px-8">
          <div className="flex items-center gap-3">
            <Link
              href="/"
              className="group flex items-center gap-2 rounded-lg px-2 py-1 focus-ring"
            >
              <span className="grid h-9 w-9 place-items-center rounded-xl bg-foreground text-background shadow-sm ring-1 ring-border/40 transition-transform duration-200 ease-out group-hover:-translate-y-0.5">
                <Code2 className="h-4 w-4" />
              </span>
              <div className="leading-tight">
                <div className="text-sm font-semibold tracking-tight flex items-center gap-2">
                  {title}
                  <Badge variant="secondary" className="text-xs ml-1">
                    <Sparkles className="h-3 w-3 mr-1" />
                    Beta
                  </Badge>
                </div>
                <div className="text-xs text-muted-foreground">Python, from zero.</div>
              </div>
            </Link>
          </div>

          <nav className="hidden items-center gap-1 md:flex">
            <Link
              href="/"
              className={cn(
                "inline-flex items-center gap-2 rounded-lg px-3 py-2 text-sm font-medium text-muted-foreground transition-colors focus-ring",
                location === "/" && "text-foreground",
              )}
            >
              <Home className="h-4 w-4" />
              Overview
            </Link>
            <Link
              href="/learn"
              className={cn(
                "inline-flex items-center gap-2 rounded-lg px-3 py-2 text-sm font-medium text-muted-foreground transition-colors focus-ring",
                location.startsWith("/learn") && "text-foreground",
              )}
            >
              <BookOpen className="h-4 w-4" />
              Learn
            </Link>
          </nav>

          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
              className="gap-2"
              aria-label="Toggle theme"
            >
              {theme === "dark" ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
              <span className="hidden sm:inline">{theme === "dark" ? "Light" : "Dark"}</span>
            </Button>

            <Button
              variant="default"
              size="sm"
              onClick={() => {
                const el = document.getElementById("concepts-panel");
                el?.scrollIntoView({ behavior: "smooth", block: "start" });
              }}
              className="hidden sm:inline-flex"
            >
              Open concepts
            </Button>
          </div>
        </div>
      </header>

      <main className="flex-1 mx-auto w-full max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
        <div className="animate-float-in">{children}</div>
      </main>

      <Footer />
    </div>
  );
}
