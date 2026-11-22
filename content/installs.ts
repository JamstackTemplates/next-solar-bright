import { packages, type SolarPackage } from './packages.ts';

export type RoofType = 'tile' | 'tin';

export interface RecentInstall {
  /** Stable, URL-safe unique identifier. */
  id: string;
  /** Adelaide suburb or town where the system was installed. */
  suburb: string;
  /** Must match a package id in content/packages.ts. */
  packageId: string;
  /** Month completed in YYYY-MM format. */
  month: string;
  /** Roof material. */
  roof: RoofType;
  /** Short job note printed on the job tag. */
  note: string;
}

export const installs: RecentInstall[] = [
  {
    id: 'glenelg-north-2026-10',
    suburb: 'Glenelg North',
    packageId: 'golden-hour',
    month: '2026-10',
    roof: 'tile',
    note: 'Two-storey, east and west arrays.',
  },
  {
    id: 'stirling-2026-09',
    suburb: 'Stirling',
    packageId: 'long-evening',
    month: '2026-09',
    roof: 'tin',
    note: 'Backup circuit for the well pump.',
  },
  {
    id: 'prospect-2026-09',
    suburb: 'Prospect',
    packageId: 'sunrise-6-6',
    month: '2026-09',
    roof: 'tin',
    note: 'Done in a single day.',
  },
  {
    id: 'mclaren-vale-2026-08',
    suburb: 'McLaren Vale',
    packageId: 'nightlight',
    month: '2026-08',
    roof: 'tin',
    note: 'Battery added to 2019 solar.',
  },
];

const SLUG = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;
const YEAR_MONTH = /^(\d{4})-(0[1-9]|1[0-2])$/;

export function formatInstallMonth(yearMonth: string): string {
  const [year, month] = yearMonth.split('-').map(Number);
  const date = new Date(Date.UTC(year, month - 1, 1));
  return new Intl.DateTimeFormat('en-AU', {
    month: 'short',
    year: 'numeric',
    timeZone: 'UTC',
  }).format(date);
}

export function validateInstalls(
  items: readonly RecentInstall[] = installs,
  catalog: readonly SolarPackage[] = packages,
): void {
  const packageIds = new Set(catalog.map(pkg => pkg.id));
  const seen = new Set<string>();

  for (const install of items) {
    if (!install.id || !SLUG.test(install.id)) {
      throw new Error(`installs[${install.id || '(missing)'}]: id must be URL-safe`);
    }
    if (seen.has(install.id)) {
      throw new Error(`installs[${install.id}]: duplicate install id`);
    }
    seen.add(install.id);
    if (!install.suburb.trim()) {
      throw new Error(`installs[${install.id}]: suburb is required`);
    }
    if (!packageIds.has(install.packageId)) {
      throw new Error(`installs[${install.id}]: unknown packageId "${install.packageId}"`);
    }
    if (!YEAR_MONTH.test(install.month)) {
      throw new Error(`installs[${install.id}]: month "${install.month}" must be valid YYYY-MM`);
    }
    if (install.roof !== 'tile' && install.roof !== 'tin') {
      throw new Error(`installs[${install.id}]: roof must be "tile" or "tin"`);
    }
    if (!install.note.trim()) {
      throw new Error(`installs[${install.id}]: note is required`);
    }
  }
}
