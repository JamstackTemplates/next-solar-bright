'use client';

import { useState, type CSSProperties } from 'react';
import { packages, PRICING_LABEL_SHORT } from '../content/packages';
import { savingsAssumptions } from '../content/savings';
import { estimateSavings, formatAud, formatYears } from '../lib/savings-estimator';
import { SiteLink } from './site-link';

const SOLAR_PACKAGES = packages.filter(pkg => pkg.kind !== 'battery');
const DEFAULT_BILL = 450;
const MIN_BILL = 150;
const MAX_BILL = 1200;

const BILL_PRESETS = [
  { label: 'Small unit', bill: 300 },
  { label: 'Typical home', bill: 450 },
  { label: 'Family + AC', bill: 750 },
  { label: 'Pool + high use', bill: 1050 },
] as const;

/** Interactive illustrative solar savings estimator styled as a solar meter face. */
export function SavingsEstimator() {
  const defaultPkg = SOLAR_PACKAGES.find(pkg => pkg.id === 'golden-hour') ?? SOLAR_PACKAGES[0];
  const [bill, setBill] = useState(DEFAULT_BILL);
  const [packageId, setPackageId] = useState(defaultPkg.id);

  const selected = SOLAR_PACKAGES.find(pkg => pkg.id === packageId) ?? defaultPkg;
  const result = estimateSavings(bill, selected, savingsAssumptions);
  const staticExample = estimateSavings(DEFAULT_BILL, defaultPkg, savingsAssumptions);

  const rangeProgress = `${((bill - MIN_BILL) / (MAX_BILL - MIN_BILL)) * 100}%`;
  const selfUseSharePct = Math.round(
    (selected.kind === 'bundle'
      ? savingsAssumptions.selfUseShare.bundle
      : savingsAssumptions.selfUseShare.panels) * 100,
  );
  const billOffsetPct =
    result.annualBillAud > 0
      ? Math.min(100, Math.round((result.annualSavingAud / result.annualBillAud) * 100))
      : 0;

  return (
    <div className="poster-card overflow-hidden bg-surface">
      {/* Meter top bezel */}
      <div className="flex flex-wrap items-center justify-between gap-2 border-b-2 border-ink bg-ink px-5 py-3 text-bg">
        <span className="font-mono text-xs font-bold uppercase tracking-widest">
          Adelaide Solar Meter · {savingsAssumptions.sampleLabel}
        </span>
        <span className="rounded-full bg-sun px-3 py-0.5 font-mono text-xs font-bold text-[#1F2A44]">
          ±{savingsAssumptions.estimateRangePct}% range
        </span>
      </div>

      <div className="solar-grid-bg grid gap-8 p-6 sm:p-8 lg:grid-cols-2 lg:items-center">
        {/* Controls */}
        <div className="space-y-6">
          <div>
            <div className="flex items-baseline justify-between gap-4">
              <label htmlFor="quarterly-bill" className="font-semibold text-ink">
                Typical quarterly electricity bill
              </label>
              <output
                htmlFor="quarterly-bill"
                className="rounded-xl border-2 border-ink bg-elevated px-3 py-0.5 font-display text-3xl text-ink shadow-[0_2px_0_var(--ink)]"
              >
                {formatAud(bill)}
              </output>
            </div>
            <input
              id="quarterly-bill"
              type="range"
              min={MIN_BILL}
              max={MAX_BILL}
              step={25}
              value={bill}
              onChange={event => setBill(Number(event.target.value))}
              className="solar-range mt-3"
              style={{ '--range-progress': rangeProgress } as CSSProperties}
            />
            <div className="mt-1 flex justify-between font-mono text-xs text-muted">
              <span>{formatAud(MIN_BILL)} / qtr</span>
              <span>{formatAud(675)} / qtr</span>
              <span>{formatAud(MAX_BILL)} / qtr</span>
            </div>

            {/* Quick household bill presets */}
            <div className="mt-3 flex flex-wrap gap-2">
              {BILL_PRESETS.map(preset => {
                const active = bill === preset.bill;
                return (
                  <button
                    key={preset.bill}
                    type="button"
                    onClick={() => setBill(preset.bill)}
                    className={`rounded-full border-2 border-ink px-3 py-1 font-mono text-xs font-bold transition-colors ${
                      active
                        ? 'bg-sun text-[#1F2A44] shadow-[0_2px_0_var(--ink)]'
                        : 'bg-elevated text-ink hover:bg-bg'
                    }`}
                  >
                    {formatAud(preset.bill)} · {preset.label}
                  </button>
                );
              })}
            </div>
          </div>

          <div>
            <label htmlFor="estimator-package" className="block font-semibold text-ink">
              Solar package to model
            </label>
            <select
              id="estimator-package"
              value={selected.id}
              onChange={event => setPackageId(event.target.value)}
              className="mt-2 w-full min-h-12 rounded-xl border-2 border-ink bg-elevated px-4 py-2.5 font-sans font-semibold text-ink"
            >
              {SOLAR_PACKAGES.map(pkg => (
                <option key={pkg.id} value={pkg.id}>
                  {pkg.name} ({pkg.systemKw} kW
                  {pkg.batteryKwh > 0 ? ` + ${pkg.batteryKwh} kWh` : ' panels only'}) — from{' '}
                  {formatAud(pkg.fromPriceAud)}
                </option>
              ))}
            </select>
            <p className="mt-2 font-mono text-xs text-muted">
              From {formatAud(selected.fromPriceAud)} AUD ({PRICING_LABEL_SHORT}). Already have solar? See{' '}
              <SiteLink href="/packages/#battery" className="text-link">
                Nightlight battery
              </SiteLink>
              .
            </p>
          </div>
        </div>

        {/* Meter readout */}
        <div className="rounded-2xl border-2 border-ink bg-elevated p-6 shadow-[inset_0_3px_0_var(--line)]">
          <p className="font-mono text-xs font-bold uppercase tracking-wider text-muted">
            Illustrative estimate, not a quote
          </p>

          <div className="mt-4 grid gap-5 sm:grid-cols-2">
            <div>
              <p className="text-sm font-semibold text-muted">Estimated annual saving</p>
              <p className="mt-1 font-display text-3xl leading-tight text-leaf sm:text-4xl" aria-live="polite">
                {formatAud(result.annualSavingLowAud)}–{formatAud(result.annualSavingHighAud)}
              </p>
              <p className="mt-1 font-mono text-xs text-muted">
                per year (vs ~{formatAud(result.annualBillAud)}/yr bill)
              </p>
            </div>

            <div>
              <p className="text-sm font-semibold text-muted">Simple payback range</p>
              <p className="mt-1 font-display text-3xl leading-tight text-leaf sm:text-4xl" aria-live="polite">
                {result.paybackYearsLow !== null && result.paybackYearsHigh !== null
                  ? result.paybackYearsLow === result.paybackYearsHigh
                    ? `${formatYears(result.paybackYearsLow)} yrs`
                    : `${formatYears(result.paybackYearsLow)}–${formatYears(result.paybackYearsHigh)} yrs`
                  : '—'}
              </p>
              <p className="mt-1 font-mono text-xs text-muted">
                based on from {formatAud(selected.fromPriceAud)}
              </p>
            </div>
          </div>

          {/* Visual bill offset & self-use gauge */}
          <div className="mt-5 rounded-xl border-2 border-line bg-bg p-3.5">
            <div className="flex flex-wrap items-center justify-between gap-2 font-mono text-xs font-bold text-ink">
              <span>Illustrative annual bill offset</span>
              <span className="text-leaf">~{billOffsetPct}% of {formatAud(result.annualBillAud)}/yr bill</span>
            </div>
            <div className="mt-2 h-3.5 w-full overflow-hidden rounded-full border-2 border-ink bg-surface">
              <div
                className="h-full rounded-full bg-leaf transition-all"
                style={{ width: `${billOffsetPct}%` }}
              />
            </div>
            <div className="mt-2 flex flex-wrap items-center justify-between gap-2 font-mono text-[0.72rem] text-muted">
              <span>Est. {result.dailyGenerationKwh.toFixed(1)} kWh/day generated</span>
              <span>{selfUseSharePct}% on-site self-use ({selected.batteryKwh > 0 ? `${selected.batteryKwh} kWh battery` : 'panels only'})</span>
            </div>
          </div>

          <div className="mt-5 flex flex-wrap items-center justify-between gap-3 border-t border-line pt-4">
            <p className="font-mono text-xs text-muted">
              {selected.panelCount} × {selected.panelWatts}W panels · {selected.inverter}
            </p>
            <SiteLink href="/contact/" className="button text-sm">
              Get your roof’s real numbers
            </SiteLink>
          </div>
        </div>
      </div>

      {/* Static worked example when JavaScript is off */}
      <noscript>
        <div className="border-t-2 border-ink bg-bg p-5 text-sm text-ink">
          <strong>Illustrative sample worked example (JavaScript off):</strong> For a{' '}
          {formatAud(DEFAULT_BILL)} quarterly electricity bill with <strong>{defaultPkg.name}</strong> (from{' '}
          {formatAud(defaultPkg.fromPriceAud)} inc GST after the STC discount), illustrative annual savings are{' '}
          <strong>
            {formatAud(staticExample.annualSavingLowAud)}–{formatAud(staticExample.annualSavingHighAud)} per year
          </strong>{' '}
          with a simple payback of{' '}
          <strong>
            {staticExample.paybackYearsLow !== null && staticExample.paybackYearsHigh !== null
              ? `${formatYears(staticExample.paybackYearsLow)}–${formatYears(staticExample.paybackYearsHigh)} years`
              : '—'}
          </strong>
          . Illustrative estimate, not a quote.
        </div>
      </noscript>
    </div>
  );
}
