import type { CalendarDate, CalendarMonth } from '../Calendar';

export type CalendarWidgetRange = {
  readonly startDate: CalendarDate | null;
  readonly endDate: CalendarDate | null;
};

type CalendarWidgetBaseProps = {
  readonly visibleMonth: CalendarMonth;
  readonly onVisibleMonthChange: (month: CalendarMonth) => void;
  readonly minDate: CalendarDate;
  readonly maxDate: CalendarDate;
  readonly disabled?: boolean;
  readonly className?: string;
};

type CalendarWidgetSingleProps = CalendarWidgetBaseProps & {
  readonly mode: 'single';
  readonly value: CalendarDate | null;
  readonly onChange: (value: CalendarDate) => void;
};

type CalendarWidgetRangeProps = CalendarWidgetBaseProps & {
  readonly mode: 'range';
  readonly value: CalendarWidgetRange;
  readonly onChange: (value: CalendarWidgetRange) => void;
};

export type CalendarWidgetProps = CalendarWidgetSingleProps | CalendarWidgetRangeProps;
