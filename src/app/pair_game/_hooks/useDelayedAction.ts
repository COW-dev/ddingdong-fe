'use client';

import { useCallback, useEffect, useRef } from 'react';

export const useDelayedAction = () => {
  const timeoutIds = useRef<Set<NodeJS.Timeout>>(new Set());

  const schedule = useCallback((callback: () => void, delay: number) => {
    const id = setTimeout(() => {
      timeoutIds.current.delete(id);
      callback();
    }, delay);
    timeoutIds.current.add(id);
    return id;
  }, []);

  const cancel = useCallback((id: NodeJS.Timeout) => {
    clearTimeout(id);
    timeoutIds.current.delete(id);
  }, []);

  const cancelAll = useCallback(() => {
    timeoutIds.current.forEach((id) => clearTimeout(id));
    timeoutIds.current.clear();
  }, []);

  useEffect(() => {
    return () => cancelAll();
  }, [cancelAll]);

  return { schedule, cancel, cancelAll };
};
