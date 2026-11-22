'use client';

import { useEffect, useState } from 'react';
import { DarkModeToggle } from 'jamstacks';
import { business } from '../content/business';
import { WordmarkSun } from './artwork';
import { SolarIcon } from './icons';
import { SiteLink } from './site-link';

const NAV_ITEMS = [
  { href: '/packages/', label: 'Packages' },
  { href: '/savings/', label: 'Savings' },
  { href: '/rebates/', label: 'Rebates' },
] as const;

export function SiteHeader() {
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    if (!menuOpen) return;
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setMenuOpen(false);
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [menuOpen]);

  const telHref = `tel:${business.phone.replace(/[^\d+]/g, '')}`;

  return (
    <header className="sticky top-0 z-50 border-b-2 border-ink bg-bg/95 backdrop-blur-xs">
      {/* Top Adelaide solar accreditation & zone strip */}
      <div className="border-b border-line bg-surface/85 py-1 text-[0.72rem] font-mono text-ink no-print">
        <div className="wrap flex flex-wrap items-center justify-between gap-2">
          <div className="flex items-center gap-2 font-bold uppercase tracking-wider">
            <span className="inline-block h-2 w-2 rounded-full border border-ink bg-sun" aria-hidden="true" />
            <span>CEC-accredited Adelaide crew</span>
            <span className="hidden text-muted sm:inline">· STC Zone 3 · Fixed written quotes</span>
          </div>
          <div className="flex items-center gap-3 font-semibold text-muted">
            <span className="scene-day-only">☀ Morning sun palette</span>
            <span className="scene-dusk-only">☾ Evening on battery palette</span>
          </div>
        </div>
      </div>

      <div className="wrap flex min-h-19 items-center justify-between gap-3 py-2">
        {/* Wordmark with rising half-sun */}
        <SiteLink
          href="/"
          className="group flex shrink-0 items-center gap-2 no-underline hover:no-underline"
          onClick={() => setMenuOpen(false)}
        >
          <WordmarkSun className="w-9 h-6 text-ink transition-transform group-hover:-translate-y-0.5 sm:w-10 sm:h-7" />
          <span className="font-display text-xl leading-none whitespace-nowrap text-ink sm:text-[1.7rem]">
            {business.name}
          </span>
        </SiteLink>

        {/* Desktop navigation */}
        <nav aria-label="Main" className="hidden items-center gap-6 md:flex">
          {NAV_ITEMS.map(item => (
            <SiteLink key={item.href} href={item.href} markCurrent="page" className="nav-link">
              {item.label}
            </SiteLink>
          ))}
        </nav>

        {/* Right utilities + primary CTA */}
        <div className="flex items-center gap-2.5 sm:gap-3">
          {business.phone && (
            <a
              href={telHref}
              className="hidden items-center gap-1.5 font-mono text-sm font-bold text-ink no-underline hover:text-accent-ink hover:underline lg:inline-flex"
            >
              <SolarIcon name="phone" className="w-4 h-4 text-accent-ink" />
              <span>{business.phone}</span>
            </a>
          )}

          <div className="hidden sm:block">
            <DarkModeToggle />
          </div>

          <SiteLink href="/contact/" className="button whitespace-nowrap px-3.5 py-2 text-xs sm:px-5 sm:text-base">
            Get a quote
          </SiteLink>

          {/* Mobile disclosure button */}
          <button
            type="button"
            className="inline-flex min-h-11 min-w-11 items-center justify-center rounded-full border-2 border-ink bg-surface text-ink md:hidden"
            aria-expanded={menuOpen}
            aria-controls="mobile-nav-panel"
            aria-label={menuOpen ? 'Close navigation menu' : 'Open navigation menu'}
            onClick={() => setMenuOpen(open => !open)}
          >
            <SolarIcon name={menuOpen ? 'close' : 'menu'} className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Mobile disclosure menu */}
      <div
        id="mobile-nav-panel"
        hidden={!menuOpen}
        className="border-t-2 border-ink bg-surface md:hidden"
      >
        <nav aria-label="Mobile" className="wrap flex flex-col gap-2 py-4">
          {NAV_ITEMS.map(item => (
            <SiteLink
              key={item.href}
              href={item.href}
              markCurrent="page"
              onClick={() => setMenuOpen(false)}
              className="rounded-xl border-2 border-transparent px-3 py-2.5 text-lg font-semibold text-ink hover:border-ink hover:bg-bg hover:no-underline"
            >
              {item.label}
            </SiteLink>
          ))}
          <div className="mt-2 flex flex-wrap items-center justify-between gap-3 border-t border-line pt-3">
            {business.phone && (
              <a
                href={telHref}
                className="inline-flex items-center gap-2 font-mono text-sm font-bold text-ink"
              >
                <SolarIcon name="phone" className="w-4 h-4 text-accent-ink" />
                <span>{business.phone}</span>
              </a>
            )}
            <DarkModeToggle />
          </div>
        </nav>
      </div>
    </header>
  );
}
