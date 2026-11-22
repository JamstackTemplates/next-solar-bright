'use client';

import { useState, type KeyboardEvent } from 'react';
import { dialFrames, type SunDialFrame } from '../content/savings';
import { SunDialSvg } from './sun-dial-svg';

const FLOW_LEGEND: { key: keyof SunDialFrame['flows']; label: string; color: string }[] = [
  { key: 'panelsToHome', label: 'Panels → Home (free daytime power)', color: 'var(--primary)' },
  { key: 'panelsToBattery', label: 'Panels → Battery (storing surplus)', color: 'var(--leaf)' },
  { key: 'panelsToGrid', label: 'Panels → Grid (feed-in export)', color: 'var(--sun)' },
  { key: 'batteryToHome', label: 'Battery → Home (evening solar)', color: 'var(--leaf)' },
  { key: 'gridToHome', label: 'Grid → Home (bought power)', color: 'var(--primary)' },
];

/** Interactive Sun-path Dial used on /savings/ with radio-group semantics & no-JS strip fallback. */
export function InteractiveSunDial({ frames = dialFrames }: { frames?: readonly SunDialFrame[] }) {
  const defaultIndex = Math.max(0, frames.findIndex(f => f.id === 'noon'));
  const [selectedIndex, setSelectedIndex] = useState(defaultIndex);
  const current = frames[selectedIndex] ?? frames[0];

  function handleKeyDown(event: KeyboardEvent<HTMLButtonElement>, index: number) {
    let next = index;
    if (event.key === 'ArrowRight' || event.key === 'ArrowDown') {
      next = (index + 1) % frames.length;
    } else if (event.key === 'ArrowLeft' || event.key === 'ArrowUp') {
      next = (index - 1 + frames.length) % frames.length;
    } else if (event.key === 'Home') {
      next = 0;
    } else if (event.key === 'End') {
      next = frames.length - 1;
    } else {
      return;
    }
    event.preventDefault();
    setSelectedIndex(next);
    document.getElementById(`dial-chip-${frames[next].id}`)?.focus();
  }

  return (
    <div className="poster-card overflow-hidden p-0">
      {/* Top telemetry status header */}
      <div className="flex flex-wrap items-center justify-between gap-2 border-b-2 border-ink bg-ink px-5 py-3 font-mono text-xs font-bold uppercase tracking-wider text-bg">
        <span className="inline-flex items-center gap-2">
          <span className="inline-block h-2.5 w-2.5 rounded-full bg-sun" aria-hidden="true" />
          <span>Adelaide Sun-Path Telemetry · Frame {selectedIndex + 1} of {frames.length}</span>
        </span>
        <span className="rounded-full bg-sun px-3 py-0.5 text-[#1F2A44]">
          {current.isEvening ? '☾ Evening Battery Discharge' : `☀ ${current.sunAngleDeg}° Sun Arc`}
        </span>
      </div>

      <div className="solar-grid-bg grid gap-8 p-5 sm:p-8 lg:grid-cols-[1.35fr_0.9fr] lg:items-center">
        <div>
          <div className="rounded-2xl border-2 border-ink bg-surface-elevated p-3 sm:p-4">
            <SunDialSvg frame={current} />
          </div>

          {/* Six time chips with radio-group semantics on a connected timeline rail */}
          <div
            role="radiogroup"
            aria-label="Time of day on solar"
            className="mt-5 flex flex-wrap justify-center gap-2 rounded-2xl border-2 border-ink bg-surface p-2.5"
          >
            {frames.map((frame, index) => {
              const checked = index === selectedIndex;
              return (
                <button
                  key={frame.id}
                  id={`dial-chip-${frame.id}`}
                  type="button"
                  role="radio"
                  aria-checked={checked}
                  tabIndex={checked ? 0 : -1}
                  onClick={() => setSelectedIndex(index)}
                  onKeyDown={event => handleKeyDown(event, index)}
                  className={`min-h-11 rounded-full border-2 border-ink px-4 py-2 font-mono text-sm font-bold transition-colors ${
                    checked
                      ? 'bg-primary text-on-accent shadow-[0_3px_0_var(--ink)]'
                      : 'bg-bg text-ink hover:bg-surface-elevated'
                  }`}
                >
                  {frame.label}
                </button>
              );
            })}
          </div>
        </div>

        {/* Active frame caption + live flow legend */}
        <div className="space-y-5">
          <div className="rounded-xl border-2 border-ink bg-surface p-4">
            <p className="font-mono text-xs font-bold uppercase tracking-wider text-accent-ink">
              Illustrative frame · {current.label}
            </p>
            <p className="mt-2 text-lg font-semibold leading-snug text-ink" aria-live="polite">
              {current.caption}
            </p>
          </div>

          <div>
            <p className="font-mono text-xs font-bold uppercase tracking-wider text-muted">
              Active energy flows
            </p>
            <ul className="mt-3 space-y-2.5">
              {FLOW_LEGEND.map(item => {
                const active = current.flows[item.key];
                return (
                  <li
                    key={item.key}
                    className={`flex items-center gap-3 rounded-lg border px-3 py-2 text-sm transition-opacity ${
                      active
                        ? 'border-ink bg-bg font-semibold text-ink opacity-100'
                        : 'border-line bg-transparent text-muted opacity-55'
                    }`}
                  >
                    <span
                      className="inline-block h-3 w-3 shrink-0 rounded-full border border-ink"
                      style={{ backgroundColor: active ? item.color : 'transparent' }}
                      aria-hidden="true"
                    />
                    <span>{item.label}</span>
                    <span className="ml-auto font-mono text-xs uppercase">
                      {active ? 'On' : 'Off'}
                    </span>
                  </li>
                );
              })}
            </ul>
          </div>
        </div>
      </div>

      {/* Progressive enhancement fallback when JavaScript is unavailable */}
      <noscript>
        <div className="mt-8 border-t-2 border-line pt-6">
          <p className="font-mono text-xs font-bold uppercase tracking-wider text-muted">
            All six illustrative frames (JavaScript off)
          </p>
          <ol className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {frames.map(frame => (
              <li key={frame.id} className="rounded-xl border-2 border-ink bg-bg p-3">
                <p className="font-mono text-sm font-bold text-accent-ink">{frame.label}</p>
                <p className="mt-1 text-sm text-ink">{frame.caption}</p>
              </li>
            ))}
          </ol>
        </div>
      </noscript>
    </div>
  );
}
