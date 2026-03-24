import { Tabs, TabItem } from '.';

import type { Meta, StoryObj } from '@storybook/react';

const meta = {
  title: 'components/Tabs',
  component: Tabs,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component: 'Tabs 하위 컴포넌트로 TabItem이 존재합니다',
      },
    },
  },
  argTypes: {
    defaultIndex: {
      description: '초기에 노출할 child의 index를 설정합니다.',
    },
  },
} satisfies Meta<typeof Tabs>;

export default meta;
type Story = StoryObj<typeof Tabs>;

export const Basic: Story = {
  render: () => (
    <Tabs defaultIndex={0}>
      <TabItem label="공지사항">
        <div className="my-4 text-center">1번 탭 컴포넌트</div>
      </TabItem>
      <TabItem label="피드">
        <div className="my-4 text-center">2번 탭 컴포넌트</div>
      </TabItem>
      <TabItem label="활동보고서">
        <div className="my-4 text-center">3번 탭 컴포넌트</div>
      </TabItem>
    </Tabs>
  ),
};
