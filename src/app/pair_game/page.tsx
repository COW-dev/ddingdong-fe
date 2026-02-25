'use client';

import dynamic from 'next/dynamic';

import { CompletedStep } from './_components/steps/CompletedStep';
import { PlayingStep } from './_components/steps/PlayingStep';
import { SubmitStep } from './_components/steps/SubmitStep';
import { GameSkeleton } from './_components/ui/GameSkeleton';
import { RoundResultModal } from './_components/ui/RoundResultModal';
import { GameFunnelProvider } from './_contexts/GameFunnelContext';
import { PairGamePlayingProvider } from './_contexts/PairGamePlayingContext';
import { usePairGamePage } from './_hooks/usePairGamePage';

const IntroStep = dynamic(
  () =>
    import('./_components/steps/IntroStep').then((mod) => ({
      default: mod.IntroStep,
    })),
  {
    ssr: false,
    loading: () => <GameSkeleton />,
  },
);

function GamePageContent() {
  const {
    Funnel,
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
  } = usePairGamePage();

  return (
    <>
      <Funnel>
        <Funnel.Step name="intro">
          <IntroStep onGameStart={handleGameStart} />
        </Funnel.Step>
        <Funnel.Step name="playing">
          <PairGamePlayingProvider
            key={gameKey}
            currentRound={currentRound}
            onRoundComplete={handleRoundComplete}
            roundResultModalRef={roundResultModalRef}
          >
            <PlayingStep />
          </PairGamePlayingProvider>
        </Funnel.Step>
        <Funnel.Step name="submit">
          <SubmitStep onSubmit={handleSubmit} />
        </Funnel.Step>
        <Funnel.Step name="completed">
          <CompletedStep totalParticipants={totalParticipants} />
        </Funnel.Step>
      </Funnel>

      <RoundResultModal
        isOpen={isHeartModalOpen}
        onClose={closeHeartModal}
        result={{ stage: heartModalStage, success: heartModalSuccess }}
        onAction={handleRoundResultAction}
      />
    </>
  );
}

export default function GamePage() {
  return (
    <GameFunnelProvider>
      <GamePageContent />
    </GameFunnelProvider>
  );
}
