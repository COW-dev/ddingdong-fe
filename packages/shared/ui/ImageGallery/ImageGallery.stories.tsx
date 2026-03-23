import { ImageGallery } from './ImageGallery';

import type { Meta, StoryObj } from '@storybook/react';

const meta = {
  title: 'components/ImageGallery',
  component: ImageGallery,
  tags: ['autodocs'],
} satisfies Meta<typeof ImageGallery>;

export default meta;
type Story = StoryObj<typeof meta>;

const SAMPLE_IMAGE = [
  {
    url: 'https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?q=80&w=1200&auto=format&fit=crop',
    name: 'ImageGalleryExample1',
  },
  {
    url: 'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?q=80&w=1200&auto=format&fit=crop',
    name: 'ImageGalleryExample2',
  },
  {
    url: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?q=80&w=1200&auto=format&fit=crop',
    name: 'ImageGalleryExample3',
  },
  {
    url: 'https://images.unsplash.com/photo-1470770841072-f978cf4d019e?q=80&w=1200&auto=format&fit=crop',
    name: 'ImageGalleryExample4',
  },
  {
    url: 'https://images.unsplash.com/photo-1491553895911-0055eca6402d?q=80&w=1200&auto=format&fit=crop',
    name: 'ImageGalleryExample5',
  },
  {
    url: 'https://images.unsplash.com/photo-1499002238440-d264edd596ec?q=80&w=1200&auto=format&fit=crop',
    name: 'ImageGalleryExample6',
  },
];

export const Basic: Story = {
  args: {
    images: SAMPLE_IMAGE,
  },
  parameters: {
    layout: 'centered',
  },
  render: (args) => <ImageGallery {...args} />,
};
