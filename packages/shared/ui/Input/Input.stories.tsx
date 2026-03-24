import { useState } from 'react';

import { Input } from './Input';

import type { Meta, StoryObj } from '@storybook/react';

const meta = {
  title: 'components/Input',
  component: Input,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component: 'Input 컴포넌트는 사용자가 텍스트를 입력할 수 있는 필드를 제공합니다.',
      },
    },
  },
} satisfies Meta<typeof Input>;

export default meta;
type Story = StoryObj<typeof Input>;

export const Basic: Story = {
  args: {
    placeholder: '텍스트를 입력하세요',
  },
  render: (args) => {
    const [value, setValue] = useState<string>('');
    const handleReset = () => setValue('');
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => setValue(e.target.value);

    return <Input {...args} value={value} onChange={handleChange} onClickReset={handleReset} />;
  },
};
