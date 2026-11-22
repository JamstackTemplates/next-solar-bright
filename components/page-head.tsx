import type { ReactNode } from 'react';
import { PageHeadRooftopArt, SunriseHorizonDivider } from './artwork';

/** Themed inner-page header band: butter surface, Bagel Fat One title at left, cropped roofline art at right. */
export function PageHead({
  eyebrow,
  title,
  children,
  id,
  detail = 'rack',
  meta,
}: {
  eyebrow: string;
  title: ReactNode;
  children?: ReactNode;
  id?: string;
  /** Cropped rooftop illustration detail tailored to each page. */
  detail?: 'rack' | 'dial' | 'certificate' | 'mailbox';
  /** Optional mono metadata pill (e.g. "Last reviewed: 14 November 2026"). */
  meta?: ReactNode;
}) {
  return (
    <>
      <header className="grain-band bg-surface pt-10 pb-6 sm:pt-14 sm:pb-10">
        <div className="wrap relative grid gap-8 md:grid-cols-[1.25fr_0.85fr] md:items-center">
          <div>
            <p className="eyebrow">{eyebrow}</p>
            <h1
              id={id}
              className="mt-2 text-[clamp(2.5rem,5.5vw,4.25rem)] leading-[1.04] text-ink"
            >
              {title}
            </h1>
            {children ? (
              <div className="mt-4 max-w-(--measure) text-lg text-muted">{children}</div>
            ) : null}
            {meta ? <div className="mt-4">{meta}</div> : null}
          </div>

          <div className="hero-art-print-hide flex justify-center md:justify-end">
            <PageHeadRooftopArt detail={detail} />
          </div>
        </div>
      </header>
      <SunriseHorizonDivider variant="rising" topColor="var(--surface)" bottomColor="var(--bg)" />
    </>
  );
}
