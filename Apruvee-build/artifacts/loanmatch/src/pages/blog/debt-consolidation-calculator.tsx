import { useEffect } from "react";
import { Link } from "wouter";
import { Clock, ArrowLeft, Calendar, TrendingDown, DollarSign, Calculator as CalcIcon } from "lucide-react";
import { PageWrapper } from "@/components/layout/page-wrapper";
import { DebtConsolidationCalculator } from "@/components/debt-consolidation-calculator";

const META_TITLE =
  "Debt Consolidation Loan Calculator: How Much Could You Save? | Apruvee";
const META_DESCRIPTION =
  "Use our free debt consolidation calculator to see your new monthly payment, total interest saved, and time-to-debt-free. Includes three worked examples ($5K, $15K, $30K) with the math explained.";

export default function DebtConsolidationCalculatorArticle() {
  useEffect(() => {
    const previousTitle = document.title;
    document.title = META_TITLE;

    let metaDescription = document.querySelector<HTMLMetaElement>(
      'meta[name="description"]',
    );
    const createdMeta = !metaDescription;
    if (!metaDescription) {
      metaDescription = document.createElement("meta");
      metaDescription.name = "description";
      document.head.appendChild(metaDescription);
    }
    const previousDescription = metaDescription.content;
    metaDescription.content = META_DESCRIPTION;

    return () => {
      document.title = previousTitle;
      if (createdMeta) {
        metaDescription?.parentNode?.removeChild(metaDescription);
      } else if (metaDescription) {
        metaDescription.content = previousDescription;
      }
    };
  }, []);

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
                Calculators
              </span>
              <span className="flex items-center gap-1">
                <Clock className="w-3.5 h-3.5" />9 min read
              </span>
              <span>·</span>
              <span className="flex items-center gap-1">
                <Calendar className="w-3.5 h-3.5" />
                Published April 30, 2026
              </span>
            </div>
            <h1 className="text-4xl md:text-5xl font-extrabold text-slate-900 tracking-tight leading-tight mb-6">
              Debt Consolidation Calculator: How Much Could You Save?
            </h1>
            <p className="text-xl text-slate-600 leading-relaxed">
              Plug in your numbers below to see your new monthly payment, total interest saved, and
              how much faster you could be debt-free with a personal loan. Then read three worked
              examples — $5,000, $15,000, and $30,000 — with the math explained step by step.
            </p>
          </div>
        </header>

        {/* Calculator at top */}
        <section className="bg-slate-50 py-12">
          <div className="container mx-auto px-4 max-w-3xl">
            <DebtConsolidationCalculator />
            <p className="mt-4 text-xs text-slate-500 text-center">
              Estimates only. Your actual rate is determined by the lender after a full credit review.
            </p>
          </div>
        </section>

        <div className="container mx-auto px-4 max-w-3xl py-12 md:py-16">
          <div className="prose prose-slate prose-lg max-w-none prose-headings:text-slate-900 prose-headings:tracking-tight prose-a:text-primary prose-a:no-underline hover:prose-a:underline prose-strong:text-slate-900">

            <h2>How the calculator works</h2>
            <p>
              Three numbers determine whether a consolidation loan makes financial sense for you:
              the <strong>APR</strong>, the <strong>term</strong>, and the <strong>total cost</strong>.
              The calculator above uses standard amortization — the same formula every bank, credit
              union, and online lender uses to compute fixed monthly payments — so the numbers you
              see are directly comparable to a real loan offer.
            </p>
            <p>
              Specifically, your monthly payment is calculated as:
            </p>
            <div className="bg-slate-50 border border-slate-200 rounded-2xl p-6 my-8 not-prose">
              <p className="font-mono text-sm text-slate-800 leading-relaxed text-center">
                Payment = P × r × (1 + r)<sup>n</sup> ÷ ((1 + r)<sup>n</sup> − 1)
              </p>
              <p className="text-sm text-slate-600 mt-4 leading-relaxed">
                where <strong>P</strong> is the loan amount, <strong>r</strong> is the monthly
                interest rate (APR ÷ 12 ÷ 100), and <strong>n</strong> is the number of monthly
                payments. Total interest is just (Payment × n) − P.
              </p>
            </div>
            <p>
              You don't need to memorize the formula — the calculator does it for you. What matters
              is understanding what the inputs mean. <strong>APR</strong> includes both the interest
              rate and any fees the lender expresses as part of the rate. <strong>Term</strong> is
              the number of months over which you'll repay. A longer term lowers the monthly
              payment but increases the total interest you'll pay. A shorter term does the opposite.
            </p>

            <h2>The four numbers you need</h2>
            <ul>
              <li>
                <strong>Total debt to consolidate.</strong> Add up the current balances on every
                credit card or high-interest account you plan to pay off with the new loan. Include
                anything you'd realistically roll into a single payment.
              </li>
              <li>
                <strong>Current APR.</strong> The blended interest rate you're paying today. If
                you have multiple cards at different rates, use a balance-weighted average. Don't
                use the rate from your statement's "interest charges" line — that's already a
                monthly figure. The APR is on the back of your statement, usually 18–29% in 2026.
              </li>
              <li>
                <strong>New loan APR.</strong> The rate you'd qualify for on a personal loan. If you
                don't know yours, you can check pre-qualified offers with a soft credit pull (no
                impact to your score). For a rough starting point: excellent credit (FICO 740+)
                typically sees 8–12%, good credit (690–739) sees 11–17%, and fair credit (630–689)
                sees 17–28%.
              </li>
              <li>
                <strong>Loan term.</strong> Most personal loans run 24 to 84 months (2 to 7 years).
                36 to 60 months is the sweet spot for most consolidation loans — long enough to keep
                the payment manageable, short enough to keep total interest reasonable.
              </li>
            </ul>

            <h2>Worked example #1: $5,000 small consolidation</h2>
            <p>
              Picture a borrower with a single credit card carrying a $5,000 balance at 24% APR.
              They've been paying about $200 a month — enough to chip away at the principal, but
              with the interest cost climbing every month. They have <strong>fair credit</strong>
              {" "}(FICO around 670) and qualify for a personal loan at 14% APR over 36 months.
            </p>

            <ExampleCard
              title="$5,000 at 24% APR → 14% APR (3-year personal loan)"
              rows={[
                { label: "Loan amount", value: "$5,000" },
                { label: "Current credit card APR", value: "24%" },
                { label: "New loan APR", value: "14%" },
                { label: "Loan term", value: "36 months (3 years)" },
              ]}
              results={[
                {
                  label: "Current monthly payment (to clear in 36 mo at 24%)",
                  value: "$196",
                },
                { label: "New monthly payment", value: "$171", highlight: true },
                { label: "Total interest at current APR", value: "$2,062" },
                { label: "Total interest at new APR", value: "$1,152", highlight: true },
                { label: "Lifetime interest saved", value: "$910", highlight: true },
                { label: "Time saved vs. paying $171/mo on the card", value: "~9 months" },
              ]}
            />

            <p>
              <strong>What the math shows:</strong> the new payment is $25 lower per month, and
              you'll pay <strong>$910 less in interest over the life of the loan</strong>. Just as
              importantly, you have a guaranteed end date: month 36, you're debt-free. If you'd
              kept paying $171/month against the card at 24% APR, it would take you about 45
              months — roughly 9 months longer — to clear the same balance.
            </p>
            <p>
              The savings here aren't dramatic, but they're real. For a $5,000 balance, a
              consolidation loan is most useful as a <em>structure</em> tool: it converts a
              revolving balance that's easy to "just keep paying the minimum on" into a fixed plan
              with a known payoff date.
            </p>

            <h2>Worked example #2: $15,000 typical credit card debt</h2>
            <p>
              This is the most common scenario we see: a borrower carrying $15,000 across two or
              three cards at an average APR of 22%. They have <strong>good credit</strong> (FICO
              around 710) and qualify for a 12% personal loan over 60 months.
            </p>

            <ExampleCard
              title="$15,000 at 22% APR → 12% APR (5-year personal loan)"
              rows={[
                { label: "Loan amount", value: "$15,000" },
                { label: "Current blended APR", value: "22%" },
                { label: "New loan APR", value: "12%" },
                { label: "Loan term", value: "60 months (5 years)" },
              ]}
              results={[
                {
                  label: "Current monthly payment (to clear in 60 mo at 22%)",
                  value: "$414",
                },
                { label: "New monthly payment", value: "$334", highlight: true },
                { label: "Total interest at current APR", value: "$9,857" },
                { label: "Total interest at new APR", value: "$5,020", highlight: true },
                { label: "Lifetime interest saved", value: "$4,837", highlight: true },
                { label: "Time saved vs. paying $334/mo on the cards", value: "~3 years" },
              ]}
            />

            <p>
              <strong>What the math shows:</strong> the monthly payment drops by{" "}
              <strong>$80</strong> and the lifetime interest savings exceed{" "}
              <strong>$4,800</strong>. Even more striking: if this borrower had kept paying $334
              per month against their cards at 22% APR, it would take them roughly 96 months — about
              <strong> 3 years longer</strong> — to clear the balance. The consolidation loan
              doesn't just save money, it cuts the payoff time roughly in half at the same monthly
              payment.
            </p>
            <p>
              Keep in mind: this assumes you stop using the credit cards. If you pay them off with
              the loan and then run them back up, you've made the situation worse, not better. We
              cover that pitfall and how to avoid it in our companion guide on{" "}
              <Link href="/blog/how-to-consolidate-credit-card-debt">
                how to consolidate credit card debt
              </Link>
              .
            </p>

            <h2>Worked example #3: $30,000 large consolidation</h2>
            <p>
              At the higher end, consider a borrower with $30,000 spread across multiple cards and a
              personal line of credit, blended at 21% APR. They have <strong>good-to-excellent
              credit</strong> (FICO around 730) and qualify for an 11% personal loan over 60 months.
            </p>

            <ExampleCard
              title="$30,000 at 21% APR → 11% APR (5-year personal loan)"
              rows={[
                { label: "Loan amount", value: "$30,000" },
                { label: "Current blended APR", value: "21%" },
                { label: "New loan APR", value: "11%" },
                { label: "Loan term", value: "60 months (5 years)" },
              ]}
              results={[
                {
                  label: "Current monthly payment (to clear in 60 mo at 21%)",
                  value: "$812",
                },
                { label: "New monthly payment", value: "$652", highlight: true },
                { label: "Total interest at current APR", value: "$18,696" },
                { label: "Total interest at new APR", value: "$9,136", highlight: true },
                { label: "Lifetime interest saved", value: "$9,560", highlight: true },
                { label: "Time saved vs. paying $652/mo on the cards", value: "~3 years" },
              ]}
            />

            <p>
              <strong>What the math shows:</strong> a monthly payment that's{" "}
              <strong>$160 lower</strong> and almost <strong>$10,000 in lifetime interest savings</strong>
              {" "}— enough to fund a real emergency fund, a year of retirement contributions, or just
              breathing room in your monthly budget. At this size, even small APR differences move
              the total cost by thousands of dollars, so it's worth shopping at least three lenders
              before committing.
            </p>

            <h2>Reading the results: what each number actually means</h2>

            <h3>"New monthly payment"</h3>
            <p>
              This is what the lender will draft from your bank account every month for the entire
              term. Unlike a credit card minimum (which floats with your balance), this payment is{" "}
              <strong>fixed</strong>. It doesn't go down as you pay the balance off, and it doesn't
              go up if you have a bad month. Predictability is one of the biggest psychological wins
              of an installment loan over a revolving balance.
            </p>

            <h3>"Total interest saved"</h3>
            <p>
              This is the dollar amount you'd <em>not</em> pay in interest over the life of the
              loan, compared with paying the same balance off over the same number of months at
              your current APR. It's the cleanest apples-to-apples savings number — same loan
              size, same payoff term, only the rate changes.
            </p>
            <p>
              In real life, the savings vs. your current trajectory are often even larger, because
              most people aren't actually on track to pay their cards off in the same number of
              months. They're paying minimums, which can stretch a $15,000 balance into 20+ years
              of payments.
            </p>

            <h3>"Time saved"</h3>
            <p>
              This compares two scenarios at the <em>same monthly payment</em>:
            </p>
            <ul>
              <li>The new loan, which clears the balance in your chosen term.</li>
              <li>
                Paying that same monthly amount toward your existing debt at the higher APR — which
                takes longer because more of every payment goes to interest instead of principal.
              </li>
            </ul>
            <p>
              The gap between those two is "time saved." For high-APR balances, the gap can be
              years.
            </p>

            <h2>What the calculator doesn't include</h2>
            <p>
              To keep results accurate and easy to compare, the calculator above shows
              <strong> APR-based</strong> totals. A few real-world factors can shift your actual
              numbers slightly:
            </p>
            <ul>
              <li>
                <strong>Origination fees.</strong> Many online lenders charge a 1–8% origination
                fee, deducted from the funds at closing. If you take a $15,000 loan with a 5% fee,
                you'll receive $14,250 — but you owe and pay interest on the full $15,000. The
                cleanest way to compare lenders is on the <strong>APR</strong> they quote you,
                because the APR is required by federal law to include the origination fee already.
              </li>
              <li>
                <strong>Auto-pay discounts.</strong> Many lenders shave 0.25–0.50% off your APR if
                you enroll in automatic payments from a bank account. Worth taking if your cash
                flow allows it.
              </li>
              <li>
                <strong>Prepayment.</strong> If you pay extra toward principal (or pay the loan off
                early), you'll pay less total interest than the calculator shows. Confirm there's
                no prepayment penalty before committing — most modern personal loans don't have
                one, but a small number still do.
              </li>
              <li>
                <strong>Late fees.</strong> Missed or late payments add $25–$40 per occurrence on
                most loans. Setting up autopay almost always pays for itself.
              </li>
            </ul>

            <h2>How to use these numbers when shopping for a loan</h2>
            <ol>
              <li>
                <strong>Get a baseline from the calculator.</strong> Enter your real numbers and
                see what's possible. That's your "good deal" benchmark.
              </li>
              <li>
                <strong>Pre-qualify with multiple lenders.</strong> Most lenders let you see your
                actual rate with a soft credit pull. Aim for three to five quotes, all from the
                same week if possible (that way the credit-bureau impact is minimized — see our
                guide on{" "}
                <Link href="/blog/how-soft-credit-pull-works">
                  how soft credit pulls work
                </Link>
                ).
              </li>
              <li>
                <strong>Plug each real offer back into the calculator.</strong> Compare not just
                the headline APR but the total interest and monthly payment for the term that
                actually fits your budget.
              </li>
              <li>
                <strong>Pick the one with the lowest total cost</strong> — not necessarily the
                lowest monthly payment. A 7-year loan will always have a lower payment than a
                3-year loan, but you'll pay much more interest. Aim for the shortest term you can
                comfortably afford.
              </li>
            </ol>

            <h2>When the math doesn't favor consolidation</h2>
            <p>
              The calculator can't tell you whether consolidation is the right <em>strategy</em>{" "}
              for you — only whether the math works for a given rate and term. There are a few
              cases where even a favorable-looking calculation doesn't translate to real savings:
            </p>
            <ul>
              <li>
                <strong>You'd run the cards back up.</strong> If you don't change the spending
                pattern that built the debt, you'll end up with the same card balances on top of
                the new loan payment. The calculator can't account for this; only honest
                self-assessment can.
              </li>
              <li>
                <strong>You're already in serious trouble.</strong> If you're missing payments,
                getting collection calls, or your debt is more than your annual income, talk to a
                nonprofit credit counselor before taking out new credit. Start at{" "}
                <a href="https://www.nfcc.org" target="_blank" rel="noopener noreferrer">
                  nfcc.org
                </a>
                .
              </li>
              <li>
                <strong>Your only qualifying APR is higher than your current APR.</strong> This
                does happen, especially for borrowers with poor credit. If the new rate isn't
                better than what you have, the loan can't save you money — you'd just be moving
                debt around. Our guide on{" "}
                <Link href="/blog/credit-score-for-consolidation-loan">
                  credit scores for consolidation loans
                </Link>
                {" "}covers what to do if your offers aren't favorable.
              </li>
            </ul>

            <h2>Frequently asked questions</h2>

            <h3>Why does the "current monthly payment" in the examples look low?</h3>
            <p>
              The calculator and worked examples show what your current monthly payment{" "}
              <em>would be</em> if you paid the existing card balance off over the same term as the
              new loan. That makes for a fair apples-to-apples comparison. In reality, most people
              with credit card debt are only paying the minimum, which is a much smaller payment
              that stretches the payoff over decades and costs many times more in total interest.
            </p>

            <h3>Should I pick the longest term to get the lowest payment?</h3>
            <p>
              Generally, no. A longer term lowers the monthly payment but raises the total interest
              you'll pay — sometimes by thousands of dollars. The right approach is to pick the
              shortest term whose monthly payment fits comfortably in your budget. If 36 months is
              tight but doable, take it over 60. If 60 is the most you can afford, take that
              instead of 84.
            </p>

            <h3>Is the APR I see in the calculator what I'll actually get?</h3>
            <p>
              The APR you enter is hypothetical until a lender actually pre-qualifies you. Use the
              calculator to set expectations and benchmark offers — but the only way to know your
              real APR is to apply (with a soft pull, so it doesn't hurt your score). Once you have
              a real offer in hand, plug it back into the calculator to see the precise totals.
            </p>

            <h3>What if I want to pay off the loan early?</h3>
            <p>
              That's almost always allowed and almost always smart. Confirm there's no prepayment
              penalty in the loan terms (most modern personal loans don't have one, but a small
              number still do). Every extra dollar you put toward principal reduces both your total
              interest and your payoff date.
            </p>

            <h3>Does using this calculator affect my credit score?</h3>
            <p>
              No. The calculator runs entirely in your browser. Nothing is transmitted to a credit
              bureau, and no application is submitted. You'd only trigger a credit pull if and when
              you decide to apply for a real loan — and even then, pre-qualification uses a soft
              pull that doesn't affect your score.
            </p>

            <h2>The bottom line</h2>
            <p>
              For most people carrying high-APR credit card debt, the math on consolidation is
              compelling — typically <strong>$1,000 to $10,000+ in lifetime interest saved</strong>
              {" "}depending on the balance and APR difference, with a lower monthly payment and a
              guaranteed payoff date built in. The biggest gains come from large balances at high
              APRs being moved to single-digit or low-double-digit personal loan APRs.
            </p>
            <p>
              Run your own numbers above. If they look good, the next step is to see what rate
              you'd actually qualify for — which takes about two minutes and doesn't impact your
              credit.
            </p>
          </div>

          {/* CTA */}
          <div className="mt-16 bg-primary text-white rounded-3xl p-8 md:p-12 text-center">
            <h2 className="text-2xl md:text-3xl font-bold mb-4">
              See your real consolidation loan rate
            </h2>
            <p className="text-primary-foreground/90 text-lg mb-8 max-w-xl mx-auto">
              Compare pre-qualified offers from multiple lenders in 2 minutes. Plug your real APR
              back into the calculator to see your exact savings. No SSN required to start, no
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
          <div className="mt-16">
            <h3 className="text-xl font-bold text-slate-900 mb-6">Keep reading</h3>
            <div className="grid md:grid-cols-2 gap-6">
              <Link href="/blog/how-to-consolidate-credit-card-debt">
                <article className="bg-white rounded-2xl p-6 border border-slate-200 hover:border-primary hover:shadow-lg transition-all cursor-pointer h-full">
                  <span className="px-2 py-1 bg-secondary text-primary rounded-md text-xs font-semibold inline-block mb-3">
                    Debt Consolidation
                  </span>
                  <h4 className="font-bold text-slate-900 mb-2 leading-snug">
                    How to Consolidate Credit Card Debt: A Complete 2026 Guide
                  </h4>
                  <p className="text-slate-600 leading-relaxed text-base">
                    The four main options — personal loan, balance transfer, HELOC, debt
                    management plan — and how to pick the right one for your situation.
                  </p>
                </article>
              </Link>
              <Link href="/blog/personal-loan-vs-balance-transfer">
                <article className="bg-white rounded-2xl p-6 border border-slate-200 hover:border-primary hover:shadow-lg transition-all cursor-pointer h-full">
                  <span className="px-2 py-1 bg-secondary text-primary rounded-md text-xs font-semibold inline-block mb-3">
                    Comparisons
                  </span>
                  <h4 className="font-bold text-slate-900 mb-2 leading-snug">
                    Personal Loan vs. Balance Transfer Card: Which Saves More?
                  </h4>
                  <p className="text-slate-600 leading-relaxed text-base">
                    APRs, fees, credit-score impact, and a worked example on a $10,000 balance.
                  </p>
                </article>
              </Link>
            </div>
          </div>

          {/* Disclaimer */}
          <div className="mt-12 text-sm text-slate-500 leading-relaxed border-t border-slate-200 pt-6">
            <p>
              <strong>Disclosure:</strong> This article and the embedded calculator are for general
              informational purposes only and do not constitute financial, tax, or legal advice.
              Apruvee is a marketplace, not a lender. APRs, fees, and qualification criteria are
              determined solely by individual lenders and can change at any time. Calculator results
              and worked examples use illustrative rates and may not reflect actual offers
              available to you. Before making any borrowing decision, consider consulting a
              qualified financial professional. If you are in serious financial distress, please
              contact a nonprofit credit counselor at{" "}
              <a
                href="https://www.nfcc.org"
                target="_blank"
                rel="noopener noreferrer"
                className="text-primary hover:underline"
              >
                nfcc.org
              </a>
              .
            </p>
          </div>
        </div>
      </article>
    </PageWrapper>
  );
}

interface ExampleRow {
  label: string;
  value: string;
  highlight?: boolean;
}

function ExampleCard({
  title,
  rows,
  results,
}: {
  title: string;
  rows: ExampleRow[];
  results: ExampleRow[];
}) {
  return (
    <div className="bg-white border border-slate-200 rounded-2xl my-8 not-prose overflow-hidden shadow-sm">
      <div className="bg-slate-50 border-b border-slate-200 px-6 py-4 flex items-start gap-3">
        <div className="w-10 h-10 rounded-full bg-primary/10 text-primary flex items-center justify-center shrink-0">
          <CalcIcon className="w-5 h-5" />
        </div>
        <h4 className="font-bold text-slate-900 leading-snug">{title}</h4>
      </div>
      <div className="grid sm:grid-cols-2 gap-0">
        <div className="p-6 border-b sm:border-b-0 sm:border-r border-slate-200">
          <div className="text-xs uppercase tracking-wide font-semibold text-slate-500 mb-3 flex items-center gap-1.5">
            <DollarSign className="w-3.5 h-3.5" />
            Inputs
          </div>
          <ul className="space-y-2">
            {rows.map((r) => (
              <li
                key={r.label}
                className="flex justify-between gap-3 text-sm text-slate-700"
              >
                <span className="text-slate-600">{r.label}</span>
                <span className="font-semibold text-slate-900">{r.value}</span>
              </li>
            ))}
          </ul>
        </div>
        <div className="p-6">
          <div className="text-xs uppercase tracking-wide font-semibold text-slate-500 mb-3 flex items-center gap-1.5">
            <TrendingDown className="w-3.5 h-3.5" />
            Results
          </div>
          <ul className="space-y-2">
            {results.map((r) => (
              <li
                key={r.label}
                className={`flex justify-between gap-3 text-sm ${
                  r.highlight
                    ? "text-emerald-900"
                    : "text-slate-700"
                }`}
              >
                <span className={r.highlight ? "text-emerald-800/80" : "text-slate-600"}>
                  {r.label}
                </span>
                <span
                  className={`font-semibold ${
                    r.highlight ? "text-emerald-900" : "text-slate-900"
                  }`}
                >
                  {r.value}
                </span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
