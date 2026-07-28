'use client';

import { useCallback, useEffect, useRef, useState } from 'react';

import {
  CalendarWidget,
  parseCalendarDate,
  parseCalendarMonth,
  type CalendarDate,
  type CalendarMonth,
  type CalendarWidgetRange,
} from '@dds/shared';

import type { NullableDateRange } from '@/_api/types/calanderDate';

export type CalendarDateRange = NullableDateRange;

type AdminCalendarFieldBaseProps = {
  readonly minDate: Date;
  readonly maxDate: Date;
  readonly placeholder: string;
  readonly ariaLabel: string;
  readonly disabled?: boolean;
  readonly className?: string;
  readonly popoverClassName?: string;
};

type AdminSingleCalendarFieldProps = AdminCalendarFieldBaseProps & {
  readonly mode?: 'single';
  readonly value: Date | null;
  readonly onChange: (value: Date) => void;
};

type AdminRangeCalendarFieldProps = AdminCalendarFieldBaseProps & {
  readonly mode: 'range';
  readonly value: CalendarDateRange;
  readonly onChange: (value: CalendarDateRange) => void;
  readonly lockedStartDate?: Date | null;
};

type AdminCalendarFieldProps =
  | AdminSingleCalendarFieldProps
  | AdminRangeCalendarFieldProps;

export function toIsoDate(date: Date): CalendarDate {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  return parseCalendarDate(`${year}-${month}-${day}`).value;
}

export function fromIsoDate(value: CalendarDate): Date {
  const year = Number.parseInt(value.slice(0, 4), 10);
  const month = Number.parseInt(value.slice(5, 7), 10);
  const day = Number.parseInt(value.slice(8, 10), 10);
  return new Date(year, month - 1, day);
}

function toCalendarRange(
  value: CalendarDateRange,
  lockedStartDate?: Date | null,
): CalendarWidgetRange {
  return {
    startDate: lockedStartDate
      ? toIsoDate(lockedStartDate)
      : value.startDate
        ? toIsoDate(value.startDate)
        : null,
    endDate:
      lockedStartDate || !value.endDate ? null : toIsoDate(value.endDate),
  };
}

function getVisibleMonth(date: Date): CalendarMonth {
  return parseCalendarMonth(toIsoDate(date).slice(0, 7)).value;
}

function formatDisplayDate(date: Date | null): string {
  return date ? toIsoDate(date).replaceAll('-', '.') : '';
}

function getDisplayValue(
  value: Date | CalendarDateRange | null,
  placeholder: string,
): string {
  if (!value) {
    return placeholder;
  }

  if (value instanceof Date) {
    return formatDisplayDate(value);
  }

  if (!value.startDate || !value.endDate) {
    return placeholder;
  }

  return `${formatDisplayDate(value.startDate)} ~ ${formatDisplayDate(value.endDate)}`;
}

export function AdminCalendarField({
  minDate,
  maxDate,
  placeholder,
  ariaLabel,
  disabled = false,
  className = '',
  popoverClassName = '',
  ...selection
}: AdminCalendarFieldProps) {
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const selectedDate =
    selection.mode === 'range'
      ? (selection.value.endDate ??
        selection.value.startDate ??
        selection.lockedStartDate)
      : selection.value;
  const [visibleMonth, setVisibleMonth] = useState(() =>
    getVisibleMonth(selectedDate ?? minDate),
  );
  const min = toIsoDate(
    selection.mode === 'range' && selection.lockedStartDate
      ? selection.lockedStartDate
      : minDate,
  );
  const max = toIsoDate(maxDate);
  const hasValue =
    selection.mode === 'range'
      ? Boolean(selection.value.startDate && selection.value.endDate)
      : Boolean(selection.value);
  const closePopover = useCallback((shouldReturnFocus: boolean) => {
    setIsOpen(false);

    if (shouldReturnFocus) {
      window.requestAnimationFrame(() => triggerRef.current?.focus());
    }
  }, []);

  useEffect(() => {
    if (!isOpen) return;

    const handlePointerDown = (event: PointerEvent) => {
      if (
        event.target instanceof Node &&
        !containerRef.current?.contains(event.target)
      ) {
        closePopover(false);
      }
    };

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        event.stopPropagation();
        closePopover(true);
      }
    };

    document.addEventListener('pointerdown', handlePointerDown);
    document.addEventListener('keydown', handleKeyDown);

    return () => {
      document.removeEventListener('pointerdown', handlePointerDown);
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [closePopover, isOpen]);

  return (
    <div
      ref={containerRef}
      className={`admin-calendar-field relative w-full min-w-[250px] shrink ${className}`}
    >
      <button
        ref={triggerRef}
        type="button"
        aria-label={ariaLabel}
        aria-haspopup="dialog"
        aria-expanded={isOpen}
        className={`w-full rounded-xl border border-gray-200 bg-white px-4 py-3.5 text-left text-base outline-none transition focus:border-blue-500 focus:ring-4 focus:ring-blue-200 disabled:cursor-not-allowed disabled:bg-gray-50 disabled:text-gray-300 ${hasValue ? 'text-gray-600' : 'text-gray-400'}`}
        onClick={() => {
          if (isOpen) {
            closePopover(false);
            return;
          }

          setVisibleMonth(getVisibleMonth(selectedDate ?? minDate));
          setIsOpen(true);
        }}
        disabled={disabled}
      >
        {getDisplayValue(selection.value, placeholder)}
      </button>

      {isOpen && (
        <div
          role="dialog"
          aria-label={ariaLabel}
          className={`absolute right-0 z-30 mt-2 w-[min(444px,calc(100vw-2rem))] rounded-xl border border-gray-200 bg-white p-3 shadow-xl ${popoverClassName}`}
        >
          {selection.mode === 'range' ? (
            <CalendarWidget
              mode="range"
              visibleMonth={visibleMonth}
              onVisibleMonthChange={setVisibleMonth}
              value={toCalendarRange(
                selection.value,
                selection.lockedStartDate,
              )}
              onChange={(selectedValue) => {
                selection.onChange({
                  startDate: selection.lockedStartDate
                    ? selection.lockedStartDate
                    : selectedValue.startDate
                      ? fromIsoDate(selectedValue.startDate)
                      : null,
                  endDate: selectedValue.endDate
                    ? fromIsoDate(selectedValue.endDate)
                    : null,
                });

                if (selectedValue.endDate) closePopover(true);
              }}
              minDate={min}
              maxDate={max}
            />
          ) : (
            <CalendarWidget
              mode="single"
              visibleMonth={visibleMonth}
              onVisibleMonthChange={setVisibleMonth}
              value={selection.value ? toIsoDate(selection.value) : null}
              onChange={(selectedValue) => {
                selection.onChange(fromIsoDate(selectedValue));
                closePopover(true);
              }}
              minDate={min}
              maxDate={max}
            />
          )}
        </div>
      )}
    </div>
  );
}
