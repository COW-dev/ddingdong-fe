import { Caption1 } from '../Typography';

import type { CalendarEventData } from './Calendar.types';
import type { CSSProperties } from 'react';

import { cn } from '@/shared/lib/core';

const SEGMENT_CLASS_NAMES = {
  single: 'mx-1 rounded-md',
  start: 'ml-1 rounded-l-md',
  middle: 'rounded-none',
  end: 'mr-1 rounded-r-md',
} as const;

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
  accessibleLabel = `${event.title}, ${event.startDate}${event.endDate === undefined ? '' : `–${event.endDate}`}`,
  onEventClick,
  className,
  style,
}: CalendarEventProps<TEvent>) {
  const eventClassName = cn(
    'z-10 my-0.5 flex h-5 min-w-0 items-center truncate bg-primary-100 px-3 text-left text-primary-300',
    SEGMENT_CLASS_NAMES[kind],
    className
  );

  if (onEventClick === undefined) {
    return (
      <div
        aria-label={accessibleLabel}
        className={eventClassName}
        style={style}
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
        'hover:bg-primary-200 focus-visible:outline-primary-300 cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-1'
      )}
      onClick={() => onEventClick(event)}
      style={style}
      title={accessibleLabel}
    >
      <Caption1 as="span" className="truncate" weight="medium">
        {event.title}
      </Caption1>
    </button>
  );
}
