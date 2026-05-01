import { Link } from "wouter";
import { HelpCircle, ChevronDown } from "lucide-react";
import { PageWrapper } from "@/components/layout/page-wrapper";

interface FAQItem {
  q: string;
  a: React.ReactNode;
}

interface FAQSection {
  title: string;
  items: FAQItem[];
}

const sections: FAQSection[] = [
  {
    title: "About Apruvee",
    items: [
      {
        q: "What is Apruvee?",
        a: (
          <>
            Apruvee is an independent personal loan marketplace. We help you compare pre-qualified
            loan offers from multiple reputable lenders in one place, so you don't have to fill out
            twenty separate applications. We're headquartered in Raleigh, North Carolina.
          </>
        ),
      },
      {
        q: "Is Apruvee a lender?",
        a: (
          <>
            <strong>No.</strong> Apruvee is a marketplace, not a lender. We never make loans
            ourselves. When you submit your information, we match you with vetted lending partners
            who decide whether to extend you an offer. All loan terms, rates, and approval decisions
            are made solely by the lender.
          </>
        ),
      },
      {
        q: "How does Apruvee make money?",
        a: (
          <>
            We're paid a referral fee by our lender partners when a borrower we've matched
            ultimately accepts a loan. This is standard in the personal loan marketplace industry.
            Importantly: we're paid the same fee no matter <em>which</em> lender you pick, so we
            have no incentive to push you toward one offer over another. You always pay $0 to use
            Apruvee — borrowers are never charged a fee.
          </>
        ),
      },
      {
        q: "Who founded Apruvee?",
        a: (
          <>
            Apruvee was founded by Chris Kachel after watching too many friends and family members
            get buried by credit card debt. The mission is simple: take the anxiety out of paying
            off debt by showing people the loan options they're most likely to be approved for —
            without the credit-score hit, the upsells, or the pressure. You can read more on our{" "}
            <Link href="/about">About page</Link>.
          </>
        ),
      },
    ],
  },
  {
    title: "Checking your rate",
    items: [
      {
        q: "Will checking my rate hurt my credit score?",
        a: (
          <>
            No. When you fill out our short form, we use a <strong>soft credit pull</strong> to
            match you with lender offers. A soft pull is invisible to other lenders and has{" "}
            <strong>zero impact</strong> on your credit score. A hard credit pull only happens
            later, if you decide to formally apply with a specific lender.
          </>
        ),
      },
      {
        q: "What information do I need to provide?",
        a: (
          <>
            To see your matches, we ask for basic information: how much you'd like to borrow, what
            you'll use the loan for, your estimated credit score range, and contact info. We do{" "}
            <strong>not</strong> ask for your full Social Security number to show you offers — only
            the lender will request that, after you choose to formally apply with them.
          </>
        ),
      },
      {
        q: "How long does it take to see offers?",
        a: (
          <>
            About two minutes. The form has a handful of questions, and your matched offers appear
            on the next page immediately.
          </>
        ),
      },
      {
        q: "Do I have to take a loan if I see offers?",
        a: (
          <>
            Absolutely not. There is zero obligation to apply for or accept any loan. Many people
            use Apruvee just to see what rates they could qualify for as part of researching their
            options.
          </>
        ),
      },
    ],
  },
  {
    title: "Loan basics",
    items: [
      {
        q: "What credit score do I need to qualify?",
        a: (
          <>
            Lenders in our marketplace serve a wide range of credit profiles, typically starting
            around <strong>FICO 580</strong>. Borrowers with scores of 690+ generally see the
            widest range of offers and the lowest APRs. If your score is below 580, the math of a
            consolidation loan often doesn't work — in that case, we recommend speaking with a
            nonprofit credit counselor first (visit{" "}
            <a
              href="https://www.nfcc.org"
              target="_blank"
              rel="noopener noreferrer"
              className="text-primary hover:underline"
            >
              nfcc.org
            </a>
            ).
          </>
        ),
      },
      {
        q: "How much can I borrow?",
        a: (
          <>
            Our partner lenders offer loans typically ranging from <strong>$1,000 to $50,000</strong>
            . The amount you'll qualify for depends on your income, credit profile, and the lender's
            criteria.
          </>
        ),
      },
      {
        q: "What APRs and loan terms can I expect?",
        a: (
          <>
            APRs typically range from about <strong>6% to 36%</strong>, depending on your credit
            and the lender. Loan terms generally run from 24 to 84 months. The actual APR you'll be
            offered is determined by the individual lender after reviewing your full application.
          </>
        ),
      },
      {
        q: "What can I use a personal loan for?",
        a: (
          <>
            Most lenders allow personal loans to be used for almost any legal purpose: debt
            consolidation, home improvement, medical bills, major purchases, moving costs,
            weddings, and more. The most common use among Apruvee visitors is consolidating
            high-interest credit card debt. A small number of uses are usually prohibited (such as
            gambling, illegal activities, or post-secondary tuition at certain schools) — your
            specific lender will spell out any restrictions in your loan agreement.
          </>
        ),
      },
      {
        q: "Are there fees to use Apruvee?",
        a: (
          <>
            <strong>No — Apruvee is always 100% free for borrowers.</strong> We don't charge
            application fees, membership fees, or any other costs. The only fees you may encounter
            are those charged by the lender you ultimately choose, such as origination fees, which
            will be clearly disclosed before you sign.
          </>
        ),
      },
    ],
  },
  {
    title: "Privacy & security",
    items: [
      {
        q: "Is my information secure?",
        a: (
          <>
            Yes. All data submitted through Apruvee is transmitted over an encrypted (TLS) connection.
            We follow industry-standard security practices for storing and handling your information.
          </>
        ),
      },
      {
        q: "Will Apruvee sell my data to third parties?",
        a: (
          <>
            We share your information only with the lending partners we match you to — that's how
            you receive offers. We do <strong>not</strong> sell your data to unrelated third
            parties, marketers, or list brokers. Full details are in our{" "}
            <Link href="/privacy">Privacy Policy</Link>.
          </>
        ),
      },
      {
        q: "How do I opt out, request my data, or delete my account?",
        a: (
          <>
            You have the right to request access to, correction of, or deletion of your personal
            data at any time. Send a request to{" "}
            <a href="mailto:chris@apruvee.com" className="text-primary hover:underline">
              chris@apruvee.com
            </a>{" "}
            and we'll respond within the timeframes required by applicable law (typically 30–45
            days under CCPA, GDPR, and similar regulations).
          </>
        ),
      },
    ],
  },
  {
    title: "After you apply with a lender",
    items: [
      {
        q: "How long until I get the money?",
        a: (
          <>
            Most online personal loans fund within <strong>1 to 7 business days</strong> of being
            approved. A few lenders offer same-day or next-business-day funding for qualified
            borrowers. Your specific timeline will be confirmed by the lender during the application
            process.
          </>
        ),
      },
      {
        q: "What if I'm not approved by any lender?",
        a: (
          <>
            It happens, and it's not the end of the road. The most common reasons are credit score,
            debt-to-income ratio, or insufficient credit history. If consolidation isn't an option
            right now, we recommend three things: (1) check your credit report for free at{" "}
            <a
              href="https://www.annualcreditreport.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-primary hover:underline"
            >
              annualcreditreport.com
            </a>{" "}
            and dispute any errors, (2) speak with a nonprofit credit counselor at{" "}
            <a
              href="https://www.nfcc.org"
              target="_blank"
              rel="noopener noreferrer"
              className="text-primary hover:underline"
            >
              nfcc.org
            </a>
            , and (3) work on building credit over the next 6–12 months and revisit consolidation
            then.
          </>
        ),
      },
      {
        q: "Who do I contact if I have an issue with my loan?",
        a: (
          <>
            Once your loan is funded, your relationship is directly with the lender, not with
            Apruvee. They'll handle billing, payments, hardship requests, and any servicing
            questions. That said, if you have a problem with how you were matched or any concern
            about Apruvee itself, please reach out to{" "}
            <a href="mailto:chris@apruvee.com" className="text-primary hover:underline">
              chris@apruvee.com
            </a>
            . We read every message.
          </>
        ),
      },
      {
        q: "What if I'm in serious financial hardship right now?",
        a: (
          <>
            If you're behind on bills, facing eviction, or worried about utility shut-off, a
            personal loan is often <em>not</em> the right tool — and may make things worse. Please
            speak with a free nonprofit credit counselor at{" "}
            <a
              href="https://www.nfcc.org"
              target="_blank"
              rel="noopener noreferrer"
              className="text-primary hover:underline"
            >
              nfcc.org
            </a>
            . They can help you understand your options, including debt management plans,
            negotiating with creditors, and (in serious cases) bankruptcy alternatives.
          </>
        ),
      },
    ],
  },
];

export default function FAQ() {
  return (
    <PageWrapper>
      {/* Hero */}
      <section className="bg-slate-50 py-16 md:py-20">
        <div className="container mx-auto px-4 max-w-4xl text-center">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-secondary text-primary text-sm font-semibold mb-6">
            <HelpCircle className="w-4 h-4" />
            <span>Frequently Asked Questions</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-extrabold text-slate-900 tracking-tight mb-6">
            Questions, answered honestly.
          </h1>
          <p className="text-lg text-slate-600 leading-relaxed">
            Everything you might want to know about Apruvee, personal loans, and the process —
            without the marketing fluff.
          </p>
        </div>
      </section>

      {/* FAQ sections */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4 max-w-3xl space-y-12">
          {sections.map((section) => (
            <div key={section.title}>
              <h2 className="text-2xl md:text-3xl font-bold text-slate-900 mb-6 tracking-tight">
                {section.title}
              </h2>
              <div className="space-y-3">
                {section.items.map((item) => (
                  <details
                    key={item.q}
                    className="group bg-slate-50 border border-slate-200 rounded-xl overflow-hidden hover:border-primary/40 transition-colors"
                  >
                    <summary className="flex items-center justify-between gap-4 p-5 cursor-pointer list-none font-semibold text-slate-900 text-base md:text-lg">
                      <span>{item.q}</span>
                      <ChevronDown className="w-5 h-5 shrink-0 text-slate-500 group-open:rotate-180 transition-transform" />
                    </summary>
                    <div className="px-5 pb-5 text-slate-700 leading-relaxed">{item.a}</div>
                  </details>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Still have questions */}
      <section className="py-16 bg-slate-50">
        <div className="container mx-auto px-4 max-w-2xl text-center">
          <h2 className="text-2xl md:text-3xl font-bold text-slate-900 mb-4">
            Still have a question?
          </h2>
          <p className="text-slate-600 mb-8 leading-relaxed">
            We read every message and reply within one business day. No bots, no script — just a
            real person.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/contact"
              className="inline-flex items-center justify-center rounded-xl bg-primary px-8 py-4 text-base font-semibold text-white shadow hover:bg-primary/90 transition-all"
            >
              Contact us
            </Link>
            <Link
              href="/apply"
              className="inline-flex items-center justify-center rounded-xl bg-white border-2 border-primary px-8 py-4 text-base font-semibold text-primary hover:bg-secondary transition-all"
            >
              Check My Rates
            </Link>
          </div>
        </div>
      </section>
    </PageWrapper>
  );
}
