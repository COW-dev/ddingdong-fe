'use client';

import { useEffect, useMemo, useRef, useState, type KeyboardEvent } from 'react';

import {
  createMonthGrid,
  getLocalCalendarDate,
  parseCalendarMonth,
  shiftCalendarMonth,
  type CalendarDate,
} from '../Calendar';
import { Flex } from '../Flex';
import { IconButton } from '../IconButton';
import { Body1, Body3, Caption1 } from '../Typography';

import { CalendarWidgetDay } from './CalendarWidgetDay';
import {
  clampCalendarDate,
  formatWidgetDate,
  getCalendarMonth,
  getNextRange,
  isDateEnabled,
  shiftCalendarDate,
} from './calendarWidgetModel';

import type { CalendarWidgetProps } from './CalendarWidget.types';

const WEEKDAYS = ['일', '월', '화', '수', '목', '금', '토'] as const;

function getRangePosition(
  date: CalendarDate,
  startDate: CalendarDate | null,
  endDate: CalendarDate | null
) {
  if (date === startDate && date === endDate) return 'single';
  if (date === startDate) return 'start';
  if (date === endDate) return 'end';
  if (startDate && endDate && date > startDate && date < endDate) return 'middle';
  return 'none';
}

export function CalendarWidget(props: CalendarWidgetProps) {
  const today = getLocalCalendarDate(new Date());
  const selectedDate =
    props.mode === 'single' ? props.value : (props.value.endDate ?? props.value.startDate);
  const initialFocus = clampCalendarDate(selectedDate ?? today, props.minDate, props.maxDate);
  const [focusedDate, setFocusedDate] = useState(initialFocus);
  const shouldMoveFocus = useRef(false);
  const grid = useMemo(() => createMonthGrid(props.visibleMonth), [props.visibleMonth]);
  const parsedMonth = parseCalendarMonth(props.visibleMonth);
  const heading = `${parsedMonth.year}년 ${parsedMonth.month}월`;
  const range =
    props.mode === 'range' ? props.value : { startDate: props.value, endDate: props.value };

  useEffect(() => {
    if (!shouldMoveFocus.current) return;
    const element = document.getElementById(`calendar-widget-${focusedDate}`);
    if (element instanceof HTMLButtonElement) {
      element.focus();
      shouldMoveFocus.current = false;
    }
  }, [focusedDate, props.visibleMonth]);

  function selectDate(date: CalendarDate) {
    if (props.disabled || !isDateEnabled(date, props.minDate, props.maxDate)) {
      return;
    }

    setFocusedDate(date);

    if (props.mode === 'single') {
      props.onChange(date);
      return;
    }

    props.onChange(getNextRange(props.value, date));
  }

  function moveFocus(date: CalendarDate) {
    const nextDate = clampCalendarDate(date, props.minDate, props.maxDate);
    shouldMoveFocus.current = true;
    setFocusedDate(nextDate);
    const nextMonth = getCalendarMonth(nextDate);
    if (nextMonth !== props.visibleMonth) props.onVisibleMonthChange(nextMonth);
  }

  function handleDayKeyDown(
    event: KeyboardEvent<HTMLButtonElement>,
    date: CalendarDate,
    weekdayIndex: number
  ) {
    const offsets: Partial<Record<string, number>> = {
      ArrowLeft: -1,
      ArrowRight: 1,
      ArrowUp: -7,
      ArrowDown: 7,
      Home: -weekdayIndex,
      End: 6 - weekdayIndex,
    };
    const offset = offsets[event.key];

    if (offset !== undefined) {
      event.preventDefault();
      moveFocus(shiftCalendarDate(date, offset));
      return;
    }

    if (event.key === 'PageUp' || event.key === 'PageDown') {
      event.preventDefault();
      const month = getCalendarMonth(date);
      const offset = event.key === 'PageUp' ? -1 : 1;
      const minMonth = getCalendarMonth(props.minDate);
      const maxMonth = getCalendarMonth(props.maxDate);

      if ((offset === -1 && month <= minMonth) || (offset === 1 && month >= maxMonth)) {
        moveFocus(offset === -1 ? props.minDate : props.maxDate);
        return;
      }

      const nextMonth = shiftCalendarMonth(month, offset);
      const nextGrid = createMonthGrid(nextMonth);
      const matchingDay = nextGrid.find(
        (cell) => cell.isCurrentMonth && cell.day === Number(date.slice(8, 10))
      );
      const fallback = nextGrid.find((cell) => cell.isCurrentMonth);
      const nextDate = matchingDay?.value ?? fallback?.value;
      if (nextDate) moveFocus(nextDate);
    }
  }

  function changeMonth(offset: -1 | 1) {
    const nextMonth = shiftCalendarMonth(props.visibleMonth, offset);
    props.onVisibleMonthChange(nextMonth);
    const nextDate = createMonthGrid(nextMonth).find(
      (cell) =>
        cell.isCurrentMonth &&
        cell.value !== null &&
        isDateEnabled(cell.value, props.minDate, props.maxDate)
    )?.value;
    if (nextDate) setFocusedDate(nextDate);
  }

  const minMonth = getCalendarMonth(props.minDate);
  const maxMonth = getCalendarMonth(props.maxDate);
  const canGoPrevious = props.visibleMonth > minMonth;
  const canGoNext = props.visibleMonth < maxMonth;

  return (
    <section
      aria-label={`${heading} 날짜 선택`}
      className={`w-full overflow-hidden rounded-lg bg-white text-gray-600 ${props.className ?? ''}`}
    >
      <div className="px-4 py-3">
        <Flex as="header" alignItems="center" justifyContent="between" className="h-11">
          <IconButton
            aria-label="이전 달"
            disabled={props.disabled || !canGoPrevious}
            className="focus-visible:ring-primary-400 flex size-8 items-center justify-center rounded-full bg-gray-50 text-gray-400 outline-none hover:bg-gray-100 focus-visible:ring-2 disabled:opacity-40"
            iconName="arrowLeft"
            onClick={() => changeMonth(-1)}
            size={20}
          />
          <Body3 as="h2" aria-live="polite" className="text-gray-800" weight="semibold">
            {heading}
          </Body3>
          <IconButton
            aria-label="다음 달"
            disabled={props.disabled || !canGoNext}
            className="focus-visible:ring-primary-400 flex size-8 items-center justify-center rounded-full bg-gray-50 text-gray-400 outline-none hover:bg-gray-100 focus-visible:ring-2 disabled:opacity-40"
            iconName="arrowRight"
            onClick={() => changeMonth(1)}
            size={20}
          />
        </Flex>

        <div role="grid" aria-label={heading} className="grid grid-cols-7 py-1.5">
          <div role="row" className="contents">
            {WEEKDAYS.map((weekday) => (
              <Caption1
                as="div"
                key={weekday}
                role="columnheader"
                className="flex aspect-square min-h-9 items-center justify-center text-gray-500"
                weight="semibold"
              >
                {weekday}
              </Caption1>
            ))}
          </div>
          {Array.from({ length: grid.length / WEEKDAYS.length }, (_, weekIndex) => (
            <div key={weekIndex} role="row" className="contents">
              {grid
                .slice(weekIndex * WEEKDAYS.length, (weekIndex + 1) * WEEKDAYS.length)
                .map((cell) => {
                  const value = cell.value;

                  return value && cell.isCurrentMonth ? (
                    <CalendarWidgetDay
                      key={value}
                      date={value}
                      day={cell.day}
                      disabled={
                        Boolean(props.disabled) ||
                        !isDateEnabled(value, props.minDate, props.maxDate)
                      }
                      selected={value === range.startDate || value === range.endDate}
                      today={value === today}
                      rangePosition={getRangePosition(value, range.startDate, range.endDate)}
                      tabIndex={value === focusedDate ? 0 : -1}
                      onClick={() => selectDate(value)}
                      onKeyDown={(event) => handleDayKeyDown(event, value, cell.weekdayIndex)}
                    />
                  ) : (
                    <div key={`${cell.ordinal}:${cell.weekdayIndex}`} role="gridcell" />
                  );
                })}
            </div>
          ))}
        </div>
      </div>

      {props.mode === 'range' && (
        <div className="grid grid-cols-2 border-t border-gray-200 px-5 py-4">
          <div>
            <Caption1 className="text-gray-400" weight="normal">
              시작 날짜
            </Caption1>
            <Body1 className="text-primary-300" weight="semibold">
              {formatWidgetDate(props.value.startDate)}
            </Body1>
          </div>
          <div className="text-right">
            <Caption1 className="text-gray-400" weight="normal">
              종료 날짜
            </Caption1>
            <Body1 className="text-primary-300" weight="semibold">
              {formatWidgetDate(props.value.endDate)}
            </Body1>
          </div>
        </div>
      )}
    </section>
  );
}
