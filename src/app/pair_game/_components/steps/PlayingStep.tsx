'use client';

import { Flex, ProgressBar } from 'ddingdong-design-system';

import { usePairGamePlaying } from '../../_contexts/PairGamePlayingContext';
import { getCardSizeStyleForConfig } from '../../_utils/gameConstants';
import { BellAnimation } from '../ui/BellAnimation';
import { BridgeMaruMari } from '../ui/BridgeMaruMari';
import { EventCard } from '../ui/EventCard';
import { Caption3, Caption1 } from '../ui/EventTypography';

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
      style={{ height: 'calc(115dvh - 13rem)' }}
    >
      <div className="col flex min-h-0 flex-1 items-center justify-center pb-6">
        <Flex dir="col" alignItems="center" gap={2}>
          {isPreviewMode ? (
            <span className="text-game-primary my-1 inline-flex items-center gap-1.5 rounded-full w-[75px] px-3 py-2 shadow-md">
              <span className="flex h-6 w-6 shrink-0 items-center justify-center">
                <BellAnimation className="h-6 w-6" />
              </span>
              <Caption3
                as="span"
                className="text-game-primary flex items-center leading-none text-[14px] md:text-[16px]"
              >
                {previewTimer}초
              </Caption3>
            </span>
          ) : (
            <Flex
              alignItems="center"
              gap={2}
              className="rounded-full bg-white p-2 shadow-md"
            >
              <ProgressBar
                color="pink"
                percent={(gameTimer / config.gameTime) * 100}
                className="flex-1 transition-[width] duration-100 ease-linear"
              />
              <Caption1
                className="text-game-primary tabular-nums"
                style={{ minWidth: '4ch' }}
              >
                {`00:${String(Math.floor(gameTimer)).padStart(2, '0')}`}
              </Caption1>
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
