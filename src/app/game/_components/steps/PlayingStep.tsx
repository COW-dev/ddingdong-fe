'use client';

import { Flex } from 'ddingdong-design-system';

import { getCardSizeStyleForConfig } from '../../_utils/gameConstants';
import { useCardGame } from '../../hooks/useCardGame';
import { BellAnimation, BridgeMaruMari, Card, Body2, Caption3 } from '../ui';

type Props = {
  currentRound: number;
  onRoundComplete: (roundIndex: number, success: boolean) => void;
};

export function PlayingStep({ currentRound, onRoundComplete }: Props) {
  const {
    cards,
    config,
    isPreviewMode,
    isGameActive,
    previewTimer,
    gameTimer,
    handleCardClick,
  } = useCardGame({ currentRound, onRoundComplete });

  const cardSize = getCardSizeStyleForConfig(config);

  return (
    <div
      className="relative flex flex-col overflow-hidden px-4"
      style={{ height: 'calc(115dvh - 15rem)' }}
    >
      <div className="col flex min-h-0 flex-1 items-center justify-center py-2">
        <Flex dir="col" alignItems="center" gap={2}>
          {isPreviewMode ? (
            <span className="text-game-prtmary my-1 inline-flex items-center gap-1.5 rounded-full px-3 py-1 shadow-md">
              <BellAnimation className="h-6 w-6" />
              <Caption3
                as="span"
                className="text-game-primary text-[14px] md:text-[16px]"
              >
                {previewTimer}초
              </Caption3>
            </span>
          ) : (
            <Body2 className="py-2">남은 시간: {gameTimer}초</Body2>
          )}
        </Flex>
      </div>

      <div className="relative flex w-full shrink-0 items-center justify-center">
        <div
          className="grid w-fit gap-2"
          style={{
            gridTemplateColumns: `repeat(${config.cols}, 1fr)`,
            gridTemplateRows: `repeat(${config.rows}, 1fr)`,
            justifyItems: 'center',
            alignItems: 'center',
          }}
        >
          {cards.map((card) => (
            <Card
              key={card.id}
              pairIndex={card.pairIndex}
              isFlipped={card.isFlipped}
              isMatched={card.isMatched}
              isDisabled={!isGameActive || card.isMatched}
              onClick={() => handleCardClick(card.id)}
              width={cardSize.width}
              height={cardSize.height}
            />
          ))}
        </div>
      </div>
      <div className="min-h-px min-w-0 flex-1" />
      <BridgeMaruMari className="pointer-events-none fixed bottom-0 left-1/2 z-0 w-screen max-w-[100vw] -translate-x-1/2" />
    </div>
  );
}
