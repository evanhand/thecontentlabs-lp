'use client';
import { useEffect } from 'react';

export function PostHogProvider({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    if (typeof window !== 'undefined' && process.env.NEXT_PUBLIC_POSTHOG_KEY) {
      const key = process.env.NEXT_PUBLIC_POSTHOG_KEY;
      import('posthog-js').then(({ default: posthog }) => {
        posthog.init(key, {
          api_host: 'https://us.i.posthog.com',
          capture_pageview: true,
          capture_pageleave: true,
          autocapture: true,
          // Capture window.onerror + unhandledrejection so $exception events
          // carry the actual error message/type/stack, not just a URL.
          capture_exceptions: true,
        });
      });
    }
  }, []);

  return <>{children}</>;
}
