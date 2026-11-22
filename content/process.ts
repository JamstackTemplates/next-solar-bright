export interface ProcessStep {
  /** Stable, URL-safe unique identifier. */
  id: string;
  /** Step title along the sun arc. */
  title: string;
  /** Plain description of what happens in this step. */
  detail: string;
  /** Typical timeframe shown in mono beneath the phase marker. */
  duration: string;
}

export const processSteps: ProcessStep[] = [
  {
    id: 'enquiry',
    title: 'Tell us about your roof and bills',
    detail: 'Send your suburb, roof type and a recent quarterly bill. No pushy sales call.',
    duration: 'Same day',
  },
  {
    id: 'roof-check',
    title: 'Satellite or on-site roof check',
    detail: 'We check roof pitch, shade, switchboard space and battery location.',
    duration: '2–4 days',
  },
  {
    id: 'written-quote',
    title: 'Fixed written quote',
    detail: 'Itemised pricing inc GST with your exact STC or battery discount shown upfront.',
    duration: 'Within a week',
  },
  {
    id: 'install-day',
    title: 'Install day',
    detail: 'Our own CEC-accredited crew fits the rails, panels, inverter and battery cleanly.',
    duration: '1–2 days',
  },
  {
    id: 'switch-on',
    title: 'Network approval and switch-on',
    detail: 'We handle SA grid paperwork, monitoring setup and handover so you can watch it spin.',
    duration: '1–3 weeks',
  },
];

export function validateProcess(steps: readonly ProcessStep[] = processSteps): void {
  const seen = new Set<string>();
  for (const step of steps) {
    if (!step.id.trim()) throw new Error('processSteps: missing id');
    if (seen.has(step.id)) throw new Error(`processSteps[${step.id}]: duplicate id`);
    seen.add(step.id);
    if (!step.title.trim()) throw new Error(`processSteps[${step.id}]: title is required`);
    if (!step.detail.trim()) throw new Error(`processSteps[${step.id}]: detail is required`);
    if (!step.duration.trim()) throw new Error(`processSteps[${step.id}]: duration is required`);
  }
}
