# SHARED PACKAGE KNOWLEDGE

## OVERVIEW

`packages/shared` builds `@dds/shared`, the local UI/component package consumed by the web app.

## STRUCTURE

```text
shared/
|-- index.ts        # Public barrel for @dds/shared
|-- lib/            # cn, colors, small package utilities
|-- ui/             # Component folders with component, story, index files
|-- vite.config.ts  # Library build
|-- tsconfig.json   # Package TS config
`-- dist/           # Generated build output; do not edit
```

## WHERE TO LOOK

| Task                        | Location                                      | Notes                                                      |
| --------------------------- | --------------------------------------------- | ---------------------------------------------------------- |
| Add exported component      | `ui/{Component}` and `index.ts`               | Add source files, local index, then package barrel export. |
| Change shared styles/tokens | `lib/colors.ts`, `ui/Typography`, `ui/Colors` | Check stories/MDX examples too.                            |
| Component behavior          | `ui/{Component}/{Component}.tsx`              | Keep props typed near component.                           |
| Storybook coverage          | `ui/{Component}/{Component}.stories.tsx`      | Existing components usually include a story.               |
| Package build config        | `package.json`, `vite.config.ts`              | Build emits `dist`.                                        |
| Generate component scaffold | `pnpm --filter @dds/shared gen`               | Uses `packages/_templates/components/new`.                 |

## CONVENTIONS

- Public imports should go through `@dds/shared`; app code should not reach into package internals unless no barrel export exists yet.
- Component folders commonly use `Component.tsx`, `Component.stories.tsx`, and `index.ts` or `index.tsx`.
- Storybook discovers `../ui/**/*.mdx` and `../ui/**/*.stories.@(js|jsx|mjs|ts|tsx)`; keep MDX docs near visual token/icon systems.
- Hygen templates create the component, story, and local index from a PascalCase name.
- Add or update `packages/shared/index.ts` when a new primitive should be public.
- Use `cn` from `lib/core.ts` for class merging inside shared components.
- Keep shared components domain-neutral; app-specific wording or behavior belongs in `apps/web/app`.
- Stories are part of the component contract; update them when props, variants, or visible states change.

## ANTI-PATTERNS

- Do not edit `dist`; run the package build if generated output is needed.
- Do not import app aliases like `@/_components` from this package.
- Do not introduce app-domain strings or API calls into shared UI primitives.
- Do not create a shared component for one route-specific need until reuse is real.
