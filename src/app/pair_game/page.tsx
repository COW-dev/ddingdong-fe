'use client';

import dynamic from 'next/dynamic';

import { useCallback, useEffect } from 'react';

import { useQuery } from '@tanstack/react-query';
import { usePortal } from 'ddingdong-design-system';

import { pairGameQueryOptions } from '@/app/_api/queries/pair_game';

import { CompletedStep } from './_components/steps/CompletedStep';
import { PlayingStep } from './_components/steps/PlayingStep';
import { SubmitStep } from './_components/steps/SubmitStep';
import { GameSkeleton } from './_components/ui/GameSkeleton';
import {
  GameFunnelProvider,
  useGameFunnel,
} from './_contexts/GameFunnelContext';
import { PairGamePlayingProvider } from './_contexts/PairGamePlayingContext';
import { usePairGame } from './_hooks/usePairGame';
import { preloadGameAssets } from './_utils/preloadGameAssets';

const IntroStep = dynamic(
  () =>
    import('./_components/steps/IntroStep').then((mod) => ({
      default: mod.IntroStep,
    })),
  { loading: () => <GameSkeleton /> },
);

function GamePageContent() {
  const { Funnel, step, setStep } = useGameFunnel();
  const { isOpen, openModal, closeModal } = usePortal();

  const {
    currentRound,
    gameInstanceId,
    roundResult,
    startGame,
    completeRound,
    advanceToNextStage,
    resetGame,
  } = usePairGame();

  const { data: appliersAmount } = useQuery({
    ...pairGameQueryOptions.appliersAmount(),
    enabled: step === 'completed',
  });

  useEffect(() => {
    if (step === 'intro') preloadGameAssets();
  }, [step]);

  const handleGameStart = () => {
    startGame();
    setStep('playing');
  };

  const handleRoundComplete = useCallback(
    (roundIndex: number, success: boolean) => {
      completeRound(roundIndex, success);
      queueMicrotask(openModal);
    },
    [completeRound, openModal],
  );

  return (
    <Funnel>
      <Funnel.Step name="intro">
        <IntroStep onGameStart={handleGameStart} />
      </Funnel.Step>
      <Funnel.Step name="playing">
        <PairGamePlayingProvider
          key={`${gameInstanceId}-${currentRound}`}
          currentRound={currentRound}
          onRoundComplete={handleRoundComplete}
        >
          <PlayingStep
            roundResult={roundResult}
            isModalOpen={isOpen}
            onCloseModal={closeModal}
            onAdvanceToNextStage={advanceToNextStage}
            onResetGame={resetGame}
          />
        </PairGamePlayingProvider>
      </Funnel.Step>
      <Funnel.Step name="submit">
        <SubmitStep />
      </Funnel.Step>
      <Funnel.Step name="completed">
        <CompletedStep totalParticipants={appliersAmount?.amount ?? 0} />
      </Funnel.Step>
    </Funnel>
  );
}

export default function GamePage() {
  return (
    <GameFunnelProvider>
      <GamePageContent />
    </GameFunnelProvider>
  );
}
