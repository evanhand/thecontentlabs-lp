/**
 * Lazy PostHog wrapper — mirrors the dashboard app's pattern so the same
 * event names fire from both halves of the funnel (LP and dashboard).
 * All calls are fire-and-forget; they queue until posthog-js loads.
 */

let ph: typeof import('posthog-js').default | null = null;
let loading: Promise<void> | null = null;

function load(): Promise<void> {
  if (ph) return Promise.resolve();
  if (loading) return loading;
  loading = import('posthog-js').then(({ default: posthog }) => {
    ph = posthog;
  });
  return loading;
}

export function capture(event: string, properties?: Record<string, unknown>) {
  if (typeof window === 'undefined') return;
  load().then(() => ph?.capture(event, properties));
}
