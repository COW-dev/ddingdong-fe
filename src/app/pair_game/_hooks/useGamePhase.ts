'use client';

import { useState, useCallback } from 'react';

import { useTimer } from './useTimer';

type Props = {
  previewTime: number;
  gameTime: number;
};

export const useGamePhase = ({ previewTime, gameTime }: Props) => {
  const [phase, setPhase] = useState<'preview' | 'playing' | 'ended'>(
    'preview',
  );

  const handlePreviewComplete = useCallback(() => {
    setPhase('playing');
  }, []);

  const handleGameComplete = useCallback(() => {
    setPhase('ended');
  }, []);

  const { time: previewTimer } = useTimer({
    initialTime: previewTime,
    isActive: phase === 'preview',
    onComplete: handlePreviewComplete,
  });

  const { time: gameTimer } = useTimer({
    initialTime: gameTime,
    isActive: phase === 'playing',
    onComplete: handleGameComplete,
  });

  const stop = useCallback(() => {
    setPhase('ended');
  }, []);

  return {
    previewTimer,
    gameTimer,
    phase,
    isPreviewMode: phase === 'preview',
    isGameActive: phase === 'playing',
    stop,
  };
};
