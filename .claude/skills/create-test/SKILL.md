---
description: 테스트 파일을 만들거나 기존 컴포넌트/훅에 테스트를 추가할 때 사용. "테스트 작성해줘", "테스트 코드 추가", ".test.tsx 만들어줘" 같은 요청에 자동 발동.
---

# 테스트 파일 생성

CLAUDE.md의 mock 배치 규칙(`it` 내부 선언 → 페이지별 `.data.ts` → `test/shared/[domain]Mock.ts`), 성공/실패/엣지케이스 작성 규칙은 이미 알고 있으므로 반복하지 않는다. 여기서는 이 프로젝트에 실제로 세팅된 도구와 경로만 다룬다.

## 실행 도구

- 러너: Vitest (jsdom 환경). 설정 파일: `apps/web/vitest.config.ts`
- 실행: `apps/web` 안에서 `npx vitest run <경로>` 또는 루트에서 `pnpm --filter @ddingdong/web test`
- watch 모드: `pnpm --filter @ddingdong/web test:watch`
- 매처: `@testing-library/jest-dom`이 `apps/web/vitest.setup.ts`에서 전역 로드됨 — `toBeInTheDocument()` 등 import 없이 바로 사용 가능
- `describe`/`it`/`expect`는 `globals: true`라 import 없이 바로 쓸 수 있지만, 이 프로젝트는 명시적 import(`import { describe, expect, it } from 'vitest'`)를 쓴다 — 예시 파일 참고.

## render 유틸

CLAUDE.md가 요구하는 공용 `render`는 `apps/web/test/utils/render.tsx`에 있다. `QueryClientProvider`(재시도 0회로 세팅됨) + `CookiesProvider`로 감싼 래퍼이며, `@testing-library/react`의 나머지 export(`screen`, `within` 등)도 여기서 재출력한다.

```ts
import { render, screen } from '../../utils/render';
```

`@testing-library/react`를 직접 import하지 않는다 — 항상 이 유틸을 통해서만.

## 파일 위치

CLAUDE.md 구조 그대로, 루트는 `apps/web/test/`다.

```text
apps/web/test/
└── {페이지명}/
    ├── {페이지명}.test.tsx
    ├── use{훅이름}.test.tsx
    ├── components/
    │   └── {컴포넌트명}.test.tsx
    └── {페이지명}.data.ts
```

## 실제 예시

`apps/web/test/faq/components/FAQAccordion.test.tsx` — render 유틸 사용, mock data를 `it` 내부에 선언, 정상/빈 배열(엣지케이스) 두 가지를 검증하는 실제 동작 예시. 새 테스트를 작성하기 전에 이 파일 구조를 그대로 참고한다.

## API 모킹

React Query 내부 동작은 mock하지 않는다(`retry: false`만 render 유틸에서 조정됨). API 응답만 모킹한다 — `_api/queries`, `_api/mutations`가 감싸는 `fetcher.get/post/...` 호출 자체를 mock하면 된다 (예: `vi.mock('@/_api/fetcher', ...)` 또는 `_api/queries/{domain}` 모듈 전체를 mock).
