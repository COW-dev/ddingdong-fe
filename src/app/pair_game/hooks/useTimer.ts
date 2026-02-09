import { useEffect, useState, useCallback } from 'react';

type UseTimerOptions = {
  initialTime: number;
  isActive: boolean;
  onComplete?: () => void;
  interval?: number;
};

export function useTimer({
  initialTime,
  isActive,
  onComplete,
  interval = 1000,
}: UseTimerOptions) {
  const [time, setTime] = useState(initialTime);

  useEffect(() => {
    if (!isActive || time <= 0) return;

    const timer = setTimeout(() => {
      setTime((prev) => (prev <= 0 ? 0 : prev - 1));
    }, interval);

    return () => clearTimeout(timer);
  }, [time, isActive, interval]);

  useEffect(() => {
    if (time === 0 && isActive && onComplete) {
      onComplete();
    }
  }, [time, isActive, onComplete]);

  const reset = useCallback(
    (newTime?: number) => setTime(newTime ?? initialTime),
    [initialTime],
  );

  return { time, reset };
}
