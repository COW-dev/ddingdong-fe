---
title: Defer Non-Critical Third-Party Libraries
impact: MEDIUM
impactDescription: loads after hydration
tags: bundle, third-party, analytics, defer
---

## Defer Non-Critical Third-Party Libraries

Analytics, logging, and error tracking don't block user interaction. Load them after hydration.

**Incorrect (blocks initial bundle):**

```tsx
import { Analytics } from '@vercel/analytics/react';

export default function RootLayout({ children }) {
  return (
    <html>
      <body>
        {children}
        <Analytics />
      </body>
    </html>
  );
}
```

**Correct (loads after hydration):**

`RootLayout` is a Server Component, and `next/dynamic(..., { ssr: false })` is only valid in Client Components — using it directly here throws. Move the deferred import into its own Client Component wrapper, and render just that wrapper from `RootLayout`:

```tsx
// deferred-analytics.tsx
'use client';

import dynamic from 'next/dynamic';

const Analytics = dynamic(
  () => import('@vercel/analytics/react').then((m) => m.Analytics),
  { ssr: false },
);

export function DeferredAnalytics() {
  return <Analytics />;
}
```

```tsx
// layout.tsx
import { DeferredAnalytics } from './deferred-analytics';

export default function RootLayout({ children }) {
  return (
    <html>
      <body>
        {children}
        <DeferredAnalytics />
      </body>
    </html>
  );
}
```
