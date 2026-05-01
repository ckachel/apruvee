# FlexOffers Publisher Reapplication — Pre-Filled Packet

> Copy/paste packet for **resubmitting** the FlexOffers publisher application
> for **apruvee.com** after the 60–90 day cool-off that started with the
> April 28, 2026 decline. The actual submission has to be done by you — the
> form requires identity, ToS acceptance, and tax info that an automated
> agent cannot provide. Everything below is ready to paste so the resubmission
> itself takes ~10 minutes.
>
> **Do not submit before late June 2026.** See the Timing section below.
> **Do not reference the prior decline anywhere in the form.** Treat it as a
> fresh application.

## Verified URL (read first)

The legacy registration URL `https://publisher.flexoffers.com/Registration/PublisherSignup`
**302-redirects** to FlexOffers' current Publisher Pro V3 portal at
`https://publisherprobeta.flexoffers.com/`. The marketing entry point at
`https://www.flexoffers.com/sign-up/` does the same redirect via
`/goal/publisher/?r=https%3A%2F%2Fpublisherprobeta.flexoffers.com%2Fsignup%2FaccountInfo`.

| URL | Status (verified) | Use it for |
|---|---|---|
| `https://www.flexoffers.com/sign-up/` | 200 — routes to publisher signup | **Recommended entry point.** Click "Sign Up" → publisher path. |
| `https://publisherprobeta.flexoffers.com/signup/accountInfo` | 200 | Direct link to the application form. |
| `https://publisher.flexoffers.com/Registration/PublisherSignup` | 302 → `publisherprobeta` | Old URL; works but not canonical. |
| `https://www.flexoffers.com/affiliate-program-signup/` | **404** | Do **not** link/cite this anywhere. |
| `https://www.flexoffers.com/publisher-signup/` | **404** | Do **not** link/cite this anywhere. |
| `https://www.flexoffers.com/become-an-affiliate/` | **404** | Do **not** link/cite this anywhere. |

If `publisherprobeta.flexoffers.com` is renamed by the time you reapply
(e.g. dropping the `beta`), follow the redirect from `www.flexoffers.com/sign-up/`
— that page is the durable entry point.

## Timing — earliest submit date

The decline was **April 28, 2026**. Cool-off windows used by the major
networks:

| Cool-off | Earliest acceptable submit | Recommended submit |
|---|---|---|
| 60 days | **June 27, 2026** | OK if all prerequisites are green |
| 75 days | July 12, 2026 | Default safe target |
| 90 days | July 27, 2026 | Use if site has had any compliance issues since the decline |

**Default target: between July 1 and July 20, 2026.** That puts you safely
past 60 days and still inside the 90-day window where the application is
treated as a clean resubmission rather than a "you waited so long it's ancient
history" case.

Do **not** submit earlier than June 27, 2026 even if everything else is
ready. Resubmitting inside the 60-day window is the single most reliable way
to draw a second auto-decline.

## Pre-flight checklist (must be green before submitting)

Run through this list the day you plan to resubmit. If any item is red, fix
it first or delay the submission another 1–2 weeks. The whole point of the
cool-off was to clear these.

### Legal / business

- [ ] **Apruvee, LLC active in NC.** Check at
      https://www.sos.nc.gov/online_services/search/by_title/_Business_Registration
      → status must be "Current-Active." (Tracked by the `file-nc-llc.md` task.)
- [ ] **NC LLC ID number visible in site footer** on apruvee.com. (Tracked by
      the "Add NC LLC ID number to the site footer once approved" task.)
- [ ] **EIN issued by the IRS.** SS-4 confirmation letter on hand for the
      W-9 step. (Tracked by the "Get a federal tax ID (EIN) for Apruvee, LLC"
      task. Sole-prop fallback with SSN is acceptable but weaker.)
- [ ] **Business bank account open** in Apruvee, LLC's name for ACH payout.
      (Tracked by the "Open a dedicated business bank account" task.)
- [ ] **Business email live** at `chris@apruvee.com` (Zoho Mail). Used as the
      account email and contact on the form.

### Site (apruvee.com)

- [ ] Site loads on HTTPS, no broken/stale "Coming soon" pages.
- [ ] **Privacy Policy, Terms, Affiliate Disclosure** all present and reachable
      from the footer.
- [ ] Affiliate / marketplace disclosure visible **above the fold** on the
      homepage (banner or short line above the offer table).
- [ ] **At least 4–5 published long-form articles** live, not "lorem ipsum."
      Articles 1–5 should be done by this point (`article-2…article-5` tasks +
      the seed Article 1).
- [ ] No payday / title / debt-settlement-only offers featured. Mix is
      personal loans + adjacent credit-card / credit-monitoring offers.
- [ ] Contact info on the site matches the application (same business address,
      phone, email).

### Traffic / proof

- [ ] **GA4 + Search Console + Bing Webmaster** verified and recording at
      least the prior 30 days of traffic. (Tracked by `setup-site-analytics.md`.)
- [ ] Even modest traffic — a few hundred sessions — is enough; the goal is
      "we are not vaporware," not "we are huge."

### Network social proof (the lever the cool-off was supposed to add)

You only need **one Tier-1 network approval** to cite, but more is better.
Any of the following counts as the "approval in hand" the task description
calls for:

- [ ] **CJ Affiliate** (publisher account approved) — `apply-cj-affiliate.md`
- [ ] **ShareASale** (publisher account approved) — `apply-shareasale.md`
- [ ] **Pepperjam / Ascend** (publisher account approved) —
      `apply-pepperjam.md`
- [ ] **Impact** (publisher account approved) — separate backlog task
- [ ] **A direct lender program** (Best Egg or Upgrade direct) —
      `apply-best-egg.md`, `apply-upgrade.md`

If **zero** Tier-1 approvals are in hand by July 27, 2026 (90-day mark), do
**not** reapply yet. Spend two more weeks landing one of CJ / ShareASale /
Pepperjam first — that single line in the application is the largest lever
you have to flip the decision.

## Field-by-field packet

### Account / Contact

| Field | Value |
|---|---|
| Account type | Company / LLC (use Individual only if EIN is still pending) |
| Company name | Apruvee, LLC |
| First name | Chris [your legal first name] |
| Last name | [your legal last name] |
| Email | chris@apruvee.com |
| Phone | (919) 518-9294 |
| Address line 1 | 4030 Wake Forest Road, STE 349 |
| City | Raleigh |
| State | NC |
| ZIP | 27609 |
| Country | United States |
| Tax ID / EIN | (paste from IRS SS-4 letter) |
| NC entity ID | (paste from NC SOS — also shown in site footer) |

### Site / Property

| Field | Value |
|---|---|
| Primary website URL | https://apruvee.com |
| Site name | Apruvee |
| Site category | Personal Finance → Loans / Debt Consolidation |
| Country of audience | United States |
| Primary language | English |
| Monthly unique visitors | (paste the prior-30-day GA4 sessions number — be honest; FlexOffers will spot-check) |
| Site age | (paste real launch date) |

### Site description (paste verbatim — ~490 chars, fits typical 500-char limits)

> Apruvee (apruvee.com) is a U.S. personal-loan comparison marketplace
> focused on debt consolidation and credit-card refinancing. Visitors answer
> a short pre-qualification flow and see soft-pull offers from vetted lending
> partners with no impact to their credit score. The site publishes
> educational content on consolidation, soft vs. hard credit pulls, APR
> math, and lender comparisons. Apruvee is operated by Apruvee, LLC (NC) and
> is compensated by lending partners on referred originations. Marketplace,
> not a lender.

### Promotional methods (check all that apply)

- [x] **Content / SEO** — primary. Long-form editorial on consolidation,
      credit scores, soft credit pulls, APR comparisons.
- [x] **Paid Search (SEM)** — Google, Microsoft, Meta accounts active.
      Brand-safe, non-incentivized keyword traffic to landing pages.
- [x] **Comparison / Marketplace** — site is a rate-comparison marketplace
      with prominent disclosure.
- [ ] Email — not at launch (no list yet). Leave unchecked; do **not** check
      this just to look bigger — FlexOffers asks for a sample and a list size
      and will catch it.
- [ ] Coupon / Deal sites — N/A
- [ ] Loyalty / Cashback — N/A
- [ ] Mobile app — N/A
- [ ] Social media organic — minimal at launch
- [ ] Push / Pop / Native arbitrage — **never** check; auto-decline.

### Promotional method description (paste verbatim)

> Primary channels are SEO content and paid search. Editorial articles target
> high-intent debt-consolidation queries (e.g. "personal loan vs. balance
> transfer card", "credit score for consolidation loan"). Paid search drives
> non-branded keyword traffic to a comparison landing page. Offers are
> presented in a marketplace format with clear affiliate disclosure in the
> footer and a marketplace disclosure above the offer table on the homepage.
> We do not use email blasts, incentivized traffic, toolbars, adware, push
> arbitrage, or trademark bidding on partner brands.

### Verticals / advertiser categories of interest

Select these when prompted (FlexOffers lets you pick several):

1. Financial Services → Personal Loans
2. Financial Services → Credit Cards (for balance-transfer card offers)
3. Financial Services → Credit Monitoring / Credit Scores
4. Financial Services → Debt Relief / Credit Repair (only if you want
   those offers — many are higher-pressure and may clash with site tone)
5. Financial Services → Banking / Savings (optional, light fit)

### "How did you hear about us?" / referrer

Pick the most accurate non-blank option (e.g. "search engine" or
"industry referral"). Do not pick "Other" with a blank text field — some
networks treat that as a low-quality signal.

### Social media

- LinkedIn / X / Facebook URLs: leave blank if not yet set up. Do **not**
  invent handles — FlexOffers does click them. Better to leave blank than
  link to a placeholder.

### Payment / Tax

- **Payment method:** Direct deposit (ACH) into the Apruvee, LLC business
  account. PayPal as backup if FlexOffers offers it.
- **Payee name:** Apruvee, LLC (must match the W-9 and the bank account).
- **W-9:** Required after approval. LLC = EIN. Sole prop fallback = SSN.
- **Payment threshold:** Default ($25 or $50 — accept the default).

### Terms checkboxes

- [x] Publisher Agreement
- [x] Privacy Policy
- [x] Anti-spam / FTC compliance attestation (whatever exact label
      FlexOffers uses)

## What to highlight differently this time (vs. the April 28 submission)

The single biggest change between the declined application and this one
should be **proof points that did not exist on April 28**. Make sure these
land somewhere a human reviewer will see them — usually the "Site description"
and "Promotional method description" boxes, but also any free-text
"Anything else we should know?" field.

Lead with the strongest proof you have. In rough order of weight:

1. **Apruvee, LLC is now an active North Carolina LLC** with EIN on file.
   (April submission was a sole prop / pre-LLC application.)
2. **Approved publisher with [CJ / ShareASale / Pepperjam / Impact]** —
   name the strongest one.
3. **Direct lender relationship with [Best Egg / Upgrade / etc.]** if you
   have it.
4. **Live traffic** — quote the prior-30-day GA4 sessions number (even if
   modest). "Indexed in Google + Bing, X sessions/mo" beats "pre-launch."
5. **Published editorial library** — name the article count and 1–2 titles.

Short paragraph you can paste into a free-text "Notes" field if FlexOffers
provides one (it sometimes does at the end of the form):

> Apruvee, LLC (North Carolina) operates apruvee.com, a U.S. personal-loan
> comparison marketplace. Since opening operations we've been approved as a
> publisher with [NETWORK NAME] and have a direct affiliate relationship
> with [LENDER NAME]. The site has [N] published editorial articles on
> consolidation and credit topics and is currently averaging [N] sessions
> per month from organic search, with paid search rolling out across
> Google / Microsoft / Meta. Marketplace disclosure is above the fold on
> the homepage and a full Affiliate Disclosure page is linked from the
> footer. We do not run email blasts, push/pop arbitrage, or trademark
> bidding.

If FlexOffers does **not** give you a free-text field, fold the same points
into the Site description and Promotional method description fields above —
that's why the suggested copy already names "Apruvee, LLC (NC)" and the
marketplace disclosure.

## What NOT to do

- **Do not** mention or reference the April 28, 2026 decline anywhere in the
  application. There is no benefit and several downsides.
- **Do not** email FlexOffers (`publishersupport@flexoffers.com` or
  `compliance@flexoffers.com`) asking why the prior application was declined.
  The networks rarely give a reason and the inquiry is logged on your contact
  record.
- **Do not** create a second account under a different email "to start clean."
  FlexOffers cross-references EIN, domain, and IP. Duplicate accounts get
  permanently banned, not just declined.
- **Do not** check promotional methods you don't actually use to look bigger
  (especially Email and Push/Pop/Native).
- **Do not** inflate the monthly visitors number. FlexOffers spot-checks via
  SimilarWeb-class data; an inflated number is the most common single
  reason for a second decline.
- **Do not** apply directly to advertisers from a logged-out marketing page
  before you have a publisher account — every advertiser application requires
  the publisher account to already exist.

## Likely outcomes (with what to do for each)

- **Approved (most likely if Pre-flight is fully green).** Typical turnaround
  is 1–5 business days. Move on to the post-approval checklist below.
- **Pended for clarification.** FlexOffers will email a few questions
  (typical: traffic source breakdown, sample landing page, sample editorial
  URL). Reply within 24–48 hours from `chris@apruvee.com`. Reply rate
  matters more than reply length.
- **Declined a second time.** Get the specific decline reason in writing if
  any is provided (often there isn't). Then **stop reapplying for at least
  6 months** — at that point Impact + CJ + ShareASale + a couple of direct
  programs will give you full coverage of any advertiser FlexOffers carries,
  and a third FlexOffers application without major new proof points will
  burn the relationship for good. Document the reason in the Status section
  below so the next agent / teammate doesn't restart the cycle.

## Post-approval checklist

Once accepted, apply to these advertisers from the FlexOffers advertiser
directory. Search terms in parentheses.

**Personal loans (primary):**

- Best Egg ("best egg") — also a direct-program task; promote via whichever
  approves first; do not double-promote.
- Upgrade ("upgrade") — same caveat.
- LendingClub ("lendingclub")
- Prosper ("prosper")
- Achieve / FreedomPlus ("achieve" or "freedom")
- Happy Money / Payoff ("happy money")
- Universal Credit ("universal credit")
- SoFi ("sofi") — if a clean fit
- LightStream ("lightstream")

**Adjacent / supporting offers:**

- Credit Karma ("credit karma") — credit monitoring
- Experian ("experian") — credit monitoring
- Self ("self") — credit-builder loan
- Chime ("chime") — only if a clean fit

**Avoid for now (reputation risk + Google Ads policy risk):**

- Payday / title / cash advance advertisers.
- Hard-pitch debt-settlement advertisers that don't disclose program risks.

## Where to record the result

After submitting, log the outcome in the **Status** section at the bottom
of this file. When the decision arrives, add the date, approved/declined
status, your FlexOffers Publisher ID, and your assigned Account Manager's
name and email (FlexOffers assigns one on approval).

If approved, the post-approval checklist above becomes the next action.
If declined, log the reason verbatim and **do not** reapply for at least
6 months — see the "Likely outcomes" section above.

## Status

| Event | Date | Notes |
|---|---|---|
| First application submitted | ~April 2026 | — |
| First application declined | April 28, 2026 | Reason not provided by network |
| Cool-off window opens (60 days) | June 27, 2026 | Earliest acceptable resubmit |
| Default target resubmit window | July 1–20, 2026 | Pick a date inside this range once Pre-flight is green |
| Resubmission submitted | _pending — user action_ | Submit at https://www.flexoffers.com/sign-up/ → publisher path |
| Decision received | _pending_ | Approved / Pended / Declined |
| Publisher ID assigned | _pending_ | FlexOffers Publisher ID |
| Account manager | _pending_ | Name + email of assigned manager |
| First advertiser approval | _pending_ | First lender that approves |
