import { Switch, Route, Router as WouterRouter } from "wouter";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import NotFound from "@/pages/not-found";
import { useAnalyticsPageViews } from "@/hooks/use-analytics-page-views";

// Pages
import Home from "./pages/home";
import Apply from "./pages/apply";
import Results from "./pages/results";
import Privacy from "./pages/privacy";
import Terms from "./pages/terms";
import About from "./pages/about";
import Contact from "./pages/contact";
import Blog from "./pages/blog";
import HowToConsolidate from "./pages/blog/how-to-consolidate-credit-card-debt";
import PersonalLoanVsBalanceTransfer from "./pages/blog/personal-loan-vs-balance-transfer";
import CreditScoreForConsolidationLoan from "./pages/blog/credit-score-for-consolidation-loan";
import HowSoftCreditPullWorks from "./pages/blog/how-soft-credit-pull-works";
import DebtConsolidationCalculatorArticle from "./pages/blog/debt-consolidation-calculator";
import FAQ from "./pages/faq";

const queryClient = new QueryClient();

function Router() {
  useAnalyticsPageViews();
  return (
    <Switch>
      <Route path="/" component={Home} />
      <Route path="/apply" component={Apply} />
      <Route path="/results" component={Results} />
      <Route path="/about" component={About} />
      <Route path="/contact" component={Contact} />
      <Route path="/blog" component={Blog} />
      <Route path="/blog/how-to-consolidate-credit-card-debt" component={HowToConsolidate} />
      <Route path="/blog/personal-loan-vs-balance-transfer" component={PersonalLoanVsBalanceTransfer} />
      <Route path="/blog/credit-score-for-consolidation-loan" component={CreditScoreForConsolidationLoan} />
      <Route path="/blog/how-soft-credit-pull-works" component={HowSoftCreditPullWorks} />
      <Route path="/blog/debt-consolidation-calculator" component={DebtConsolidationCalculatorArticle} />
      <Route path="/faq" component={FAQ} />
      <Route path="/privacy" component={Privacy} />
      <Route path="/terms" component={Terms} />
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <WouterRouter base={import.meta.env.BASE_URL.replace(/\/$/, "")}>
          <Router />
        </WouterRouter>
        <Toaster />
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
