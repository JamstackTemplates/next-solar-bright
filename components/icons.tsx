import type { SVGProps } from 'react';

export type SolarIconName =
  | 'panel'
  | 'battery'
  | 'inverter'
  | 'ev-plug'
  | 'bird-mesh'
  | 'tile-roof'
  | 'tin-roof'
  | 'phone'
  | 'mail'
  | 'clock'
  | 'map-pin'
  | 'check-sun'
  | 'backup'
  | 'clean'
  | 'menu'
  | 'close';

type Props = SVGProps<SVGSVGElement> & {
  name: SolarIconName;
};

/** 24px poster-outline icons matching Sunward Solar's 2.2px rounded-join line style. */
export function SolarIcon({ name, className = 'w-5 h-5 shrink-0', ...rest }: Props) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={2.2}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      className={className}
      {...rest}
    >
      {name === 'panel' && (
        <>
          <polygon points="4,18 7,6 20,6 17,18" fill="var(--panel)" fillOpacity="0.22" />
          <line x1="10.5" y1="6" x2="7.5" y2="18" />
          <line x1="15.5" y1="6" x2="12.5" y2="18" />
          <line x1="5.5" y1="12" x2="18.5" y2="12" />
        </>
      )}
      {name === 'battery' && (
        <>
          <rect x="6" y="5" width="12" height="16" rx="2.5" fill="var(--sun)" fillOpacity="0.28" />
          <path d="M9.5 3h5" />
          <path d="M12.5 9.5l-2.5 4h4l-2.5 4" />
        </>
      )}
      {name === 'inverter' && (
        <>
          <rect x="4" y="4" width="16" height="16" rx="3" fill="var(--surface)" />
          <path d="M8 10h3m-3 4h8" />
          <circle cx="15.5" cy="9.5" r="1.4" fill="var(--leaf)" />
        </>
      )}
      {name === 'ev-plug' && (
        <>
          <path d="M8 5v4M14 5v4" />
          <path d="M6 9h10v2.5a5 5 0 0 1-5 5h0a5 5 0 0 1-5-5V9z" fill="var(--sun)" fillOpacity="0.3" />
          <path d="M11 16.5V19a2 2 0 0 0 2 2h4" />
        </>
      )}
      {name === 'bird-mesh' && (
        <>
          <rect x="4" y="5" width="16" height="14" rx="2" />
          <path d="M4 10h16M4 14h16M9 5v14M15 5v14" />
        </>
      )}
      {name === 'tile-roof' && (
        <>
          <path d="M3 12l9-7 9 7" />
          <path d="M5 14c1.5 1.5 3.5 1.5 5 0 1.5 1.5 3.5 1.5 5 0 1.5 1.5 3.5 1.5 5 0" />
          <path d="M5 18c1.5 1.5 3.5 1.5 5 0 1.5 1.5 3.5 1.5 5 0 1.5 1.5 3.5 1.5 5 0" />
        </>
      )}
      {name === 'tin-roof' && (
        <>
          <path d="M3 13l9-7 9 7" />
          <path d="M4 17l2.5-2 2.5 2 2.5-2 2.5 2 2.5-2 2.5 2" />
        </>
      )}
      {name === 'phone' && (
        <path d="M6.5 4h3l1.5 4-2 1.5a11 11 0 0 0 5.5 5.5L16 13l4 1.5v3a2 2 0 0 1-2.2 2A15.5 15.5 0 0 1 4.5 6.2 2 2 0 0 1 6.5 4z" />
      )}
      {name === 'mail' && (
        <>
          <rect x="3" y="5" width="18" height="14" rx="2.5" />
          <path d="M4 7l8 6 8-6" />
        </>
      )}
      {name === 'clock' && (
        <>
          <circle cx="12" cy="12" r="9" />
          <path d="M12 7v5l3.5 2" />
        </>
      )}
      {name === 'map-pin' && (
        <>
          <path d="M12 21s6.5-5.6 6.5-11a6.5 6.5 0 1 0-13 0c0 5.4 6.5 11 6.5 11z" fill="var(--sun)" fillOpacity="0.35" />
          <circle cx="12" cy="10" r="2.2" />
        </>
      )}
      {name === 'check-sun' && (
        <>
          <circle cx="12" cy="12" r="7" fill="var(--sun)" />
          <path d="M12 2v2M12 20v2M2 12h2M20 12h2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M19.1 4.9l-1.4 1.4M6.3 17.7l-1.4 1.4" />
          <path d="M9 12.2l2 2 4-4.2" stroke="#1F2A44" />
        </>
      )}
      {name === 'backup' && (
        <>
          <path d="M13 3L5.5 13H12l-1 8 7.5-10H12l1-8z" fill="var(--sun)" fillOpacity="0.35" />
        </>
      )}
      {name === 'clean' && (
        <>
          <path d="M12 3l1.8 4.2L18 9l-4.2 1.8L12 15l-1.8-4.2L6 9l4.2-1.8L12 3z" fill="var(--sun)" fillOpacity="0.4" />
          <path d="M18 15l.9 2.1L21 18l-2.1.9L18 21l-.9-2.1L15 18l2.1-.9L18 15z" />
        </>
      )}
      {name === 'menu' && (
        <>
          <line x1="4" y1="7" x2="20" y2="7" />
          <line x1="4" y1="12" x2="20" y2="12" />
          <line x1="4" y1="17" x2="20" y2="17" />
        </>
      )}
      {name === 'close' && (
        <>
          <line x1="6" y1="6" x2="18" y2="18" />
          <line x1="18" y1="6" x2="6" y2="18" />
        </>
      )}
    </svg>
  );
}
