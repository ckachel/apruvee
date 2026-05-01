import { Link } from "wouter";
import { Clock, ArrowLeft, Calendar, CheckCircle2, XCircle } from "lucide-react";
import { PageWrapper } from "@/components/layout/page-wrapper";

export default function HowSoftCreditPullWorks() {
  return (
    <PageWrapper>
      <article className="bg-white">
        <header className="border-b border-slate-200 py-12 md:py-16">
          <div className="container mx-auto px-4 max-w-3xl">
            <Link
              href="/blog"
              className="inline-flex items-center gap-2 text-sm text-slate-500 hover:text-primary mb-6 transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              All resources
            </Link>
            <div className="flex flex-wrap items-center gap-3 mb-5 text-sm text-slate-500">
              <span className="px-2 py-1 bg-secondary text-primary rounded-md text-xs font-semibold">
                Credit Basics
              </span>
              <span className="flex items-center gap-1">
                <Clock className="w-3.5 h-3.5" />
                7 min read
              </span>
              <span>·</span>
              <span className="flex items-center gap-1">
                <Calendar className="w-3.5 h-3.5" />
                Published April 30, 2026
              </span>
            </div>
            <h1 className="text-4xl md:text-5xl font-extrabold text-slate-900 tracking-tight leading-tight mb-6">
              How a Soft Credit Pull Works (and Why It Doesn't Hurt Your Score)
            </h1>
            <p className="text-xl text-slate-600 leading-relaxed">
              "Will checking my rate hurt my credit?" is the single most common question we get
              from people considering a personal loan. The short answer is no — pre-qualification
              uses a soft credit pull, which has zero impact on your score. Here's exactly what's
              happening behind the scenes, what lenders see, and when a hard pull does come into
              play.
            </p>
          </div>
        </header>

        <div className="container mx-auto px-4 max-w-3xl py-12 md:py-16">
          <div className="prose prose-slate prose-lg max-w-none prose-headings:text-slate-900 prose-headings:tracking-tight prose-a:text-primary prose-a:no-underline hover:prose-a:underline prose-strong:text-slate-900">

            <h2>Soft pull vs. hard pull: the actual difference</h2>
            <p>
              Every time information leaves one of the three major credit bureaus (Equifax,
              Experian, and TransUnion), it's logged as an "inquiry." Inquiries come in two
              flavors, and only one of them affects your FICO score.
            </p>
            <p>
              A <strong>soft inquiry</strong> (also called a soft pull) happens when someone checks
              your credit for a reason other than evaluating a new loan or credit application.
              That includes you checking your own report, a lender pre-qualifying you for an offer,
              an employer running a background check (with your permission), or a credit card
              company seeing if you qualify for a promotional rate. Soft pulls show up only on
              the version of your credit report that <em>you</em> see — they're invisible to other
              lenders and they don't move your score by a single point.
            </p>
            <p>
              A <strong>hard inquiry</strong> (or hard pull) happens when you formally apply for
              new credit and the lender pulls your full report to decide whether to approve you.
              Mortgages, auto loans, credit cards, and the final step of a personal loan
              application all trigger hard pulls. They show up on your report for two years,
              they're visible to other lenders, and they typically lower your FICO score by about
              5–10 points for a few months.
            </p>

            {/* Myth vs Fact callout */}
            <div className="not-prose my-10 rounded-2xl border border-slate-200 overflow-hidden">
              <div className="bg-slate-900 text-white px-6 py-4">
                <h3 className="text-lg font-bold m-0">Myth vs. Fact</h3>
                <p className="text-sm text-slate-300 mt-1 mb-0">
                  The most common things people get wrong about checking their rate.
                </p>
              </div>
              <div className="divide-y divide-slate-200">
                <div className="grid md:grid-cols-2">
                  <div className="p-5 bg-rose-50 flex gap-3">
                    <XCircle className="w-5 h-5 text-rose-600 shrink-0 mt-0.5" />
                    <div>
                      <p className="font-semibold text-rose-900 mb-1 text-sm uppercase tracking-wide">Myth</p>
                      <p className="text-slate-700 text-base m-0">
                        "Checking my rate will tank my credit score."
                      </p>
                    </div>
                  </div>
                  <div className="p-5 bg-emerald-50 flex gap-3">
                    <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
                    <div>
                      <p className="font-semibold text-emerald-900 mb-1 text-sm uppercase tracking-wide">Fact</p>
                      <p className="text-slate-700 text-base m-0">
                        Pre-qualification uses a soft pull. Your score doesn't change at all.
                      </p>
                    </div>
                  </div>
                </div>
                <div className="grid md:grid-cols-2">
                  <div className="p-5 bg-rose-50 flex gap-3">
                    <XCircle className="w-5 h-5 text-rose-600 shrink-0 mt-0.5" />
                    <div>
                      <p className="font-semibold text-rose-900 mb-1 text-sm uppercase tracking-wide">Myth</p>
                      <p className="text-slate-700 text-base m-0">
                        "Other lenders can see every time I shop around."
                      </p>
                    </div>
                  </div>
                  <div className="p-5 bg-emerald-50 flex gap-3">
                    <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
                    <div>
                      <p className="font-semibold text-emerald-900 mb-1 text-sm uppercase tracking-wide">Fact</p>
                      <p className="text-slate-700 text-base m-0">
                        Soft inquiries are visible only to you, not to other lenders.
                      </p>
                    </div>
                  </div>
                </div>
                <div className="grid md:grid-cols-2">
                  <div className="p-5 bg-rose-50 flex gap-3">
                    <XCircle className="w-5 h-5 text-rose-600 shrink-0 mt-0.5" />
                    <div>
                      <p className="font-semibold text-rose-900 mb-1 text-sm uppercase tracking-wide">Myth</p>
                      <p className="text-slate-700 text-base m-0">
                        "A pre-qualified rate is a guaranteed offer."
                      </p>
                    </div>
                  </div>
                  <div className="p-5 bg-emerald-50 flex gap-3">
                    <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
                    <div>
                      <p className="font-semibold text-emerald-900 mb-1 text-sm uppercase tracking-wide">Fact</p>
                      <p className="text-slate-700 text-base m-0">
                        It's an estimate. The final APR can change after the hard pull.
                      </p>
                    </div>
                  </div>
                </div>
                <div className="grid md:grid-cols-2">
                  <div className="p-5 bg-rose-50 flex gap-3">
                    <XCircle className="w-5 h-5 text-rose-600 shrink-0 mt-0.5" />
                    <div>
                      <p className="font-semibold text-rose-900 mb-1 text-sm uppercase tracking-wide">Myth</p>
                      <p className="text-slate-700 text-base m-0">
                        "Hard inquiries stay on my report for seven years."
                      </p>
                    </div>
                  </div>
                  <div className="p-5 bg-emerald-50 flex gap-3">
                    <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
                    <div>
                      <p className="font-semibold text-emerald-900 mb-1 text-sm uppercase tracking-wide">Fact</p>
                      <p className="text-slate-700 text-base m-0">
                        Hard inquiries fall off after two years and stop affecting your score in 12.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <h2>What lenders actually see in a soft pull</h2>
            <p>
              When a marketplace like Apruvee sends your information to a lender for
              pre-qualification, the lender requests a slimmed-down version of your credit file
              from one of the three bureaus. The exact data varies by lender, but a typical soft
              pull returns:
            </p>
            <ul>
              <li>Your current FICO or VantageScore</li>
              <li>The number and types of accounts you have open (cards, loans, mortgages)</li>
              <li>Your total balances and credit limits — used to calculate utilization</li>
              <li>Your payment history at a summary level (any 30/60/90-day late payments)</li>
              <li>The age of your credit history</li>
              <li>Recent hard inquiries, collections, charge-offs, or public records</li>
            </ul>
            <p>
              Notice what's <em>not</em> in there: your full account-by-account transaction
              history, the names of every creditor you've worked with, or any personally
              identifying information beyond what you supplied. The lender uses this snapshot to
              run your profile through their underwriting model and return a likely APR, term, and
              loan amount.
            </p>

            <h2>Why does FCRA allow this without dinging your score?</h2>
            <p>
              The Fair Credit Reporting Act (FCRA) is the federal law that governs how credit
              information is collected and shared. It draws a clean line between two purposes:
            </p>
            <ul>
              <li>
                <strong>Reviewing your account or extending an offer.</strong> A bureau may share
                your information for "account review" or to make a "firm offer of credit" without
                you formally applying. These are soft pulls. Because you didn't initiate a credit
                application, FICO's scoring model treats them as informational — they're recorded
                but they don't affect the score.
              </li>
              <li>
                <strong>Evaluating a new credit application.</strong> Once you sign a lender's
                application form (with language authorizing them to pull your credit), they can
                request your full report. This is a hard pull, and FICO does treat it as
                potentially predictive of future credit risk.
              </li>
            </ul>
            <p>
              The legal basis for soft pulls during pre-qualification is something called
              "permissible purpose" under{" "}
              <a
                href="https://www.consumer.ftc.gov/articles/credit-and-loans"
                target="_blank"
                rel="noopener noreferrer"
              >
                FCRA Section 604
              </a>
              . By submitting your information to a marketplace and consenting to a rate check,
              you've granted that permissible purpose — but only for the soft inquiry, not for a
              binding loan application.
            </p>

            <h2>Why marketplaces use soft pulls</h2>
            <p>
              From the borrower's perspective, the value of a soft-pull marketplace is obvious:
              you get to see real, personalized rates from multiple lenders without taking any
              hits to your credit. From the lender's side, it's also a smart filtering tool —
              they can pre-screen prospective borrowers and only spend money on a full
              underwriting decision for the ones who are likely to qualify.
            </p>
            <p>
              That alignment is why nearly every reputable online personal-loan marketplace and
              direct lender now offers a soft-pull "check your rate" flow. If a site asks you to
              submit a full application — including signing a credit-pull authorization — without
              first showing you an estimated APR, that's a yellow flag worth pausing on.
            </p>

            <h2>What triggers a hard pull?</h2>
            <p>
              A hard inquiry happens only when you take a clear, deliberate action to apply for
              new credit. With personal loans specifically, a hard pull is triggered when you:
            </p>
            <ul>
              <li>
                <strong>Pick an offer and click "continue" or "accept."</strong> After
                pre-qualification, choosing a specific lender's offer takes you to that lender's
                full application, where you'll be asked to verify your income, address, and
                Social Security number. Submitting that application authorizes the hard pull.
              </li>
              <li>
                <strong>Sign electronic loan documents.</strong> The hard pull and the final
                underwriting decision happen in tandem at this stage.
              </li>
              <li>
                <strong>Apply directly on a lender's website.</strong> Some lenders offer a soft
                pre-qualification, but if you skip that step and go straight to "apply now," it's
                a hard pull from the start.
              </li>
            </ul>
            <p>
              On Apruvee, no hard pull happens until you leave our site and complete an
              application on a specific lender's page. You can compare every offer we return and
              walk away from all of them with your score completely untouched.
            </p>

            <h2>How long do inquiries stay on your report?</h2>
            <p>
              Both kinds of inquiries are recorded, but they have very different lifespans and
              effects.
            </p>

            <div className="not-prose my-8 overflow-x-auto">
              <table className="w-full text-left border border-slate-200 rounded-2xl overflow-hidden">
                <thead className="bg-slate-100 text-slate-700 text-sm uppercase tracking-wide">
                  <tr>
                    <th className="px-5 py-3">Inquiry type</th>
                    <th className="px-5 py-3">Visible to lenders?</th>
                    <th className="px-5 py-3">Affects score?</th>
                    <th className="px-5 py-3">Stays on report</th>
                  </tr>
                </thead>
                <tbody className="text-slate-700 text-base">
                  <tr className="border-t border-slate-200">
                    <td className="px-5 py-4 font-semibold">Soft pull</td>
                    <td className="px-5 py-4">No</td>
                    <td className="px-5 py-4">No</td>
                    <td className="px-5 py-4">~12 months (your view only)</td>
                  </tr>
                  <tr className="border-t border-slate-200 bg-slate-50">
                    <td className="px-5 py-4 font-semibold">Hard pull</td>
                    <td className="px-5 py-4">Yes</td>
                    <td className="px-5 py-4">Yes (~5–10 pts)</td>
                    <td className="px-5 py-4">2 years (scoring effect ends ~12 mo)</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <p>
              Hard pulls also fade fast. The FICO model gives the most weight to inquiries from
              the most recent six months, and the score impact essentially disappears after about
              a year. The inquiry itself remains on the report for the full two years, but it
              stops factoring into the score after twelve months.
            </p>

            <h2>What about rate shopping with multiple lenders?</h2>
            <p>
              FICO and VantageScore both recognize that a careful shopper might compare
              hard-pull offers from several lenders before picking one. To avoid penalizing that
              behavior, both scoring models use a "deduplication window": multiple hard inquiries
              of the same type — auto loans, mortgages, or student loans — within a short
              window (typically 14–45 days) are counted as a single inquiry for scoring purposes.
            </p>
            <p>
              Unfortunately, <strong>personal loans don't always benefit from this rule</strong>.
              The major scoring models treat personal-loan inquiries as separate events. So if
              you formally apply with five different lenders in a week, you may take five separate
              hits to your score. This is exactly why a soft-pull marketplace is so useful for
              personal loans specifically — you can compare every option without that risk and
              only trigger a single hard pull on the lender you actually choose.
            </p>

            <h2>The bottom line</h2>
            <p>
              A soft credit pull is a low-friction way for you to see what kind of loan you'd
              actually qualify for, and it's protected by federal law from affecting your score.
              The hard pull only happens when you decide to go forward with a specific lender's
              application — and even then, the impact is modest and short-lived. For most
              borrowers, the value of seeing real, personalized rates before committing to a
              single lender far outweighs a temporary 5–10 point dip down the road.
            </p>
            <p>
              If you've been holding off on checking rates because you didn't want to risk your
              score, you can stop worrying. The check itself costs you nothing — not in dollars,
              not in points, not in privacy.
            </p>

            <h2>Frequently asked questions</h2>

            <h3>Does Apruvee do a hard or soft pull?</h3>
            <p>
              Apruvee uses a soft pull only. We share your information with our partner lenders
              to generate pre-qualified offers, and none of that activity affects your credit
              score. A hard pull happens only after you choose an offer and submit a formal
              application with that specific lender.
            </p>

            <h3>Can I see the soft inquiry on my credit report?</h3>
            <p>
              Yes. Pull your free annual reports at{" "}
              <a href="https://www.annualcreditreport.com" target="_blank" rel="noopener noreferrer">
                annualcreditreport.com
              </a>{" "}
              and look in the "soft inquiries" or "promotional inquiries" section. Soft pulls are
              listed there for your reference, but they're stripped out of the version other
              lenders see.
            </p>

            <h3>How many soft pulls is too many?</h3>
            <p>
              There's no limit. Soft inquiries don't affect your score and aren't visible to other
              lenders, so you can check your rate as often as you'd like — even every month — with
              zero downside.
            </p>

            <h3>Will pre-qualifying lock in my rate?</h3>
            <p>
              No. A pre-qualified rate is the lender's best estimate based on the soft-pull
              snapshot. The final rate is set after the hard pull and full underwriting and could
              be slightly different, especially if your credit profile has changed (new debt,
              missed payment, new accounts) between the two pulls. In our experience, the final
              rate matches the pre-qualified rate the vast majority of the time, but it's not a
              binding offer.
            </p>

            <h3>Is this the same as "preapproval"?</h3>
            <p>
              The terms <em>prequalification</em> and <em>preapproval</em> are used loosely and
              interchangeably across the industry. Both typically involve a soft pull. For
              mortgages specifically, "preapproval" is a more rigorous process that may involve
              document verification, but for personal loans the two terms mean roughly the same
              thing: a non-binding rate estimate based on a soft inquiry.
            </p>

            <h3>What if I don't want any inquiry on my report at all?</h3>
            <p>
              You can opt out of pre-screened credit offers (the kind that drive most unsolicited
              soft pulls) for free at{" "}
              <a href="https://www.optoutprescreen.com" target="_blank" rel="noopener noreferrer">
                optoutprescreen.com
              </a>
              . That won't stop you from intentionally pre-qualifying for a loan you're shopping
              for, but it stops banks and card issuers from soft-pulling you for marketing
              purposes.
            </p>

            <p className="mt-12">
              Want to keep going? Read our companion article on{" "}
              <Link href="/blog/credit-score-for-consolidation-loan">
                what credit score you actually need for a consolidation loan
              </Link>{" "}
              — including the APR you can realistically expect at every credit tier.
            </p>
          </div>

          {/* CTA */}
          <div className="mt-16 bg-primary text-white rounded-3xl p-8 md:p-12 text-center">
            <h2 className="text-2xl md:text-3xl font-bold mb-4">Ready to see real offers?</h2>
            <p className="text-primary-foreground/90 text-lg mb-8 max-w-xl mx-auto">
              Check your rate from multiple lenders in 2 minutes. Soft credit pull only — zero
              impact to your credit score.
            </p>
            <Link
              href="/apply"
              className="inline-flex items-center justify-center rounded-xl bg-white px-8 py-4 text-lg font-semibold text-primary shadow-lg hover:bg-slate-100 transition-all hover:-translate-y-1"
            >
              Check My Options
            </Link>
          </div>

          {/* Related */}
          <div className="mt-12 border-t border-slate-200 pt-10">
            <h3 className="text-sm font-semibold text-slate-500 uppercase tracking-wide mb-4">
              Keep reading
            </h3>
            <div className="space-y-4">
              <Link href="/blog/credit-score-for-consolidation-loan">
                <article className="bg-white rounded-2xl p-6 border border-slate-200 hover:border-primary hover:shadow-lg transition-all cursor-pointer group">
                  <div className="text-xs font-semibold text-primary mb-2">CREDIT BASICS</div>
                  <h4 className="text-xl font-bold text-slate-900 group-hover:text-primary transition-colors mb-2">
                    What Credit Score Do You Need for a Debt Consolidation Loan?
                  </h4>
                  <p className="text-slate-600 leading-relaxed text-base">
                    The honest answer: it depends on the lender. Most start at 580–660, but the
                    rate you actually get depends on your tier.
                  </p>
                </article>
              </Link>
              <Link href="/blog/personal-loan-vs-balance-transfer">
                <article className="bg-white rounded-2xl p-6 border border-slate-200 hover:border-primary hover:shadow-lg transition-all cursor-pointer group">
                  <div className="text-xs font-semibold text-primary mb-2">COMPARISONS</div>
                  <h4 className="text-xl font-bold text-slate-900 group-hover:text-primary transition-colors mb-2">
                    Personal Loan vs. Balance Transfer Card: Which Actually Saves More?
                  </h4>
                  <p className="text-slate-600 leading-relaxed text-base">
                    Both can lower the cost of your credit card debt — but in very different
                    ways. We compare APRs, fees, and run the numbers on a real $10,000 balance.
                  </p>
                </article>
              </Link>
              <Link href="/blog/how-to-consolidate-credit-card-debt">
                <article className="bg-white rounded-2xl p-6 border border-slate-200 hover:border-primary hover:shadow-lg transition-all cursor-pointer group">
                  <div className="text-xs font-semibold text-primary mb-2">DEBT CONSOLIDATION</div>
                  <h4 className="text-xl font-bold text-slate-900 group-hover:text-primary transition-colors mb-2">
                    How to Consolidate Credit Card Debt: A Complete 2026 Guide
                  </h4>
                  <p className="text-slate-600 leading-relaxed text-base">
                    Our overview guide covering all four ways to consolidate — personal loans,
                    balance transfers, HELOCs, and debt management plans — with real APR math.
                  </p>
                </article>
              </Link>
            </div>
          </div>
        </div>
      </article>
    </PageWrapper>
  );
}
