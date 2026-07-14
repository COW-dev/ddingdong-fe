---
title: Use Lazy State Initialization
impact: MEDIUM
impactDescription: wasted computation on every render
tags: react, hooks, useState, performance, initialization
---

## Use Lazy State Initialization

Pass a function to `useState` for expensive initial values. Without the function form, the initializer runs on every render even though the value is only used once.

**Incorrect (runs on every render):**

```tsx
function FilteredList({ items }: { items: Item[] }) {
  // buildSearchIndex() runs on EVERY render, even after initialization
  const [searchIndex, setSearchIndex] = useState(buildSearchIndex(items));
  const [query, setQuery] = useState('');

  // When query changes, buildSearchIndex runs again unnecessarily
  return <SearchResults index={searchIndex} query={query} />;
}

function UserProfile() {
  // JSON.parse runs on every render
  const [settings, setSettings] = useState(
    JSON.parse(localStorage.getItem('settings') || '{}'),
  );

  return <SettingsForm settings={settings} onChange={setSettings} />;
}
```

**Correct (runs only once):**

```tsx
function FilteredList({ items }: { items: Item[] }) {
  // buildSearchIndex() runs ONLY on initial render
  const [searchIndex, setSearchIndex] = useState(() => buildSearchIndex(items));
  const [query, setQuery] = useState('');

  return <SearchResults index={searchIndex} query={query} />;
}

function UserProfile() {
  // Client Components can still be prerendered on the server, where
  // `localStorage` doesn't exist — reading it inside the initializer
  // would throw a ReferenceError. Start with a shared default and load
  // the stored value in an effect, which only runs in the browser.
  const [settings, setSettings] = useState({});

  useEffect(() => {
    const stored = localStorage.getItem('settings');
    if (stored) setSettings(JSON.parse(stored));
  }, []);

  return <SettingsForm settings={settings} onChange={setSettings} />;
}
```

Use lazy initialization when computing initial values by building data structures (indexes, maps) or performing heavy transformations from props/arguments already available during render. For `localStorage`/`sessionStorage`/DOM reads, initialize with a server/client-safe default and read the stored value in `useEffect` instead, since those APIs aren't available during server rendering.

For simple primitives (`useState(0)`), direct references (`useState(props.value)`), or cheap literals (`useState({})`), the function form is unnecessary.
