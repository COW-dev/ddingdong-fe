'use client';

import { useSearchParams } from 'next/navigation';

import { useCallback, useEffect, useState } from 'react';

import { useGameFunnel } from '../_contexts/GameFunnelContext';

import type { RoundResultModalAction } from '../_components/ui/RoundResultModal';

export const usePairGamePage = () => {
  const searchParams = useSearchParams();
  const { Funnel, step, setStep } = useGameFunnel();

  const [currentRound, setCurrentRound] = useState(0);
  const [gameKey, setGameKey] = useState(0);
  const [heartModalStage, setHeartModalStage] = useState(1);
  const [heartModalSuccess, setHeartModalSuccess] = useState(false);
  const [isHeartModalOpen, setIsHeartModalOpen] = useState(false);
  const [totalParticipants, setTotalParticipants] = useState(0);

  useEffect(() => {
    const stepFromUrl = searchParams.get('step');
    if (stepFromUrl === 'submit' && step !== 'submit') {
      window.history.replaceState(null, '', '/game');
      setStep('intro');
    }
  }, [searchParams, step, setStep]);

  const handleGameStart = useCallback(() => {
    setCurrentRound(0);
    setGameKey((k) => k + 1);
    setStep('playing');
  }, [setStep]);

  const handleRoundComplete = useCallback(
    (roundIndex: number, success: boolean) => {
      setHeartModalStage(roundIndex + 1);
      setHeartModalSuccess(success);
      setIsHeartModalOpen(true);
    },
    [],
  );

  const handleRoundResultAction = useCallback(
    (action: RoundResultModalAction) => {
      switch (action) {
        case 'nextStage':
          setCurrentRound(heartModalStage);
          break;
        case 'quit':
          setStep('intro');
          break;
        case 'retry':
          setCurrentRound(0);
          setGameKey((k) => k + 1);
          break;
        case 'submit':
          setStep('submit');
          window.history.replaceState(null, '', '/game?step=submit');
          break;
      }
      setIsHeartModalOpen(false);
    },
    [heartModalStage, setStep],
  );

  const handleSubmit = useCallback(async () => {
    setTotalParticipants((prev) => prev + 1);
    setStep('completed');
    window.history.replaceState(null, '', '/pair_game');
  }, [setStep]);

  return {
    Funnel,
    step,
    currentRound,
    gameKey,
    heartModalStage,
    heartModalSuccess,
    isHeartModalOpen,
    setIsHeartModalOpen,
    totalParticipants,
    handleGameStart,
    handleRoundComplete,
    handleRoundResultAction,
    handleSubmit,
  };
};
