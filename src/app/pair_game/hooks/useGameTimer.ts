import { useState, useCallback } from 'react';

import { useTimer } from './useTimer';

type UseGameTimerOptions = {
  previewTime: number;
  gameTime: number;
  onPreviewEnd: () => void;
  onGameEnd: () => void;
};

export const useGameTimer = ({
  previewTime,
  gameTime,
  onPreviewEnd,
  onGameEnd,
}: UseGameTimerOptions) => {
  const [isPreviewMode, setIsPreviewMode] = useState(true);
  const [isGameActive, setIsGameActive] = useState(false);

  const onPreviewComplete = useCallback(() => {
    setIsPreviewMode(false);
    setIsGameActive(true);
    onPreviewEnd();
  }, [onPreviewEnd]);

  const onGameComplete = useCallback(() => {
    setIsGameActive(false);
    onGameEnd();
  }, [onGameEnd]);

  const { time: previewTimer, reset: resetPreview } = useTimer({
    initialTime: previewTime,
    isActive: isPreviewMode,
    onComplete: onPreviewComplete,
  });

  const { time: gameTimer, reset: resetGame } = useTimer({
    initialTime: gameTime,
    isActive: isGameActive,
    onComplete: onGameComplete,
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
};
