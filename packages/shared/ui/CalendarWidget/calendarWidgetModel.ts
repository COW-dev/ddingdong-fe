import {
  getLocalCalendarDate,
  parseCalendarDate,
  parseCalendarMonth,
} from '../Calendar/calendarModel';

import type { CalendarDate, CalendarMonth } from '../Calendar';
import type { CalendarWidgetRange } from './CalendarWidget.types';

export function getCalendarMonth(date: CalendarDate): CalendarMonth {
  return parseCalendarMonth(date.slice(0, 7)).value;
}

function toLocalDate(date: CalendarDate): Date {
  const parsed = parseCalendarDate(date);
  const value = new Date(0);
  value.setFullYear(parsed.year, parsed.month - 1, parsed.day);
  value.setHours(0, 0, 0, 0);
  return value;
}

export function shiftCalendarDate(date: CalendarDate, dayOffset: number): CalendarDate {
  const value = toLocalDate(date);
  value.setDate(value.getDate() + dayOffset);

  if (value.getFullYear() < 1) return parseCalendarDate('0001-01-01').value;
  if (value.getFullYear() > 9999) return parseCalendarDate('9999-12-31').value;

  return getLocalCalendarDate(value);
}

export function clampCalendarDate(
  date: CalendarDate,
  minDate: CalendarDate,
  maxDate: CalendarDate
): CalendarDate {
  if (date < minDate) return minDate;
  if (date > maxDate) return maxDate;
  return date;
}

export function isDateEnabled(
  date: CalendarDate,
  minDate: CalendarDate,
  maxDate: CalendarDate
): boolean {
  return date >= minDate && date <= maxDate;
}

export function getNextRange(
  value: CalendarWidgetRange,
  selectedDate: CalendarDate
): CalendarWidgetRange {
  if (!value.startDate || value.endDate || selectedDate < value.startDate) {
    return { startDate: selectedDate, endDate: null };
  }

  return { startDate: value.startDate, endDate: selectedDate };
}

export function formatWidgetDate(date: CalendarDate | null): string {
  return date ? date.slice(2).replaceAll('-', '.') : 'YY.MM.DD';
}
