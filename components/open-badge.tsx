'use client';

import { useEffect, useState } from 'react';
import { openingStatus, phoneOpeningLabel, type OpeningHours } from '../lib/hours';
import { site } from '../lib/site';

/**
 * Browser-only live phone hours badge in Australia/Adelaide (refreshes every minute).
 * Static / no-JS copy stays neutral so prerendered HTML never ships stale open/closed claims.
 */
export function OpenBadge({
  hours,
  tone = 'surface',
}: {
  hours: readonly OpeningHours[];
  tone?: 'surface' | 'footer';
}) {
  const [label, setLabel] = useState('Mon–Fri 8:00 am–5:30 pm · Sat 9:00 am–12:00 pm');
  const [state, setState] = useState<'open' | 'closed' | 'unknown'>('unknown');

  useEffect(() => {
    const update = () => {
      const zone = site.timeZone || 'Australia/Adelaide';
      setLabel(phoneOpeningLabel(hours, zone));
      setState(openingStatus(hours, zone).state);
    };
    update();
    const timer = setInterval(update, 60_000);
    return () => clearInterval(timer);
  }, [hours]);

  const dotColor =
    state === 'open'
      ? 'bg-leaf'
      : state === 'closed'
        ? 'bg-sun'
        : 'bg-muted';

  const pillStyle =
    tone === 'footer'
      ? 'border-footer-line bg-footer-bg text-footer-ink'
      : 'border-ink bg-elevated text-ink';

  return (
    <span
      className={`inline-flex items-center gap-2 rounded-full border-2 px-3 py-1 font-mono text-xs font-semibold ${pillStyle}`}
    >
      <span
        className={`inline-block h-2.5 w-2.5 shrink-0 rounded-full border border-ink ${dotColor}`}
        aria-hidden="true"
      />
      <span>{label}</span>
    </span>
  );
}
