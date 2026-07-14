---
title: Cache Property Access in Loops
impact: LOW-MEDIUM
impactDescription: reduces lookups
tags: javascript, loops, optimization, caching
---

## Cache Property Access in Loops

Cache object property lookups in hot paths — but only when the accessed value is invariant for the duration of the loop. If `obj.config.settings.value` can change inside the loop body (e.g. it's a getter, or mutated by `process`), or if `arr.length` changes because the loop mutates `arr`, caching the value changes behavior, not just performance.

**Incorrect (3 lookups × N iterations):**

```typescript
for (let i = 0; i < arr.length; i++) {
  process(obj.config.settings.value);
}
```

**Correct (1 lookup total):**

```typescript
const value = obj.config.settings.value;
const len = arr.length;
for (let i = 0; i < len; i++) {
  process(value);
}
```
