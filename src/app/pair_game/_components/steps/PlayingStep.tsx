'use client';

import { Flex, ProgressBar } from 'ddingdong-design-system';

import { usePairGamePlaying } from '../../_contexts/PairGamePlayingContext';
import { getCardSizeStyleForConfig } from '../../_utils/gameConstants';
import { BellAnimation } from '../ui/BellAnimation';
import { BridgeMaruMari } from '../ui/BridgeMaruMari';
import { EventCard } from '../ui/EventCard';
import { EventCaption3, EventCaption1 } from '../ui/EventTypography';

export function PlayingStep() {
  const {
    cards,
    config,
    isPreviewMode,
    isGameActive,
    previewTimer,
    gameTimer,
    handleCardClick,
  } = usePairGamePlaying();

  const cardSize = getCardSizeStyleForConfig(config);

  return (
    <div
      className="relative flex flex-col overflow-hidden px-4"
      style={{ height: 'calc(145dvh - 27rem)' }}
    >
      <div className="col flex min-h-0 flex-1 items-center justify-center pb-6">
        <Flex dir="col" alignItems="center" gap={2}>
          {isPreviewMode ? (
            <span className="text-game-primary my-1 inline-flex w-[75px] items-center gap-1.5 rounded-full px-3 py-2 shadow-md">
              <span className="flex h-6 w-6 shrink-0 items-center justify-center">
                <BellAnimation className="h-6 w-6" />
              </span>
              <EventCaption3
                as="span"
                className="text-game-primary flex items-center text-[14px] leading-none md:text-[16px]"
              >
                {Math.ceil(previewTimer) || 0}초
              </EventCaption3>
            </span>
          ) : (
            <Flex
              alignItems="center"
              gap={2}
              className="w-[340px] rounded-full bg-white p-2 px-3 shadow-md"
            >
              <ProgressBar
                color="pink"
                percent={
                  isGameActive && gameTimer > 0
                    ? Math.max(0, (gameTimer / config.gameTime) * 100)
                    : 0
                }
              />
              <EventCaption1 className="text-game-primary tabular-nums">
                {`00:${String(Math.floor(Math.max(0, isGameActive ? gameTimer : 0))).padStart(2, '0')}`}
              </EventCaption1>
            </Flex>
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
            <EventCard
              key={card.id}
              clubId={card.clubId}
              category={card.category}
              clubName={card.clubName}
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
