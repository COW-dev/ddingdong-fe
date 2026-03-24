export const FORM_STATUS_FILTER = {
  ALL: '전체',
  BEFORE: '진행 전',
  IN_PROGRESS: '진행 중',
  CLOSED: '마감',
} as const;

export const FORM_FILTER_LABELS = {
  [FORM_STATUS_FILTER.ALL]: '전체',
  [FORM_STATUS_FILTER.BEFORE]: '진행전',
  [FORM_STATUS_FILTER.IN_PROGRESS]: '진행중',
  [FORM_STATUS_FILTER.CLOSED]: '종료',
} as const;

export const FORM_FILTER_OPTIONS = [
  {
    label: FORM_FILTER_LABELS[FORM_STATUS_FILTER.ALL],
    key: FORM_STATUS_FILTER.ALL,
  },
  {
    label: FORM_FILTER_LABELS[FORM_STATUS_FILTER.BEFORE],
    key: FORM_STATUS_FILTER.BEFORE,
  },
  {
    label: FORM_FILTER_LABELS[FORM_STATUS_FILTER.IN_PROGRESS],
    key: FORM_STATUS_FILTER.IN_PROGRESS,
  },
  {
    label: FORM_FILTER_LABELS[FORM_STATUS_FILTER.CLOSED],
    key: FORM_STATUS_FILTER.CLOSED,
  },
] as const;

export type FormStatusFilter =
  (typeof FORM_STATUS_FILTER)[keyof typeof FORM_STATUS_FILTER];
