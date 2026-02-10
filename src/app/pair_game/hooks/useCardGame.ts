'use client';

import { useEffect, useState, useCallback, useRef } from 'react';

import {
  createCards,
  processCardMatch,
  areAllCardsMatched,
  type Card as CardType,
} from '../_utils/cardUtils';
import { ROUND_CONFIGS } from '../_utils/gameConstants';

import { useGameTimer } from './useGameTimer';

type UseCardGameParams = {
  currentRound: number;
  onRoundComplete: (roundIndex: number, success: boolean) => void;
};

const MATCH_RESOLVE_DELAY_MS = 500;
const ROUND_COMPLETE_DELAY_MS = 500;

export function useCardGame({
  currentRound,
  onRoundComplete,
}: UseCardGameParams) {
  const [cards, setCards] = useState<CardType[]>([]);
  const [selectedCards, setSelectedCards] = useState<number[]>([]);
  const cardsRef = useRef(cards);
  const selectedCardsRef = useRef(selectedCards);
  cardsRef.current = cards;
  selectedCardsRef.current = selectedCards;

  const roundIndex = Math.max(
    0,
    Math.min(currentRound, ROUND_CONFIGS.length - 1),
  );
  const config = ROUND_CONFIGS[roundIndex];

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
    onPreviewEnd: () => {
      setCards((prev) =>
        prev.map((card) =>
          card.isMatched ? card : { ...card, isFlipped: false },
        ),
      );
    },
    onGameEnd: () => onRoundComplete(currentRound, false),
  });

  useEffect(() => {
    setCards(createCards(config.totalCards, roundIndex));
    setSelectedCards([]);
    resetTimer();
  }, [currentRound, roundIndex, config.totalCards, resetTimer]);

  const resolveTwoCards = useCallback(
    (firstId: number, secondId: number) => {
      const prev = cardsRef.current;
      const { updatedCards, isMatch } = processCardMatch(
        prev,
        firstId,
        secondId,
      );
      setCards(updatedCards);
      setSelectedCards([]);

      if (isMatch && areAllCardsMatched(updatedCards)) {
        setIsGameActive(false);
        setTimeout(
          () => onRoundComplete(currentRound, true),
          ROUND_COMPLETE_DELAY_MS,
        );
      } else if (!isMatch) {
        setTimeout(() => {
          onRoundComplete(currentRound, false);
          setIsGameActive(false);
        }, 0);
      }
    },
    [currentRound, onRoundComplete, setIsGameActive],
  );

  const handleCardClick = useCallback(
    (cardId: number) => {
      const currentSelected = selectedCardsRef.current;
      if (!isGameActive || currentSelected.length >= 2) return;

      const currentCards = cardsRef.current;
      const card = currentCards.find((c) => c.id === cardId);
      if (
        !card ||
        card.isFlipped ||
        card.isMatched ||
        currentSelected.includes(cardId)
      ) {
        return;
      }

      const newSelected = [...currentSelected, cardId];
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
    [isGameActive, resolveTwoCards],
  );

  return {
    cards,
    config,
    isPreviewMode,
    isGameActive,
    previewTimer,
    gameTimer,
    handleCardClick,
  };
}
