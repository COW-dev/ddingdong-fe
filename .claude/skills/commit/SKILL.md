---
description: Conventional Commits 형식의 커밋 메시지를 이 프로젝트 규칙에 맞게 작성한다. 사용자가 명시적으로 /commit 을 호출했을 때만 사용.
disable-model-invocation: true
---

# 커밋 메시지 작성

## 형식

```text
{type}: {한국어 설명}
```

`.commitlintrc.json`이 강제하는 실제 규칙:

- **scope를 쓰지 않는다.** (`.commitlintrc.json`의 `headerPattern`은 `type: subject`만 파싱)
- 설명 뒤에 마침표를 붙이지 않는다 (`subject-full-stop` 규칙).
- 설명이 비어 있으면 안 된다.
- 언어는 한국어. (`git log` 기준 전부 한국어 커밋)

## type 목록 (`.commitlintrc.json` 기준, 이것만 허용됨)

`build`, `chore`, `ci`, `docs`, `feat`, `fix`, `hotfix`, `refactor`, `revert`, `style`, `test`

## 예시 (실제 이 저장소 커밋 로그)

```text
refactor: NullableDateRange 타입 추가 및 관련 코드 수정
fix: 지원서 편집 안됨 문제 수정
feat: lazycodex 통한 init 설정
```

## 절차

1. `git diff --staged`로 변경 내용을 확인한다.
2. 변경의 성격에 맞는 type을 위 목록에서 고른다. (새 기능=`feat`, 버그 수정=`fix`, 급한 버그 수정=`hotfix`, 동작 변경 없는 구조 개선=`refactor`, 포맷/세미콜론 등=`style`, 테스트=`test`, 빌드/설정/패키지=`build` 또는 `chore`)
3. `{type}: {설명}` 한 줄로 작성한다. 여러 변경이 섞여 있으면 가장 핵심적인 변경 기준으로 하나의 타입을 고르되, 설명에 주요 변경을 압축해서 담는다.
4. 커밋을 실제로 생성하기 전에 사용자에게 메시지를 보여주고 확인받는다 (커밋 자체는 사용자 승인 없이 실행하지 않는다).
