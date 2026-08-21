import type { CalendarDate, CalendarMonth } from './Calendar.types';

export type ParsedCalendarDate = {
  readonly value: CalendarDate;
  readonly year: number;
  readonly month: number;
  readonly day: number;
  readonly ordinal: number;
};

export type ParsedCalendarMonth = {
  readonly value: CalendarMonth;
  readonly year: number;
  readonly month: number;
};

/** `value` is null only for grid spillover beyond public years 0001-9999. */
export type CalendarGridCell = Omit<ParsedCalendarDate, 'value'> & {
  readonly value: CalendarDate | null;
  readonly isCurrentMonth: boolean;
  readonly weekIndex: number;
  readonly weekdayIndex: number;
};

export type CalendarModelErrorCode =
  | 'INVALID_DATE'
  | 'INVALID_MONTH'
  | 'MONTH_SHIFT_OUT_OF_RANGE'
  | 'GRID_OUT_OF_RANGE';

export class CalendarModelError extends Error {
  readonly name = 'CalendarModelError';

  constructor(
    readonly code: CalendarModelErrorCode,
    readonly input: string,
    message: string
  ) {
    super(message);
  }
}

const MIN_YEAR = 1;
const MAX_YEAR = 9999;
const MONTHS_PER_YEAR = 12;
const DAYS_PER_WEEK = 7;

function isLeapYear(year: number): boolean {
  return year % 4 === 0 && (year % 100 !== 0 || year % 400 === 0);
}

function getDaysInMonth(year: number, month: number): number {
  if (month === 2) {
    return isLeapYear(year) ? 29 : 28;
  }

  return month === 4 || month === 6 || month === 9 || month === 11 ? 30 : 31;
}

function getDaysBeforeMonth(year: number, month: number): number {
  const cumulativeDays = [0, 31, 59, 90, 120, 151, 181, 212, 243, 273, 304, 334];
  const days = cumulativeDays[month - 1];

  if (days === undefined) {
    throw new CalendarModelError(
      'INVALID_MONTH',
      String(month),
      `Invalid calendar month number "${month}"`
    );
  }

  return month > 2 && isLeapYear(year) ? days + 1 : days;
}

function getOrdinal(year: number, month: number, day: number): number {
  const previousYear = year - 1;
  return (
    previousYear * 365 +
    Math.floor(previousYear / 4) -
    Math.floor(previousYear / 100) +
    Math.floor(previousYear / 400) +
    getDaysBeforeMonth(year, month) +
    day
  );
}

function formatDate(year: number, month: number, day: number): string {
  return `${String(year).padStart(4, '0')}-${String(month).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
}

function formatMonth(year: number, month: number): string {
  return `${String(year).padStart(4, '0')}-${String(month).padStart(2, '0')}`;
}

function isCalendarDate(value: string): value is CalendarDate {
  if (!/^\d{4}-\d{2}-\d{2}$/.test(value)) {
    return false;
  }

  const year = Number(value.slice(0, 4));
  const month = Number(value.slice(5, 7));
  const day = Number(value.slice(8, 10));
  return (
    year >= MIN_YEAR &&
    year <= MAX_YEAR &&
    month >= 1 &&
    month <= MONTHS_PER_YEAR &&
    day >= 1 &&
    day <= 31
  );
}

function isCalendarMonth(value: string): value is CalendarMonth {
  if (!/^\d{4}-\d{2}$/.test(value)) {
    return false;
  }

  const year = Number(value.slice(0, 4));
  const month = Number(value.slice(5, 7));
  return year >= MIN_YEAR && year <= MAX_YEAR && month >= 1 && month <= MONTHS_PER_YEAR;
}

function invalidDate(value: string): never {
  throw new CalendarModelError('INVALID_DATE', value, `Invalid calendar date "${value}"`);
}

function invalidMonth(value: string): never {
  throw new CalendarModelError('INVALID_MONTH', value, `Invalid calendar month "${value}"`);
}

export function parseCalendarDate(value: string): ParsedCalendarDate {
  if (!isCalendarDate(value)) {
    return invalidDate(value);
  }

  const year = Number(value.slice(0, 4));
  const month = Number(value.slice(5, 7));
  const day = Number(value.slice(8, 10));

  if (day > getDaysInMonth(year, month)) {
    return invalidDate(value);
  }

  return {
    value,
    year,
    month,
    day,
    ordinal: getOrdinal(year, month, day),
  };
}

export function parseCalendarMonth(value: string): ParsedCalendarMonth {
  if (!isCalendarMonth(value)) {
    return invalidMonth(value);
  }

  const year = Number(value.slice(0, 4));
  const month = Number(value.slice(5, 7));

  return { value, year, month };
}

export function shiftCalendarMonth(visibleMonth: CalendarMonth, offset: number): CalendarMonth {
  const { year, month } = parseCalendarMonth(visibleMonth);
  const monthIndex = (year - MIN_YEAR) * MONTHS_PER_YEAR + month - 1 + offset;
  const maximumMonthIndex = (MAX_YEAR - MIN_YEAR + 1) * MONTHS_PER_YEAR - 1;

  if (!Number.isInteger(offset) || monthIndex < 0 || monthIndex > maximumMonthIndex) {
    throw new CalendarModelError(
      'MONTH_SHIFT_OUT_OF_RANGE',
      `${visibleMonth}:${offset}`,
      `Calendar month shift is out of range: "${visibleMonth}" + ${offset}`
    );
  }

  const shiftedYear = Math.floor(monthIndex / MONTHS_PER_YEAR) + MIN_YEAR;
  const shiftedMonth = (monthIndex % MONTHS_PER_YEAR) + 1;
  return parseCalendarMonth(formatMonth(shiftedYear, shiftedMonth)).value;
}

function getDateFromOrdinal(
  ordinal: number
): Omit<ParsedCalendarDate, 'value'> & { readonly value: CalendarDate | null } {
  let minimumYear = MIN_YEAR - 1;
  let maximumYear = MAX_YEAR + 1;

  while (minimumYear <= maximumYear) {
    const candidateYear = Math.floor((minimumYear + maximumYear) / 2);
    const firstOrdinal = getOrdinal(candidateYear, 1, 1);
    const nextYearOrdinal = getOrdinal(candidateYear + 1, 1, 1);

    if (ordinal < firstOrdinal) {
      maximumYear = candidateYear - 1;
    } else if (ordinal >= nextYearOrdinal) {
      minimumYear = candidateYear + 1;
    } else {
      const dayOfYear = ordinal - firstOrdinal + 1;
      let month = 1;
      let precedingDays = 0;

      while (dayOfYear > precedingDays + getDaysInMonth(candidateYear, month)) {
        precedingDays += getDaysInMonth(candidateYear, month);
        month += 1;
      }

      const day = dayOfYear - precedingDays;
      const formattedDate = formatDate(candidateYear, month, day);
      const value =
        candidateYear >= MIN_YEAR && candidateYear <= MAX_YEAR
          ? parseCalendarDate(formattedDate).value
          : null;
      return { value, year: candidateYear, month, day, ordinal };
    }
  }

  throw new CalendarModelError(
    'GRID_OUT_OF_RANGE',
    String(ordinal),
    `Calendar grid date is out of range at ordinal ${ordinal}`
  );
}

export function createMonthGrid(visibleMonth: CalendarMonth): readonly CalendarGridCell[] {
  const { year, month } = parseCalendarMonth(visibleMonth);
  const firstOrdinal = getOrdinal(year, month, 1);
  const firstWeekday = firstOrdinal % DAYS_PER_WEEK;
  const gridStartOrdinal = firstOrdinal - firstWeekday;
  const weekCount = Math.ceil((firstWeekday + getDaysInMonth(year, month)) / DAYS_PER_WEEK);
  const gridCellCount = weekCount * DAYS_PER_WEEK;

  return Array.from({ length: gridCellCount }, (_, index) => {
    const date = getDateFromOrdinal(gridStartOrdinal + index);
    return {
      ...date,
      isCurrentMonth: date.year === year && date.month === month,
      weekIndex: Math.floor(index / DAYS_PER_WEEK),
      weekdayIndex: index % DAYS_PER_WEEK,
    };
  });
}

export function getLocalCalendarDate(value: Date): CalendarDate {
  if (Number.isNaN(value.getTime())) {
    return invalidDate(value.toString());
  }

  const year = value.getFullYear();
  const month = value.getMonth() + 1;
  const day = value.getDate();
  return parseCalendarDate(formatDate(year, month, day)).value;
}
