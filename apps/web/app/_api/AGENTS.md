# API LAYER KNOWLEDGE

## OVERVIEW

`_api` owns HTTP transport, React Query setup, API request modules, response types, and file services for the Next app.

## STRUCTURE

```text
_api/
|-- fetcher.ts              # ky instance, auth cookies, error normalization
|-- ClientQueryProvider.tsx # React Query provider/client
|-- useCookie.ts            # Cookie helpers
|-- revalidate.ts           # Revalidation helper
|-- queries/                # Domain query functions
|-- mutations/              # Domain mutation functions
|-- services/               # Non-CRUD service helpers
`-- types/                  # API DTO/request/response types by domain
```

## WHERE TO LOOK

| Task | Location | Notes |
| --- | --- | --- |
| Add endpoint call | `queries/{domain}.ts` or `mutations/{domain}.ts` | Match the existing domain split. |
| Add DTO/type | `types/{domain}.ts` | Keep request/response names close to Swagger names. |
| Change auth/error behavior | `fetcher.ts` | Central place for cookies, 401 handling, Sentry capture. |
| Change QueryClient defaults | `ClientQueryProvider.tsx` | Client-only provider setup. |
| File upload/download | `services/file.ts`, domain modules | Use existing blob/file response paths. |

## CONVENTIONS

- API modules should call the exported `fetcher`, not raw `ky`.
- `fetcher.ts` sets `credentials: 'include'`, `retry: 0`, `timeout: 30_000`, and the bearer token from the `token` cookie.
- 401 with message `유효하지 않은 토큰입니다.` logs the user out through `expirationToken`; do not duplicate this in feature code.
- Convert responses through `parseResponse<T>` so JSON/blob handling and Sentry reporting stay central.
- Keep domain file names aligned across `queries`, `mutations`, and `types` when adding a new backend domain.
- Keep React Query hooks or callers outside `_api` unless the existing file is already a hook/provider.

## ANTI-PATTERNS

- Do not swallow `ApiError`; callers should handle user-facing recovery where appropriate.
- Do not read `process.env.NEXT_PUBLIC_BASE_URL` outside `fetcher.ts` for normal app API calls.
- Do not create ad hoc DTOs inside route components when a shared API type belongs in `types/`.
- Do not mock React Query internals in tests; mock API responses only if tests are added.
- Known footguns found during init: `queries/notice.ts` nests `noticeQueryKeys.all(1)` inside `detail()`, `queries/score.ts` uses PascalCase key/option exports, `types/file.ts` and `types/common.ts` both define `PresignedUrlResponse`, and `types/apply.ts` is a large mixed DTO file.
