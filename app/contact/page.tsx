import type { Metadata } from 'next';
import { InstallPhaseMarker, SunriseHorizonDivider } from '../../components/artwork';
import { CopyEmail } from '../../components/copy-email';
import { SolarIcon } from '../../components/icons';
import { JamstacksSupportForm } from '../../components/jamstacks-support-form';
import { OpenBadge } from '../../components/open-badge';
import { PageHead } from '../../components/page-head';
import { business } from '../../content/business';
import { absoluteUrl } from '../../lib/paths';
import { site } from '../../lib/site';

export const metadata: Metadata = {
  title: 'Get a quote',
  description: business.enquiries.introduction,
  alternates: { canonical: absoluteUrl('/contact/') },
};

const NEXT_STEPS = [
  {
    phase: 1 as const,
    timing: 'Within 1 business day',
    title: 'We read your message and reply',
    detail:
      'A local installer (not a call-centre script) replies by email or phone to clarify anything about your roof or power use.',
  },
  {
    phase: 2 as const,
    timing: '2–4 business days',
    title: 'Roof check by satellite or visit',
    detail:
      'We inspect orientation, shade, roof material and switchboard space so there are no surprises on install day.',
  },
  {
    phase: 3 as const,
    timing: 'Written fixed quote',
    title: 'Clear written quote before you decide',
    detail:
      'You receive an itemised written quote inc GST showing any point-of-sale discounts. Nothing is booked or confirmed until you accept in writing.',
  },
];

export default function ContactPage() {
  const hosted = Boolean(site.jamstacksSite && site.jamstacksEmbedUrl);
  const telHref = `tel:${business.phone.replace(/[^\d+]/g, '')}`;

  return (
    <>
      <PageHead eyebrow="Free quote &amp; roof check" title={business.enquiries.title} detail="mailbox">
        <p>{business.enquiries.introduction}</p>
      </PageHead>

      {/* Main two-column section: Hosted form (or email fallback) on butter panel + Clipboard checklist */}
      <section className="grain-band bg-bg py-10 sm:py-14">
        <div className="wrap grid gap-8 lg:grid-cols-[1.15fr_0.85fr] lg:items-start">
          {/* Left: Form host or unconfigured email fallback */}
          <div className="poster-card bg-surface p-6 sm:p-8" aria-label="Quote enquiry form">
            <div className="flex flex-wrap items-center justify-between gap-2">
              <p className="eyebrow">Send an enquiry</p>
              <span className="rounded-full border border-ink bg-sun px-3 py-0.5 font-mono text-[0.7rem] font-bold uppercase tracking-wider text-[#1F2A44]">
                No call-centre scripts
              </span>
            </div>
            <h2 className="mt-1.5 text-2xl text-ink sm:text-3xl">Tell us about your home</h2>
            <p className="mt-2 text-sm text-muted">
              Quotes, roof checks and install dates are confirmed only when Sunward Solar replies
              in writing.
            </p>

            <div className="mt-6">
              {hosted ? (
                <JamstacksSupportForm
                  siteId={site.jamstacksSite}
                  embedUrl={site.jamstacksEmbedUrl}
                  email={business.email}
                />
              ) : (
                <div className="rounded-xl border-2 border-ink bg-elevated p-6">
                  <h3 className="text-xl text-ink">Email us directly for a quote</h3>
                  <p className="mt-2 text-sm text-muted">
                    The online enquiry form is not connected on this preview. Send your details
                    straight to our inbox and we’ll reply within one business day:
                  </p>
                  <p className="mt-4">
                    <a
                      className="text-link font-mono text-base font-bold wrap-anywhere"
                      href={`mailto:${business.email}`}
                    >
                      {business.email}
                    </a>
                  </p>
                </div>
              )}
            </div>
          </div>

          {/* Right: "What to put in your message" styled as an installer's clipboard */}
          <aside className="clipboard-ruled relative rounded-2xl border-2.5 border-ink bg-elevated p-6 pt-9 shadow-[0_6px_0_var(--ink)] sm:p-7 sm:pt-10">
            {/* Clipboard clip */}
            <div
              className="absolute -top-4 left-1/2 -translate-x-1/2 rounded-full border-2.5 border-ink bg-sun px-5 py-1 font-mono text-xs font-bold uppercase tracking-wider text-[#1F2A44] shadow-[0_2px_0_var(--ink)]"
              aria-hidden="true"
            >
              Roof-check clipboard
            </div>

            <h2 className="text-2xl text-ink">What to put in your message</h2>
            <p className="mt-2 text-sm text-muted">
              A quick rough note is plenty — you don’t need every answer before getting in touch.
            </p>
            <ul className="mt-5 space-y-3">
              {business.enquiries.usefulToInclude.map(tip => (
                <li key={tip} className="flex items-start gap-2.5 text-sm text-ink">
                  <SolarIcon name="check-sun" className="mt-0.5 w-5 h-5 shrink-0 text-ink" />
                  <span>{tip}</span>
                </li>
              ))}
            </ul>

            {/* Always visible email + copy button */}
            <div className="mt-6 border-t-2 border-line pt-5">
              <p className="font-mono text-xs font-bold uppercase tracking-wider text-muted">
                Direct email (always open)
              </p>
              <p className="mt-1.5">
                <a
                  className="text-link font-mono text-base font-bold wrap-anywhere"
                  href={`mailto:${business.email}`}
                >
                  {business.email}
                </a>
              </p>
              <div className="mt-3 flex flex-wrap items-center gap-3">
                <CopyEmail email={business.email} />
              </div>
            </div>
          </aside>
        </div>
      </section>

      {/* Phone, hours, open-now badge & service area band */}
      <section aria-labelledby="direct-details-heading" className="grain-band bg-bg pb-12">
        <div className="wrap">
          <h2 id="direct-details-heading" className="sr-only">
            Phone, hours and Adelaide service area
          </h2>
          <div className="grid gap-6 md:grid-cols-3">
            <div className="poster-card p-6">
              <div className="flex items-center gap-2 font-mono text-xs font-bold uppercase tracking-wider text-accent-ink">
                <SolarIcon name="phone" className="w-4 h-4" />
                <span>Call the Adelaide team</span>
              </div>
              <p className="mt-3">
                <a
                  href={telHref}
                  className="font-display text-3xl text-ink no-underline hover:text-accent-ink hover:underline"
                >
                  {business.phone}
                </a>
              </p>
              <div className="mt-4">
                <OpenBadge hours={business.hours} />
              </div>
            </div>

            <div className="poster-card p-6">
              <div className="flex items-center gap-2 font-mono text-xs font-bold uppercase tracking-wider text-accent-ink">
                <SolarIcon name="clock" className="w-4 h-4" />
                <span>Phone &amp; office hours</span>
              </div>
              <dl className="mt-3 space-y-1.5 font-mono text-sm text-ink">
                <div className="flex justify-between gap-4">
                  <dt className="text-muted">Mon – Fri</dt>
                  <dd className="font-bold">8:00 am – 5:30 pm</dd>
                </div>
                <div className="flex justify-between gap-4">
                  <dt className="text-muted">Saturday</dt>
                  <dd className="font-bold">9:00 am – 12:00 pm</dd>
                </div>
                <div className="flex justify-between gap-4">
                  <dt className="text-muted">Sunday</dt>
                  <dd className="text-muted">Closed</dd>
                </div>
              </dl>
              <p className="mt-3 text-xs text-muted">Adelaide local time (Australia/Adelaide).</p>
            </div>

            <div className="poster-card p-6">
              <div className="flex items-center gap-2 font-mono text-xs font-bold uppercase tracking-wider text-accent-ink">
                <SolarIcon name="map-pin" className="w-4 h-4" />
                <span>Service area</span>
              </div>
              <p className="mt-2 font-semibold text-ink">{business.location.summary}</p>
              <p className="mt-1 text-xs text-muted">{business.location.appointmentNote}</p>
              <ul className="mt-3 space-y-1 text-sm text-muted">
                {business.serviceArea.map(area => (
                  <li key={area.id}>
                    <strong className="text-ink">{area.region}:</strong> {area.places}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      <SunriseHorizonDivider variant="rising" topColor="var(--bg)" bottomColor="var(--surface)" />

      {/* What happens next: 3 sun-phase steps */}
      <section aria-labelledby="next-steps-heading" className="grain-band bg-surface py-14 sm:py-18">
        <div className="wrap">
          <p className="eyebrow">After you send a message</p>
          <h2 id="next-steps-heading" className="mt-1.5 text-3xl text-ink sm:text-4xl">
            What happens next
          </h2>

          <ol className="mt-8 grid gap-6 md:grid-cols-3">
            {NEXT_STEPS.map(step => (
              <li key={step.title} className="poster-card flex flex-col gap-3 p-6">
                <div className="flex items-center justify-between gap-3">
                  <InstallPhaseMarker step={step.phase} className="w-12 h-12" />
                  <span className="font-mono text-xs font-bold uppercase tracking-wider text-accent-ink">
                    {step.timing}
                  </span>
                </div>
                <h3 className="text-2xl text-ink">{step.title}</h3>
                <p className="text-sm text-muted">{step.detail}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <SunriseHorizonDivider variant="rising" topColor="var(--surface)" bottomColor="var(--bg)" />
    </>
  );
}
