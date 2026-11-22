'use client';

import { useEffect, useState, type KeyboardEvent } from 'react';
import {
  HERO_FEATURED_PACKAGE_ID,
  packages,
  PRICING_LABEL_SHORT,
  type PackageKind,
  type SolarPackage,
} from '../content/packages';
import { savingsAssumptions } from '../content/savings';
import { formatAud } from '../lib/savings-estimator';
import { BatteryGauge, PanelGridMotif, SolarArrayFootprint } from './artwork';
import { SolarIcon } from './icons';
import { SiteLink } from './site-link';

type FilterValue = 'all' | PackageKind;

const FILTER_TABS: { id: FilterValue; label: string }[] = [
  { id: 'all', label: 'All packages' },
  { id: 'panels', label: 'Panels' },
  { id: 'battery', label: 'Batteries' },
  { id: 'bundle', label: 'Panels + battery' },
];

function hashToFilter(hash: string): FilterValue {
  const clean = hash.replace(/^#/, '').toLowerCase();
  if (clean === 'panels' || clean === 'battery' || clean === 'bundle') return clean;
  return 'all';
}

function kindLabel(kind: PackageKind): string {
  switch (kind) {
    case 'panels':
      return 'Solar panels';
    case 'battery':
      return 'Home battery';
    case 'bundle':
      return 'Panels + battery';
  }
}

export function PackagePlate({
  pkg,
  featuredLayout = false,
}: {
  pkg: SolarPackage;
  featuredLayout?: boolean;
}) {
  const unavailable = pkg.availability === 'unavailable';
  const limited = pkg.availability === 'limited';
  const isHeroBundle = pkg.id === HERO_FEATURED_PACKAGE_ID;
  const estDailyKwh =
    pkg.systemKw > 0 ? (pkg.systemKw * savingsAssumptions.dailyYieldKwhPerKw).toFixed(1) : null;
  const approxRoofM2 = pkg.panelCount > 0 ? Math.round(pkg.panelCount * 2) : null;

  return (
    <article
      id={pkg.id}
      className={`panel-plate flex flex-col justify-between p-5 sm:p-6 ${
        isHeroBundle ? 'panel-plate-featured' : ''
      } ${unavailable ? 'opacity-65' : ''} ${featuredLayout ? 'h-full' : ''}`}
    >
      {/* Top rail clamps */}
      <div className="mb-3 flex flex-wrap items-center justify-between gap-2">
        <span className="inline-flex items-center gap-1.5 rounded-full border-2 border-ink bg-surface px-3 py-0.5 font-mono text-xs font-bold uppercase tracking-wider text-ink">
          <SolarIcon name={pkg.kind === 'battery' ? 'battery' : 'panel'} className="w-3.5 h-3.5" />
          {kindLabel(pkg.kind)}
        </span>

        <div className="flex items-center gap-1.5">
          {isHeroBundle && !featuredLayout && (
            <span className="rounded-full border-2 border-ink bg-sun px-2.5 py-0.5 font-mono text-xs font-bold text-[#1F2A44]">
              ★ Most popular
            </span>
          )}
          {limited && (
            <span className="rounded-full border-2 border-ink bg-sun px-2.5 py-0.5 font-mono text-xs font-bold text-[#1F2A44]">
              Limited stock
            </span>
          )}
          {unavailable && (
            <span className="rounded-full border-2 border-ink bg-line px-2.5 py-0.5 font-mono text-xs font-bold text-muted line-through">
              Unavailable
            </span>
          )}
        </div>
      </div>

      {/* Heading + Swing price tag */}
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div className="min-w-0">
          <h3 className="text-2xl leading-tight text-ink sm:text-3xl">{pkg.name}</h3>
          <div className="mt-2 flex flex-wrap items-baseline gap-x-4 gap-y-1">
            {pkg.systemKw > 0 && (
              <span className="font-display text-3xl text-kw-ink sm:text-4xl">
                {pkg.systemKw} <span className="font-mono text-base font-bold text-ink">kW</span>
              </span>
            )}
            {pkg.batteryKwh > 0 && (
              <span className="inline-flex items-center gap-2 font-display text-3xl text-leaf sm:text-4xl">
                {pkg.batteryKwh}{' '}
                <span className="font-mono text-base font-bold text-ink">kWh</span>
                <BatteryGauge kwh={pkg.batteryKwh} className="w-11 h-7" />
              </span>
            )}
          </div>
        </div>

        {/* Swing-tag "from" price */}
        <div className={`swing-tag shrink-0 ${unavailable ? 'line-through' : ''}`}>
          <span className="font-mono text-[0.68rem] font-bold uppercase tracking-wider">From</span>
          <span className="font-display text-2xl leading-none">{formatAud(pkg.fromPriceAud)}</span>
          <span className="mt-0.5 font-mono text-[0.64rem] font-bold">inc GST · after STC</span>
        </div>
      </div>

      {/* Visual mini rooftop array & battery footprint diagram */}
      <div className="mt-4 rounded-xl border-2 border-ink bg-bg p-2.5">
        <SolarArrayFootprint panelCount={pkg.panelCount} batteryKwh={pkg.batteryKwh} />
        <div className="mt-1.5 flex flex-wrap items-center justify-between gap-2 border-t border-line pt-1.5 font-mono text-[0.68rem] font-bold text-muted">
          <span>
            {approxRoofM2 ? `~${approxRoofM2} m² roof footprint (${pkg.panelCount} modules)` : 'Wall or garage floor mount'}
          </span>
          {estDailyKwh ? (
            <span className="text-leaf">~{estDailyKwh} kWh/day Adelaide avg</span>
          ) : (
            <span className="text-leaf">AC-coupled storage</span>
          )}
        </div>
      </div>

      {/* Mono hardware specs */}
      <dl className="mt-3 grid grid-cols-2 gap-2 rounded-xl border-2 border-line bg-surface/65 p-3 font-mono text-xs">
        <div>
          <dt className="text-muted uppercase">Panels</dt>
          <dd className="mt-0.5 font-bold text-ink">
            {pkg.panelCount > 0 ? `${pkg.panelCount} × ${pkg.panelWatts} W` : 'Uses existing solar'}
          </dd>
        </div>
        <div>
          <dt className="text-muted uppercase">Inverter</dt>
          <dd className="mt-0.5 font-bold text-ink">{pkg.inverter}</dd>
        </div>
      </dl>

      <p className="mt-4 text-sm text-ink">
        <strong className="font-semibold">Best for:</strong> {pkg.bestFor}
      </p>

      {pkg.availabilityNote && (
        <p className="mt-2 font-mono text-xs font-semibold text-accent-ink">
          {pkg.availabilityNote}
        </p>
      )}

      {!featuredLayout && (
        <ul className="mt-4 space-y-1.5 border-t border-line pt-3 text-sm text-muted">
          {pkg.includes.slice(0, 4).map(item => (
            <li key={item} className="flex items-start gap-2">
              <SolarIcon name="check-sun" className="mt-0.5 w-4 h-4 shrink-0 text-ink" />
              <span>{item}</span>
            </li>
          ))}
        </ul>
      )}

      <div className="mt-5 flex flex-wrap items-center justify-between gap-3 border-t border-line pt-4">
        <span className="font-mono text-[0.72rem] text-muted">{PRICING_LABEL_SHORT}</span>
        <SiteLink
          href={featuredLayout ? `/packages/#${pkg.id}` : '/contact/'}
          className="text-link inline-flex items-center gap-1 text-sm"
        >
          {featuredLayout ? `See ${pkg.name} specs →` : `Request a quote for ${pkg.name} →`}
        </SiteLink>
      </div>
    </article>
  );
}

/** Filterable rooftop package rack + synchronised spec comparison table for /packages/. */
export function PackagesRackAndTable({ items = packages }: { items?: readonly SolarPackage[] }) {
  const [filter, setFilter] = useState<FilterValue>('all');

  useEffect(() => {
    const syncFromHash = () => setFilter(hashToFilter(window.location.hash));
    syncFromHash();
    window.addEventListener('hashchange', syncFromHash);
    return () => window.removeEventListener('hashchange', syncFromHash);
  }, []);

  function selectFilter(next: FilterValue) {
    setFilter(next);
    if (typeof window !== 'undefined') {
      const targetHash = next === 'all' ? '' : `#${next}`;
      const newUrl = `${window.location.pathname}${window.location.search}${targetHash}`;
      window.history.replaceState(null, '', newUrl);
      document.getElementById(`pkg-tab-${next}`)?.scrollIntoView({
        block: 'nearest',
        inline: 'nearest',
      });
    }
  }

  function handleTabKeyDown(event: KeyboardEvent<HTMLButtonElement>, index: number) {
    let nextIndex = index;
    if (event.key === 'ArrowRight') nextIndex = (index + 1) % FILTER_TABS.length;
    else if (event.key === 'ArrowLeft') nextIndex = (index - 1 + FILTER_TABS.length) % FILTER_TABS.length;
    else if (event.key === 'Home') nextIndex = 0;
    else if (event.key === 'End') nextIndex = FILTER_TABS.length - 1;
    else return;

    event.preventDefault();
    const nextTab = FILTER_TABS[nextIndex];
    selectFilter(nextTab.id);
    document.getElementById(`pkg-tab-${nextTab.id}`)?.focus();
  }

  const visible = filter === 'all' ? items : items.filter(pkg => pkg.kind === filter);

  return (
    <div className="space-y-14">
      {/* Filter tabs on a rooftop rail */}
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div
          role="tablist"
          aria-label="Filter solar packages by type"
          className="rail-tablist"
        >
          {FILTER_TABS.map((tab, index) => {
            const selected = filter === tab.id;
            const count = tab.id === 'all' ? items.length : items.filter(p => p.kind === tab.id).length;
            return (
              <button
                key={tab.id}
                id={`pkg-tab-${tab.id}`}
                type="button"
                role="tab"
                aria-selected={selected}
                tabIndex={selected ? 0 : -1}
                onClick={() => selectFilter(tab.id)}
                onKeyDown={event => handleTabKeyDown(event, index)}
                className="rail-tab"
              >
                <span>{tab.label}</span>
                <span className="font-mono text-xs opacity-80">({count})</span>
              </button>
            );
          })}
        </div>
        <p className="font-mono text-xs text-muted" aria-live="polite">
          Showing {visible.length} of {items.length} packages · all prices “from”, inc GST, after the STC discount
        </p>
      </div>

      {/* Rooftop Package Rack */}
      <div
        role="tabpanel"
        aria-labelledby={`pkg-tab-${filter}`}
        className="solar-grid-bg relative rounded-3xl border-2.5 border-ink bg-surface p-5 shadow-[0_7px_0_var(--ink)] sm:p-8"
      >
        {/* Background solar panel grid motif */}
        <div
          className="pointer-events-none absolute right-4 top-4 w-56 opacity-20 no-print"
          aria-hidden="true"
        >
          <PanelGridMotif />
        </div>

        {/* Drawn aluminium mounting rail bar */}
        <div
          className="mb-6 flex items-center gap-2 rounded-full border-2 border-ink bg-bg px-4 py-1.5 font-mono text-xs font-bold uppercase tracking-widest text-ink shadow-[0_2px_0_var(--ink)]"
          aria-hidden="true"
        >
          <span className="inline-block h-2.5 w-2.5 rounded-full bg-sun border border-ink" />
          <span>12° Rooftop Mounting Rail · Cyclone-rated framing</span>
          <span className="ml-auto hidden text-muted sm:inline">Adelaide STC Zone 3</span>
        </div>

        <div className="relative grid gap-6 md:grid-cols-2">
          {visible.map(pkg => (
            <PackagePlate key={pkg.id} pkg={pkg} />
          ))}
        </div>
      </div>

      {/* Printed Spec Comparison Table */}
      <section aria-labelledby="comparison-heading">
        <div className="mb-4 flex flex-wrap items-end justify-between gap-3">
          <div>
            <p className="eyebrow">Side-by-side spec sheet</p>
            <h2 id="comparison-heading" className="mt-1 text-3xl text-ink sm:text-4xl">
              Compare every number
            </h2>
          </div>
          <p className="font-mono text-xs text-muted">
            Scroll sideways on narrow screens · package name stays pinned
          </p>
        </div>

        <div
          tabIndex={0}
          role="region"
          aria-labelledby="spec-table-caption"
          className="table-wrapper"
        >
          <table className="spec-table">
            <caption id="spec-table-caption">
              Sunward Solar package specifications — “from” prices in AUD, inc GST, after the STC discount
            </caption>
            <thead>
              <tr>
                <th scope="col">Package</th>
                <th scope="col">Type</th>
                <th scope="col">Solar kW</th>
                <th scope="col">Panels</th>
                <th scope="col">Battery</th>
                <th scope="col">Inverter</th>
                <th scope="col">From price</th>
                <th scope="col">Status</th>
              </tr>
            </thead>
            <tbody>
              {visible.map(pkg => (
                <tr key={pkg.id} className={pkg.availability === 'unavailable' ? 'opacity-60' : undefined}>
                  <th scope="row">{pkg.name}</th>
                  <td>{kindLabel(pkg.kind)}</td>
                  <td className="font-mono font-bold">
                    {pkg.systemKw > 0 ? `${pkg.systemKw} kW` : '—'}
                  </td>
                  <td className="font-mono">
                    {pkg.panelCount > 0 ? `${pkg.panelCount} × ${pkg.panelWatts} W` : '—'}
                  </td>
                  <td className="font-mono font-bold text-leaf">
                    {pkg.batteryKwh > 0 ? `${pkg.batteryKwh} kWh` : '—'}
                  </td>
                  <td className="font-mono text-xs">{pkg.inverter}</td>
                  <td className="font-mono font-bold whitespace-nowrap">
                    <span className={pkg.availability === 'unavailable' ? 'line-through' : undefined}>
                      from {formatAud(pkg.fromPriceAud)}
                    </span>
                    <span className="block text-[0.7rem] font-normal text-muted">
                      inc GST · after STC
                    </span>
                  </td>
                  <td className="font-mono text-xs">
                    {pkg.availability === 'available'
                      ? 'Available'
                      : pkg.availability === 'limited'
                        ? pkg.availabilityNote || 'Limited stock'
                        : 'Unavailable'}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
}
