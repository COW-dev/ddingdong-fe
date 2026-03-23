import { COLORS } from '@/shared/lib/colors';

import { iconNames } from '../assets';

import { Icon } from './Icon';

import type { Meta, StoryObj } from '@storybook/react';

const meta = {
  title: 'components/Icon',
  component: Icon,
  tags: ['autodocs'],
} satisfies Meta<typeof Icon>;

export default meta;
type Story = StoryObj<typeof Icon>;

export const Basic: Story = {
  args: {
    color: 'gray',
    size: 25,
  },
  argTypes: {
    name: { table: { disable: true } },
    color: { control: { type: 'select' }, options: Object.keys(COLORS) },
    size: { control: { type: 'number' } },
  },
  render: (args) => {
    return (
      <div className="flex flex-row flex-wrap gap-2">
        {iconNames.map((icon) => (
          <div className="flex-shrink-0" key={icon}>
            <Icon {...args} name={icon} />
          </div>
        ))}
      </div>
    );
  },
};
