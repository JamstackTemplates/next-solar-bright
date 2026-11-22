import assert from 'node:assert/strict';
import { test } from 'node:test';
import { getPackageById } from '../content/packages.ts';
import { savingsAssumptions } from '../content/savings.ts';
import { estimateSavings } from '../lib/savings-estimator.ts';

const sunrise = getPackageById('sunrise-6-6')!;
const goldenHour = getPackageById('golden-hour')!;
const longEvening = getPackageById('long-evening')!;

test('a $0 bill yields $0 savings and no payback', () => {
  const res = estimateSavings(0, goldenHour, savingsAssumptions);
  assert.equal(res.annualSavingAud, 0);
  assert.equal(res.annualSavingLowAud, 0);
  assert.equal(res.annualSavingHighAud, 0);
  assert.equal(res.paybackYearsLow, null);
  assert.equal(res.paybackYearsHigh, null);
});

test('estimated savings never exceed the annual electricity bill', () => {
  for (const bill of [150, 250, 450, 800, 1200]) {
    for (const pkg of [sunrise, goldenHour, longEvening]) {
      const res = estimateSavings(bill, pkg, savingsAssumptions);
      assert.ok(res.annualSavingAud <= res.annualBillAud, `${pkg.id} at $${bill}: central saving exceeded annual bill`);
      assert.ok(res.annualSavingHighAud <= res.annualBillAud, `${pkg.id} at $${bill}: high saving exceeded annual bill`);
      assert.ok(res.annualSavingLowAud <= res.annualSavingAud);
    }
  }
});

test('a battery bundle saves more than its panels-only counterpart for the same bill', () => {
  const panelsOnly = estimateSavings(650, sunrise, savingsAssumptions);
  const bundle = estimateSavings(650, goldenHour, savingsAssumptions);
  assert.ok(
    bundle.annualSavingAud > panelsOnly.annualSavingAud,
    `Expected Golden Hour ($${bundle.annualSavingAud}) to save more than Sunrise 6.6 ($${panelsOnly.annualSavingAud})`,
  );
});

test('payback is finite and positive for positive bills and reflects package price changes', () => {
  const res = estimateSavings(500, goldenHour, savingsAssumptions);
  assert.ok(res.paybackYearsLow !== null && Number.isFinite(res.paybackYearsLow) && res.paybackYearsLow > 0);
  assert.ok(res.paybackYearsHigh !== null && Number.isFinite(res.paybackYearsHigh) && res.paybackYearsHigh >= res.paybackYearsLow);

  const cheaper = estimateSavings(500, { ...goldenHour, fromPriceAud: 11000 }, savingsAssumptions);
  assert.ok(cheaper.paybackYearsMid! < res.paybackYearsMid!);
});
