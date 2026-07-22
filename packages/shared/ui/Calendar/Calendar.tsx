'use client';

import { Button } from '../Button';
import { Flex } from '../Flex';
import { IconButton } from '../IconButton';
import { Body1, Caption1 } from '../Typography';

import { CalendarEvent } from './CalendarEvent';
import {
  createMonthGrid,
  getLocalCalendarDate,
  parseCalendarMonth,
  shiftCalendarMonth,
  type CalendarGridCell,
} from './calendarModel';
import { createCalendarEventLayout, type CalendarWeekLayout } from './eventLayout';

import type { CalendarEventData, CalendarProps } from './Calendar.types';

import { cn } from '@/shared/lib/core';

const WEEKDAY_LABELS = ['일', '월', '화', '수', '목', '금', '토'] as const;
const MIN_MONTH = parseCalendarMonth('0001-01').value;
const MAX_MONTH = parseCalendarMonth('9999-12').value;

const NAVIGATION_ICON_BUTTON_CLASS_NAME =
  'h-9 w-9 border border-gray-200 bg-white text-gray-500 hover:bg-gray-50 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-300 disabled:cursor-not-allowed disabled:text-gray-300 disabled:hover:bg-white';
const TODAY_BUTTON_CLASS_NAME =
  'inline-flex h-9 items-center justify-center gap-1 rounded-md border border-gray-200 bg-white px-3 text-gray-500 transition-colors hover:bg-gray-50 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-300 disabled:cursor-not-allowed disabled:text-gray-300 disabled:hover:bg-white';

type CalendarDayProps = {
  readonly cell: CalendarGridCell;
  readonly rowSpan: number;
  readonly today: string;
};

function CalendarDay({ cell, rowSpan, today }: CalendarDayProps) {
  const isToday = cell.value === today;
  const dateClassName = cn(
    'inline-flex size-6 items-center justify-center rounded-full',
    cell.isCurrentMonth ? 'text-gray-600' : 'text-gray-300',
    cell.weekdayIndex === 0 && cell.isCurrentMonth ? 'text-red-300' : '',
    isToday ? 'bg-primary-100 text-primary-300' : ''
  );
  const style = {
    gridColumnStart: cell.weekdayIndex + 1,
    gridRowStart: 1,
    gridRowEnd: rowSpan + 1,
  };

  return (
    <div
      className={cn(
        'relative z-0 border-r border-b border-gray-200 p-2 first:border-l',
        cell.weekdayIndex === 0 || cell.weekdayIndex === 6 ? 'bg-gray-50' : 'bg-white'
      )}
      style={style}
    >
      {cell.value === null ? (
        <span className={dateClassName}>
          <Caption1 as="span" weight="medium">
            {cell.day}
          </Caption1>
        </span>
      ) : (
        <time
          aria-current={isToday ? 'date' : undefined}
          className={dateClassName}
          dateTime={cell.value}
        >
          <Caption1 as="span" weight="medium">
            {cell.day}
          </Caption1>
        </time>
      )}
    </div>
  );
}

type CalendarWeekProps<TEvent extends CalendarEventData> = {
  readonly cells: readonly CalendarGridCell[];
  readonly layout: CalendarWeekLayout<TEvent>;
  readonly onEventClick?: (event: TEvent) => void;
  readonly today: string;
};

function CalendarWeek<TEvent extends CalendarEventData>({
  cells,
  layout,
  onEventClick,
  today,
}: CalendarWeekProps<TEvent>) {
  const rowSpan = Math.max(5, layout.laneCount + 2);
  const style = {
    gridTemplateRows: `36px repeat(${rowSpan - 1}, 24px)`,
  };

  return (
    <div className="grid grid-cols-7" style={style}>
      {cells.map((cell) => (
        <CalendarDay
          key={`${cell.ordinal}:${cell.weekdayIndex}`}
          cell={cell}
          rowSpan={rowSpan}
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
  className,
}: CalendarProps<TEvent>) {
  const parsedMonth = parseCalendarMonth(visibleMonth);
  const grid = createMonthGrid(visibleMonth);
  const eventLayout = createCalendarEventLayout(events, grid);
  const today = getLocalCalendarDate(new Date());
  const heading = `${parsedMonth.year}년 ${parsedMonth.month}월`;
  const canGoPrevious = visibleMonth !== MIN_MONTH;
  const canGoNext = visibleMonth !== MAX_MONTH;

  function goToPreviousMonth() {
    if (canGoPrevious) {
      onVisibleMonthChange(shiftCalendarMonth(visibleMonth, -1));
    }
  }

  function goToToday() {
    const localToday = getLocalCalendarDate(new Date());
    onVisibleMonthChange(parseCalendarMonth(localToday.slice(0, 7)).value);
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

        <div className="grid h-10 grid-cols-7 border-b border-gray-200 bg-gray-50">
          {WEEKDAY_LABELS.map((label, index) => (
            <Caption1
              as="div"
              key={label}
              weight="semibold"
              className={cn(
                'flex items-center justify-center text-gray-400',
                index === 0 ? 'text-red-300' : ''
              )}
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
            today={today}
          />
        ))}
      </section>
    </div>
  );
}
