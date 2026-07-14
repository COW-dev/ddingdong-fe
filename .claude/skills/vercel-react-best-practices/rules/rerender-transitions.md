---
title: Use Transitions for Non-Urgent Updates
impact: MEDIUM
impactDescription: maintains UI responsiveness
tags: rerender, transitions, startTransition, performance
---

## Use Transitions for Non-Urgent Updates

Mark frequent, non-urgent state updates as transitions to maintain UI responsiveness. Note that `startTransition` doesn't reduce how often the state update fires — the `scroll` handler here still runs (and calls `setScrollY`) on every scroll event; it only marks the resulting render as interruptible/non-urgent so it doesn't block more urgent updates. If the raw update frequency itself is the problem, pair this with throttling or `requestAnimationFrame`. `startTransition` pays off most when the state update drives an expensive derived render, not just to cut down on renders from a high-frequency event.

**Incorrect (blocks UI on every scroll):**

```tsx
function ScrollTracker() {
  const [scrollY, setScrollY] = useState(0);
  useEffect(() => {
    const handler = () => setScrollY(window.scrollY);
    window.addEventListener('scroll', handler, { passive: true });
    return () => window.removeEventListener('scroll', handler);
  }, []);
}
```

**Correct (non-blocking updates):**

```tsx
import { startTransition } from 'react';

function ScrollTracker() {
  const [scrollY, setScrollY] = useState(0);
  useEffect(() => {
    const handler = () => {
      startTransition(() => setScrollY(window.scrollY));
    };
    window.addEventListener('scroll', handler, { passive: true });
    return () => window.removeEventListener('scroll', handler);
  }, []);
}
```
