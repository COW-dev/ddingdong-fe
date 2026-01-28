import { Form } from '@/app/_api/types/apply';

export const mockForms: Form[] = [
  {
    formId: 1,
    title: '2025년 1학기 신입부원 모집',
    startDate: '2025-03-01',
    endDate: '2025-03-15',
    formStatus: '진행 중',
  },
  {
    formId: 2,
    title: '2024년 2학기 신입부원 모집',
    startDate: '2024-09-01',
    endDate: '2024-09-15',
    formStatus: '마감',
  },
  {
    formId: 3,
    title: '2025년 하계 특별 모집',
    startDate: '2025-07-01',
    endDate: '2025-07-15',
    formStatus: '진행 전',
  },
];

export const mockEmptyForms: Form[] = [];

export const mockSingleForm: Form[] = [
  {
    formId: 1,
    title: '2025년 1학기 신입부원 모집',
    startDate: '2025-03-01',
    endDate: '2025-03-15',
    formStatus: '진행 중',
  },
];
