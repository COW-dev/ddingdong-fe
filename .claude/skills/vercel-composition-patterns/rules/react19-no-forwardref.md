---
title: React 19 API Changes
impact: MEDIUM
impactDescription: cleaner component definitions and context usage
tags: react19, refs, context, hooks
---

## React 19 API Changes

> **⚠️ React 19+ only.** Skip this if you're on React 18 or earlier.

In React 19, `ref` is now a regular prop (no `forwardRef` wrapper needed). React 19 also adds `use()`, which can read context (like `useContext()`, which is still valid) but—unlike `useContext()`—can be called conditionally and inside loops.

**Incorrect (forwardRef in React 19):**

```tsx
const ComposerInput = forwardRef<TextInput, Props>((props, ref) => {
  return <TextInput ref={ref} {...props} />;
});
```

**Correct (ref as a regular prop):**

```tsx
function ComposerInput({
  ref,
  ...props
}: Props & { ref?: React.Ref<TextInput> }) {
  return <TextInput ref={ref} {...props} />;
}
```

**Still valid (useContext):**

```tsx
const value = useContext(MyContext);
```

**Also valid, and usable conditionally/in loops (use):**

```tsx
const value = use(MyContext);
```

`use()` can also be called conditionally, unlike `useContext()`.
