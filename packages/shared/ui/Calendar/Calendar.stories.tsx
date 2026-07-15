import { useState } from 'react';

import { Calendar, CalendarEvent, parseCalendarDate, parseCalendarMonth } from '.';

import type { CalendarEventData, CalendarMonth } from './Calendar.types';
import type { Meta, StoryObj } from '@storybook/react';

const events = [
  {
    id: 'orientation',
    title: '신입생 오리엔테이션',
    startDate: parseCalendarDate('2026-06-01').value,
    endDate: parseCalendarDate('2026-06-05').value,
  },
  {
    id: 'festival',
    title: '동아리 축제',
    startDate: parseCalendarDate('2026-06-09').value,
    endDate: parseCalendarDate('2026-06-12').value,
  },
] satisfies readonly CalendarEventData[];

const meta = {
  title: 'components/Calendar',
  component: Calendar,
  tags: ['autodocs'],
} satisfies Meta<typeof Calendar>;

export default meta;
type Story = StoryObj<typeof Calendar>;

export const Basic: Story = {
  render: () => {
    const [visibleMonth, setVisibleMonth] = useState<CalendarMonth>(
      parseCalendarMonth('2026-06').value
    );

    return (
      <Calendar
        visibleMonth={visibleMonth}
        events={events}
        onVisibleMonthChange={setVisibleMonth}
      />
    );
  },
};

export const Event: Story = {
  render: () => (
    <div className="w-64">
      <CalendarEvent event={events[0]} />
    </div>
  ),
};
