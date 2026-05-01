import { Link } from "wouter";
import { Shield, Heart, Users, CheckCircle } from "lucide-react";
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
            Built to take the anxiety out of paying off debt.
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
              Apruvee was founded in 2026 by Chris Kachel after watching too many friends and family
              members get trapped in spirals of credit card debt. The math is brutal: a $10,000
              balance at 24% APR can take more than 30 years to pay off if you only make minimums —
              and cost over $20,000 in interest along the way.
            </p>
            <p>
              The frustrating part is that better options often exist. A simple personal loan at
              12% APR can shave years off the same balance and save thousands of dollars. But finding
              the right loan means rate-shopping across half a dozen lenders, each with their own
              forms, their own credit pulls, and their own pre-qualification rules. Most people give up.
            </p>
            <p>
              We built Apruvee to do that shopping <em>for</em> you. Tell us a few things about your
              situation. We perform a soft credit check that doesn't affect your score. We show you
              the loan offers you're most likely to be approved for — side by side, with real APRs,
              real payments, and real terms. Then you choose, or you walk away. No pressure.
            </p>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-16 md:py-20 bg-slate-50">
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
      <section className="py-16 md:py-20 bg-white">
        <div className="container mx-auto px-4 max-w-3xl">
          <h2 className="text-3xl font-bold text-slate-900 mb-6">What Apruvee is — and isn't</h2>
          <div className="space-y-4 text-slate-700 leading-relaxed">
            <div className="bg-slate-50 border-l-4 border-primary p-6 rounded-r-xl">
              <p className="font-semibold text-slate-900 mb-2">Apruvee is a marketplace.</p>
              <p>
                We connect borrowers with our network of vetted U.S. lending partners. We earn a
                referral fee from those partners when borrowers find a loan through us — at no cost
                to you.
              </p>
            </div>
            <div className="bg-slate-50 border-l-4 border-slate-400 p-6 rounded-r-xl">
              <p className="font-semibold text-slate-900 mb-2">Apruvee is not a lender.</p>
              <p>
                We don't make loans, set interest rates, or decide who gets approved. Those decisions
                are made by our lending partners based on their own underwriting criteria.
              </p>
            </div>
            <div className="bg-slate-50 border-l-4 border-slate-400 p-6 rounded-r-xl">
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
      <section className="py-16 bg-slate-50">
        <div className="container mx-auto px-4 max-w-3xl">
          <h2 className="text-3xl font-bold text-slate-900 mb-6">Company information</h2>
          <div className="bg-white rounded-2xl p-8 border border-slate-200">
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
                <dt className="text-sm font-semibold text-slate-500 uppercase tracking-wide mb-1">Founder &amp; CEO</dt>
                <dd className="text-lg">Chris Kachel</dd>
              </div>
              <div>
                <dt className="text-sm font-semibold text-slate-500 uppercase tracking-wide mb-1">Business structure</dt>
                <dd className="text-lg">North Carolina LLC</dd>
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
      <section className="py-16 bg-white text-center">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl md:text-3xl font-bold text-slate-900 mb-6">Ready to see your options?</h2>
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
