import { Carousel, CarouselContent, CarouselItem } from '.';

import type { Meta, StoryObj } from '@storybook/react';

const meta = {
  title: 'components/Carousel',
  component: Carousel,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component: 'Carousel 컴포넌트는 여러 아이템을 슬라이드 형식으로 보여줍니다.',
      },
    },
  },
} satisfies Meta<typeof Carousel>;

export default meta;
type Story = StoryObj<typeof Carousel>;

export const Default: Story = {
  render: () => (
    <Carousel>
      <CarouselContent>
        <CarouselItem>
          <div className="h-48 w-full bg-red-500" />
        </CarouselItem>
        <CarouselItem>
          <div className="h-48 w-full bg-blue-500" />
        </CarouselItem>
        <CarouselItem>
          <div className="h-48 w-full bg-green-500" />
        </CarouselItem>
      </CarouselContent>
    </Carousel>
  ),
};

export const Single: Story = {
  render: () => (
    <Carousel>
      <CarouselContent>
        <CarouselItem>
          <div className="h-48 w-full bg-red-500" />
        </CarouselItem>
      </CarouselContent>
    </Carousel>
  ),
};
