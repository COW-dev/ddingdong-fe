import { createContext, RefObject, useContext } from 'react';

type CarouselContextType = {
  /**
   * The current index of the active item in the carousel.
   */
  currentIndex: number;
  /**
   * The total number of items in the carousel.
   */
  totalItems: number;
  /**
   * Scroll to the next item in the carousel.
   * @returns void
   */
  goToNext: () => void;
  /**
   * Scroll to the previous item in the carousel.
   * @returns void
   */
  goToPrevious: () => void;
  /**
   * Whether the carousel can scroll to the next item.
   */
  canGoNext: boolean;
  /**
   * Whether the carousel can scroll to the previous item.
   */
  canGoPrevious: boolean;
  /**
   * A ref to the scroll container element.
   */
  scrollContainerRef: RefObject<HTMLDivElement | null>;
  /**
   * Function to handle mouse enter event to pause auto-scrolling.
   */
  handleMouseEnter: () => void;
  /**
   * Function to handle mouse leave event to resume auto-scrolling.
   */
  handleMouseLeave: () => void;
};

export const CarouselContext = createContext<CarouselContextType | null>(null);

export const useCarousel = () => {
  const context = useContext(CarouselContext);
  if (!context) {
    throw new Error('useCarousel must be used within a CarouselProvider');
  }
  return context;
};
