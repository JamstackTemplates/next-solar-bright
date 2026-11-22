import type { ReactNode } from 'react';
import { business } from '../content/business';
import { SolarIcon } from './icons';
import { OpenBadge } from './open-badge';
import { SiteLink } from './site-link';

type ContentProps = { children: ReactNode };

function QuoteBandSection({ children }: ContentProps) {
  const telHref = `tel:${business.phone.replace(/[^\d+]/g, '')}`;

  return (
    <section className="grain-band bg-bg py-14 sm:py-20">
      <div className="wrap">
        <div className="poster-card relative overflow-hidden bg-surface p-7 sm:p-10 md:flex md:items-center md:justify-between md:gap-8">
          <div className="max-w-xl">{children}</div>

          <div className="mt-6 flex flex-col items-start gap-3 md:mt-0 md:items-end">
            {business.phone && (
              <a
                href={telHref}
                className="inline-flex items-center gap-2 font-mono text-lg font-bold text-ink no-underline hover:text-accent-ink hover:underline"
              >
                <SolarIcon name="phone" className="w-5 h-5 text-accent-ink" />
                <span>{business.phone}</span>
              </a>
            )}
            <OpenBadge hours={business.hours} />
            <p className="font-mono text-xs text-muted">
              Or email{' '}
              <a href={`mailto:${business.email}`} className="text-link">
                {business.email}
              </a>
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

function Eyebrow({ children }: ContentProps) {
  return <p className="eyebrow">{children}</p>;
}

function Heading({ children }: ContentProps) {
  return <h2 className="mt-2 text-3xl leading-tight text-ink sm:text-5xl">{children}</h2>;
}

function Body({ children }: ContentProps) {
  return <p className="mt-3 text-base text-muted sm:text-lg">{children}</p>;
}

function Actions({ children }: ContentProps) {
  return <div className="mt-6 flex flex-wrap items-center gap-4">{children}</div>;
}

function Primary({ children }: ContentProps) {
  return (
    <SiteLink href="/contact/" className="button">
      {children}
    </SiteLink>
  );
}

function Secondary({ href, children }: { href: string; children: ReactNode }) {
  return (
    <SiteLink href={href} className="text-link">
      {children}
    </SiteLink>
  );
}

export const QuoteBand = Object.assign(QuoteBandSection, {
  Eyebrow,
  Heading,
  Body,
  Actions,
  Primary,
  Secondary,
});
