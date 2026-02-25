'use client';

import { useEffect, useMemo, useRef } from 'react';

import { Caption1, Flex, ProgressBar } from 'ddingdong-design-system';

import { usePairGamePlaying } from '../../_contexts/PairGamePlayingContext';
import { getCardSizeStyleForConfig } from '../../_utils/gameConstants';
import { BellAnimation } from '../ui/BellAnimation';
import { BridgeMaruMari } from '../ui/BridgeMaruMari';
import { EventCard } from '../ui/EventCard';

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
  const containerRef = useRef<HTMLDivElement>(null);

  const { displaySeconds, progressPercent } = useMemo(() => {
    const totalSeconds = config.gameTime;
    const remainingSeconds = Math.max(0, isGameActive ? gameTimer : 0);
    const percent =
      totalSeconds > 0 ? (remainingSeconds / totalSeconds) * 100 : 0;
    return {
      displaySeconds: Math.floor(remainingSeconds),
      progressPercent: percent,
    };
  }, [isGameActive, gameTimer, config.gameTime]);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
    document.documentElement.scrollTop = 0;
    document.body.scrollTop = 0;
    if (containerRef.current) containerRef.current.scrollTop = 0;
  };

  useEffect(() => {
    scrollToTop();
    const raf = requestAnimationFrame(() => scrollToTop());
    const t = setTimeout(scrollToTop, 0);
    return () => {
      cancelAnimationFrame(raf);
      clearTimeout(t);
    };
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY !== 0 || document.documentElement.scrollTop !== 0)
        scrollToTop();
    };
    window.addEventListener('scroll', handleScroll, { passive: false });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const body = document.body;
    const html = document.documentElement;
    const scrollY = window.scrollY;

    body.style.overflow = 'hidden';
    body.style.position = 'fixed';
    body.style.top = `-${scrollY}px`;
    body.style.left = '0';
    body.style.right = '0';
    html.style.overflow = 'hidden';

    return () => {
      body.style.overflow = '';
      body.style.position = '';
      body.style.top = '';
      body.style.left = '';
      body.style.right = '';
      html.style.overflow = '';
      window.scrollTo(0, scrollY);
    };
  }, []);

  useEffect(() => {
    let touchStartY = 0;

    const handleTouchStart = (e: TouchEvent) => {
      touchStartY = e.touches[0]?.clientY ?? 0;
    };

    const handleTouchMove = (e: TouchEvent) => {
      const touch = e.touches[0];
      if (!touch) return;
      const deltaY = Math.abs(touch.clientY - touchStartY);
      if (deltaY > 10) e.preventDefault();
    };

    const handleWheel = (e: WheelEvent) => {
      if (Math.abs(e.deltaY) > Math.abs(e.deltaX)) e.preventDefault();
    };

    document.addEventListener('touchstart', handleTouchStart, {
      passive: true,
    });
    document.addEventListener('touchmove', handleTouchMove, { passive: false });
    document.addEventListener('wheel', handleWheel, { passive: false });

    return () => {
      document.removeEventListener('touchstart', handleTouchStart);
      document.removeEventListener('touchmove', handleTouchMove);
      document.removeEventListener('wheel', handleWheel);
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className="relative flex flex-col overflow-hidden px-4"
      style={{
        height: 'calc(132dvh - 20rem)',
        touchAction: 'manipulation',
        overflow: 'hidden',
      }}
      data-playing-step
    >
      <div className="col flex min-h-0 flex-1 items-center justify-center pt-8 md:pt-12">
        <Flex dir="col" alignItems="center" gap={2}>
          {isPreviewMode ? (
            <span className="text-game-primary my-1 inline-flex w-[75px] items-center gap-1.5 rounded-full px-3 py-2 shadow-md">
              <span className="flex h-6 w-6 shrink-0 items-center justify-center">
                <BellAnimation className="h-6 w-6" />
              </span>
              <Caption1
                as="span"
                className="font-school-safety text-game-primary flex items-center text-[14px] leading-none md:text-[16px]"
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
              <div
                className={
                  progressPercent > 0 ? '[&>div>div]:!duration-75' : ''
                }
              >
                <ProgressBar color="pink" percent={progressPercent} />
              </div>
              <Caption1 className="font-school-safety text-game-primary tabular-nums">
                {`00:${String(displaySeconds).padStart(2, '0')}`}
              </Caption1>
            </Flex>
          )}
        </Flex>
      </div>

      <div className="relative flex w-full shrink-0 items-center justify-center pt-6 md:pt-10">
        <div
          className="grid w-fit gap-2"
          style={{
            gridTemplateColumns: `repeat(${config.cols}, 1fr)`,
            gridTemplateRows: `repeat(${config.rows}, 1fr)`,
            justifyItems: 'center',
            alignItems: 'center',
            touchAction: 'manipulation',
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
