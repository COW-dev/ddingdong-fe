import { CLUBS } from '../_constants/clubs';

export type Card = {
  id: number;
  clubId: number;
  category: string;
  clubName: string;
  isFlipped: boolean;
  isMatched: boolean;
};

const shuffle = <T>(arr: T[]): T[] => {
  const result = [...arr];
  for (let i = result.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [result[i], result[j]] = [result[j], result[i]];
  }
  return result;
};

export const createCards = (totalCards: number): Card[] => {
  const pairCount = totalCards / 2;
  const selectedClubs = shuffle(CLUBS).slice(0, pairCount);

  const cards = selectedClubs.flatMap((club, idx) => [
    {
      id: idx * 2,
      clubId: club.id,
      category: club.category,
      clubName: club.name,
      isFlipped: true,
      isMatched: false,
    },
    {
      id: idx * 2 + 1,
      clubId: club.id,
      category: club.category,
      clubName: club.name,
      isFlipped: true,
      isMatched: false,
    },
  ]);

  return shuffle(cards);
};

export const areAllCardsMatched = (cards: Card[]): boolean => {
  return cards.every((card) => card.isMatched);
};

export const processCardMatch = (
  cards: Card[],
  firstId: number,
  secondId: number,
): { updatedCards: Card[]; isMatch: boolean } => {
  const first = cards.find((c) => c.id === firstId);
  const second = cards.find((c) => c.id === secondId);

  if (!first || !second) {
    return { updatedCards: cards, isMatch: false };
  }

  const isMatch = first.clubId === second.clubId;
  const selectedIds = new Set([firstId, secondId]);

  const updatedCards = cards.map((card) => {
    if (!selectedIds.has(card.id)) return card;
    return isMatch
      ? { ...card, isMatched: true, isFlipped: true }
      : { ...card, isFlipped: false };
  });

  return { updatedCards, isMatch };
};
