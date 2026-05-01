import { useEffect, useMemo, useState, type ReactNode } from "react";
import { Calculator, TrendingDown, Clock, DollarSign } from "lucide-react";
import {
  calculateMonthlyPayment,
  calculateTotalInterest,
  calculateMonthsToPayoff,
  formatCurrency,
  formatMonthsAsYears,
} from "@/lib/loan-math";

export interface DebtConsolidationCalculatorValues {
  debt: number;
  currentApr: number;
  newApr: number;
  termMonths: number;
  isActive: boolean;
}

export interface DebtConsolidationCalculatorProps {
  defaultDebt?: number;
  defaultCurrentApr?: number;
  defaultNewApr?: number;
  defaultTermMonths?: number;
  /** Visual variant. `card` is for embedding inside articles; `hero` is the dark/primary variant used on /results. */
  variant?: "card" | "hero";
  /** Override the default heading. */
  title?: string;
  /** Override the default subtitle. */
  subtitle?: string;
  /** When true, shows only debt + current-APR inputs and replaces the built-in results panel with `customFooter`. */
  compact?: boolean;
  /** Fires whenever any input changes. Useful when embedding the calculator and reacting to the values externally. */
  onInputsChange?: (values: DebtConsolidationCalculatorValues) => void;
  /** Custom footer rendered below the inputs (when set, replaces the default results panel). */
  customFooter?: ReactNode;
  /** Message shown when the inputs are below the activation threshold (for compact mode). */
  inactiveMessage?: string;
}

const TERM_OPTIONS = [24, 36, 48, 60, 72, 84];
const DEFAULT_TITLE = "Debt Consolidation Calculator";
const DEFAULT_SUBTITLE =
  "Estimate your monthly payment, total interest, and lifetime savings from consolidating credit card debt with a personal loan.";

export function DebtConsolidationCalculator({
  defaultDebt = 15000,
  defaultCurrentApr = 24,
  defaultNewApr = 12,
  defaultTermMonths = 60,
  variant = "card",
  title = DEFAULT_TITLE,
  subtitle = DEFAULT_SUBTITLE,
  compact = false,
  onInputsChange,
  customFooter,
  inactiveMessage,
}: DebtConsolidationCalculatorProps) {
  const [debtInput, setDebtInput] = useState<string>(String(defaultDebt));
  const [currentAprInput, setCurrentAprInput] = useState<string>(String(defaultCurrentApr));
  const [newAprInput, setNewAprInput] = useState<string>(String(defaultNewApr));
  const [termMonths, setTermMonths] = useState<number>(defaultTermMonths);

  const debt = Number(debtInput) || 0;
  const currentApr = Number(currentAprInput) || 0;
  const newApr = Number(newAprInput);
  const newAprValid = !Number.isNaN(newApr) && newApr >= 0;

  // In compact mode the new-loan inputs aren't shown, so they don't gate activation.
  const isActive = compact
    ? debt >= 500 && currentApr > 0
    : debt >= 500 && currentApr > 0 && newAprValid && termMonths > 0;

  // Notify parent of input changes (used by /results to drive per-offer savings).
  useEffect(() => {
    onInputsChange?.({
      debt,
      currentApr,
      newApr: newAprValid ? newApr : 0,
      termMonths,
      isActive,
    });
  }, [debt, currentApr, newApr, newAprValid, termMonths, isActive, onInputsChange]);

  const results = useMemo(() => {
    if (compact || !isActive) return null;

    // "Current" baseline: the implied monthly payment that would clear the balance at the
    // current APR over the same term as the new loan — fair apples-to-apples comparison.
    const currentMonthly = calculateMonthlyPayment(debt, currentApr, termMonths);
    const newMonthly = calculateMonthlyPayment(debt, newApr, termMonths);

    const currentInterest = calculateTotalInterest(debt, currentApr, termMonths);
    const newInterest = calculateTotalInterest(debt, newApr, termMonths);

    // "Time saved" = how many extra months it would take to clear the balance at the
    // current APR if you only paid the new loan's monthly amount.
    const monthsAtCurrentAprWithNewPayment = calculateMonthsToPayoff(
      debt,
      currentApr,
      newMonthly,
    );
    const monthsSaved = isFinite(monthsAtCurrentAprWithNewPayment)
      ? Math.max(0, monthsAtCurrentAprWithNewPayment - termMonths)
      : Infinity;

    return {
      currentMonthly,
      newMonthly,
      currentInterest,
      newInterest,
      monthlySavings: currentMonthly - newMonthly,
      interestSaved: currentInterest - newInterest,
      monthsAtCurrentAprWithNewPayment,
      monthsSaved,
    };
  }, [compact, isActive, debt, currentApr, newApr, termMonths]);

  const isHero = variant === "hero";
  const containerCls = isHero
    ? "bg-gradient-to-br from-primary to-primary/90 text-white p-6 md:p-8 rounded-2xl shadow-md"
    : "bg-white border border-slate-200 rounded-2xl p-6 md:p-8 shadow-sm";
  const labelCls = isHero
    ? "block text-xs font-semibold text-primary-foreground/90 mb-1.5 uppercase tracking-wide"
    : "block text-xs font-semibold text-slate-700 mb-1.5 uppercase tracking-wide";
  const headingCls = isHero ? "font-bold text-lg" : "font-bold text-xl text-slate-900";
  const subTextCls = isHero ? "text-primary-foreground/90 text-sm" : "text-slate-600 text-sm";
  const inputBorderCls = isHero ? "border-transparent" : "border-slate-200";
  const inactiveTextCls = isHero ? "text-xs text-primary-foreground/70" : "text-xs text-slate-500";

  return (
    <div className={containerCls}>
      <div className="flex items-center gap-2 mb-2">
        <Calculator className="w-5 h-5" />
        <h3 className={headingCls}>{title}</h3>
      </div>
      <p className={`${subTextCls} mb-5`}>{subtitle}</p>

      <div className="grid sm:grid-cols-2 gap-4">
        <div>
          <label htmlFor="dcc-debt" className={labelCls}>
            Total debt to consolidate
          </label>
          <div className="relative">
            <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500 font-semibold">
              $
            </span>
            <input
              id="dcc-debt"
              type="number"
              inputMode="numeric"
              min={0}
              step={500}
              value={debtInput}
              onChange={(e) => setDebtInput(e.target.value)}
              className={`w-full pl-8 pr-4 py-3 rounded-xl bg-white text-slate-900 font-semibold text-lg border ${inputBorderCls} focus:outline-none focus:ring-2 focus:ring-primary`}
              placeholder="15,000"
            />
          </div>
        </div>

        <div>
          <label htmlFor="dcc-current-apr" className={labelCls}>
            Current APR (credit cards)
          </label>
          <div className="relative">
            <input
              id="dcc-current-apr"
              type="number"
              inputMode="decimal"
              min={0}
              max={50}
              step={0.5}
              value={currentAprInput}
              onChange={(e) => setCurrentAprInput(e.target.value)}
              className={`w-full pl-4 pr-10 py-3 rounded-xl bg-white text-slate-900 font-semibold text-lg border ${inputBorderCls} focus:outline-none focus:ring-2 focus:ring-primary`}
              placeholder="24"
            />
            <span className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-500 font-semibold">
              %
            </span>
          </div>
        </div>

        {!compact && (
          <>
            <div>
              <label htmlFor="dcc-new-apr" className={labelCls}>
                New loan APR
              </label>
              <div className="relative">
                <input
                  id="dcc-new-apr"
                  type="number"
                  inputMode="decimal"
                  min={0}
                  max={50}
                  step={0.5}
                  value={newAprInput}
                  onChange={(e) => setNewAprInput(e.target.value)}
                  className={`w-full pl-4 pr-10 py-3 rounded-xl bg-white text-slate-900 font-semibold text-lg border ${inputBorderCls} focus:outline-none focus:ring-2 focus:ring-primary`}
                  placeholder="12"
                />
                <span className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-500 font-semibold">
                  %
                </span>
              </div>
            </div>

            <div>
              <label htmlFor="dcc-term" className={labelCls}>
                Loan term
              </label>
              <select
                id="dcc-term"
                value={termMonths}
                onChange={(e) => setTermMonths(Number(e.target.value))}
                className={`w-full px-4 py-3 rounded-xl bg-white text-slate-900 font-semibold text-lg border ${inputBorderCls} focus:outline-none focus:ring-2 focus:ring-primary appearance-none`}
              >
                {TERM_OPTIONS.map((m) => (
                  <option key={m} value={m}>
                    {m} months ({m / 12} years)
                  </option>
                ))}
              </select>
            </div>
          </>
        )}
      </div>

      {/* Footer / results */}
      {customFooter !== undefined ? (
        <div className="mt-6">{customFooter}</div>
      ) : (
        <div className="mt-6">
          {!isActive ? (
            <p className={inactiveTextCls}>
              {inactiveMessage ??
                "Enter at least $500 in debt and a current APR above 0% to see results."}
            </p>
          ) : results ? (
            <div
              className={
                isHero ? "pt-5 border-t border-white/20" : "pt-5 border-t border-slate-200"
              }
            >
              <div className="grid sm:grid-cols-3 gap-4">
                <ResultStat
                  icon={<DollarSign className="w-4 h-4" />}
                  label="New monthly payment"
                  value={formatCurrency(results.newMonthly)}
                  sub={
                    results.monthlySavings > 0
                      ? `${formatCurrency(results.monthlySavings)} less per month`
                      : results.monthlySavings < 0
                        ? `${formatCurrency(Math.abs(results.monthlySavings))} more per month`
                        : "Same as your current payment"
                  }
                  isHero={isHero}
                />
                <ResultStat
                  icon={<TrendingDown className="w-4 h-4" />}
                  label="Total interest saved"
                  value={
                    results.interestSaved > 0
                      ? formatCurrency(results.interestSaved)
                      : formatCurrency(0)
                  }
                  sub={
                    results.interestSaved > 0
                      ? `vs. paying ${formatCurrency(results.currentInterest)} at ${currentApr}% APR`
                      : "No interest savings at this APR"
                  }
                  isHero={isHero}
                  highlight={results.interestSaved > 0}
                />
                <ResultStat
                  icon={<Clock className="w-4 h-4" />}
                  label="Time to debt-free"
                  value={formatMonthsAsYears(termMonths)}
                  sub={
                    isFinite(results.monthsSaved) && results.monthsSaved > 0
                      ? `~${formatMonthsAsYears(results.monthsSaved)} sooner than current pace`
                      : "vs. your existing payoff path"
                  }
                  isHero={isHero}
                />
              </div>
              <p
                className={`mt-5 text-xs leading-relaxed ${
                  isHero ? "text-primary-foreground/80" : "text-slate-500"
                }`}
              >
                <strong>How we calculate:</strong> The new monthly payment uses standard
                amortization for the loan amount, APR, and term you entered. Interest saved
                compares total interest at your current APR vs. the new APR over the same{" "}
                {termMonths}-month window. "Time to debt-free" shows how quickly the new loan clears
                the balance compared with putting the same monthly payment toward your current debt
                at its higher APR. Estimates are illustrative; your actual rate is set by the
                lender.
              </p>
            </div>
          ) : null}
        </div>
      )}
    </div>
  );
}

function ResultStat({
  icon,
  label,
  value,
  sub,
  isHero,
  highlight,
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
  sub: string;
  isHero: boolean;
  highlight?: boolean;
}) {
  const baseBox = isHero
    ? "bg-white/10 border border-white/20 text-white"
    : highlight
      ? "bg-emerald-50 border border-emerald-200 text-emerald-900"
      : "bg-slate-50 border border-slate-200 text-slate-900";

  return (
    <div className={`rounded-xl p-4 ${baseBox}`}>
      <div
        className={`flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wide mb-1 ${
          isHero
            ? "text-primary-foreground/80"
            : highlight
              ? "text-emerald-700"
              : "text-slate-500"
        }`}
      >
        {icon}
        {label}
      </div>
      <div className="text-2xl font-extrabold">{value}</div>
      <div
        className={`text-xs mt-1 ${
          isHero
            ? "text-primary-foreground/80"
            : highlight
              ? "text-emerald-800/80"
              : "text-slate-500"
        }`}
      >
        {sub}
      </div>
    </div>
  );
}
