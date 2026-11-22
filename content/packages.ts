export type PackageKind = 'panels' | 'battery' | 'bundle';
export type PackageAvailability = 'available' | 'limited' | 'unavailable';

export interface SolarPackage {
  /** Stable, URL-safe unique identifier (used by installs, filters and schema). */
  id: string;
  /** Display name shown on plates, comparison table and estimator. */
  name: string;
  /** Package category used by the Packages filter tabs and validation rules. */
  kind: PackageKind;
  /** Total solar array size in kW (0 for battery-only packages). */
  systemKw: number;
  /** Number of solar panels (0 for battery-only packages). */
  panelCount: number;
  /** Rated wattage per panel (0 for battery-only packages). */
  panelWatts: number;
  /** Usable home battery capacity in kWh (0 for panels-only packages). */
  batteryKwh: number;
  /** Inverter specification shown on the spec plate and table. */
  inverter: string;
  /** "From" price in whole AUD, inc GST, after the federal STC point-of-sale discount. */
  fromPriceAud: number;
  /** One-line summary of which homes this package suits best. */
  bestFor: string;
  /** Included hardware, paperwork and workmanship items. */
  includes: string[];
  /** Current stock/scheduling status. */
  availability: PackageAvailability;
  /** Optional short note shown when availability is limited or unavailable. */
  availabilityNote?: string;
  /** Exactly three available/limited packages are featured on the Home page. */
  featured: boolean;
}

export interface PackageAddOn {
  /** Stable, URL-safe unique identifier. */
  id: string;
  /** Add-on name displayed on the hardware shelf. */
  name: string;
  /** "From" price in whole AUD, inc GST. */
  priceAud: number;
  /** Short plain-English explanation. */
  note: string;
}

const SOLAR_INCLUDES = [
  'Tier-one solar panels',
  'Roof assessment',
  'Mounting for tin or tile roofs',
  'App to monitor generation',
  'Grid-connection paperwork',
  '10-year workmanship warranty',
];

const BATTERY_EXTRAS = [
  'Battery commissioning',
  '10-year battery warranty',
];

export const packages: SolarPackage[] = [
  {
    id: 'sunrise-6-6',
    name: 'Sunrise 6.6',
    kind: 'panels',
    systemKw: 6.6,
    panelCount: 15,
    panelWatts: 440,
    batteryKwh: 0,
    inverter: '5 kW string',
    fromPriceAud: 5490,
    bestFor: '1–3 person homes, home during the day',
    includes: [...SOLAR_INCLUDES],
    availability: 'available',
    featured: true,
  },
  {
    id: 'midday-10',
    name: 'Midday 10',
    kind: 'panels',
    systemKw: 10.12,
    panelCount: 23,
    panelWatts: 440,
    batteryKwh: 0,
    inverter: '8 kW battery-ready hybrid',
    fromPriceAud: 8290,
    bestFor: 'Families, pool pump, EV later',
    includes: [...SOLAR_INCLUDES],
    availability: 'available',
    featured: false,
  },
  {
    id: 'golden-hour',
    name: 'Golden Hour',
    kind: 'bundle',
    systemKw: 6.6,
    panelCount: 15,
    panelWatts: 440,
    batteryKwh: 10,
    inverter: '5 kW hybrid',
    fromPriceAud: 13900,
    bestFor: 'Most homes: daytime sun, evening power',
    includes: [...SOLAR_INCLUDES, ...BATTERY_EXTRAS],
    availability: 'available',
    featured: true,
  },
  {
    id: 'long-evening',
    name: 'Long Evening',
    kind: 'bundle',
    systemKw: 10.12,
    panelCount: 23,
    panelWatts: 440,
    batteryKwh: 13.5,
    inverter: '8 kW hybrid + backup circuit',
    fromPriceAud: 18750,
    bestFor: 'Big evening use, blackout backup',
    includes: [...SOLAR_INCLUDES, ...BATTERY_EXTRAS],
    availability: 'available',
    featured: true,
  },
  {
    id: 'nightlight',
    name: 'Nightlight',
    kind: 'battery',
    systemKw: 0,
    panelCount: 0,
    panelWatts: 0,
    batteryKwh: 10,
    inverter: 'AC-coupled battery inverter',
    fromPriceAud: 7950,
    bestFor: 'Homes that already have solar',
    includes: [
      'Existing solar and switchboard check',
      'Wall or floor mounting',
      'App to monitor battery charge',
      'Grid-connection paperwork',
      '10-year workmanship warranty',
      ...BATTERY_EXTRAS,
    ],
    availability: 'limited',
    availabilityNote: 'Limited stock: installs from next month',
    featured: false,
  },
];

export const addOns: PackageAddOn[] = [
  {
    id: 'ev-charger',
    name: '7 kW EV charger',
    priceAud: 1690,
    note: 'Solar-aware wall charger to top up your car from spare daytime sun.',
  },
  {
    id: 'bird-mesh',
    name: 'Bird-proofing mesh',
    priceAud: 590,
    note: 'Powder-coated steel mesh around the array perimeter to keep pigeons and leaves out.',
  },
  {
    id: 'backup-circuit',
    name: 'Blackout backup circuit',
    priceAud: 890,
    note: 'Dedicated essential circuit for fridge, Wi-Fi and key lights during outages (included in Long Evening).',
  },
  {
    id: 'panel-clean',
    name: 'Annual panel clean and check',
    priceAud: 189,
    note: 'Soft-water wash, visual check of rails and seals, and an inverter health review.',
  },
];

export const EVERY_INSTALL_INCLUDES = [
  'Tier-one panels and approved inverters',
  'Roof assessment before a single bracket is fitted',
  'Cyclone-rated mounting for tin or tile roofs',
  'Monitoring app set up on your phone',
  'SA grid-connection and rebate paperwork lodged for you',
  '10-year workmanship warranty from our own crew',
];

export const PRICING_LABEL_SHORT = 'inc GST · after the STC discount';

export const HERO_FEATURED_PACKAGE_ID = 'golden-hour';

export function getPackageById(id: string): SolarPackage | undefined {
  return packages.find(pkg => pkg.id === id);
}

export function getFeaturedPackages(): SolarPackage[] {
  return packages.filter(pkg => pkg.featured);
}

const SLUG = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;

export function validatePackages(
  items: readonly SolarPackage[] = packages,
  extras: readonly PackageAddOn[] = addOns,
): void {
  const seen = new Set<string>();
  let featuredCount = 0;

  for (const pkg of items) {
    if (!pkg.id || !SLUG.test(pkg.id)) {
      throw new Error(`packages[${pkg.id || '(missing)'}]: id must be URL-safe lowercase kebab-case`);
    }
    if (seen.has(pkg.id)) {
      throw new Error(`packages[${pkg.id}]: duplicate package id`);
    }
    seen.add(pkg.id);

    if (!pkg.name.trim()) throw new Error(`packages[${pkg.id}]: name is required`);
    if (!pkg.inverter.trim()) throw new Error(`packages[${pkg.id}]: inverter is required`);
    if (!pkg.bestFor.trim()) throw new Error(`packages[${pkg.id}]: bestFor is required`);
    if (!pkg.includes.length || pkg.includes.some(line => !line.trim())) {
      throw new Error(`packages[${pkg.id}]: includes must contain non-empty items`);
    }

    if (!Number.isInteger(pkg.fromPriceAud) || pkg.fromPriceAud < 1000 || pkg.fromPriceAud > 40000) {
      throw new Error(`packages[${pkg.id}]: fromPriceAud (${pkg.fromPriceAud}) must be a whole number between 1,000 and 40,000`);
    }

    if (pkg.batteryKwh < 0 || pkg.batteryKwh > 30) {
      throw new Error(`packages[${pkg.id}]: batteryKwh (${pkg.batteryKwh}) must be between 0 and 30`);
    }

    if (pkg.kind === 'panels') {
      if (pkg.batteryKwh !== 0) {
        throw new Error(`packages[${pkg.id}]: panels package must have batteryKwh === 0`);
      }
      if (pkg.systemKw <= 0 || pkg.panelCount <= 0 || pkg.panelWatts <= 0) {
        throw new Error(`packages[${pkg.id}]: panels package must have positive systemKw, panelCount and panelWatts`);
      }
    } else if (pkg.kind === 'battery') {
      if (pkg.systemKw !== 0 || pkg.panelCount !== 0 || pkg.panelWatts !== 0) {
        throw new Error(`packages[${pkg.id}]: battery package must have no panels (systemKw, panelCount, panelWatts === 0)`);
      }
      if (pkg.batteryKwh <= 0) {
        throw new Error(`packages[${pkg.id}]: battery package must have batteryKwh > 0`);
      }
    } else if (pkg.kind === 'bundle') {
      if (pkg.systemKw <= 0 || pkg.panelCount <= 0 || pkg.panelWatts <= 0 || pkg.batteryKwh <= 0) {
        throw new Error(`packages[${pkg.id}]: bundle package must include both solar panels and a battery`);
      }
    } else {
      throw new Error(`packages[${pkg.id}]: unknown kind`);
    }

    if (pkg.panelCount > 0 || pkg.panelWatts > 0 || pkg.systemKw > 0) {
      const expectedKw = (pkg.panelCount * pkg.panelWatts) / 1000;
      const diffRatio = expectedKw === 0 ? 1 : Math.abs(pkg.systemKw - expectedKw) / expectedKw;
      if (diffRatio > 0.02) {
        throw new Error(
          `packages[${pkg.id}]: systemKw (${pkg.systemKw}) must be within 2% of panelCount × panelWatts / 1000 (${expectedKw.toFixed(2)})`,
        );
      }
    }

    if (pkg.featured) {
      if (pkg.availability === 'unavailable') {
        throw new Error(`packages[${pkg.id}]: featured package cannot be unavailable`);
      }
      featuredCount += 1;
    }
  }

  if (featuredCount !== 3) {
    throw new Error(`packages: expected exactly 3 featured packages, found ${featuredCount}`);
  }

  const seenAddOns = new Set<string>();
  for (const addOn of extras) {
    if (!addOn.id || !SLUG.test(addOn.id)) {
      throw new Error(`addOns[${addOn.id || '(missing)'}]: id must be URL-safe lowercase kebab-case`);
    }
    if (seenAddOns.has(addOn.id)) {
      throw new Error(`addOns[${addOn.id}]: duplicate add-on id`);
    }
    seenAddOns.add(addOn.id);
    if (!addOn.name.trim()) throw new Error(`addOns[${addOn.id}]: name is required`);
    if (!addOn.note.trim()) throw new Error(`addOns[${addOn.id}]: note is required`);
    if (!Number.isFinite(addOn.priceAud) || addOn.priceAud <= 0) {
      throw new Error(`addOns[${addOn.id}]: priceAud (${addOn.priceAud}) must be positive`);
    }
  }
}
