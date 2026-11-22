/** Optional weekly opening-hours model. Time zone stays in site.config.json. */
export const DAYS = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'] as const;
export type Day = typeof DAYS[number];
export interface OpeningHours {
  /** Every weekday occurs exactly once. */
  day: Day;
  /** Inclusive local HH:MM; omit both times for a closed day. */
  opens?: string;
  /** Exclusive local HH:MM; overnight intervals are deliberately unsupported. */
  closes?: string;
}
const clock = /^([01]\d|2[0-3]):[0-5]\d$/;
const minutes = (value: string) => Number(value.slice(0, 2)) * 60 + Number(value.slice(3));

export function validateHours(hours: readonly OpeningHours[]): void {
  for (const day of DAYS) {
    const matches = hours.filter(entry => entry.day === day);
    if (matches.length !== 1) throw new Error(`hours: ${day} must occur exactly once`);
    const { opens, closes } = matches[0];
    if (opens === undefined && closes === undefined) continue;
    if (!opens || !closes || !clock.test(opens) || !clock.test(closes) || minutes(opens) >= minutes(closes)) {
      throw new Error(`hours: ${day} needs HH:MM opening before closing; overnight service is unsupported`);
    }
  }
  if (hours.length !== 7) throw new Error('hours: expected seven weekdays');
}

/** Format 24-hour HH:MM into 12-hour Australian clock e.g. "08:00" -> "8:00 am", "17:30" -> "5:30 pm". */
export function formatTime12(hhmm: string): string {
  const hour24 = Number(hhmm.slice(0, 2));
  const min = hhmm.slice(3, 5);
  const period = hour24 >= 12 ? 'pm' : 'am';
  const hour12 = hour24 % 12 === 0 ? 12 : hour24 % 12;
  return `${hour12}:${min} ${period}`;
}

export interface OpeningStatus {
  state: 'open' | 'closed' | 'unknown';
  until?: string;
  nextDay?: Day | 'today';
  nextOpens?: string;
}

/** Compute structured open/closed state in the business time zone. */
export function openingStatus(hours: readonly OpeningHours[], timeZone: string, now = new Date()): OpeningStatus {
  if (!timeZone) return { state: 'unknown' };
  validateHours(hours);
  let parts: Intl.DateTimeFormatPart[];
  try {
    parts = new Intl.DateTimeFormat('en-US', {
      timeZone,
      weekday: 'long',
      hour: 'numeric',
      minute: 'numeric',
      hourCycle: 'h23',
    }).formatToParts(now);
  } catch {
    return { state: 'unknown' };
  }
  const part = (type: string) => parts.find(entry => entry.type === type)?.value ?? '';
  const index = DAYS.indexOf(part('weekday') as Day);
  if (index < 0) return { state: 'unknown' };
  const current = Number(part('hour')) * 60 + Number(part('minute'));
  const today = hours.find(entry => entry.day === DAYS[index])!;
  if (today.opens && today.closes && current >= minutes(today.opens) && current < minutes(today.closes)) {
    return { state: 'open', until: today.closes };
  }
  for (let offset = 0; offset <= 7; offset++) {
    const day = DAYS[(index + offset) % 7];
    const entry = hours.find(value => value.day === day)!;
    if (entry.opens && (offset > 0 || current < minutes(entry.opens))) {
      return { state: 'closed', nextDay: offset === 0 ? 'today' : day, nextOpens: entry.opens };
    }
  }
  return { state: 'closed' };
}

/** Browser callers supply the clock; build/static views never compute current availability. */
export function openingLabel(hours: readonly OpeningHours[], timeZone: string, now = new Date()): string {
  const status = openingStatus(hours, timeZone, now);
  if (status.state === 'unknown') return 'See opening hours';
  if (status.state === 'open' && status.until) return `Open now · until ${status.until}`;
  if (status.nextDay && status.nextOpens) return `Closed · opens ${status.nextDay} at ${status.nextOpens}`;
  return 'Closed · see opening hours';
}

/** Friendly phone-hours badge copy in 12-hour clock, e.g. "Phones open now · until 5:30 pm". */
export function phoneOpeningLabel(hours: readonly OpeningHours[], timeZone: string, now = new Date()): string {
  const status = openingStatus(hours, timeZone, now);
  if (status.state === 'unknown') return 'See phone hours';
  if (status.state === 'open' && status.until) return `Phones open now · until ${formatTime12(status.until)}`;
  if (status.nextDay && status.nextOpens) {
    return `Phones closed · open ${status.nextDay} ${formatTime12(status.nextOpens)}`;
  }
  return 'Phones closed · see hours';
}
