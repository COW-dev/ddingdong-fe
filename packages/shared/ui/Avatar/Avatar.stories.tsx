import { Flex } from '../Flex';

import { Avatar } from './';

import type { Meta, StoryObj } from '@storybook/react';

const meta = {
  title: 'components/Avatar',
  component: Avatar,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component:
          'Avatar 컴포넌트는 사용자 프로필 이미지, 동아리 로고 등에서 사용되는 원형 이미지입니다.',
      },
    },
  },
} satisfies Meta<typeof Avatar>;

export default meta;
type Story = StoryObj<typeof Avatar>;

export const Default: Story = {
  args: {
    src: 'https://picsum.photos/150/150',
    alt: 'Avatar',
  },
  argTypes: {
    src: {
      control: false,
    },
    alt: {
      control: false,
    },
    className: {
      control: false,
    },
  },
};

export const All: Story = {
  render: () => (
    <Flex dir="row" alignItems="center" justifyContent="start" wrap="nowrap" className="gap-4">
      <Avatar size="sm" src="https://picsum.photos/50/50" alt="Avatar Small" />
      <Avatar size="md" src="https://picsum.photos/100/100" alt="Avatar Medium" />
      <Avatar size="lg" src="https://picsum.photos/150/150" alt="Avatar Large" />
      <Avatar size="xl" src="https://picsum.photos/150/150" alt="Avatar Large" />
    </Flex>
  ),
};
