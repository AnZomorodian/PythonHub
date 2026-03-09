import * as React from "react";
import { Link } from "wouter";
import { Github, Heart, BookOpen, Zap } from "lucide-react";
import { cn } from "@/lib/utils";

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-border/70 bg-background/50 backdrop-blur supports-[backdrop-filter]:bg-background/40 py-8 sm:py-12">
      <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid gap-8 sm:grid-cols-2 md:grid-cols-3">
          <div>
            <div className="flex items-center gap-2 mb-4">
              <div className="grid h-8 w-8 place-items-center rounded-lg bg-foreground text-background shadow-sm">
                <BookOpen className="h-4 w-4" />
              </div>
              <span className="font-semibold">PyBasics</span>
            </div>
            <p className="text-sm text-muted-foreground">
              Learn Python fundamentals, one concept at a time. Fast, focused, and beginner-friendly.
            </p>
          </div>

          <div>
            <div className="font-semibold text-sm mb-3 flex items-center gap-2">
              <Zap className="h-4 w-4" />
              Quick Links
            </div>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/" className="text-muted-foreground hover:text-foreground transition-colors">
                  Overview
                </Link>
              </li>
              <li>
                <Link href="/learn" className="text-muted-foreground hover:text-foreground transition-colors">
                  Learn
                </Link>
              </li>
              <li>
                <a
                  href="https://python.org"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-muted-foreground hover:text-foreground transition-colors"
                >
                  Python Docs
                </a>
              </li>
            </ul>
          </div>

          <div>
            <div className="font-semibold text-sm mb-3">Built with</div>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>React + TypeScript</li>
              <li>Express & Drizzle</li>
              <li>Tailwind CSS</li>
            </ul>
          </div>
        </div>

        <div className="mt-8 pt-8 border-t border-border/40">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="text-sm text-muted-foreground">
              <span>© {year} PyBasics.</span>
              <span className="mx-2">Built with</span>
              <Heart className="h-3.5 w-3.5 inline text-red-500 align-middle" />
              <span className="mx-2">for learners.</span>
            </div>

            <div className="flex items-center gap-3">
              <a
                href="https://github.com"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center h-9 w-9 rounded-lg border border-border hover:bg-muted transition-colors"
                aria-label="GitHub"
              >
                <Github className="h-4 w-4" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
