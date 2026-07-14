---
title: Optimize SVG Precision
impact: LOW
impactDescription: reduces file size
tags: rendering, svg, optimization, svgo
---

## Optimize SVG Precision

Reduce SVG coordinate precision to decrease file size. The optimal precision depends on the viewBox size, but in general reducing precision should be considered.

**Incorrect (excessive precision):**

```svg
<path d="M 10.293847 20.847362 L 30.938472 40.192837" />
```

**Better for a small icon at this viewBox (1 decimal place):**

```svg
<path d="M 10.3 20.8 L 30.9 40.2" />
```

`precision=1` is not a universal safe default — how much rounding an asset can tolerate depends on its `viewBox` scale, and how much curves, strokes, and transforms are affected by rounding. Larger or more detailed artwork may need more precision to avoid visibly distorting shapes. Visually verify each asset after reducing precision rather than applying the same value everywhere.

**Automate with SVGO:**

```bash
npx svgo --precision=1 --multipass icon.svg
```
