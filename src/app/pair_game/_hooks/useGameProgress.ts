'use client';

import { useCallback, useState } from 'react';

import { preloadGameAssets } from '../_utils/preloadGameAssets';

export type RoundResult = {
  stage: number;
  success: boolean;
};

export const usePairGame = () => {
  const [currentRound, setCurrentRound] = useState(0);
  const [gameInstanceId, setGameInstanceId] = useState(0);
  const [roundResult, setRoundResult] = useState<RoundResult>({
    stage: 1,
    success: false,
  });

  const startGame = useCallback(() => {
    setCurrentRound(0);
    setGameInstanceId((id) => id + 1);
  }, []);

  const completeRound = useCallback((roundIndex: number, success: boolean) => {
    if (success) preloadGameAssets();
    setRoundResult({ stage: roundIndex + 1, success });
  }, []);

  const advanceToNextStage = useCallback(() => {
    setCurrentRound((prev) => prev + 1);
  }, []);

  const resetGame = useCallback(() => {
    setCurrentRound(0);
    setGameInstanceId((id) => id + 1);
  }, []);

  return {
    currentRound,
    gameInstanceId,
    roundResult,
    startGame,
    completeRound,
    advanceToNextStage,
    resetGame,
  };
};
