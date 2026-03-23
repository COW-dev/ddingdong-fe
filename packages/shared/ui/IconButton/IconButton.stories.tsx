import { IconButton } from './IconButton';

import type { Meta, StoryObj } from '@storybook/react';

const meta = {
  title: 'components/IconButton',
  component: IconButton,
  tags: ['autodocs'],
} satisfies Meta<typeof IconButton>;

export default meta;
type Story = StoryObj<typeof IconButton>;

export const Basic: Story = {
  args: {
    iconName: 'close',
    color: 'gray',
    size: 25,
  },
  render: (args) => <IconButton {...args} />,
};
