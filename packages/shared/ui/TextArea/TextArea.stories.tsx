import { useState } from 'react';

import { TextArea } from '.';

import type { Meta, StoryObj } from '@storybook/react';

const meta = {
  title: 'components/TextArea',
  component: TextArea,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component:
          'TextArea 컴포넌트는 사용자가 여러 줄의 텍스트를 입력할 수 있는 필드를 제공합니다.',
      },
    },
  },
} satisfies Meta<typeof TextArea>;

export default meta;
type Story = StoryObj<typeof TextArea>;

export const Basic: Story = {
  args: {
    value: '',
    maxLength: 500,
    showCounter: true,
  },
  render: (args) => {
    const [value, setValue] = useState(args.value);
    const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
      setValue(e.target.value);
    };
    return (
      <TextArea {...args} value={value} onChange={handleChange} placeholder="텍스트를 입력하세요" />
    );
  },
};
