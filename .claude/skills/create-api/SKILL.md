---
description: apps/web/app/_api 아래에 새 API 쿼리/뮤테이션/타입 파일을 추가하거나 기존 도메인에 엔드포인트를 더할 때 사용. "API 함수 만들어줘", "쿼리 추가해줘", "뮤테이션 추가해줘", "_api에 파일 추가" 같은 요청에 자동 발동.
---

# API 쿼리/뮤테이션 생성

`apps/web/app/_api` 아래에 실제로 쓰이고 있는 패턴을 그대로 따른다. (CLAUDE.md/AGENTS.md에 없는, 코드에서 관찰한 규칙)

## 파일 배치

```text
apps/web/app/_api/
├── fetcher.ts        # ky 인스턴스 + get/post/put/delete/patch 래퍼 (수정 금지, 여기서 import만)
├── types/{domain}.ts # 요청/응답 타입
├── queries/{domain}.ts
└── mutations/{domain}.ts
```

새 도메인이면 `types/{domain}.ts`, `queries/{domain}.ts`, `mutations/{domain}.ts` 세 파일을 함께 만든다. 기존 도메인에 엔드포인트만 추가하는 경우 해당 파일에 함수를 추가한다.

## queries/{domain}.ts

1. `{domain}QueryKeys` 객체를 먼저 export. 최상위는 `all: () => ['{domain}']`, 하위 리소스는 `all()`을 스프레드해서 계층을 쌓는다 (`apply.ts` 참고 — `forms.detail(formId)` 처럼 파라미터가 있는 키도 함수로).
2. `{domain}QueryOptions` 객체에 `queryOptions()`로 각 조회를 정의. `queryFn`은 `fetcher.get<T>(path)`를 그대로 리턴.
3. 페이지네이션 등 쿼리스트링이 필요한 GET은 `searchParams` 옵션이 아니라 **템플릿 리터럴로 URL에 직접 인터폴레이션**한다 — 이게 실제 지배적인 패턴이다: ``fetcher.get<DocumentList>(`documents?page=${page}&limit=10`)`` (`queries/document.ts`, `queries/notice.ts`, `queries/feed.ts`, `queries/report.ts` 전부 이 방식).

```ts
import { queryOptions } from '@tanstack/react-query';

import { fetcher } from '../fetcher';
import { {Domain} } from '../types/{domain}';

export const {domain}QueryKeys = {
  all: () => ['{domain}'],
  detail: (id: number) => [...{domain}QueryKeys.all(), id],
};

export const {domain}QueryOptions = {
  all: () =>
    queryOptions({
      queryKey: {domain}QueryKeys.all(),
      queryFn: () => fetcher.get<{Domain}[]>('{domain}'),
    }),
  detail: (id: number) =>
    queryOptions({
      queryKey: {domain}QueryKeys.detail(id),
      queryFn: () => fetcher.get<{Domain}>(`{domain}/${id}`),
    }),
};
```

## mutations/{domain}.ts

1. 실제 fetch 함수는 훅 밖에 화살표 함수로 선언 (`create{Domain}`, `update{Domain}`, `delete{Domain}` 등 — 훅 이름의 Action도 `Create`뿐 아니라 `Add`/`Update`/`Upload`/`Resolve` 등 도메인에 맞는 동사를 쓴다, `mutations/*.ts` 전수 확인함). HTTP 메서드는 `fetcher`가 `get`/`post`/`put`/`patch`/`delete`로 분리돼 있으니 실제 쓰는 메서드를 그대로 쓴다 — POST와 PUT이 같은 `fetcher.post`로 합쳐지지 않는다. 생성은 `fetcher.post(path, { json: body })`, 전체 수정은 `fetcher.put(path, { json: body })` (`mutations/apply.ts`의 `updateForm`), 부분 수정은 `fetcher.patch(path, { json: body })` (`mutations/club.ts`의 `updateClub`)를 쓴다. `application/x-www-form-urlencoded`처럼 body를 폼으로 보내야 하면 `json` 대신 `searchParams` 옵션 + `headers`를 쓴다 (`mutations/faq.ts`의 `addFaq` 참고, 흔한 케이스는 아님).
2. `use{Action}{Domain}` 훅에서 `useMutation` + `useQueryClient`. `onSuccess`에서 `queryClient.invalidateQueries({ queryKey: [...{domain}QueryKeys.all()] })`로 관련 쿼리 무효화.
3. `revalidateCache('{tag}')` (`_api/revalidate.ts`)는 **모든 관리자 뮤테이션에 쓰는 게 아니라** 지금은 `mutations/banner.ts`, `mutations/club.ts` 두 도메인에서만 쓰고 있다. 새 도메인에 무조건 따라 쓰지 말고, 기존 두 도메인처럼 써야 할 이유가 있을 때만 추가한다. ⚠️ 참고: `revalidateCache`가 POST하는 `/api/revalidate` 라우트 핸들러가 현재 이 저장소(`apps/web/app`)에 없다 — `route.ts` 전무, `next.config.js`에 rewrite 설정도 없음. 지금 이 두 도메인에서의 호출은 실제로는 404가 나고 자체 `try/catch`에 잡혀 콘솔 에러만 찍고 조용히 무시될 가능성이 높다. 대부분의 도메인(faq, notice, feed, member, report 등)은 `revalidateCache` 없이 `invalidateQueries`만으로 충분하다.
4. 요청/응답 타입은 보통 `types/{domain}.ts`에 두지만, 일부 도메인(`mutations/club.ts`의 `AdminClub`, `CreateClubRequest`)은 뮤테이션 파일 안에 로컬로 타입을 선언하기도 한다 — 기존 도메인에 추가할 때는 그 파일이 이미 쓰는 방식을 따르고, 새 도메인이면 `types/{domain}.ts`를 기본으로 한다.

```ts
import { useMutation, useQueryClient } from '@tanstack/react-query';

import { fetcher } from '../fetcher';
import { {domain}QueryKeys } from '../queries/{domain}';
import { {Domain}APIRequest } from '../types/{domain}';

const create{Domain} = (data: {Domain}APIRequest) =>
  fetcher.post('{domain}', { json: data });

export const useCreate{Domain} = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: {Domain}APIRequest) => create{Domain}(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [...{domain}QueryKeys.all()] });
    },
  });
};
```

## 참고할 실제 예시 파일

- 단순 CRUD: `apps/web/app/_api/queries/faq.ts`, `apps/web/app/_api/mutations/faq.ts`
- 캐시 재검증 포함: `apps/web/app/_api/mutations/banner.ts`
- 중첩 리소스/파라미터가 많은 쿼리키: `apps/web/app/_api/queries/apply.ts`

## 하지 말 것

- `fetcher.ts`의 에러 처리(토큰 만료, Sentry capture)를 도메인 파일에서 중복 구현하지 않는다.
- 컴포넌트에서 `ky`나 `instance`를 직접 import하지 않는다 — 항상 `fetcher`를 통해서만 호출.
