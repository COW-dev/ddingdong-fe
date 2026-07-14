---
title: Initialize App Once, Not Per Mount
impact: LOW-MEDIUM
impactDescription: avoids duplicate init in development
tags: initialization, useEffect, app-startup, side-effects
---

## Initialize App Once, Not Per Mount

Do not put app-wide initialization that must run once per app load inside `useEffect([])` of a component. Components can remount and effects will re-run. Use a module-level guard or top-level init in the entry module instead.

> **Client-only.** A module-level guard like `didInit` lives in a single module instance. On the server, that module can be shared across requests (or re-evaluated per request, depending on the runtime), so it does not reliably guarantee "once" semantics there. Only rely on this pattern in Client Components (`'use client'`) for browser-only initialization.

**Incorrect (runs twice in dev, re-runs on remount):**

```tsx
'use client';

function Comp() {
  useEffect(() => {
    loadFromStorage();
    checkAuthToken();
  }, []);

  // ...
}
```

**Correct (once per app load):**

```tsx
'use client';

let didInit = false;

function Comp() {
  useEffect(() => {
    if (didInit) return;
    didInit = true;
    loadFromStorage();
    checkAuthToken();
  }, []);

  // ...
}
```

Reference: [Initializing the application](https://react.dev/learn/you-might-not-need-an-effect#initializing-the-application)
