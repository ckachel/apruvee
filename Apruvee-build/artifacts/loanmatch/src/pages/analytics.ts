declare global {
  interface Window {
    dataLayer?: unknown[];
    gtag?: (...args: unknown[]) => void;
  }
}

export const GA4_MEASUREMENT_ID =
  (import.meta.env.VITE_GA4_MEASUREMENT_ID as string | undefined) ?? "";

export const isAnalyticsEnabled = (): boolean =>
  Boolean(GA4_MEASUREMENT_ID) && typeof window !== "undefined" && typeof window.gtag === "function";

export function trackPageView(path: string, title?: string): void {
  if (!isAnalyticsEnabled()) return;
  window.gtag!("event", "page_view", {
    page_path: path,
    page_location: window.location.origin + path,
    page_title: title ?? document.title,
    send_to: GA4_MEASUREMENT_ID,
  });
}

export function trackEvent(
  eventName: string,
  params: Record<string, unknown> = {},
): void {
  if (!isAnalyticsEnabled()) return;
  window.gtag!("event", eventName, {
    ...params,
    send_to: GA4_MEASUREMENT_ID,
  });
}

// ─── Lead Conversion (existing) ───────────────────────────────────────────────

export type LeadConversionParams = {
  loanAmount: number;
  loanPurpose: string;
  creditScore: string;
  state: string;
};

export function trackLeadConversion(params: LeadConversionParams): void {
  trackEvent("generate_lead", {
    currency: "USD",
    value: params.loanAmount,
    loan_purpose: params.loanPurpose,
    credit_score: params.creditScore,
    state: params.state,
  });

  // Also fire Google Ads conversion
  if (typeof window.gtag === "function") {
    window.gtag("event", "conversion", {
      send_to: "AW-18161430115",
      value: 50,
      currency: "USD",
    });
  }
}

// ─── Apply Form Events ─────────────────────────────────────────────────────────

export function trackApplyStarted(params: {
  loanAmount?: number;
  source?: string;
}): void {
  trackEvent("apply_started", {
    loan_amount: params.loanAmount,
    source: params.source ?? "homepage",
  });
}

export function trackApplyStepComplete(params: {
  step: number;
  stepName: string;
  loanAmount?: number;
  loanPurpose?: string;
  creditScore?: string;
}): void {
  trackEvent("apply_step_complete", {
    step_number: params.step,
    step_name: params.stepName,
    loan_amount: params.loanAmount,
    loan_purpose: params.loanPurpose,
    credit_score: params.creditScore,
  });
}

export function trackApplyAbandoned(params: {
  step: number;
  stepName: string;
}): void {
  trackEvent("apply_abandoned", {
    step_number: params.step,
    step_name: params.stepName,
  });
}

// ─── Results Page Events ───────────────────────────────────────────────────────

export function trackResultsViewed(params: {
  offerCount: number;
  loanAmount?: number;
  creditScore?: string;
}): void {
  trackEvent("results_viewed", {
    offer_count: params.offerCount,
    loan_amount: params.loanAmount,
    credit_score: params.creditScore,
  });
}

export function trackLenderClicked(params: {
  lenderName: string;
  lenderRank: number;
  minRate: number;
  estimatedPayment: number;
  loanAmount?: number;
}): void {
  trackEvent("lender_clicked", {
    lender_name: params.lenderName,
    lender_rank: params.lenderRank,
    min_rate: params.minRate,
    estimated_payment: params.estimatedPayment,
    loan_amount: params.loanAmount,
    currency: "USD",
  });
}

// ─── Calculator Events ─────────────────────────────────────────────────────────

export function trackCalculatorOpened(): void {
  trackEvent("calculator_opened", {});
}

export function trackCalculatorUsed(params: {
  debtAmount: number;
  currentApr: number;
  estimatedSavings: number;
}): void {
  trackEvent("calculator_used", {
    debt_amount: params.debtAmount,
    current_apr: params.currentApr,
    estimated_savings: params.estimatedSavings,
  });
}

// ─── Content Events ────────────────────────────────────────────────────────────

export function trackBlogCtaClicked(params: {
  articleSlug: string;
  ctaPosition: "bottom" | "mid";
}): void {
  trackEvent("blog_cta_clicked", {
    article_slug: params.articleSlug,
    cta_position: params.ctaPosition,
  });
}

export function trackOutboundClick(params: {
  url: string;
  label: string;
}): void {
  trackEvent("outbound_click", {
    outbound_url: params.url,
    link_label: params.label,
  });
}

// ─── Step name helper ──────────────────────────────────────────────────────────

export const STEP_NAMES: Record<number, string> = {
  1: "loan_amount",
  2: "loan_purpose",
  3: "credit_score",
  4: "annual_income",
  5: "employment_status",
  6: "personal_info",
  7: "consent",
};
