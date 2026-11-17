import { getAttribution } from "./attribution";
import { getLeadTier, TIER_VALUES } from "./lead-quality";

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

// ─── Lead Conversion ───────────────────────────────────────────────────────────

// Google Ads "Qualified Lead" conversion action, as "AW-18161430115/<label>".
// Create the action in Google Ads (Goals → Conversions → New → Website →
// manual code), then set VITE_GADS_QUALIFIED_LEAD_SEND_TO in Railway. While
// unset, the GA4 qualified_lead event still fires (and can be imported into
// Google Ads from GA4 instead) but no Ads tag is sent.
const GADS_QUALIFIED_LEAD_SEND_TO =
  (import.meta.env.VITE_GADS_QUALIFIED_LEAD_SEND_TO as string | undefined) ?? "";

export type LeadConversionParams = {
  loanAmount: number;
  loanPurpose: string;
  creditScore: string;
  state: string;
};

export function trackLeadConversion(params: LeadConversionParams): void {
  const tier = getLeadTier(params);
  const value = TIER_VALUES[tier];
  const { clickId, channel } = getAttribution();

  // Every completed form. Value is now tier-based (was the raw loan amount),
  // so GA4 revenue-style reports reflect lead quality, not request size.
  trackEvent("generate_lead", {
    currency: "USD",
    value,
    lead_tier: tier,
    loan_amount: params.loanAmount,
    loan_purpose: params.loanPurpose,
    credit_score: params.creditScore,
    state: params.state,
    click_id: clickId,
    channel,
  });

  // Google Ads — legacy form-completion tag. NOTE: send_to has no conversion
  // label, so Google Ads does not attribute it to any conversion action; it is
  // kept only so nothing that may depend on it breaks. Optimization should
  // target the Qualified Lead action below.
  if (typeof window.gtag === "function") {
    window.gtag("event", "conversion", {
      send_to: "AW-18161430115",
      value,
      currency: "USD",
    });
  }

  if (tier === "credible_eligible") {
    trackQualifiedLead({ ...params, value, clickId });
  }
}

/**
 * Fires only for Credible-eligible leads ($5K+, 640+ self-reported credit,
 * debt consolidation / credit card payoff). Intended to become the PRIMARY
 * Google Ads conversion so bidding favors approvable borrowers instead of
 * any form-filler. See lib/lead-quality.ts.
 */
function trackQualifiedLead(params: LeadConversionParams & { value: number; clickId: string }): void {
  trackEvent("qualified_lead", {
    currency: "USD",
    value: params.value,
    loan_amount: params.loanAmount,
    loan_purpose: params.loanPurpose,
    credit_score: params.creditScore,
    click_id: params.clickId,
  });

  if (GADS_QUALIFIED_LEAD_SEND_TO && typeof window.gtag === "function") {
    window.gtag("event", "conversion", {
      send_to: GADS_QUALIFIED_LEAD_SEND_TO,
      value: params.value,
      currency: "USD",
      // Dedupe if the results page is reloaded or the form double-submits.
      transaction_id: params.clickId,
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
  // GA4 event
  trackEvent("lender_clicked", {
    lender_name: params.lenderName,
    lender_rank: params.lenderRank,
    min_rate: params.minRate,
    estimated_payment: params.estimatedPayment,
    loan_amount: params.loanAmount,
    currency: "USD",
    // Same ID passed to the partner as its sub ID — joins GA4 to partner reports.
    click_id: getAttribution().clickId,
  });

  // Google Ads — Lender Click conversion (AW-18161430115/t5KlCKj05LAcEOPchdRD)
  if (typeof window.gtag === "function") {
    window.gtag("event", "conversion", {
      send_to: "AW-18161430115/t5KlCKj05LAcEOPchdRD",
      value: 1,
      currency: "USD",
    });
  }
}

// ─── Calculator Events ─────────────────────────────────────────────────────────

export function trackCalculatorOpened(params?: { loanAmount?: number; lenderName?: string }): void {
  trackEvent("calculator_opened", {
    loan_amount: params?.loanAmount,
    lender_name: params?.lenderName,
  });
}

export function trackCalculatorUsed(params: {
  debt: number;
  currentApr: number;
  loanAmount?: number;
  lenderName?: string;
}): void {
  trackEvent("calculator_used", {
    debt_amount: params.debt,
    current_apr: params.currentApr,
    loan_amount: params.loanAmount,
    lender_name: params.lenderName,
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
