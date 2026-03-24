import { useCallback, useEffect, useRef, useState } from 'react';

export const useCarouselController = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [totalItems, setTotalItems] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  useEffect(() => {
    if (scrollContainerRef.current) {
      const container = scrollContainerRef.current;
      const itemCount = container.children.length;
      setTotalItems(itemCount);
    }
  }, []);

  const goToIndex = useCallback((index: number) => {
    if (!scrollContainerRef.current) return;

    const container = scrollContainerRef.current;
    const itemWidth = container.clientWidth;

    container.scrollTo({
      left: itemWidth * index,
      behavior: 'smooth',
    });

    setCurrentIndex(index);
  }, []);

  const autoGoToNext = useCallback(() => {
    if (isPaused || totalItems === 0) return;

    const nextIndex = currentIndex >= totalItems - 1 ? 0 : currentIndex + 1;
    goToIndex(nextIndex);
  }, [goToIndex, isPaused, currentIndex, totalItems]);

  const goToNext = useCallback(() => {
    const maxIndex = totalItems - 1;
    const nextIndex = Math.min(currentIndex + 1, maxIndex);

    goToIndex(nextIndex);
  }, [currentIndex, totalItems, goToIndex]);

  const goToPrevious = useCallback(() => {
    const prevIndex = Math.max(0, currentIndex - 1);
    goToIndex(prevIndex);
  }, [currentIndex, goToIndex]);

  useEffect(() => {
    if (totalItems === 0 || isPaused) return;

    intervalRef.current = setInterval(autoGoToNext, 3000);

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [autoGoToNext, totalItems, isPaused]);

  const handleMouseEnter = () => setIsPaused(true);
  const handleMouseLeave = () => setIsPaused(false);

  const canGoNext = currentIndex < totalItems - 1;
  const canGoPrevious = currentIndex > 0;

  return {
    currentIndex,
    totalItems,
    goToNext,
    goToPrevious,
    canGoNext,
    canGoPrevious,
    scrollContainerRef,
    handleMouseEnter,
    handleMouseLeave,
  };
};
