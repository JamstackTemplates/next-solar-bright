import type { SunDialFrame } from '../content/savings';

/** Server-safe SVG for the Sun-path Dial: sunrise arc, ray ticks, sun disc, house diagram & flows. */
export function SunDialSvg({
  frame,
  compact = false,
}: {
  frame: SunDialFrame;
  compact?: boolean;
}) {
  const cx = 180;
  const cy = 148;
  const r = 112;
  const rad = ((180 - frame.sunAngleDeg) * Math.PI) / 180;
  const sunX = cx + r * Math.cos(rad);
  const sunY = cy - r * Math.sin(rad);

  const ticks = [14, 50, 90, 130, 164];
  const { flows } = frame;

  return (
    <svg
      viewBox="0 0 360 278"
      fill="none"
      role="img"
      aria-label={`Sun position at ${frame.label}: ${frame.caption}`}
      className={compact ? 'w-full h-auto block' : 'w-full max-w-xl h-auto block mx-auto'}
    >
      {/* Sky dome inside arc */}
      <path
        d="M52 152 A128 128 0 0 1 308 152 Z"
        fill={frame.isEvening ? 'var(--panel)' : 'var(--sky-soft)'}
        opacity={frame.isEvening ? 0.32 : 0.88}
      />

      {/* Cardinal compass markers along horizon & peak */}
      <text x="48" y="144" textAnchor="middle" fill="var(--muted)" fontSize="9.5" fontWeight="700" fontFamily="monospace">
        EAST
      </text>
      <text x="180" y="20" textAnchor="middle" fill="var(--muted)" fontSize="9.5" fontWeight="700" fontFamily="monospace">
        NORTH PEAK
      </text>
      <text x="312" y="144" textAnchor="middle" fill="var(--muted)" fontSize="9.5" fontWeight="700" fontFamily="monospace">
        WEST
      </text>

      {/* Banded ray tick marks around the sunrise arc */}
      {ticks.map(deg => {
        const tRad = ((180 - deg) * Math.PI) / 180;
        const x1 = cx + (r - 12) * Math.cos(tRad);
        const y1 = cy - (r - 12) * Math.sin(tRad);
        const x2 = cx + (r + 12) * Math.cos(tRad);
        const y2 = cy - (r + 12) * Math.sin(tRad);
        return (
          <line
            key={deg}
            x1={x1}
            y1={y1}
            x2={x2}
            y2={y2}
            stroke="var(--ink)"
            strokeWidth="2.2"
            strokeLinecap="round"
            opacity="0.45"
          />
        );
      })}

      {/* Main sunrise half-circle arc */}
      <path
        d="M68 148 A112 112 0 0 1 292 148"
        stroke="var(--ink)"
        strokeWidth="3"
        strokeDasharray="7 6"
        strokeLinecap="round"
      />

      {/* Sun / Evening disc travelling along the arc */}
      <g
        className="dial-sun-orb"
        style={{ transform: `translate(${sunX.toFixed(1)}px, ${sunY.toFixed(1)}px)` }}
      >
        <circle r="26" fill="var(--sun-mid)" opacity="0.55" />
        <circle
          r="17"
          fill={frame.isEvening ? 'var(--primary)' : 'var(--sun)'}
          stroke="var(--ink)"
          strokeWidth="2.5"
        />
        {frame.isEvening && (
          <path d="M2 -9 A10 10 0 1 0 10 7 A8 8 0 1 1 2 -9 Z" fill="var(--sun)" />
        )}
      </g>

      {/* Horizon line */}
      <line x1="20" y1="152" x2="340" y2="152" stroke="var(--ink)" strokeWidth="2.5" strokeLinecap="round" />

      {/* Roof + solar panels */}
      <polygon points="104,178 180,136 256,178" fill="var(--tile)" stroke="var(--ink)" strokeWidth="2.5" strokeLinejoin="round" />
      <g transform="rotate(-12 162 158)">
        <rect x="130" y="148" width="60" height="20" rx="3" fill="var(--panel)" stroke="var(--ink)" strokeWidth="2.2" />
        <path d="M150 148v20M170 148v20M130 158h60" stroke="var(--sky)" strokeWidth="1.2" />
      </g>

      {/* House body */}
      <rect x="118" y="178" width="124" height="72" rx="4" fill="var(--surface-elevated)" stroke="var(--ink)" strokeWidth="2.5" />
      <rect
        x="156"
        y="196"
        width="48"
        height="34"
        rx="4"
        fill={flows.panelsToHome || flows.batteryToHome || flows.gridToHome ? 'var(--sun)' : 'var(--bg)'}
        stroke="var(--ink)"
        strokeWidth="2.2"
      />
      <text x="180" y="218" textAnchor="middle" fill="#1F2A44" fontSize="11" fontWeight="700" fontFamily="monospace">HOME</text>

      {/* Wall Battery (left) */}
      <g>
        <rect x="34" y="182" width="46" height="66" rx="8" fill="var(--surface)" stroke="var(--ink)" strokeWidth="2.5" />
        <rect
          x="42"
          y="192"
          width="30"
          height="10"
          rx="2"
          fill={flows.panelsToBattery || flows.batteryToHome ? 'var(--leaf)' : 'var(--line)'}
          stroke="var(--ink)"
          strokeWidth="1.5"
        />
        <rect
          x="42"
          y="206"
          width="30"
          height="10"
          rx="2"
          fill={flows.panelsToBattery || flows.batteryToHome ? 'var(--leaf)' : 'var(--line)'}
          stroke="var(--ink)"
          strokeWidth="1.5"
        />
        <rect
          x="42"
          y="220"
          width="30"
          height="10"
          rx="2"
          fill="var(--sun)"
          stroke="var(--ink)"
          strokeWidth="1.5"
        />
        <text x="57" y="266" textAnchor="middle" fill="var(--ink)" fontSize="11" fontWeight="700" fontFamily="monospace">BATTERY</text>
      </g>

      {/* Street Grid Pylon (right) */}
      <g>
        <g stroke="var(--ink)" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
          <path d="M306 176 L288 248 M306 176 L324 248" />
          <line x1="284" y1="194" x2="328" y2="194" />
          <line x1="290" y1="214" x2="322" y2="214" />
        </g>
        <text x="306" y="266" textAnchor="middle" fill="var(--ink)" fontSize="11" fontWeight="700" fontFamily="monospace">GRID</text>
      </g>

      {/* Panels -> Home */}
      <path
        d="M178 168 L178 194"
        stroke={flows.panelsToHome ? 'var(--primary)' : 'var(--line)'}
        strokeWidth={flows.panelsToHome ? 4 : 2}
        strokeLinecap="round"
        className={flows.panelsToHome && !compact ? 'dial-flow-active' : undefined}
        strokeDasharray={flows.panelsToHome && compact ? '6 5' : undefined}
        opacity={flows.panelsToHome ? 1 : 0.45}
      />

      {/* Panels -> Battery */}
      <path
        d="M132 162 Q84 162 66 182"
        stroke={flows.panelsToBattery ? 'var(--leaf)' : 'var(--line)'}
        strokeWidth={flows.panelsToBattery ? 4 : 2}
        strokeLinecap="round"
        className={flows.panelsToBattery && !compact ? 'dial-flow-active' : undefined}
        strokeDasharray={flows.panelsToBattery && compact ? '6 5' : undefined}
        opacity={flows.panelsToBattery ? 1 : 0.4}
      />

      {/* Battery -> Home */}
      <path
        d="M80 218 L118 218"
        stroke={flows.batteryToHome ? 'var(--leaf)' : 'var(--line)'}
        strokeWidth={flows.batteryToHome ? 4 : 2}
        strokeLinecap="round"
        className={flows.batteryToHome && !compact ? 'dial-flow-active' : undefined}
        strokeDasharray={flows.batteryToHome && compact ? '6 5' : undefined}
        opacity={flows.batteryToHome ? 1 : 0.4}
      />

      {/* Panels -> Grid (Export) */}
      <path
        d="M214 162 Q264 160 288 184"
        stroke={flows.panelsToGrid ? 'var(--sun)' : 'var(--line)'}
        strokeWidth={flows.panelsToGrid ? 4 : 2}
        strokeLinecap="round"
        className={flows.panelsToGrid && !compact ? 'dial-flow-active' : undefined}
        strokeDasharray={flows.panelsToGrid && compact ? '6 5' : undefined}
        opacity={flows.panelsToGrid ? 1 : 0.4}
      />

      {/* Grid -> Home (Import) */}
      <path
        d="M288 220 L242 220"
        stroke={flows.gridToHome ? 'var(--primary)' : 'var(--line)'}
        strokeWidth={flows.gridToHome ? 4 : 2}
        strokeLinecap="round"
        className={flows.gridToHome && !compact ? 'dial-flow-active' : undefined}
        strokeDasharray={flows.gridToHome && compact ? '6 5' : undefined}
        opacity={flows.gridToHome ? 1 : 0.4}
      />
    </svg>
  );
}
