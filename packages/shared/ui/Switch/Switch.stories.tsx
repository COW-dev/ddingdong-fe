import { COLORS } from '@/shared/lib/colors';

import { Switch } from '.';

import type { Meta, StoryObj } from '@storybook/react';

const meta = {
  title: 'components/Switch',
  component: Switch,
  tags: ['autodocs'],
} satisfies Meta<typeof Switch>;

export default meta;
type Story = StoryObj<typeof Switch>;

export const Basic: Story = {
  args: {
    color: 'primary',
  },
  argTypes: {
    color: {
      control: { type: 'select' },
      table: {
        type: { summary: 'SwitchColor' },
        defaultValue: { summary: 'primary' },
      },
      options: Object.keys(COLORS),
    },
  },
  render: (args) => <Switch {...args} />,
};
