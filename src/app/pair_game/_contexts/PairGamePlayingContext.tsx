'use client';

import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
  type ReactNode,
} from 'react';

import {
  createCards,
  processCardMatch,
  areAllCardsMatched,
  type Card as CardType,
} from '../_utils/cardUtils';
import { ROUND_CONFIGS, type RoundConfig } from '../_utils/gameConstants';
import { useGameTimer } from '../_hooks/useGameTimer';

const MATCH_RESOLVE_DELAY_MS = 500;
const ROUND_COMPLETE_DELAY_MS = 500;

type PairGamePlayingContextValue = {
  cards: CardType[];
  config: RoundConfig;
  isPreviewMode: boolean;
  isGameActive: boolean;
  previewTimer: number;
  gameTimer: number;
  handleCardClick: (cardId: number) => void;
};

const PairGamePlayingContext =
  createContext<PairGamePlayingContextValue | null>(null);

export type RoundResultModalRef = {
  setResult: (stage: number, success: boolean) => void;
  open: () => void;
};

type PairGamePlayingProviderProps = {
  currentRound: number;
  onRoundComplete: (roundIndex: number, success: boolean) => void;
  roundResultModalRef?: React.MutableRefObject<RoundResultModalRef | null>;
  children: ReactNode;
};

export function PairGamePlayingProvider({
  currentRound,
  onRoundComplete,
  roundResultModalRef,
  children,
}: PairGamePlayingProviderProps) {
  const [cards, setCards] = useState<CardType[]>([]);
  const selectedCardsRef = useRef<number[]>([]);

  const roundIndex = Math.max(
    0,
    Math.min(currentRound, ROUND_CONFIGS.length - 1),
  );
  const config = ROUND_CONFIGS[roundIndex];

  const handlePreviewEnd = useCallback(() => {
    setCards((prev) =>
      prev.map((card) =>
        card.isMatched ? card : { ...card, isFlipped: false },
      ),
    );
  }, []);

  const handleGameEnd = useCallback(() => {
    onRoundComplete(currentRound, false);
  }, [currentRound, onRoundComplete]);

  const {
    previewTimer,
    gameTimer,
    isPreviewMode,
    isGameActive,
    setIsGameActive,
    reset: resetTimer,
  } = useGameTimer({
    previewTime: config.previewTime,
    gameTime: config.gameTime,
    handlePreviewEnd,
    handleGameEnd,
  });

  useEffect(() => {
    setCards(createCards(config.totalCards));
    selectedCardsRef.current = [];
    resetTimer();
  }, [currentRound, config.totalCards, resetTimer]);

  const resolveTwoCards = useCallback(
    (firstId: number, secondId: number) => {
      setCards((prev) => {
        const result = processCardMatch(prev, firstId, secondId);

        if (result.isMatch && areAllCardsMatched(result.updatedCards)) {
          setIsGameActive(false);
          const round = currentRound;
          setTimeout(() => {
            onRoundComplete(round, true);
            roundResultModalRef?.current?.setResult(round + 1, true);
            roundResultModalRef?.current?.open();
          }, ROUND_COMPLETE_DELAY_MS);
        }

        return result.updatedCards;
      });
      selectedCardsRef.current = [];
    },
    [currentRound, onRoundComplete, setIsGameActive, roundResultModalRef],
  );

  const handleCardClick = useCallback(
    (cardId: number) => {
      if (!isGameActive) return;

      const prevSelected = selectedCardsRef.current;
      if (prevSelected.length >= 2 || prevSelected.includes(cardId)) return;

      const next = [...prevSelected, cardId];
      selectedCardsRef.current = next;

      setCards((prev) => {
        const card = prev.find((c) => c.id === cardId);

        if (!card || card.isFlipped || card.isMatched) {
          return prev;
        }

        return prev.map((c) =>
          c.id === cardId ? { ...c, isFlipped: true } : c,
        );
      });

      if (next.length === 2) {
        setTimeout(
          () => resolveTwoCards(next[0], next[1]),
          MATCH_RESOLVE_DELAY_MS,
        );
      }
    },
    [isGameActive, resolveTwoCards],
  );

  const value = useMemo<PairGamePlayingContextValue>(
    () => ({
      cards,
      config,
      isPreviewMode,
      isGameActive,
      previewTimer,
      gameTimer,
      handleCardClick,
    }),
    [
      cards,
      config,
      isPreviewMode,
      isGameActive,
      previewTimer,
      gameTimer,
      handleCardClick,
    ],
  );

  return (
    <PairGamePlayingContext.Provider value={value}>
      {children}
    </PairGamePlayingContext.Provider>
  );
}

export function usePairGamePlaying() {
  const context = useContext(PairGamePlayingContext);
  if (!context) {
    throw new Error(
      'usePairGamePlaying must be used within PairGamePlayingProvider',
    );
  }
  return context;
}
