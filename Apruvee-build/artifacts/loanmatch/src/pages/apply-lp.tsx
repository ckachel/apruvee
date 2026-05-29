import { useState, useEffect } from "react";
import { useLocation } from "wouter";
import { Shield, Lock, CheckCircle, ArrowRight, ArrowLeft, Star } from "lucide-react";
import { Link } from "wouter";
import {
  trackApplyStarted,
  trackApplyStepComplete,
  trackLeadConversion,
} from "@/lib/analytics";

// ─── LANDING PAGE VARIANT OF THE APPLY FLOW ──────────────────────────────────
// Route: /apply-lp
// Purpose: Paid traffic landing page — no nav, no footer distractions.
// TEST: This page vs homepage (apruvee.com) for Google Ads traffic.
// Metric: generate_lead rate (leads / sessions)
// GA4 event: lp_variant_view fires on mount with variant="apply_direct"
// ─────────────────────────────────────────────────────────────────────────────

const TOTAL_STEPS = 7;

const LOAN_AMOUNTS = [
  { label: "$1,000 – $5,000", value: "3000" },
  { label: "$5,000 – $10,000", value: "7500" },
  { label: "$10,000 – $20,000", value: "15000" },
  { label: "$20,000 – $35,000", value: "27500" },
  { label: "$35,000 – $50,000", value: "42500" },
];

const LOAN_PURPOSES = [
  "Debt Consolidation",
  "Credit Card Payoff",
  "Home Improvement",
  "Medical Expenses",
  "Major Purchase",
  "Other",
];

const CREDIT_SCORES = [
  { label: "Excellent (720+)", value: "Excellent 720+" },
  { label: "Good (680–719)", value: "Good 680-719" },
  { label: "Fair (640–679)", value: "Fair 640-679" },
  { label: "Poor (below 640)", value: "Poor below 640" },
];

const EMPLOYMENT_STATUSES = [
  "Employed Full-Time",
  "Employed Part-Time",
  "Self-Employed",
  "Retired",
  "Not Currently Employed",
];

const US_STATES = [
  ["AL","Alabama"],["AK","Alaska"],["AZ","Arizona"],["AR","Arkansas"],
  ["CA","California"],["CO","Colorado"],["CT","Connecticut"],["DE","Delaware"],
  ["FL","Florida"],["GA","Georgia"],["HI","Hawaii"],["ID","Idaho"],
  ["IL","Illinois"],["IN","Indiana"],["IA","Iowa"],["KS","Kansas"],
  ["KY","Kentucky"],["LA","Louisiana"],["ME","Maine"],["MD","Maryland"],
  ["MA","Massachusetts"],["MI","Michigan"],["MN","Minnesota"],["MS","Mississippi"],
  ["MO","Missouri"],["MT","Montana"],["NE","Nebraska"],["NV","Nevada"],
  ["NH","New Hampshire"],["NJ","New Jersey"],["NM","New Mexico"],["NY","New York"],
  ["NC","North Carolina"],["ND","North Dakota"],["OH","Ohio"],["OK","Oklahoma"],
  ["OR","Oregon"],["PA","Pennsylvania"],["RI","Rhode Island"],["SC","South Carolina"],
  ["SD","South Dakota"],["TN","Tennessee"],["TX","Texas"],["UT","Utah"],
  ["VT","Vermont"],["VA","Virginia"],["WA","Washington"],["WV","West Virginia"],
  ["WI","Wisconsin"],["WY","Wyoming"],["DC","Washington, D.C."],
];

type FormData = {
  loanAmount: string;
  loanPurpose: string;
  creditScore: string;
  annualIncome: string;
  employmentStatus: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  state: string;
  consentToContact: boolean;
};

const INITIAL_FORM: FormData = {
  loanAmount: "",
  loanPurpose: "",
  creditScore: "",
  annualIncome: "",
  employmentStatus: "",
  firstName: "",
  lastName: "",
  email: "",
  phone: "",
  state: "",
  consentToContact: false,
};

export default function ApplyLandingPage() {
  const [, setLocation] = useLocation();
  const [step, setStep] = useState(1);
  const [form, setForm] = useState<FormData>(INITIAL_FORM);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (typeof window !== "undefined" && (window as any).gtag) {
      (window as any).gtag("event", "lp_variant_view", { variant: "apply_direct" });
    }
    trackApplyStarted({ source: "lp_apply_direct" });
  }, []);

  const progress = Math.round((step / TOTAL_STEPS) * 100);

  function update(field: keyof FormData, value: string | boolean) {
    setForm((prev) => ({ ...prev, [field]: value }));
  }

  function nextStep() {
    trackApplyStepComplete({
      step,
      stepName: `step_${step}`,
      loanAmount: Number(form.loanAmount),
      loanPurpose: form.loanPurpose,
      creditScore: form.creditScore,
    });
    setStep((s) => s + 1);
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  function prevStep() {
    setStep((s) => Math.max(1, s - 1));
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  function canAdvance(): boolean {
    switch (step) {
      case 1: return !!form.loanAmount;
      case 2: return !!form.loanPurpose;
      case 3: return !!form.creditScore;
      case 4: return !!form.annualIncome && Number(form.annualIncome) > 0;
      case 5: return !!form.employmentStatus;
      case 6: return !!form.firstName && !!form.lastName && !!form.email && !!form.state;
      case 7: return form.consentToContact;
      default: return false;
    }
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!canAdvance()) return;
    setIsSubmitting(true);
    setError(null);
    try {
      const res = await fetch("/api/leads", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          loanAmount: Number(form.loanAmount),
          loanPurpose: form.loanPurpose,
          creditScore: form.creditScore,
          annualIncome: Number(form.annualIncome),
          employmentStatus: form.employmentStatus,
          firstName: form.firstName,
          lastName: form.lastName,
          email: form.email,
          phone: form.phone || undefined,
          state: form.state,
          consentToContact: form.consentToContact,
        }),
      });
      if (!res.ok) throw new Error("Submission failed");
      trackLeadConversion({
        loanAmount: Number(form.loanAmount),
        loanPurpose: form.loanPurpose,
        creditScore: form.creditScore,
        state: form.state,
      });
      setLocation(
        `/results?loanAmount=${form.loanAmount}&creditScore=${encodeURIComponent(form.creditScore)}&loanPurpose=${encodeURIComponent(form.loanPurpose)}`
      );
    } catch {
      setError("Something went wrong. Please try again.");
      setIsSubmitting(false);
    }
  }

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col">

      {/* Minimal header */}
      <header className="bg-white border-b border-slate-100 py-3 px-4">
        <div className="container mx-auto max-w-2xl flex items-center justify-between">
          <Link href="/" className="text-xl font-bold text-primary tracking-tight">apruvee</Link>
          <div className="flex items-center gap-4 text-xs text-slate-500">
            <span className="flex items-center gap-1"><Lock className="w-3 h-3" /> 256-bit SSL</span>
            <span className="flex items-center gap-1"><Shield className="w-3 h-3" /> Soft pull only</span>
          </div>
        </div>
      </header>

      {/* Required disclosure — Personal loans policy compliance */}
      <div className="bg-amber-50 border-b border-amber-200 py-2 px-4 text-center text-xs text-amber-800">
        Apruvee is not a lender. We connect borrowers with third-party lending partners. Rates, terms, and approval are determined by the lender. Not available in all states. Completing this form does not guarantee a loan offer.
      </div>

      {/* Progress bar */}
      <div className="bg-white border-b border-slate-100">
        <div className="container mx-auto max-w-2xl px-4 py-3">
          <div className="flex items-center justify-between text-xs text-slate-500 mb-1.5">
            <span>Step {step} of {TOTAL_STEPS}</span>
            <span>{progress}% complete</span>
          </div>
          <div className="h-2 w-full bg-slate-200 rounded-full overflow-hidden">
            <div className="h-full bg-primary transition-all duration-500 ease-out" style={{ width: `${progress}%` }} />
          </div>
        </div>
      </div>

      {/* Form */}
      <main className="flex-1 container mx-auto max-w-2xl px-4 py-8">
        <form onSubmit={handleSubmit}>

          {/* Step 1: Loan Amount */}
          {step === 1 && (
            <div className="animate-in fade-in slide-in-from-right-4 duration-300">
              <div className="bg-secondary/40 border border-primary/20 rounded-xl p-3 mb-6 flex items-center gap-2 text-sm text-slate-700">
                <Shield className="w-4 h-4 shrink-0 text-primary" />
                <span><strong>No impact to your credit score.</strong> Soft pull only.</span>
              </div>
              <h1 className="text-2xl md:text-3xl font-bold text-slate-900 mb-2">How much do you need?</h1>
              <p className="text-slate-500 mb-6">Select the amount you'd like to consolidate or borrow.</p>
              <div className="grid grid-cols-1 gap-3">
                {LOAN_AMOUNTS.map(({ label, value }) => (
                  <button key={value} type="button"
                    onClick={() => { update("loanAmount", value); nextStep(); }}
                    className={`w-full text-left px-5 py-4 rounded-xl border-2 font-medium transition-all ${form.loanAmount === value ? "border-primary bg-primary/5 text-primary" : "border-slate-200 bg-white text-slate-700 hover:border-primary/40"}`}>
                    {label}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Step 2: Loan Purpose */}
          {step === 2 && (
            <div className="animate-in fade-in slide-in-from-right-4 duration-300">
              <h1 className="text-2xl md:text-3xl font-bold text-slate-900 mb-2">What's the loan for?</h1>
              <p className="text-slate-500 mb-6">This helps us match you with the right lenders.</p>
              <div className="grid grid-cols-1 gap-3">
                {LOAN_PURPOSES.map((purpose) => (
                  <button key={purpose} type="button"
                    onClick={() => { update("loanPurpose", purpose); nextStep(); }}
                    className={`w-full text-left px-5 py-4 rounded-xl border-2 font-medium transition-all ${form.loanPurpose === purpose ? "border-primary bg-primary/5 text-primary" : "border-slate-200 bg-white text-slate-700 hover:border-primary/40"}`}>
                    {purpose}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Step 3: Credit Score */}
          {step === 3 && (
            <div className="animate-in fade-in slide-in-from-right-4 duration-300">
              <h1 className="text-2xl md:text-3xl font-bold text-slate-900 mb-2">What's your credit score?</h1>
              <p className="text-slate-500 mb-6">An estimate is fine. This won't affect your score.</p>
              <div className="grid grid-cols-1 gap-3">
                {CREDIT_SCORES.map(({ label, value }) => (
                  <button key={value} type="button"
                    onClick={() => { update("creditScore", value); nextStep(); }}
                    className={`w-full text-left px-5 py-4 rounded-xl border-2 font-medium transition-all ${form.creditScore === value ? "border-primary bg-primary/5 text-primary" : "border-slate-200 bg-white text-slate-700 hover:border-primary/40"}`}>
                    {label}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Step 4: Annual Income */}
          {step === 4 && (
            <div className="animate-in fade-in slide-in-from-right-4 duration-300">
              <h1 className="text-2xl md:text-3xl font-bold text-slate-900 mb-2">What's your annual income?</h1>
              <p className="text-slate-500 mb-6">Include all sources — employment, benefits, and other income.</p>
              <div className="relative mb-6">
                <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 text-lg font-medium">$</span>
                <input type="number" min="0" placeholder="e.g. 65000"
                  value={form.annualIncome}
                  onChange={(e) => update("annualIncome", e.target.value)}
                  className="w-full pl-8 pr-4 py-4 rounded-xl border-2 border-slate-200 focus:border-primary focus:outline-none text-lg font-medium text-slate-900 bg-white"
                  autoFocus />
              </div>
              <button type="button" onClick={nextStep} disabled={!canAdvance()}
                className="w-full inline-flex items-center justify-center gap-2 rounded-xl bg-primary px-8 py-4 text-lg font-semibold text-white shadow-lg hover:bg-primary/90 transition-all disabled:opacity-40 disabled:cursor-not-allowed">
                Continue <ArrowRight className="w-5 h-5" />
              </button>
            </div>
          )}

          {/* Step 5: Employment Status */}
          {step === 5 && (
            <div className="animate-in fade-in slide-in-from-right-4 duration-300">
              <h1 className="text-2xl md:text-3xl font-bold text-slate-900 mb-2">What's your employment status?</h1>
              <p className="text-slate-500 mb-6">Select the option that best describes you.</p>
              <div className="grid grid-cols-1 gap-3">
                {EMPLOYMENT_STATUSES.map((status) => (
                  <button key={status} type="button"
                    onClick={() => { update("employmentStatus", status); nextStep(); }}
                    className={`w-full text-left px-5 py-4 rounded-xl border-2 font-medium transition-all ${form.employmentStatus === status ? "border-primary bg-primary/5 text-primary" : "border-slate-200 bg-white text-slate-700 hover:border-primary/40"}`}>
                    {status}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Step 6: Personal Info */}
          {step === 6 && (
            <div className="animate-in fade-in slide-in-from-right-4 duration-300">
              <h1 className="text-2xl md:text-3xl font-bold text-slate-900 mb-2">Almost there.</h1>
              <p className="text-slate-500 mb-6">Your information is encrypted and only used to match you with lenders.</p>
              <div className="space-y-4 mb-6">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1.5">First name</label>
                    <input type="text" placeholder="Jane" value={form.firstName}
                      onChange={(e) => update("firstName", e.target.value)}
                      className="w-full px-4 py-3 rounded-xl border-2 border-slate-200 focus:border-primary focus:outline-none text-slate-900 bg-white" required />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1.5">Last name</label>
                    <input type="text" placeholder="Smith" value={form.lastName}
                      onChange={(e) => update("lastName", e.target.value)}
                      className="w-full px-4 py-3 rounded-xl border-2 border-slate-200 focus:border-primary focus:outline-none text-slate-900 bg-white" required />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1.5">Email address</label>
                  <input type="email" placeholder="jane@email.com" value={form.email}
                    onChange={(e) => update("email", e.target.value)}
                    className="w-full px-4 py-3 rounded-xl border-2 border-slate-200 focus:border-primary focus:outline-none text-slate-900 bg-white" required />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1.5">Phone <span className="text-slate-400 font-normal">(optional)</span></label>
                  <input type="tel" placeholder="(555) 000-0000" value={form.phone}
                    onChange={(e) => update("phone", e.target.value)}
                    className="w-full px-4 py-3 rounded-xl border-2 border-slate-200 focus:border-primary focus:outline-none text-slate-900 bg-white" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1.5">State of residence</label>
                  <select value={form.state} onChange={(e) => update("state", e.target.value)}
                    className="w-full px-4 py-3 rounded-xl border-2 border-slate-200 focus:border-primary focus:outline-none text-slate-900 bg-white" required>
                    <option value="">Select your state...</option>
                    {US_STATES.map(([abbr, name]) => (
                      <option key={abbr} value={abbr}>{name}</option>
                    ))}
                  </select>
                </div>
              </div>
              <button type="button" onClick={nextStep} disabled={!canAdvance()}
                className="w-full inline-flex items-center justify-center gap-2 rounded-xl bg-primary px-8 py-4 text-lg font-semibold text-white shadow-lg hover:bg-primary/90 transition-all disabled:opacity-40 disabled:cursor-not-allowed">
                Continue <ArrowRight className="w-5 h-5" />
              </button>
            </div>
          )}

          {/* Step 7: Consent */}
          {step === 7 && (
            <div className="animate-in fade-in slide-in-from-right-4 duration-300">
              <h1 className="text-2xl md:text-3xl font-bold text-slate-900 mb-2">One last step.</h1>
              <p className="text-slate-500 mb-6">Review your information and consent to see your matched offers.</p>
              <div className="bg-white rounded-xl border border-slate-200 p-5 mb-6 space-y-2 text-sm">
                <div className="flex justify-between"><span className="text-slate-500">Loan amount</span><span className="font-semibold">${Number(form.loanAmount).toLocaleString()}</span></div>
                <div className="flex justify-between"><span className="text-slate-500">Purpose</span><span className="font-semibold">{form.loanPurpose}</span></div>
                <div className="flex justify-between"><span className="text-slate-500">Credit score</span><span className="font-semibold">{form.creditScore}</span></div>
                <div className="flex justify-between"><span className="text-slate-500">Annual income</span><span className="font-semibold">${Number(form.annualIncome).toLocaleString()}</span></div>
                <div className="flex justify-between"><span className="text-slate-500">Name</span><span className="font-semibold">{form.firstName} {form.lastName}</span></div>
                <div className="flex justify-between"><span className="text-slate-500">State</span><span className="font-semibold">{form.state}</span></div>
              </div>
              <label className="flex items-start gap-3 cursor-pointer mb-6">
                <input type="checkbox" checked={form.consentToContact}
                  onChange={(e) => update("consentToContact", e.target.checked)}
                  className="mt-1 w-5 h-5 rounded border-slate-300 text-primary focus:ring-primary shrink-0 cursor-pointer" />
                <span className="text-xs text-slate-500 leading-relaxed">
                  By clicking "See My Rates", I provide my electronic signature and express written consent to be contacted by Apruvee and its lending partners at the phone number and email address provided, including via automated dialing systems, prerecorded messages, and text messages, even if my number is on a Do Not Call registry. Consent is not a condition of purchase. I agree to the{" "}
                  <Link href="/terms" className="text-primary hover:underline" target="_blank">Terms of Service</Link> and{" "}
                  <Link href="/privacy" className="text-primary hover:underline" target="_blank">Privacy Policy</Link>.
                </span>
              </label>
              {error && <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-xl text-sm text-red-700">{error}</div>}
              <button type="submit" disabled={!canAdvance() || isSubmitting}
                className="w-full inline-flex items-center justify-center gap-2 rounded-xl bg-primary px-8 py-4 text-lg font-semibold text-white shadow-lg hover:bg-primary/90 transition-all disabled:opacity-40 disabled:cursor-not-allowed">
                {isSubmitting ? "Finding your offers..." : <><span>See My Rates</span><ArrowRight className="w-5 h-5" /></>}
              </button>
            </div>
          )}

          {/* Back button */}
          {step > 1 && (
            <button type="button" onClick={prevStep}
              className="mt-4 flex items-center gap-2 text-slate-500 hover:text-slate-900 transition-colors text-sm font-medium mx-auto">
              <ArrowLeft className="w-4 h-4" /> Back
            </button>
          )}
        </form>

        {/* Trust signals */}
        <div className="mt-8 flex flex-wrap justify-center gap-x-6 gap-y-2 text-xs text-slate-400">
          <span className="flex items-center gap-1"><CheckCircle className="w-3.5 h-3.5 text-green-500" /> No credit score impact</span>
          <span className="flex items-center gap-1"><Lock className="w-3.5 h-3.5" /> 256-bit encryption</span>
          <span className="flex items-center gap-1"><Star className="w-3.5 h-3.5 text-yellow-400" /> 4.8/5 rating</span>
          <span className="flex items-center gap-1"><Shield className="w-3.5 h-3.5" /> Free to use</span>
        </div>
      </main>

      {/* Minimal footer */}
      <footer className="border-t border-slate-200 py-4 px-4 bg-white">
        <div className="container mx-auto max-w-2xl text-center text-xs text-slate-400 space-y-2">
          <p>Apruvee, LLC is a marketplace, not a lender. We do not make credit decisions or charge application fees. Not available in all states.</p>
          <div className="flex justify-center gap-4">
            <Link href="/privacy" className="hover:text-primary transition-colors">Privacy Policy</Link>
            <Link href="/terms" className="hover:text-primary transition-colors">Terms of Service</Link>
            <Link href="/advertiser-disclosure" className="hover:text-primary transition-colors">Advertiser Disclosure</Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
