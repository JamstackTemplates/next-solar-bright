import type { SolarPackage } from '../content/packages.ts';
import { savingsAssumptions, type SavingsAssumptions } from '../content/savings.ts';

export interface SavingsEstimate {
  quarterlyBillAud: number;
  annualBillAud: number;
  dailyUsageKwh: number;
  dailyGenerationKwh: number;
  dailySelfUsedKwh: number;
  dailyExportedKwh: number;
  annualSavingAud: number;
  annualSavingLowAud: number;
  annualSavingHighAud: number;
  /** Simple payback in years rounded to nearest 0.5, or null when saving is 0. */
  paybackYearsLow: number | null;
  paybackYearsHigh: number | null;
  paybackYearsMid: number | null;
}

export function roundToHalfYear(years: number): number {
  return Math.max(0.5, Math.round(years * 2) / 2);
}

/**
 * Pure illustrative solar savings estimator.
 *
 * Formula (from sample assumptions):
 * - dailyUsage = quarterlyBill / 91 / importRate
 * - dailyGeneration = systemKw * dailyYieldKwhPerKw
 * - selfUsed = min(dailyGeneration * selfUseShare[kind], dailyUsage)
 * - exported = max(0, dailyGeneration - selfUsed)
 * - dailySaving = selfUsed * importRate + exported * feedInRate
 * - annualSaving = min(dailySaving * 365, annualBill)
 * - range = ±estimateRangePct (high end also capped at annualBill)
 * - payback = fromPriceAud / saving, rounded to nearest 0.5 years
 */
export function estimateSavings(
  quarterlyBillAud: number,
  pkg: Pick<SolarPackage, 'kind' | 'systemKw' | 'fromPriceAud'>,
  assumptions: SavingsAssumptions = savingsAssumptions,
): SavingsEstimate {
  const safeBill = Number.isFinite(quarterlyBillAud) && quarterlyBillAud > 0 ? quarterlyBillAud : 0;
  const annualBillAud = Math.round(safeBill * 4);
  const dailyUsageKwh = safeBill > 0 ? safeBill / 91 / assumptions.importRateAudPerKwh : 0;
  const dailyGenerationKwh = Math.max(0, pkg.systemKw) * assumptions.dailyYieldKwhPerKw;

  if (safeBill === 0 || dailyGenerationKwh === 0 || pkg.kind === 'battery') {
    return {
      quarterlyBillAud: safeBill,
      annualBillAud,
      dailyUsageKwh,
      dailyGenerationKwh,
      dailySelfUsedKwh: 0,
      dailyExportedKwh: 0,
      annualSavingAud: 0,
      annualSavingLowAud: 0,
      annualSavingHighAud: 0,
      paybackYearsLow: null,
      paybackYearsHigh: null,
      paybackYearsMid: null,
    };
  }

  const share = pkg.kind === 'bundle' ? assumptions.selfUseShare.bundle : assumptions.selfUseShare.panels;
  const dailySelfUsedKwh = Math.min(dailyGenerationKwh * share, dailyUsageKwh);
  const dailyExportedKwh = Math.max(0, dailyGenerationKwh - dailySelfUsedKwh);

  const dailySaving =
    dailySelfUsedKwh * assumptions.importRateAudPerKwh +
    dailyExportedKwh * assumptions.feedInAudPerKwh;

  const rawAnnualSaving = dailySaving * 365;
  const annualSavingAud = Math.min(annualBillAud, Math.round(rawAnnualSaving));

  const factor = assumptions.estimateRangePct / 100;
  const annualSavingLowAud = Math.max(0, Math.round(annualSavingAud * (1 - factor)));
  const annualSavingHighAud = Math.min(annualBillAud, Math.round(annualSavingAud * (1 + factor)));

  const paybackYearsMid = annualSavingAud > 0 ? roundToHalfYear(pkg.fromPriceAud / annualSavingAud) : null;
  const paybackYearsLow = annualSavingHighAud > 0 ? roundToHalfYear(pkg.fromPriceAud / annualSavingHighAud) : null;
  const paybackYearsHigh = annualSavingLowAud > 0 ? roundToHalfYear(pkg.fromPriceAud / annualSavingLowAud) : null;

  return {
    quarterlyBillAud: safeBill,
    annualBillAud,
    dailyUsageKwh,
    dailyGenerationKwh,
    dailySelfUsedKwh,
    dailyExportedKwh,
    annualSavingAud,
    annualSavingLowAud,
    annualSavingHighAud,
    paybackYearsLow,
    paybackYearsHigh,
    paybackYearsMid,
  };
}

export function formatAud(amount: number): string {
  return `$${Math.round(amount).toLocaleString('en-AU')}`;
}

export function formatYears(years: number): string {
  return Number.isInteger(years) ? `${years}` : years.toFixed(1);
}
