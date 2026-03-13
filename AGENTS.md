# AGENTS.md

This file provides guidance to AI coding agents when working with code in this repository.

## Project Overview

ddingdong-fe is Wanted Lab's Ddingdong frontend project. It's a Next.js 15 App Router application using React Query, Zustand, and ddingdong-design-system.

## Common Commands

```bash
# Dev server
npm run dev

# Production build
npm run build

# Production server
npm start

# Lint
npm run lint

# Test
npm run test
```

## Tech Stack

```text
Next.js 15 (App Router)
    ↓
React 19, React Query, Zustand
    ↓
ddingdong-design-system (UI components)
    ↓
Tailwind CSS, ky (HTTP client)
```

## Architecture

### Page Structure

- **Server pages**: `export default async function PageName()` — Server Components
- **Client pages**: `export function PageName()` or `export default function PageName()` with `'use client'`

### Component Pattern

- Use `ddingdong-design-system` for UI primitives (Flex, Button, Input, Body1/2/3, Icon, etc.)
- Use Tailwind CSS via `className`; use `cn()` for conditional classes
- Props type: use `Props`

```tsx
'use client';

import { Flex, Body2, Body3, Icon } from 'ddingdong-design-system';

import { cn } from '@/utils/cn';

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

```text
src/
├── app/
│   ├── (main)/
│   │   ├── _components/
│   │   ├── _containers/
│   │   ├── _hooks/
│   │   ├── _pages/
│   │   └── page.tsx
│   ├── admin/
│   │   ├── apply/
│   │   ├── banner/
│   │   ├── club/
│   │   ├── documents/
│   │   ├── feed/
│   │   ├── fix/
│   │   ├── member/
│   │   ├── notice/
│   │   ├── ranking/
│   │   └── report/
│   ├── apply/
│   ├── club/
│   ├── documents/
│   ├── feeds/
│   ├── notice/
│   ├── faq/
│   ├── _api/
│   ├── _actions/
│   ├── providers.tsx
│   └── layout.tsx
├── components/
│   ├── layout/
│   └── common/
├── hooks/
├── constants/
├── types/
└── utils/
```

Route-level structure:

```text
[route]/
├── _components/     # Route-specific components
├── _containers/
├── _hooks/
├── _pages/          # Client page components
├── _utils/
├── _constants/
└── page.tsx         # Server page
```

## Code Conventions

- **Conventional Commits**: `<type>(<scope>): <description>` — enforced by commitlint
- **Variables**: camelCase
- **Functions**: Arrow functions
- **Components**: `function` keyword (not arrow functions)
- **Types**: Use `type`, not `interface`
- **Props**: Use `Props` for component props type
- **Import ordering**: Groups separated by newlines — external, builtin, internal, parent, sibling, index, object, type
- **Naming**: PascalCase for types, camelCase for variables/functions

## Testing

- Test success, failure, and edge cases
- Add failure cases based on Swagger error responses
- Test cases must be clear about what they verify; avoid over-abstraction
- Test scenarios should only cover the behavior under test
- Avoid type assertions

**Test folder structure:**

```text
test/
└── 페이지명/
    ├── 페이지명.test.tsx
    ├── 훅이름.test.tsx
    ├── components/
    │   └── 컴포넌트명.test.tsx
    └── 페이지명.data.ts
```

**Mock data rules:**

- Declare mock data inside `it` by default
- Extract to `[page]Mock.ts` only when shared across 2+ test files
- Page-specific mocks only in that file

**Mocking and rendering rules:**

- Mock API responses only
- Do not mock React Query internals; keep its default behavior
- Use only the shared `render` from the util (with `QueryClientProvider`, `CookiesProvider`, etc.)

## CI Checks on PRs

Lint, build, and commitlint checks run on pull requests.
