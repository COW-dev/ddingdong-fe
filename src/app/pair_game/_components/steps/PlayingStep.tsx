'use client';

import { useEffect, useRef } from 'react';

import { Caption1, Flex, ProgressBar } from 'ddingdong-design-system';

import { PAIR_GAME_PATH } from '../../_constants/gameImages';
import { useGameFunnel } from '../../_contexts/GameFunnelContext';
import { usePairGamePlaying } from '../../_contexts/PairGamePlayingContext';
import { RoundResult } from '../../_hooks/useGameProgress';
import { getCardSizeStyleForConfig } from '../../_utils/cardStyles';
import { getTimerDisplay } from '../../_utils/timerDisplay';
import { BellAnimation } from '../ui/BellAnimation';
import { BridgeMaruMari } from '../ui/BridgeMaruMari';
import { EventCard } from '../ui/EventCard';
import {
  RoundResultModal,
  type RoundResultModalAction,
} from '../ui/RoundResultModal';

type Props = {
  roundResult: RoundResult;
  isModalOpen: boolean;
  onCloseModal: () => void;
  onAdvanceToNextStage: () => void;
  onResetGame: () => void;
};

export function PlayingStep({
  roundResult,
  isModalOpen,
  onCloseModal,
  onAdvanceToNextStage,
  onResetGame,
}: Props) {
  const { setStep } = useGameFunnel();
  const {
    cards,
    config,
    isPreviewMode,
    isGameActive,
    previewTimer,
    gameTimer,
    selectCard,
  } = usePairGamePlaying();

  const cardSize = getCardSizeStyleForConfig(config);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    containerRef.current?.scrollIntoView({ block: 'start' });
    window.scrollTo({ top: 0, behavior: 'instant' });
  }, []);

  const { displaySeconds, progressPercent } = getTimerDisplay(
    gameTimer,
    config.gameTime,
  );

  const handleNextStage = () => {
    onCloseModal();
    onAdvanceToNextStage();
  };

  const handleQuit = () => {
    onCloseModal();
    setStep('intro');
  };

  const handleRetry = () => {
    onCloseModal();
    onResetGame();
  };

  const handleSubmit = () => {
    onCloseModal();
    window.sessionStorage.setItem('pairGameCanSubmit', '1');
    setStep('submit');
    window.history.replaceState(null, '', PAIR_GAME_PATH);
  };

  const handleResultAction = (action: RoundResultModalAction) => {
    const actionHandlers: Record<RoundResultModalAction, () => void> = {
      nextStage: handleNextStage,
      quit: handleQuit,
      retry: handleRetry,
      submit: handleSubmit,
    };
    actionHandlers[action]();
  };

  return (
    <>
      <Flex
        dir="col"
        justifyContent="between"
        className="h-svh overflow-hidden px-4 pt-6"
        style={{ touchAction: 'none' }}
      >
        <Flex dir="col" alignItems="center" className="shrink-0 py-4">
          {isPreviewMode ? (
            <span className="text-game-primary inline-flex w-[75px] items-center gap-1.5 rounded-full bg-white px-3 py-2 shadow-md">
              <span className="flex h-6 w-6 shrink-0 items-center justify-center">
                <BellAnimation className="h-6 w-6" />
              </span>
              <Caption1
                as="span"
                className="font-school-safety text-game-primary leading-none"
              >
                {Math.ceil(previewTimer) || 0}초
              </Caption1>
            </span>
          ) : (
            <Flex
              alignItems="center"
              gap={2}
              className="w-full max-w-[335px] rounded-full bg-white p-2 px-3 shadow-md"
            >
              <div className="min-w-0 flex-1 overflow-hidden">
                <ProgressBar
                  color="pink"
                  percent={progressPercent}
                  className="w-full max-w-full [&>div]:!duration-100 [&>div]:!ease-linear"
                />
              </div>
              <Caption1 className="font-school-safety text-game-primary w-[48px] flex-none text-right tabular-nums">
                {`00:${String(displaySeconds).padStart(2, '0')}`}
              </Caption1>
            </Flex>
          )}
        </Flex>

        <Flex
          alignItems="start"
          justifyContent="center"
          className="min-h-0 flex-1 pt-4"
        >
          <div
            className="grid w-fit gap-2"
            style={{
              gridTemplateColumns: `repeat(${config.cols}, 1fr)`,
              touchAction: 'manipulation',
            }}
          >
            {cards.map((card) => (
              <EventCard
                key={card.id}
                {...card}
                isDisabled={!isGameActive || card.isMatched}
                onClick={() => selectCard(card.id)}
                width={cardSize.width}
                height={cardSize.height}
              />
            ))}
          </div>
        </Flex>

        <BridgeMaruMari className="pointer-events-none fixed bottom-0 left-1/2 z-0 w-screen max-w-[100vw] -translate-x-1/2" />
      </Flex>

      <RoundResultModal
        isOpen={isModalOpen}
        onClose={onCloseModal}
        result={roundResult}
        onAction={handleResultAction}
      />
    </>
  );
}
