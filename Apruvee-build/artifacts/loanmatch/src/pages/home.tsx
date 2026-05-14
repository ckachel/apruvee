import { Link } from "wouter";
import { CheckCircle, Shield, Clock, TrendingDown, Phone, Lock, Star } from "lucide-react";
import { PageWrapper } from "@/components/layout/page-wrapper";
import heroImage from "@/assets/hero-relief.png";

export default function Home() {
  return (
    <PageWrapper>
      {/* Marketplace disclosure banner */}
      <div className="bg-slate-900 text-slate-200 text-xs md:text-sm py-2 px-4 text-center">
        <span className="font-semibold text-white">Apruvee is a marketplace, not a lender.</span>{" "}
        <span className="text-slate-400">We connect you with vetted lending partners — we never make loans ourselves.</span>
      </div>

      {/* Hero Section */}
      <section className="relative overflow-hidden bg-slate-50 pt-12 pb-20 md:pt-20 md:pb-28">
        <div className="absolute top-0 right-0 -translate-y-12 translate-x-1/3 opacity-20 pointer-events-none">
          <div className="w-96 h-96 rounded-full bg-secondary blur-3xl" />
        </div>
        <div className="absolute bottom-0 left-0 translate-y-1/3 -translate-x-1/3 opacity-20 pointer-events-none">
          <div className="w-[500px] h-[500px] rounded-full bg-primary blur-3xl" />
        </div>

        <div className="container mx-auto px-4 relative z-10">
          <div className="grid lg:grid-cols-2 gap-12 items-center max-w-6xl mx-auto">
            <div className="text-center lg:text-left animate-in fade-in slide-in-from-bottom-8 duration-700">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-secondary text-primary text-sm font-semibold mb-6">
                <Shield className="w-4 h-4" />
                <span>No impact to your credit score to check rates</span>
              </div>

              <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-slate-900 tracking-tight leading-[1.1] mb-6">
                Clear your debt.<br />
                <span className="text-primary">Clear your mind.</span>
              </h1>

              <div className="flex flex-col sm:flex-row items-center lg:items-start justify-center lg:justify-start gap-4 mt-8">
                <Link
                  href="/apply"
                  className="w-full sm:w-auto inline-flex items-center justify-center rounded-xl bg-primary px-8 py-4 text-lg font-semibold text-white shadow-lg hover:bg-primary/90 transition-all hover:-translate-y-1 hover:shadow-xl focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
                >
                  Check My Options
                </Link>
              </div>

              <div className="mt-6 flex flex-col items-center lg:items-start gap-y-2 text-sm text-slate-600 font-medium">
                <span className="inline-flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-primary" />
                  No SSN required to start
                </span>
                <span className="inline-flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-primary" />
                  Multiple lenders compete for you
                </span>
                <span className="inline-flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-primary" />
                  Takes 2 minutes or less
                </span>
              </div>

              {/* Trust badges */}
              <div className="mt-8 flex flex-wrap items-center justify-center lg:justify-start gap-3">
                <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white border border-slate-200 text-slate-700 text-xs font-semibold shadow-sm">
                  <Lock className="w-3.5 h-3.5 text-primary" />
                  Soft Pull Only
                </div>
                <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white border border-slate-200 text-slate-700 text-xs font-semibold shadow-sm">
                  <Shield className="w-3.5 h-3.5 text-primary" />
                  TCPA Compliant
                </div>
                <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white border border-slate-200 text-slate-700 text-xs font-semibold shadow-sm">
                  <Star className="w-3.5 h-3.5 text-primary" />
                  7+ Lenders
                </div>
              </div>

              {/* Phone */}
              <div className="mt-5 flex items-center justify-center lg:justify-start gap-2 text-sm text-slate-500">
                <Phone className="w-4 h-4" />
                <span>Questions? Call us: </span>
                <a href="tel:+19195189294" className="text-primary font-semibold hover:underline">(919) 518-9294</a>
              </div>
            </div>

            <div className="relative animate-in fade-in slide-in-from-bottom-8 duration-1000">
              <div className="absolute -inset-4 bg-gradient-to-tr from-primary/10 to-secondary/30 rounded-3xl blur-2xl" />
              <img
                src={heroImage}
                alt="A relieved woman checking her loan options at her kitchen table"
                className="relative rounded-2xl shadow-2xl w-full h-auto object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* How it works */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <h2 className="text-3xl font-bold text-slate-900 mb-4">The clearest path forward</h2>
            <p className="text-slate-600">We've simplified the process so you can focus on what matters: getting out of debt faster.</p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            <div className="flex flex-col items-center text-center p-6 rounded-2xl bg-slate-50">
              <div className="w-16 h-16 rounded-2xl bg-secondary flex items-center justify-center mb-6 text-primary">
                <Clock className="w-8 h-8" />
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-2">1. Tell us your goal</h3>
              <p className="text-slate-600">Answer a few simple questions about your debt and income. It takes less than 2 minutes.</p>
            </div>
            
            <div className="flex flex-col items-center text-center p-6 rounded-2xl bg-slate-50">
              <div className="w-16 h-16 rounded-2xl bg-secondary flex items-center justify-center mb-6 text-primary">
                <CheckCircle className="w-8 h-8" />
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-2">2. Compare offers</h3>
              <p className="text-slate-600">We'll show you pre-qualified offers from our network of trusted lending partners side-by-side.</p>
            </div>
            
            <div className="flex flex-col items-center text-center p-6 rounded-2xl bg-slate-50">
              <div className="w-16 h-16 rounded-2xl bg-secondary flex items-center justify-center mb-6 text-primary">
                <TrendingDown className="w-8 h-8" />
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-2">3. Lower your rate</h3>
              <p className="text-slate-600">Choose the best loan, finalize with the lender, and start paying down debt with a lower APR.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Trust Section */}
      <section className="py-24 bg-primary text-white overflow-hidden relative">
        <div className="absolute inset-0 opacity-10 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] mix-blend-overlay"></div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold mb-6">Security & privacy you can count on.</h2>
              <p className="text-primary-foreground/80 text-lg mb-8 leading-relaxed">
                We use bank-level 256-bit encryption to secure your data. We only partner with reputable lenders who meet our strict standards for transparency and fair practices.
              </p>
              
              <ul className="space-y-4">
                {[
                  "No hidden fees or bait-and-switch tactics",
                  "Your data is never sold to scammers",
                  "US-based customer support",
                  "Clear terms and full transparency"
                ].map((item, i) => (
                  <li key={i} className="flex items-center gap-3">
                    <CheckCircle className="w-5 h-5 text-secondary" />
                    <span className="font-medium">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
            
            <div className="bg-white/10 border border-white/20 p-8 rounded-3xl backdrop-blur-sm">
              <div className="flex items-center gap-4 mb-6">
                <Shield className="w-10 h-10 text-secondary" />
                <div>
                  <div className="font-bold text-xl">Bank-Level Security</div>
                  <div className="text-white/70 text-sm">256-bit SSL Encryption</div>
                </div>
              </div>
              <ul className="space-y-3 text-white/90">
                <li className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-secondary shrink-0 mt-0.5" />
                  <span>Soft credit pull only — no impact to your score</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-secondary shrink-0 mt-0.5" />
                  <span>Vetted U.S. lending partners only</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-secondary shrink-0 mt-0.5" />
                  <span>Your data is never sold to third parties</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-secondary shrink-0 mt-0.5" />
                  <span>TCPA-compliant consent on every request</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ preview */}
      <section className="py-20 bg-slate-50">
        <div className="container mx-auto px-4 max-w-3xl">
          <h2 className="text-3xl font-bold text-slate-900 text-center mb-3">Common questions</h2>
          <p className="text-center text-slate-600 mb-12">Quick answers to what most people ask first.</p>

          <div className="space-y-4">
            {[
              {
                q: "Will checking my rates hurt my credit score?",
                a: "No. Apruvee uses a soft credit pull, which has zero impact on your credit score. A hard pull only happens later, if you decide to formally apply with a specific lender."
              },
              {
                q: "Is Apruvee a lender?",
                a: "No. Apruvee is a marketplace, not a lender. We connect you with our network of vetted lending partners so you can compare multiple pre-qualified offers in one place. All loan terms are determined by the individual lender."
              },
              {
                q: "How does Apruvee make money?",
                a: "We're paid a referral fee by our lender partners when a borrower we've matched accepts a loan. We're paid the same amount regardless of which lender you choose, so we have no incentive to push you toward one offer over another. Apruvee is always free for borrowers."
              },
            ].map((faq, i) => (
              <details key={i} className="group bg-white p-6 rounded-2xl shadow-sm border border-slate-100 hover:border-primary/30 transition-colors">
                <summary className="flex items-center justify-between gap-4 cursor-pointer list-none font-bold text-slate-900 text-lg">
                  <span>{faq.q}</span>
                  <span className="text-slate-400 group-open:rotate-180 transition-transform shrink-0">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="6 9 12 15 18 9"/></svg>
                  </span>
                </summary>
                <p className="text-slate-600 leading-relaxed mt-4">{faq.a}</p>
              </details>
            ))}
          </div>

          <div className="text-center mt-10">
            <Link
              href="/faq"
              className="inline-flex items-center gap-2 text-primary font-semibold hover:underline"
            >
              See all frequently asked questions
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/></svg>
            </Link>
          </div>
        </div>
      </section>

      {/* Bottom CTA */}
      <section className="py-20 bg-white text-center">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-6">Ready to see your options?</h2>
          <p className="text-slate-600 text-lg mb-8 max-w-xl mx-auto">
            Take the first step towards financial clarity. It's fast, free, and secure.
          </p>
          <Link 
            href="/apply" 
            className="inline-flex items-center justify-center rounded-xl bg-primary px-8 py-4 text-lg font-semibold text-white shadow-lg hover:bg-primary/90 transition-all hover:-translate-y-1 hover:shadow-xl focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
          >
            Get Started Now
          </Link>
        </div>
      </section>
    </PageWrapper>
  );
}
