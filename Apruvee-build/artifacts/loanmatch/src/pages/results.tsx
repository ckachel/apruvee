import { useLocation } from "wouter";
import { PageWrapper } from "@/components/layout/page-wrapper";
import { useListOffers, getListOffersQueryKey } from "@workspace/api-client-react";
import { Shield, Check, Info, ArrowRight, Star, TrendingDown, ChevronDown, ChevronUp } from "lucide-react";
import { useEffect, useMemo, useState, useRef } from "react";
import {
  trackResultsViewed,
  trackLenderClicked,
  trackCalculatorOpened,
  trackCalculatorUsed,
} from "@/lib/analytics";
import { formatCurrency } from "@/lib/loan-math";
import { DebtConsolidationCalculator } from "@/components/debt-consolidation-calculator";
import type { LenderOffer } from "@workspace/api-client-react";

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

// Credible — direct affiliate partner, always the top card on the page.
// Rate (7.99%) confirmed by Credible, Aug 2026.
const CREDIBLE_BASE_URL =
  "https://www.credible.com/personal-loan-prequalification?utm_source=apruvee&utm_medium=referral&utm_campaign=personal_loans";

// Optional aliases so Credible's utm_content uses Apruvee's preferred channel
// name even when an ad platform's own utm_source differs (e.g. Microsoft Ads
// traffic often arrives tagged utm_source=bing). Anything NOT listed here
// passes through unchanged — a brand-new channel (e.g. "tiktok") works with
// zero code changes, as long as its campaigns are tagged with that utm_source.
const CREDIBLE_CHANNEL_ALIASES: Record<string, string> = {
  bing: "microsoft",
  facebook: "facebook_ads",
  email: "crm",
};

/**
 * Reads utm_source off the current URL and maps it to the channel label
 * Credible's utm_content should carry. Falls back to "direct" if no
 * utm_source is present (e.g. someone lands here without campaign tagging).
 */
function getCredibleChannel(): string {
  const params = new URLSearchParams(window.location.search);
  const utmSource = (params.get("utm_source") || "").toLowerCase().trim();
  if (!utmSource) return "direct";
  return CREDIBLE_CHANNEL_ALIASES[utmSource] ?? utmSource;
}

function buildCredibleUrl(channel: string): string {
  return `${CREDIBLE_BASE_URL}&utm_content=${encodeURIComponent(channel)}`;
}

// Credible's lowest confirmed rate — used as the default "New Loan APR" for
// Credible's embedded savings calculator (LenderSavingsPanel below).
const CREDIBLE_RATE = 7.99;

// Credible's Trustpilot social proof. NON-EVERGREEN — per Credible's "Out of
// Date Information" guidance, this must carry a visible "as of" date, and
// this whole block must be re-verified against
// https://www.trustpilot.com/review/www.credible.com whenever it's updated
// (not just the number — check the whole card still reads accurately).
// Pulled directly from Trustpilot, Sep 3 2026. Uses our own Star icon, not
// Trustpilot's logo/star graphics — same trademark reasoning as lender logos.
const CREDIBLE_TRUSTPILOT = {
  rating: 4.8,
  reviewCount: 9741,
  asOf: "September 2026",
  url: "https://www.trustpilot.com/review/www.credible.com",
};

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
  minRate: number;
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
    minRate: 5.99,
    aprRange: "5.99% – 35.99%",
    loanRange: "$1,000 – $50,000",
    termRange: "12 – 60 mo",
    features: ["No prepayment penalty", "Fast online decision", "Fair credit welcome"],
  },
  {
    id: "borrowmoney",
    name: "BorrowMoney.us",
    baseUrl: "https://borrowmoney.us/?aff166053",
    minRate: 5.99,
    aprRange: "5.99% – 35.99%",
    loanRange: "$1,000 – $50,000",
    termRange: "12 – 60 mo",
    features: ["Multiple lender network", "Quick application", "Debt consolidation friendly"],
  },
  {
    id: "goodcreditloans",
    name: "Good Credit Loans",
    baseUrl: "https://goodcreditloans.com/?aff166041",
    minRate: 5.99,
    aprRange: "5.99% – 35.99%",
    loanRange: "$1,000 – $50,000",
    termRange: "12 – 60 mo",
    features: ["Soft pull pre-check", "Competitive rates", "All credit types considered"],
  },
  {
    id: "triballoans",
    name: "TribalLoans.com",
    baseUrl: "https://triballoans.com/?aff166037",
    minRate: 5.99,
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

// Embeds the real savings calculator inside a lender's card, defaulted to
// that lender's own low-end rate. Collapsible; Credible defaults open,
// everyone else defaults closed (per design decision, Sep 2026).
//
// Compliance note on the rate default + copy:
//  - Using the low end of a lender's rate range as the calculator default is
//    supported by Credible's own "As Low As XX%" guidance, PROVIDED it's
//    clearly disclosed as a best-case number for well-qualified applicants —
//    see rateNote below, reused across all six cards.
//  - Round Sky's compliance terms explicitly prohibit the literal phrases
//    "Lowest rate" and "Best" in marketing copy. This component (and the
//    rateNote text passed into it) avoids those words everywhere — "As low
//    as X%" is a different, Credible-approved construction, not the banned
//    bare phrase. Applied the same conservative wording to Lead Stack too,
//    since there's no published guidance for them either way.
function LenderSavingsPanel({
  lenderName,
  defaultNewApr,
  defaultOpen,
  loanAmount,
  variant = "card",
}: {
  lenderName: string;
  defaultNewApr: number;
  defaultOpen: boolean;
  loanAmount?: number;
  variant?: "card" | "hero";
}) {
  const [open, setOpen] = useState(defaultOpen);
  const hasTrackedOpen = useRef(false);

  // Tracks calculator_opened once if this panel starts open by default
  // (currently: Credible only) — manual opens are tracked in the toggle
  // button's onClick below, same pattern as the old shared calculator.
  useEffect(() => {
    if (defaultOpen && !hasTrackedOpen.current) {
      hasTrackedOpen.current = true;
      // ASSUMPTION: trackCalculatorOpened/trackCalculatorUsed accept an
      // optional lenderName field. I don't have @/lib/analytics' source, so
      // this couldn't be verified against its actual type signature —
      // please confirm before shipping, or drop lenderName from these calls
      // if it isn't a recognized field.
      trackCalculatorOpened({ loanAmount, lenderName });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const rateNote = `As low as ${defaultNewApr.toFixed(2)}%*. Assumes a well-qualified applicant — your actual rate may be higher based on your credit profile.`;

  return (
    <div className={variant === "hero" ? "mt-2" : "mt-4 pt-4 border-t border-slate-100"}>
      <button
        type="button"
        onClick={() => {
          const next = !open;
          setOpen(next);
          if (next && !hasTrackedOpen.current) {
            hasTrackedOpen.current = true;
            trackCalculatorOpened({ loanAmount, lenderName });
          }
        }}
        className="w-full flex items-center justify-between text-left text-slate-900"
      >
        <span className="inline-flex items-center gap-2 text-sm font-semibold">
          <TrendingDown className="w-4 h-4 text-primary" />
          See how much you could save
        </span>
        {open ? <ChevronUp className="w-4 h-4 text-slate-400" /> : <ChevronDown className="w-4 h-4 text-slate-400" />}
      </button>

      {open && (
        <div className="mt-3">
          <p className={`text-[11px] mb-3 ${variant === "hero" ? "text-primary-foreground/80" : "text-slate-400"}`}>
            {rateNote}
          </p>
          <DebtConsolidationCalculator
            variant={variant}
            defaultDebt={loanAmount ?? 15000}
            defaultNewApr={defaultNewApr}
            onInputsChange={(values) =>
              trackCalculatorUsed({
                debt: values.debt,
                currentApr: values.currentApr,
                loanAmount,
                lenderName,
              })
            }
          />
        </div>
      )}
    </div>
  );
}

// Renders a 5-star row with proportional fill for a rating like 4.8 — four
// full stars plus one star filled ~80% (via a clipped overlay), rather than
// rounding to a whole number of stars. Uses our own Star icon/colors, not
// Trustpilot's star graphics — same trademark reasoning as lender logos.
function TrustpilotStars({ rating }: { rating: number }) {
  return (
    <span className="inline-flex items-center gap-0.5">
      {Array.from({ length: 5 }).map((_, i) => {
        const fill = Math.min(Math.max(rating - i, 0), 1);
        return (
          <span key={i} className="relative inline-block w-3.5 h-3.5 shrink-0">
            <Star className="absolute inset-0 w-3.5 h-3.5 text-slate-300" />
            {fill > 0 && (
              <span className="absolute inset-0 overflow-hidden" style={{ width: `${fill * 100}%` }}>
                <Star className="w-3.5 h-3.5 text-amber-400 fill-amber-400" />
              </span>
            )}
          </span>
        );
      })}
    </span>
  );
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

  // Credible's utm_content — detected once per page load from utm_source, independent
  // of Lead Stack's trafficSource (Lead Stack needs a fixed small enum; Credible's
  // channel label is open-ended and passes through new utm_source values as-is).
  const [credibleChannel] = useState<string>(() => getCredibleChannel());
  const credibleUrl = useMemo(() => buildCredibleUrl(credibleChannel), [credibleChannel]);

  const hasTrackedResults = useRef(false);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  // NOTE: sortedOffers is kept only for the trackResultsViewed offerCount
  // below and no longer renders as cards — see "REMOVED SECTION" note
  // further down for why the unpaid-placeholder cards were dropped.
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

  // ─── Card order & rank tracking — single source of truth ──────────────────
  // Every paid-partner section that can render is listed here, in the exact
  // order it appears on the page. lenderRank for every card, and whether the
  // page has anything to show at all, are both derived from this array.
  //
  // The unpaid-placeholder "unpaid" section that used to appear here has been
  // removed (Aug 2026): those lenders carried no affiliate agreement, no
  // tracked link, and no revenue — they were undercutting Credible's
  // compliance-approved rate with unverified numbers for zero business
  // benefit. Re-add a section here only once a lender has a real, tracked
  // affiliate URL.
  const offerSections = useMemo(() => {
    const sections: { key: string; count: number }[] = [
      { key: "credible", count: 1 },
      { key: "leadStack", count: LEADSTACK_OFFERS.length },
    ];
    if (roundSkyOffer) sections.push({ key: "roundSky", count: 1 });
    return sections;
  }, [roundSkyOffer]);

  const rankOffsets = useMemo(() => {
    const offsets: Record<string, number> = {};
    let running = 0;
    for (const section of offerSections) {
      offsets[section.key] = running;
      running += section.count;
    }
    return offsets;
  }, [offerSections]);

  const totalOfferCount = useMemo(
    () => offerSections.reduce((sum, s) => sum + s.count, 0),
    [offerSections]
  );

  return (
    <PageWrapper>
      <div className="bg-slate-50 min-h-screen pb-20">
        {/* Header */}
        <div className="bg-primary text-white py-12 px-4">
          <div className="container mx-auto max-w-5xl">
            <h1 className="text-3xl md:text-4xl font-bold mb-4">
              {isLoading ? "Finding your best matches..." : `Great news! We found ${totalOfferCount} offers for you.`}
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

              {/* ── Credible — top-priority affiliate partner, always first ───────
                  Direct partner link, UTM-tagged. Rate (7.99%) confirmed by Credible.
                  Moved above the savings calculator (Sep 2026) so it's the first
                  thing visible on the page. Renders unconditionally — it never
                  depended on the "offers" API loading state to begin with.
                  Given extra visual weight: "Featured Partner" label, heavier
                  ring/shadow, larger logo — to differentiate from the Lead Stack
                  cards below without touching rate/comparison language.
              ─────────────────────────────────────────────────────────────────── */}
              <div className="bg-white rounded-2xl border-2 border-primary/40 ring-2 ring-primary/10 shadow-md overflow-hidden transition-shadow hover:shadow-lg">
                <div className="bg-primary/5 border-b border-primary/10 px-6 py-1.5 flex items-center gap-1.5">
                  <Star className="w-3 h-3 text-primary fill-primary" />
                  <span className="text-xs font-semibold text-primary tracking-wide uppercase">
                    Featured Partner
                  </span>
                </div>

                <div className="p-6 md:p-8">
                  <div className="flex items-center justify-between gap-4 mb-2 flex-wrap">
                    <svg width="132" height="29" viewBox="0 0 111 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="shrink-0">
                      <path fillRule="evenodd" clipRule="evenodd" d="M66.0294 6.18619C67.7129 6.18619 69.0833 4.81588 69.0833 3.13236C69.0833 1.44883 67.7129 0.0785217 66.0294 0.0785217C64.3459 0.0785217 62.9756 1.44883 62.9756 3.13236C62.9756 4.81588 64.3459 6.18619 66.0294 6.18619Z" fill="#5CC2A7"/>
                      <path d="M98.8972 16.1109C98.956 17.4225 99.3475 18.46 100.033 19.2235C100.718 19.9869 101.618 20.3785 102.754 20.3785C103.498 20.3785 104.163 20.2023 104.731 19.8695C105.299 19.5171 105.67 19.0473 105.827 18.4405H110.525C109.997 20.2219 109.057 21.5726 107.726 22.5318C106.395 23.491 104.809 23.9608 102.949 23.9608C97.2137 23.9608 94.3361 20.8287 94.3361 14.584C94.3361 13.2529 94.5122 12.0392 94.9038 10.9821C95.2757 9.90538 95.8238 8.98532 96.5286 8.22186C97.2333 7.4584 98.1142 6.87113 99.1321 6.46003C100.17 6.04894 101.344 5.85318 102.675 5.85318C105.338 5.85318 107.334 6.69494 108.705 8.41762C110.075 10.1207 110.76 12.6852 110.76 16.1305H98.8972V16.1109ZM15.8369 17.3051C15.7194 18.3034 15.4258 19.2235 14.9755 20.0261C14.5253 20.8483 13.938 21.553 13.2333 22.1207C12.5285 22.708 11.7455 23.1582 10.845 23.491C9.94454 23.8238 8.96574 23.9804 7.92822 23.9804C6.75367 23.9804 5.69658 23.7847 4.71778 23.4127C3.75856 23.0408 2.9168 22.4535 2.21207 21.6705C1.50734 20.8874 0.978793 19.9282 0.587276 18.7732C0.195759 17.6183 0 16.2675 0 14.721C0 13.1746 0.195759 11.8434 0.587276 10.7276C0.978793 9.61175 1.50734 8.69168 2.21207 7.98695C2.9168 7.28222 3.75856 6.75367 4.75693 6.40131C5.7553 6.04894 6.85155 5.87276 8.06525 5.87276C9.18108 5.87276 10.2186 6.02936 11.1191 6.323C12.0392 6.63622 12.8418 7.06688 13.5269 7.65416C14.2121 8.24144 14.7602 8.94617 15.1517 9.76835C15.5432 10.5905 15.7781 11.491 15.8564 12.4894H11.2953C11.1778 11.6085 10.8254 10.9038 10.2186 10.4144C9.63132 9.90538 8.88744 9.67047 8.0261 9.67047C7.53671 9.67047 7.08646 9.74878 6.65579 9.92496C6.22512 10.0816 5.87276 10.3556 5.55954 10.7471C5.24633 11.1387 4.99184 11.6476 4.79609 12.2936C4.60033 12.9396 4.52202 13.7227 4.52202 14.6623C4.52202 16.5612 4.85481 17.9511 5.53997 18.8711C6.22512 19.7912 6.98858 20.2414 7.88907 20.2414C8.78956 20.2414 9.53344 19.9869 10.1599 19.5171C10.7863 19.0277 11.1582 18.3034 11.2561 17.3834H15.8369V17.3051ZM16.9918 23.5498V6.323H21.279V8.39804C21.6509 7.81077 22.0424 7.36052 22.4535 7.02773C22.8646 6.69494 23.2757 6.44046 23.7064 6.28385C24.137 6.10767 24.5873 5.99021 25.0179 5.95106C25.4682 5.89233 25.9184 5.87276 26.3687 5.87276H26.9755V10.5318C26.5644 10.4535 26.1338 10.4339 25.7227 10.4339C22.9429 10.4339 21.553 11.8238 21.553 14.6036V23.5693H16.9918V23.5498ZM32.2023 16.1109C32.261 17.4225 32.6525 18.46 33.3377 19.2235C34.0228 19.9869 34.9233 20.3785 36.0587 20.3785C36.8026 20.3785 37.4682 20.2023 38.0359 19.8695C38.6036 19.5171 38.9755 19.0473 39.1321 18.4405H43.8303C43.2822 20.2219 42.3622 21.5726 41.031 22.5318C39.6998 23.491 38.1142 23.9608 36.2741 23.9608C30.5188 23.9608 27.6411 20.8287 27.6411 14.584C27.6411 13.2529 27.8369 12.0392 28.2088 10.9821C28.5807 9.90538 29.1289 8.98532 29.8336 8.22186C30.5383 7.4584 31.4193 6.87113 32.4372 6.46003C33.4551 6.04894 34.6493 5.85318 35.9804 5.85318C38.6427 5.85318 40.6591 6.69494 42.0294 8.41762C43.3997 10.1207 44.0848 12.6852 44.0848 16.1305H32.2023V16.1109ZM39.3866 13.2333C39.3671 12.6069 39.2496 12.0587 39.0538 11.5693C38.8581 11.0799 38.584 10.6884 38.2708 10.3752C37.938 10.062 37.5661 9.82708 37.155 9.67047C36.7243 9.51387 36.2936 9.43556 35.863 9.43556C34.9625 9.43556 34.1599 9.76835 33.4943 10.4339C32.8287 11.0995 32.4568 12.0196 32.3589 13.2137H39.3866V13.2333ZM57.416 23.5498L57.3768 21.4551C56.3197 23.1582 54.7341 24 52.5808 24C51.4845 24 50.4861 23.7847 49.5661 23.3736C48.646 22.9429 47.863 22.3556 47.217 21.553C46.571 20.77 46.0424 19.7912 45.6705 18.6558C45.2985 17.5204 45.1028 16.2284 45.1028 14.7602C45.1028 13.4486 45.2594 12.2545 45.5726 11.1778C45.8858 10.1011 46.3556 9.1615 46.9625 8.35889C47.5693 7.55628 48.3132 6.94943 49.1941 6.51876C50.075 6.08809 51.0734 5.87276 52.1892 5.87276C54.3034 5.87276 56.0261 6.77325 57.2985 8.57423V0H61.801V23.5302H57.416V23.5498ZM53.6379 20.2806C54.7341 20.2806 55.6542 19.8303 56.3785 18.9103C57.1224 18.0098 57.4747 16.8157 57.4747 15.3279C57.4747 11.5889 56.2023 9.7292 53.6574 9.7292C51.0343 9.7292 49.7423 11.5106 49.7423 15.0538C49.7423 16.6003 50.1142 17.8532 50.8385 18.8124C51.5628 19.8108 52.4829 20.2806 53.6379 20.2806ZM63.7194 23.5498V7.73246C64.4046 8.06525 65.1876 8.26101 65.9902 8.26101C66.8124 8.26101 67.5759 8.06525 68.261 7.73246V23.5498H63.7194ZM70.199 23.5498V0H74.6819V8.55465C75.9739 6.75367 77.677 5.85318 79.7912 5.85318C80.907 5.85318 81.9054 6.06852 82.7863 6.49918C83.6672 6.92985 84.4111 7.5367 85.018 8.33931C85.6248 9.14192 86.0751 10.062 86.3883 11.1582C86.7015 12.2545 86.8581 13.4486 86.8581 14.7406C86.8581 16.1892 86.6623 17.4812 86.2904 18.6362C85.9184 19.7716 85.4095 20.7504 84.7439 21.5334C84.0979 22.3361 83.2953 22.9429 82.3752 23.354C81.4551 23.7847 80.4568 23.9804 79.3801 23.9804C77.2268 23.9804 75.6411 23.1387 74.584 21.4356L74.5449 23.5302H70.199V23.5498ZM78.3622 20.2806C79.4976 20.2806 80.4372 19.7912 81.1615 18.832C81.8858 17.8532 82.2382 16.6003 82.2382 15.0734C82.2382 11.5302 80.9266 9.74878 78.323 9.74878C75.7782 9.74878 74.5057 11.6085 74.5057 15.3475C74.5057 16.8157 74.8777 18.0098 75.602 18.9299C76.3458 19.8303 77.2659 20.2806 78.3622 20.2806ZM88.385 23.5498V0H92.9266V23.5302H88.385V23.5498ZM106.062 13.2333C106.042 12.6069 105.925 12.0587 105.729 11.5693C105.533 11.0799 105.259 10.6884 104.946 10.3752C104.613 10.062 104.241 9.82708 103.83 9.67047C103.419 9.51387 102.989 9.43556 102.538 9.43556C101.638 9.43556 100.835 9.76835 100.17 10.4339C99.5041 11.0995 99.1321 12.0196 99.0343 13.2137H106.062V13.2333Z" fill="#2856A2"/>
                    </svg>

                    <a
                      href={CREDIBLE_TRUSTPILOT.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 text-xs text-slate-600 hover:text-primary transition-colors shrink-0"
                    >
                      <TrustpilotStars rating={CREDIBLE_TRUSTPILOT.rating} />
                      <span className="font-semibold text-slate-900">{CREDIBLE_TRUSTPILOT.rating}</span>
                      <span>on Trustpilot</span>
                      <span className="text-slate-400 hidden sm:inline">
                        · {CREDIBLE_TRUSTPILOT.reviewCount.toLocaleString()} reviews
                      </span>
                    </a>
                  </div>
                  <p className="text-[10px] text-slate-400 mb-6">
                    Rating from Trustpilot, an independent review site — not Apruvee's assessment. As of{" "}
                    {CREDIBLE_TRUSTPILOT.asOf}.
                  </p>

                  <div className="grid grid-cols-3 gap-4 mb-6 p-4 bg-slate-50 rounded-xl">
                    <div>
                      <p className="text-xs text-slate-500 mb-1">APR</p>
                      <p className="font-semibold text-slate-900">As low as 7.99%*</p>
                    </div>
                    <div>
                      <p className="text-xs text-slate-500 mb-1">Loan Amount</p>
                      <p className="font-semibold text-slate-900">$1,000 – $200,000</p>
                    </div>
                    <div>
                      <p className="text-xs text-slate-500 mb-1">Term</p>
                      <p className="font-semibold text-slate-900">3–7 yr</p>
                    </div>
                  </div>

                  <p className="text-xs text-slate-500 mb-4">
                    *With autopay.{" "}
                    <a href="/advertiser-disclosure" className="text-primary hover:underline">See terms</a>.
                    {/* TODO: point at Credible's dedicated Rates & Terms Disclosure page once it exists on-site */}
                  </p>

                  <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                    <ul className="space-y-1 w-full md:w-auto">
                      <li className="flex items-center gap-2 text-sm text-slate-600">
                        <Check className="w-4 h-4 text-green-500 shrink-0" />
                        Compare rates from multiple lending partners
                      </li>
                      <li className="flex items-center gap-2 text-sm text-slate-600">
                        <Check className="w-4 h-4 text-green-500 shrink-0" />
                        Checking your rate won't impact your credit score
                      </li>
                    </ul>
                    <a
                      href={credibleUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={() =>
                        trackLenderClicked({
                          lenderName: "Credible",
                          lenderRank: rankOffsets.credible + 1,
                          minRate: 7.99,
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

                  <p className="text-[11px] text-slate-400 mt-4">
                    Featured based on our partnership tier.{" "}
                    <a href="/advertiser-disclosure" className="text-slate-500 hover:underline">
                      See how we work with partners
                    </a>.
                  </p>

                  <LenderSavingsPanel
                    lenderName="Credible"
                    defaultNewApr={CREDIBLE_RATE}
                    defaultOpen={true}
                    loanAmount={loanAmount}
                    variant="hero"
                  />
                </div>
              </div>

              {/* Sort explainer */}
              <div className="bg-white rounded-xl border border-slate-200 px-4 py-3 text-xs text-slate-500">
                <p>
                  Partner offers are shown in the order below, which may be influenced by our compensation.{" "}
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
              ) : totalOfferCount === 0 ? (
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

                  {/* ── Lead Stack affiliate cards ──────────────────────────────────────
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
                                  lenderRank: rankOffsets.leadStack + index + 1,
                                  minRate: offer.minRate,
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

                          <LenderSavingsPanel
                            lenderName={offer.name}
                            defaultNewApr={offer.minRate}
                            defaultOpen={false}
                            loanAmount={loanAmount}
                            variant="card"
                          />
                        </div>
                      </div>
                    );
                  })}

                  {/* ── Round Sky — always after Lead Stack ───────────────────────────
                      Uses sessionClickId via subId3 for postback tracking.
                  ─────────────────────────────────────────────────────────────────── */}
                  {roundSkyOffer && (() => {
                    const offer = roundSkyOffer;
                    const affiliateUrl = buildAffiliateUrl(offer, sessionClickId);
                    const rankPosition = rankOffsets.roundSky + 1;

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

                          <LenderSavingsPanel
                            lenderName={offer.lenderName}
                            defaultNewApr={offer.minRate}
                            defaultOpen={false}
                            loanAmount={loanAmount}
                            variant="card"
                          />
                        </div>
                      </div>
                    );
                  })()}

                  {/* ─────────────────────────────────────────────────────────────────
                      REMOVED SECTION (Aug 2026): "Non-paid direct lender offers"
                      This used to render sortedOffers — lenders with no affiliate
                      agreement and no tracked link, each carrying a disclaimer that
                      Apruvee had no relationship with them. They generated $0 revenue,
                      showed unverified rates lower than Credible's approved rate, and
                      required unauthorized-looking lender-initial circles in place of
                      real logos. Removed entirely rather than re-skinned. Re-add a
                      card here only once a lender has signed and has a real tracked
                      affiliate URL — at that point add it to offerSections above and
                      give it its own card block, same pattern as Round Sky.
                  ─────────────────────────────────────────────────────────────────── */}

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
