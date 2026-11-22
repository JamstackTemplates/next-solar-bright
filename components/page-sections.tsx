import type { ReactNode } from 'react';
import { addOns, EVERY_INSTALL_INCLUDES } from '../content/packages';
import { savingsAssumptions } from '../content/savings';
import { formatAud } from '../lib/savings-estimator';
import { CompassRoseArt, SunriseHorizonDivider, ThreeWaysVignette } from './artwork';
import { SolarIcon, type SolarIconName } from './icons';

const ADDON_ICONS: Record<string, SolarIconName> = {
  'ev-charger': 'ev-plug',
  'bird-mesh': 'bird-mesh',
  'backup-circuit': 'backup',
  'panel-clean': 'clean',
};

/** Hardware-shelf strip of optional add-ons for /packages/. */
export function AddOnsShelf({ children }: { children: ReactNode }) {
  return (
    <section aria-labelledby="addons-heading" className="grain-band bg-surface py-14 sm:py-18">
      <div className="wrap">
        {children}
        <ul className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {addOns.map(item => (
            <li key={item.id} className="poster-card flex flex-col justify-between p-5">
              <div>
                <div className="flex items-center justify-between gap-2">
                  <span className="inline-flex h-11 w-11 items-center justify-center rounded-xl border-2 border-ink bg-sun text-[#1F2A44]">
                    <SolarIcon name={ADDON_ICONS[item.id] ?? 'panel'} className="w-6 h-6" />
                  </span>
                  <span className="font-mono text-sm font-bold text-ink">
                    from {formatAud(item.priceAud)}
                  </span>
                </div>
                <h3 className="mt-4 text-xl text-ink">{item.name}</h3>
                <p className="mt-2 text-sm text-muted">{item.note}</p>
              </div>
              <p className="mt-4 font-mono text-[0.72rem] text-muted">inc GST · installed with system</p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

/** "What every install includes" checklist beside the boxed pricing note on /packages/. */
export function IncludesAndPricingBand({
  includesHeading,
  pricingNote,
}: {
  includesHeading: ReactNode;
  pricingNote: ReactNode;
}) {
  return (
    <>
      <SunriseHorizonDivider variant="rising" topColor="var(--surface)" bottomColor="var(--bg)" />
      <section className="grain-band bg-bg py-14 sm:py-18">
        <div className="wrap grid gap-8 lg:grid-cols-[1.2fr_0.85fr] lg:items-start">
          <div>
            {includesHeading}
            <ul className="mt-6 grid gap-3.5 sm:grid-cols-2">
              {EVERY_INSTALL_INCLUDES.map(line => (
                <li
                  key={line}
                  className="flex items-start gap-3 rounded-xl border-2 border-ink bg-elevated p-4 text-sm font-medium text-ink"
                >
                  <SolarIcon name="check-sun" className="mt-0.5 w-5 h-5 shrink-0 text-ink" />
                  <span>{line}</span>
                </li>
              ))}
            </ul>
          </div>

          <aside className="rounded-2xl border-2 border-dashed border-ink bg-surface p-6 sm:p-7">
            {pricingNote}
          </aside>
        </div>
      </section>
    </>
  );
}

/** Zig-zag rows explaining Use it / Store it / Export it on /savings/ with oversized worked numbers. */
export function ZigZagSavingsRow({
  kind,
  reverse = false,
  eyebrow,
  bigNumber,
  heading,
  children,
}: {
  kind: 'use' | 'store' | 'export';
  reverse?: boolean;
  eyebrow: string;
  bigNumber: string;
  heading: string;
  children: ReactNode;
}) {
  return (
    <div className="grid gap-6 md:grid-cols-2 md:items-center md:gap-10">
      <div className={reverse ? 'md:order-2' : undefined}>
        <p className="eyebrow">{eyebrow}</p>
        <p className="mt-2 font-display text-4xl leading-none text-leaf sm:text-5xl">{bigNumber}</p>
        <h3 className="mt-3 text-2xl text-ink sm:text-3xl">{heading}</h3>
        <div className="mt-3 space-y-2 text-base text-muted">{children}</div>
      </div>
      <div className={reverse ? 'md:order-1' : undefined}>
        <ThreeWaysVignette kind={kind} className="w-full max-w-md mx-auto h-auto" />
      </div>
    </div>
  );
}

/** Mono assumptions specification table on /savings/. */
export function AssumptionsSpecTable({ children }: { children: ReactNode }) {
  const rows = [
    {
      label: 'Electricity import rate',
      value: `$${savingsAssumptions.importRateAudPerKwh.toFixed(2)} / kWh`,
      note: 'Typical Adelaide residential usage tariff (illustrative sample)',
    },
    {
      label: 'Solar feed-in tariff',
      value: `$${savingsAssumptions.feedInAudPerKwh.toFixed(2)} / kWh`,
      note: 'Typical retailer export credit (illustrative sample)',
    },
    {
      label: 'Adelaide annual daily yield',
      value: `${savingsAssumptions.dailyYieldKwhPerKw.toFixed(1)} kWh / kW / day`,
      note: 'Annualised average across sunny summers and shorter winter days',
    },
    {
      label: 'Self-use share (panels only)',
      value: `${Math.round(savingsAssumptions.selfUseShare.panels * 100)}%`,
      note: 'Share of rooftop generation used directly in the home during daylight',
    },
    {
      label: 'Self-use share (panels + battery)',
      value: `${Math.round(savingsAssumptions.selfUseShare.bundle * 100)}%`,
      note: 'Higher share because surplus daytime sun shifts into evening use',
    },
    {
      label: 'Estimate range band',
      value: `±${savingsAssumptions.estimateRangePct}%`,
      note: 'Shown as a range to reflect roof pitch, shade and household habits',
    },
  ];

  return (
    <section aria-labelledby="assumptions-heading" className="grain-band bg-bg py-14 sm:py-18">
      <div className="wrap">
        {children}

        <div
          tabIndex={0}
          role="region"
          aria-labelledby="assumptions-caption"
          className="table-wrapper mt-6"
        >
          <table className="spec-table">
            <caption id="assumptions-caption">
              {savingsAssumptions.sampleLabel} assumptions behind the Adelaide estimator
            </caption>
            <thead>
              <tr>
                <th scope="col">Assumption</th>
                <th scope="col">Sample figure</th>
                <th scope="col">Plain-English note</th>
              </tr>
            </thead>
            <tbody>
              {rows.map(row => (
                <tr key={row.label}>
                  <th scope="row" className="font-sans! font-semibold! text-base!">
                    {row.label}
                  </th>
                  <td className="font-mono font-bold text-ink whitespace-nowrap">{row.value}</td>
                  <td className="text-sm text-muted">{row.note}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <p className="mt-4 font-mono text-xs text-muted">
          <strong>{savingsAssumptions.sampleLabel}:</strong> {savingsAssumptions.supplyChargeNote}
        </p>
      </div>
    </section>
  );
}

/** Compass-rose factors band ("What changes your numbers") on /savings/. */
export function FactorsCompassBand({
  heading,
  factors,
}: {
  heading: ReactNode;
  factors: { title: string; detail: string }[];
}) {
  return (
    <>
      <SunriseHorizonDivider variant="midday" topColor="var(--bg)" bottomColor="var(--surface)" />
      <section className="grain-band bg-surface py-14 sm:py-18">
        <div className="wrap grid gap-10 lg:grid-cols-[0.75fr_1.25fr] lg:items-center">
          <div className="text-center lg:text-left">
            <CompassRoseArt className="w-56 h-56 mx-auto lg:mx-0" />
            <div className="mt-5">{heading}</div>
          </div>

          <dl className="grid gap-4 sm:grid-cols-2">
            {factors.map((factor, index) => (
              <div
                key={factor.title}
                className={`poster-card p-5 ${index === factors.length - 1 ? 'sm:col-span-2' : ''}`}
              >
                <dt className="font-display text-xl text-ink">{factor.title}</dt>
                <dd className="mt-1.5 text-sm text-muted">{factor.detail}</dd>
              </div>
            ))}
          </dl>
        </div>
      </section>
      <SunriseHorizonDivider variant="rising" topColor="var(--surface)" bottomColor="var(--bg)" />
    </>
  );
}
