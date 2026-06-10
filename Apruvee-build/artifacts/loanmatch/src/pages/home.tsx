import { Link } from "wouter";
import { CheckCircle, Shield, Clock, TrendingDown, Phone, Lock, Star } from "lucide-react";
import { PageWrapper } from "@/components/layout/page-wrapper";
import { useEffect, useState } from "react";
import heroImage from "@/assets/hero-relief.png";

export default function Home() {
  // A/B test: headline variant via ?v=b URL parameter
  const [isVariantB, setIsVariantB] = useState(false);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    setIsVariantB(params.get("v") === "b");
  }, []);

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

              {/* Headline: A/B test — control vs variant B */}
              {isVariantB ? (
                <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-slate-900 tracking-tight leading-[1.1] mb-6">
                  Stop paying 24% APR.<br />
                  <span className="text-primary">See your consolidation options.</span>
                </h1>
              ) : (
                <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-slate-900 tracking-tight leading-[1.1] mb-6">
                  Clear your debt.<br />
                  <span className="text-primary">Clear your mind.</span>
                </h1>
              )}

              <div className="flex flex-col sm:flex-row items-center lg:items-start justify-center lg:justify-start gap-4 mt-8">
                <Link
                  href="/apply"
                  className="w-full sm:w-auto inline-flex items-center justify-center rounded-xl bg-primary px-8 py-4 text-lg font-semibold text-white shadow-lg hover:bg-primary/90 transition-all hover:-translate-y-1 hover:shadow-xl focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
                >
                  See My Rate
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
                <span>Questions? Call us at <a href="tel:+18005550000" className="underline hover:text-primary">(800) 555-0000</a></span>
              </div>
            </div>

            {/* Hero image */}
            <div className="hidden lg:flex items-center justify-center animate-in fade-in slide-in-from-bottom-8 duration-700 delay-150">
              <img
                src={heroImage}
                alt="Person relieved after consolidating debt"
                className="w-full max-w-lg rounded-3xl shadow-2xl object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* How it works */}
      <section className="py-24 bg-white">
        <div className="container mx-auto px-4 max-w-5xl">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">How Apruvee works</h2>
            <p className="text-lg text-slate-600 max-w-2xl mx-auto">Three steps to lower your rate. No hard credit pull until you choose a lender.</p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="flex flex-col items-center text-center p-6 rounded-2xl bg-slate-50">
              <div className="w-16 h-16 rounded-2xl bg-secondary flex items-center justify-center mb-6 text-primary">
                <Shield className="w-8 h-8" />
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-2">1. Check your options</h3>
              <p className="text-slate-600">Answer a few questions about your loan needs. We use a soft pull — zero impact to your credit score.</p>
            </div>

            <div className="flex flex-col items-center text-center p-6 rounded-2xl bg-slate-50">
              <div className="w-16 h-16 rounded-2xl bg-secondary flex items-center justify-center mb-6 text-primary">
                <Clock className="w-8 h-8" />
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
                We use bank-level 256-bit encryption to secure your data. We work with leading U.S. lending partners and present their offers transparently so you can make an informed decision.
              </p>
              <Link
                href="/apply"
                className="inline-flex items-center justify-center rounded-xl bg-white text-primary px-8 py-3.5 text-base font-semibold shadow hover:bg-white/90 transition-all"
              >
                See My Rate
              </Link>
            </div>
            <div className="grid grid-cols-2 gap-4">
              {[
                { icon: <Lock className="w-6 h-6" />, title: "256-bit encryption", desc: "Your personal data is protected with bank-level security at every step." },
                { icon: <Shield className="w-6 h-6" />, title: "Soft pull only", desc: "Checking your options never affects your credit score." },
                { icon: <Star className="w-6 h-6" />, title: "Vetted partners", desc: "Every lender in our network is a licensed U.S. financial institution." },
                { icon: <CheckCircle className="w-6 h-6" />, title: "No hidden fees", desc: "Apruvee is free to use. We're paid by lenders, not borrowers." },
              ].map((item) => (
                <div key={item.title} className="bg-white/10 rounded-2xl p-5">
                  <div className="text-white mb-3">{item.icon}</div>
                  <h3 className="font-bold text-white mb-1">{item.title}</h3>
                  <p className="text-primary-foreground/70 text-sm">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Bottom CTA */}
      <section className="py-24 bg-slate-50 text-center">
        <div className="container mx-auto px-4 max-w-2xl">
          <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">
            Ready to stop overpaying?
          </h2>
          <p className="text-lg text-slate-600 mb-8">
            It's fast, free, and secure.
          </p>
          <Link
            href="/apply"
            className="inline-flex items-center justify-center rounded-xl bg-primary px-8 py-4 text-lg font-semibold text-white shadow-lg hover:bg-primary/90 transition-all hover:-translate-y-1 hover:shadow-xl focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
          >
            See My Rate
          </Link>
        </div>
      </section>
    </PageWrapper>
  );
}
