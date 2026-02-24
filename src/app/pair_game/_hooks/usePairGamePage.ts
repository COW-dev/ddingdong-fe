'use client';

import { useSearchParams } from 'next/navigation';

import { useCallback, useEffect, useRef, useState } from 'react';

import { usePortal } from 'ddingdong-design-system';

import { useGameFunnel } from '../_contexts/GameFunnelContext';
import { PAIR_GAME_PATH } from '../_utils/gameImages';
import { preloadGameAssets } from '../_utils/preloadGameAssets';

import type { RoundResultModalAction } from '../_components/ui/RoundResultModal';

export const usePairGamePage = () => {
  const searchParams = useSearchParams();
  const { Funnel, step, setStep } = useGameFunnel();
  const {
    isOpen: isHeartModalOpen,
    openModal: openHeartModal,
    closeModal: closeHeartModal,
  } = usePortal();

  const [currentRound, setCurrentRound] = useState(0);
  const [gameKey, setGameKey] = useState(0);
  const [heartModalStage, setHeartModalStage] = useState(1);
  const [heartModalSuccess, setHeartModalSuccess] = useState(false);
  const [totalParticipants, setTotalParticipants] = useState(0);

  const roundResultModalRef = useRef<{
    setResult: (stage: number, success: boolean) => void;
    open: () => void;
  } | null>(null);
  roundResultModalRef.current = {
    setResult: (stage, success) => {
      setHeartModalStage(stage);
      setHeartModalSuccess(success);
    },
    open: openHeartModal,
  };

  useEffect(() => {
    const stepFromUrl = searchParams.get('step');
    if (stepFromUrl === 'submit' && step !== 'submit') {
      window.history.replaceState(null, '', PAIR_GAME_PATH);
      setStep('intro');
    }
  }, [searchParams, step, setStep]);

  useEffect(() => {
    if (step === 'intro') {
      preloadGameAssets();
    }
  }, [step]);

  const handleGameStart = useCallback(() => {
    setCurrentRound(0);
    setGameKey((k) => k + 1);
    setStep('playing');
  }, [setStep]);

  const handleRoundComplete = useCallback(
    (roundIndex: number, success: boolean) => {
      if (success) {
        preloadGameAssets();
      }
      setHeartModalStage(roundIndex + 1);
      setHeartModalSuccess(success);
      openHeartModal();
    },
    [openHeartModal],
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
          window.history.replaceState(
            null,
            '',
            `${PAIR_GAME_PATH}?step=submit`,
          );
          break;
      }
      closeHeartModal();
    },
    [heartModalStage, setStep, closeHeartModal],
  );

  const handleSubmit = useCallback(async () => {
    setTotalParticipants((prev) => prev + 1);
    setStep('completed');
    window.history.replaceState(null, '', PAIR_GAME_PATH);
  }, [setStep]);

  return {
    Funnel,
    step,
    currentRound,
    gameKey,
    heartModalStage,
    heartModalSuccess,
    isHeartModalOpen,
    closeHeartModal,
    roundResultModalRef,
    totalParticipants,
    handleGameStart,
    handleRoundComplete,
    handleRoundResultAction,
    handleSubmit,
  };
};
