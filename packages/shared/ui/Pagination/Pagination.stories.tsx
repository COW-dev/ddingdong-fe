import { useState } from 'react';

import { Pagination } from './Pagination';

import type { Meta, StoryObj } from '@storybook/react';

const meta = {
  title: 'components/Pagination',
  component: Pagination,
  tags: ['autodocs'],
} satisfies Meta<typeof Pagination>;

export default meta;
type Story = StoryObj<typeof Pagination>;

export const Basic: Story = {
  args: {
    currentPage: 1,
    totalPages: 2,
    className: '',
  },
  argTypes: {
    currentPage: { control: { type: 'number' } },
    totalPages: { control: { type: 'number' } },
    className: { control: { type: 'text' } },
  },
  render: (args) => {
    const [currentPage, setCurrentPage] = useState<number>(1);

    const handlePageChange = (page: number) => {
      setCurrentPage(page);
    };
    return (
      <Pagination
        currentPage={currentPage}
        totalPages={args.totalPages}
        onPageChange={handlePageChange}
      />
    );
  },
};
