import { Flex } from '../Flex';
import { Icon } from '../Icon';

import { ImageGalleryProvider, useImageGallery } from './ImageGalleryContext';

import { cn } from '@/shared/lib/core';

export type ImageGalleryItem = { url: string; name?: string };
type Props = {
  /**
   * List of image name and url
   */
  images: ImageGalleryItem[];

  /**
   * Additional class for container
   */
  className?: string;
};

export function ImageGallery({ images, className }: Props) {
  return (
    <ImageGalleryProvider images={images}>
      <ImageGalleryContent className={className} />
    </ImageGalleryProvider>
  );
}

function ImageGalleryContent({ className }: { className?: string }) {
  const { images, current, total, firstImage } = useImageGallery();
  const loading = firstImage ? 'eager' : 'lazy';

  return (
    <Flex dir="col" alignItems="center" className={cn('w-full max-w-[500px]', className)}>
      <Flex
        alignItems="center"
        justifyContent="center"
        className="relative aspect-square w-full overflow-hidden bg-gray-50"
      >
        <img
          src={images[current].url}
          loading={loading}
          alt={images[current].name}
          width={500}
          height={500}
          className="h-full w-full object-contain"
        />
        {total > 1 && (
          <>
            <ImageGalleryArrow direction="prev" />
            <ImageGalleryArrow direction="next" />
          </>
        )}
      </Flex>
      <Flex justifyContent="center" className="mt-3">
        <ImageGalleryDots />
      </Flex>
    </Flex>
  );
}

function ImageGalleryDots() {
  const { images, current, goToIndex } = useImageGallery();
  return (
    <Flex alignItems="center" className="gap-2 md:gap-2.5">
      {images.map((_, index) => {
        const isActive = index === current;
        return (
          <button
            key={index}
            type="button"
            aria-label={`Image ${index + 1}`}
            onClick={() => goToIndex(index)}
            className={cn(
              'h-2 w-2 cursor-pointer rounded-full md:h-2.5 md:w-2.5',
              isActive ? 'bg-primary-300' : 'bg-gray-200'
            )}
          />
        );
      })}
    </Flex>
  );
}

type ImageGalleryArrowProps = {
  direction: 'prev' | 'next';
};
function ImageGalleryArrow({ direction }: ImageGalleryArrowProps) {
  const { firstImage, lastImage, goPrev, goNext } = useImageGallery();
  const isPrev = direction === 'prev';
  const isHidden = isPrev ? firstImage : lastImage;
  const onClick = isPrev ? goPrev : goNext;

  return (
    <button
      type="button"
      onClick={onClick}
      className={cn(
        'absolute top-1/2 z-10 -translate-y-1/2 cursor-pointer rounded-full bg-white/75 p-1 shadow-sm transition-opacity hover:bg-white md:p-1.5',
        isPrev ? 'left-4' : 'right-4',
        isHidden && 'hidden'
      )}
      aria-label={`${direction} image button`}
    >
      <Icon name={isPrev ? 'arrowLeft' : 'arrowRight'} className="h-5 w-5 md:h-6 md:w-6" />
    </button>
  );
}
