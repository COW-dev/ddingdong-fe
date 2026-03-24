import { ReactNode } from 'react';

import { cn } from '@/shared/lib/core';

import { Icon } from '../Icon';

import { CarouselContext, useCarousel } from './CarouselContext';
import { useCarouselController } from './useCarouselController';

type CarouselProps = {
  /**
   * Additional CSS classes to apply to the carousel container
   */
  className?: string;
  /**
   * The content to display within the carousel
   */
  children: ReactNode;
};

export function Carousel({ className = '', children }: CarouselProps) {
  const carouselData = useCarouselController();

  return (
    <CarouselContext.Provider value={carouselData}>
      <div
        className={cn('relative', className)}
        onMouseEnter={carouselData.handleMouseEnter}
        onMouseLeave={carouselData.handleMouseLeave}
        role="region"
        aria-roledescription="carousel"
      >
        {children}
        <CarouselPrevious />
        <CarouselNext />
      </div>
    </CarouselContext.Provider>
  );
}

export function CarouselContent({ children, className = '' }: Omit<CarouselProps, 'itemsPerView'>) {
  const { scrollContainerRef } = useCarousel();

  return (
    <div
      ref={scrollContainerRef}
      className={cn(
        'scroll no-scrollbar flex overflow-x-auto overflow-y-hidden scroll-smooth',
        className
      )}
    >
      {children}
    </div>
  );
}

export function CarouselItem({ children, className = '' }: Omit<CarouselProps, 'itemsPerView'>) {
  return <div className={cn('w-full min-w-full flex-shrink-0', className)}>{children}</div>;
}

export function CarouselPrevious() {
  const { goToPrevious, canGoNext, canGoPrevious } = useCarousel();

  if (!(canGoNext || canGoPrevious)) {
    return null;
  }

  return (
    <button
      onClick={goToPrevious}
      disabled={!canGoPrevious}
      className="absolute top-1/2 left-4 z-10 flex size-10 -translate-y-1/2 cursor-pointer items-center justify-center rounded-full bg-white shadow-lg transition-all hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-50"
      aria-label="이전"
    >
      <Icon name="arrowLeft" className="pr-0.5" />
    </button>
  );
}

export function CarouselNext() {
  const { goToNext, canGoNext, canGoPrevious } = useCarousel();

  if (!(canGoNext || canGoPrevious)) {
    return null;
  }

  return (
    <button
      onClick={goToNext}
      disabled={!canGoNext}
      className="absolute top-1/2 right-4 z-10 flex size-10 -translate-y-1/2 cursor-pointer items-center justify-center rounded-full bg-white shadow-lg transition-all hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-50"
      aria-label="다음"
    >
      <Icon name="arrowRight" className="pl-0.5" />
    </button>
  );
}
