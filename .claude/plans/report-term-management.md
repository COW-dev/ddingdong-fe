# 작업: 활동보고서 회차 관리 (총동연 회차 생성·삭제, 마감 후 보고서 수정·삭제)

선행 작업: `report-term-status.md` (회차 카드가 `status`로 분기). 이 계획은 그 위에 올립니다.

## Swagger 확인 결과 (staging `/v3/api-docs`, 2026-11-11)

| 기능 | API | 비고 |
| --- | --- | --- |
| 회차 일괄 생성 | `POST admin/activity-reports/term` `{ startDate: 'YYYY-MM-DD', totalTermCount }` → 201 | 2주 고정. 회차 번호는 시작일이 속한 해의 마지막 회차 다음 번호부터 |
| 회차 삭제 | `DELETE admin/activity-reports/term?term=` → 204 | 제출된 보고서가 있으면 400, 올해 회차가 없으면 404. 하드 삭제 |
| 회차 목록 | `GET central/activity-reports/term` | 올해 회차만, `status` 포함 (이미 사용 중) |
| 총동연 보고서 수정 | `PATCH admin/activity-reports/clubs/{clubId}?term=` → 204 | 기간 무관. 제출한 보고서 수보다 많이 보내면 400 |
| 총동연 보고서 삭제 | `DELETE admin/activity-reports/clubs/{clubId}?term=` → 204 | 기간 무관. 없으면 404 |
| 동아리 등록·수정·삭제 | 기존 `central/my/activity-reports` | 회차 기간 밖이면 400 (서버가 막음) |

`POST term`의 400: 시작일 없음 / 회차 수 < 1 / 시작일이 기존 회차 마감일 이전·같음 / 기존 회차와 겹침 / 회차 기간이 해를 넘김.

## 회의 메모와 스펙 비교 (백엔드·총동연 확인 필요)

| 회의 메모 | 스펙 | 판단 |
| --- | --- | --- |
| 간격 n주 입력 | 2주 고정, 입력 필드 없음 | 스펙대로 2주. 간격 입력 UI 만들지 않음 |
| 날짜 수정 X | 수정 API 없음 | 일치 |
| 일괄 삭제? | 회차 1개씩 삭제 | 1개씩. 일괄 삭제 UI 만들지 않음 |
| 보관 X, SOFT DELETE 고려 | 하드 삭제 + 보고서 있으면 거부 | 일치 (보고서가 있는 회차는 못 지우므로 데이터 유실 없음) |
| **학기 분리** | 학기 필드 없음. 해 단위로 번호가 이어짐 (1학기 1~8, 2학기 9~16) | **확인 필요.** 학기마다 시작일을 따로 넣어 생성하면 되는지, 화면에 학기 구분이 필요한지. 필요하면 응답에 학기 정보가 있어야 함 |

## 작업 단계

### 버튼 배치 (총동연 회차 목록)

"회차 생성"과 "회차 삭제" 버튼은 "활동보고서 관리" `Title1`과 같은 줄 오른쪽 끝에 나란히 둡니다. 다른 admin 페이지와 통일: 왼쪽 "회차 삭제"(보조), 오른쪽 끝 "회차 생성"(주 동작, `color="blue"`). 기준은 FAQ(취소|저장하기)·지원서 수정(취소|저장하기)·보고서 상세 `EditButton`(삭제|수정) — 모두 보조 왼쪽, 주 동작 오른쪽. 버튼은 `size="md"` + `<Body3 weight="bold">` 텍스트, 두 개는 `DoubleButton`으로 묶음. `Flex justifyContent="between" alignItems="center"`로 감쌉니다. 회차 카드에는 버튼을 추가하지 않습니다.

### 1. API 레이어 — `apps/web/app/_api/`

- `types/report.ts`: `CreateTermRequest = { startDate: string; totalTermCount: number }`
- `mutations/report.ts`에 추가 (기존 패턴 그대로):
  - `useCreateTerms` → `POST admin/activity-reports/term`, 성공 시 `reportQueryKeys.terms()` invalidate
  - `useDeleteTerm` → `DELETE admin/activity-reports/term?term=`, 성공 시 `terms()` invalidate
  - `useAdminUpdateReports` → `PATCH admin/activity-reports/clubs/${clubId}?term=`, body는 기존 `updateReports`와 동일, 성공 시 `reportQueryKeys.all()` invalidate
  - `useAdminDeleteReport` → `DELETE admin/activity-reports/clubs/${clubId}?term=`, 성공 시 `all()` invalidate

### 2. 회차 생성 UI — `admin/report/admin/`

- `_pages/ReportClientPage.tsx`: 위 "버튼 배치"대로 제목 줄에 "회차 생성"·"회차 삭제" 버튼 추가 → 각각 모달 열기
- `_components/CreateTermModal.tsx` (신규): 시작일(`admin/_components/AdminCalendarField` 재사용) + 회차 수(number input, min 1)
  - 미리보기 한 줄: "N회차 · 시작일 ~ 마감일(시작일 + 2주×N − 1일)" — 해를 넘기면 제출 전에 경고
  - 400은 서버 메시지 그대로 toast (겹침·해 넘김 등 사유가 여러 개라 FE에서 다시 검증하지 않음)
- 모달은 기존 `usePortal` + 다른 admin 모달(`admin/banner/_components/DeleteModal.tsx`) 패턴을 따름

### 3. 회차 삭제 — `admin/report/admin/_components/DeleteTermModal.tsx` (신규)

- 제목 줄의 "회차 삭제" 버튼 → 모달에서 삭제할 회차 선택(올해 회차 목록 `terms` 그대로 사용) → 확인 → `useDeleteTerm`
- 400 → "제출된 활동보고서가 있어 삭제할 수 없어요" toast, 404 → 목록 새로고침
- 선택 목록: 일단 모든 회차 표시 (서버가 보고서 유무로 막음). 총동연이 원하면 `UPCOMING`만 표시로 좁힘

### 4. 총동연 보고서 수정·삭제 — `admin/report/admin/[term]/[name]/`

- `_pages/ReportDetailClientPage.tsx` 하단에 수정/삭제 버튼 (기간 조건 없음)
  - 삭제: 확인 모달 → `useAdminDeleteReport(clubId, term)` → `/report/admin/${term}`로 이동
  - 수정: `/report/admin/${term}/${name}/fix`로 이동
- `fix/page.tsx`, `fix/_pages/ReportFixClientPage.tsx` (신규): `reportQueryOptions.report(term, clubId)`로 불러와 기존 `parseReport` + `ReportFormBundle` 재사용
- `ReportFormBundle` / `useReport`에 `clubId?: number` 하나만 추가: 있으면 `useAdminUpdateReports` 사용 후 `/report/admin/${term}/${name}`로 이동, 없으면 기존 동작
- PATCH 400 대응: 제출된 보고서 수만큼만 보냄 (빈 두 번째 보고서는 제외)

### 5. 동아리 화면 — 거의 변경 없음

- 등록·수정·삭제 버튼은 이미 회차 기간에만 노출 (`ReportCard` status 분기, `EditButton`의 `currentTerm.term === term`)
- 서버 400("회차 기간이 아님")은 기존 mutation에 `onError` toast만 추가 — 페이지를 열어둔 채 마감 시각이 지난 경우 대비

### 6. 테스트 — `apps/web/test/admin/report/` (CLAUDE.md 규칙, `fetcher` 응답만 mock)

- `components/CreateTermModal.test.tsx`: 201 → 모달 닫힘·목록 갱신 / 400 → toast / 회차 수 0 → 제출 불가 / 해 넘김 미리보기 경고
- `components/DeleteTermModal.test.tsx`: 삭제 204 → 목록에서 회차 사라짐 / 400 → 거부 toast
- `ReportDetail.test.tsx`(총동연): 마감된 회차에서도 수정·삭제 버튼 노출, 삭제 204 → 회차 목록으로 이동, 404 처리

### 7. 검증

```bash
pnpm --filter @ddingdong/web lint
```

```bash
pnpm --filter @ddingdong/web check-types
```

```bash
pnpm --filter @ddingdong/web exec vitest run test/admin/report
```

## 하지 않는 것

- 간격(n주) 입력, 회차 날짜 수정, 회차 일괄 삭제, 보관함 — 스펙에 없음
- FE에서 겹침·해 넘김 재검증 — 서버 400 메시지에 맡김 (미리보기 경고만)
- 학기 구분 UI — 위 확인 결과가 나오기 전까지 보류

## 커밋 분리 (제안)

1. `feat: 총동연 활동보고서 회차 생성·삭제 기능 추가` (1~3)
2. `feat: 총동연 마감 후 활동보고서 수정·삭제 기능 추가` (4)
3. `fix: 회차 기간 외 활동보고서 요청 실패 시 안내 추가` (5)

## 구현 담당에게 (이번 범위: 1~3단계)

- 선행: `report-term-status.md` 변경분이 working tree에 커밋 전 상태로 있음. 되돌리지 말 것
- 이번에 할 것: 1단계 전체(4개 mutation 모두) + 2·3단계 + 6단계 중 `CreateTermModal`·`DeleteTermModal` 테스트 + 7단계 검증
- 4·5단계는 하지 않음
- 서버 에러 메시지 읽기는 `apps/web/app/_api/ApiError` 등 기존 에러 처리 방식을 먼저 찾아서 따름
- CLAUDE.md 컨벤션: 컴포넌트는 `function`, 그 외 화살표 함수, `type`만, import 그룹 순서, `@dds/shared` 컴포넌트 우선
- 커밋·푸시·브랜치 변경 금지. 끝나면 변경 파일 목록과 각 검증 명령 출력을 보고
- 커밋 메시지(나중에): `feat: 총동연 활동보고서 회차 생성·삭제 기능 추가`
