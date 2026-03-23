---
to: src/shared/ui/<%= h.changeCase.pascal(components) %>/<%= h.changeCase.pascal(components) %>.stories.tsx
---
import type { Meta, StoryObj } from '@storybook/react';

import { <%= h.changeCase.pascal(components) %> } from './<%= h.changeCase.pascal(components) %>';

const meta = {
  title: 'components/<%= h.changeCase.pascal(components) %>',
  component: <%= h.changeCase.pascal(components) %>,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component: '<%= h.changeCase.pascal(components) %> 컴포넌트',
      },
    }
  }
} satisfies Meta<typeof <%= h.changeCase.pascal(components) %>>;

export default meta;
type Story = StoryObj<typeof <%= h.changeCase.pascal(components) %>>;

export const Basic: Story = {
  render: () => <<%= h.changeCase.pascal(components) %> />,
};
