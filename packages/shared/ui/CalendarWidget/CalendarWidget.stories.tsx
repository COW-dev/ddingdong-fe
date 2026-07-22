import { useState } from 'react';

import { parseCalendarDate, parseCalendarMonth } from '../Calendar';

import { CalendarWidget } from './CalendarWidget';

import type { CalendarDate, CalendarMonth } from '../Calendar/Calendar.types';
import type { CalendarWidgetRange } from './CalendarWidget.types';
import type { Meta, StoryObj } from '@storybook/react';

const minDate = parseCalendarDate('2026-01-01').value;
const maxDate = parseCalendarDate('2026-12-31').value;

const meta = {
  title: 'components/CalendarWidget',
  component: CalendarWidget,
  parameters: {
    layout: 'centered',
  },
} satisfies Meta<typeof CalendarWidget>;

export default meta;
type Story = StoryObj<typeof CalendarWidget>;

function RangeWidget({
  width,
  initialValue,
}: {
  readonly width: number;
  readonly initialValue: CalendarWidgetRange;
}) {
  const [visibleMonth, setVisibleMonth] = useState<CalendarMonth>(
    parseCalendarMonth('2026-07').value
  );
  const [value, setValue] = useState(initialValue);

  return (
    <div style={{ width }}>
      <CalendarWidget
        mode="range"
        visibleMonth={visibleMonth}
        onVisibleMonthChange={setVisibleMonth}
        value={value}
        onChange={setValue}
        minDate={minDate}
        maxDate={maxDate}
      />
    </div>
  );
}

export const CompactRange: Story = {
  render: () => <RangeWidget width={277} initialValue={{ startDate: null, endDate: null }} />,
};

export const WideRange: Story = {
  render: () => (
    <RangeWidget
      width={444}
      initialValue={{
        startDate: parseCalendarDate('2026-07-28').value,
        endDate: parseCalendarDate('2026-07-31').value,
      }}
    />
  ),
};

function SingleWidget() {
  const [visibleMonth, setVisibleMonth] = useState<CalendarMonth>(
    parseCalendarMonth('2026-07').value
  );
  const [value, setValue] = useState<CalendarDate | null>(parseCalendarDate('2026-07-13').value);

  return (
    <div style={{ width: 444 }}>
      <CalendarWidget
        mode="single"
        visibleMonth={visibleMonth}
        onVisibleMonthChange={setVisibleMonth}
        value={value}
        onChange={setValue}
        minDate={minDate}
        maxDate={maxDate}
      />
    </div>
  );
}

export const Single: Story = {
  render: () => <SingleWidget />,
};
