import assert from 'node:assert/strict';
import { test } from 'node:test';
import { business } from '../content/business.ts';
import { DAYS, openingLabel, phoneOpeningLabel, validateHours, type OpeningHours } from '../lib/hours.ts';

const hours: OpeningHours[] = DAYS.map(day => (day === 'Monday' ? { day } : { day, opens: '09:00', closes: '17:00' }));
const at = (date: string, zone = 'America/New_York') => openingLabel(hours, zone, new Date(date));

test('opening inclusive, closing exclusive; business zone wins over visitor zone', () => {
  assert.equal(at('2026-11-17T13:59:00Z'), 'Closed · opens today at 09:00');
  assert.equal(at('2026-11-17T14:00:00Z'), 'Open now · until 17:00');
  assert.equal(at('2026-11-17T22:00:00Z'), 'Closed · opens Wednesday at 09:00');
  assert.equal(at('2026-11-17T14:00:00Z', 'Asia/Tokyo'), 'Closed · opens Wednesday at 09:00');
});

test('closed weekdays and week wrap find the next service', () => {
  assert.equal(at('2026-11-16T18:00:00Z'), 'Closed · opens Tuesday at 09:00');
  assert.equal(at('2026-11-15T23:00:00Z'), 'Closed · opens Tuesday at 09:00');
  assert.equal(openingLabel(DAYS.map(day => ({ day })), 'UTC'), 'Closed · see opening hours');
});

test('missing/invalid zones stay neutral and DST changes preserve local service times', () => {
  assert.equal(at('2026-11-17T14:00:00Z', ''), 'See opening hours');
  assert.equal(at('2026-11-17T14:00:00Z', 'Mars/Base'), 'See opening hours');
  assert.equal(at('2026-03-08T12:59:00Z'), 'Closed · opens today at 09:00');
  assert.equal(at('2026-03-08T13:00:00Z'), 'Open now · until 17:00');
  assert.equal(at('2026-11-01T13:59:00Z'), 'Closed · opens today at 09:00');
  assert.equal(at('2026-11-01T14:00:00Z'), 'Open now · until 17:00');
});

test('invalid/incomplete/overnight intervals name the weekday to fix', () => {
  assert.doesNotThrow(() => validateHours(hours));
  for (const opens of ['24:00', '9:00', '18:00']) {
    assert.throws(() => validateHours(hours.map(x => (x.day === 'Tuesday' ? { ...x, opens } : x))), /Tuesday/);
  }
  assert.throws(() => validateHours(hours.slice(1)), /Monday/);
  assert.throws(() => validateHours(hours.map(x => (x.day === 'Tuesday' ? { ...x, closes: undefined } : x))), /Tuesday/);
});

const adelaide = (isoUtc: string) => phoneOpeningLabel(business.hours, 'Australia/Adelaide', new Date(isoUtc));

test('Sunward Solar Australia/Adelaide phone hours: Friday, Saturday and Sunday boundaries', () => {
  // Winter ACST (UTC+9:30): Friday 2026-07-10
  // 17:29 ACST = 07:59 UTC; 17:30 ACST = 08:00 UTC
  assert.equal(adelaide('2026-07-10T07:59:00Z'), 'Phones open now · until 5:30 pm');
  assert.equal(adelaide('2026-07-10T08:00:00Z'), 'Phones closed · open Saturday 9:00 am');

  // Saturday 2026-07-11 (UTC+9:30): 11:59 ACST = 02:29 UTC; 12:00 ACST = 02:30 UTC
  assert.equal(adelaide('2026-07-11T02:29:00Z'), 'Phones open now · until 12:00 pm');
  assert.equal(adelaide('2026-07-11T02:30:00Z'), 'Phones closed · open Monday 8:00 am');

  // Sunday 2026-07-12 closed all day (00:30 ACST and 14:00 ACST)
  assert.equal(adelaide('2026-07-11T15:00:00Z'), 'Phones closed · open Monday 8:00 am');
  assert.equal(adelaide('2026-07-12T04:30:00Z'), 'Phones closed · open Monday 8:00 am');
});

test('Australia/Adelaide DST transitions (first Sunday in April & October) with half-hour offset', () => {
  // First Sunday in April 2026 is 2026-04-05 (ACDT UTC+10:30 -> ACST UTC+9:30)
  // Saturday 2026-04-04 is still ACDT (+10:30): 11:59 ACDT = 01:29 UTC, 12:00 ACDT = 01:30 UTC
  assert.equal(adelaide('2026-04-04T01:29:00Z'), 'Phones open now · until 12:00 pm');
  assert.equal(adelaide('2026-04-04T01:30:00Z'), 'Phones closed · open Monday 8:00 am');

  // Monday 2026-04-06 is now ACST (+9:30): 07:59 ACST = 2026-04-05T22:29Z, 08:00 ACST = 2026-04-05T22:30Z
  assert.equal(adelaide('2026-04-05T22:29:00Z'), 'Phones closed · open today 8:00 am');
  assert.equal(adelaide('2026-04-05T22:30:00Z'), 'Phones open now · until 5:30 pm');

  // First Sunday in October 2026 is 2026-10-04 (ACST UTC+9:30 -> ACDT UTC+10:30)
  // Saturday 2026-10-03 is still ACST (+9:30): 11:59 ACST = 02:29 UTC, 12:00 ACST = 02:30 UTC
  assert.equal(adelaide('2026-10-03T02:29:00Z'), 'Phones open now · until 12:00 pm');
  assert.equal(adelaide('2026-10-03T02:30:00Z'), 'Phones closed · open Monday 8:00 am');

  // Monday 2026-10-05 is now ACDT (+10:30): 07:59 ACDT = 2026-10-04T21:29Z, 08:00 ACDT = 2026-10-04T21:30Z
  assert.equal(adelaide('2026-10-04T21:29:00Z'), 'Phones closed · open today 8:00 am');
  assert.equal(adelaide('2026-10-04T21:30:00Z'), 'Phones open now · until 5:30 pm');
});
