import * as React from "react";
import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import NotFound from "@/pages/not-found";
import Home from "@/pages/Home";
import Learn from "@/pages/Learn";

function Router() {
  return (
    <Switch>
      <Route path="/" component={Home} />
      <Route path="/learn" component={Learn} />
      <Route path="/learn/:id" component={Learn} />
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  React.useEffect(() => {
    // Initialize theme once on boot
    const stored = localStorage.getItem("theme");
    const theme = stored === "dark" || stored === "light" ? stored : null;
    if (theme) document.documentElement.classList.toggle("dark", theme === "dark");
  }, []);

  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Router />
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
