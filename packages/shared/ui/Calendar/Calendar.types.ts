type CalendarMonthNumber =
  | '01'
  | '02'
  | '03'
  | '04'
  | '05'
  | '06'
  | '07'
  | '08'
  | '09'
  | '10'
  | '11'
  | '12';

type CalendarDayNumber =
  | `0${1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9}`
  | `${1 | 2}${0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9}`
  | `3${0 | 1}`;

declare const fourDigitCalendarMonth: unique symbol;
declare const fourDigitCalendarDate: unique symbol;

export type CalendarMonth = `${number}-${CalendarMonthNumber}` & {
  readonly [fourDigitCalendarMonth]: '0001-9999';
};

export type CalendarDate = `${number}-${CalendarMonthNumber}-${CalendarDayNumber}` & {
  readonly [fourDigitCalendarDate]: '0001-9999';
};

export type CalendarEventData = {
  readonly id: string;
  readonly title: string;
  readonly startDate: CalendarDate;
  readonly endDate?: CalendarDate;
  readonly color?: string;
};

export type CalendarProps<TEvent extends CalendarEventData> = {
  readonly visibleMonth: CalendarMonth;
  readonly events: readonly TEvent[];
  readonly onVisibleMonthChange: (month: CalendarMonth) => void;
  readonly onEventClick?: (event: TEvent) => void;
  readonly onDateCreate?: (date: CalendarDate) => void;
  readonly className?: string;
};
