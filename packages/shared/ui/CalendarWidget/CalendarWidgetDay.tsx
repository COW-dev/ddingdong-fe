import { Caption1 } from '../Typography';

import type { CalendarDate } from '../Calendar';
import type { KeyboardEvent } from 'react';

type CalendarWidgetDayProps = {
  readonly date: CalendarDate;
  readonly day: number;
  readonly disabled: boolean;
  readonly selected: boolean;
  readonly today: boolean;
  readonly rangePosition: 'none' | 'start' | 'middle' | 'end' | 'single';
  readonly tabIndex: number;
  readonly onClick: () => void;
  readonly onKeyDown: (event: KeyboardEvent<HTMLButtonElement>) => void;
};

const RANGE_CLASS_NAMES = {
  none: '',
  start: 'rounded-l-lg bg-primary-200 text-white',
  middle: 'bg-primary-100 text-primary-300',
  end: 'rounded-r-lg bg-primary-400 text-white',
  single: 'rounded-lg bg-primary-400 text-white',
} as const;

export function CalendarWidgetDay({
  date,
  day,
  disabled,
  selected,
  today,
  rangePosition,
  tabIndex,
  onClick,
  onKeyDown,
}: CalendarWidgetDayProps) {
  const [year, month, calendarDay] = date.split('-');

  return (
    <button
      id={`calendar-widget-${date}`}
      type="button"
      role="gridcell"
      aria-label={`${year}년 ${Number(month)}월 ${Number(calendarDay)}일`}
      aria-selected={selected}
      aria-current={today ? 'date' : undefined}
      disabled={disabled}
      tabIndex={tabIndex}
      className={`focus-visible:ring-primary-400 flex aspect-square min-h-9 w-full items-center justify-center transition-colors outline-none focus-visible:z-10 focus-visible:ring-2 focus-visible:ring-inset disabled:cursor-not-allowed disabled:text-gray-300 ${RANGE_CLASS_NAMES[rangePosition]} ${rangePosition === 'none' ? 'text-gray-600 hover:bg-gray-50' : ''}`}
      onClick={onClick}
      onKeyDown={onKeyDown}
    >
      <Caption1 as="span" weight="semibold">
        {day}
      </Caption1>
    </button>
  );
}
