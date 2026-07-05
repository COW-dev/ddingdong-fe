'use client';

import { useEffect, useMemo, useRef, useState } from 'react';

import {
  Calendar,
  type DateRange,
  type ISODateString,
} from '@astryxdesign/core/Calendar';
import { z } from 'zod';

import './RecruitPeriodCalendar.css';

import type { RecruitPeriod } from '../_hooks/useFormBasicInfo';

const isoDateSchema = z.custom<ISODateString>(
  (value) => typeof value === 'string' && /^\d{4}-\d{2}-\d{2}$/.test(value),
);

type RecruitPeriodCalendarProps = {
  value: RecruitPeriod;
  onChange: (value: RecruitPeriod) => void;
  minDate: Date;
  maxDate: Date;
  disabled?: boolean;
};

function toIsoDate(date: Date): ISODateString {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  return isoDateSchema.parse(`${year}-${month}-${day}`);
}

function fromIsoDate(value: ISODateString): Date {
  const year = Number.parseInt(value.slice(0, 4), 10);
  const month = Number.parseInt(value.slice(5, 7), 10);
  const day = Number.parseInt(value.slice(8, 10), 10);
  return new Date(year, month - 1, day);
}

function toCalendarRange(value: RecruitPeriod): DateRange | undefined {
  if (!value.startDate || !value.endDate) {
    return undefined;
  }

  return {
    start: toIsoDate(value.startDate),
    end: toIsoDate(value.endDate),
  };
}

function formatDisplayDate(date: Date | null): string {
  return date ? toIsoDate(date).replaceAll('-', '.') : '';
}

function getDisplayValue(value: RecruitPeriod): string {
  if (!value.startDate || !value.endDate) {
    return '모집 기간을 선택해주세요';
  }

  return `${formatDisplayDate(value.startDate)} ~ ${formatDisplayDate(value.endDate)}`;
}

export function RecruitPeriodCalendar({
  value,
  onChange,
  minDate,
  maxDate,
  disabled = false,
}: RecruitPeriodCalendarProps) {
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const rangeValue = useMemo(() => toCalendarRange(value), [value]);

  useEffect(() => {
    if (!isOpen) return;

    const handlePointerDown = (event: PointerEvent) => {
      if (
        event.target instanceof Node &&
        !containerRef.current?.contains(event.target)
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener('pointerdown', handlePointerDown);
    return () => document.removeEventListener('pointerdown', handlePointerDown);
  }, [isOpen]);

  const handleRangeChange = (range: DateRange) => {
    onChange({
      startDate: fromIsoDate(range.start),
      endDate: fromIsoDate(range.end),
    });
    setIsOpen(false);
  };

  return (
    <div
      ref={containerRef}
      className="astryx-recruit-period relative w-full min-w-[250px] shrink"
    >
      <button
        type="button"
        className="w-full rounded-xl border border-gray-200 bg-white px-4 py-3.5 text-left text-base text-gray-600 outline-none transition focus:border-blue-500 focus:ring-4 focus:ring-blue-200 disabled:cursor-not-allowed disabled:bg-gray-50 disabled:text-gray-300"
        onClick={() => setIsOpen((current) => !current)}
        disabled={disabled}
      >
        {getDisplayValue(value)}
      </button>

      {isOpen && (
        <div className="absolute right-0 z-30 mt-2 rounded-xl border border-gray-200 bg-white p-3 shadow-xl">
          <Calendar
            mode="range"
            value={rangeValue}
            onChange={handleRangeChange}
            min={toIsoDate(minDate)}
            max={toIsoDate(maxDate)}
            weekStartsOn={0}
          />
        </div>
      )}
    </div>
  );
}
