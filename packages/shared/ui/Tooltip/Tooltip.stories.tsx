import { Flex } from '../Flex';
import { Icon } from '../Icon';

import { tooltipColorMap } from './tooltipColorMap';

import { Tooltip } from '.';

import type { Meta, StoryObj } from '@storybook/react';

const meta = {
  title: 'components/Tooltip',
  component: Tooltip,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component:
          'Tooltip 컴포넌트는 사용자가 요소에 마우스를 올리거나 포커스를 맞출 때 추가 정보를 표시하는 데 사용됩니다.',
      },
    },
  },
} satisfies Meta<typeof Tooltip>;

export default meta;
type Story = StoryObj<typeof Tooltip>;

export const Basic: Story = {
  args: {
    color: 'gray',
    content: '툴팁입니다!',
    animationMode: 'SPRING',
  },
  argTypes: {
    color: {
      control: {
        type: 'select',
        options: Object.keys(tooltipColorMap),
      },
    },
    content: {
      control: {
        type: 'text',
      },
    },
    animationMode: {
      control: {
        type: 'select',
        options: ['SPRING', 'POP', 'SMOOTH'],
      },
      description: '툴팁 애니메이션 모드를 선택하세요',
    },
  },
  render: (args) => (
    <Flex>
      <Tooltip {...args}>
        <Icon name="new" size={25} />
      </Tooltip>
    </Flex>
  ),
};

export const SpringAnimation: Story = {
  args: {
    color: 'primary',
    content: '스프링!',
    animationMode: 'SPRING',
  },
  render: (args) => (
    <Flex>
      <Tooltip {...args}>
        <Icon name="new" size={25} />
      </Tooltip>
    </Flex>
  ),
};

export const PopAnimation: Story = {
  args: {
    color: 'green',
    content: '뿅!',
    animationMode: 'POP',
  },
  render: (args) => (
    <Flex>
      <Tooltip {...args}>
        <Icon name="new" size={25} />
      </Tooltip>
    </Flex>
  ),
};

export const SmoothAnimation: Story = {
  args: {
    color: 'purple',
    content: '부드러운 애니메이션',
    animationMode: 'SMOOTH',
  },
  render: (args) => (
    <Flex>
      <Tooltip {...args}>
        <Icon name="new" size={25} />
      </Tooltip>
    </Flex>
  ),
};
