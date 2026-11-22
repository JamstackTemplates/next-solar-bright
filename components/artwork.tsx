import type { SVGProps } from 'react';

/** Small striped half-sun rising behind the "Sunward" header/footer wordmark. */
export function WordmarkSun({ className = 'w-10 h-7 shrink-0' }: { className?: string }) {
  return (
    <svg viewBox="0 0 56 36" fill="none" aria-hidden="true" className={className}>
      <path d="M6 31 A22 22 0 0 1 50 31 Z" fill="var(--sun-pale)" />
      <path d="M12 31 A16 16 0 0 1 44 31 Z" fill="var(--sun-mid)" />
      <path
        d="M17 31 A11 11 0 0 1 39 31 Z"
        fill="var(--sun)"
        stroke="currentColor"
        strokeWidth="2.5"
        strokeLinejoin="round"
      />
      <g stroke="currentColor" strokeWidth="2.3" strokeLinecap="round">
        <line x1="28" y1="3" x2="28" y2="9" />
        <line x1="11" y1="9" x2="15" y2="13" />
        <line x1="45" y1="9" x2="41" y2="13" />
        <line x1="3" y1="31" x2="53" y2="31" />
      </g>
    </svg>
  );
}

/**
 * Curved sunrise horizon divider used between alternating cream/butter/dusk bands.
 * Variants: 'rising' (fresh half-sun), 'midday' (full rays), 'setting' (warm half-sunk dusk transition).
 */
export function SunriseHorizonDivider({
  variant = 'rising',
  topColor = 'var(--bg)',
  bottomColor = 'var(--surface)',
  className = 'horizon-divider block w-full overflow-hidden leading-none',
}: {
  variant?: 'rising' | 'midday' | 'setting';
  topColor?: string;
  bottomColor?: string;
  className?: string;
}) {
  const sunCy = variant === 'setting' ? 68 : variant === 'midday' ? 48 : 58;
  const sunFill = variant === 'setting' ? 'var(--primary)' : 'var(--sun)';
  const patternId = `horizon-dots-${variant}`;

  return (
    <div className={className} aria-hidden="true" style={{ backgroundColor: topColor }}>
      <svg viewBox="0 0 1440 112" preserveAspectRatio="none" className="block w-full h-14 sm:h-20">
        <defs>
          <pattern id={patternId} width="18" height="14" patternUnits="userSpaceOnUse">
            <circle cx="4" cy="4" r="1.5" fill="var(--ink)" opacity="0.16" />
            <circle cx="13" cy="10" r="1.1" fill="var(--ink)" opacity="0.1" />
          </pattern>
        </defs>

        {/* Sun rays peeking behind the curved horizon */}
        <g opacity={variant === 'midday' ? 0.9 : 0.7}>
          <circle cx="720" cy={sunCy} r={variant === 'midday' ? 96 : 74} fill="var(--sun-pale)" className="scene-day-only" />
          <circle cx="720" cy={sunCy} r={variant === 'midday' ? 68 : 54} fill="var(--sun-mid)" className="scene-day-only" />
          <circle
            cx="720"
            cy={sunCy}
            r={variant === 'midday' ? 42 : 34}
            fill={sunFill}
            stroke="var(--ink)"
            strokeWidth="2.5"
          />
          {variant === 'midday' && (
            <g stroke="var(--ink)" strokeWidth="2.2" strokeLinecap="round">
              <line x1="720" y1="6" x2="720" y2="18" />
              <line x1="665" y1="16" x2="674" y2="26" />
              <line x1="775" y1="16" x2="766" y2="26" />
              <line x1="628" y1="42" x2="642" y2="48" />
              <line x1="812" y1="42" x2="798" y2="48" />
            </g>
          )}
        </g>

        {/* Sparse starfield in dark mode */}
        <g className="scene-dusk-only" fill="var(--sun)" opacity="0.75">
          <circle cx="190" cy="30" r="2.2" />
          <circle cx="410" cy="22" r="1.8" />
          <circle cx="560" cy="44" r="2.4" />
          <circle cx="910" cy="26" r="2" />
          <circle cx="1140" cy="38" r="2.2" />
          <circle cx="1300" cy="22" r="1.8" />
        </g>

        {/* Curved horizon arc */}
        <path
          d="M0 78 Q720 22 1440 78 L1440 112 L0 112 Z"
          fill={bottomColor}
        />
        {/* Halftone dot fade along curve in light mode */}
        <path
          d="M0 78 Q720 22 1440 78 L1440 112 L0 112 Z"
          fill={`url(#${patternId})`}
          className="scene-day-only"
        />
        <path
          d="M0 78 Q720 22 1440 78"
          fill="none"
          stroke={variant === 'setting' ? 'var(--sun)' : 'var(--ink)'}
          strokeWidth="2.8"
        />
      </svg>
    </div>
  );
}

/** 6×10 cell deep-blue solar panel motif with diagonal light glint. */
export function PanelGridMotif({ className = 'w-full h-full' }: { className?: string }) {
  const cols = 10;
  const rows = 6;
  return (
    <svg viewBox="0 0 300 180" fill="none" aria-hidden="true" className={className}>
      <rect x="4" y="4" width="292" height="172" rx="10" fill="var(--panel)" stroke="var(--ink)" strokeWidth="3" />
      {Array.from({ length: cols - 1 }, (_, i) => (
        <line
          key={`c-${i}`}
          x1={4 + ((i + 1) * 292) / cols}
          y1="4"
          x2={4 + ((i + 1) * 292) / cols}
          y2="176"
          stroke="var(--sky)"
          strokeWidth="1.2"
          opacity="0.45"
        />
      ))}
      {Array.from({ length: rows - 1 }, (_, i) => (
        <line
          key={`r-${i}`}
          x1="4"
          y1={4 + ((i + 1) * 172) / rows}
          x2="296"
          y2={4 + ((i + 1) * 172) / rows}
          stroke="var(--sky)"
          strokeWidth="1.2"
          opacity="0.45"
        />
      ))}
      <path d="M52 10 L118 170 M82 10 L148 170" stroke="#FFFFFF" strokeWidth="10" opacity="0.16" />
    </svg>
  );
}

/** Rounded battery gauge with charge bars scaled to kWh / 15. */
export function BatteryGauge({ kwh, className = 'w-14 h-9 shrink-0' }: { kwh: number; className?: string }) {
  const totalBars = 5;
  const filledBars = Math.max(1, Math.min(totalBars, Math.round((kwh / 15) * totalBars)));
  return (
    <svg
      viewBox="0 0 64 38"
      fill="none"
      role="img"
      aria-label={`${kwh} kWh battery capacity gauge`}
      className={className}
    >
      <rect x="3" y="5" width="52" height="28" rx="7" fill="var(--bg)" stroke="var(--ink)" strokeWidth="2.5" />
      <rect x="55" y="13" width="6" height="12" rx="2.5" fill="var(--ink)" />
      {Array.from({ length: totalBars }, (_, idx) => {
        const filled = idx < filledBars;
        return (
          <rect
            key={idx}
            x={9 + idx * 8.5}
            y={11}
            width="6.5"
            height="16"
            rx="1.8"
            fill={filled ? (idx < 2 ? 'var(--sun)' : 'var(--leaf)') : 'var(--line)'}
            stroke={filled ? 'var(--ink)' : 'none'}
            strokeWidth="1.4"
          />
        );
      })}
    </svg>
  );
}

/** Three-ways drawn poster vignettes: "Use it", "Store it", "Export it". */
export function ThreeWaysVignette({
  kind,
  className = 'w-full h-auto',
}: {
  kind: 'use' | 'store' | 'export';
  className?: string;
}) {
  return (
    <svg viewBox="0 0 280 180" fill="none" aria-hidden="true" className={className}>
      <rect x="3" y="3" width="274" height="174" rx="18" fill="var(--sky-soft)" stroke="var(--ink)" strokeWidth="2.5" />
      {/* Rising sun corner */}
      <circle cx="52" cy="50" r="30" fill="var(--sun-mid)" opacity="0.65" />
      <circle cx="52" cy="50" r="20" fill="var(--sun)" stroke="var(--ink)" strokeWidth="2.5" />

      {kind === 'use' && (
        <>
          {/* Sun-to-house dashed flow */}
          <path d="M76 54 Q112 52 128 74" stroke="var(--primary)" strokeWidth="3.2" strokeDasharray="6 5" strokeLinecap="round" />
          {/* Adelaide house with panels & glowing appliances */}
          <polygon points="106,102 178,56 250,102" fill="var(--tile)" stroke="var(--ink)" strokeWidth="2.5" strokeLinejoin="round" />
          <rect x="118" y="102" width="120" height="62" fill="var(--surface-elevated)" stroke="var(--ink)" strokeWidth="2.5" />
          <g transform="rotate(-12 162 84)">
            <rect x="130" y="72" width="60" height="22" rx="2.5" fill="var(--panel)" stroke="var(--ink)" strokeWidth="2.2" />
            <path d="M150 72v22M170 72v22M130 83h60" stroke="var(--sky)" strokeWidth="1.2" />
          </g>
          {/* Glowing interior lights */}
          <rect x="136" y="116" width="34" height="28" rx="3" fill="var(--sun)" stroke="var(--ink)" strokeWidth="2.2" />
          <rect x="186" y="116" width="34" height="28" rx="3" fill="var(--sun)" stroke="var(--ink)" strokeWidth="2.2" />
          <path d="M153 122l-3 7h4l-2 6 6-8h-4l2-5z" fill="var(--ink)" />
        </>
      )}

      {kind === 'store' && (
        <>
          <path d="M76 54 Q124 44 156 76" stroke="var(--leaf)" strokeWidth="3.2" strokeDasharray="6 5" strokeLinecap="round" />
          {/* Wall & large home battery */}
          <rect x="128" y="64" width="124" height="100" rx="8" fill="var(--surface)" stroke="var(--ink)" strokeWidth="2.5" />
          <rect x="156" y="78" width="68" height="74" rx="10" fill="var(--surface-elevated)" stroke="var(--ink)" strokeWidth="2.5" />
          <rect x="168" y="90" width="44" height="11" rx="3" fill="var(--leaf)" stroke="var(--ink)" strokeWidth="2" />
          <rect x="168" y="107" width="44" height="11" rx="3" fill="var(--leaf)" stroke="var(--ink)" strokeWidth="2" />
          <rect x="168" y="124" width="44" height="11" rx="3" fill="var(--sun)" stroke="var(--ink)" strokeWidth="2" />
          {/* Moon badge for evening power */}
          <circle cx="228" cy="48" r="14" fill="var(--panel)" stroke="var(--ink)" strokeWidth="2.2" />
          <path d="M229 41 A7 7 0 1 0 235 52 A5.5 5.5 0 1 1 229 41 Z" fill="var(--sun)" />
        </>
      )}

      {kind === 'export' && (
        <>
          {/* Roof corner at left-bottom */}
          <polygon points="22,164 78,116 134,164" fill="var(--tile)" stroke="var(--ink)" strokeWidth="2.5" strokeLinejoin="round" />
          <g transform="rotate(-12 72 140)">
            <rect x="48" y="130" width="46" height="18" rx="2" fill="var(--panel)" stroke="var(--ink)" strokeWidth="2" />
          </g>
          {/* Flow line to street power pylon */}
          <path d="M98 124 Q146 86 196 86" stroke="var(--primary)" strokeWidth="3.2" strokeDasharray="6 5" strokeLinecap="round" />
          {/* Street grid pylon */}
          <g stroke="var(--ink)" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <path d="M214 52 L192 164 M214 52 L236 164" />
            <line x1="184" y1="74" x2="244" y2="74" />
            <line x1="190" y1="100" x2="238" y2="100" />
            <line x1="202" y1="126" x2="226" y2="126" />
            <path d="M244 74 Q260 80 274 74" strokeWidth="2" />
          </g>
        </>
      )}
    </svg>
  );
}

/** Five sun-phase markers used as step numerals along the install arc. */
export function InstallPhaseMarker({
  step,
  className = 'w-14 h-14 shrink-0',
}: {
  step: 1 | 2 | 3 | 4 | 5;
  className?: string;
}) {
  return (
    <svg viewBox="0 0 64 64" fill="none" aria-hidden="true" className={className}>
      <circle cx="32" cy="32" r="28" fill="var(--surface-elevated)" stroke="var(--ink)" strokeWidth="2.5" />
      {step === 1 && (
        <>
          <line x1="12" y1="44" x2="52" y2="44" stroke="var(--ink)" strokeWidth="2.5" strokeLinecap="round" />
          <path d="M20 44 A12 12 0 0 1 44 44 Z" fill="var(--sun)" stroke="var(--ink)" strokeWidth="2.4" />
        </>
      )}
      {step === 2 && (
        <>
          <line x1="12" y1="44" x2="52" y2="44" stroke="var(--ink)" strokeWidth="2.5" strokeLinecap="round" />
          <path d="M16 44 A16 16 0 0 1 48 44 Z" fill="var(--sun)" stroke="var(--ink)" strokeWidth="2.4" />
          <path d="M32 16v6M18 22l4 4M46 22l-4 4" stroke="var(--ink)" strokeWidth="2.3" strokeLinecap="round" />
        </>
      )}
      {step === 3 && (
        <>
          <circle cx="32" cy="32" r="13" fill="var(--sun)" stroke="var(--ink)" strokeWidth="2.4" />
          <path d="M32 10v5M32 49v5M10 32h5M49 32h5" stroke="var(--ink)" strokeWidth="2.4" strokeLinecap="round" />
        </>
      )}
      {step === 4 && (
        <>
          <circle cx="32" cy="28" r="13" fill="var(--sun)" stroke="var(--ink)" strokeWidth="2.4" />
          <g transform="rotate(-12 32 42)">
            <rect x="16" y="34" width="32" height="13" rx="2" fill="var(--panel)" stroke="var(--ink)" strokeWidth="2.2" />
            <line x1="27" y1="34" x2="27" y2="47" stroke="var(--sky)" strokeWidth="1.2" />
            <line x1="37" y1="34" x2="37" y2="47" stroke="var(--sky)" strokeWidth="1.2" />
          </g>
        </>
      )}
      {step === 5 && (
        <>
          <circle cx="32" cy="32" r="15" fill="var(--sun)" stroke="var(--ink)" strokeWidth="2.4" />
          <path
            d="M32 8v5M32 51v5M8 32h5M51 32h5M15 15l3.5 3.5M45.5 45.5L49 49M49 15l-3.5 3.5M18.5 45.5L15 49"
            stroke="var(--ink)"
            strokeWidth="2.2"
            strokeLinecap="round"
          />
          <path d="M34 22l-7 11h5l-2 9 7-11h-5l2-9z" fill="var(--leaf)" stroke="var(--ink)" strokeWidth="1.6" strokeLinejoin="round" />
        </>
      )}
    </svg>
  );
}

/** Cropped hero roofline segment with a tailored detail for each inner page head. */
export function PageHeadRooftopArt({
  detail,
  className = 'w-full max-w-sm h-auto',
}: {
  detail: 'rack' | 'dial' | 'certificate' | 'mailbox';
  className?: string;
}) {
  return (
    <svg viewBox="0 0 360 170" fill="none" aria-hidden="true" className={className}>
      <rect x="3" y="3" width="354" height="164" rx="20" fill="var(--sky-soft)" stroke="var(--ink)" strokeWidth="2.5" />
      <circle cx="268" cy="118" r="76" fill="var(--sun-mid)" opacity="0.7" />
      <circle cx="268" cy="118" r="52" fill="var(--sun)" stroke="var(--ink)" strokeWidth="2.5" />

      {/* Cropped Adelaide terracotta roofline */}
      <polygon points="18,167 148,76 284,167" fill="var(--tile)" stroke="var(--ink)" strokeWidth="2.5" strokeLinejoin="round" />

      {detail === 'rack' && (
        <g transform="rotate(-12 146 118)">
          <line x1="60" y1="138" x2="236" y2="138" stroke="var(--ink)" strokeWidth="4" strokeLinecap="round" />
          <rect x="74" y="88" width="66" height="44" rx="4" fill="var(--panel)" stroke="var(--ink)" strokeWidth="2.5" />
          <rect x="150" y="88" width="66" height="44" rx="4" fill="var(--panel)" stroke="var(--ink)" strokeWidth="2.5" />
          <path d="M96 88v44M118 88v44M172 88v44M194 88v44M74 110h66M150 110h66" stroke="var(--sky)" strokeWidth="1.3" />
        </g>
      )}

      {detail === 'dial' && (
        <g>
          <path d="M84 140 A96 96 0 0 1 276 140" stroke="var(--ink)" strokeWidth="3" strokeDasharray="8 6" fill="none" />
          <circle cx="180" cy="44" r="18" fill="var(--sun)" stroke="var(--ink)" strokeWidth="2.5" />
          <circle cx="116" cy="70" r="5" fill="var(--ink)" />
          <circle cx="244" cy="70" r="5" fill="var(--ink)" />
        </g>
      )}

      {detail === 'certificate' && (
        <g transform="translate(214, 34)">
          <circle cx="52" cy="52" r="42" fill="var(--surface-elevated)" stroke="var(--ink)" strokeWidth="2.5" />
          <circle cx="52" cy="52" r="33" fill="var(--sun)" stroke="var(--ink)" strokeWidth="2" strokeDasharray="5 4" />
          <path d="M38 53l10 10 18-20" stroke="#1F2A44" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" />
        </g>
      )}

      {detail === 'mailbox' && (
        <g transform="translate(206, 52)">
          <rect x="44" y="54" width="12" height="62" fill="var(--ink)" />
          <path d="M16 54 V28 A26 26 0 0 1 68 28 V54 Z" fill="var(--surface-elevated)" stroke="var(--ink)" strokeWidth="2.5" />
          <rect x="64" y="16" width="38" height="28" rx="4" fill="var(--primary)" stroke="var(--ink)" strokeWidth="2.5" />
          <path d="M68 22l15 11 15-11" stroke="#FFFFFF" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
        </g>
      )}
    </svg>
  );
}

/** Large certificate stamp illustration for the Rebates teaser and Rebates page. */
export function CertificateStampArt({ className = 'w-44 h-44 shrink-0' }: { className?: string }) {
  return (
    <svg viewBox="0 0 180 180" fill="none" aria-hidden="true" className={className}>
      {/* Sunburst scalloped edge */}
      <circle cx="90" cy="90" r="82" fill="var(--sun-pale)" stroke="var(--ink)" strokeWidth="2.5" strokeDasharray="10 6" />
      <circle cx="90" cy="90" r="68" fill="var(--sun)" stroke="var(--ink)" strokeWidth="2.5" />
      <circle cx="90" cy="90" r="54" fill="var(--surface-elevated)" stroke="var(--ink)" strokeWidth="2" />
      {/* Mini half-sun + roof checkmark inside stamp */}
      <path d="M64 88 A26 26 0 0 1 116 88 Z" fill="var(--sun)" stroke="var(--ink)" strokeWidth="2.2" />
      <line x1="54" y1="88" x2="126" y2="88" stroke="var(--ink)" strokeWidth="2.5" strokeLinecap="round" />
      <path d="M74 108l11 11 22-22" stroke="var(--leaf)" strokeWidth="4.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

/** 404 "In the shade" illustration: cloud drifting across sun over a roof with a confused panel. */
export function InTheShadeArt({ className = 'w-full max-w-md h-auto mx-auto' }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 420 260"
      fill="none"
      role="img"
      aria-label="A cloud drifting across the rising sun above a terracotta roof and solar panel"
      className={className}
    >
      {/* Half-sun peeking out from behind cloud */}
      <circle cx="245" cy="94" r="56" fill="var(--sun-mid)" opacity="0.6" />
      <circle cx="245" cy="94" r="40" fill="var(--sun)" stroke="var(--ink)" strokeWidth="2.5" />
      {/* Single lonely ray dropping down */}
      <path d="M210 132 L198 164" stroke="var(--sun)" strokeWidth="4" strokeDasharray="6 6" strokeLinecap="round" />

      {/* Drifting fluffy cloud covering most of the sun */}
      <path
        d="M118 122 H260 A26 26 0 0 0 262 70 A36 36 0 0 0 194 54 A30 30 0 0 0 138 74 A24 24 0 0 0 118 122 Z"
        fill="var(--surface-elevated)"
        stroke="var(--ink)"
        strokeWidth="2.8"
        strokeLinejoin="round"
      />

      {/* Terracotta roof beneath */}
      <polygon points="54,236 210,148 366,236" fill="var(--tile)" stroke="var(--ink)" strokeWidth="2.8" strokeLinejoin="round" />
      <rect x="92" y="236" width="236" height="16" fill="var(--surface)" stroke="var(--ink)" strokeWidth="2.5" />

      {/* Confused solar panel */}
      <g transform="rotate(-12 204 198)">
        <rect x="148" y="172" width="108" height="44" rx="5" fill="var(--panel)" stroke="var(--ink)" strokeWidth="2.8" />
        <path d="M175 172v44M202 172v44M229 172v44M148 194h108" stroke="var(--sky)" strokeWidth="1.2" opacity="0.5" />
        {/* Tiny "?" glyph floating above panel */}
        <circle cx="240" cy="158" r="13" fill="var(--sun)" stroke="var(--ink)" strokeWidth="2.2" />
        <text x="240" y="163" textAnchor="middle" fill="#1F2A44" fontSize="15" fontWeight="700" fontFamily="monospace">?</text>
      </g>
    </svg>
  );
}

/** Roof-orientation compass rose for Savings ("What changes your numbers"). */
export function CompassRoseArt({ className = 'w-56 h-56 mx-auto' }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 240 240"
      fill="none"
      role="img"
      aria-label="Compass rose showing north as strongest all-day solar aspect in Adelaide, with east and west strong for morning and afternoon"
      className={className}
    >
      <circle cx="120" cy="120" r="100" fill="var(--surface)" stroke="var(--ink)" strokeWidth="2.5" />
      <circle cx="120" cy="120" r="72" fill="var(--bg)" stroke="var(--ink)" strokeWidth="2" strokeDasharray="6 5" />
      {/* North pointer (best in Southern Hemisphere — warm sun highlight) */}
      <polygon points="120,26 138,116 120,104 102,116" fill="var(--sun)" stroke="var(--ink)" strokeWidth="2.5" strokeLinejoin="round" />
      {/* South pointer */}
      <polygon points="120,214 134,126 120,136 106,126" fill="var(--panel)" stroke="var(--ink)" strokeWidth="2.5" strokeLinejoin="round" />
      {/* East / West pointers */}
      <polygon points="214,120 128,106 138,120 128,134" fill="var(--tile)" stroke="var(--ink)" strokeWidth="2.2" strokeLinejoin="round" />
      <polygon points="26,120 112,106 102,120 112,134" fill="var(--tile)" stroke="var(--ink)" strokeWidth="2.2" strokeLinejoin="round" />
      <circle cx="120" cy="120" r="12" fill="var(--surface-elevated)" stroke="var(--ink)" strokeWidth="2.5" />
      {/* Labels */}
      <text x="120" y="18" textAnchor="middle" fill="var(--ink)" fontSize="14" fontWeight="700" fontFamily="monospace">N (peak)</text>
      <text x="120" y="234" textAnchor="middle" fill="var(--muted)" fontSize="13" fontWeight="700" fontFamily="monospace">S</text>
      <text x="228" y="125" textAnchor="middle" fill="var(--ink)" fontSize="13" fontWeight="700" fontFamily="monospace">E</text>
      <text x="12" y="125" textAnchor="middle" fill="var(--ink)" fontSize="13" fontWeight="700" fontFamily="monospace">W</text>
    </svg>
  );
}

/**
 * Miniature rooftop solar array & battery rack visualizer for each PackagePlate.
 * Draws the exact number of panels (e.g. 15 or 23 modules) on extruded mounting rails,
 * or an AC-coupled wall battery diagram for battery-only packages.
 */
export function SolarArrayFootprint({
  panelCount,
  batteryKwh,
  className = 'w-full h-14',
}: {
  panelCount: number;
  batteryKwh: number;
  className?: string;
}) {
  const cols = panelCount > 16 ? 12 : 8;
  const topRow = panelCount > 0 ? Math.ceil(panelCount / 2) : 0;
  const bottomRow = panelCount > 0 ? panelCount - topRow : 0;

  return (
    <svg viewBox="0 0 320 62" fill="none" aria-hidden="true" className={className}>
      {/* Extruded aluminium mounting rails */}
      <rect x="6" y="16" width="234" height="4" rx="2" fill="var(--tin)" stroke="var(--ink)" strokeWidth="1.4" />
      <rect x="6" y="42" width="234" height="4" rx="2" fill="var(--tin)" stroke="var(--ink)" strokeWidth="1.4" />

      {panelCount > 0 ? (
        <>
          {/* Top row of solar modules */}
          {Array.from({ length: topRow }, (_, idx) => {
            const cellW = Math.min(24, Math.floor(216 / cols) - 2);
            const x = 14 + idx * (cellW + 3);
            return (
              <g key={`t-${idx}`}>
                <rect
                  x={x}
                  y="7"
                  width={cellW}
                  height="21"
                  rx="2"
                  fill="var(--panel)"
                  stroke="var(--ink)"
                  strokeWidth="1.6"
                />
                <line
                  x1={x + cellW / 2}
                  y1="8"
                  x2={x + cellW / 2}
                  y2="27"
                  stroke="var(--sky)"
                  strokeWidth="0.9"
                  opacity="0.65"
                />
              </g>
            );
          })}
          {/* Bottom row of solar modules */}
          {Array.from({ length: bottomRow }, (_, idx) => {
            const cellW = Math.min(24, Math.floor(216 / cols) - 2);
            const x = 14 + idx * (cellW + 3);
            return (
              <g key={`b-${idx}`}>
                <rect
                  x={x}
                  y="33"
                  width={cellW}
                  height="21"
                  rx="2"
                  fill="var(--panel)"
                  stroke="var(--ink)"
                  strokeWidth="1.6"
                />
                <line
                  x1={x + cellW / 2}
                  y1="34"
                  x2={x + cellW / 2}
                  y2="53"
                  stroke="var(--sky)"
                  strokeWidth="0.9"
                  opacity="0.65"
                />
              </g>
            );
          })}
        </>
      ) : (
        /* Existing solar connection line for AC-coupled battery package */
        <g>
          <rect
            x="16"
            y="13"
            width="206"
            height="36"
            rx="8"
            fill="var(--surface)"
            stroke="var(--ink)"
            strokeWidth="1.8"
            strokeDasharray="5 4"
          />
          <text
            x="119"
            y="35"
            textAnchor="middle"
            fill="var(--ink)"
            fontSize="10.5"
            fontWeight="700"
            fontFamily="monospace"
          >
            CONNECTS TO EXISTING SOLAR
          </text>
        </g>
      )}

      {/* Right side: coupled battery module or inverter unit */}
      {batteryKwh > 0 ? (
        <g transform="translate(252, 6)">
          <rect x="0" y="0" width="60" height="50" rx="7" fill="var(--surface)" stroke="var(--ink)" strokeWidth="2" />
          <rect x="8" y="8" width="44" height="8" rx="2" fill="var(--leaf)" stroke="var(--ink)" strokeWidth="1.4" />
          <rect x="8" y="20" width="44" height="8" rx="2" fill="var(--leaf)" stroke="var(--ink)" strokeWidth="1.4" />
          <rect x="8" y="32" width="44" height="8" rx="2" fill="var(--sun)" stroke="var(--ink)" strokeWidth="1.4" />
        </g>
      ) : (
        <g transform="translate(256, 12)">
          <rect x="0" y="0" width="52" height="38" rx="6" fill="var(--surface-elevated)" stroke="var(--ink)" strokeWidth="2" />
          <circle cx="15" cy="19" r="5" fill="var(--sun)" stroke="var(--ink)" strokeWidth="1.5" />
          <line x1="26" y1="15" x2="42" y2="15" stroke="var(--ink)" strokeWidth="2" strokeLinecap="round" />
          <line x1="26" y1="23" x2="38" y2="23" stroke="var(--ink)" strokeWidth="2" strokeLinecap="round" />
        </g>
      )}
    </svg>
  );
}

/**
 * Stylised screen-print map of Adelaide Metro, the Adelaide Hills and Fleurieu Peninsula
 * showing Gulf St Vincent, Mount Lofty ranges, and service pins.
 */
export function AdelaideRegionMapArt({ className = 'w-full h-auto block' }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 340 165"
      fill="none"
      role="img"
      aria-label="Illustrated map of Sunward Solar service zones across Adelaide Metro, Adelaide Hills and the Fleurieu Peninsula"
      className={className}
    >
      {/* Gulf St Vincent water at west */}
      <rect x="3" y="3" width="334" height="159" rx="16" fill="var(--sky-soft)" stroke="var(--ink)" strokeWidth="2.5" />
      <path d="M18 46 Q34 42 50 46 M14 88 Q30 84 46 88 M22 128 Q38 124 54 128" stroke="var(--panel)" strokeWidth="2" strokeLinecap="round" opacity="0.35" />

      {/* Coastline & Adelaide plains / Fleurieu landmass */}
      <path
        d="M84 5 C94 34 96 64 88 94 C78 124 56 142 46 160 L335 160 L335 5 Z"
        fill="var(--bg)"
        stroke="var(--ink)"
        strokeWidth="2.5"
        strokeLinejoin="round"
      />

      {/* Adelaide Hills / Mount Lofty Ranges contour band */}
      <path
        d="M174 6 C168 44 176 82 162 118 C150 140 132 152 122 160 L335 160 L335 6 Z"
        fill="var(--surface)"
        stroke="var(--ink)"
        strokeWidth="2"
        strokeDasharray="6 4"
      />

      {/* Sun compass in top-left gulf */}
      <circle cx="44" cy="30" r="14" fill="var(--sun)" stroke="var(--ink)" strokeWidth="2" />
      <text x="44" y="34" textAnchor="middle" fill="#1F2A44" fontSize="10" fontWeight="700" fontFamily="monospace">N↑</text>

      {/* Pin 1: Adelaide Metro (CBD / Coast) */}
      <g transform="translate(126, 54)">
        <circle cx="0" cy="0" r="14" fill="var(--sun)" opacity="0.45" />
        <circle cx="0" cy="0" r="6" fill="var(--primary)" stroke="var(--ink)" strokeWidth="2.2" />
        <text x="12" y="4" fill="var(--ink)" fontSize="11" fontWeight="700" fontFamily="monospace">METRO</text>
      </g>

      {/* Pin 2: Adelaide Hills (Stirling / Mt Barker) */}
      <g transform="translate(216, 78)">
        <circle cx="0" cy="0" r="14" fill="var(--sun)" opacity="0.45" />
        <circle cx="0" cy="0" r="6" fill="var(--leaf)" stroke="var(--ink)" strokeWidth="2.2" />
        <text x="12" y="4" fill="var(--ink)" fontSize="11" fontWeight="700" fontFamily="monospace">HILLS</text>
      </g>

      {/* Pin 3: Fleurieu Peninsula (McLaren Vale / Victor Harbor) */}
      <g transform="translate(132, 130)">
        <circle cx="0" cy="0" r="14" fill="var(--sun)" opacity="0.45" />
        <circle cx="0" cy="0" r="6" fill="var(--sun)" stroke="var(--ink)" strokeWidth="2.2" />
        <text x="12" y="4" fill="var(--ink)" fontSize="11" fontWeight="700" fontFamily="monospace">FLEURIEU</text>
      </g>
    </svg>
  );
}
