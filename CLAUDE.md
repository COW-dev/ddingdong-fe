# CLAUDE.md

This file provides guidance to Claude when working with code in this repository.

## Project Overview

ddingdong-fe is Wanted Lab's Ddingdong frontend project. It's a Next.js 15 App Router application using React Query, Zustand, and @dds.

## Common Commands

This is a pnpm/Turbo monorepo (`pnpm@9.15.4`) — use `pnpm`, not `npm`. Root scripts fan out through Turbo to all packages; use `pnpm --filter @ddingdong/web <script>` to target only the app.

```bash
# Dev server
pnpm dev

# Production build
pnpm build

# Production server (app package only, no root script)
pnpm --filter @ddingdong/web start

# Lint
pnpm lint

# Type check
pnpm check-types

# Test
pnpm test
```

## Tech Stack

```text
Next.js 15 (App Router)
    ↓
React 19, React Query, Zustand
    ↓
@dds (UI components)
    ↓
Tailwind CSS, ky (HTTP client)
```

## Architecture

### Page Structure

All `app/**/page.tsx` route files use default exports:

- **Server pages**: `export default async function PageName()` — Server Components
- **Client pages**: Add `'use client'` at the top, then `export default function PageName()`

**Client components used inside a page** (e.g. files in `_components/`, `_pages/`, `_containers/`) use named exports: `export function ComponentName()` with `'use client'` at the top when needed.

### Component Pattern

- Use `@dds` for UI primitives (Flex, Button, Input, Body1/2/3, Icon, etc.)
- Use Tailwind CSS via `className`; use `cn()` for conditional classes
- Props type: use `Props` for single-props components; use `{DomainName}Props` (e.g. `FeedCardProps`) when multiple props types exist in the same file or domain

```tsx
'use client';

import { Flex, Body2, Body3, Icon } from '@dds/shared';

import { cn } from '@/_utils/cn';

type Props = {
  likeCount: number;
  commentCount: number;
  viewCount: number;
  size?: 'sm' | 'md';
  onLike?: () => void;
};

export function FeedStats({
  likeCount,
  commentCount,
  viewCount,
  size = 'md',
  onLike,
}: Props) {
  const iconSize = size === 'sm' ? 18 : 22;
  const TextComponent = size === 'sm' ? Body3 : Body2;

  return (
    <Flex gap={4} alignItems="center">
      <Flex
        as={onLike ? 'button' : 'div'}
        gap={1}
        alignItems="center"
        onClick={onLike}
        className={cn(onLike && 'cursor-pointer')}
      >
        <Icon name="like" size={iconSize} color={onLike ? 'red' : 'gray'} />
        <TextComponent className="text-gray-600">{likeCount}</TextComponent>
      </Flex>
      <Flex gap={1} alignItems="center">
        <Icon name="comment" size={iconSize} color="gray" />
        <TextComponent className="text-gray-600">{commentCount}</TextComponent>
      </Flex>
      <Flex gap={1} alignItems="center">
        <Icon name="eye" size={iconSize} color="gray" />
        <TextComponent className="text-gray-600">{viewCount}</TextComponent>
      </Flex>
    </Flex>
  );
}
```

### Folder Structure

No top-level `src/` — the app package's source root is `apps/web/app`. There is no separate top-level `components/`, `hooks/`, `constants/`, `types/`, or `utils/` outside routes; shared, non-route-specific code lives in the underscore-prefixed folders directly under `app/` (e.g. `app/_components/common`, `app/_components/layout`).

```text
ddingdong-fe/
├── apps/web/
│   ├── app/
│   │   ├── (main)/
│   │   │   ├── _components/
│   │   │   ├── _containers/
│   │   │   ├── _hooks/
│   │   │   ├── _pages/
│   │   │   └── page.tsx
│   │   ├── admin/
│   │   │   ├── (home)/ apply/ banner/ club/ documents/ faq/ feed/
│   │   │   ├── fix/ login/ member/ my-club/ notice/ ranking/ report/
│   │   │   └── _components/
│   │   ├── apply/ club/ documents/ feeds/ notice/ faq/
│   │   ├── _api/          # fetcher.ts, queries/, mutations/, types/
│   │   ├── _actions/
│   │   ├── _components/   # common/, layout/ — shared across routes
│   │   ├── _constants/
│   │   ├── _hooks/
│   │   ├── _store/
│   │   ├── _lib/
│   │   ├── _utils/
│   │   ├── _styles/
│   │   ├── providers.tsx
│   │   └── layout.tsx
│   └── test/               # Vitest tests (mirrors app/ route structure)
├── packages/shared/         # @dds/shared design system (ui/, lib/)
├── packages/eslint-config/
├── packages/tailwind-config/
└── packages/typescript-config/
```

Route-level structure:

```text
[route]/
├── _components/     # Route-specific components
├── _containers/     # Layout wrapper components (children-only, no data/logic)
├── _hooks/
├── _pages/          # Client page components
├── _utils/
├── _constants/
├── _schemas/
├── _contexts/
├── _types/
└── page.tsx
```

## Code Conventions

- **Conventional Commits**: `<type>: <description>` (no scope — not used in this repo) — type enum enforced by commitlint (`.commitlintrc.json`): `build`, `chore`, `ci`, `docs`, `feat`, `fix`, `hotfix`, `refactor`, `revert`, `style`, `test`
- **Variables**: camelCase
- **Functions**: Arrow functions
- **Components**: `function` keyword (not arrow functions)
- **Types**: Use `type`, not `interface`
- **Props**: Use `Props` for single-props components; use `{DomainName}Props` (e.g. `FeedCardProps`) when multiple props types exist in the same file or domain
- **Import ordering**: Groups separated by newlines — external, builtin, internal, parent, sibling, index, object, type
- **Naming**: PascalCase for types, camelCase for variables/functions

## Testing

- Test success, failure, and edge cases
- Add failure cases based on Swagger error responses
- Test cases must be clear about what they verify; avoid over-abstraction
- Test scenarios should only cover the behavior under test
- Avoid type assertions

**Test folder structure** (root is `apps/web/test/`, runner is Vitest — see `apps/web/vitest.config.ts`):

```text
apps/web/test/
└── 페이지명/
    ├── 페이지명.test.tsx
    ├── 훅이름.test.tsx
    ├── components/
    │   └── 컴포넌트명.test.tsx
    └── 페이지명.data.ts
```

**Mock data rules:**

- Declare mock data inside `it` by default
- Extract to `apps/web/test/페이지명/페이지명.data.ts` for page-specific shared mocks
- Extract to `apps/web/test/shared/[domain]Mock.ts` only when shared across multiple pages
- Page-specific mocks only in that file

**Mocking and rendering rules:**

- Mock API responses only
- Do not mock React Query internals; keep its default behavior
- Use only the shared `render` from the util (with `QueryClientProvider`, `CookiesProvider`, etc.)

## CI Checks on PRs

`.github/workflows/ci.yml` runs three jobs on pull requests: ESLint (`pnpm lint`), TypeScript (`pnpm check-types`), and build (`pnpm build`). Commit message format (commitlint) is enforced locally by the `.husky/commit-msg` hook, not in CI.
