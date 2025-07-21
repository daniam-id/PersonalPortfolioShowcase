import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { ThemeProvider } from "@/components/ThemeProvider";
import { Home } from "@/pages/home";
import NotFound from "@/pages/not-found";
import WebsitePortfolioPage from "@/pages/website-portfolio";
import PhotographyPage from "@/pages/photography";

function Router() {
  return (
    <Switch>
      <Route path="/" component={Home} />
      <Route path="/website" component={WebsitePortfolioPage} />
      <Route path="/photography" component={PhotographyPage} />
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider>
        <TooltipProvider>
          <Toaster />
          <Router />
        </TooltipProvider>
      </ThemeProvider>
    </QueryClientProvider>
  );
}

export default App;
