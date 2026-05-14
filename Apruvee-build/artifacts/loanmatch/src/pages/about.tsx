import { Link } from "wouter";
import { Shield, Heart, Users, CheckCircle, Briefcase } from "lucide-react";
import { PageWrapper } from "@/components/layout/page-wrapper";

export default function About() {
  return (
    <PageWrapper>
      {/* Hero */}
      <section className="bg-slate-50 py-16 md:py-24">
        <div className="container mx-auto px-4 max-w-4xl text-center">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-secondary text-primary text-sm font-semibold mb-6">
            <Heart className="w-4 h-4" />
            <span>About Apruvee</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-extrabold text-slate-900 tracking-tight leading-tight mb-6">
            Built by someone who's seen the industry from the inside.
          </h1>
          <p className="text-lg text-slate-600 leading-relaxed">
            Apruvee is an independent personal loan marketplace headquartered in Raleigh, North Carolina.
            We help everyday Americans see the loan options they're most likely to be approved for —
            without filling out twenty different forms or worrying about their credit score.
          </p>
        </div>
      </section>

      {/* Our Story */}
      <section className="py-16 md:py-20 bg-white">
        <div className="container mx-auto px-4 max-w-3xl">
          <h2 className="text-3xl font-bold text-slate-900 mb-6">Our story</h2>
          <div className="space-y-5 text-slate-700 text-lg leading-relaxed">
            <p>
              Apruvee was founded in 2026 by Chris Kachel — a fintech veteran who spent years at
              Credit Karma and LendingTree watching how the personal loan industry actually works
              from the inside. The experience was eye-opening.
            </p>
            <p>
              At scale, loan marketplaces optimize for revenue, not for borrowers. The lenders who
              bid the most get the best placement. The borrower gets a wall of options with no real
              guidance on which ones they'll actually qualify for — and behind every "check your
              rate" button is a hard credit pull that drops their score, or a form that sells their
              data to a dozen lenders before they've agreed to anything.
            </p>
            <p>
              The math of the problem is brutal: a $10,000 balance at 24% APR can take more than
              30 years to pay off at minimum payments and cost over $20,000 in interest. A personal
              loan at 12% APR changes that picture entirely. The product exists — most people just
              can't find the right one without getting burned by the process.
            </p>
            <p>
              We built Apruvee to fix that. Tell us a few things about your situation. We perform a
              soft credit check that doesn't affect your score. We show you the loan offers you're
              most likely to be approved for — side by side, with real APRs, real payments, and real
              terms. Then you choose, or you walk away. No pressure, no hard pull, no data sold.
            </p>
            <p>
              Because Apruvee is an independent company with low overhead, we don't need to extract
              maximum revenue from every borrower to survive. That means we can be honest about
              which lenders are a good fit for your credit profile — and skip the ones that aren't.
              Over time, that's how we plan to earn a reputation that larger platforms can't easily copy.
            </p>
          </div>
        </div>
      </section>

      {/* Founder */}
      <section className="py-16 md:py-20 bg-slate-50">
        <div className="container mx-auto px-4 max-w-3xl">
          <h2 className="text-3xl font-bold text-slate-900 mb-8">The founder</h2>
          <div className="bg-white rounded-2xl border border-slate-200 p-8 flex flex-col sm:flex-row gap-8 items-start">
            <div className="w-20 h-20 rounded-full bg-primary flex items-center justify-center shrink-0">
              <span className="text-white text-2xl font-bold">CK</span>
            </div>
            <div>
              <h3 className="text-xl font-bold text-slate-900 mb-1">Chris Kachel</h3>
              <p className="text-primary font-semibold text-sm mb-4">Founder & CEO, Apruvee</p>
              <div className="flex flex-wrap gap-3 mb-4">
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-100 text-slate-700 text-sm font-medium">
                  <Briefcase className="w-3.5 h-3.5" />
                  Formerly Credit Karma
                </span>
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-100 text-slate-700 text-sm font-medium">
                  <Briefcase className="w-3.5 h-3.5" />
                  Formerly LendingTree
                </span>
              </div>
              <p className="text-slate-600 leading-relaxed">
                Chris spent years working inside two of the largest personal finance marketplaces in the U.S.
                before starting Apruvee. That experience gave him a clear-eyed view of how these platforms
                make money — and where borrowers are underserved. Apruvee is his attempt to build something
                better: a marketplace that earns trust by being genuinely useful, not just well-ranked.
              </p>
              <p className="text-slate-600 leading-relaxed mt-3">
                He lives in North Carolina and can be reached directly at{" "}
                <a href="mailto:chris@apruvee.com" className="text-primary hover:underline font-medium">
                  chris@apruvee.com
                </a>
                {" "}or{" "}
                <a href="tel:+19195189294" className="text-primary hover:underline font-medium">
                  (919) 518-9294
                </a>.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-16 md:py-20 bg-white">
        <div className="container mx-auto px-4 max-w-5xl">
          <h2 className="text-3xl font-bold text-slate-900 text-center mb-12">What we stand for</h2>
          <div className="grid md:grid-cols-3 gap-6">
            <div className="bg-white p-8 rounded-2xl border border-slate-200">
              <div className="w-12 h-12 rounded-xl bg-secondary text-primary flex items-center justify-center mb-4">
                <Shield className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-3">Honesty over hype</h3>
              <p className="text-slate-600 leading-relaxed">
                Real APR ranges. Real estimated payments. No "as low as" rates that nobody actually qualifies for.
                If a loan isn't a good fit, we'll tell you.
              </p>
            </div>
            <div className="bg-white p-8 rounded-2xl border border-slate-200">
              <div className="w-12 h-12 rounded-xl bg-secondary text-primary flex items-center justify-center mb-4">
                <Users className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-3">Your data stays yours</h3>
              <p className="text-slate-600 leading-relaxed">
                We never sell your information to third-party data brokers. Only the lenders you're
                matched with see your details, and only with your explicit consent.
              </p>
            </div>
            <div className="bg-white p-8 rounded-2xl border border-slate-200">
              <div className="w-12 h-12 rounded-xl bg-secondary text-primary flex items-center justify-center mb-4">
                <CheckCircle className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-3">Built for real people</h3>
              <p className="text-slate-600 leading-relaxed">
                Most of our users have fair to good credit, balances between $5K and $50K, and a
                full-time job. We design for them — not for credit-perfect borrowers.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* What we are not */}
      <section className="py-16 md:py-20 bg-slate-50">
        <div className="container mx-auto px-4 max-w-3xl">
          <h2 className="text-3xl font-bold text-slate-900 mb-6">What Apruvee is — and isn't</h2>
          <div className="space-y-4 text-slate-700 leading-relaxed">
            <div className="bg-white border-l-4 border-primary p-6 rounded-r-xl">
              <p className="font-semibold text-slate-900 mb-2">Apruvee is a marketplace.</p>
              <p>
                We connect borrowers with our network of vetted U.S. lending partners. We earn a
                referral fee from those partners when borrowers find a loan through us — at no cost
                to you.
              </p>
            </div>
            <div className="bg-white border-l-4 border-slate-400 p-6 rounded-r-xl">
              <p className="font-semibold text-slate-900 mb-2">Apruvee is not a lender.</p>
              <p>
                We don't make loans, set interest rates, or decide who gets approved. Those decisions
                are made by our lending partners based on their own underwriting criteria.
              </p>
            </div>
            <div className="bg-white border-l-4 border-slate-400 p-6 rounded-r-xl">
              <p className="font-semibold text-slate-900 mb-2">Apruvee is not a debt relief or credit repair company.</p>
              <p>
                We don't negotiate with creditors, settle debts, or repair credit reports. If you're
                in serious financial distress, a nonprofit credit counselor (visit{" "}
                <a href="https://www.nfcc.org" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline font-medium">
                  nfcc.org
                </a>
                ) may be a better starting point than a consolidation loan.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Company info */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4 max-w-3xl">
          <h2 className="text-3xl font-bold text-slate-900 mb-6">Company information</h2>
          <div className="bg-slate-50 rounded-2xl p-8 border border-slate-200">
            <dl className="grid sm:grid-cols-2 gap-6 text-slate-700">
              <div>
                <dt className="text-sm font-semibold text-slate-500 uppercase tracking-wide mb-1">Founded</dt>
                <dd className="text-lg">2026</dd>
              </div>
              <div>
                <dt className="text-sm font-semibold text-slate-500 uppercase tracking-wide mb-1">Headquartered</dt>
                <dd className="text-lg">Raleigh, North Carolina</dd>
              </div>
              <div>
                <dt className="text-sm font-semibold text-slate-500 uppercase tracking-wide mb-1">Founder & CEO</dt>
                <dd className="text-lg">Chris Kachel</dd>
              </div>
              <div>
                <dt className="text-sm font-semibold text-slate-500 uppercase tracking-wide mb-1">Business structure</dt>
                <dd className="text-lg">Apruvee, LLC (North Carolina)</dd>
              </div>
              <div className="sm:col-span-2">
                <dt className="text-sm font-semibold text-slate-500 uppercase tracking-wide mb-1">Mailing address</dt>
                <dd className="text-lg">4030 Wake Forest Road, STE 349<br />Raleigh, NC 27609</dd>
              </div>
              <div className="sm:col-span-2">
                <dt className="text-sm font-semibold text-slate-500 uppercase tracking-wide mb-1">Contact</dt>
                <dd className="text-lg">
                  <a href="mailto:chris@apruvee.com" className="text-primary hover:underline">chris@apruvee.com</a>{" "}
                  &middot;{" "}
                  <a href="tel:+19195189294" className="text-primary hover:underline">(919) 518-9294</a>
                </dd>
              </div>
            </dl>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-slate-50 text-center">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl md:text-3xl font-bold text-slate-900 mb-4">Ready to see your options?</h2>
          <p className="text-slate-600 mb-8">Soft credit pull only. No impact to your credit score.</p>
          <Link
            href="/apply"
            className="inline-flex items-center justify-center rounded-xl bg-primary px-8 py-4 text-lg font-semibold text-white shadow-lg hover:bg-primary/90 transition-all hover:-translate-y-1"
          >
            Check My Options
          </Link>
        </div>
      </section>
    </PageWrapper>
  );
}
