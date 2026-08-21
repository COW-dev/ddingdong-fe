'use client';

import { useEffect, useState } from 'react';

import { Button } from '../Button';
import { Flex } from '../Flex';
import { IconButton } from '../IconButton';
import { Body1, Body3, Caption1 } from '../Typography';

import { CalendarEvent } from './CalendarEvent';
import {
  createMonthGrid,
  getLocalCalendarDate,
  parseCalendarMonth,
  shiftCalendarMonth,
  type CalendarGridCell,
} from './calendarModel';
import { createCalendarEventLayout, type CalendarWeekLayout } from './eventLayout';

import type {
  CalendarDate,
  CalendarEventData,
  CalendarMonth,
  CalendarProps,
} from './Calendar.types';

import { cn } from '@/shared/lib/core';

const WEEKDAYS = [
  { label: 'Sun', className: 'justify-end pr-2' },
  { label: 'Mon', className: 'justify-end pr-4' },
  { label: 'Tue', className: 'justify-end pr-6' },
  { label: 'Wed', className: 'justify-center' },
  { label: 'Thu', className: 'justify-start pl-6' },
  { label: 'Fri', className: 'justify-start pl-4' },
  { label: 'Sat', className: 'justify-start pl-2' },
] as const;
const MIN_MONTH = parseCalendarMonth('0001-01').value;
const MAX_MONTH = parseCalendarMonth('9999-12').value;

const NAVIGATION_ICON_BUTTON_CLASS_NAME =
  'inline-flex h-9 w-9 items-center justify-center rounded-full border-0 bg-gray-50 p-0 text-gray-500 hover:bg-gray-100 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-300 disabled:cursor-not-allowed disabled:text-gray-300 disabled:hover:bg-gray-50';
const TODAY_BUTTON_CLASS_NAME =
  'inline-flex h-9 items-center justify-center gap-1 rounded-md border-0 bg-white px-3 text-gray-600 transition-colors hover:bg-gray-50 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-300 disabled:cursor-not-allowed disabled:text-gray-300 disabled:hover:bg-white';

type CalendarDayProps = {
  readonly cell: CalendarGridCell;
  readonly rowSpan: number;
  readonly today: CalendarDate | null;
  readonly onDateCreate?: (date: CalendarDate) => void;
};

function CalendarDay({ cell, rowSpan, today, onDateCreate }: CalendarDayProps) {
  const isToday = cell.value === today;
  const date = cell.value;
  const dateClassName = cn(
    'inline-flex size-9 items-center justify-center',
    cell.isCurrentMonth ? 'text-gray-600' : 'text-gray-300',
    isToday ? 'rounded-md bg-primary-300 text-white' : ''
  );
  const style = {
    gridColumnStart: cell.weekdayIndex + 1,
    gridRowStart: 1,
    gridRowEnd: rowSpan + 1,
  };

  return (
    <div
      className={cn(
        'relative z-0 flex justify-end border-r border-b border-gray-200 p-2 first:border-l',
        cell.weekIndex === 0 ? 'border-t' : '',
        cell.weekdayIndex === 0 || cell.weekdayIndex === 6 ? 'bg-gray-50' : 'bg-white',
        onDateCreate ? 'group' : ''
      )}
      style={style}
    >
      {date !== null && cell.isCurrentMonth && onDateCreate !== undefined && (
        <IconButton
          aria-label={`${cell.year}년 ${cell.month}월 ${cell.day}일 일정 추가`}
          className="focus-visible:outline-primary-300 absolute top-2 left-2 z-20 size-9 opacity-0 transition-opacity group-hover:opacity-100 hover:bg-transparent focus-visible:opacity-100 focus-visible:outline-2 focus-visible:outline-offset-1"
          color="gray"
          iconName="add"
          size={16}
          onClick={() => onDateCreate(date)}
        />
      )}
      {cell.value === null ? (
        <span className={dateClassName}>
          <Body3 as="span" weight="semibold">
            {cell.day}
          </Body3>
        </span>
      ) : (
        <time
          aria-current={isToday ? 'date' : undefined}
          className={dateClassName}
          dateTime={cell.value}
        >
          <Body3 as="span" weight="semibold">
            {cell.day}
          </Body3>
        </time>
      )}
    </div>
  );
}

type CalendarWeekProps<TEvent extends CalendarEventData> = {
  readonly cells: readonly CalendarGridCell[];
  readonly layout: CalendarWeekLayout<TEvent>;
  readonly onEventClick?: (event: TEvent) => void;
  readonly onDateCreate?: (date: CalendarDate) => void;
  readonly today: CalendarDate | null;
};

function CalendarWeek<TEvent extends CalendarEventData>({
  cells,
  layout,
  onEventClick,
  onDateCreate,
  today,
}: CalendarWeekProps<TEvent>) {
  const rowSpan = Math.max(5, layout.laneCount + 2);
  const style = {
    gridTemplateRows: `44px repeat(${rowSpan - 1}, 24px)`,
  };

  return (
    <div className="grid grid-cols-7" style={style}>
      {cells.map((cell) => (
        <CalendarDay
          key={`${cell.ordinal}:${cell.weekdayIndex}`}
          cell={cell}
          rowSpan={rowSpan}
          onDateCreate={onDateCreate}
          today={today}
        />
      ))}
      {layout.segments.map((segment) => (
        <CalendarEvent
          key={`${segment.event.id}:${segment.weekIndex}`}
          event={segment.event}
          kind={segment.kind}
          accessibleLabel={segment.accessibleLabel}
          onEventClick={onEventClick}
          style={{
            gridColumnStart: segment.startColumn + 1,
            gridColumnEnd: segment.endColumn + 2,
            gridRow: segment.lane + 2,
          }}
        />
      ))}
    </div>
  );
}

export function Calendar<TEvent extends CalendarEventData = CalendarEventData>({
  visibleMonth,
  events,
  onVisibleMonthChange,
  onEventClick,
  onDateCreate,
  className,
}: CalendarProps<TEvent>) {
  const [today, setToday] = useState<{
    readonly date: CalendarDate;
    readonly month: CalendarMonth;
  } | null>(null);
  const parsedMonth = parseCalendarMonth(visibleMonth);
  const grid = createMonthGrid(visibleMonth);
  const eventLayout = createCalendarEventLayout(events, grid);
  const heading = `${parsedMonth.year}년 ${parsedMonth.month}월`;
  const canGoPrevious = visibleMonth !== MIN_MONTH;
  const canGoNext = visibleMonth !== MAX_MONTH;

  useEffect(() => {
    const date = getLocalCalendarDate(new Date());
    setToday({ date, month: parseCalendarMonth(date.slice(0, 7)).value });
  }, []);

  function goToPreviousMonth() {
    if (canGoPrevious) {
      onVisibleMonthChange(shiftCalendarMonth(visibleMonth, -1));
    }
  }

  function goToToday() {
    if (today !== null) {
      onVisibleMonthChange(today.month);
    }
  }

  function goToNextMonth() {
    if (canGoNext) {
      onVisibleMonthChange(shiftCalendarMonth(visibleMonth, 1));
    }
  }

  return (
    <div className={cn('w-full overflow-x-auto overflow-y-visible', className)}>
      <section aria-label={`${heading} 일정 달력`} className="min-w-[720px] bg-white text-gray-600">
        <Flex as="header" alignItems="center" justifyContent="between" className="h-20 px-6">
          <Body1 as="h2" aria-live="polite" weight="bold">
            {heading}
          </Body1>
          <Flex as="nav" aria-label="달력 월 이동" alignItems="center" className="gap-3">
            <IconButton
              aria-label="이전 달"
              className={NAVIGATION_ICON_BUTTON_CLASS_NAME}
              disabled={!canGoPrevious}
              iconName="arrowLeft"
              onClick={goToPreviousMonth}
              size={16}
            />
            <Button
              variant="tertiary"
              size="sm"
              className={TODAY_BUTTON_CLASS_NAME}
              onClick={goToToday}
            >
              <Caption1 as="span" weight="medium">
                오늘
              </Caption1>
            </Button>
            <IconButton
              aria-label="다음 달"
              className={NAVIGATION_ICON_BUTTON_CLASS_NAME}
              disabled={!canGoNext}
              iconName="arrowRight"
              onClick={goToNextMonth}
              size={16}
            />
          </Flex>
        </Flex>

        <div className="grid h-10 grid-cols-7 bg-white">
          {WEEKDAYS.map(({ label, className: alignmentClassName }) => (
            <Caption1
              as="div"
              key={label}
              weight="semibold"
              className={cn('flex items-center text-gray-400', alignmentClassName)}
            >
              {label}
            </Caption1>
          ))}
        </div>

        {eventLayout.map((layout) => (
          <CalendarWeek
            key={layout.weekIndex}
            cells={grid.filter(({ weekIndex }) => weekIndex === layout.weekIndex)}
            layout={layout}
            onEventClick={onEventClick}
            onDateCreate={onDateCreate}
            today={today?.date ?? null}
          />
        ))}
      </section>
    </div>
  );
}
