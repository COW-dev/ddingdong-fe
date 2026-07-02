# PROJECT KNOWLEDGE BASE

**Generated:** 2026-07-01 **Commit:** 51b5387c **Branch:** main

## OVERVIEW

Ddingdong FE is a pnpm/Turbo monorepo. The product app is a Next.js 15 App Router package in `apps/web`; the local design system is `packages/shared` and is consumed as `@dds/shared`.

## STRUCTURE

```text
ddingdong-fe/
|-- apps/web/                 # Next.js app package; source root is app/
|   |-- app/                  # App Router routes, providers, app-only API/hooks/state
|   |-- public/               # Fonts and static assets
|   |-- next.config.js        # Sentry-wrapped Next config and image allowlist
|   `-- package.json          # App scripts: dev/build/lint/check-types
|-- packages/shared/          # @dds/shared UI library and small lib helpers
|-- packages/eslint-config/   # Workspace ESLint config package
|-- packages/tailwind-config/ # Workspace Tailwind preset package
|-- packages/typescript-config/
|-- packages/_templates/      # Hygen templates for package generation
|-- turbo.json                # Task graph and build outputs
`-- pnpm-workspace.yaml       # Workspace membership and catalog versions
```

## WHERE TO LOOK

| Task | Location | Notes |
| --- | --- | --- |
| App shell, metadata, analytics | `apps/web/app/layout.tsx` | Host prefix decides admin layout behavior. |
| Client provider stack | `apps/web/app/providers.tsx` | Sentry, cookies, React Query, toast, upload progress, ChannelTalk. |
| App routes | `apps/web/app/**/page.tsx` | Default exports; server pages are default unless marked `'use client'`. |
| API calls and data types | `apps/web/app/_api` | `fetcher.ts` is the central ky client. |
| Shared UI primitives | `packages/shared/ui` | Export through `packages/shared/index.ts`. |
| Shared helper utilities | `packages/shared/lib` | `cn`, colors, and package-level helpers. |
| Workspace scripts | `package.json`, `turbo.json` | Root commands fan out through Turbo. |
| CI behavior | `.github/workflows/ci.yml` | PR checks run workspace quality gates. |

## CODE MAP

| Symbol | Type | Location | Refs | Role |
| --- | --- | --- | --- | --- |
| `RootLayout` | async Server Component | `apps/web/app/layout.tsx` | App Router entry | Loads font, metadata, providers, layout, analytics. |
| `Providers` | Client Component | `apps/web/app/providers.tsx` | Root layout | Composes runtime client providers. |
| `ClientQueryProvider` | Client Component | `apps/web/app/_api/ClientQueryProvider.tsx` | Provider stack | Owns React Query client setup. |
| `instance` | ky client | `apps/web/app/_api/fetcher.ts` | Queries/mutations | Adds auth header, timeout, credentials, error hooks. |
| `fetcher` | HTTP facade | `apps/web/app/_api/fetcher.ts` | API modules | Typed `get/post/put/delete/patch` wrappers. |
| `parseResponse` | async helper | `apps/web/app/_api/fetcher.ts` | Fetcher methods | Converts JSON/blob responses and reports parse errors. |
| `ApiError` | Error class | `apps/web/app/_api/fetcher.ts` | Error hook | Normalized API error shape. |
| `OverviewPage` | async Server Component | `apps/web/app/(main)/page.tsx` | Public home route | Static public landing route. |
| `Header`, `Button`, `Flex`, `Icon` | UI exports | `packages/shared/index.ts` | App imports as `@dds/shared` | Shared design system surface. |
| `cn` | utility export | `packages/shared/lib/core.ts` | App and UI components | `clsx`/`tailwind-merge` class combiner. |

TypeScript LSP was unavailable in this harness, so refs above are role-based from route entry points, exports, and call-site searches rather than live LSP counts.

## CONVENTIONS

- Use pnpm. Root scripts are Turbo wrappers: `pnpm dev`, `pnpm build`, `pnpm lint`, `pnpm check-types`.
- The actual app source is `apps/web/app`; do not create a top-level `src/` tree for app code.
- App path aliases are defined in `apps/web/tsconfig.json`: `@/*` maps to `apps/web/app/*`, with explicit aliases for `_api`, `_components`, `_utils`, `_store`, `_hooks`, `_constants`, `_types`, and `_lib`.
- Route `page.tsx` files default-export the page component. Route-local client components in `_components`, `_pages`, `_containers`, and hooks use named exports unless an existing local pattern differs.
- Prefer `@dds/shared` primitives before introducing app-local UI primitives.
- Components use `function ComponentName(...)`; ordinary utilities and hooks commonly use arrow functions.
- Use `type`, not `interface`, for new TypeScript shapes.

## ANTI-PATTERNS (THIS PROJECT)

- Do not edit `apps/web/.next`, `packages/shared/dist`, `.turbo`, `node_modules`, `coverage`, `out`, or `build`; these are generated/vendor outputs.
- Do not treat `CLAUDE.md` as a fresher source than this file; it currently mirrors older root guidance.
- Do not duplicate API error handling in feature modules; keep token expiration, Sentry capture, and response parsing centered in `_api/fetcher.ts`.
- Do not import directly from `packages/shared/dist`; source changes belong in `packages/shared/ui` or `packages/shared/lib`.
- Current explicit TODO: `apps/web/app/admin/member/_components/ExcelDropdown.tsx` notes replacing the Excel image.

## UNIQUE STYLES

- Route folders use leading-underscore local modules: `_components`, `_containers`, `_hooks`, `_pages`, `_utils`, `_constants`, `_schemas`, `_contexts`, `_types`.
- Admin and public routes live in the same App Router tree; admin host behavior is resolved in `RootLayout` and `LayoutClient`.
- Many user-facing strings are Korean; preserve surrounding tone and terminology when editing copy.
- Shared UI components usually have `Component.tsx`, `Component.stories.tsx`, and `index.ts` in the component folder.

## COMMANDS

```bash
pnpm dev
pnpm build
pnpm lint
pnpm lint:fix
pnpm check-types
pnpm --filter @ddingdong/web dev
pnpm --filter @dds/shared storybook
```

## NOTES

- Node engine is `>=22`; package manager is `pnpm@9.15.4`.
- Turbo build outputs include `.next/**` and `dist/**`; cache artifacts should not drive documentation placement.
- No test files were found under `test`, `apps/web/test`, or `apps/web/__tests__` during init-deep discovery.
