'use client';

import { useCallback, useRef, useState } from 'react';

import {
  createCards,
  processCardMatch,
  areAllCardsMatched,
  type Card,
} from '../_utils/cardUtils';

export const useCardState = (totalCards: number) => {
  const [cards, setCards] = useState<Card[]>(() => createCards(totalCards));
  const cardsRef = useRef(cards);

  const flipCard = useCallback((cardId: number): boolean => {
    const card = cardsRef.current.find((c) => c.id === cardId);
    if (!card || card.isFlipped || card.isMatched) return false;

    const updated = cardsRef.current.map((c) =>
      c.id === cardId ? { ...c, isFlipped: true } : c,
    );
    cardsRef.current = updated;
    setCards(updated);
    return true;
  }, []);

  const flipAllDown = useCallback(() => {
    const updated = cardsRef.current.map((card) =>
      card.isMatched ? card : { ...card, isFlipped: false },
    );
    cardsRef.current = updated;
    setCards(updated);
  }, []);

  const checkMatch = useCallback((firstId: number, secondId: number) => {
    const { updatedCards, isMatch } = processCardMatch(
      cardsRef.current,
      firstId,
      secondId,
    );
    const isAllMatched = isMatch && areAllCardsMatched(updatedCards);

    cardsRef.current = updatedCards;
    setCards(updatedCards);

    return isAllMatched;
  }, []);

  return {
    cards,
    flipCard,
    flipAllDown,
    checkMatch,
  };
};
