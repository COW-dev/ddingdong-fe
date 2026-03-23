import { useState } from 'react';

import { Radio, RadioItem } from './index';

import type { InputValue } from './RadioRoot';
import type { Meta, StoryObj } from '@storybook/react';

const meta = {
  title: 'components/Radio',
  component: Radio,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component: 'Radio 컴포넌트는 input type="radio"를 대체할 수 있는 컴포넌트입니다.',
      },
    },
  },
} satisfies Meta<typeof Radio>;

export default meta;
type Story = StoryObj<typeof Radio>;

export const Default: Story = {
  args: {
    disabled: false,
    size: 'md',
  },
  render: (args) => (
    <Radio {...args}>
      <RadioItem value="option1" />
    </Radio>
  ),
};

export const UsingWithLabel: Story = {
  render: () => (
    <Radio className="flex flex-col gap-2">
      <div className="flex items-center gap-2">
        <RadioItem id="test" value="test" />
        <label htmlFor="test">radio 1</label>
      </div>
      <div className="flex items-center gap-2">
        <RadioItem id="test2" value="test2" />
        <label htmlFor="test2">radio 2</label>
      </div>
    </Radio>
  ),
};

export const Controlled: Story = {
  render: () => {
    const [value, setValue] = useState<InputValue>(1);
    const handleChange = (newValue: InputValue) => {
      setValue(newValue);
    };

    return (
      <Radio value={value} onValueChange={(value) => handleChange(value)}>
        <RadioItem value={1} />
        <RadioItem value="문자열 value" />
      </Radio>
    );
  },
};

export const Uncontrolled: Story = {
  render: () => (
    <Radio defaultValue={1}>
      <RadioItem value={1} />
      <RadioItem value={2} />
    </Radio>
  ),
};
