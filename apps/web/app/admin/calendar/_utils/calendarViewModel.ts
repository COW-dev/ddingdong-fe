import { parseCalendarDate, type CalendarDate } from '@dds/shared';

import type { CalendarEventResponse } from '@/_api/types/calendar';

export type CalendarPageEvent = {
  readonly id: string;
  readonly eventId: number;
  readonly title: string;
  readonly startDate: CalendarDate;
  readonly endDate: CalendarDate;
  readonly color: string;
};

export function getCurrentCalendarDate(): CalendarDate {
  const value = new Intl.DateTimeFormat('sv-SE', {
    timeZone: 'Asia/Seoul',
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
  }).format(new Date());

  return parseCalendarDate(value).value;
}

export function toCalendarPageEvents(
  events: readonly CalendarEventResponse[],
): readonly CalendarPageEvent[] {
  return events.map((event) => ({
    id: String(event.id),
    eventId: event.id,
    title: event.title,
    startDate: parseCalendarDate(event.startDate).value,
    endDate: parseCalendarDate(event.endDate).value,
    color: event.color,
  }));
}
