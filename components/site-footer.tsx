import { business } from '../content/business';
import { SunriseHorizonDivider, WordmarkSun } from './artwork';
import { SolarIcon } from './icons';
import { OpenBadge } from './open-badge';
import { SiteLink } from './site-link';

export function SiteFooter() {
  const telHref = `tel:${business.phone.replace(/[^\d+]/g, '')}`;

  return (
    <footer className="mt-0">
      <SunriseHorizonDivider
        variant="setting"
        topColor="var(--bg)"
        bottomColor="var(--footer-bg)"
      />

      <div className="bg-footer-bg text-footer-ink pt-10 pb-8">
        <div className="wrap grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
          {/* Column 1: Brand + Navigation */}
          <div>
            <SiteLink
              href="/"
              className="inline-flex items-center gap-2.5 text-footer-ink no-underline hover:no-underline"
            >
              <WordmarkSun className="w-9 h-6 text-footer-accent" />
              <span className="font-display text-2xl">{business.name}</span>
            </SiteLink>
            <nav aria-label="Footer" className="mt-4 flex flex-col gap-2 text-sm">
              <SiteLink href="/" className="text-footer-muted hover:text-footer-accent">
                Home
              </SiteLink>
              <SiteLink href="/packages/" className="text-footer-muted hover:text-footer-accent">
                Packages
              </SiteLink>
              <SiteLink href="/savings/" className="text-footer-muted hover:text-footer-accent">
                Savings
              </SiteLink>
              <SiteLink href="/rebates/" className="text-footer-muted hover:text-footer-accent">
                Rebates FAQ
              </SiteLink>
              <SiteLink href="/contact/" className="text-footer-muted hover:text-footer-accent">
                Get a quote
              </SiteLink>
            </nav>
          </div>

          {/* Column 2: Contact (always visible email & phone) */}
          <div>
            <h2 className="font-mono text-xs font-bold uppercase tracking-widest text-footer-accent">
              Contact
            </h2>
            <ul className="mt-4 space-y-3 text-sm">
              <li>
                <a
                  href={`mailto:${business.email}`}
                  className="inline-flex items-center gap-2 font-mono text-footer-ink underline hover:text-footer-accent"
                >
                  <SolarIcon name="mail" className="w-4 h-4 text-footer-accent" />
                  <span className="wrap-anywhere">{business.email}</span>
                </a>
              </li>
              <li>
                <a
                  href={telHref}
                  className="inline-flex items-center gap-2 font-mono text-footer-ink hover:text-footer-accent"
                >
                  <SolarIcon name="phone" className="w-4 h-4 text-footer-accent" />
                  <span>{business.phone}</span>
                </a>
              </li>
              <li className="text-footer-muted">
                {business.location.summary}. {business.location.appointmentNote}
              </li>
            </ul>
          </div>

          {/* Column 3: Phone & office hours + OpenBadge */}
          <div>
            <h2 className="font-mono text-xs font-bold uppercase tracking-widest text-footer-accent">
              Phone hours (Adelaide)
            </h2>
            <dl className="mt-4 space-y-1.5 font-mono text-xs text-footer-muted">
              <div className="flex justify-between gap-4">
                <dt>Mon – Fri</dt>
                <dd className="text-footer-ink">8:00 am – 5:30 pm</dd>
              </div>
              <div className="flex justify-between gap-4">
                <dt>Saturday</dt>
                <dd className="text-footer-ink">9:00 am – 12:00 pm</dd>
              </div>
              <div className="flex justify-between gap-4">
                <dt>Sunday</dt>
                <dd className="text-footer-ink">Closed</dd>
              </div>
            </dl>
            <div className="mt-4">
              <OpenBadge hours={business.hours} tone="footer" />
            </div>
          </div>

          {/* Column 4: Service Area */}
          <div>
            <h2 className="font-mono text-xs font-bold uppercase tracking-widest text-footer-accent">
              Service area
            </h2>
            <ul className="mt-4 space-y-2.5 text-sm">
              {business.serviceArea.map(area => (
                <li key={area.id} className="flex items-start gap-2">
                  <SolarIcon name="map-pin" className="mt-0.5 w-4 h-4 shrink-0 text-footer-accent" />
                  <div>
                    <span className="font-semibold text-footer-ink">{area.region}</span>
                    <span className="block text-xs text-footer-muted">{area.places}</span>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Panel-grid decorative strip */}
        <div className="wrap mt-10">
          <div className="w-full overflow-hidden rounded-xl border-2 border-footer-line bg-panel no-print" aria-hidden="true">
            <svg viewBox="0 0 1200 28" preserveAspectRatio="none" className="block h-6 w-full">
              <rect width="1200" height="28" fill="#24407A" />
              <line x1="0" y1="14" x2="1200" y2="14" stroke="#8FD0F0" strokeWidth="1.2" opacity="0.4" />
              {Array.from({ length: 24 }, (_, i) => (
                <line
                  key={i}
                  x1={(i + 1) * 50}
                  y1="0"
                  x2={(i + 1) * 50}
                  y2="28"
                  stroke="#8FD0F0"
                  strokeWidth="1.2"
                  opacity="0.4"
                />
              ))}
              <path d="M160 0 L190 28 M185 0 L215 28 M760 0 L790 28 M785 0 L815 28" stroke="#FFFFFF" strokeWidth="6" opacity="0.14" />
            </svg>
          </div>

          <div className="mt-6 flex flex-wrap items-center justify-between gap-4 border-t border-footer-line pt-5 text-xs text-footer-muted">
            <p className="max-w-2xl">{business.sampleNotice}</p>
            <span title="Made with love by jamstacks.net">
              with{' '}
              <span role="img" aria-label="love">
                ❤️
              </span>{' '}
              <a
                className="text-footer-ink no-underline hover:text-footer-accent hover:underline"
                href="https://jamstacks.net"
              >
                jamstacks.net
              </a>
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}
