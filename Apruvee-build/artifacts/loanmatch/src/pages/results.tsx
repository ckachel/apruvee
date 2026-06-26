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
import type { LenderOffer } from "@workspace/api-client-react";

const COMPARISON_TERM_MONTHS = 60;

// Round Sky's affiliate base URL — subId3 is injected at render time with a
// per-session UUID so each click is individually trackable without storing PII.
const ROUND_SKY_BASE_URL =
  "https://www.honestloans.net?id=9DPmXSrZouYKwbWnCnMko97mmKV4f5_t54mDiATa7YY.";

function buildAffiliateUrl(offer: LenderOffer, clickId: string): string {
  if (offer.lenderName === "Round Sky") {
    return `${ROUND_SKY_BASE_URL}&subId3=${clickId}`;
  }
  return offer.affiliateUrl;
}

// ─── Lead Stack Offers ────────────────────────────────────────────────────────
// Tracking params confirmed from pdvportal.com Offer Marketplace (Jun 24 2026):
//   &sub={your_source_id}   → traffic source label (google | seo | bing | direct)
//   &sub2={your_click_id}   → UUID click ID for server-side postback matching
//
// Affiliate IDs are pre-embedded in each base URL by the portal.
// Do not add an affid param — it is already part of the base URL.

interface LeadStackOffer {
  id: string;
  name: string;
  baseUrl: string;
  aprRange: string;
  loanRange: string;
  termRange: string;
  features: string[];
}

const LEADSTACK_OFFERS: LeadStackOffer[] = [
  {
    id: "lowcreditfinance",
    name: "Low Credit Finance",
    baseUrl: "https://lowcreditfinance.com/?aff166052",
    aprRange: "5.99% – 35.99%",
    loanRange: "$1,000 – $50,000",
    termRange: "12 – 60 mo",
    features: ["No prepayment penalty", "Fast online decision", "Fair credit welcome"],
  },
  {
    id: "borrowmoney",
    name: "BorrowMoney.us",
    baseUrl: "https://borrowmoney.us/?aff166053",
    aprRange: "5.99% – 35.99%",
    loanRange: "$1,000 – $50,000",
    termRange: "12 – 60 mo",
    features: ["Multiple lender network", "Quick application", "Debt consolidation friendly"],
  },
  {
    id: "goodcreditloans",
    name: "Good Credit Loans",
    baseUrl: "https://goodcreditloans.com/?aff166041",
    aprRange: "5.99% – 35.99%",
    loanRange: "$1,000 – $50,000",
    termRange: "12 – 60 mo",
    features: ["Soft pull pre-check", "Competitive rates", "All credit types considered"],
  },
  {
    id: "triballoans",
    name: "TribalLoans.com",
    baseUrl: "https://triballoans.com/?aff166037",
    aprRange: "5.99% – 35.99%",
    loanRange: "$1,000 – $50,000",
    termRange: "12 – 60 mo",
    features: ["Fast funding", "Simple application", "Personal loan options"],
  },
];

/**
 * Detects traffic source from utm_source query param.
 * Maps to a clean fixed set — raw UTM values are never passed to Lead Stack.
 */
function detectTrafficSource(): string {
  const params = new URLSearchParams(window.location.search);
  const utm = (params.get("utm_source") || "").toLowerCase();
  if (utm.includes("google")) return "google";
  if (utm.includes("bing") || utm.includes("microsoft")) return "bing";
  if (utm.includes("facebook") || utm.includes("meta")) return "meta";
  if (utm.includes("organic") || utm === "seo") return "seo";
  return "direct";
}

/**
 * Builds a fully-qualified Lead Stack click-out URL.
 * Params: &sub= (traffic source) and &sub2= (UUID click ID).
 * No PII in the URL — affiliate ID is pre-embedded in baseUrl by the portal.
 */
function buildLeadStackUrl(baseUrl: string, clickId: string, source: string): string {
  return `${baseUrl}&sub=${encodeURIComponent(source)}&sub2=${encodeURIComponent(clickId)}`;
}

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

  // One UUID per page-load — shared across all paid-partner links (Round Sky + Lead Stack).
  const [sessionClickId] = useState<string>(() => crypto.randomUUID());

  // Stable traffic source detection — runs once on mount.
  const [trafficSource] = useState<string>(() => detectTrafficSource());

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

  // Sort offers: all non-Round Sky lenders sorted by minRate only.
  // Paid partner priority is not used here — Lead Stack cards render above
  // all direct lender cards and Round Sky renders between Lead Stack and unpaid lenders.
  const sortedOffers: LenderOffer[] = useMemo(() => {
    if (!offers) return [];
    return [...offers]
      .filter((o) => o.lenderName !== "Round Sky")
      .sort((a, b) => a.minRate - b.minRate);
  }, [offers]);

  // Round Sky is pulled out separately so it always renders last — below Lead Stack cards.
  const roundSkyOffer: LenderOffer | undefined = useMemo(() => {
    if (!offers) return undefined;
    return offers.find((o) => o.lenderName === "Round Sky");
  }, [offers]);

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

  const offerSavings = useMemo(() => {
    type OfferId = LenderOffer["id"];
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
                  onClick={() => {
                    const next = !showCalculator;
                    setShowCalculator(next);
                    if (next) trackCalculatorOpened({ loanAmount });
                  }}
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
                  <div className="px-4 pb-4 border-t border-slate-100">
                    <DebtConsolidationCalculator
                      initialDebt={currentDebt}
                      initialApr={currentApr}
                      onChange={(values) => {
                        handleCalculatorChange(values);
                        trackCalculatorUsed({ debt: values.debt, currentApr: values.currentApr, loanAmount });
                      }}
                    />
                  </div>
                )}
              </div>

              {/* Sort explainer */}
              <div className="bg-white rounded-xl border border-slate-200 px-4 py-3 text-xs text-slate-500">
                <p>
                  Sponsored partners appear first. Remaining offers are sorted by lowest minimum APR.{" "}
                  <a href="/advertiser-disclosure" className="text-primary hover:underline">
                    How we're compensated
                  </a>
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
              ) : sortedOffers.length === 0 && !roundSkyOffer ? (
                <div className="bg-white rounded-2xl p-12 text-center border border-slate-200">
                  <div className="w-16 h-16 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Info className="w-8 h-8 text-slate-400" />
                  </div>
                  <h2 className="text-xl font-bold text-slate-900 mb-2">No offers currently available</h2>
                  <p className="text-slate-600 mb-6">
                    Based on the information provided, we couldn't match you with a lender at this moment.
                  </p>
                </div>
              ) : (
                <div className="space-y-4">

                  {/* ── Lead Stack affiliate cards — always first ──────────────────────
                      Click-out only — no iFrame, no PII in URL.
                      Tracking: &sub= (traffic source) + &sub2= (UUID click ID).
                      Affiliate ID is pre-embedded in each baseUrl by the portal.
                  ─────────────────────────────────────────────────────────────────── */}
                  {LEADSTACK_OFFERS.map((offer, index) => {
                    const trackingUrl = buildLeadStackUrl(offer.baseUrl, sessionClickId, trafficSource);
                    return (
                      <div
                        key={offer.id}
                        className="bg-white rounded-2xl border border-primary/30 ring-1 ring-primary/10 shadow-sm overflow-hidden transition-shadow hover:shadow-md"
                      >
                        {/* Sponsored badge — identical markup to Round Sky */}
                        <div className="bg-primary/5 border-b border-primary/10 px-6 py-1.5 flex items-center gap-1.5">
                          <Star className="w-3 h-3 text-primary fill-primary" />
                          <span className="text-xs font-semibold text-primary tracking-wide uppercase">
                            Sponsored
                          </span>
                        </div>

                        <div className="p-6">
                          <div className="flex items-center gap-4 mb-6">
                            <div className="w-14 h-14 rounded-full bg-primary/10 flex items-center justify-center text-primary font-bold text-lg shrink-0">
                              {offer.name.charAt(0)}
                            </div>
                            <h3 className="text-xl font-bold text-slate-900">{offer.name}</h3>
                          </div>

                          <div className="grid grid-cols-3 gap-4 mb-6 p-4 bg-slate-50 rounded-xl">
                            <div>
                              <p className="text-xs text-slate-500 mb-1">APR Range</p>
                              <p className="font-semibold text-slate-900">{offer.aprRange}</p>
                            </div>
                            <div>
                              <p className="text-xs text-slate-500 mb-1">Loan Amount</p>
                              <p className="font-semibold text-slate-900">{offer.loanRange}</p>
                            </div>
                            <div>
                              <p className="text-xs text-slate-500 mb-1">Term</p>
                              <p className="font-semibold text-slate-900">{offer.termRange}</p>
                            </div>
                          </div>

                          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                            <ul className="space-y-1 w-full md:w-auto">
                              {offer.features.map((feature) => (
                                <li key={feature} className="flex items-center gap-2 text-sm text-slate-600">
                                  <Check className="w-4 h-4 text-green-500 shrink-0" />
                                  {feature}
                                </li>
                              ))}
                            </ul>
                            <a
                              href={trackingUrl}
                              target="_blank"
                              rel="noopener noreferrer"
                              onClick={() =>
                                trackLenderClicked({
                                  lenderName: offer.name,
                                  lenderRank: index + 1,
                                  minRate: 5.99,
                                  estimatedPayment: 0,
                                  loanAmount,
                                })
                              }
                              className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl font-semibold text-sm transition-all whitespace-nowrap shrink-0 bg-primary text-white hover:bg-primary/90 shadow-sm"
                            >
                              Check My Rate
                              <ArrowRight className="w-4 h-4" />
                            </a>
                          </div>
                        </div>
                      </div>
                    );
                  })}

                  {/* ── Round Sky — always after Lead Stack, before unpaid lenders ────
                      Uses sessionClickId via subId3 for postback tracking.
                  ─────────────────────────────────────────────────────────────────── */}
                  {roundSkyOffer && (() => {
                    const offer = roundSkyOffer;
                    const savings = offerSavings.get(offer.id);
                    const hasBestSavings = savings !== undefined && savings === bestSavings && bestSavings > 0;
                    const affiliateUrl = buildAffiliateUrl(offer, sessionClickId);
                    const rankPosition = LEADSTACK_OFFERS.length + 1;

                    return (
                      <div className="bg-white rounded-2xl border border-primary/30 ring-1 ring-primary/10 shadow-sm overflow-hidden transition-shadow hover:shadow-md">
                        <div className="bg-primary/5 border-b border-primary/10 px-6 py-1.5 flex items-center gap-1.5">
                          <Star className="w-3 h-3 text-primary fill-primary" />
                          <span className="text-xs font-semibold text-primary tracking-wide uppercase">
                            Sponsored
                          </span>
                        </div>

                        <div className="p-6">
                          <div className="flex items-start justify-between mb-6">
                            <div className="flex items-center gap-4">
                              <div className="w-14 h-14 rounded-full bg-primary/10 flex items-center justify-center text-primary font-bold text-lg shrink-0">
                                {offer.lenderName.charAt(0)}
                              </div>
                              <div>
                                <div className="flex items-center gap-2 flex-wrap">
                                  <h3 className="text-xl font-bold text-slate-900">{offer.lenderName}</h3>
                                  {offer.badgeLabel && (
                                    <span className="text-xs font-semibold bg-emerald-50 text-emerald-700 px-2 py-0.5 rounded-full border border-emerald-200">
                                      {offer.badgeLabel}
                                    </span>
                                  )}
                                </div>
                                {hasBestSavings && savings !== undefined && (
                                  <p className="text-sm text-emerald-600 font-semibold mt-0.5">
                                    Save up to {formatCurrency(savings)} in interest
                                  </p>
                                )}
                              </div>
                            </div>
                            <div className="text-right shrink-0 ml-4">
                              <p className="text-sm text-slate-500 mb-1">Est. Monthly Payment</p>
                              <p className="text-2xl font-bold text-slate-900">
                                {formatCurrency(offer.estimatedMonthlyPayment)}
                              </p>
                            </div>
                          </div>

                          <div className="grid grid-cols-3 gap-4 mb-6 p-4 bg-slate-50 rounded-xl">
                            <div>
                              <p className="text-xs text-slate-500 mb-1">APR Range</p>
                              <p className="font-semibold text-slate-900">
                                {offer.minRate.toFixed(2)}% – {offer.maxRate.toFixed(2)}%
                              </p>
                            </div>
                            <div>
                              <p className="text-xs text-slate-500 mb-1">Loan Amount</p>
                              <p className="font-semibold text-slate-900">
                                {formatCurrency(offer.minAmount)} – {formatCurrency(offer.maxAmount)}
                              </p>
                            </div>
                            <div>
                              <p className="text-xs text-slate-500 mb-1">Term</p>
                              <p className="font-semibold text-slate-900">
                                {offer.minTerm}–{offer.maxTerm} mo
                              </p>
                            </div>
                          </div>

                          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                            <ul className="space-y-1 w-full md:w-auto">
                              {offer.features.slice(0, 3).map((feature) => (
                                <li key={feature} className="flex items-center gap-2 text-sm text-slate-600">
                                  <Check className="w-4 h-4 text-green-500 shrink-0" />
                                  {feature}
                                </li>
                              ))}
                            </ul>
                            <a
                              href={affiliateUrl}
                              target="_blank"
                              rel="noopener noreferrer"
                              onClick={() =>
                                trackLenderClicked({
                                  lenderName: offer.lenderName,
                                  lenderRank: rankPosition,
                                  minRate: offer.minRate,
                                  estimatedPayment: offer.estimatedMonthlyPayment,
                                  loanAmount,
                                })
                              }
                              className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl font-semibold text-sm transition-all whitespace-nowrap shrink-0 bg-primary text-white hover:bg-primary/90 shadow-sm"
                            >
                              Check My Rate
                              <ArrowRight className="w-4 h-4" />
                            </a>
                          </div>
                        </div>
                      </div>
                    );
                  })()}

                  {/* ── Non-paid direct lender offers — always last, sorted by minRate ── */}
                  {sortedOffers.map((offer, index) => {
                    const savings = offerSavings.get(offer.id);
                    const hasBestSavings = savings !== undefined && savings === bestSavings && bestSavings > 0;
                    const affiliateUrl = buildAffiliateUrl(offer, sessionClickId);
                    const rankPosition = LEADSTACK_OFFERS.length + (roundSkyOffer ? 1 : 0) + index + 1;

                    return (
                      <div
                        key={offer.id}
                        className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden transition-shadow hover:shadow-md"
                      >
                        <div className="p-6">
                          <div className="flex items-start justify-between mb-6">
                            <div className="flex items-center gap-4">
                              <div className="w-14 h-14 rounded-full bg-primary/10 flex items-center justify-center text-primary font-bold text-lg shrink-0">
                                {offer.lenderName.charAt(0)}
                              </div>
                              <div>
                                <div className="flex items-center gap-2 flex-wrap">
                                  <h3 className="text-xl font-bold text-slate-900">{offer.lenderName}</h3>
                                  {offer.badgeLabel && (
                                    <span className="text-xs font-semibold bg-emerald-50 text-emerald-700 px-2 py-0.5 rounded-full border border-emerald-200">
                                      {offer.badgeLabel}
                                    </span>
                                  )}
                                </div>
                                {hasBestSavings && savings !== undefined && (
                                  <p className="text-sm text-emerald-600 font-semibold mt-0.5">
                                    Save up to {formatCurrency(savings)} in interest
                                  </p>
                                )}
                              </div>
                            </div>
                            <div className="text-right shrink-0 ml-4">
                              <p className="text-sm text-slate-500 mb-1">Est. Monthly Payment</p>
                              <p className="text-2xl font-bold text-slate-900">
                                {formatCurrency(offer.estimatedMonthlyPayment)}
                              </p>
                            </div>
                          </div>

                          <div className="grid grid-cols-3 gap-4 mb-6 p-4 bg-slate-50 rounded-xl">
                            <div>
                              <p className="text-xs text-slate-500 mb-1">APR Range</p>
                              <p className="font-semibold text-slate-900">
                                {offer.minRate.toFixed(2)}% – {offer.maxRate.toFixed(2)}%
                              </p>
                            </div>
                            <div>
                              <p className="text-xs text-slate-500 mb-1">Loan Amount</p>
                              <p className="font-semibold text-slate-900">
                                {formatCurrency(offer.minAmount)} – {formatCurrency(offer.maxAmount)}
                              </p>
                            </div>
                            <div>
                              <p className="text-xs text-slate-500 mb-1">Term</p>
                              <p className="font-semibold text-slate-900">
                                {offer.minTerm}–{offer.maxTerm} mo
                              </p>
                            </div>
                          </div>

                          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                            <ul className="space-y-1 w-full md:w-auto">
                              {offer.features.slice(0, 3).map((feature) => (
                                <li key={feature} className="flex items-center gap-2 text-sm text-slate-600">
                                  <Check className="w-4 h-4 text-green-500 shrink-0" />
                                  {feature}
                                </li>
                              ))}
                            </ul>
                            <a
                              href={affiliateUrl}
                              target="_blank"
                              rel="noopener noreferrer"
                              onClick={() =>
                                trackLenderClicked({
                                  lenderName: offer.lenderName,
                                  lenderRank: rankPosition,
                                  minRate: offer.minRate,
                                  estimatedPayment: offer.estimatedMonthlyPayment,
                                  loanAmount,
                                })
                              }
                              className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl font-semibold text-sm transition-all whitespace-nowrap shrink-0 bg-slate-900 text-white hover:bg-slate-700"
                            >
                              Check My Rate
                              <ArrowRight className="w-4 h-4" />
                            </a>
                          </div>

                          <p className="text-xs text-slate-400 mt-4">
                            Apruvee does not currently have an affiliate agreement with {offer.lenderName}. This listing is for informational purposes only.
                          </p>
                        </div>
                      </div>
                    );
                  })}

                </div>
              )}
            </div>

            {/* Sidebar */}
            <div className="space-y-6 lg:sticky lg:top-6 lg:self-start">
              <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm">
                <div className="flex items-center gap-2 mb-4">
                  <Shield className="w-5 h-5 text-primary" />
                  <h3 className="font-bold text-slate-900">Your selection</h3>
                </div>
                <div className="space-y-3">
                  {loanAmount && (
                    <div className="flex justify-between text-sm">
                      <span className="text-slate-500">Loan amount</span>
                      <span className="font-semibold text-slate-900">{formatCurrency(loanAmount)}</span>
                    </div>
                  )}
                  {creditScore && (
                    <div className="flex justify-between text-sm">
                      <span className="text-slate-500">Credit score</span>
                      <span className="font-semibold text-slate-900">{creditScore}</span>
                    </div>
                  )}
                  {loanPurpose && (
                    <div className="flex justify-between text-sm">
                      <span className="text-slate-500">Purpose</span>
                      <span className="font-semibold text-slate-900">{loanPurpose}</span>
                    </div>
                  )}
                </div>
                <a
                  href="/apply"
                  className="mt-4 block text-center text-sm text-primary hover:underline font-medium"
                >
                  Update my answers
                </a>
              </div>

              <div className="bg-primary/5 rounded-2xl border border-primary/10 p-6">
                <div className="flex items-center gap-2 mb-3">
                  <Info className="w-4 h-4 text-primary shrink-0" />
                  <h3 className="font-bold text-slate-900 text-sm">No credit impact</h3>
                </div>
                <p className="text-xs text-slate-600 leading-relaxed">
                  Clicking any offer only takes you to the lender's site. A hard credit inquiry only happens if you formally apply with that lender.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </PageWrapper>
  );
}
