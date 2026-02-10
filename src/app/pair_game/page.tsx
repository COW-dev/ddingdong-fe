'use client';

import { useSearchParams } from 'next/navigation';

import { useCallback, useEffect, useState } from 'react';

import { CompletedStep } from './_components/steps/CompletedStep';
import { IntroStep } from './_components/steps/IntroStep';
import { PlayingStep } from './_components/steps/PlayingStep';
import { SubmitStep } from './_components/steps/SubmitStep';
import {
  RoundResultModal,
  type RoundResultModalAction,
} from './_components/ui/RoundResultModal';
import {
  GameFunnelProvider,
  useGameFunnel,
} from './_contexts/GameFunnelContext';

const ALL_ROUNDS_CLEARED_KEY = 'pairGameAllRoundsCleared';

function GamePageContent() {
  const searchParams = useSearchParams();
  const { Funnel, step, setStep } = useGameFunnel();

  useEffect(() => {
    const stepFromUrl = searchParams.get('step');
    if (stepFromUrl === 'submit' && step !== 'submit') {
      const cleared = window.localStorage.getItem(ALL_ROUNDS_CLEARED_KEY);
      if (cleared === 'true') {
        setStep('submit');
      } else {
        window.history.replaceState(null, '', '/game');
        setStep('intro');
      }
    }
  }, [searchParams, step, setStep]);

  const [currentRound, setCurrentRound] = useState(0);
  const [gameKey, setGameKey] = useState(0);
  const [heartModalStage, setHeartModalStage] = useState(1);
  const [heartModalSuccess, setHeartModalSuccess] = useState(false);
  const [isHeartModalOpen, setIsHeartModalOpen] = useState(false);
  const [totalParticipants, setTotalParticipants] = useState(0);

  const handleGameStart = () => {
    setCurrentRound(0);
    setGameKey((k) => k + 1);
    setStep('playing');
  };

  const handleRoundComplete = useCallback(
    (roundIndex: number, success: boolean) => {
      setHeartModalStage(roundIndex + 1);
      setHeartModalSuccess(success);
      setIsHeartModalOpen(true);
    },
    [],
  );

  const handleRoundResultAction = (action: RoundResultModalAction) => {
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
        window.localStorage.setItem(ALL_ROUNDS_CLEARED_KEY, 'true');
        setStep('submit');
        window.history.replaceState(null, '', '/game?step=submit');
        break;
    }
    setIsHeartModalOpen(false);
  };

  const handleSubmit = async (data: {
    name: string;
    studentNumber: string;
    department: string;
    phoneNumber: string;
    membershipFeeReceiptFileIds: string[];
  }) => {
    // TODO: API 호출하여 응모 제출
    console.log('응모 제출:', data);
    setTotalParticipants((prev) => prev + 1);
    setStep('completed');
    window.history.replaceState(null, '', '/pair_game');
  };

  return (
    <>
      <Funnel>
        <Funnel.Step name="intro">
          <IntroStep onGameStart={handleGameStart} />
        </Funnel.Step>
        <Funnel.Step name="playing">
          <PlayingStep
            key={gameKey}
            currentRound={currentRound}
            onRoundComplete={handleRoundComplete}
          />
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
