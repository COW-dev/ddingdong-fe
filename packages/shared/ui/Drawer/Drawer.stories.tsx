import { usePortal } from '@/shared/ui/Portal/usePortal';

import { Button } from '../Button';
import { Title1 } from '../Typography';

import { Drawer, Props } from './Drawer';

import type { Meta, StoryObj } from '@storybook/react';

const meta = {
  title: 'components/Drawer',
  component: Drawer,
  tags: ['autodocs'],
} satisfies Meta<typeof Drawer>;

export default meta;

export type Story = StoryObj<Props>;
export const Basic: Story = {
  args: {
    isOpen: true,
    onClose: () => {},
  },
  argTypes: {
    onClose: { action: 'onClose' },
  },
  render: () => {
    const { isOpen, openModal, closeModal } = usePortal();

    return (
      <>
        <Button variant="primary" color="blue" onClick={openModal}>
          Open Drawer
        </Button>
        <Drawer isOpen={isOpen} onClose={closeModal}>
          <div className="p-32">
            <Title1>Drawer</Title1>
          </div>
        </Drawer>
      </>
    );
  },
};
