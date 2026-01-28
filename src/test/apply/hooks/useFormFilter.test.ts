import { act, renderHook } from '@testing-library/react';
import { describe, it, expect } from 'vitest';

import { Form } from '@/app/_api/types/apply';
import { FORM_STATUS_FILTER } from '@/app/admin/apply/_constants/formFilter';
import { useFormFilter } from '@/app/admin/apply/_hooks/useFormFilter';

import { mockForms, mockEmptyForms } from '../apply-admin.data';

describe('useFormFilter 훅 테스트', () => {
  describe('초기 상태', () => {
    it('초기 필터는 전체로 설정된다.', () => {
      const { result } = renderHook(() => useFormFilter(mockForms));

      expect(result.current.formFilter).toBe(FORM_STATUS_FILTER.ALL);
    });

    it('초기 상태에서 모든 폼은 filteredForms에 포함돼있다.', () => {
      const { result } = renderHook(() => useFormFilter(mockForms));

      expect(result.current.filteredForms).toHaveLength(mockForms.length);
      expect(result.current.filteredForms).toEqual(mockForms);
    });
  });

  describe('formCounts 계산', () => {
    it('생성된 폼 개수를 계산한다.', () => {
      const { result } = renderHook(() => useFormFilter(mockForms));

      expect(result.current.formCounts[FORM_STATUS_FILTER.ALL]).toBe(3);
    });

    it('상태별 폼 개수를 계산한다.', () => {
      const { result } = renderHook(() => useFormFilter(mockForms));

      expect(result.current.formCounts[FORM_STATUS_FILTER.IN_PROGRESS]).toBe(1);
      expect(result.current.formCounts[FORM_STATUS_FILTER.CLOSED]).toBe(1);
      expect(result.current.formCounts[FORM_STATUS_FILTER.BEFORE]).toBe(1);
    });

    it('생성된 폼이 없을 경우 폼의 개수는 0이다.', () => {
      const { result } = renderHook(() => useFormFilter(mockEmptyForms));

      expect(result.current.formCounts[FORM_STATUS_FILTER.ALL]).toBe(0);
      expect(result.current.formCounts[FORM_STATUS_FILTER.IN_PROGRESS]).toBe(0);
      expect(result.current.formCounts[FORM_STATUS_FILTER.CLOSED]).toBe(0);
      expect(result.current.formCounts[FORM_STATUS_FILTER.BEFORE]).toBe(0);
    });
  });

  describe('handleFilterChange 동작', () => {
    it('전체 필터로 변경하면 formFilter는 전체 상태로 업데이트한다.', () => {
      const { result } = renderHook(() => useFormFilter(mockForms));

      act(() => {
        result.current.handleFilterChange(FORM_STATUS_FILTER.ALL);
      });

      expect(result.current.formFilter).toBe(FORM_STATUS_FILTER.ALL);
    });

    it('진행 중 필터는 진행 중 폼만 반환한다', () => {
      const { result } = renderHook(() => useFormFilter(mockForms));

      act(() => {
        result.current.handleFilterChange(FORM_STATUS_FILTER.IN_PROGRESS);
      });

      expect(result.current.formFilter).toBe(FORM_STATUS_FILTER.IN_PROGRESS);
      expect(
        result.current.filteredForms.every(
          (form) => form.formStatus === '진행 중',
        ),
      ).toBe(true);
    });

    it('필터를 진행중으로 변경하면 해당 상태의 폼만 반환한다.', () => {
      const { result } = renderHook(() => useFormFilter(mockForms));

      act(() => {
        result.current.handleFilterChange(FORM_STATUS_FILTER.IN_PROGRESS);
      });

      expect(result.current.formFilter).toBe(FORM_STATUS_FILTER.IN_PROGRESS);
      expect(result.current.filteredForms).toHaveLength(1);
      expect(result.current.filteredForms[0].formStatus).toBe('진행 중');
    });

    it('필터를 마감으로 변경하면 해당 상태의 폼만 반환한다.', () => {
      const { result } = renderHook(() => useFormFilter(mockForms));

      act(() => {
        result.current.handleFilterChange(FORM_STATUS_FILTER.CLOSED);
      });

      expect(result.current.filteredForms).toHaveLength(1);
      expect(result.current.filteredForms[0].formStatus).toBe('마감');
    });

    it('필터를 진행전으로 변경하면 해당 상태의 폼을 반환한다.', () => {
      const { result } = renderHook(() => useFormFilter(mockForms));

      act(() => {
        result.current.handleFilterChange(FORM_STATUS_FILTER.BEFORE);
      });

      expect(result.current.filteredForms).toHaveLength(1);
      expect(result.current.filteredForms[0].formStatus).toBe('진행 전');
    });

    it('전체 필터로 다시 변경하면 모든 폼을 반환한다.', () => {
      const { result } = renderHook(() => useFormFilter(mockForms));

      act(() => {
        result.current.handleFilterChange(FORM_STATUS_FILTER.IN_PROGRESS);
      });

      expect(result.current.filteredForms).toHaveLength(1);

      act(() => {
        result.current.handleFilterChange(FORM_STATUS_FILTER.ALL);
      });

      expect(result.current.filteredForms).toHaveLength(3);
    });
  });

  describe('예외 케이스', () => {
    it('해당 상태의 폼이 없을 경우 빈 배열을 반환한다.', () => {
      const formsWithoutBefore: Form[] = [
        {
          formId: 1,
          title: '진행 중 폼',
          startDate: '2025-03-01',
          endDate: '2025-03-15',
          formStatus: '진행 중',
        },
      ];

      const { result } = renderHook(() => useFormFilter(formsWithoutBefore));

      act(() => {
        result.current.handleFilterChange(FORM_STATUS_FILTER.BEFORE);
      });

      expect(result.current.formFilter).toBe(FORM_STATUS_FILTER.BEFORE);
      expect(result.current.filteredForms).toHaveLength(0);
    });

    it('같은 상태의 폼들을 반환한다.', () => {
      const multipleInProgressForms: Form[] = [
        {
          formId: 1,
          title: '진행 중 폼 1',
          startDate: '2025-03-01',
          endDate: '2025-03-15',
          formStatus: '진행 중',
        },
        {
          formId: 2,
          title: '진행 중 폼 2',
          startDate: '2025-04-01',
          endDate: '2025-04-15',
          formStatus: '진행 중',
        },
        {
          formId: 3,
          title: '마감 폼',
          startDate: '2024-01-01',
          endDate: '2024-01-15',
          formStatus: '마감',
        },
      ];

      const { result } = renderHook(() =>
        useFormFilter(multipleInProgressForms),
      );

      act(() => {
        result.current.handleFilterChange(FORM_STATUS_FILTER.IN_PROGRESS);
      });

      expect(result.current.filteredForms).toHaveLength(2);
      expect(result.current.formCounts[FORM_STATUS_FILTER.IN_PROGRESS]).toBe(2);
    });

    it('존재하지 않는 상태로 변경 시 빈 배열을 반환한다.', () => {
      const { result } = renderHook(() => useFormFilter(mockForms));

      act(() => {
        result.current.handleFilterChange('존재하지 않는 상태');
      });

      expect(result.current.filteredForms).toHaveLength(0);
      expect(result.current.formFilter).toBe('존재하지 않는 상태');
    });
  });
});
