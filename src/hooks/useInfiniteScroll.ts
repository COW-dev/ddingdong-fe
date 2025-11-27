'use client';
import { useCallback, useEffect, useRef } from 'react';

type UseInfiniteScrollOptions = {
  hasNextPage?: boolean;
  isFetchingNextPage?: boolean;
  fetchNextPage: () => void;
  observerOptions?: IntersectionObserverInit;
};

const DEFAULT_OBSERVER_OPTIONS: IntersectionObserverInit = {
  threshold: 1.0,
  rootMargin: '0px 0px 100px 0px',
};

export const useInfiniteScroll = ({
  hasNextPage,
  isFetchingNextPage,
  fetchNextPage,
  observerOptions = DEFAULT_OBSERVER_OPTIONS,
}: UseInfiniteScrollOptions) => {
  const observerTarget = useRef<HTMLDivElement>(null);

  const handleObserver = useCallback(
    (entries: IntersectionObserverEntry[]) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting && hasNextPage && !isFetchingNextPage) {
          fetchNextPage();
        }
      });
    },
    [fetchNextPage, hasNextPage, isFetchingNextPage],
  );

  useEffect(() => {
    const observer = new IntersectionObserver(handleObserver, observerOptions);

    if (observerTarget.current) {
      observer.observe(observerTarget.current);
    }

    return () => observer.disconnect();
  }, [handleObserver, observerOptions]);

  return { observerTarget };
};
