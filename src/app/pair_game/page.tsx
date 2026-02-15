'use client';

import { PairGamePlayingProvider } from './_contexts/PairGamePlayingContext';
import { CompletedStep } from './_components/steps/CompletedStep';
import { IntroStep } from './_components/steps/IntroStep';
import { PlayingStep } from './_components/steps/PlayingStep';
import { SubmitStep } from './_components/steps/SubmitStep';
import { RoundResultModal } from './_components/ui/RoundResultModal';
import { GameFunnelProvider } from './_contexts/GameFunnelContext';
import { usePairGamePage } from './hooks/usePairGamePage';

function GamePageContent() {
  const {
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

      {step === 'playing' && (
        <RoundResultModal
          isOpen={isHeartModalOpen}
          onClose={() => setIsHeartModalOpen(false)}
          result={{ stage: heartModalStage, success: heartModalSuccess }}
          onAction={handleRoundResultAction}
        />
      )}
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
