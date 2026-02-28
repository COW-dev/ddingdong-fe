'use client';

import { useCallback, useEffect, useRef, useState } from 'react';

import toast from 'react-hot-toast';

import { ApiError } from '@/app/_api/fetcher';
import { useLikeFeed } from '@/app/_api/mutations/feed';

const DEBOUNCE_DELAY = 3000;
const MAX_LIKE_COUNT = 100;

type UseDebouncedLikeOptions = {
  feedId: number;
  initialLikeCount: number;
};

export const useDebouncedLike = ({
  feedId,
  initialLikeCount,
}: UseDebouncedLikeOptions) => {
  const [displayLikeCount, setDisplayLikeCount] = useState(initialLikeCount);
  const pendingLikesRef = useRef(0);
  const timerRef = useRef<NodeJS.Timeout | null>(null);
  const { mutate: likeFeed } = useLikeFeed(feedId);

  const flushLikes = useCallback(() => {
    if (pendingLikesRef.current > 0) {
      const likesToSend = Math.min(pendingLikesRef.current, MAX_LIKE_COUNT);
      pendingLikesRef.current = 0;

      likeFeed(
        { count: likesToSend },
        {
          onError: (error: Error) => {
            if (error instanceof ApiError) {
              toast.error(error.message);
            }
          },
        },
      );
    }

    if (timerRef.current) {
      clearTimeout(timerRef.current);
      timerRef.current = null;
    }
  }, [likeFeed]);

  const handleLike = useCallback(() => {
    if (pendingLikesRef.current >= MAX_LIKE_COUNT) {
      return;
    }

    pendingLikesRef.current += 1;
    setDisplayLikeCount((prev) => prev + 1);

    if (timerRef.current) {
      clearTimeout(timerRef.current);
    }

    timerRef.current = setTimeout(() => {
      flushLikes();
    }, DEBOUNCE_DELAY);
  }, [flushLikes]);

  useEffect(() => {
    const handleVisibilityChange = () => {
      if (document.visibilityState === 'hidden') {
        flushLikes();
      }
    };

    const handleBeforeUnload = () => {
      flushLikes();
    };

    document.addEventListener('visibilitychange', handleVisibilityChange);
    window.addEventListener('beforeunload', handleBeforeUnload);

    return () => {
      document.removeEventListener('visibilitychange', handleVisibilityChange);
      window.removeEventListener('beforeunload', handleBeforeUnload);
      flushLikes();
    };
  }, [flushLikes]);

  return {
    likeCount: displayLikeCount,
    handleLike,
  };
};
