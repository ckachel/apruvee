export function calculateMonthlyPayment(
  principal: number,
  annualRatePct: number,
  months: number,
): number {
  if (principal <= 0 || months <= 0) return 0;
  if (annualRatePct === 0) return principal / months;
  const r = annualRatePct / 100 / 12;
  return (principal * r * Math.pow(1 + r, months)) / (Math.pow(1 + r, months) - 1);
}

export function calculateTotalInterest(
  principal: number,
  annualRatePct: number,
  months: number,
): number {
  return calculateMonthlyPayment(principal, annualRatePct, months) * months - principal;
}

export function calculateMonthsToPayoff(
  principal: number,
  annualRatePct: number,
  monthlyPayment: number,
): number {
  if (principal <= 0 || monthlyPayment <= 0) return 0;
  if (annualRatePct === 0) return Math.ceil(principal / monthlyPayment);
  const r = annualRatePct / 100 / 12;
  const minPayment = principal * r;
  if (monthlyPayment <= minPayment) return Infinity;
  const months = -Math.log(1 - (principal * r) / monthlyPayment) / Math.log(1 + r);
  return Math.ceil(months);
}

export function formatCurrency(amount: number, options?: { decimals?: number }): string {
  const decimals = options?.decimals ?? 0;
  return amount.toLocaleString("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals,
  });
}

export function formatMonthsAsYears(months: number): string {
  if (!isFinite(months) || months <= 0) return "—";
  const years = Math.floor(months / 12);
  const remMonths = months % 12;
  if (years === 0) return `${months} mo`;
  if (remMonths === 0) return `${years} yr`;
  return `${years} yr ${remMonths} mo`;
}
