import { COLORS } from '@/shared/lib/colors';

import { ProgressBar } from './ProgressBar';

import type { Meta, StoryObj } from '@storybook/react';

const meta = {
  title: 'Components/ProgressBar',
  component: ProgressBar,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component: 'ProgressBar 컴포넌트는 진행 상황을 시각적으로 표시하는 컴포넌트입니다.',
      },
    },
  },
} satisfies Meta<typeof ProgressBar>;

export default meta;

export const Basic: StoryObj<typeof ProgressBar> = {
  args: {
    percent: 60,
    color: 'pink',
  },
  argTypes: {
    percent: { control: { type: 'range', min: 0, max: 100, step: 1 } },
    color: {
      control: { type: 'select' },
      table: {
        type: { summary: 'Colors' },
        defaultValue: { summary: 'primary' },
      },
      options: Object.keys(COLORS),
    },
  },
  render: (args) => <ProgressBar {...args} />,
};
