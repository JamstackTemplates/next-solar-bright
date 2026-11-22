import type { Metadata } from 'next';
import { CertificateStampArt } from '../../components/artwork';
import { SolarIcon, type SolarIconName } from '../../components/icons';
import { PageHead } from '../../components/page-head';
import { QuoteBand } from '../../components/quote-band';
import { formatReviewDate, rebates } from '../../content/rebates';
import { absoluteUrl } from '../../lib/paths';
import { faqStructuredData, jsonLd } from '../../lib/structured-data';

export const metadata: Metadata = {
  title: 'Rebates & incentives FAQ',
  description:
    'Plain-English answers on the federal STC solar discount, home battery discounts, South Australian feed-in tariffs, export limits and paperwork.',
  alternates: { canonical: absoluteUrl('/rebates/') },
};

const CATEGORY_ICONS: Record<string, SolarIconName> = {
  certificates: 'check-sun',
  batteries: 'battery',
  bills: 'inverter',
  paperwork: 'mail',
};

export default function RebatesPage() {
  const reviewedLabel = formatReviewDate(rebates.lastReviewed);

  return (
    <>
      <PageHead
        eyebrow="Rebates &amp; incentives"
        title="Rebates, plainly explained"
        detail="certificate"
        meta={
          <span className="inline-flex items-center gap-2 rounded-full border-2 border-ink bg-elevated px-3.5 py-1 font-mono text-xs font-bold text-ink">
            <SolarIcon name="clock" className="w-4 h-4 text-accent-ink" />
            <span>Last reviewed: {reviewedLabel}</span>
          </span>
        }
      >
        <p>
          Incentive rules shift over time, so we explain how each scheme works in general and show
          the exact discount applied on the day in your written quote.
        </p>
      </PageHead>

      {/* 3-step visual summary of how point-of-sale discounts work */}
      <section aria-label="How point-of-sale solar discounts work" className="grain-band bg-bg pt-8 pb-2">
        <div className="wrap">
          <div className="grid gap-4 md:grid-cols-3">
            <div className="poster-card bg-surface p-5">
              <span className="inline-block rounded-full border border-ink bg-sun px-2.5 py-0.5 font-mono text-xs font-bold uppercase tracking-wider text-[#1F2A44]">
                Step 01 · Eligibility check
              </span>
              <h2 className="mt-2.5 text-xl text-ink">Sized for Adelaide STC Zone 3</h2>
              <p className="mt-1.5 text-sm text-muted">
                We verify approved panels, inverter and battery eligibility for your roof before preparing your quote.
              </p>
            </div>
            <div className="poster-card bg-surface p-5">
              <span className="inline-block rounded-full border border-ink bg-sun px-2.5 py-0.5 font-mono text-xs font-bold uppercase tracking-wider text-[#1F2A44]">
                Step 02 · Paperwork lodged
              </span>
              <h2 className="mt-2.5 text-xl text-ink">We handle the certificates</h2>
              <p className="mt-1.5 text-sm text-muted">
                Our CEC-accredited team lodges the certificate creation and compliance forms directly on your behalf.
              </p>
            </div>
            <div className="poster-card bg-surface p-5">
              <span className="inline-block rounded-full border border-ink bg-sun px-2.5 py-0.5 font-mono text-xs font-bold uppercase tracking-wider text-[#1F2A44]">
                Step 03 · Point-of-sale deduction
              </span>
              <h2 className="mt-2.5 text-xl text-ink">Taken straight off the price</h2>
              <p className="mt-1.5 text-sm text-muted">
                You never wait months for a government cheque — the exact discount is deducted upfront on your written quote.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Category jump bar */}
      <nav aria-label="Rebate FAQ categories" className="bg-bg pt-6 pb-4 no-print">
        <div className="wrap">
          <div className="rail-tablist">
            {rebates.categories.map(category => (
              <a
                key={category.id}
                href={`#${category.id}`}
                className="rail-tab no-underline hover:no-underline"
              >
                <SolarIcon
                  name={CATEGORY_ICONS[category.id] ?? 'check-sun'}
                  className="w-4 h-4 text-accent-ink"
                />
                <span>{category.title}</span>
              </a>
            ))}
          </div>
        </div>
      </nav>

      {/* Grouped FAQ sections: sticky category column at left, folded certificate slips at right */}
      <div className="grain-band bg-bg py-8 sm:py-12">
        <div className="wrap space-y-16">
          {rebates.categories.map(category => {
            const categoryFaqs = rebates.faqs.filter(faq => faq.categoryId === category.id);
            return (
              <section
                key={category.id}
                id={category.id}
                aria-labelledby={`heading-${category.id}`}
                className="grid gap-6 border-t-2 border-line pt-10 first:border-t-0 first:pt-0 lg:grid-cols-[0.72fr_1.28fr] lg:items-start lg:gap-10"
              >
                <div className="lg:sticky lg:top-24">
                  <span className="inline-flex h-12 w-12 items-center justify-center rounded-2xl border-2 border-ink bg-sun text-[#1F2A44]">
                    <SolarIcon name={CATEGORY_ICONS[category.id] ?? 'check-sun'} className="w-6 h-6" />
                  </span>
                  <h2
                    id={`heading-${category.id}`}
                    className="mt-4 text-3xl leading-tight text-ink sm:text-4xl"
                  >
                    {category.title}
                  </h2>
                  <p className="mt-2 text-base text-muted">{category.blurb}</p>
                </div>

                <div className="space-y-4">
                  {categoryFaqs.map((faq, idx) => (
                    <details
                      key={faq.id}
                      id={faq.id}
                      open={idx === 0}
                      className="faq-slip"
                    >
                      <summary>{faq.question}</summary>
                      <div className="faq-slip-body space-y-2.5 text-base">
                        {faq.answer.map(paragraph => (
                          <p key={paragraph}>{paragraph}</p>
                        ))}
                      </div>
                    </details>
                  ))}
                </div>
              </section>
            );
          })}
        </div>
      </div>

      {/* Check the current rules boxed note */}
      <section aria-labelledby="rules-heading" className="grain-band bg-bg py-6">
        <div className="wrap">
          <div className="poster-card bg-surface p-6 sm:p-8 flex flex-col gap-6 sm:flex-row sm:items-center">
            <CertificateStampArt className="w-28 h-28 shrink-0" />
            <div>
              <p className="font-mono text-xs font-bold uppercase tracking-wider text-accent-ink">
                Check the current rules
              </p>
              <h2 id="rules-heading" className="mt-1 text-2xl text-ink sm:text-3xl">
                Always confirmed on the day we quote
              </h2>
              <p className="mt-2 max-w-2xl text-sm text-muted sm:text-base">
                Certificate values and battery eligibility rules can change without notice. You can
                check current federal guidelines directly at the{' '}
                <a
                  href={rebates.officialSource.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-link"
                >
                  {rebates.officialSource.name}
                </a>
                . Every written quote from Sunward Solar sets out the exact discount applied before
                you agree to proceed.
              </p>
            </div>
          </div>
        </div>
      </section>

      <QuoteBand>
        <QuoteBand.Eyebrow>Exact figures in writing</QuoteBand.Eyebrow>
        <QuoteBand.Heading>Want your exact net price after discounts?</QuoteBand.Heading>
        <QuoteBand.Body>
          Request a free quote and we’ll check eligibility for your roof and show every upfront
          discount line by line.
        </QuoteBand.Body>
        <QuoteBand.Actions>
          <QuoteBand.Primary>Request a free quote</QuoteBand.Primary>
          <QuoteBand.Secondary href="/packages/">Compare packages</QuoteBand.Secondary>
        </QuoteBand.Actions>
      </QuoteBand>

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: jsonLd(faqStructuredData()) }}
      />
    </>
  );
}
