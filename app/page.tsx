import type { Metadata } from 'next';
import {
  DayOnSolarBand,
  FeaturedRackBand,
  HomeHero,
  InstallStepsBand,
  RebatesTeaserBand,
  RecentInstallsBand,
  ThreeWaysBand,
} from '../components/home-sections';
import { QuoteBand } from '../components/quote-band';
import { SiteLink } from '../components/site-link';
import { savingsAssumptions } from '../content/savings';
import { absoluteUrl } from '../lib/paths';
import { businessStructuredData, jsonLd } from '../lib/structured-data';

export const metadata: Metadata = {
  alternates: { canonical: absoluteUrl('/') },
};

export default function HomePage() {
  const importCents = Math.round(savingsAssumptions.importRateAudPerKwh * 100);
  const feedInCents = Math.round(savingsAssumptions.feedInAudPerKwh * 100);

  return (
    <>
      {/* 1. Hero sun-poster scene */}
      <HomeHero>
        <HomeHero.Heading>
          Let the sun pay
          <br />
          the power bill.
        </HomeHero.Heading>
        <HomeHero.Lede>
          Fixed-price solar and home batteries for Adelaide homes, installed by our own crew in a
          day or two.
        </HomeHero.Lede>
        <HomeHero.Actions>
          <HomeHero.PrimaryCta>Request a free quote</HomeHero.PrimaryCta>
          <HomeHero.SecondaryCta href="/packages/">Compare packages</HomeHero.SecondaryCta>
          <HomeHero.SecondaryCta href="/savings/">How the savings work</HomeHero.SecondaryCta>
        </HomeHero.Actions>
        <HomeHero.PriceTag />
      </HomeHero>

      {/* 2. A day on solar (static 3-frame dial preview) */}
      <DayOnSolarBand>
        <DayOnSolarBand.Header
          eyebrow="A day on solar"
          heading="Morning light, midday export, evening on battery"
          lede="Follow how a solar and battery home shifts daytime Adelaide sunshine into the hours you actually cook, cool and unwind."
          action={
            <SiteLink href="/savings/" className="button button-quiet">
              See how the savings work →
            </SiteLink>
          }
        />
      </DayOnSolarBand>

      {/* 3. Featured packages on a drawn rooftop rack */}
      <FeaturedRackBand>
        <DayOnSolarBand.Header
          eyebrow="Rooftop rack"
          heading="Clear packages, no mystery pricing"
          lede="Every figure is a “from” price in AUD, includes GST, and already deducts the federal STC point-of-sale discount."
          action={
            <SiteLink href="/packages/" className="button button-quiet">
              Compare all packages →
            </SiteLink>
          }
        />
      </FeaturedRackBand>

      {/* 4. Three ways the sun saves you money */}
      <ThreeWaysBand>
        <ThreeWaysBand.Header
          eyebrow="Where the money comes from"
          heading="Three ways the sun saves you money"
          lede="Solar cuts your bill in three distinct ways — and using your own power always beats selling it back."
          action={
            <SiteLink href="/savings/#estimator" className="text-link">
              Try the savings estimator →
            </SiteLink>
          }
        />

        <ThreeWaysBand.Layout
          primary={
            <ThreeWaysBand.Item
              kind="use"
              large
              stat={`~${importCents}c / kWh avoided (illustrative sample)`}
              title="1. Use it straight off the roof"
            >
              <p>
                Every kilowatt-hour your fridge, washing machine or split-system draws straight
                from your panels is a unit you do not buy from your retailer.
              </p>
              <p>
                Running dishwashers, pool pumps or EV chargers on daytime timers turns sunshine
                directly into lower quarterly bills.
              </p>
            </ThreeWaysBand.Item>
          }
          secondary={
            <>
              <ThreeWaysBand.Item
                kind="store"
                stat="Shifts midday sun past sunset"
                title="2. Store it for the evening"
              >
                <p>
                  A wall-mounted home battery soaks up spare midday generation so dinner, lights
                  and air-con run on your own stored sun after 6 pm.
                </p>
                <p>
                  Add an optional blackout circuit and your fridge and Wi-Fi stay on when the
                  street goes dark.
                </p>
              </ThreeWaysBand.Item>

              <ThreeWaysBand.Item
                kind="export"
                stat={`~${feedInCents}c / kWh credit (illustrative sample)`}
                title="3. Export the surplus"
              >
                <p>
                  Once your home and battery are full, extra power flows out to the South
                  Australian grid for a retailer feed-in credit.
                </p>
                <p>
                  Feed-in tariffs are modest, so we size your system around what your household
                  uses rather than chasing export credits.
                </p>
              </ThreeWaysBand.Item>
            </>
          }
        />
      </ThreeWaysBand>

      {/* 5. Five install steps along a sun arc */}
      <InstallStepsBand>
        <DayOnSolarBand.Header
          eyebrow="Our own CEC-accredited crew"
          heading="From roof check to switch-on"
          lede="Five straight steps, one local team, and a written fixed quote before you commit to a cent."
        />
      </InstallStepsBand>

      {/* 6. Recent installs (job tags) + Service area */}
      <RecentInstallsBand
        installsHeading={
          <div>
            <p className="eyebrow">Recent rooftops</p>
            <h2 className="mt-1.5 text-3xl leading-tight text-ink sm:text-4xl">
              Fresh off our tools
            </h2>
            <p className="mt-2 text-base text-muted">
              A sample of recent residential panel and battery installs across Adelaide, the Hills
              and the Fleurieu.
            </p>
          </div>
        }
        areaHeading={
          <div>
            <p className="eyebrow">Where we work</p>
            <h2 className="mt-1.5 text-3xl text-ink">Across Adelaide &amp; surrounds</h2>
          </div>
        }
        areaBody={
          <p>
            Our own installers travel daily across metro Adelaide, the Adelaide Hills and the
            Fleurieu Peninsula — no sub-contracted mystery vans.
          </p>
        }
      />

      {/* 7. Rebates teaser */}
      <RebatesTeaserBand>
        <p className="eyebrow">Rebates &amp; incentives</p>
        <h2 className="mt-1.5 text-3xl leading-tight text-ink sm:text-4xl">
          Rebates, without the fine-print fog
        </h2>
        <p className="mt-3 text-base text-muted">
          We lodge the paperwork and show the exact point-of-sale discount in your written quote.
        </p>
        <div className="mt-5">
          <SiteLink href="/rebates/" className="button button-quiet">
            Read the rebates FAQ →
          </SiteLink>
        </div>
      </RebatesTeaserBand>

      {/* 8. Closing quote band */}
      <QuoteBand>
        <QuoteBand.Eyebrow>Free roof check &amp; quote</QuoteBand.Eyebrow>
        <QuoteBand.Heading>Ready when the sun is.</QuoteBand.Heading>
        <QuoteBand.Body>
          Tell us your suburb, roof type and a rough quarterly bill. We’ll check your roof and send
          a clear written quote — no obligation, no pushy sales scripts.
        </QuoteBand.Body>
        <QuoteBand.Actions>
          <QuoteBand.Primary>Request a free quote</QuoteBand.Primary>
          <QuoteBand.Secondary href="/packages/">Browse packages</QuoteBand.Secondary>
        </QuoteBand.Actions>
      </QuoteBand>

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: jsonLd(businessStructuredData()) }}
      />
    </>
  );
}
