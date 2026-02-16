import { useCallback, useEffect, useRef, useState } from 'react';

const TICK_MS = 50;

type UseTimerOptions = {
  initialTime: number;
  isActive: boolean;
  onComplete?: () => void;
  interval?: number;
};

export const useTimer = ({
  initialTime,
  isActive,
  onComplete,
  interval = 1000,
}: UseTimerOptions) => {
  const [time, setTime] = useState(initialTime);
  const [resetKey, setResetKey] = useState(0);
  const onCompleteRef = useRef(onComplete);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);
  onCompleteRef.current = onComplete;

  const decrementPerTick = TICK_MS / interval;

  useEffect(() => {
    if (!isActive) {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
      return;
    }

    intervalRef.current = setInterval(() => {
      setTime((prev) => {
        const next = Math.max(0, prev - decrementPerTick);
        if (next <= 0 && intervalRef.current) {
          clearInterval(intervalRef.current);
          intervalRef.current = null;
        }
        return next;
      });
    }, TICK_MS);

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
    };
  }, [isActive, resetKey, decrementPerTick]);

  useEffect(() => {
    if (time <= 0 && isActive && onCompleteRef.current) {
      onCompleteRef.current();
    }
  }, [time, isActive]);

  const reset = useCallback(
    (newTime?: number) => {
      setTime(newTime ?? initialTime);
      setResetKey((k) => k + 1);
    },
    [initialTime],
  );

  return { time, reset };
};
