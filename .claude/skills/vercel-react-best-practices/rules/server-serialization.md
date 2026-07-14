---
title: Minimize Serialization at RSC Boundaries
impact: HIGH
impactDescription: reduces data transfer size
tags: server, rsc, serialization, props
---

## Minimize Serialization at RSC Boundaries

Props passed from a Server Component to a Client Component are serialized into the RSC payload (the "Flight" format React streams to the client), not turned into plain HTML strings. That payload size still directly impacts page weight and load time, so **size matters a lot**. Only pass fields that the client actually uses.

**Incorrect (serializes all 50 fields):**

```tsx
async function Page() {
  const user = await fetchUser(); // 50 fields
  return <Profile user={user} />;
}
```

```tsx
// profile.tsx
'use client';

function Profile({ user }: { user: User }) {
  return <div>{user.name}</div>; // uses 1 field
}
```

**Correct (serializes only 1 field):**

```tsx
async function Page() {
  const user = await fetchUser();
  return <Profile name={user.name} />;
}
```

```tsx
// profile.tsx
'use client';

function Profile({ name }: { name: string }) {
  return <div>{name}</div>;
}
```
