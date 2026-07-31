import { parseCalendarDate, type CalendarGridCell } from './calendarModel';

import type { CalendarEventData } from './Calendar.types';

export type CalendarEventSegmentKind = 'single' | 'start' | 'middle' | 'end';

export type CalendarEventSegment<TEvent extends CalendarEventData> = {
  readonly event: TEvent;
  readonly kind: CalendarEventSegmentKind;
  readonly weekIndex: number;
  readonly startColumn: number;
  readonly endColumn: number;
  readonly lane: number;
  readonly accessibleLabel: string;
};

export type CalendarWeekLayout<TEvent extends CalendarEventData> = {
  readonly weekIndex: number;
  readonly laneCount: number;
  readonly segments: readonly CalendarEventSegment<TEvent>[];
};

export type CalendarEventLayoutErrorCode = 'DUPLICATE_EVENT_ID' | 'EVENT_END_BEFORE_START';

export class CalendarEventLayoutError extends Error {
  readonly name = 'CalendarEventLayoutError';

  constructor(
    readonly code: CalendarEventLayoutErrorCode,
    readonly eventId: string,
    message: string
  ) {
    super(message);
  }
}

type ValidatedEvent<TEvent extends CalendarEventData> = {
  readonly event: TEvent;
  readonly inputIndex: number;
  readonly startOrdinal: number;
  readonly endOrdinal: number;
  readonly startDate: string;
  readonly endDate: string;
};

type UnplacedSegment<TEvent extends CalendarEventData> = {
  readonly event: ValidatedEvent<TEvent>;
  readonly weekIndex: number;
  readonly startOrdinal: number;
  readonly endOrdinal: number;
  readonly startColumn: number;
  readonly endColumn: number;
};

function validateEvents<TEvent extends CalendarEventData>(
  events: readonly TEvent[]
): readonly ValidatedEvent<TEvent>[] {
  const seenIds = new Set<string>();

  return events.map((event, inputIndex) => {
    if (seenIds.has(event.id)) {
      throw new CalendarEventLayoutError(
        'DUPLICATE_EVENT_ID',
        event.id,
        `Duplicate calendar event id "${event.id}"`
      );
    }
    seenIds.add(event.id);

    const start = parseCalendarDate(event.startDate);
    const end = parseCalendarDate(event.endDate ?? event.startDate);
    if (end.ordinal < start.ordinal) {
      throw new CalendarEventLayoutError(
        'EVENT_END_BEFORE_START',
        event.id,
        `Calendar event "${event.id}" ends before it starts`
      );
    }

    return {
      event,
      inputIndex,
      startOrdinal: start.ordinal,
      endOrdinal: end.ordinal,
      startDate: start.value,
      endDate: end.value,
    };
  });
}

function compareSegments<TEvent extends CalendarEventData>(
  left: UnplacedSegment<TEvent>,
  right: UnplacedSegment<TEvent>
): number {
  const leftDuration = left.endOrdinal - left.startOrdinal;
  const rightDuration = right.endOrdinal - right.startOrdinal;
  if (left.startColumn !== right.startColumn) {
    return left.startColumn - right.startColumn;
  }
  if (leftDuration !== rightDuration) {
    return rightDuration - leftDuration;
  }
  if (left.event.startOrdinal !== right.event.startOrdinal) {
    return left.event.startOrdinal - right.event.startOrdinal;
  }
  if (left.event.endOrdinal !== right.event.endOrdinal) {
    return left.event.endOrdinal - right.event.endOrdinal;
  }
  if (left.event.event.id !== right.event.event.id) {
    return left.event.event.id < right.event.event.id ? -1 : 1;
  }
  return left.event.inputIndex - right.event.inputIndex;
}

function getSegmentKind<TEvent extends CalendarEventData>(
  segment: UnplacedSegment<TEvent>
): CalendarEventSegmentKind {
  const beginsEvent = segment.startOrdinal === segment.event.startOrdinal;
  const endsEvent = segment.endOrdinal === segment.event.endOrdinal;
  if (beginsEvent && endsEvent) {
    return 'single';
  }
  if (beginsEvent) {
    return 'start';
  }
  return endsEvent ? 'end' : 'middle';
}

function assignLanes<TEvent extends CalendarEventData>(
  weekIndex: number,
  segments: readonly UnplacedSegment<TEvent>[]
): CalendarWeekLayout<TEvent> {
  const laneEnds: number[] = [];
  const placed = segments
    .slice()
    .sort(compareSegments)
    .map((segment) => {
      let lane = 0;
      while (laneEnds[lane] !== undefined && laneEnds[lane] >= segment.startColumn) {
        lane += 1;
      }
      laneEnds[lane] = segment.endColumn;

      const range =
        segment.event.startDate === segment.event.endDate
          ? segment.event.startDate
          : `${segment.event.startDate}–${segment.event.endDate}`;
      return {
        event: segment.event.event,
        kind: getSegmentKind(segment),
        weekIndex,
        startColumn: segment.startColumn,
        endColumn: segment.endColumn,
        lane,
        accessibleLabel: `${segment.event.event.title}, ${range}`,
      };
    });

  return { weekIndex, laneCount: laneEnds.length, segments: placed };
}

export function createCalendarEventLayout<TEvent extends CalendarEventData>(
  events: readonly TEvent[],
  grid: readonly CalendarGridCell[]
): readonly CalendarWeekLayout<TEvent>[] {
  const validatedEvents = validateEvents(events);
  const firstCell = grid[0];
  const lastCell = grid[grid.length - 1];
  if (firstCell === undefined || lastCell === undefined) {
    return [];
  }

  const weekCount = Math.ceil(grid.length / 7);
  const weeks: UnplacedSegment<TEvent>[][] = Array.from({ length: weekCount }, () => []);
  for (const event of validatedEvents) {
    const clippedStart = Math.max(event.startOrdinal, firstCell.ordinal);
    const clippedEnd = Math.min(event.endOrdinal, lastCell.ordinal);
    if (clippedStart > clippedEnd) {
      continue;
    }

    const firstWeek = Math.floor((clippedStart - firstCell.ordinal) / 7);
    const lastWeek = Math.floor((clippedEnd - firstCell.ordinal) / 7);
    for (let weekIndex = firstWeek; weekIndex <= lastWeek; weekIndex += 1) {
      const weekStart = firstCell.ordinal + weekIndex * 7;
      const startOrdinal = Math.max(clippedStart, weekStart);
      const endOrdinal = Math.min(clippedEnd, weekStart + 6);
      const week = weeks[weekIndex];
      if (week !== undefined) {
        week.push({
          event,
          weekIndex,
          startOrdinal,
          endOrdinal,
          startColumn: startOrdinal - weekStart,
          endColumn: endOrdinal - weekStart,
        });
      }
    }
  }

  return weeks.map((segments, weekIndex) => assignLanes(weekIndex, segments));
}
