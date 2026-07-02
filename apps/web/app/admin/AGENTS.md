# ADMIN ROUTES KNOWLEDGE

## OVERVIEW

`apps/web/app/admin` contains the admin product: dashboards, content management, club/member tools, applications, emails, reports, ranking, and fix workflows.

## STRUCTURE

```text
admin/
|-- (home)/          # Admin landing/dashboard route group
|-- apply/           # Forms, applicants, emails, statistics
|-- banner/          # Banner management
|-- club/            # Club management
|-- documents/       # Document management
|-- faq/ feed/ notice/
|-- fix/             # Fix/report workflow
|-- login/           # Admin auth entry
|-- member/          # Member management and Excel upload
|-- my-club/ ranking/ report/
`-- */_components, */_hooks, */_pages, */_utils, */_schemas
```

## WHERE TO LOOK

| Task | Location | Notes |
| --- | --- | --- |
| Admin route entry | `*/page.tsx` | Default-export page components. |
| Complex application flow | `apply` | New form builder, applicant detail, email, statistics. |
| Member operations | `member` | Cards, add/delete/upload modals, Excel dropdown. |
| Report authoring/detail | `report/[term]` | New/detail/fix flows. |
| Fix workflow | `fix` | List, detail, new post, comments, resolution. |
| Shared admin API calls | `../_api/queries/*`, `../_api/mutations/*` | Admin routes still use app-wide API layer. |

## CONVENTIONS

- Keep admin feature code inside its domain route folder. Use the local `_components`, `_hooks`, `_pages`, `_utils`, `_constants`, or `_schemas` first.
- Client-heavy admin pages usually delegate to a route-local `_pages/*ClientPage.tsx` component from `page.tsx`.
- Query-driven server pages often create a `QueryClient`, prefetch data, and pass a hydrated client page through `HydrationBoundary`; follow examples in `apply/page.tsx` and `report/page.tsx`.
- Dynamic server pages commonly type `params` as a `Promise` and `await params`; report routes also use `generateMetadata`.
- Role-dependent pages should read `cookies()` server-side and pass role into client components rather than duplicating role lookup in browser code.
- Form-heavy flows use local reducers, schemas, and utilities inside the feature folder; follow the existing `apply/new` split before adding new shared abstractions.
- Use `@dds/shared` primitives and existing admin card/modal/dropdown patterns before inventing new local UI.
- Preserve the existing Korean admin terminology in labels, toast messages, and status strings.

## ANTI-PATTERNS

- Do not move admin-only helpers to app-wide `_utils` just because another admin file imports them; keep the route boundary tight until reused outside admin.
- Do not bypass `_api/fetcher.ts` for admin requests.
- Do not put browser-only logic in server `page.tsx`; isolate it in client components/hooks.
- Folder naming has historical inconsistencies (`fix/_component`, `fix/_container`, `club/_constant`, `notice/[id]/edit/_hook`); preserve local imports unless intentionally normalizing a whole route family.
- Current explicit TODO: `member/_components/ExcelDropdown.tsx` has `TODO: 엑셀 이미지로 변경`.
