import { Caption1 } from '../Typography';

import { formatCalendarEventDateRange } from './eventLayout';

import type { CalendarEventData } from './Calendar.types';
import type { CSSProperties } from 'react';

import { cn } from '@/shared/lib/core';

const SEGMENT_CLASS_NAMES = {
  single: 'mx-1 rounded-md',
  start: 'ml-1 rounded-l-md',
  middle: 'rounded-none',
  end: 'mr-1 rounded-r-md',
} as const;

function isDarkHexColor(color: string) {
  const hex = /^#([0-9a-f]{6})$/i.exec(color)?.[1];
  if (hex === undefined) return false;

  const red = Number.parseInt(hex.slice(0, 2), 16);
  const green = Number.parseInt(hex.slice(2, 4), 16);
  const blue = Number.parseInt(hex.slice(4, 6), 16);

  return (red * 299 + green * 587 + blue * 114) / 1000 < 150;
}

export type CalendarEventProps<TEvent extends CalendarEventData> = {
  readonly event: TEvent;
  readonly kind?: keyof typeof SEGMENT_CLASS_NAMES;
  readonly accessibleLabel?: string;
  readonly onEventClick?: (event: TEvent) => void;
  readonly className?: string;
  readonly style?: CSSProperties;
};

export function CalendarEvent<TEvent extends CalendarEventData>({
  event,
  kind = 'single',
  accessibleLabel = `${event.title}, ${formatCalendarEventDateRange(event.startDate, event.endDate)}`,
  onEventClick,
  className,
  style,
}: CalendarEventProps<TEvent>) {
  const eventClassName = cn(
    'z-10 my-0.5 flex h-5 min-w-0 items-center truncate bg-primary-200 px-3 text-left text-gray-600',
    SEGMENT_CLASS_NAMES[kind],
    className
  );
  const eventStyle =
    event.color === undefined
      ? style
      : {
          ...style,
          backgroundColor: event.color,
          color: isDarkHexColor(event.color) ? 'white' : undefined,
          outlineColor: event.color,
        };

  if (onEventClick === undefined) {
    return (
      <div
        aria-label={accessibleLabel}
        className={eventClassName}
        style={eventStyle}
        title={accessibleLabel}
      >
        <Caption1 as="span" className="truncate" weight="medium">
          {event.title}
        </Caption1>
      </div>
    );
  }

  return (
    <button
      type="button"
      aria-label={accessibleLabel}
      className={cn(
        eventClassName,
        'cursor-pointer hover:brightness-95 focus-visible:outline-2 focus-visible:outline-offset-1'
      )}
      onClick={() => onEventClick(event)}
      style={eventStyle}
      title={accessibleLabel}
    >
      <Caption1 as="span" className="truncate" weight="medium">
        {event.title}
      </Caption1>
    </button>
  );
}
