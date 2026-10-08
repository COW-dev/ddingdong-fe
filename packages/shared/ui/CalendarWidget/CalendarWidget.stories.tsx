import { useState } from 'react';

import { parseCalendarDate, parseCalendarMonth } from '../Calendar';

import { CalendarWidget } from './CalendarWidget';

import type { CalendarDate, CalendarMonth } from '../Calendar/Calendar.types';
import type { CalendarWidgetProps, CalendarWidgetRange } from './CalendarWidget.types';
import type { Meta, StoryObj } from '@storybook/react';

const minDate = parseCalendarDate('2026-01-01').value;
const maxDate = parseCalendarDate('2026-12-31').value;

type StoryArgs = Partial<CalendarWidgetProps> & { width: number };

const meta = {
  title: 'components/CalendarWidget',
  component: CalendarWidget,
  args: { width: 444 },
  argTypes: { width: { control: { type: 'range', min: 250, max: 600, step: 1 } } },
  parameters: {
    layout: 'centered',
  },
} satisfies Meta<StoryArgs>;

export default meta;
type Story = StoryObj<StoryArgs>;

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
  args: { width: 277 },
  render: ({ width }: StoryArgs) => (
    <RangeWidget width={width} initialValue={{ startDate: null, endDate: null }} />
  ),
};

export const WideRange: Story = {
  render: ({ width }: StoryArgs) => (
    <RangeWidget
      width={width}
      initialValue={{
        startDate: parseCalendarDate('2026-07-28').value,
        endDate: parseCalendarDate('2026-07-31').value,
      }}
    />
  ),
};

function SingleWidget({ width }: { readonly width: number }) {
  const [visibleMonth, setVisibleMonth] = useState<CalendarMonth>(
    parseCalendarMonth('2026-07').value
  );
  const [value, setValue] = useState<CalendarDate | null>(parseCalendarDate('2026-07-13').value);

  return (
    <div style={{ width }}>
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
  render: ({ width }: StoryArgs) => <SingleWidget width={width} />,
};
