# APP ROUTER KNOWLEDGE

## OVERVIEW

`apps/web/app` is the real Next.js source root. It contains public routes, admin routes, app-only shared modules, and the runtime provider shell.

## STRUCTURE

```text
app/
|-- layout.tsx          # Root server layout, font, metadata, host detection
|-- providers.tsx       # Client provider stack
|-- (main)/             # Public home route group
|-- admin/              # Admin product routes
|-- apply/ club/ ...    # Public feature routes
|-- _api/               # ky fetcher, React Query modules, API types
|-- _components/        # App-wide components and layout
|-- _hooks/ _utils/     # App-wide hooks and helpers
|-- _store/             # Zustand stores
`-- _styles/            # Global CSS
```

## WHERE TO LOOK

| Task | Location | Notes |
| --- | --- | --- |
| Global shell | `layout.tsx` | Server component; reads host and wraps `LayoutClient`. |
| Client runtime providers | `providers.tsx` | Must stay `'use client'`; wraps children in Sentry/Cookies/React Query. |
| Public home | `(main)/page.tsx` | Static route with `revalidate` and `dynamic` exports. |
| Public feeds | `feeds` | List/detail route with route-local components, hooks, pages. |
| Public notices | `notice` | List/detail route. |
| Public documents/FAQ | `documents`, `faq` | Client pages under `_pages`. |
| Admin product | `admin` | Has its own scoped instructions. |
| API integration | `_api` | Has its own scoped instructions. |

## CONVENTIONS

- Page files default-export the route component. Server pages use `export default async function`; client pages start with `'use client'` and use `export default function`.
- Components inside `_components`, `_pages`, `_containers`, and hooks use named exports by default.
- Keep route-specific code inside the route folder. Promote to app-wide `_components`, `_hooks`, `_utils`, or `_constants` only when reused across multiple routes.
- Use aliases from `apps/web/tsconfig.json`; `@/*` means this `app/` directory, not the repo root.
- Use `@dds/shared` for UI primitives and `cn()` for conditional Tailwind classes.
- Preserve Korean copy and domain terms already used in the surrounding route.

## ANTI-PATTERNS

- Do not add `src/app`; this package uses `apps/web/app` directly.
- Do not put feature-specific state or helpers in app-wide underscore folders unless at least two routes use them.
- Do not make client components by accident: add `'use client'` only when hooks, browser APIs, events, or client providers require it.
- Do not bypass `providers.tsx` for new app-wide providers; keep provider ordering explicit there.
