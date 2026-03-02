'use client';

import { useState, useCallback, useEffect } from 'react';

type Phase = 'preview' | 'playing' | 'ended';

const PREVIEW_TIME = 4;
const GAME_TIME = 20;

export const useRoundPhase = () => {
  const [phase, setPhase] = useState<Phase>('preview');
  const [previewTimer, setPreviewTimer] = useState(PREVIEW_TIME);
  const [gameTimer, setGameTimer] = useState(GAME_TIME);

  useEffect(() => {
    if (phase !== 'preview') return;

    const id = setInterval(() => {
      setPreviewTimer((prev) => {
        if (prev <= 1) {
          clearInterval(id);
          setPhase('playing');
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(id);
  }, [phase]);

  useEffect(() => {
    if (phase !== 'playing') return;

    const id = setInterval(() => {
      setGameTimer((prev) => {
        if (prev <= 1) {
          clearInterval(id);
          setPhase('ended');
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(id);
  }, [phase]);

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
