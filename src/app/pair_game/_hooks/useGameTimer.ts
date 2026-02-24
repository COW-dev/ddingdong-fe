import { useState, useCallback } from 'react';

import { useTimer } from './useTimer';

type UseGameTimerOptions = {
  previewTime: number;
  gameTime: number;
  handlePreviewEnd: () => void;
  handleGameEnd: () => void;
};

export const useGameTimer = ({
  previewTime,
  gameTime,
  handlePreviewEnd,
  handleGameEnd,
}: UseGameTimerOptions) => {
  const [isPreviewMode, setIsPreviewMode] = useState(true);
  const [isGameActive, setIsGameActive] = useState(false);

  const handlePreviewComplete = useCallback(() => {
    setIsPreviewMode(false);
    setIsGameActive(true);
    handlePreviewEnd();
  }, [handlePreviewEnd]);

  const handleGameComplete = useCallback(() => {
    setIsGameActive(false);
    handleGameEnd();
  }, [handleGameEnd]);

  const { time: previewTimer, reset: resetPreview } = useTimer({
    initialTime: previewTime,
    isActive: isPreviewMode,
    onComplete: handlePreviewComplete,
  });

  const { time: gameTimer, reset: resetGame } = useTimer({
    initialTime: gameTime,
    isActive: isGameActive,
    onComplete: handleGameComplete,
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
