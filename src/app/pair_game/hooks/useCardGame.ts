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
  cardsRef.current = cards;

  const config = ROUND_CONFIGS[currentRound];

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
    setCards(createCards(config.totalCards, currentRound));
    setSelectedCards([]);
    resetTimer();
  }, [currentRound, config.totalCards]);

  const resolveTwoCards = useCallback(
    (firstId: number, secondId: number) => {
      setCards((prev) => {
        const { updatedCards, isMatch } = processCardMatch(
          prev,
          firstId,
          secondId,
        );
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
        return updatedCards;
      });
      setSelectedCards([]);
    },
    [currentRound, onRoundComplete, setIsGameActive],
  );

  const handleCardClick = useCallback(
    (cardId: number) => {
      if (!isGameActive || selectedCards.length >= 2) return;

      const currentCards = cardsRef.current;
      const card = currentCards.find((c) => c.id === cardId);
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
    [isGameActive, selectedCards, resolveTwoCards],
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
