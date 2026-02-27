import * as React from "react";
import { Copy, Play, Terminal } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { cn } from "@/lib/utils";

function safeCopy(text: string) {
  return navigator.clipboard.writeText(text);
}

export function CodePane({
  code,
  output,
  title,
}: {
  code: string;
  output?: string | null;
  title?: string;
}) {
  const { toast } = useToast();
  const [tab, setTab] = React.useState<"code" | "output">("code");

  return (
    <Card className="glass rounded-2xl p-4 md:p-5">
      <div className="flex flex-col gap-3">
        <div className="flex flex-wrap items-center justify-between gap-2">
          <div className="flex items-center gap-2">
            <span className="grid h-9 w-9 place-items-center rounded-xl border border-border bg-background shadow-sm">
              <Terminal className="h-4 w-4" />
            </span>
            <div className="leading-tight">
              <div className="text-sm font-semibold">{title ?? "Try it"}</div>
              <div className="text-xs text-muted-foreground">
                Read, copy, and run in your terminal.
              </div>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            <Button
              variant={tab === "code" ? "default" : "outline"}
              size="sm"
              onClick={() => setTab("code")}
            >
              Code
            </Button>
            <Button
              variant={tab === "output" ? "default" : "outline"}
              size="sm"
              onClick={() => setTab("output")}
              disabled={!output}
            >
              Output
            </Button>

            <Button
              variant="outline"
              size="sm"
              onClick={async () => {
                try {
                  await safeCopy(code);
                  toast({ title: "Copied", description: "Code snippet copied to clipboard." });
                } catch {
                  toast({
                    title: "Copy failed",
                    description: "Clipboard permission blocked in this environment.",
                    variant: "destructive",
                  });
                }
              }}
              className="gap-2"
            >
              <Copy className="h-4 w-4" />
              Copy
            </Button>

            <Button
              variant="secondary"
              size="sm"
              onClick={() => {
                toast({
                  title: "How to run",
                  description: "Paste into a Python file, then run: python3 your_file.py",
                });
              }}
              className="gap-2"
            >
              <Play className="h-4 w-4" />
              Run tip
            </Button>
          </div>
        </div>

        <div className="rounded-2xl border border-border bg-background/60 p-1">
          <div className="relative rounded-xl border border-border/70 code-surface p-4 shadow-inner">
            <div className="pointer-events-none absolute inset-0 rounded-xl bg-[radial-gradient(900px_circle_at_20%_10%,rgba(34,197,94,0.14),transparent_45%),radial-gradient(800px_circle_at_80%_10%,rgba(250,204,21,0.14),transparent_45%)]" />
            <pre
              className={cn(
                "relative max-h-[420px] overflow-auto whitespace-pre-wrap break-words text-sm leading-relaxed",
                "text-[hsl(210_30%_96%)]",
              )}
            >
              <code>
                {tab === "code"
                  ? code
                  : output
                    ? output
                    : "No output provided for this concept yet."}
              </code>
            </pre>
          </div>
        </div>

        <div className="text-xs text-muted-foreground">
          Tip: Python cares about indentation. When you see spaces at the start of a line, keep
          them.
        </div>
      </div>
    </Card>
  );
}
