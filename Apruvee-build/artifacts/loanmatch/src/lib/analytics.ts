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
  window.gtag!("event", eventName, params);
}

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
}
