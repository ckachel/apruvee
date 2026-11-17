// ─── Lead quality tiers ────────────────────────────────────────────────────────
// Decides which partners a lead is routed to and what it's worth to Google Ads.
//
// Background (Oct 2026): Credible's partner report for Aug 18 – Oct 28 showed
// 1 of 334 completed prequalification forms "Qualified for Rates" (0.3%),
// with a median requested amount of $2,500. Sending every lead to Credible
// wastes their PQ flow on users their lending partners won't prequalify, and
// trains Google Ads to buy more of them. Only send Credible the users their
// lending partners are likely to prequalify; route everyone else to partners
// built for smaller / lower-credit requests (Lead Stack, Round Sky).
//
// Thresholds are deliberately simple so they're easy to tune from data.

export type LeadTier = "credible_eligible" | "standard";

export const CREDIBLE_MIN_LOAN_AMOUNT = 5000;

// Purposes that match Credible's debt-consolidation product and Apruvee's
// core audience.
const CREDIBLE_PURPOSES = ["debt consolidation", "credit card payoff"];

// Self-reported bands at or above 640. Values differ between the two forms
// ("Good" on /apply vs "Good 680-719" on /apply-lp), so match on prefix.
const CREDIBLE_CREDIT_BANDS = ["excellent", "good", "fair"];

// Google Ads conversion values per tier. Relative, not literal revenue:
// they tell Smart Bidding a Credible-eligible lead is worth ~8x a standard
// one. Revisit once Credible Qualified/Closed data is joined back to clicks.
export const TIER_VALUES: Record<LeadTier, number> = {
  credible_eligible: 25,
  standard: 3,
};

export type LeadProfile = {
  loanAmount?: number | null;
  creditScore?: string | null;
  loanPurpose?: string | null;
};

export function isCredibleEligible({ loanAmount, creditScore, loanPurpose }: LeadProfile): boolean {
  if (!loanAmount || loanAmount < CREDIBLE_MIN_LOAN_AMOUNT) return false;
  const credit = (creditScore ?? "").toLowerCase().trim();
  if (!CREDIBLE_CREDIT_BANDS.some((band) => credit.startsWith(band))) return false;
  const purpose = (loanPurpose ?? "").toLowerCase().trim();
  if (!CREDIBLE_PURPOSES.includes(purpose)) return false;
  return true;
}

export function getLeadTier(profile: LeadProfile): LeadTier {
  return isCredibleEligible(profile) ? "credible_eligible" : "standard";
}
