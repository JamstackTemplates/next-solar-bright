export interface SavingsAssumptions {
  /** Explicit disclaimer tag carried wherever these sample assumptions appear. */
  sampleLabel: string;
  /** Illustrative sample electricity import rate (AUD per kWh). */
  importRateAudPerKwh: number;
  /** Illustrative sample solar feed-in tariff (AUD per kWh). */
  feedInAudPerKwh: number;
  /** Illustrative sample Adelaide annual average daily solar yield (kWh per kW). */
  dailyYieldKwhPerKw: number;
  /** Illustrative sample share of generation used on-site rather than exported. */
  selfUseShare: {
    panels: number;
    bundle: number;
  };
  /** Plain note about daily fixed supply charges. */
  supplyChargeNote: string;
  /** Plus/minus percentage range around the central estimate. */
  estimateRangePct: number;
}

export interface DialFlows {
  panelsToHome: boolean;
  panelsToBattery: boolean;
  panelsToGrid: boolean;
  batteryToHome: boolean;
  gridToHome: boolean;
}

export interface SunDialFrame {
  /** Stable frame ID. */
  id: string;
  /** Mono time chip label shown under the dial. */
  label: string;
  /** Minutes after midnight for chronological order validation. */
  minutesFromMidnight: number;
  /** Position along the sunrise-to-sunset half-circle arc (0° = east horizon, 90° = midday peak, 180° = west horizon). */
  sunAngleDeg: number;
  /** Whether this frame depicts dusk/night on battery. */
  isEvening?: boolean;
  /** Active energy flow paths in the house diagram. */
  flows: DialFlows;
  /** Short plain-English caption describing what happens at this hour. */
  caption: string;
}

export const savingsAssumptions: SavingsAssumptions = {
  sampleLabel: 'Illustrative sample',
  importRateAudPerKwh: 0.42,
  feedInAudPerKwh: 0.04,
  dailyYieldKwhPerKw: 4.3,
  selfUseShare: {
    panels: 0.35,
    bundle: 0.75,
  },
  supplyChargeNote:
    'Daily network supply charges stay on your bill and are excluded from this illustrative sample.',
  estimateRangePct: 20,
};

export const dialFrames: SunDialFrame[] = [
  {
    id: '6-am',
    label: '6 am',
    minutesFromMidnight: 360,
    sunAngleDeg: 14,
    flows: {
      panelsToHome: true,
      panelsToBattery: false,
      panelsToGrid: false,
      batteryToHome: false,
      gridToHome: true,
    },
    caption: 'First light wakes the panels; the grid covers the kettle and morning showers.',
  },
  {
    id: '9-am',
    label: '9 am',
    minutesFromMidnight: 540,
    sunAngleDeg: 50,
    flows: {
      panelsToHome: true,
      panelsToBattery: true,
      panelsToGrid: false,
      batteryToHome: false,
      gridToHome: false,
    },
    caption: 'Morning sun runs the house and starts topping up the wall battery.',
  },
  {
    id: 'noon',
    label: 'Noon',
    minutesFromMidnight: 720,
    sunAngleDeg: 90,
    flows: {
      panelsToHome: true,
      panelsToBattery: true,
      panelsToGrid: true,
      batteryToHome: false,
      gridToHome: false,
    },
    caption: 'Panels run the house, top up the battery and export the rest.',
  },
  {
    id: '3-pm',
    label: '3 pm',
    minutesFromMidnight: 900,
    sunAngleDeg: 130,
    flows: {
      panelsToHome: true,
      panelsToBattery: true,
      panelsToGrid: true,
      batteryToHome: false,
      gridToHome: false,
    },
    caption: 'Strong afternoon sun cools the home while the battery finishes charging.',
  },
  {
    id: '6-pm',
    label: '6 pm',
    minutesFromMidnight: 1080,
    sunAngleDeg: 164,
    isEvening: true,
    flows: {
      panelsToHome: true,
      panelsToBattery: false,
      panelsToGrid: false,
      batteryToHome: true,
      gridToHome: false,
    },
    caption: 'As the sun drops low, stored battery power takes over for dinner.',
  },
  {
    id: '9-pm',
    label: '9 pm',
    minutesFromMidnight: 1260,
    sunAngleDeg: 176,
    isEvening: true,
    flows: {
      panelsToHome: false,
      panelsToBattery: false,
      panelsToGrid: false,
      batteryToHome: true,
      gridToHome: false,
    },
    caption: 'After dark, the house coasts on daytime sun stored in the battery.',
  },
];

/** The three static snapshot frames shown on the Home page. */
export const HOME_DIAL_FRAME_IDS = ['6-am', 'noon', '6-pm'] as const;

export function validateSavings(
  assumptions: SavingsAssumptions = savingsAssumptions,
  frames: readonly SunDialFrame[] = dialFrames,
): void {
  if (assumptions.importRateAudPerKwh <= 0) {
    throw new Error('savings.importRateAudPerKwh: must be positive');
  }
  if (assumptions.feedInAudPerKwh <= 0) {
    throw new Error('savings.feedInAudPerKwh: must be positive');
  }
  if (assumptions.dailyYieldKwhPerKw <= 0) {
    throw new Error('savings.dailyYieldKwhPerKw: must be positive');
  }
  if (assumptions.selfUseShare.panels <= 0 || assumptions.selfUseShare.panels >= 1) {
    throw new Error('savings.selfUseShare.panels: must be strictly between 0 and 1');
  }
  if (assumptions.selfUseShare.bundle <= 0 || assumptions.selfUseShare.bundle >= 1) {
    throw new Error('savings.selfUseShare.bundle: must be strictly between 0 and 1');
  }
  if (assumptions.estimateRangePct <= 0 || assumptions.estimateRangePct >= 100) {
    throw new Error('savings.estimateRangePct: must be between 0 and 100');
  }
  if (!assumptions.supplyChargeNote.trim()) {
    throw new Error('savings.supplyChargeNote: required');
  }
  if (!frames.length) {
    throw new Error('savings.dialFrames: at least one frame is required');
  }
  const seen = new Set<string>();
  let previousMinutes = -1;
  for (const frame of frames) {
    if (!frame.id.trim()) throw new Error('savings.dialFrames: missing frame id');
    if (seen.has(frame.id)) throw new Error(`savings.dialFrames[${frame.id}]: duplicate id`);
    seen.add(frame.id);
    if (!frame.label.trim()) throw new Error(`savings.dialFrames[${frame.id}]: label is required`);
    if (!frame.caption.trim()) throw new Error(`savings.dialFrames[${frame.id}]: caption is required`);
    if (frame.minutesFromMidnight <= previousMinutes) {
      throw new Error(`savings.dialFrames[${frame.id}]: frames must be in strictly ascending time order`);
    }
    previousMinutes = frame.minutesFromMidnight;
    if (frame.sunAngleDeg < 0 || frame.sunAngleDeg > 180) {
      throw new Error(`savings.dialFrames[${frame.id}]: sunAngleDeg must be between 0 and 180`);
    }
  }
}
