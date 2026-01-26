import { renderHook } from '@testing-library/react';
import { describe, it, expect } from 'vitest';

import { useTerm } from '@/app/admin/report/_hooks/useTerm';

describe('useTerm', () => {
  const CURRENT_TERM = 15;

  describe('과거 학기 판단', () => {
    it('term이 14일 때 isClosed는 true이고 isFuture는 false이다', () => {
      const {
        result: {
          current: { isClosed, isFuture, currentTerm },
        },
      } = renderHook(() => useTerm(14));

      expect(isClosed).toBe(true);
      expect(isFuture).toBe(false);
      expect(currentTerm.term).toBe(CURRENT_TERM);
    });
  });

  describe('현재 학기 판단', () => {
    it('term이 15일 때 isClosed는 false이고 isFuture는 false이다', () => {
      const {
        result: {
          current: { isClosed, isFuture, currentTerm },
        },
      } = renderHook(() => useTerm(15));

      expect(isClosed).toBe(false);
      expect(isFuture).toBe(false);
      expect(currentTerm.term).toBe(CURRENT_TERM);
    });
  });

  describe('미래 학기 판단', () => {
    it('term이 16일 때 isClosed는 false이고 isFuture는 true이다', () => {
      const {
        result: {
          current: { isClosed, isFuture, currentTerm },
        },
      } = renderHook(() => useTerm(16));

      expect(isClosed).toBe(false);
      expect(isFuture).toBe(true);
      expect(currentTerm.term).toBe(CURRENT_TERM);
    });
  });

  describe('경계값 안정성', () => {
    it('isClosed와 isFuture는 동시에 true가 아니다', () => {
      const terms = [13, 14, 15, 16, 17];

      terms.forEach((term) => {
        const {
          result: {
            current: { isClosed, isFuture },
          },
        } = renderHook(() => useTerm(term));

        expect(isClosed && isFuture).toBe(false);
      });
    });

    it('현재 학기와 동일한 term일 때 isClosed와 isFuture 모두 false이다', () => {
      const {
        result: {
          current: { isClosed, isFuture },
        },
      } = renderHook(() => useTerm(CURRENT_TERM));

      expect(isClosed).toBe(false);
      expect(isFuture).toBe(false);
    });
  });
});
