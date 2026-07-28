'use client';

import { useMemo, useState } from 'react';

import {
  Body3,
  Button,
  Calendar,
  Flex,
  parseCalendarMonth,
  Title2,
} from '@dds/shared';
import { keepPreviousData, useQuery } from '@tanstack/react-query';

import { calendarQueryOptions } from '@/_api/queries/calendar';
import { ROLE_TYPE, type Role } from '@/_constants/role';

import {
  getCurrentCalendarDate,
  toCalendarPageEvents,
  type CalendarPageEvent,
} from '../_utils/calendarViewModel';

import { CalendarCategoryModal } from './CalendarCategoryModal';
import { CalendarEventModal } from './CalendarEventModal';

type CalendarSectionProps = {
  readonly role: Role;
};

export function CalendarSection({ role }: CalendarSectionProps) {
  const isAdmin = role === ROLE_TYPE.ROLE_ADMIN;
  const [visibleMonth, setVisibleMonth] = useState(
    parseCalendarMonth(getCurrentCalendarDate().slice(0, 7)).value,
  );
  const [selectedEventId, setSelectedEventId] = useState<number | null>(null);
  const [isCreateOpen, setIsCreateOpen] = useState(false);
  const [isCategoryOpen, setIsCategoryOpen] = useState(false);
  const { year, month } = parseCalendarMonth(visibleMonth);
  const queryScope = isAdmin ? 'admin' : 'club';
  const { data, isError } = useQuery({
    ...calendarQueryOptions.month(queryScope, year, month),
    placeholderData: keepPreviousData,
  });
  const { data: categoryData, isError: isCategoryError } = useQuery({
    ...calendarQueryOptions.categories(),
    enabled: isAdmin,
  });
  const categories = categoryData?.categories ?? [];
  const events = useMemo(
    () => toCalendarPageEvents(data?.events ?? []),
    [data?.events],
  );

  function handleEventClick(event: CalendarPageEvent) {
    setSelectedEventId(event.eventId);
  }

  return (
    <Flex as="section" dir="col" className="mt-8 w-full">
      <Flex
        alignItems="center"
        justifyContent="between"
        wrap="wrap"
        className="gap-4 py-5"
      >
        <Title2 as="h2" weight="bold">
          일정 캘린더
        </Title2>
        {isAdmin && (
          <>
            <Flex wrap="wrap" className="gap-2">
              <Button
                variant="secondary"
                color="blue"
                size="md"
                onClick={() => setIsCategoryOpen(true)}
              >
                <Body3 weight="semibold">카테고리 관리</Body3>
              </Button>
              <Button
                variant="primary"
                color="blue"
                size="md"
                disabled={isCategoryError}
                onClick={() => setIsCreateOpen(true)}
              >
                <Body3 weight="semibold">일정 등록</Body3>
              </Button>
            </Flex>
            {isCategoryError && (
              <Body3 role="alert" className="mt-2 text-red-300">
                카테고리를 불러오지 못해 일정을 등록할 수 없어요.
              </Body3>
            )}
          </>
        )}
      </Flex>

      {isError && (
        <Flex
          alignItems="center"
          justifyContent="end"
          className="min-h-10 border-y border-gray-200 bg-gray-50 px-4 py-3"
        >
          <span role="alert" className="text-sm font-medium text-red-300">
            일정을 불러오지 못했어요. 잠시 후 다시 시도해 주세요.
          </span>
        </Flex>
      )}

      <Calendar
        visibleMonth={visibleMonth}
        events={events}
        onVisibleMonthChange={setVisibleMonth}
        onEventClick={isAdmin ? handleEventClick : undefined}
        className="border-x border-b border-gray-200"
      />

      {isAdmin && (
        <>
          <CalendarEventModal
            mode="create"
            categories={categories}
            isOpen={isCreateOpen}
            closeModal={() => setIsCreateOpen(false)}
          />
          {selectedEventId !== null && (
            <CalendarEventModal
              mode="edit"
              eventId={selectedEventId}
              categories={categories}
              isOpen
              closeModal={() => setSelectedEventId(null)}
            />
          )}
          <CalendarCategoryModal
            categories={categories}
            isOpen={isCategoryOpen}
            closeModal={() => setIsCategoryOpen(false)}
          />
        </>
      )}
    </Flex>
  );
}
