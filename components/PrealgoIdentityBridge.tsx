'use client';

import { useEffect } from 'react';

/**
 * Stitches identity for visitors arriving from prealgo. Prealgo links append
 * ?ph_distinct_id=<id> + prealgo_first_* attribution params. We alias the
 * prealgo identity into the current TCL identity so the cross-app funnel
 * (prealgo visit -> TCL signup) shows up as a single person.
 *
 * Why the retry loop: PostHogProvider's useEffect calls posthog.init() async
 * AFTER child useEffects fire (React parent effects run after children's), so
 * a single check of posthog.__loaded would always race-fail and the bridge
 * would silently bail. We poll until init finishes or 5s elapses.
 */
export function PrealgoIdentityBridge() {
  useEffect(() => {
    if (typeof window === 'undefined') return;
    const params = new URLSearchParams(window.location.search);
    const prealgoId = params.get('ph_distinct_id');
    if (!prealgoId) return;

    const PREALGO_BRIDGED_KEY = 'tcl_prealgo_bridged_id';
    if (sessionStorage.getItem(PREALGO_BRIDGED_KEY) === prealgoId) return;

    let cancelled = false;
    let attempts = 0;
    const MAX_ATTEMPTS = 50; // 50 * 100ms = 5s

    const tryBridge = () => {
      if (cancelled) return;
      attempts += 1;

      import('posthog-js').then(({ default: posthog }) => {
        if (cancelled) return;
        if (!posthog.__loaded) {
          if (attempts < MAX_ATTEMPTS) setTimeout(tryBridge, 100);
          return;
        }

        // alias() merges the anonymous prealgo distinct_id with the current TCL
        // distinct_id so events from both apps are attributed to one person.
        try {
          posthog.alias(prealgoId);
        } catch {
          // alias can throw if already aliased; safe to ignore
        }

        const personProps: Record<string, string | null> = {
          arrived_from: 'prealgo',
          prealgo_distinct_id: prealgoId,
          prealgo_first_utm_source: params.get('prealgo_first_utm_source'),
          prealgo_first_utm_medium: params.get('prealgo_first_utm_medium'),
          prealgo_first_utm_campaign: params.get('prealgo_first_utm_campaign'),
          prealgo_first_referrer_domain: params.get('prealgo_first_referrer_domain'),
        };
        posthog.people.set_once(personProps);

        posthog.capture('arrived_from_prealgo', {
          prealgo_distinct_id: prealgoId,
          utm_medium: params.get('utm_medium'),
          prealgo_first_utm_source: params.get('prealgo_first_utm_source'),
        });

        sessionStorage.setItem(PREALGO_BRIDGED_KEY, prealgoId);
      });
    };

    tryBridge();
    return () => {
      cancelled = true;
    };
  }, []);

  return null;
}
