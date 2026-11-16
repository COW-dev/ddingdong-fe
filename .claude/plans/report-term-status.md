# 작업: 활동보고서 회차 상태를 서버 `status` 기준으로 판단

## 배경

공백 기간(방학·학기 사이)에는 `GET /central/activity-reports/current-term`이 `term: 0`을 반환합니다. `useTerm`이 이 값과 회차 번호를 비교해서 모든 회차가 진행 전으로 판단됩니다.

- 동아리 화면: 지난 회차 미제출 건이 비활성화된 "제출하기"로 보임
- 총동연 화면: 끝난 회차가 "진행 전"으로 비활성화되어 제출 내역 진입 불가

서버가 `GET /central/activity-reports/term` 응답에 `status`(`UPCOMING` / `ONGOING` / `CLOSED`, 오늘 날짜 기준 계산)를 추가합니다. 기존 필드와 `current-term` API는 그대로 유지됩니다.

## 작업 단계

### 1. 타입에 `TermStatus` 추가: `apps/web/app/_api/types/report.ts`

```ts
export type TermStatus = 'UPCOMING' | 'ONGOING' | 'CLOSED';
```

`Term`에 `status: TermStatus` 추가

### 2. 동아리 카드: `apps/web/app/admin/report/_components/ReportCard.tsx`

`useTerm`을 제거하고 `termInfo.status`로 분기합니다. 기존 `ReportTermCard` props와 href는 그대로 둡니다.

| 조건 | 배지 | 동작 |
| --- | --- | --- |
| 제출함 (`myReports`에 회차가 있음) | 제출완료 (positive) | `href=/report/${term}/${myClubData.name}` (기존 동일) |
| `CLOSED` + 미제출 | 미제출 (negative) | `disabled` |
| `ONGOING` + 미제출 | 제출하기 (neutral) | `href=/report/${term}/new`, 활성 |
| `UPCOMING` | 제출하기 (neutral) | `href=/report/${term}/new`, `disabled` |

### 3. 총동연 카드: `apps/web/app/admin/report/admin/_components/ReportCard.tsx`

`useTerm`을 제거하고 `termInfo.status`로 분기합니다.

| status     | 배지                 | 동작                         |
| ---------- | -------------------- | ---------------------------- |
| `CLOSED`   | 진행 종료 (negative) | `href=/report/admin/${term}` |
| `ONGOING`  | 진행 중 (positive)   | `href=/report/admin/${term}` |
| `UPCOMING` | 진행 전 (neutral)    | `disabled`                   |

### 4. `apps/web/app/admin/report/_hooks/useTerm.ts` 삭제

호출처는 두 `ReportCard`뿐입니다. 삭제 전에 grep으로 확인합니다.

### 건드리지 말 것

- `apps/web/app/admin/report/[term]/[name]/_components/EditButton.tsx`: `currentTerm.term === term` 조건은 공백 기간에도 정상 동작합니다.
- `apps/web/app/_api/queries/report.ts`의 `currentTerm` 쿼리: `EditButton`이 계속 사용합니다.

### 5. 테스트: `apps/web/test/admin/report/components/ReportCard.test.tsx` (신규)

CLAUDE.md 컨벤션을 따릅니다.

- `apps/web/test/utils/render.tsx`의 공용 `render`만 사용
- API 응답만 mock, React Query 내부는 mock하지 않음
- mock 데이터는 각 `it` 안에 선언, 타입 단언 금지
- 스타일 참고: `apps/web/test/faq/components/FAQAccordion.test.tsx`

케이스:

- 총동연 카드, 3개 상태 각각: 배지 텍스트가 맞는지. `CLOSED`/`ONGOING`은 링크(`role="link"`, href `/report/admin/{term}`)가 있고, `UPCOMING`은 링크가 없음
- 동아리 카드:
  - 제출함 → "제출완료" 링크
  - `CLOSED` + 미제출 → "미제출", 링크 없음 (공백 기간 회귀 핵심 케이스)
  - `ONGOING` + 미제출 → "제출하기", `/report/{term}/new` 링크
  - `UPCOMING` → "제출하기", 링크 없음
- 동아리 카드는 `useSuspenseQueries`로 `reportQueryOptions.myReports()`와 `clubQueryOptions.my()`를 호출합니다. 프로젝트에 MSW가 없으므로 `apps/web/app/_api/fetcher.ts`의 `fetcher.get` 응답값만 `vi.mock` 또는 `vi.spyOn`으로 URL별로 mock합니다. 실제 엔드포인트 경로는 `queries/report.ts`, `queries/club.ts`에서 확인합니다. 카드가 suspend되므로 `<Suspense>`로 감싸고 `findBy*`로 검증합니다.

### 6. 검증 (모두 통과해야 함)

```bash
pnpm --filter @ddingdong/web lint
```

```bash
pnpm --filter @ddingdong/web check-types
```

```bash
pnpm --filter @ddingdong/web exec vitest run test/admin/report
```

## 규칙

- CLAUDE.md 컨벤션: 컴포넌트는 `function` 키워드, 그 외 함수는 화살표 함수, `interface` 대신 `type`, import 그룹 순서 유지
- 다른 파일은 수정하지 않고, 커밋·푸시·브랜치 변경도 하지 않습니다.
- 끝나면 변경한 파일 목록과 각 검증 명령의 출력을 보고합니다.
- 커밋 메시지(나중에): `refactor: 활동보고서 회차 상태를 서버 status 기준으로 판단`
