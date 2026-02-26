'use client';

import { useSearchParams } from 'next/navigation';

import { useCallback, useEffect, useRef, useState } from 'react';

import { useQuery } from '@tanstack/react-query';
import { usePortal } from 'ddingdong-design-system';

import { pairGameQueryOptions } from '@/app/_api/queries/pair_game';

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
  const { data: appliersAmount } = useQuery({
    ...pairGameQueryOptions.appliersAmount(),
    enabled: step === 'completed',
  });
  const totalParticipants = appliersAmount?.amount ?? 0;

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
    if (stepFromUrl === 'submit') {
      const canSubmit =
        window.sessionStorage.getItem('pairGameCanSubmit') === '1';
      if (canSubmit) {
        if (step !== 'submit') {
          setStep('submit');
        }
      } else {
        window.history.replaceState(null, '', PAIR_GAME_PATH);
        if (step !== 'intro') {
          setStep('intro');
        }
      }
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
      queueMicrotask(() => openHeartModal());
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
          window.sessionStorage.setItem('pairGameCanSubmit', '1');
          setStep('submit');
          window.history.replaceState(null, '', PAIR_GAME_PATH);
          break;
      }
      closeHeartModal();
    },
    [heartModalStage, setStep, closeHeartModal],
  );

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
  };
};
