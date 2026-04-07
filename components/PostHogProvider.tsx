'use client';
import posthog from 'posthog-js';
import { useEffect } from 'react';

export function PostHogProvider({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    if (typeof window !== 'undefined' && process.env.NEXT_PUBLIC_POSTHOG_KEY) {
      posthog.init(process.env.NEXT_PUBLIC_POSTHOG_KEY, {
        api_host: 'https://us.i.posthog.com',
        capture_pageview: true,
        capture_pageleave: true,
        autocapture: true,
      });
    }
  }, []);

  return <>{children}</>;
}
