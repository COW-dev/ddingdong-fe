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

    const start = performance.now();
    const durationMs = PREVIEW_TIME * 1000;

    const updateRemaining = () => {
      const elapsedMs = performance.now() - start;
      const remaining = Math.max(0, (durationMs - elapsedMs) / 1000);
      setPreviewTimer(remaining);
      return remaining;
    };

    updateRemaining();
    const id = window.setInterval(() => {
      const remaining = updateRemaining();
      if (remaining <= 0) {
        window.clearInterval(id);
        setPhase('playing');
      }
    }, 100);

    return () => clearInterval(id);
  }, [phase]);

  useEffect(() => {
    if (phase !== 'playing') return;

    const start = performance.now();
    const durationMs = GAME_TIME * 1000;

    const updateRemaining = () => {
      const elapsedMs = performance.now() - start;
      const remaining = Math.max(0, (durationMs - elapsedMs) / 1000);
      setGameTimer(remaining);
      return remaining;
    };

    updateRemaining();
    const id = window.setInterval(() => {
      const remaining = updateRemaining();
      if (remaining <= 0) {
        window.clearInterval(id);
        setPhase('ended');
      }
    }, 100);

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
