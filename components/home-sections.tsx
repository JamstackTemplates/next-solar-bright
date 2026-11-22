import type { CSSProperties, ReactNode } from 'react';
import { business } from '../content/business';
import { formatInstallMonth, installs } from '../content/installs';
import {
  getFeaturedPackages,
  getPackageById,
  HERO_FEATURED_PACKAGE_ID,
  PRICING_LABEL_SHORT,
} from '../content/packages';
import { processSteps } from '../content/process';
import { HOME_TEASER_FAQ_IDS, rebates } from '../content/rebates';
import { dialFrames, HOME_DIAL_FRAME_IDS } from '../content/savings';
import { asset } from '../lib/paths';
import { formatAud } from '../lib/savings-estimator';
import {
  AdelaideRegionMapArt,
  CertificateStampArt,
  InstallPhaseMarker,
  PanelGridMotif,
  SunriseHorizonDivider,
  ThreeWaysVignette,
} from './artwork';
import { SolarIcon } from './icons';
import { PackagePlate } from './packages-rack';
import { SiteLink } from './site-link';
import { SunDialSvg } from './sun-dial-svg';

type ContentProps = { children: ReactNode };

/* ==========================================================================
   1. Home Hero ("Sun-poster rooftops")
   Mobile 390px: cropped rooftop art (~38-42% vh) above 44px headline & CTA visible without scroll.
   Desktop 1440px: asymmetric split with ~82-88px display headline at left & Rooftop art filling right 60% bleeding off right edge.
   ========================================================================== */

function HomeHeroSection({ children }: ContentProps) {
  return (
    <>
      <section className="grain-band relative overflow-hidden bg-sky pt-4 pb-10 lg:py-14">
        {/* Soft radial sun-poster aura behind headline */}
        <div
          className="pointer-events-none absolute -left-24 -top-24 h-96 w-96 rounded-full bg-sun/35 blur-3xl no-print"
          aria-hidden="true"
        />
        <div className="wrap relative grid gap-6 lg:grid-cols-[minmax(0,1.04fr)_minmax(0,1.22fr)] lg:items-center lg:gap-10">
          {/* Rooftop sunrise poster art: top on mobile (compact crop), right 60% bleed on desktop */}
          <div className="hero-art-print-hide order-1 lg:order-2 lg:-mr-28 xl:-mr-40">
            <div className="overflow-hidden rounded-2xl border-2.5 border-ink bg-surface-elevated shadow-[0_7px_0_var(--ink)] lg:rounded-3xl">
              <div
                className="hero-rooftop-art aspect-[2400/1792] max-h-[34vh] w-full bg-sky bg-cover bg-center sm:max-h-[42vh] lg:max-h-none"
                role="img"
                aria-label="Illustrated Adelaide bungalow with rooftop solar panels, a home battery and an electric car beneath a striped sun"
                style={{
                  '--hero-light-image': `url(${asset('/solar-light.webp')})`,
                  '--hero-dark-image': `url(${asset('/solar-dark.webp')})`,
                } as CSSProperties}
              />
              {/* Screen-printed poster plate caption strip */}
              <div className="flex flex-wrap items-center gap-x-6 gap-y-2 border-t-2 border-ink bg-surface px-4 py-2 font-mono text-[0.7rem] font-bold uppercase tracking-wider text-ink">
                <span>FIG. 01 — ADELAIDE SOLAR + STORAGE</span>
                <span className="rounded-full border border-ink bg-sun px-2.5 py-0.5 text-[#1F2A44]">
                  STC ZONE 3 · ~4.3 kWh/kW/DAY
                </span>
              </div>
            </div>
          </div>

          {/* Copy + primary CTA + tilted price tag */}
          <div className="relative z-10 order-2 lg:order-1">{children}</div>
        </div>
      </section>
      <SunriseHorizonDivider variant="rising" topColor="var(--sky)" bottomColor="var(--surface)" />
    </>
  );
}

function HeroHeading({ children }: ContentProps) {
  return (
    <div>
      <p className="mb-2.5 inline-flex items-center gap-2 rounded-full border-2 border-ink bg-surface-elevated px-3.5 py-1 font-mono text-xs font-bold uppercase tracking-wider text-ink shadow-[0_2px_0_var(--ink)]">
        <span className="inline-block h-2.5 w-2.5 rounded-full border border-ink bg-sun" aria-hidden="true" />
        <span>Adelaide solar &amp; battery specialists</span>
      </p>
      <h1 className="text-[clamp(2.6rem,4.85vw,4.65rem)] leading-[0.97] text-ink">
        {children}
      </h1>
    </div>
  );
}

function HeroLede({ children }: ContentProps) {
  return (
    <p className="mt-3 max-w-lg text-base font-medium leading-snug text-ink/90 sm:mt-5 sm:text-xl">
      {children}
    </p>
  );
}

function HeroActions({ children }: ContentProps) {
  return <div className="mt-4 flex flex-wrap items-center gap-x-5 gap-y-3 sm:mt-6">{children}</div>;
}

function HeroPrimaryCta({ children }: ContentProps) {
  return (
    <SiteLink href="/contact/" className="button px-6 py-3 text-base">
      {children}
    </SiteLink>
  );
}

function HeroSecondaryCta({ href, children }: { href: string; children: ReactNode }) {
  return (
    <SiteLink href={href} className="text-link text-base text-ink hover:text-accent-ink">
      {children}
    </SiteLink>
  );
}

function HeroPriceTag() {
  const heroPkg = getPackageById(HERO_FEATURED_PACKAGE_ID);
  if (!heroPkg) return null;
  return (
    <div className="mt-6 space-y-5 sm:mt-7">
      <div className="flex flex-wrap items-center gap-4">
        <SiteLink
          href={`/packages/#${heroPkg.id}`}
          className="swing-tag no-underline hover:no-underline hover:brightness-95"
        >
          <span className="font-mono text-xs font-bold uppercase tracking-wider">
            Most popular · {heroPkg.name} {heroPkg.systemKw} kW + {heroPkg.batteryKwh} kWh
          </span>
          <span className="mt-0.5 flex flex-wrap items-baseline gap-2">
            <span className="font-display text-2xl leading-none">
              from {formatAud(heroPkg.fromPriceAud)}
            </span>
            <span className="font-mono text-[0.72rem] font-bold">({PRICING_LABEL_SHORT})</span>
          </span>
        </SiteLink>
      </div>

      {/* Tactile Adelaide installer credentials strip */}
      <dl className="grid grid-cols-3 gap-2.5 rounded-2xl border-2 border-ink bg-surface-elevated/95 p-3 shadow-[0_3px_0_var(--ink)] max-w-lg">
        <div className="border-r border-line pr-2">
          <dt className="font-mono text-[0.65rem] font-bold uppercase tracking-wider text-muted">Install crew</dt>
          <dd className="mt-0.5 font-mono text-xs font-bold text-ink">Own CEC team</dd>
        </div>
        <div className="border-r border-line pr-2">
          <dt className="font-mono text-[0.65rem] font-bold uppercase tracking-wider text-muted">Turnaround</dt>
          <dd className="mt-0.5 font-mono text-xs font-bold text-ink">1–2 day install</dd>
        </div>
        <div>
          <dt className="font-mono text-[0.65rem] font-bold uppercase tracking-wider text-muted">Workmanship</dt>
          <dd className="mt-0.5 font-mono text-xs font-bold text-ink">10-yr warranty</dd>
        </div>
      </dl>
    </div>
  );
}

export const HomeHero = Object.assign(HomeHeroSection, {
  Heading: HeroHeading,
  Lede: HeroLede,
  Actions: HeroActions,
  PrimaryCta: HeroPrimaryCta,
  SecondaryCta: HeroSecondaryCta,
  PriceTag: HeroPriceTag,
});

/* ==========================================================================
   2. A Day on Solar (Static 3-frame strip on butter band)
   ========================================================================== */

function DayOnSolarSection({ children }: ContentProps) {
  const trio = HOME_DIAL_FRAME_IDS.map(id => dialFrames.find(f => f.id === id)).filter(
    (frame): frame is NonNullable<typeof frame> => Boolean(frame),
  );

  const PHASE_META: Record<string, { phase: string; badge: string }> = {
    '6-am': { phase: '01 / DAWN WAKE-UP', badge: '14° EAST HORIZON' },
    noon: { phase: '02 / MIDDAY PEAK', badge: '90° NORTH ZENITH' },
    '6-pm': { phase: '03 / EVENING STORAGE', badge: '164° WEST DUSK' },
  };

  return (
    <>
      <section className="grain-band bg-surface py-12 sm:py-16">
        <div className="wrap">
          <div className="flex flex-wrap items-end justify-between gap-4">{children}</div>

          <div className="mt-8 grid gap-6 md:grid-cols-3">
            {trio.map(frame => {
              const meta = PHASE_META[frame.id] ?? {
                phase: frame.label,
                badge: `${frame.sunAngleDeg}° ARC`,
              };
              const activeFlows: string[] = [];
              if (frame.flows.panelsToHome) activeFlows.push('Panels → Home');
              if (frame.flows.panelsToBattery) activeFlows.push('Panels → Battery');
              if (frame.flows.panelsToGrid) activeFlows.push('Panels → Grid');
              if (frame.flows.batteryToHome) activeFlows.push('Battery → Home');
              if (frame.flows.gridToHome) activeFlows.push('Grid → Home');

              return (
                <figure
                  key={frame.id}
                  className="poster-card flex flex-col justify-between overflow-hidden p-0"
                >
                  {/* Top telemetry header bar */}
                  <div className="flex items-center justify-between gap-2 border-b-2 border-ink bg-bg px-4 py-2.5">
                    <span className="rounded-full border-2 border-ink bg-sun px-3 py-0.5 font-mono text-xs font-bold text-[#1F2A44]">
                      {frame.label}
                    </span>
                    <span className="font-mono text-[0.68rem] font-bold uppercase tracking-wider text-muted">
                      {meta.phase}
                    </span>
                  </div>

                  <div className="p-4 sm:p-5">
                    <SunDialSvg frame={frame} compact />
                    <figcaption className="mt-3 text-sm font-medium text-ink">
                      {frame.caption}
                    </figcaption>

                    {/* Active energy circuit pills */}
                    <div className="mt-3.5 flex flex-wrap gap-1.5 border-t border-line pt-3">
                      {activeFlows.map(flow => (
                        <span
                          key={flow}
                          className="inline-flex items-center gap-1 rounded-md border border-ink bg-surface px-2 py-0.5 font-mono text-[0.68rem] font-bold text-ink"
                        >
                          <span
                            className="inline-block h-1.5 w-1.5 rounded-full bg-leaf"
                            aria-hidden="true"
                          />
                          {flow}
                        </span>
                      ))}
                    </div>
                  </div>
                </figure>
              );
            })}
          </div>
        </div>
      </section>
      <SunriseHorizonDivider variant="rising" topColor="var(--surface)" bottomColor="var(--bg)" />
    </>
  );
}

function SectionHeader({
  eyebrow,
  heading,
  lede,
  action,
}: {
  eyebrow: string;
  heading: ReactNode;
  lede?: ReactNode;
  action?: ReactNode;
}) {
  return (
    <>
      <div className="max-w-2xl">
        <p className="eyebrow">{eyebrow}</p>
        <h2 className="mt-1.5 text-3xl leading-tight text-ink sm:text-5xl">{heading}</h2>
        {lede && <p className="mt-3 text-base text-muted sm:text-lg">{lede}</p>}
      </div>
      {action ? <div className="shrink-0">{action}</div> : null}
    </>
  );
}

export const DayOnSolarBand = Object.assign(DayOnSolarSection, { Header: SectionHeader });

/* ==========================================================================
   3. Featured Packages on a Rooftop Rack (asymmetric 2-col layout on cream band)
   ========================================================================== */

export function FeaturedRackBand({ children }: ContentProps) {
  const featured = getFeaturedPackages();
  const [first, second, third] = featured;

  return (
    <section className="grain-band bg-bg py-14 sm:py-20">
      <div className="wrap">
        <div className="flex flex-wrap items-end justify-between gap-4">{children}</div>

        <div className="solar-grid-bg relative mt-8 rounded-3xl border-2.5 border-ink bg-surface p-5 shadow-[0_7px_0_var(--ink)] sm:p-8">
          <div
            className="pointer-events-none absolute right-5 top-5 w-52 opacity-15 no-print"
            aria-hidden="true"
          >
            <PanelGridMotif />
          </div>

          {/* Drawn aluminium mounting rail */}
          <div
            className="mb-6 flex flex-wrap items-center justify-between gap-2 rounded-full border-2 border-ink bg-bg px-4 py-1.5 font-mono text-xs font-bold uppercase tracking-widest text-ink shadow-[0_2px_0_var(--ink)]"
            aria-hidden="true"
          >
            <span className="inline-flex items-center gap-2">
              <span className="inline-block h-2.5 w-2.5 rounded-full bg-sun border border-ink" />
              <span>Featured Rooftop Rack · 12° pitch · Cyclone-rated rails</span>
            </span>
            <span className="hidden text-muted sm:inline">STC Zone 3 (Adelaide)</span>
          </div>

          {/* Asymmetric 2-column grid (hero featured package spans left column on desktop, two stacked on right) */}
          <div className="relative grid gap-6 lg:grid-cols-2 lg:items-stretch">
            {second && (
              <div className="lg:row-span-2 flex flex-col">
                <div className="mb-2.5 inline-flex items-center gap-2 self-start rounded-full border-2 border-ink bg-sun px-3.5 py-1 font-mono text-xs font-bold uppercase tracking-wider text-[#1F2A44] shadow-[0_2px_0_var(--ink)]">
                  <span>★ Most popular Adelaide bundle</span>
                </div>
                <div className="flex-1">
                  <PackagePlate pkg={second} featuredLayout />
                </div>
              </div>
            )}
            {first && <PackagePlate pkg={first} featuredLayout />}
            {third && <PackagePlate pkg={third} featuredLayout />}
          </div>
        </div>
      </div>
    </section>
  );
}

/* ==========================================================================
   4. Three Ways the Sun Saves You Money (asymmetric split + midday horizon)
   ========================================================================== */

function ThreeWaysSection({ children }: ContentProps) {
  return (
    <>
      <section className="grain-band bg-bg py-12 sm:py-16">
        <div className="wrap">{children}</div>
      </section>
      <SunriseHorizonDivider variant="midday" topColor="var(--bg)" bottomColor="var(--surface)" />
    </>
  );
}

function ThreeWaysLayout({
  primary,
  secondary,
}: {
  primary: ReactNode;
  secondary: ReactNode;
}) {
  return (
    <>
      {/* Visual Adelaide Tariff Gap comparison bar */}
      <div className="mt-7 rounded-2xl border-2 border-ink bg-surface p-4 sm:p-5">
        <div className="flex flex-wrap items-center justify-between gap-2 font-mono text-xs font-bold uppercase tracking-wider text-ink">
          <span>The Adelaide Tariff Gap (Illustrative sample)</span>
          <span className="text-accent-ink">Self-use &amp; battery storage is worth ~10× export credits</span>
        </div>
        <div className="mt-3 grid gap-2.5 sm:grid-cols-[1fr_auto] sm:items-center">
          <div className="space-y-2">
            <div className="flex items-center gap-3">
              <span className="w-28 shrink-0 font-mono text-xs font-bold text-ink">Use / Store 1 kWh</span>
              <div className="h-5 flex-1 overflow-hidden rounded-full border-2 border-ink bg-bg">
                <div className="h-full w-[92%] rounded-full bg-leaf" />
              </div>
              <span className="w-20 shrink-0 text-right font-mono text-xs font-bold text-leaf">~42c saved</span>
            </div>
            <div className="flex items-center gap-3">
              <span className="w-28 shrink-0 font-mono text-xs font-bold text-muted">Export 1 kWh</span>
              <div className="h-5 flex-1 overflow-hidden rounded-full border-2 border-ink bg-bg">
                <div className="h-full w-[11%] rounded-full bg-sun" />
              </div>
              <span className="w-20 shrink-0 text-right font-mono text-xs font-bold text-muted">~4c credit</span>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-6 grid gap-6 lg:grid-cols-[1.18fr_0.92fr] lg:items-stretch">
        <div className="poster-card flex flex-col justify-between p-6 sm:p-8">{primary}</div>
        <div className="grid gap-6">{secondary}</div>
      </div>
    </>
  );
}

function WayItem({
  kind,
  stat,
  title,
  children,
  large = false,
}: {
  kind: 'use' | 'store' | 'export';
  stat: string;
  title: string;
  children: ReactNode;
  large?: boolean;
}) {
  if (large) {
    return (
      <>
        <div>
          <p className="font-mono text-xs font-bold uppercase tracking-wider text-leaf">{stat}</p>
          <h3 className="mt-1 text-3xl text-ink sm:text-4xl">{title}</h3>
          <div className="mt-3 space-y-2 text-base text-muted">{children}</div>
        </div>
        <div className="mt-6">
          <ThreeWaysVignette kind={kind} className="w-full max-w-md h-auto" />
        </div>
      </>
    );
  }
  return (
    <div className="poster-card grid gap-4 p-5 sm:grid-cols-[1fr_0.9fr] sm:items-center">
      <div>
        <p className="font-mono text-xs font-bold uppercase tracking-wider text-accent-ink">{stat}</p>
        <h3 className="mt-1 text-2xl text-ink">{title}</h3>
        <div className="mt-2 space-y-1.5 text-sm text-muted">{children}</div>
      </div>
      <ThreeWaysVignette kind={kind} />
    </div>
  );
}

export const ThreeWaysBand = Object.assign(ThreeWaysSection, {
  Header: SectionHeader,
  Layout: ThreeWaysLayout,
  Item: WayItem,
});

/* ==========================================================================
   5. Install Steps along a Sun Arc (butter band)
   ========================================================================== */

export function InstallStepsBand({ children }: ContentProps) {
  return (
    <>
      <section className="grain-band bg-surface py-14 sm:py-20">
        <div className="wrap">
          <div className="flex flex-wrap items-end justify-between gap-4">{children}</div>

          {/* Horizontal arc timeline at desktop, vertical path at mobile */}
          <div className="relative mt-10">
            {/* Decorative sun-arc rail on desktop */}
            <svg
              viewBox="0 0 1000 80"
              fill="none"
              aria-hidden="true"
              className="pointer-events-none hidden lg:block absolute -top-2 left-0 w-full h-16"
            >
              <path
                d="M60 66 Q500 -10 940 66"
                stroke="var(--ink)"
                strokeWidth="3"
                strokeDasharray="8 7"
                strokeLinecap="round"
                opacity="0.55"
              />
            </svg>

            <ol className="relative grid gap-5 lg:grid-cols-5 lg:gap-4">
              {processSteps.map((step, idx) => {
                const phase = (idx + 1) as 1 | 2 | 3 | 4 | 5;
                // Gentle arc vertical offset on desktop so steps trace the sun curve
                const arcOffsets = [
                  'lg:mt-9',
                  'lg:mt-3',
                  'lg:mt-0',
                  'lg:mt-3',
                  'lg:mt-9',
                ];
                return (
                  <li
                    key={step.id}
                    className={`poster-card flex items-start gap-4 p-4 sm:p-5 lg:flex-col lg:items-center lg:text-center ${arcOffsets[idx]}`}
                  >
                    <InstallPhaseMarker step={phase} />
                    <div>
                      <span className="inline-block rounded-full border border-ink bg-sun px-2.5 py-0.5 font-mono text-[0.7rem] font-bold uppercase tracking-wider text-[#1F2A44]">
                        Step 0{phase} · {step.duration}
                      </span>
                      <h3 className="mt-2 text-xl leading-snug text-ink">{step.title}</h3>
                      <p className="mt-1.5 text-sm text-muted">{step.detail}</p>
                    </div>
                  </li>
                );
              })}
            </ol>
          </div>
        </div>
      </section>
      <SunriseHorizonDivider variant="rising" topColor="var(--surface)" bottomColor="var(--bg)" />
    </>
  );
}

/* ==========================================================================
   6. Recent Installs (job tags strung on a line) + Service Area (split band)
   ========================================================================== */

export function RecentInstallsBand({
  installsHeading,
  areaHeading,
  areaBody,
}: {
  installsHeading: ReactNode;
  areaHeading: ReactNode;
  areaBody: ReactNode;
}) {
  return (
    <section className="grain-band bg-bg py-14 sm:py-20">
      <div className="wrap grid gap-12 lg:grid-cols-[1.25fr_0.85fr] lg:items-start">
        {/* Left: Recent installs strung as job tags */}
        <div>
          {installsHeading}

          <div className="relative mt-7">
            {/* Horizontal string line */}
            <div
              className="hidden sm:block absolute left-4 right-4 top-3 h-0.5 bg-ink/40"
              aria-hidden="true"
            />
            <ul className="relative grid gap-5 sm:grid-cols-2">
              {installs.map((install, index) => {
                const pkg = getPackageById(install.packageId);
                const tilt = index % 2 === 0 ? 'sm:-rotate-1' : 'sm:rotate-1';
                return (
                  <li
                    key={install.id}
                    className={`poster-card relative p-5 transition-transform hover:rotate-0 ${tilt}`}
                  >
                    {/* String grommet dot */}
                    <span
                      className="hidden sm:block absolute -top-2 left-1/2 h-3.5 w-3.5 -translate-x-1/2 rounded-full border-2 border-ink bg-sun"
                      aria-hidden="true"
                    />
                    <div className="flex items-center justify-between gap-2">
                      <span className="font-mono text-xs font-bold uppercase tracking-wider text-accent-ink">
                        {formatInstallMonth(install.month)}
                      </span>
                      <span className="inline-flex items-center gap-1 rounded-full border border-ink bg-surface px-2.5 py-0.5 font-mono text-xs font-semibold text-ink">
                        <SolarIcon
                          name={install.roof === 'tile' ? 'tile-roof' : 'tin-roof'}
                          className="w-3.5 h-3.5"
                        />
                        {install.roof === 'tile' ? 'Tile roof' : 'Tin roof'}
                      </span>
                    </div>
                    <h3 className="mt-2 text-2xl text-ink">{install.suburb}</h3>
                    {pkg && (
                      <p className="mt-0.5 font-mono text-xs font-bold text-leaf">
                        {pkg.name} ({pkg.systemKw > 0 ? `${pkg.systemKw} kW` : `${pkg.batteryKwh} kWh battery`})
                      </p>
                    )}
                    <p className="mt-2 text-sm text-muted">{install.note}</p>
                  </li>
                );
              })}
            </ul>
          </div>
        </div>

        {/* Right: Stylised Adelaide service area map & region list with drawn pins (no map embed) */}
        <aside className="poster-card bg-surface p-6 sm:p-8">
          {areaHeading}
          <div className="mt-2 text-sm text-muted">{areaBody}</div>

          <div className="mt-5">
            <AdelaideRegionMapArt />
          </div>

          <ul className="mt-5 space-y-3.5">
            {business.serviceArea.map(area => (
              <li
                key={area.id}
                className="flex items-start gap-3 rounded-xl border-2 border-ink bg-elevated p-4"
              >
                <SolarIcon name="map-pin" className="mt-0.5 w-6 h-6 shrink-0 text-primary" />
                <div>
                  <h3 className="text-xl text-ink">{area.region}</h3>
                  <p className="mt-0.5 text-sm text-muted">{area.places}</p>
                </div>
              </li>
            ))}
          </ul>

          <p className="mt-5 font-mono text-xs text-muted">
            {business.location.summary} ({business.location.landmark}). {business.location.appointmentNote}
          </p>
        </aside>
      </div>
    </section>
  );
}

/* ==========================================================================
   7. Rebates Teaser (2 open details questions + certificate stamp)
   ========================================================================== */

export function RebatesTeaserBand({ children }: ContentProps) {
  const teaserFaqs = HOME_TEASER_FAQ_IDS.map(id => rebates.faqs.find(f => f.id === id)).filter(
    (faq): faq is NonNullable<typeof faq> => Boolean(faq),
  );

  return (
    <>
      <SunriseHorizonDivider variant="rising" topColor="var(--bg)" bottomColor="var(--surface)" />
      <section className="grain-band bg-surface py-14 sm:py-18">
        <div className="wrap grid gap-8 lg:grid-cols-[0.7fr_1.3fr] lg:items-center">
          <div className="flex flex-col items-start gap-5">
            <CertificateStampArt className="w-36 h-36 sm:w-44 sm:h-44" />
            <div>{children}</div>
          </div>

          <div className="space-y-4">
            {teaserFaqs.map(faq => (
              <details key={faq.id} open className="faq-slip">
                <summary>{faq.question}</summary>
                <div className="faq-slip-body space-y-2 text-sm sm:text-base">
                  {faq.answer.map(paragraph => (
                    <p key={paragraph}>{paragraph}</p>
                  ))}
                </div>
              </details>
            ))}
          </div>
        </div>
      </section>
      <SunriseHorizonDivider variant="rising" topColor="var(--surface)" bottomColor="var(--bg)" />
    </>
  );
}
