import { useCallback, useEffect, useRef, useState } from 'react';

const TICK_INTERVAL_MS = 50;

type Props = {
  initialTime: number;
  isActive: boolean;
  onComplete?: () => void;
};

export const useTimer = ({ initialTime, isActive, onComplete }: Props) => {
  const [time, setTime] = useState(initialTime);
  const onCompleteRef = useRef(onComplete);
  onCompleteRef.current = onComplete;

  useEffect(() => {
    if (!isActive) return;

    const id = setInterval(() => {
      setTime((prev) => {
        const next = Math.max(0, prev - TICK_INTERVAL_MS / 1000);
        if (next <= 0) {
          clearInterval(id);
          onCompleteRef.current?.();
        }
        return next;
      });
    }, TICK_INTERVAL_MS);

    return () => clearInterval(id);
  }, [isActive]);

  const reset = useCallback(
    (newTime?: number) => {
      setTime(newTime ?? initialTime);
    },
    [initialTime],
  );

  return { time, reset };
};
