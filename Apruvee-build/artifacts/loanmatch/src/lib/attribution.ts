// ─── Landing-page attribution ──────────────────────────────────────────────────
// Captures ad-click attribution ONCE, from the URL the visitor first lands on,
// and keeps it in memory for the rest of the single-page session.
//
// Why this exists (Oct 2026): the apply forms navigate to /results with a
// brand-new query string (loanAmount/creditScore/loanPurpose only), so by the
// time results.tsx read window.location.search, utm_source/gclid were gone.
// Every Credible click therefore went out tagged utm_content=direct, and
// Credible's report showed Partner Passed ID = "direct" on every row — making
// it impossible to tie Credible outcomes back to Google Ads clicks.
//
// Storage: module-level variable only — no localStorage/sessionStorage (site
// rule). Wouter navigation is client-side, so module state survives the
// home → apply → results journey. A hard reload of /results loses it, which
// is acceptable (falls back to "direct", same as before).
//
// PII: none. Only ad-platform click IDs, UTM labels, and a random UUID.

export type Attribution = {
  /** Normalized channel label, e.g. "google", "microsoft", "direct". */
  channel: string;
  utmSource: string | null;
  utmMedium: string | null;
  utmCampaign: string | null;
  /** Google Ads click identifiers (only one is normally present). */
  gclid: string | null;
  gbraid: string | null;
  wbraid: string | null;
  /** Random per-visit ID passed to every partner as a sub ID. */
  clickId: string;
  landingPath: string;
};

// Aliases so partners see Apruvee's preferred channel names. Anything not
// listed passes through unchanged.
const CHANNEL_ALIASES: Record<string, string> = {
  bing: "microsoft",
  facebook: "facebook_ads",
  email: "crm",
};

function newClickId(): string {
  if (typeof crypto !== "undefined" && typeof crypto.randomUUID === "function") {
    return crypto.randomUUID();
  }
  // Fallback for very old browsers — not cryptographically strong, but this
  // is only a join key, not a secret.
  return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, (c) => {
    const r = (Math.random() * 16) | 0;
    return (c === "x" ? r : (r & 0x3) | 0x8).toString(16);
  });
}

function readFromUrl(): Attribution {
  const params =
    typeof window !== "undefined" ? new URLSearchParams(window.location.search) : new URLSearchParams();
  const get = (k: string) => {
    const v = params.get(k);
    return v && v.trim() ? v.trim() : null;
  };

  const utmSource = get("utm_source")?.toLowerCase() ?? null;
  const gclid = get("gclid");
  const gbraid = get("gbraid");
  const wbraid = get("wbraid");

  // Google Ads auto-tagging adds gclid/gbraid/wbraid even when UTMs are
  // missing (Performance Max often has no utm_source), so treat those as
  // "google" rather than "direct".
  let channel = "direct";
  if (utmSource) channel = CHANNEL_ALIASES[utmSource] ?? utmSource;
  else if (gclid || gbraid || wbraid) channel = "google";
  else if (get("msclkid")) channel = "microsoft";

  return {
    channel,
    utmSource,
    utmMedium: get("utm_medium"),
    utmCampaign: get("utm_campaign"),
    gclid,
    gbraid,
    wbraid,
    clickId: newClickId(),
    landingPath: typeof window !== "undefined" ? window.location.pathname : "/",
  };
}

let captured: Attribution | null = null;

/** Call once as early as possible (main.tsx). Safe to call repeatedly. */
export function captureAttribution(): Attribution {
  if (!captured) captured = readFromUrl();
  return captured;
}

/** Returns the landing attribution, capturing it now if it wasn't yet. */
export function getAttribution(): Attribution {
  return captured ?? captureAttribution();
}

/**
 * Lead Stack only accepts a small fixed set of source labels.
 * Maps the open-ended channel onto that set.
 */
export function getLeadStackSource(): string {
  const { channel } = getAttribution();
  if (channel.includes("google")) return "google";
  if (channel.includes("microsoft") || channel.includes("bing")) return "bing";
  if (channel.includes("facebook") || channel.includes("meta")) return "meta";
  if (channel.includes("organic") || channel === "seo") return "seo";
  return "direct";
}
