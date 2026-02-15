'use client';

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
  type ReactNode,
} from 'react';

import { flushSync } from 'react-dom';

import {
  createCards,
  processCardMatch,
  areAllCardsMatched,
  type Card as CardType,
} from '../_utils/cardUtils';
import { ROUND_CONFIGS, type RoundConfig } from '../_utils/gameConstants';
import { useGameTimer } from '../hooks/useGameTimer';

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

type PairGamePlayingProviderProps = {
  currentRound: number;
  onRoundComplete: (roundIndex: number, success: boolean) => void;
  children: ReactNode;
};

export function PairGamePlayingProvider({
  currentRound,
  onRoundComplete,
  children,
}: PairGamePlayingProviderProps) {
  const [cards, setCards] = useState<CardType[]>([]);
  const [selectedCards, setSelectedCards] = useState<number[]>([]);

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
    setSelectedCards([]);
    resetTimer();
  }, [currentRound, roundIndex, config.totalCards, resetTimer]);

  const resolveResultRef = useRef<{
    isMatch: boolean;
    updatedCards: CardType[];
  } | null>(null);

  const resolveTwoCards = useCallback(
    (firstId: number, secondId: number) => {
      flushSync(() => {
        setCards((prev) => {
          const result = processCardMatch(prev, firstId, secondId);
          resolveResultRef.current = result;
          return result.updatedCards;
        });
      });
      setSelectedCards([]);

      const r = resolveResultRef.current;
      if (r?.isMatch && areAllCardsMatched(r.updatedCards)) {
        setIsGameActive(false);
        setTimeout(
          () => onRoundComplete(currentRound, true),
          ROUND_COMPLETE_DELAY_MS,
        );
      }
      resolveResultRef.current = null;
    },
    [currentRound, onRoundComplete, setIsGameActive],
  );

  const handleCardClick = useCallback(
    (cardId: number) => {
      if (!isGameActive || selectedCards.length >= 2) return;

      const card = cards.find((c) => c.id === cardId);
      if (
        !card ||
        card.isFlipped ||
        card.isMatched ||
        selectedCards.includes(cardId)
      ) {
        return;
      }

      const newSelected = [...selectedCards, cardId];
      setSelectedCards(newSelected);
      setCards((prev) =>
        prev.map((c) =>
          c.id === cardId && !c.isMatched ? { ...c, isFlipped: true } : c,
        ),
      );

      if (newSelected.length === 2) {
        setTimeout(
          () => resolveTwoCards(newSelected[0], newSelected[1]),
          MATCH_RESOLVE_DELAY_MS,
        );
      }
    },
    [isGameActive, selectedCards, cards, resolveTwoCards],
  );

  const value: PairGamePlayingContextValue = {
    cards,
    config,
    isPreviewMode,
    isGameActive,
    previewTimer,
    gameTimer,
    handleCardClick,
  };

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
