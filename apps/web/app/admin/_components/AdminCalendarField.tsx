'use client';

import {
  useCallback,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
} from 'react';

import {
  CalendarWidget,
  cn,
  parseCalendarDate,
  parseCalendarMonth,
  type CalendarDate,
  type CalendarMonth,
  type CalendarWidgetRange,
} from '@dds/shared';
import { createPortal } from 'react-dom';

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
  readonly onOpenChange?: (isOpen: boolean) => void;
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
  onOpenChange,
  ...selection
}: AdminCalendarFieldProps) {
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const popoverRef = useRef<HTMLDivElement>(null);
  const [popoverPosition, setPopoverPosition] = useState<{
    top: number;
    left: number;
    maxHeight?: number;
  }>({ top: 0, left: 0 });
  const selectedDate =
    selection.mode === 'range'
      ? (selection.value.endDate ??
        selection.value.startDate ??
        selection.lockedStartDate)
      : selection.value;
  const today = new Date();
  const fallbackDate =
    today < minDate ? minDate : today > maxDate ? maxDate : today;
  const [visibleMonth, setVisibleMonth] = useState(() =>
    getVisibleMonth(selectedDate ?? fallbackDate),
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
  const closePopover = useCallback(
    (shouldReturnFocus: boolean) => {
      setIsOpen(false);
      onOpenChange?.(false);

      if (shouldReturnFocus) {
        window.requestAnimationFrame(() => triggerRef.current?.focus());
      }
    },
    [onOpenChange],
  );

  useEffect(() => {
    if (!isOpen) return;

    const handlePointerDown = (event: PointerEvent) => {
      if (
        event.target instanceof Node &&
        !containerRef.current?.contains(event.target) &&
        !popoverRef.current?.contains(event.target)
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

  useLayoutEffect(() => {
    if (!isOpen) return;

    const updatePosition = () => {
      const trigger = triggerRef.current?.getBoundingClientRect();
      const popover = popoverRef.current?.getBoundingClientRect();
      if (!trigger || !popover) return;

      const headerBottom =
        document.querySelector('.admin-header')?.getBoundingClientRect()
          .bottom ?? 0;
      const minTop = Math.max(16, headerBottom + 8);
      const below = Math.max(minTop, trigger.bottom + 8);
      const above = trigger.top - popover.height - 8;
      const top =
        below + popover.height <= window.innerHeight - 16
          ? below
          : above >= minTop
            ? above
            : minTop;
      const left = Math.max(
        16,
        Math.min(trigger.left, window.innerWidth - popover.width - 16),
      );
      setPopoverPosition({
        top,
        left,
        maxHeight: Math.max(0, window.innerHeight - top - 16),
      });
    };

    updatePosition();
    window.addEventListener('resize', updatePosition);
    window.addEventListener('scroll', updatePosition, true);
    return () => {
      window.removeEventListener('resize', updatePosition);
      window.removeEventListener('scroll', updatePosition, true);
    };
  }, [isOpen, visibleMonth]);

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

          setVisibleMonth(getVisibleMonth(selectedDate ?? fallbackDate));
          setIsOpen(true);
          onOpenChange?.(true);
        }}
        disabled={disabled}
      >
        {getDisplayValue(selection.value, placeholder)}
      </button>

      {isOpen &&
        createPortal(
          <div
            ref={popoverRef}
            role="dialog"
            aria-label={ariaLabel}
            className={cn(
              'fixed z-[60] max-h-[calc(100dvh-2rem)] w-[min(320px,calc(100vw-2rem))] overflow-y-auto rounded-xl border border-gray-200 bg-white p-2 shadow-xl md:w-[min(444px,calc(100vw-2rem))] md:p-3',
              popoverClassName,
            )}
            style={popoverPosition}
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
          </div>,
          document.body,
        )}
    </div>
  );
}
