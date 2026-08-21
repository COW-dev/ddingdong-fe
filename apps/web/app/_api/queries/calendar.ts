import { queryOptions } from '@tanstack/react-query';

import { fetcher } from '../fetcher';
import {
  calendarCategoriesResponseSchema,
  calendarEventResponseSchema,
  calendarResponseSchema,
} from '../types/calendar';

type CalendarQueryScope = 'admin' | 'club';

async function getCalendar(
  scope: CalendarQueryScope,
  year: number,
  month: number,
) {
  const pathname = scope === 'admin' ? 'admin/calendar' : 'central/calendar';
  const response = await fetcher.get<unknown>(pathname, {
    searchParams: { year, month },
  });

  return calendarResponseSchema.parse(response);
}

export const calendarQueryKeys = {
  all: () => ['calendar'] as const,
  admin: () => [...calendarQueryKeys.all(), 'admin'] as const,
  month: (scope: CalendarQueryScope, year: number, month: number) =>
    [...calendarQueryKeys.all(), scope, 'month', year, month] as const,
  event: (eventId: number) =>
    [...calendarQueryKeys.admin(), 'event', eventId] as const,
  categories: () => [...calendarQueryKeys.admin(), 'categories'] as const,
};

export const calendarQueryOptions = {
  month: (scope: CalendarQueryScope, year: number, month: number) =>
    queryOptions({
      queryKey: calendarQueryKeys.month(scope, year, month),
      queryFn: () => getCalendar(scope, year, month),
    }),
  event: (eventId: number) =>
    queryOptions({
      queryKey: calendarQueryKeys.event(eventId),
      queryFn: async () => {
        const response = await fetcher.get<unknown>(
          `admin/calendar/events/${eventId}`,
        );

        return calendarEventResponseSchema.parse(response);
      },
    }),
  categories: () =>
    queryOptions({
      queryKey: calendarQueryKeys.categories(),
      queryFn: async () => {
        const response = await fetcher.get<unknown>(
          'admin/calendar/categories',
        );

        return calendarCategoriesResponseSchema.parse(response);
      },
    }),
};
