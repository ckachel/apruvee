import { useState, useEffect } from "react";
import { useLocation, Link } from "wouter";
import { PageWrapper } from "@/components/layout/page-wrapper";
import { Shield, ArrowLeft, Loader2 } from "lucide-react";
import { useSubmitLead } from "@workspace/api-client-react";
import {
  trackApplyStarted,
  trackApplyStepComplete,
  trackApplyAbandoned,
  trackLeadConversion,
  STEP_NAMES,
} from "@/lib/analytics";

type FormData = {
  loanAmount: number | null;
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

const LOAN_AMOUNTS = [
  { label: "$1,000 – $5,000", value: 3000 },
  { label: "$5,000 – $10,000", value: 7500 },
  { label: "$10,000 – $20,000", value: 15000 },
  { label: "$20,000 – $35,000", value: 27500 },
  { label: "$35,000+", value: 50000 },
];

const LOAN_PURPOSES = [
  "Debt Consolidation",
  "Credit Card Payoff",
  "Home Improvement",
  "Medical Bills",
  "Major Purchase",
  "Other",
];

const CREDIT_SCORES = [
  { label: "Excellent (720+)", value: "Excellent" },
  { label: "Good (680-719)", value: "Good" },
  { label: "Fair (640-679)", value: "Fair" },
  { label: "Poor (<640)", value: "Poor" },
];

const EMPLOYMENT_STATUSES = [
  "Employed",
  "Self-Employed",
  "Retired",
  "Other",
];

export default function Apply() {
  const [, setLocation] = useLocation();
  const submitLead = useSubmitLead();
  const [step, setStep] = useState(1);

  useEffect(() => {
    trackApplyStarted({ source: document.referrer?.includes("google") ? "google_ads" : "organic" });
  }, []);

  const [data, setData] = useState<FormData>({
    loanAmount: null,
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
  });

  const updateData = (fields: Partial<FormData>) => {
    setData((prev) => ({ ...prev, ...fields }));
  };

  const nextStep = () => {
    trackApplyStepComplete({
      step,
      stepName: STEP_NAMES[step] ?? `step_${step}`,
      loanAmount: data.loanAmount,
      loanPurpose: data.loanPurpose,
      creditScore: data.creditScore,
    });
    setStep((s) => Math.min(s + 1, 7));
  };

  const prevStep = () => setStep((s) => Math.max(s - 1, 1));

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!data.consentToContact) return;

    submitLead.mutate(
      {
        data: {
          loanAmount: data.loanAmount || 10000,
          loanPurpose: data.loanPurpose,
          creditScore: data.creditScore,
          annualIncome: Number(data.annualIncome.replace(/[^0-9]/g, "")),
          employmentStatus: data.employmentStatus,
          firstName: data.firstName,
          lastName: data.lastName,
          email: data.email,
          phone: data.phone,
          state: data.state,
          consentToContact: data.consentToContact,
        },
      },
      {
        onSuccess: () => {
          trackLeadConversion({
            loanAmount: data.loanAmount || 10000,
            loanPurpose: data.loanPurpose,
            creditScore: data.creditScore,
            state: data.state,
          });
          const params = new URLSearchParams({
            loanAmount: String(data.loanAmount || 10000),
            loanPurpose: data.loanPurpose,
            creditScore: data.creditScore,
          });
          setLocation(`/results?${params.toString()}`);
        },
      }
    );
  };

  const progress = (step / 7) * 100;

  return (
    <PageWrapper hideFooter>
      <div className="min-h-screen bg-slate-50 flex flex-col pt-6 pb-20">
        <div className="container mx-auto px-4 max-w-xl">

          {/* Header */}
          <div className="flex items-center justify-between mb-8">
            <button
              onClick={step === 1 ? () => setLocation("/") : prevStep}
              className="text-slate-500 hover:text-slate-900 transition-colors p-2 -ml-2 rounded-full hover:bg-slate-200"
              type="button"
            >
              <ArrowLeft className="w-5 h-5" />
            </button>
            <div className="flex items-center gap-2 text-primary font-bold">
              <Shield className="w-5 h-5 text-secondary fill-secondary" />
              <span>Secure Form</span>
            </div>
            <div className="w-9" />
          </div>

          {/* Progress Bar */}
          <div className="mb-10">
            <div className="h-2 w-full bg-slate-200 rounded-full overflow-hidden">
              <div
                className="h-full bg-primary transition-all duration-500 ease-out"
                style={{ width: `${progress}%` }}
              />
            </div>
          </div>

          {/* Form Container */}
          <div className="bg-white rounded-3xl p-8 md:p-10 shadow-xl border border-slate-100 relative overflow-hidden">
            <form onSubmit={handleSubmit}>

              {/* Step 1: Loan Amount */}
              {step === 1 && (
                <div className="animate-in fade-in slide-in-from-right-8 duration-500">
                  <h2 className="text-2xl md:text-3xl font-bold text-slate-900 mb-2">How much do you need?</h2>
                  <p className="text-slate-500 mb-6">Estimate the amount you'd like to consolidate.</p>
                  <div className="bg-secondary/40 border border-primary/20 rounded-xl p-4 mb-8 flex items-start gap-3 text-sm text-slate-700">
                    <Shield className="w-5 h-5 shrink-0 text-primary mt-0.5" />
                    <div>
                      <p className="font-semibold text-slate-900 mb-0.5">This won't affect your credit score.</p>
                      <p className="text-slate-600">
                        Apruvee is a marketplace, not a lender. We use a soft credit inquiry to
                        match you with offers — no SSN required to start.{" "}
                        <Link
                          href="/blog/how-soft-credit-pull-works"
                          className="text-primary font-medium hover:underline"
                        >
                          How does a soft pull work?
                        </Link>
                      </p>
                    </div>
                  </div>
                  <div className="space-y-3">
                    {LOAN_AMOUNTS.map(({ label, value }) => (
                      <button
                        key={value}
                        type="button"
                        onClick={() => {
                          updateData({ loanAmount: value });
                          nextStep();
                        }}
                        className="w-full text-left px-5 py-4 rounded-xl border-2 border-slate-200 hover:border-primary font-medium text-slate-700 hover:text-primary transition-all hover:bg-primary/5"
                      >
                        {label}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Step 2: Loan Purpose */}
              {step === 2 && (
                <div className="animate-in fade-in slide-in-from-right-8 duration-500">
                  <h2 className="text-2xl md:text-3xl font-bold text-slate-900 mb-2">What's the loan for?</h2>
                  <p className="text-slate-500 mb-6">Select the primary purpose for this loan.</p>
                  <div className="space-y-3">
                    {LOAN_PURPOSES.map((purpose) => (
                      <button
                        key={purpose}
                        type="button"
                        onClick={() => {
                          updateData({ loanPurpose: purpose });
                          nextStep();
                        }}
                        className="w-full text-left px-5 py-4 rounded-xl border-2 border-slate-200 hover:border-primary font-medium text-slate-700 hover:text-primary transition-all hover:bg-primary/5"
                      >
                        {purpose}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Step 3: Credit Score */}
              {step === 3 && (
                <div className="animate-in fade-in slide-in-from-right-8 duration-500">
                  <h2 className="text-2xl md:text-3xl font-bold text-slate-900 mb-2">What's your credit score?</h2>
                  <p className="text-slate-500 mb-6">An estimate is fine — this won't affect your score.</p>
                  <div className="space-y-3">
                    {CREDIT_SCORES.map(({ label, value }) => (
                      <button
                        key={value}
                        type="button"
                        onClick={() => {
                          updateData({ creditScore: value });
                          nextStep();
                        }}
                        className="w-full text-left px-5 py-4 rounded-xl border-2 border-slate-200 hover:border-primary font-medium text-slate-700 hover:text-primary transition-all hover:bg-primary/5"
                      >
                        {label}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Step 4: Annual Income */}
              {step === 4 && (
                <div className="animate-in fade-in slide-in-from-right-8 duration-500">
                  <h2 className="text-2xl md:text-3xl font-bold text-slate-900 mb-2">What's your annual income?</h2>
                  <p className="text-slate-500 mb-6">Include all income sources — employment, benefits, and other income.</p>
                  <div className="relative mb-6">
                    <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 text-lg">$</span>
                    <input
                      type="text"
                      inputMode="numeric"
                      placeholder="e.g. 65,000"
                      value={data.annualIncome}
                      onChange={(e) => updateData({ annualIncome: e.target.value })}
                      className="w-full pl-8 pr-4 py-4 rounded-xl border-2 border-slate-200 focus:border-primary outline-none text-lg font-medium text-slate-900"
                      autoFocus
                    />
                  </div>
                  <button
                    type="button"
                    disabled={!data.annualIncome}
                    onClick={nextStep}
                    className="w-full bg-primary text-white rounded-xl py-4 font-bold text-lg hover:bg-primary/90 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
                  >
                    Continue
                  </button>
                </div>
              )}

              {/* Step 5: Employment Status */}
              {step === 5 && (
                <div className="animate-in fade-in slide-in-from-right-8 duration-500">
                  <h2 className="text-2xl md:text-3xl font-bold text-slate-900 mb-2">What's your employment status?</h2>
                  <p className="text-slate-500 mb-6">Select the option that best describes you.</p>
                  <div className="space-y-3">
                    {EMPLOYMENT_STATUSES.map((status) => (
                      <button
                        key={status}
                        type="button"
                        onClick={() => {
                          updateData({ employmentStatus: status });
                          nextStep();
                        }}
                        className="w-full text-left px-5 py-4 rounded-xl border-2 border-slate-200 hover:border-primary font-medium text-slate-700 hover:text-primary transition-all hover:bg-primary/5"
                      >
                        {status}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Step 6: Personal Info */}
              {step === 6 && (
                <div className="animate-in fade-in slide-in-from-right-8 duration-500">
                  <h2 className="text-2xl md:text-3xl font-bold text-slate-900 mb-2">Almost there.</h2>
                  <p className="text-slate-500 mb-6">Your information is encrypted and used only to match you with lenders.</p>
                  <div className="space-y-4 mb-6">
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-slate-700 mb-1">First Name</label>
                        <input
                          type="text"
                          required
                          value={data.firstName}
                          onChange={(e) => updateData({ firstName: e.target.value })}
                          placeholder="Jane"
                          className="w-full px-4 py-3 rounded-lg border-2 border-slate-200 focus:border-primary outline-none transition-colors"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-slate-700 mb-1">Last Name</label>
                        <input
                          type="text"
                          required
                          value={data.lastName}
                          onChange={(e) => updateData({ lastName: e.target.value })}
                          placeholder="Smith"
                          className="w-full px-4 py-3 rounded-lg border-2 border-slate-200 focus:border-primary outline-none transition-colors"
                        />
                      </div>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-slate-700 mb-1">Email Address</label>
                      <input
                        type="email"
                        required
                        value={data.email}
                        onChange={(e) => updateData({ email: e.target.value })}
                        placeholder="jane@email.com"
                        className="w-full px-4 py-3 rounded-lg border-2 border-slate-200 focus:border-primary outline-none transition-colors"
                      />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-slate-700 mb-1">Phone Number</label>
                        <input
                          type="tel"
                          required
                          value={data.phone}
                          onChange={(e) => updateData({ phone: e.target.value })}
                          placeholder="(555) 555-5555"
                          className="w-full px-4 py-3 rounded-lg border-2 border-slate-200 focus:border-primary outline-none transition-colors"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-slate-700 mb-1">State</label>
                        <select
                          required
                          value={data.state}
                          onChange={(e) => updateData({ state: e.target.value })}
                          className="w-full px-4 py-3 rounded-lg border-2 border-slate-200 focus:border-primary outline-none transition-colors bg-white"
                        >
                          <option value="">Select your state...</option>
                          <option value="AL">Alabama</option>
                          <option value="AK">Alaska</option>
                          <option value="AZ">Arizona</option>
                          <option value="AR">Arkansas</option>
                          <option value="CA">California</option>
                          <option value="CO">Colorado</option>
                          <option value="CT">Connecticut</option>
                          <option value="DE">Delaware</option>
                          <option value="FL">Florida</option>
                          <option value="GA">Georgia</option>
                          <option value="HI">Hawaii</option>
                          <option value="ID">Idaho</option>
                          <option value="IL">Illinois</option>
                          <option value="IN">Indiana</option>
                          <option value="IA">Iowa</option>
                          <option value="KS">Kansas</option>
                          <option value="KY">Kentucky</option>
                          <option value="LA">Louisiana</option>
                          <option value="ME">Maine</option>
                          <option value="MD">Maryland</option>
                          <option value="MA">Massachusetts</option>
                          <option value="MI">Michigan</option>
                          <option value="MN">Minnesota</option>
                          <option value="MS">Mississippi</option>
                          <option value="MO">Missouri</option>
                          <option value="MT">Montana</option>
                          <option value="NE">Nebraska</option>
                          <option value="NV">Nevada</option>
                          <option value="NH">New Hampshire</option>
                          <option value="NJ">New Jersey</option>
                          <option value="NM">New Mexico</option>
                          <option value="NY">New York</option>
                          <option value="NC">North Carolina</option>
                          <option value="ND">North Dakota</option>
                          <option value="OH">Ohio</option>
                          <option value="OK">Oklahoma</option>
                          <option value="OR">Oregon</option>
                          <option value="PA">Pennsylvania</option>
                          <option value="RI">Rhode Island</option>
                          <option value="SC">South Carolina</option>
                          <option value="SD">South Dakota</option>
                          <option value="TN">Tennessee</option>
                          <option value="TX">Texas</option>
                          <option value="UT">Utah</option>
                          <option value="VT">Vermont</option>
                          <option value="VA">Virginia</option>
                          <option value="WA">Washington</option>
                          <option value="WV">West Virginia</option>
                          <option value="WI">Wisconsin</option>
                          <option value="WY">Wyoming</option>
                          <option value="DC">Washington, D.C.</option>
                        </select>
                      </div>
                    </div>
                  </div>
                  <button
                    type="button"
                    disabled={!data.firstName || !data.lastName || !data.email || !data.phone || !data.state}
                    onClick={nextStep}
                    className="w-full bg-primary text-white rounded-xl py-4 font-bold text-lg hover:bg-primary/90 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
                  >
                    View My Matches
                  </button>
                </div>
              )}

              {/* Step 7: Consent */}
              {step === 7 && (
                <div className="animate-in fade-in slide-in-from-right-8 duration-500">
                  <h2 className="text-2xl md:text-3xl font-bold text-slate-900 mb-6">Final step: Secure consent</h2>

                  <div className="bg-slate-50 p-6 rounded-xl border border-slate-200 mb-8">
                    <label className="flex items-start gap-4 cursor-pointer">
                      <input
                        type="checkbox"
                        required
                        checked={data.consentToContact}
                        onChange={(e) => updateData({ consentToContact: e.target.checked })}
                        className="mt-1 w-5 h-5 rounded text-primary focus:ring-primary border-slate-300"
                      />
                      <span className="text-xs text-slate-600 leading-relaxed">
                        By clicking "See My Rates", I provide my electronic signature and express written consent to be contacted by Apruvee and its lending partners at the phone number and email address provided, including via automated dialing systems, prerecorded messages, and text messages, even if my number is on a Do Not Call registry. I understand consent is not a condition of purchasing any goods or services. I also agree to the{" "}
                        <Link href="/terms" className="text-primary hover:underline" target="_blank">Terms of Service</Link>
                        {" "}and{" "}
                        <Link href="/privacy" className="text-primary hover:underline" target="_blank">Privacy Policy</Link>.
                      </span>
                    </label>
                  </div>

                  <button
                    type="submit"
                    disabled={!data.consentToContact || submitLead.isPending}
                    className="w-full bg-primary text-white rounded-xl py-4 font-bold text-lg hover:bg-primary/90 disabled:opacity-50 disabled:cursor-not-allowed transition-all flex items-center justify-center gap-2"
                  >
                    {submitLead.isPending ? (
                      <>
                        <Loader2 className="w-5 h-5 animate-spin" />
                        Finding your matches...
                      </>
                    ) : (
                      "See My Rates"
                    )}
                  </button>

                  {submitLead.isError && (
                    <p className="mt-4 text-sm text-red-600 text-center">
                      Something went wrong. Please try again.
                    </p>
                  )}
                </div>
              )}

            </form>
          </div>
        </div>
      </div>
    </PageWrapper>
  );
}
