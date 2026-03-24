import { Card } from './Card';

import type { Meta, StoryObj } from '@storybook/react';

const meta = {
  title: 'components/Card',
  component: Card,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component:
          'Card 컴포넌트는 동아리 소개, 동아리 점수, 활동보고서 회차 등에서 사용되는 컨테이너입니다.',
      },
    },
  },
} satisfies Meta<typeof Card>;

export default meta;
type Story = StoryObj<typeof Card>;

export const Default: Story = {
  args: {
    children: '카드 컴포넌트',
  },
  argTypes: {
    as: {
      control: false,
    },
    className: {
      control: false,
    },
  },
  render: (args) => {
    return <Card {...args} />;
  },
};
