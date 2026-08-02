import { useMutation, useQueryClient } from '@tanstack/react-query';

import { fetcher } from '../fetcher';
import { calendarQueryKeys } from '../queries/calendar';

import type {
  CalendarCategoryRequest,
  CalendarEventRequest,
} from '../types/calendar';

type UpdateCalendarEventVariables = {
  readonly eventId: number;
  readonly request: CalendarEventRequest;
};

type UpdateCalendarCategoryVariables = {
  readonly categoryId: number;
  readonly request: CalendarCategoryRequest;
};

function useCalendarMutation<TVariables>(
  mutationFn: (variables: TVariables) => Promise<void>,
  queryKey: readonly unknown[] = calendarQueryKeys.admin(),
) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn,
    onSuccess: () => queryClient.invalidateQueries({ queryKey }),
  });
}

export function useCreateCalendarEvent() {
  return useCalendarMutation((request: CalendarEventRequest) =>
    fetcher.postWithoutResponse('admin/calendar/events', { json: request }),
  );
}

export function useUpdateCalendarEvent() {
  return useCalendarMutation(
    ({ eventId, request }: UpdateCalendarEventVariables) =>
      fetcher.putWithoutResponse(`admin/calendar/events/${eventId}`, {
        json: request,
      }),
  );
}

export function useDeleteCalendarEvent() {
  return useCalendarMutation((eventId: number) =>
    fetcher.deleteWithoutResponse(`admin/calendar/events/${eventId}`),
  );
}

export function useCreateCalendarCategory() {
  return useCalendarMutation(
    (request: CalendarCategoryRequest) =>
      fetcher.postWithoutResponse('admin/calendar/category', {
        json: request,
      }),
    calendarQueryKeys.categories(),
  );
}

export function useUpdateCalendarCategory() {
  return useCalendarMutation(
    ({ categoryId, request }: UpdateCalendarCategoryVariables) =>
      fetcher.putWithoutResponse(`admin/calendar/category/${categoryId}`, {
        json: request,
      }),
  );
}

export function useDeleteCalendarCategory() {
  return useCalendarMutation((categoryId: number) =>
    fetcher.deleteWithoutResponse(`admin/calendar/category/${categoryId}`),
  );
}
