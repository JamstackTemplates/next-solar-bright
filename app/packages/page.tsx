import type { Metadata } from 'next';
import { PageHead } from '../../components/page-head';
import { AddOnsShelf, IncludesAndPricingBand } from '../../components/page-sections';
import { PackagesRackAndTable } from '../../components/packages-rack';
import { QuoteBand } from '../../components/quote-band';
import { SunriseHorizonDivider } from '../../components/artwork';
import { absoluteUrl } from '../../lib/paths';

export const metadata: Metadata = {
  title: 'Packages',
  description:
    'Compare fixed-price solar panel, home battery and bundle packages for Adelaide homes. All “from” prices include GST and are shown after the federal STC point-of-sale discount.',
  alternates: { canonical: absoluteUrl('/packages/') },
};

export default function PackagesPage() {
  return (
    <>
      <PageHead eyebrow="Solar &amp; battery packages" title="Pick your patch of sun" detail="rack">
        <p>
          Every package below is a complete residential install by our own Adelaide crew. Filter by
          panels, batteries or bundles, then compare every spec side by side.
        </p>
      </PageHead>

      <section className="grain-band bg-bg py-10 sm:py-14">
        <div className="wrap">
          <PackagesRackAndTable />
        </div>
      </section>

      <SunriseHorizonDivider variant="rising" topColor="var(--bg)" bottomColor="var(--surface)" />

      {/* Hardware shelf add-ons */}
      <AddOnsShelf>
        <p className="eyebrow">Optional extras</p>
        <h2 id="addons-heading" className="mt-1.5 text-3xl text-ink sm:text-4xl">
          Hardware shelf add-ons
        </h2>
        <p className="mt-2 max-w-2xl text-base text-muted">
          Bundle an EV charger, bird mesh or blackout backup circuit on install day so the crew
          wires everything once.
        </p>
      </AddOnsShelf>

      {/* What every install includes + boxed pricing note */}
      <IncludesAndPricingBand
        includesHeading={
          <div>
            <p className="eyebrow">Standard across the board</p>
            <h2 className="mt-1.5 text-3xl text-ink sm:text-4xl">What every install includes</h2>
            <p className="mt-2 text-base text-muted">
              No hidden mounting surcharges for standard single-storey tin or tile roofs, and no
              third-party sub-contractors.
            </p>
          </div>
        }
        pricingNote={
          <div>
            <p className="font-mono text-xs font-bold uppercase tracking-wider text-accent-ink">
              Pricing &amp; quote note
            </p>
            <h2 className="mt-2 text-2xl text-ink">How our “from” prices work</h2>
            <p className="mt-3 text-sm text-ink">
              All package prices shown on this page are <strong>“from” prices in AUD</strong>,{' '}
              <strong>include GST</strong>, and are shown{' '}
              <strong>after the federal STC point-of-sale discount</strong> (and any applicable
              federal point-of-sale battery discount where relevant).
            </p>
            <p className="mt-3 text-sm text-muted">
              Two-storey access, steep pitches, terracotta split-arrays, long cable runs or
              switchboard upgrades can affect the final total. Your exact price and exact discount
              applied are confirmed in a fixed written quote after a roof check.
            </p>
          </div>
        }
      />

      <QuoteBand>
        <QuoteBand.Eyebrow>Not sure which size fits?</QuoteBand.Eyebrow>
        <QuoteBand.Heading>Send us a recent bill and we’ll size it.</QuoteBand.Heading>
        <QuoteBand.Body>
          We’ll match a package to your roof space and evening power use and send a written quote
          with no obligation.
        </QuoteBand.Body>
        <QuoteBand.Actions>
          <QuoteBand.Primary>Request a free quote</QuoteBand.Primary>
          <QuoteBand.Secondary href="/savings/">Try the savings estimator</QuoteBand.Secondary>
        </QuoteBand.Actions>
      </QuoteBand>
    </>
  );
}
