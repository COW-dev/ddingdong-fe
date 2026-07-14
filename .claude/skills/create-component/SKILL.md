---
description: 라우트(app/**) 하위에 새 클라이언트 컴포넌트/훅/유틸 파일을 만들 때 사용. "컴포넌트 만들어줘", "_components에 추가해줘", "새 페이지 만들어줘" 같은 요청에 자동 발동.
---

# 라우트 컴포넌트 생성

CLAUDE.md의 `function` 키워드, `Props` 타입 네이밍 등 컨벤션은 이미 알고 있으므로 반복하지 않는다. 여기서는 **어느 폴더에 넣을지**만 다룬다.

## 폴더 배치 기준

전체 라우트(`feeds`, `faq`, `documents`, `club`, `notice`, `apply`, `(main)`, `admin/*` 등) `_pages` 39개, `_containers` 9개(모든 파일), `_hooks`/`_utils` 다수를 전수 조사해서 확인한 패턴이다.

| 폴더 | 역할 | 실제 예시 |
| --- | --- | --- |
| `_pages/{Name}ClientPage.tsx` | 라우트의 클라이언트 진입점. `page.tsx`(서버 컴포넌트)가 이걸 렌더링. 데이터 훅(`useSuspenseQuery` 등) 호출, 로딩/빈 상태 분기, 하위 컴포넌트 조합을 담당 | `feeds/_pages/FeedClientPage.tsx`, `admin/apply/_pages/ApplyAdminClientPage.tsx` |
| `_containers/{Name}Container.tsx` | **레이아웃 래퍼 전용.** `children`(+가끔 `title`)만 받아 grid/flex 배치만 제공. 데이터·상태·훅을 쓰지 않는다 | `feeds/_containers/FeedContainer.tsx`, `admin/report/[term]/[name]/_containers/ReportContainer.tsx`, `admin/my-club/_containers/ClubContainer.tsx` 등 9개 파일 전부 이 패턴 — 예외 없음 |
| `_components/{Name}.tsx` | 데이터를 props로 받는 프레젠테이셔널 컴포넌트. 그 컴포넌트에서만 쓰는 작은 하위 조각(`EmptyText`, `ParticipantsList` 같은)은 별도 파일로 안 쪼개고 같은 파일 안에 로컬 함수로 둬도 된다 | `feeds/_components/ClubFeed.tsx`, `admin/report/[term]/[name]/_components/Report.tsx`(내부에 `EmptyText`/`ParticipantsList`/`Place`/`Date` 로컬 컴포넌트 포함) |
| `_hooks/use{Name}.ts` | 해당 라우트에서만 쓰는 커스텀 훅. 하위 그룹이 크면 `_hooks/{그룹}/use{Name}.ts`처럼 한 단계 더 나눈다 | `feeds/_hooks/useDebouncedLike.ts`, `admin/apply/new/_hooks/reducer/useQuestionReducer.ts` |
| `_utils/{name}.ts` | 해당 라우트에서만 쓰는 순수 함수 | `documents/_utils/downloadFile.ts`, `admin/apply/[id]/_utils/formatDate.ts` |

`_containers`는 다른 프로젝트에서 흔히 쓰는 "데이터 패칭을 담당하는 스마트 컴포넌트" 의미가 **아니다** — 순수 레이아웃 래퍼다. 데이터 패칭 로직은 항상 `_pages`가 담당한다. (9개 `_containers` 파일 전수 확인 — 예외 없이 `PropsWithChildren` 또는 `{ title?, children }`만 받고 훅을 쓰지 않음)

여러 라우트가 공유하는 컴포넌트는 `apps/web/app/_components/common` 또는 `apps/web/app/_components/layout`에 둔다 (라우트 전용이 아니면 라우트 폴더에 넣지 않는다).

## 절차

1. `@dds/shared`에 이미 있는 컴포넌트인지 먼저 확인한다 (`packages/shared/ui`) — 없을 때만 앱 로컬 컴포넌트를 만든다.
2. 위 표를 기준으로 위치를 정한다. 데이터를 직접 fetch/구독하면 `_pages`, 순수 표시용이면 `_components`, 레이아웃 배치만 하면 `_containers`.
3. 새 라우트를 통째로 만드는 경우 `page.tsx`(서버, prefetch) → `_pages/{Name}ClientPage.tsx`(클라이언트, 데이터 훅) → 필요시 `_containers` → `_components` 순으로 만든다. `feeds/page.tsx` + `feeds/_pages/FeedClientPage.tsx` 조합을 템플릿으로 참고.
4. `packages/_templates`의 Hygen 템플릿(`pnpm --filter @dds/shared gen`)은 `packages/shared`(디자인시스템) 컴포넌트 전용이다. 라우트 컴포넌트에는 적용되지 않는다.
