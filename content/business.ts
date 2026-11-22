import type { OpeningHours } from '../lib/hours.ts';

export interface ServiceAreaRegion {
  /** URL-safe unique identifier. */
  id: string;
  /** Regional group heading, e.g. Adelaide Hills. */
  region: string;
  /** Representative suburbs or boundary notes. */
  places: string;
}

export interface Business {
  /** Public display name; also update site.config.json's name when renaming. */
  name: string;
  /** Short headline for the home page. */
  tagline: string;
  /** Plain-text introduction used by fallback metadata and schema.org description. */
  introduction: string;
  /** Public contact address, never a private notification destination. */
  email: string;
  /** Public phone number in display format. */
  phone: string;
  /** Placeholder office/base information (by appointment only; not a walk-in showroom). */
  location: {
    summary: string;
    appointmentNote: string;
    landmark: string;
    locality: string;
    region: string;
    postalCode: string;
    country: string;
  };
  /** Areas covered by Sunward Solar's own CEC-accredited install crew. */
  serviceArea: ServiceAreaRegion[];
  /** Weekly phone and office hours in Australia/Adelaide (same-day intervals only). */
  hours: OpeningHours[];
  /** Contact copy; the hosted form supports name, email and message only. */
  enquiries: {
    /** Contact page heading. */
    title: string;
    /** No booking, payment, install-date or rebate promises. */
    introduction: string;
    /** Suggestions for the message, not additional form inputs. */
    usefulToInclude: string[];
  };
  /** Gallery sample disclaimer displayed in footer fine print. */
  sampleNotice: string;
}

export const business: Business = {
  name: 'Sunward Solar',
  tagline: 'Let the sun pay the power bill.',
  introduction:
    'Sunward Solar installs fixed-price solar panel and home battery packages across Adelaide. See what solar could save you, how rebates work, and request a free quote.',
  email: 'hello@sunwardsolar.example',
  phone: '(08) 5550 2146',
  location: {
    summary: 'Based in Adelaide CBD, we come to you',
    appointmentNote: 'By appointment only — no walk-in showroom.',
    landmark: 'Victoria Square / Tarntanyangga, Adelaide SA 5000',
    locality: 'Adelaide',
    region: 'SA',
    postalCode: '5000',
    country: 'AU',
  },
  serviceArea: [
    {
      id: 'adelaide-metro',
      region: 'Adelaide Metro',
      places: 'North to Gawler, south to Sellicks Beach',
    },
    {
      id: 'adelaide-hills',
      region: 'Adelaide Hills',
      places: 'Stirling, Hahndorf, Mount Barker',
    },
    {
      id: 'fleurieu-peninsula',
      region: 'Fleurieu Peninsula',
      places: 'McLaren Vale, Victor Harbor, Goolwa',
    },
  ],
  hours: [
    { day: 'Monday', opens: '08:00', closes: '17:30' },
    { day: 'Tuesday', opens: '08:00', closes: '17:30' },
    { day: 'Wednesday', opens: '08:00', closes: '17:30' },
    { day: 'Thursday', opens: '08:00', closes: '17:30' },
    { day: 'Friday', opens: '08:00', closes: '17:30' },
    { day: 'Saturday', opens: '09:00', closes: '12:00' },
    { day: 'Sunday' },
  ],
  enquiries: {
    title: 'Ask for a free quote',
    introduction:
      'Send through a few details about your roof and bills. We reply within one business day, and every price, rebate figure and install date is confirmed in writing after a roof check.',
    usefulToInclude: [
      'Your suburb',
      'Roof type (tile or tin) and number of storeys',
      'A recent quarterly electricity bill amount',
      'Whether you already have solar panels',
      'The package you are interested in',
      'Any EV charger, pool pump or blackout backup needs',
    ],
  },
  sampleNotice:
    'Sample business for the Jamstacks gallery — all names, prices, accreditation claims and contact details are fictitious.',
};
