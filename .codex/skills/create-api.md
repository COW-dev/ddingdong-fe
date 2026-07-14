<!-- ddingdong-fe 팀 스킬 미러 — 원본: .claude/skills/create-api/SKILL.md (Claude Code 스킬). Codex custom prompt로 수동 호출용. -->

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

1. 실제 fetch 함수는 훅 밖에 화살표 함수로 선언 (`create{Domain}`, `delete{Domain}` 등). POST/PUT은 `fetcher.post(path, { json: body })`, 쿼리스트링이 필요하면 `searchParams` 옵션 사용.
2. `use{Action}{Domain}` 훅에서 `useMutation` + `useQueryClient`. `onSuccess`에서 `queryClient.invalidateQueries({ queryKey: [...{domain}QueryKeys.all()] })`로 관련 쿼리 무효화.
3. 관리자용 API(생성/삭제 등)라 캐시 재검증이 필요하면 `revalidateCache('{domain}')` (`_api/revalidate.ts`)도 함께 호출한다 — `mutations/banner.ts` 참고.

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
