import { Link } from "wouter";
import { ArrowLeft, Ghost } from "lucide-react";
import { AppShell } from "@/components/AppShell";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

export default function NotFound() {
  return (
    <AppShell>
      <Card className="glass mx-auto max-w-2xl rounded-2xl p-8">
        <div className="flex items-start gap-4">
          <div className="grid h-12 w-12 place-items-center rounded-2xl bg-muted text-foreground shadow-sm ring-1 ring-border/40">
            <Ghost className="h-6 w-6" />
          </div>
          <div className="min-w-0">
            <h1 className="text-2xl md:text-3xl">Page not found</h1>
            <p className="mt-2 text-sm text-muted-foreground">
              That route doesn’t exist. If you were expecting a lesson, go back to Learn and pick a concept.
            </p>

            <div className="mt-6 flex flex-wrap items-center gap-2">
              <Button variant="default" onClick={() => window.history.back()} className="gap-2">
                <ArrowLeft className="h-4 w-4" />
                Go back
              </Button>

              <Link href="/learn" className="inline-flex">
                <Button variant="outline" onClick={() => {}}>
                  Go to Learn
                </Button>
              </Link>

              <Link href="/" className="inline-flex">
                <Button variant="secondary" onClick={() => {}}>
                  Home
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </Card>
    </AppShell>
  );
}
