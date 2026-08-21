import { describe, expect, it, vi } from 'vitest';

import {
  formatDateOnly,
  formatDateTime,
  formatRelativeTime,
  formatShortDate,
} from '@/_utils/date';

describe('date utilities', () => {
  describe('formatDateOnly', () => {
    it('formats a local date without shifting the calendar day', () => {
      // Given
      const date = '2026-07-15';

      // When
      const result = formatDateOnly(date);

      // Then
      expect(result).toBe('2026-07-15');
    });
  });

  describe('formatShortDate', () => {
    it('formats a date using the existing application period format', () => {
      // Given
      const date = '2026-07-15';

      // When
      const result = formatShortDate(date);

      // Then
      expect(result).toBe('26.07.15');
    });
  });

  describe('formatDateTime', () => {
    it('preserves the date and time represented by an API timestamp', () => {
      // Given
      const timestamp = '2026-07-15T14:30:00.123Z';

      // When
      const result = formatDateTime(timestamp);

      // Then
      expect(result).toBe('2026-07-15 14:30:00');
    });
  });

  it.each([null, undefined, '', 'invalid'])(
    'returns an empty string for %s',
    (value) => {
      // Given
      const invalidDate = value;

      // When
      const results = [
        formatDateOnly(invalidDate),
        formatShortDate(invalidDate),
        formatDateTime(invalidDate),
      ];

      // Then
      expect(results).toEqual(['', '', '']);
    },
  );

  it('rejects calendar dates and times that overflow their valid ranges', () => {
    // Given
    const invalidDate = '2026-02-30';
    const invalidDateTime = '2026-07-15T25:00:00Z';

    // When
    const results = [
      formatDateOnly(invalidDate),
      formatShortDate(invalidDate),
      formatDateTime(invalidDateTime),
    ];

    // Then
    expect(results).toEqual(['', '', '']);
  });

  describe('formatRelativeTime', () => {
    it('preserves the existing minute boundary behavior', () => {
      // Given
      vi.useFakeTimers();
      try {
        vi.setSystemTime(new Date(2026, 6, 15, 14, 30));

        // When
        const result = formatRelativeTime(
          new Date(2026, 6, 15, 14, 29).toISOString(),
        );

        // Then
        expect(result).toBe('1분 전');
      } finally {
        vi.useRealTimers();
      }
    });
  });
});
