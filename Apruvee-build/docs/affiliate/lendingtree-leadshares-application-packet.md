# LendingTree "LeadShares" / Partner Program — Outreach Packet

> Copy/paste packet for opening a lead-aggregator / publisher relationship with
> **LendingTree LLC** for **apruvee.com**. The actual outreach has to be done
> by you — there is no public LeadShares portal anymore. Everything below is
> ready to paste so the send itself takes ~10 minutes.

## URL correction (important — read first)

The original task said:

> _"Application submitted at lendingtree.com/business/leadshares (or via business
> development contact)"_

That URL **does not exist** in 2026, and `/business/` is a different program
than the task assumes. Verified by direct fetch on the date this packet was
written:

| URL | Result | What it actually is |
|---|---|---|
| `https://www.lendingtree.com/business/leadshares` | **404** | — |
| `https://www.lendingtree.com/business/leadshares/` | **404** | — |
| `https://www.lendingtree.com/leadshares` | **404** | — |
| `https://www.lendingtree.com/marketing-services/` | **404** | — |
| `https://www.lendingtree.com/affiliates/` | **404** | — |
| `https://www.lendingtree.com/business/` | 200 | **Consumer-facing small business loan marketplace.** Not partnerships. Do not pitch here. |
| `https://www.lendingtree.com/about/partner-with-us/` | 200 | The real partner intake page — but pitched at **lenders joining LendingTree's network**, not publishers supplying leads. See note below. |
| `https://www.lendingtree.com/about/contact-us/` | 200 | General contact page. No partnerships-specific address. |

**"LeadShares" appears to be a deprecated brand.** Historically, LendingTree
ran a secondary lead-buying program under names like "LeadShares" and
"LendingTree Exchange" where qualified borrower leads from third-party
publishers could be sold per-accepted-lead. As of this packet, that program is
no longer publicly marketed. The closest surviving public intake is the
"Partner With Us" CTA on `/about/partner-with-us/`, which currently positions
the relationship in the **opposite** direction (asking lenders to buy
LendingTree's leads, not asking publishers to sell theirs).

This is not a blocker — these B2B lead-supply relationships are negotiated
1:1 by LendingTree's media / acquisition team. It just means the send has to
explicitly call out that we are a **publisher / lead supplier**, not a lender,
or the inquiry will get routed to the wrong internal team.

## Be careful with these "contacts" (do NOT use)

Two tempting-looking contacts surfaced during research that you should
explicitly **avoid**:

1. **`skoubek@tree.com`** — appears in the page source of
   `/about/partner-with-us/`. It is **not** a partnerships address; it's a
   WordPress page-owner / analytics tag (`authors: "skoubek@tree.com"` inside
   the page's `ltanalytics.page(...)` payload). Sending a partnerships pitch
   there will at best be ignored and at worst look sloppy.
2. **`+1-800-505-7916`** — the toll-free number in LendingTree's
   organization schema. This is **customer service** (consumers calling about
   their loan applications). Do not call this line for partnerships. It will
   be routed to a borrower-support queue.

## Verified corporate context (use in outreach if helpful)

Pulled from the public Yoast/Schema.org JSON-LD on
`/about/partner-with-us/`:

- **Legal name:** LendingTree LLC
- **HQ address:** 1415 Vantage Park Drive, Suite 700, Charlotte, NC 28203
- **Founder:** Doug Lebda (1996)
- **Public ticker:** TREE (NASDAQ) — they're a public company; partnerships
  decisions trend toward CPL/CPA economics with disclosed compliance review
- **Position pulled from the page itself (verbatim copy):**
  > "Get quality leads. Grow your customer base. We've helped connect
  > customers to financial products like yours for 30 years… High intent
  > leads you won't find anywhere else… Canopy Lender Portal… Spring
  > personal finance platform."
- **Public CTA endpoint:** the "Partner With Us" button on the partner page
  routes through `https://splitter.lendingtree.com/api/split?id=PartnerWithUs`
  — i.e. it's a tracked split-test entry into their internal partner intake
  flow, not a static mailto. **This is the canonical public submission
  path.** Click the button on the live page; do not try to call the splitter
  URL directly.

## Channels to use (in send order)

### Channel 1 — Public "Partner With Us" submission (primary)

1. Open `https://www.lendingtree.com/about/partner-with-us/`.
2. Scroll to the "Become a partner today" CTA at the bottom (and the matching
   one in the header) and click **Partner With Us**.
3. Complete the resulting intake form. **In every free-text field, lead with
   the phrase "publisher / lead supplier"** so the inquiry gets routed to
   LendingTree's lead-acquisition / media team rather than the lender
   onboarding team.
4. Use the field copy in the **Form copy** section below.
5. Take a screenshot of the confirmation page (or copy the confirmation
   number) and paste it in the Status section at the bottom of this file.

### Channel 2 — LinkedIn (parallel, highest signal for getting a real human)

LendingTree's verified LinkedIn page is:

- **LendingTree:** https://www.linkedin.com/company/lendingtree/

Steps:

1. From that company page, filter People → search keywords:
   `lead acquisition`, `media buying`, `affiliate`, `publisher`,
   `partnerships`, `growth`, `business development`, `marketplace`.
2. Identify **2 people maximum**. Look for titles like "Director of
   Partnerships", "Affiliate Marketing Manager", "Head of Lead Acquisition",
   "Media Buying Manager", or "Strategic Partnerships". Prefer someone who
   has been at the company > 12 months and lists Charlotte, NC.
3. Send a connection request with a 300-character personalized note
   (template below). Do **not** mass-spam multiple people in the same week —
   fintech partnerships teams talk to each other; one focused, well-written
   ask wins.
4. If they accept, follow up via DM with the longer body in the **Outreach
   copy** section.
5. If no response in 7 business days, send InMail (paid) — same body,
   slightly shorter open.

### Channel 3 — General contact form (last resort)

`https://www.lendingtree.com/about/contact-us/` is the only published contact
surface besides the partner page. If both Channel 1 and Channel 2 silently
die after 14 business days, submit the same body via the general contact
form with the subject line:

> "FAO: Lead Acquisition / Publisher Partnerships — apruvee.com inquiry"

Low yield, but non-zero, and it creates a paper trail.

## Compliance pre-flight (this is what they actually score)

LendingTree's lead-buying compliance review is more rigorous than a typical
affiliate-network application. They specifically check:

| Check | apruvee.com status | Where to point them |
|---|---|---|
| TCPA express written consent box on the apply form | ✅ Implemented | `artifacts/loanmatch/src/pages/apply.tsx` (Step 7, "Final step: Secure consent" — checkbox + "By clicking 'See My Rates', I provide my electronic signature and express written consent…") |
| Consent language explicitly covers automated dialing, prerecorded messages, text messages, and DNC override | ✅ Implemented | Same file, line ~400, full statutory phrasing |
| "Consent is not a condition of purchase" disclaimer | ✅ Implemented | Same paragraph, plus reinforced in `privacy.tsx` §5 and `terms.tsx` §7 |
| Privacy Policy with a TCPA section | ✅ Implemented | `artifacts/loanmatch/src/pages/privacy.tsx` §5 "Telephone and Text Message Consent (TCPA)" |
| Terms of Service with a TCPA section | ✅ Implemented | `artifacts/loanmatch/src/pages/terms.tsx` §7 |
| Marketplace disclosure on the homepage (we are not a lender) | ✅ Implemented | `artifacts/loanmatch/src/pages/home.tsx` line 11 ("Apruvee is a marketplace, not a lender.") + footer in `components/layout/footer.tsx` line 62 |
| State of residence captured before lead submission | ✅ Implemented | `artifacts/loanmatch/src/pages/apply.tsx` (state dropdown is a required field on Step 6) |
| Soft credit pull disclosure on the apply funnel | ✅ Implemented | Apply form copy: "Apruvee is a marketplace, not a lender. We use a soft credit inquiry to…" |
| No incentivized signups, no toolbars, no email blasts | ✅ True today | Confirm in pitch |
| No trademark bidding on partner brands in paid search | ✅ Will commit to | Confirm in pitch — paid accounts not yet open (separate task) |
| Real U.S. business entity with verifiable address | ✅ Apruvee, LLC (NC) | NC LLC filed; EIN application **in progress** (separate task) — disclose this honestly |
| Per-state lender suppression / state-level offer filtering | ⚠️ **Gap.** Currently the marketplace shows the same offer set to all users; the state field is captured but not yet used to filter offers. There is an open task for this (`Filter loan offers by the user's state…`). | Disclose this honestly. LendingTree will accept "in flight" if you can quote a delivery date. |
| Independent compliance audit / SOC 2 | ⚠️ Not yet | Disclose. Not required at this stage. |
| Live traffic numbers | ⚠️ Pre-launch / ramping | Be honest. LendingTree will not approve a sandbagged number; they will approve an honest small one. |

**Action item before you submit:** quote a target delivery date for the
state-based offer filter (the open `apply-statefiltering`-style task) in your
outreach so LendingTree's compliance reviewer sees that the gap is in flight,
not ignored.

## Outreach copy

### Public form / "Partner With Us" submission (Channel 1)

When the LendingTree intake form asks **what type of partner you are**,
choose the option closest to "Publisher", "Affiliate", "Lead Provider", or
"Marketing Partner". If only "Lender" is offered, choose "Other" and use the
free-text field below to clarify.

**Free-text "tell us about your business" field (paste verbatim, trim if a
character limit applies):**

> Apruvee (https://apruvee.com) is a U.S. personal-loan comparison
> marketplace focused on debt consolidation and credit-card refinancing.
> We are a **publisher / lead supplier**, not a lender — we'd like to be
> evaluated for a CPL / per-accepted-lead relationship where qualified
> borrower leads from our funnel are sent to LendingTree under your
> compliance and tracking standards (the historical "LeadShares" model).
>
> Quick compliance facts so you can size us:
> - TCPA express written consent box on the apply form (full statutory
>   language: automated dialing, prerecorded messages, SMS, DNC override,
>   "consent is not a condition of purchase").
> - Privacy Policy and Terms of Service each carry a dedicated TCPA section.
> - State of residence is a required field before any lead is submitted.
> - Marketplace disclosure is on the homepage, footer, apply form, About,
>   and FAQ — we make explicit on every surface that we are not a lender.
> - No incentivized signups, no toolbars, no email blasts, no trademark
>   bidding on partner brands.
> - Entity: Apruvee, LLC (North Carolina). EIN in progress; W-9 / ACH
>   ready to submit on approval.
> - Stage: pre-launch traffic, ramping. Channels are SEO content (primary)
>   and paid search on Google / Microsoft / Meta (launching shortly).
>
> Known in-flight gap to disclose up front: per-state lender suppression
> is not yet wired (we capture state on the form, but offers are not yet
> filtered by state). That work is scheduled and will ship before any
> live LendingTree integration goes hot.
>
> Best contact: Chris, founder — chris@apruvee.com.

### LinkedIn connection note (≤ 300 chars) (Channel 2)

> Hi [First Name] — I run apruvee.com, a U.S. personal-loan comparison
> marketplace focused on debt consolidation. We're a publisher / lead
> supplier (not a lender) and would like to be evaluated for a per-accepted-
> lead relationship with LendingTree. Open to a quick chat?

### LinkedIn DM follow-up / Email body (Channel 2 follow-up + Channel 3 fallback)

> **Subject:** Publisher / lead-supply partnership — apruvee.com (debt
> consolidation marketplace)
>
> Hi [First Name or LendingTree Lead Acquisition Team],
>
> I'm Chris, founder of **Apruvee** (https://apruvee.com), a U.S.
> personal-loan comparison marketplace focused on debt consolidation and
> credit-card refinancing.
>
> I'd like to be evaluated for a **publisher / lead-supplier**
> relationship with LendingTree — i.e. qualified borrower leads from our
> funnel sent to LendingTree under your compliance and tracking standards
> (the historical "LeadShares" model). I'm reaching out directly because
> the public partner page reads as if it's targeted at lenders joining the
> network, and I want to make sure this lands with the right team
> (lead acquisition / media buying), not lender onboarding.
>
> Quick facts so you can size us:
>
> - **Site:** https://apruvee.com — live, with full legal pages (privacy,
>   terms with dedicated TCPA sections), marketplace banner on the
>   homepage and in the footer, real U.S. business address, real phone,
>   and editorial articles on consolidation, soft vs. hard credit pulls,
>   APR math, and a worked debt-consolidation calculator.
> - **Entity:** Apruvee, LLC (North Carolina). EIN in process. W-9 / ACH
>   ready to submit on approval.
> - **Audience:** U.S. consumers, primarily in the FICO 640–740 band
>   looking to consolidate $5K–$50K in revolving debt. Geo: 50 states.
> - **Channels:** SEO content (primary) + paid search on Google / Microsoft
>   / Meta (launching shortly). No incentivized traffic, no toolbars, no
>   trademark bidding on partner brands, no email blasts.
> - **Stage:** Pre-launch traffic, ramping. We're being honest about that
>   — we'd rather start the relationship at the right size than sandbag.
>
> Compliance posture (this is what I'd expect you to score first):
>
> 1. TCPA express written consent box on the apply form, full statutory
>    language (automated dialing, prerecorded messages, SMS, DNC override,
>    "consent is not a condition of purchase").
> 2. Privacy Policy §5 "Telephone and Text Message Consent (TCPA)" and
>    Terms of Service §7 mirror the same disclosures.
> 3. State of residence is a required field on the apply form before any
>    lead can be submitted.
> 4. Marketplace status ("Apruvee is a marketplace, not a lender") is
>    disclosed on the homepage, footer, apply form, About page, and FAQ.
> 5. One known in-flight gap to disclose up front: **per-state lender
>    suppression is not yet wired** — we capture state on the form but
>    don't yet filter offers by state. That work is on the roadmap and
>    will ship before any LendingTree integration goes hot. Happy to
>    confirm a target date in writing.
>
> If LeadShares isn't an active product anymore, I'd appreciate a pointer
> to the current internal name for the publisher / per-accepted-lead
> program, so we can submit through the right intake. Even a "not yet,
> come back at X traffic" or "we don't take publisher leads anymore" is
> more useful to us than silence — we'll respect it and either reapply at
> the right level or pivot to your affiliate channel instead.
>
> Thanks for the read,
>
> **Chris [Last Name]**
> Founder, Apruvee, LLC
> chris@apruvee.com · (919) 518-9294
> https://apruvee.com · https://www.linkedin.com/in/[your-linkedin-handle]

Notes on this copy:

- Mirrors the Best Egg packet's tone (honest about pre-launch traffic,
  lead-with-compliance posture).
- Explicitly self-identifies as **publisher / lead supplier** in the first
  paragraph so internal routing doesn't dump the inquiry in the lender
  onboarding queue.
- Discloses the state-filter gap up front. Self-disclosed gaps with a
  delivery date carry far more weight with a compliance reviewer than gaps
  they have to find on their own.
- Closes with a "even a no is useful" line — partnerships teams reply to
  that far more often than to a pure ask.

## Where to record the result

After sending, log the outcome in the **Status** section below so the next
agent or teammate has a clear record. When a reply arrives, add the date,
the contact's name + title, the channel they want us to use (LeadShares
successor / affiliate / direct), and any partner ID, tracking template, or
documentation URLs they provide.

If approved, the next actions are:

1. Add LendingTree to the lender roster on apruvee.com per their tracking
   spec (server-to-server postback if offered; otherwise their hosted lead
   form).
2. Wire per-state lender suppression first — do not send live leads until
   the state filter is in place.
3. Update the homepage marketplace and the "best lenders for debt
   consolidation" article to reflect the live partnership.
4. If approval also comes through an affiliate channel (e.g. Impact),
   pick one channel of record and formally decline the other to avoid
   duplicate-publisher / double-attribution issues.

## Likely outcomes

- **No reply (most likely first pass).** Send the public form, follow with
  LinkedIn within 48h, wait 7 business days, send the InMail/email
  follow-up, wait another 7. If still silent, fall back to the general
  contact-us form and mark this task as "Closed — no response, deferred
  until apruvee.com has live traffic to lead with."
- **"We don't run a publisher / lead-supplier program anymore" reply.**
  Plausible — it would explain why "LeadShares" no longer has a public
  page. If this happens, ask for the affiliate channel they prefer (likely
  Impact) and re-route this task accordingly.
- **"Routed to lender onboarding by mistake" reply.** Watch for this —
  it's the most common failure mode given the public page is pitched at
  lenders. Politely re-clarify "publisher / lead supplier" and ask to be
  forwarded to the lead-acquisition team.
- **Approved.** Less likely pre-traffic but not impossible given the niche
  fit and clean compliance posture. If it happens, treat it as the
  anchor-tenant lead buyer for the launch.
- **Declined for traffic reasons.** Standard. Ask for the specific
  threshold in writing, log it here, and reapply at that traffic level.

## Status

| Event | Date | Notes |
|---|---|---|
| Public "Partner With Us" form submitted | _pending — user action_ | `lendingtree.com/about/partner-with-us/` → "Partner With Us" button. Capture confirmation number / screenshot. |
| LinkedIn outreach sent | _pending_ | LendingTree LinkedIn page; max 2 contacts; Charlotte HQ |
| Email / contact-form follow-up sent | _pending_ | Only if 14 business days of silence on Channels 1 & 2 |
| First reply received | _pending_ | Date + contact name/title + which internal team they routed to |
| Decision received | _pending_ | Approved / Declined / Routed to affiliate channel / No response |
| Partner ID / tracking template | _pending_ | Paste once provided |
| Documentation URLs (Canopy, postback spec, etc.) | _pending_ | Paste once provided |
