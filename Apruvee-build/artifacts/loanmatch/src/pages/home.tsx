import { Link } from "wouter";
import { CheckCircle, Shield, Clock, TrendingDown, Phone, Lock, Star } from "lucide-react";
import { PageWrapper } from "@/components/layout/page-wrapper";
import heroImage from "@/assets/hero-relief.png";
import { useEffect, useState } from "react";

// ─── A/B TEST CONFIG ──────────────────────────────────────────────────────────
//
// TEST 1: Homepage headline
//   Control (v=a): "See loan options you're likely to get approved for"
//   Variant (v=b): "Stop paying 24% APR. See your consolidation options."
//
// TEST 2: CTA button text
//   Control (v=a): "Check My Rates" / "Get Started Now"
//   Variant (v=b): "See My Rate" / "See My Rate"
//
// HOW TO RUN:
//   In Google Ads, duplicate your ad group.
//   Set 50% of traffic Final URL to: https://apruvee.com/?v=b
//   Leave the other 50% at:          https://apruvee.com/
//
// GA4 will log ab_test_view event with variant parameter.
// Compare apply_started rate between variant=a and variant=b in GA4 Explorer.
// Minimum 100 sessions per variant before calling a winner.
//
// ─────────────────────────────────────────────────────────────────────────────

function getVariant(): "a" | "b" {
  if (typeof window === "undefined") return "a";
  const params = new URLSearchParams(window.location.search);
  return params.get("v") === "b" ? "b" : "a";
}

const VARIANTS = {
  a: {
    headline: "See loan options you're likely to get approved for",
    subheadline: "Compare personalized personal loan offers from multiple lenders — without affecting your credit score.",
    heroCta: "Check My Rates",
    bottomCta: "Get Started Now",
  },
  b: {
    headline: "Stop paying 24% APR. See your consolidation options.",
    subheadline: "Compare personalized debt consolidation offers from top lenders — no impact to your credit score.",
    heroCta: "See My Rate",
    bottomCta: "See My Rate",
  },
} as const;

export default function Home() {
  const [variant, setVariant] = useState<"a" | "b">("a");

  useEffect(() => {
    const v = getVariant();
    setVariant(v);

    // Fire GA4 A/B test view event
    if (typeof window !== "undefined" && (window as any).gtag) {
      (window as any).gtag("event", "ab_test_view", {
        test_name: "homepage_headline_cta_v1",
        variant: v,
      });
    }
  }, []);

  const copy = VARIANTS[variant];

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
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-secondary/60 text-primary text-xs font-semibold mb-6 border border-primary/10">
                <Shield className="w-3.5 h-3.5" />
                No impact to your credit score
              </div>

              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-slate-900 leading-tight mb-6">
                {copy.headline}
              </h1>

              <p className="text-lg md:text-xl text-slate-600 mb-8 leading-relaxed max-w-xl mx-auto lg:mx-0">
                {copy.subheadline}
              </p>

              <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                <Link
                  href="/apply"
                  className="inline-flex items-center justify-center rounded-xl bg-primary px-8 py-4 text-lg font-semibold text-white shadow-lg hover:bg-primary/90 transition-all hover:-translate-y-1 hover:shadow-xl focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
                >
                  {copy.heroCta}
                </Link>
                <div className="flex items-center gap-2 text-sm text-slate-500 justify-center lg:justify-start">
                  <CheckCircle className="w-4 h-4 text-green-500 shrink-0" />
                  Takes about 2 minutes
                </div>
              </div>

              <div className="mt-8 flex flex-wrap gap-x-6 gap-y-2 justify-center lg:justify-start text-sm text-slate-500">
                <span className="flex items-center gap-1.5"><Lock className="w-3.5 h-3.5 text-slate-400" /> 256-bit encryption</span>
                <span className="flex items-center gap-1.5"><Shield className="w-3.5 h-3.5 text-slate-400" /> Soft pull only</span>
                <span className="flex items-center gap-1.5"><Star className="w-3.5 h-3.5 text-slate-400" /> 4.8/5 user rating</span>
              </div>
            </div>

            <div className="hidden lg:flex justify-center items-center animate-in fade-in slide-in-from-bottom-8 duration-700 delay-150">
              <img
                src={heroImage}
                alt="Person feeling financial relief"
                className="w-full max-w-md rounded-2xl shadow-2xl object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Trust bar */}
      <section className="bg-white border-y border-slate-100 py-6">
        <div className="container mx-auto px-4">
          <div className="flex flex-wrap justify-center gap-x-10 gap-y-3 text-sm text-slate-500 font-medium">
            <span className="flex items-center gap-2"><CheckCircle className="w-4 h-4 text-green-500" /> No hard credit inquiry</span>
            <span className="flex items-center gap-2"><CheckCircle className="w-4 h-4 text-green-500" /> Multiple lenders, one form</span>
            <span className="flex items-center gap-2"><CheckCircle className="w-4 h-4 text-green-500" /> Rates from 5.99% APR</span>
            <span className="flex items-center gap-2"><CheckCircle className="w-4 h-4 text-green-500" /> Loans up to $50,000</span>
          </div>
        </div>
      </section>

      {/* How it works */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4 max-w-5xl">
          <div className="text-center mb-14">
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">How Apruvee works</h2>
            <p className="text-lg text-slate-600 max-w-2xl mx-auto">Three steps. Two minutes. Zero credit impact.</p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              { icon: Clock, step: "1", title: "Tell us about yourself", desc: "Answer a few quick questions about your loan needs, income, and credit score." },
              { icon: TrendingDown, step: "2", title: "See your matched offers", desc: "We match you with lenders likely to approve you based on your profile." },
              { icon: CheckCircle, step: "3", title: "Choose and apply", desc: "Compare rates and terms, then apply directly with your chosen lender." },
            ].map(({ icon: Icon, step, title, desc }) => (
              <div key={step} className="text-center">
                <div className="w-14 h-14 rounded-2xl bg-primary/10 flex items-center justify-center mx-auto mb-4">
                  <Icon className="w-6 h-6 text-primary" />
                </div>
                <div className="text-xs font-bold text-primary uppercase tracking-widest mb-2">Step {step}</div>
                <h3 className="text-lg font-bold text-slate-900 mb-2">{title}</h3>
                <p className="text-slate-600 text-sm leading-relaxed">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Apruvee */}
      <section className="py-20 bg-slate-50">
        <div className="container mx-auto px-4 max-w-5xl">
          <div className="text-center mb-14">
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">Why borrowers choose Apruvee</h2>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              { icon: Shield, title: "No credit score impact", desc: "We only use a soft inquiry to match you with lenders. Your score is never affected." },
              { icon: TrendingDown, title: "Real pre-qualified rates", desc: "See actual rate ranges based on your profile — not generic advertised rates." },
              { icon: CheckCircle, title: "Multiple lenders, one form", desc: "Fill out one short form and get matched with multiple lenders at once." },
              { icon: Lock, title: "Bank-level security", desc: "Your data is encrypted with 256-bit SSL. We never sell your personal information." },
              { icon: Phone, title: "No hidden fees", desc: "Apruvee is free to use. We're compensated by lenders, never by borrowers." },
              { icon: Star, title: "Built by fintech veterans", desc: "Founded by alumni of LendingTree and Credit Karma who know this market inside out." },
            ].map(({ icon: Icon, title, desc }) => (
              <div key={title} className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm">
                <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center mb-4">
                  <Icon className="w-5 h-5 text-primary" />
                </div>
                <h3 className="font-bold text-slate-900 mb-2">{title}</h3>
                <p className="text-sm text-slate-600 leading-relaxed">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ teaser */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4 max-w-3xl">
          <div className="text-center mb-10">
            <h2 className="text-3xl font-bold text-slate-900 mb-4">Common questions</h2>
          </div>
          <div className="space-y-4">
            {[
              { q: "Will checking my rate hurt my credit score?", a: "No. Apruvee uses a soft credit inquiry to match you with lenders. Soft inquiries do not affect your credit score. A hard inquiry only happens if you formally apply with a specific lender." },
              { q: "Is Apruvee a lender?", a: "No. Apruvee is a comparison marketplace. We connect you with lending partners but do not make loans ourselves, make credit decisions, or charge application fees." },
              { q: "What credit score do I need?", a: "Our lending partners work with a wide range of credit profiles, including fair credit (FICO 580+). Your matches are based on your full profile, not just your credit score." },
              { q: "How long does it take?", a: "The pre-qualification form takes about 2 minutes. Once you choose a lender and formally apply, funding typically takes 1–5 business days depending on the lender." },
            ].map(({ q, a }) => (
              <details key={q} className="group bg-slate-50 rounded-xl border border-slate-200 p-5 cursor-pointer">
                <summary className="font-semibold text-slate-900 flex justify-between items-center list-none">
                  {q}
                  <span className="text-primary ml-4 shrink-0 group-open:rotate-180 transition-transform">▾</span>
                </summary>
                <p className="mt-3 text-slate-600 text-sm leading-relaxed">{a}</p>
              </details>
            ))}
          </div>
          <div className="text-center mt-8">
            <Link href="/faq" className="text-primary hover:underline font-medium text-sm">
              View all FAQs →
            </Link>
          </div>
        </div>
      </section>

      {/* Bottom CTA */}
      <section className="py-20 bg-primary">
        <div className="container mx-auto px-4 text-center max-w-2xl">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Ready to find a better rate?
          </h2>
          <p className="text-primary-foreground/80 text-lg mb-8">
            It's fast, free, and won't affect your credit score.
          </p>
          <Link
            href="/apply"
            className="inline-flex items-center justify-center rounded-xl bg-white px-8 py-4 text-lg font-semibold text-primary shadow-lg hover:bg-slate-50 transition-all hover:-translate-y-1 hover:shadow-xl focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-primary"
          >
            {copy.bottomCta}
          </Link>
        </div>
      </section>
    </PageWrapper>
  );
}
