---
title: CSS content-visibility for Long Lists
impact: HIGH
impactDescription: faster initial render
tags: rendering, css, content-visibility, long-lists
---

## CSS content-visibility for Long Lists

Apply `content-visibility: auto` to defer off-screen rendering.

**CSS:**

```css
.message-item {
  content-visibility: auto;
  /* Use your actual average item height here — a size that doesn't match
     real content causes layout shift as items scroll into view. */
  contain-intrinsic-size: 0 80px;
}
```

**Example:**

```tsx
function MessageList({ messages }: { messages: Message[] }) {
  return (
    <div className="h-screen overflow-y-auto">
      {messages.map((msg) => (
        <div key={msg.id} className="message-item">
          <Avatar user={msg.author} />
          <div>{msg.content}</div>
        </div>
      ))}
    </div>
  );
}
```

The browser skips layout/paint work for off-screen items, which can meaningfully speed up initial render for long lists — the exact number of items skipped and the resulting speedup depend on viewport size, item count, and content, so treat "10× faster" as anecdotal rather than a guaranteed result. Measure on your actual list before relying on a specific number.
