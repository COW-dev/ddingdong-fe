type DateInput = Date | string | null | undefined;

const DATE_ONLY_PATTERN = /^(\d{4})-(\d{2})-(\d{2})$/;
const DATE_TIME_PATTERN =
  /^(\d{4})-(\d{2})-(\d{2})T(\d{2}):(\d{2}):(\d{2})(?:\.\d+)?(?:Z|[+-]\d{2}:\d{2})?$/;

function parseDateMatch(match: RegExpExecArray): Date | null {
  const year = Number(match[1]);
  const month = Number(match[2]);
  const day = Number(match[3]);
  const date = new Date(year, month - 1, day);

  return date.getFullYear() === year &&
    date.getMonth() === month - 1 &&
    date.getDate() === day
    ? date
    : null;
}

function parseDate(value: DateInput): Date | null {
  if (!value) return null;

  if (value instanceof Date) {
    return Number.isNaN(value.getTime()) ? null : value;
  }

  const dateOnlyMatch = DATE_ONLY_PATTERN.exec(value);
  const dateTimeMatch = DATE_TIME_PATTERN.exec(value);
  if (
    dateTimeMatch &&
    (!parseDateMatch(dateTimeMatch) ||
      Number(dateTimeMatch[4]) > 23 ||
      Number(dateTimeMatch[5]) > 59 ||
      Number(dateTimeMatch[6]) > 59)
  ) {
    return null;
  }
  const date = dateOnlyMatch ? parseDateMatch(dateOnlyMatch) : new Date(value);

  return !date || Number.isNaN(date.getTime()) ? null : date;
}

function formatDateParts(date: Date, separator: string, shortYear = false) {
  const year = String(date.getFullYear());
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');

  return [shortYear ? year.slice(2) : year, month, day].join(separator);
}

export function formatDateOnly(value: DateInput): string {
  const date = parseDate(value);
  return date ? formatDateParts(date, '-') : '';
}

export function formatShortDate(value: DateInput): string {
  const date = parseDate(value);
  return date ? formatDateParts(date, '.', true) : '';
}

export function formatDateTime(value: DateInput): string {
  if (!value) return '';

  if (typeof value === 'string') {
    const match = DATE_TIME_PATTERN.exec(value);
    if (
      !match ||
      !parseDateMatch(match) ||
      Number(match[4]) > 23 ||
      Number(match[5]) > 59 ||
      Number(match[6]) > 59
    ) {
      return '';
    }

    return `${match[1]}-${match[2]}-${match[3]} ${match[4]}:${match[5]}:${match[6]}`;
  }

  const date = parseDate(value);
  if (!date) return '';

  const hours = String(date.getHours()).padStart(2, '0');
  const minutes = String(date.getMinutes()).padStart(2, '0');
  const seconds = String(date.getSeconds()).padStart(2, '0');
  return `${formatDateParts(date, '-')} ${hours}:${minutes}:${seconds}`;
}

export function formatRelativeTime(dateString: string): string {
  const date = new Date(dateString);
  if (Number.isNaN(date.getTime())) return '';

  const now = new Date();

  const diffMs = now.getTime() - date.getTime();
  const diffSeconds = Math.floor(diffMs / 1000);
  const diffMinutes = Math.floor(diffSeconds / 60);

  if (diffMinutes < 1) return '지금';
  if (diffMinutes < 60) return `${diffMinutes}분 전`;

  const isToday =
    date.getDate() === now.getDate() &&
    date.getMonth() === now.getMonth() &&
    date.getFullYear() === now.getFullYear();

  if (isToday) {
    const hours = String(date.getHours()).padStart(2, '0');
    const minutes = String(date.getMinutes()).padStart(2, '0');
    return `${hours}:${minutes}`;
  }

  return formatDateParts(date, '.', true);
}
