import { useLocation } from "wouter";
import { PageWrapper } from "@/components/layout/page-wrapper";
import { useListOffers, getListOffersQueryKey } from "@workspace/api-client-react";
import { Shield, Check, Info, ArrowRight, Star, TrendingDown, ChevronDown, ChevronUp } from "lucide-react";
import { useCallback, useEffect, useMemo, useState, useRef } from "react";
import {
  trackResultsViewed,
  trackLenderClicked,
  trackCalculatorOpened,
  trackCalculatorUsed,
} from "@/lib/analytics";
import { calculateTotalInterest, formatCurrency } from "@/lib/loan-math";
import {
  DebtConsolidationCalculator,
  type DebtConsolidationCalculatorValues,
} from "@/components/debt-consolidation-calculator";

const COMPARISON_TERM_MONTHS = 60;

export default function Results() {
  const [location] = useLocation();
  const searchParams = new URLSearchParams(window.location.search);

  const loanAmount = searchParams.get("loanAmount") ? Number(searchParams.get("loanAmount")) : undefined;
  const creditScore = searchParams.get("creditScore") || undefined;
  const loanPurpose = searchParams.get("loanPurpose") || undefined;

  const { data: offers, isLoading } = useListOffers(
    { loanAmount, creditScore, loanPurpose },
    { query: { enabled: true, queryKey: getListOffersQueryKey({ loanAmount, creditScore, loanPurpose }) } }
  );

  const [currentDebt, setCurrentDebt] = useState<number>(loanAmount ?? 15000);
  const hasTrackedResults = useRef(false);
  const [currentApr, setCurrentApr] = useState<number>(24);
  const [showCalculator, setShowCalculator] = useState(false);

  const calculatorActive = currentDebt >= 1000 && currentApr > 0;

  const handleCalculatorChange = useCallback(
    (values: DebtConsolidationCalculatorValues) => {
      setCurrentDebt(values.debt);
      setCurrentApr(values.currentApr);
    },
    [],
  );

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    if (!isLoading && sortedOffers.length > 0 && !hasTrackedResults.current) {
      hasTrackedResults.current = true;
      trackResultsViewed({
        offerCount: sortedOffers.length,
        loanAmount,
        creditScore,
      });
    }
  }, [isLoading, sortedOffers.length, loanAmount, creditScore]);

  const sortedOffers = offers?.sort((a, b) => a.minRate - b.minRate) || [];

  const offerSavings = useMemo(() => {
    type OfferId = (typeof sortedOffers)[number]["id"];
    if (!calculatorActive || !showCalculator) return new Map<OfferId, number>();
    const map = new Map<OfferId, number>();
    const currentInterest = calculateTotalInterest(currentDebt, currentApr, COMPARISON_TERM_MONTHS);
    for (const offer of sortedOffers) {
      const offerInterest = calculateTotalInterest(currentDebt, offer.minRate, COMPARISON_TERM_MONTHS);
      const savings = currentInterest - offerInterest;
      map.set(offer.id, savings);
    }
    return map;
  }, [calculatorActive, currentDebt, currentApr, sortedOffers, showCalculator]);

  const bestSavings = useMemo(() => {
    if (offerSavings.size === 0) return 0;
    return Math.max(...Array.from(offerSavings.values()));
  }, [offerSavings]);

  return (
    <PageWrapper>
      <div className="bg-slate-50 min-h-screen pb-20">
        {/* Header */}
        <div className="bg-primary text-white py-12 px-4">
          <div className="container mx-auto max-w-5xl">
            <h1 className="text-3xl md:text-4xl font-bold mb-4">
              {isLoading ? "Finding your best matches..." : `Great news! We found ${sortedOffers.length} offers for you.`}
            </h1>
            <div className="flex items-center gap-2 text-primary-foreground/80 text-sm font-medium">
              <Shield className="w-4 h-4" />
              <span>Viewing these offers does not impact your credit score.</span>
            </div>
          </div>
        </div>

        <div className="container mx-auto px-4 max-w-5xl -mt-6">
          <div className="grid lg:grid-cols-3 gap-8">

            {/* Main Content: Offers */}
            <div className="lg:col-span-2 space-y-6 relative z-10">

              {/* Advertiser Disclosure + Rates Notice */}
              <div className="bg-white rounded-xl border border-slate-200 px-4 py-3 flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-xs text-slate-500">
                <span>
                  Rates shown are estimated ranges. Your actual rate is determined by the lender based on your full credit profile.
                  Not available in all states.
                </span>
                <a
                  href="/advertiser-disclosure"
                  className="text-primary hover:underline font-medium whitespace-nowrap shrink-0"
                >
                  Advertiser Disclosure
                </a>
              </div>

              {/* Collapsible Savings Calculator */}
              <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
                <button
                  onClick={() => setShowCalculator(!showCalculator)}
                  className="w-full flex items-center justify-between p-4 text-left hover:bg-slate-50 transition-colors"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-secondary text-primary flex items-center justify-center">
                      <TrendingDown className="w-4 h-4" />
                    </div>
                    <div>
                      <p className="font-semibold text-slate-900 text-sm">See how much you could save</p>
                      {!showCalculator && calculatorActive && bestSavings > 0 && (
                        <p className="text-xs text-emerald-600 font-medium">Tap to calculate your savings</p>
                      )}
                    </div>
                  </div>
                  {showCalculator ? (
                    <ChevronUp className="w-5 h-5 text-slate-400" />
                  ) : (
                    <ChevronDown className="w-5 h-5 text-slate-400" />
                  )}
                </button>

                {showCalculator && (
                  <div className="border-t border-slate-100 p-4">
                    <DebtConsolidationCalculator
                      variant="hero"
                      compact
                      title=""
                      subtitle="Enter your current credit card debt and APR to see your potential savings on each offer."
                      defaultDebt={loanAmount ?? 15000}
                      defaultCurrentApr={24}
                      onInputsChange={handleCalculatorChange}
                      inactiveMessage="Enter at least $1,000 in debt and a current APR above 0%."
                      customFooter={
                        calculatorActive && bestSavings > 0 ? (
                          <div className="pt-4 border-t border-white/20 flex items-center gap-3">
                            <TrendingDown className="w-5 h-5 shrink-0" />
                            <p className="text-sm">
                              Based on a {COMPARISON_TERM_MONTHS}-month payoff, you could save up to{" "}
                              <strong className="text-white font-bold text-base">
                                {formatCurrency(bestSavings)}
                              </strong>{" "}
                              in interest with the offers below.
                            </p>
                          </div>
                        ) : null
                      }
                    />
                  </div>
                )}
              </div>

              {/* APR Disclosure */}
              <div className="bg-blue-50 border border-blue-100 text-blue-800 p-4 rounded-xl flex items-start gap-3 text-sm">
                <Info className="w-5 h-5 shrink-0 mt-0.5" />
                <p>
                  <strong>APR Disclosure:</strong> The Annual Percentage Rate (APR) represents the true yearly cost of your loan, including interest and fees. Sorting by lowest minimum APR helps you find the most cost-effective options based on your profile.
                </p>
              </div>

              {isLoading ? (
                <div className="space-y-4">
                  {[1, 2, 3].map((i) => (
                    <div key={i} className="bg-white rounded-2xl p-6 border border-slate-200 animate-pulse">
                      <div className="flex items-center gap-4 mb-6">
                        <div className="w-16 h-16 bg-slate-100 rounded-full"></div>
                        <div className="h-6 w-32 bg-slate-100 rounded"></div>
                      </div>
                      <div className="grid grid-cols-3 gap-4 mb-6">
                        <div className="h-10 bg-slate-100 rounded"></div>
                        <div className="h-10 bg-slate-100 rounded"></div>
                        <div className="h-10 bg-slate-100 rounded"></div>
                      </div>
                      <div className="h-12 bg-slate-100 rounded-xl"></div>
                    </div>
                  ))}
                </div>
              ) : sortedOffers.length === 0 ? (
                <div className="bg-white rounded-2xl p-12 text-center border border-slate-200">
                  <div className="w-16 h-16 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Info className="w-8 h-8 text-slate-400" />
                  </div>
                  <h2 className="text-xl font-bold text-slate-900 mb-2">No offers currently available</h2>
                  <p className="text-slate-600 mb-6">Based on the information provided, we couldn't match you with a lender at this moment. You can try adjusting your requested loan amount.</p>
                  <button onClick={() => window.history.back()} className="text-primary font-semibold hover:underline">
                    Go back and edit info
                  </button>
                </div>
              ) : (
                <div className="space-y-6">
                  {sortedOffers.map((offer) => {
                    const savings = offerSavings.get(offer.id) ?? 0;
                    const showSavings = showCalculator && calculatorActive && savings > 0;
                    return (
                      <div key={offer.id} className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden hover:shadow-md transition-shadow relative">
                        {offer.badgeLabel && (
                          <div className="absolute top-0 right-0 bg-secondary text-primary text-xs font-bold px-3 py-1 rounded-bl-lg flex items-center gap-1">
                            <Star className="w-3 h-3" />
                            {offer.badgeLabel}
                          </div>
                        )}

                        <div className="p-6 md:p-8">
                          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-6">
                            <div className="flex items-center gap-4">
                              {offer.logoUrl ? (
                                <img src={offer.logoUrl} alt={offer.lenderName} className="w-16 h-16 object-contain" />
                              ) : (
                                <div className="w-16 h-16 rounded-full bg-slate-100 flex items-center justify-center text-slate-500 font-bold text-xl">
                                  {offer.lenderName.substring(0, 2).toUpperCase()}
                                </div>
                              )}
                              <div>
                                <h3 className="text-xl font-bold text-slate-900">{offer.lenderName}</h3>
                                <p className="text-sm text-slate-500">Paid Partner &nbsp;<span title="Apruvee may earn a referral fee if you apply with this lender." className="cursor-help text-slate-400 hover:text-slate-600">ⓘ</span></p>
                              </div>
                            </div>
                            <div className="text-left md:text-right">
                              <p className="text-sm text-slate-500 mb-1">Est. Payment</p>
                              <p className="text-3xl font-extrabold text-slate-900">${offer.estimatedMonthlyPayment}<span className="text-lg text-slate-500 font-normal">/mo</span></p>
                            </div>
                          </div>

                          {showSavings && (
                            <div className="mb-6 bg-emerald-50 border border-emerald-200 rounded-xl p-4 flex items-start gap-3">
                              <div className="w-9 h-9 rounded-full bg-emerald-100 flex items-center justify-center shrink-0">
                                <TrendingDown className="w-5 h-5 text-emerald-700" />
                              </div>
                              <div>
                                <p className="text-emerald-900 font-bold text-lg leading-tight">
                                  Save {formatCurrency(savings)} in interest
                                </p>
                                <p className="text-emerald-800/80 text-xs mt-0.5">
                                  vs. paying off {formatCurrency(currentDebt)} at {currentApr}% APR over {COMPARISON_TERM_MONTHS} months
                                </p>
                              </div>
                            </div>
                          )}

                          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8 bg-slate-50 rounded-xl p-4">
                            <div>
                              <p className="text-xs text-slate-500 font-medium mb-1">Est. APR</p>
                              <p className="font-bold text-slate-900">{offer.minRate}% - {offer.maxRate}%</p>
                            </div>
                            <div>
                              <p className="text-xs text-slate-500 font-medium mb-1">Loan Amount</p>
                              <p className="font-bold text-slate-900">${offer.minAmount.toLocaleString()} - ${(offer.maxAmount / 1000).toFixed(0)}k</p>
                            </div>
                            <div>
                              <p className="text-xs text-slate-500 font-medium mb-1">Terms</p>
                              <p className="font-bold text-slate-900">{offer.minTerm} - {offer.maxTerm} mo</p>
                            </div>
                            <div>
                              <p className="text-xs text-slate-500 font-medium mb-1">Min Score</p>
                              <p className="font-bold text-slate-900">{offer.minCreditScore}+</p>
                            </div>
                          </div>

                          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
                            <ul className="space-y-1 w-full md:w-auto">
                              {offer.features.slice(0, 2).map((feature, i) => (
                                <li key={i} className="flex items-center gap-2 text-sm text-slate-600">
                                  <Check className="w-4 h-4 text-green-500" />
                                  {feature}
                                </li>
                              ))}
                            </ul>
                            <a
                              href={offer.affiliateUrl}
                              target="_blank"
                              rel="noopener noreferrer"
                              onClick={() => trackLenderClicked({
                                lenderName: offer.lenderName,
                                lenderRank: sortedOffers.indexOf(offer) + 1,
                                minRate: offer.minRate,
                                estimatedPayment: offer.estimatedMonthlyPayment,
                                loanAmount,
                              })}
                              className="w-full md:w-auto inline-flex items-center justify-center gap-2 rounded-xl bg-primary px-8 py-3.5 text-base font-semibold text-white shadow hover:bg-primary/90 transition-all focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 shrink-0"
                            >
                              Continue Application
                              <ArrowRight className="w-4 h-4" />
                            </a>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}

              {showCalculator && calculatorActive && sortedOffers.length > 0 && (
                <p className="text-xs text-slate-500 leading-relaxed">
                  <strong>How we calculate this:</strong> Savings estimates compare the total
                  interest you'd pay on {formatCurrency(currentDebt)} of credit card debt at your
                  current {currentApr}% APR vs. the lender's lowest advertised APR, both repaid over
                  a fixed {COMPARISON_TERM_MONTHS}-month term using standard amortization. Your
                  actual rate is determined by the lender based on a full credit review and may
                  differ. Examples are for illustrative purposes only.
                </p>
              )}
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm sticky top-24">
                <h3 className="font-bold text-slate-900 mb-4">Tips for comparing</h3>
                <ul className="space-y-4">
                  <li className="flex gap-3">
                    <div className="w-6 h-6 rounded-full bg-secondary text-primary flex items-center justify-center text-xs font-bold shrink-0 mt-0.5">1</div>
                    <p className="text-sm text-slate-600"><strong className="text-slate-900">Look at the APR.</strong> This is the total cost of borrowing. A lower APR means less money paid in interest over time.</p>
                  </li>
                  <li className="flex gap-3">
                    <div className="w-6 h-6 rounded-full bg-secondary text-primary flex items-center justify-center text-xs font-bold shrink-0 mt-0.5">2</div>
                    <p className="text-sm text-slate-600"><strong className="text-slate-900">Check the fees.</strong> Some lenders charge origination fees. Ensure you read the full terms before signing.</p>
                  </li>
                  <li className="flex gap-3">
                    <div className="w-6 h-6 rounded-full bg-secondary text-primary flex items-center justify-center text-xs font-bold shrink-0 mt-0.5">3</div>
                    <p className="text-sm text-slate-600"><strong className="text-slate-900">Match the payment.</strong> Ensure the estimated monthly payment fits comfortably within your budget.</p>
                  </li>
                </ul>
              </div>
            </div>

          </div>
        </div>
      </div>
    </PageWrapper>
  );
}
