import { NavBack } from './NavBack';

import type { Meta, StoryObj } from '@storybook/react';

const meta: Meta<typeof NavBack> = {
  title: 'components/NavBack',
  component: NavBack,
  parameters: {
    nextjs: {
      appDirectory: true,
    },
  },
  tags: ['autodocs'],
} satisfies Meta<typeof NavBack>;

export default meta;

type Story = StoryObj<typeof NavBack>;

export const Basic: Story = {
  args: {
    title: 'NavBack 예시입니다',
    size: 'lg',
  },
  argTypes: {
    title: { control: { type: 'text' } },
    size: {
      control: { type: 'radio' },
      options: ['sm', 'lg'],
    },
  },

  render: (args) => {
    return <NavBack {...args} />;
  },
};
