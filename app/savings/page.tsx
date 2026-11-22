import type { Metadata } from 'next';
import { SunriseHorizonDivider } from '../../components/artwork';
import { PageHead } from '../../components/page-head';
import {
  AssumptionsSpecTable,
  FactorsCompassBand,
  ZigZagSavingsRow,
} from '../../components/page-sections';
import { QuoteBand } from '../../components/quote-band';
import { SavingsEstimator } from '../../components/savings-estimator';
import { InteractiveSunDial } from '../../components/sun-dial';
import { savingsAssumptions } from '../../content/savings';
import { absoluteUrl } from '../../lib/paths';

export const metadata: Metadata = {
  title: 'Savings',
  description:
    'See how solar panels and home batteries cut Adelaide power bills across the day, explore our interactive sun-path dial, and try the illustrative savings estimator.',
  alternates: { canonical: absoluteUrl('/savings/') },
};

const FACTORS = [
  {
    title: 'Roof direction & pitch',
    detail:
      'North-facing panels peak at midday in Adelaide, while east and west splits spread generation into breakfast and late-afternoon air-con hours.',
  },
  {
    title: 'Shade from trees & chimneys',
    detail:
      'Even a single winter shadow across a string can trim output. We check seasonal shade angles during your roof check before quoting.',
  },
  {
    title: 'When you use power',
    detail:
      'Homes occupied during the day soak up solar directly; households out at work until 6 pm get the biggest jump from adding a battery.',
  },
  {
    title: 'Your electricity tariff',
    detail:
      'Time-of-use rates, peak evening charges and retailer feed-in tariffs all shift the payback. We check your actual bill during quoting.',
  },
  {
    title: 'Battery size',
    detail:
      'Too small and you buy peak power before bedtime; too big and it sits half-empty in winter. Matching kWh to your overnight draw gives the best return.',
  },
];

export default function SavingsPage() {
  const importCents = Math.round(savingsAssumptions.importRateAudPerKwh * 100);
  const feedInCents = Math.round(savingsAssumptions.feedInAudPerKwh * 100);

  return (
    <>
      <PageHead eyebrow="Solar &amp; battery numbers" title="Where the savings come from" detail="dial">
        <p>
          No mysterious spreadsheets or inflated promises. Spin the sun across an Adelaide day, see
          the real gap between self-use and exports, and test an illustrative sample on your bill.
        </p>
      </PageHead>

      {/* 2. Interactive Sun-path Dial */}
      <section aria-labelledby="dial-heading" className="grain-band bg-bg py-10 sm:py-14">
        <div className="wrap">
          <div className="mb-6 max-w-2xl">
            <p className="eyebrow">Interactive sun-path dial</p>
            <h2 id="dial-heading" className="mt-1.5 text-3xl text-ink sm:text-5xl">
              Watch power move from 6 am to 9 pm
            </h2>
            <p className="mt-2 text-base text-muted">
              Select a time chip (or use the arrow keys) to trace how panels, home, battery and the
              grid work together through a typical sunny day.
            </p>
          </div>
          <InteractiveSunDial />
        </div>
      </section>

      <SunriseHorizonDivider variant="rising" topColor="var(--bg)" bottomColor="var(--surface)" />

      {/* 3. Use it / Store it / Export it zig-zag */}
      <section aria-labelledby="three-ways-heading" className="grain-band bg-surface py-14 sm:py-20">
        <div className="wrap">
          <div className="max-w-2xl">
            <p className="eyebrow">{savingsAssumptions.sampleLabel} tariff gap</p>
            <h2 id="three-ways-heading" className="mt-1.5 text-3xl text-ink sm:text-5xl">
              Use it, store it, export it
            </h2>
            <p className="mt-2 text-base text-muted">
              Using 1 kWh of your own solar avoids buying it at roughly {importCents}c, whereas
              exporting that same kilowatt-hour earns roughly {feedInCents}c. That gap drives every
              design decision we make.
            </p>
          </div>

          <div className="mt-12 space-y-14">
            <ZigZagSavingsRow
              kind="use"
              eyebrow={`Use it directly · ${savingsAssumptions.sampleLabel}`}
              bigNumber={`Use 1 kWh: save ${importCents}c`}
              heading="Daytime loads are the fastest return"
            >
              <p>
                Running your hot water diverter, pool pump, washing machine or summer cooling
                between 10 am and 3 pm displaces full retail power straight off your bill.
              </p>
              <p>
                Panels-only packages typically achieve around{' '}
                {Math.round(savingsAssumptions.selfUseShare.panels * 100)}% self-use in our
                illustrative sample.
              </p>
            </ZigZagSavingsRow>

            <ZigZagSavingsRow
              kind="store"
              reverse
              eyebrow={`Store it in a battery · ${savingsAssumptions.sampleLabel}`}
              bigNumber={`${Math.round(savingsAssumptions.selfUseShare.bundle * 100)}% self-use`}
              heading="Carry midday sunshine into dinner time"
            >
              <p>
                Instead of selling spare afternoon power for {feedInCents}c and buying it back at{' '}
                {importCents}c after sunset, a home battery holds that energy for peak evening
                hours.
              </p>
              <p>
                In our illustrative sample, pairing panels with a battery lifts self-use from{' '}
                {Math.round(savingsAssumptions.selfUseShare.panels * 100)}% to{' '}
                {Math.round(savingsAssumptions.selfUseShare.bundle * 100)}%.
              </p>
            </ZigZagSavingsRow>

            <ZigZagSavingsRow
              kind="export"
              eyebrow={`Export the surplus · ${savingsAssumptions.sampleLabel}`}
              bigNumber={`Export 1 kWh: ${feedInCents}c`}
              heading="A small bonus, not the main game"
            >
              <p>
                Exporting leftover midday sun trims your bill slightly, especially in bright spring
                and summer months when generation outpaces household demand.
              </p>
              <p>
                Because South Australian networks can also vary exports on sunny days, we never
                pitch oversized systems purely on feed-in income.
              </p>
            </ZigZagSavingsRow>
          </div>
        </div>
      </section>

      <SunriseHorizonDivider variant="rising" topColor="var(--surface)" bottomColor="var(--bg)" />

      {/* 4. Interactive Savings Estimator */}
      <section id="estimator" aria-labelledby="estimator-heading" className="grain-band bg-bg py-14 sm:py-18">
        <div className="wrap">
          <div className="mb-8 max-w-2xl">
            <p className="eyebrow">{savingsAssumptions.sampleLabel}</p>
            <h2 id="estimator-heading" className="mt-1.5 text-3xl text-ink sm:text-5xl">
              Illustrative savings estimator
            </h2>
            <p className="mt-2 text-base text-muted">
              Slide to your rough quarterly bill and pick a solar package to see an illustrative
              annual saving range and simple payback range.
            </p>
          </div>

          <SavingsEstimator />
        </div>
      </section>

      {/* 5. Assumptions Spec Table */}
      <AssumptionsSpecTable>
        <p className="eyebrow">Working shown</p>
        <h2 id="assumptions-heading" className="mt-1.5 text-3xl text-ink sm:text-4xl">
          The numbers behind the estimator
        </h2>
        <p className="mt-2 max-w-2xl text-base text-muted">
          Every figure below is an illustrative sample for Adelaide — never a guaranteed outcome.
        </p>
      </AssumptionsSpecTable>

      {/* 6. What changes your numbers (Compass Rose band) */}
      <FactorsCompassBand
        heading={
          <div>
            <p className="eyebrow">Every roof is different</p>
            <h2 className="mt-1.5 text-3xl text-ink sm:text-4xl">What changes your numbers</h2>
            <p className="mt-2 text-sm text-muted">
              Five things we check on your actual home before putting a fixed written quote in your
              inbox.
            </p>
          </div>
        }
        factors={FACTORS}
      />

      {/* 7. Closing Quote CTA */}
      <QuoteBand>
        <QuoteBand.Eyebrow>Want real numbers for your roof?</QuoteBand.Eyebrow>
        <QuoteBand.Heading>Let’s check your roof and bill together.</QuoteBand.Heading>
        <QuoteBand.Body>
          Send us your suburb and a recent quarterly bill. We’ll reply within one business day with
          a tailored assessment — no obligation.
        </QuoteBand.Body>
        <QuoteBand.Actions>
          <QuoteBand.Primary>Request a free quote</QuoteBand.Primary>
          <QuoteBand.Secondary href="/rebates/">Read how rebates work</QuoteBand.Secondary>
        </QuoteBand.Actions>
      </QuoteBand>
    </>
  );
}
