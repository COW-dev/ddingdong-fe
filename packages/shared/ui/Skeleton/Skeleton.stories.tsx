import { Skeleton, TextSkeleton } from './Skeleton';

import type { Meta, StoryObj } from '@storybook/react';

const meta = {
  title: 'components/Skeleton',
  component: Skeleton,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component:
          '실제 데이터가 렌더링 되기 전에, 보이게 될 화면의 윤곽을 먼저 그려주는 공통 컴포넌트입니다',
      },
    },
  },
} satisfies Meta<typeof Skeleton>;

export default meta;
type Story = StoryObj<typeof Skeleton>;
type TextStory = StoryObj<typeof TextSkeleton>;
export const Basic: Story = {
  args: { className: 'h-5' },
  argTypes: {
    className: {
      control: { type: 'text' },
      table: { type: { summary: 'string' } },
    },
  },
  render: (args) => {
    return <Skeleton className={args.className} />;
  },
};

export const Text: TextStory = {
  args: { length: 2 },
  argTypes: {
    length: {
      control: { type: 'number' },
      table: { type: { summary: 'string' } },
    },
  },
  render: (args) => {
    return <TextSkeleton length={args.length} />;
  },
};
