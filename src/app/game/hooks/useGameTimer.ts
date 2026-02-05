import { useState, useCallback } from 'react';

import { useTimer } from './useTimer';

type UseGameTimerOptions = {
  previewTime: number;
  gameTime: number;
  onPreviewEnd: () => void;
  onGameEnd: () => void;
};

export function useGameTimer({
  previewTime,
  gameTime,
  onPreviewEnd,
  onGameEnd,
}: UseGameTimerOptions) {
  const [isPreviewMode, setIsPreviewMode] = useState(true);
  const [isGameActive, setIsGameActive] = useState(false);

  const { time: previewTimer, reset: resetPreview } = useTimer({
    initialTime: previewTime,
    isActive: isPreviewMode,
    onComplete: () => {
      setIsPreviewMode(false);
      setIsGameActive(true);
      onPreviewEnd();
    },
  });

  const { time: gameTimer, reset: resetGame } = useTimer({
    initialTime: gameTime,
    isActive: isGameActive,
    onComplete: () => {
      setIsGameActive(false);
      onGameEnd();
    },
  });

  const reset = useCallback(() => {
    setIsPreviewMode(true);
    setIsGameActive(false);
    resetPreview(previewTime);
    resetGame(gameTime);
  }, [previewTime, gameTime, resetPreview, resetGame]);

  return {
    previewTimer,
    gameTimer,
    isPreviewMode,
    isGameActive,
    setIsGameActive,
    reset,
  };
}
