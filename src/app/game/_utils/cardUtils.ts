import { getClubById, pickRandomClubIds } from './clubs';

export type Card = {
  id: number;
  clubId: number;
  category: string;
  clubName: string;
  isFlipped: boolean;
  isMatched: boolean;
};

export function createCards(totalCards: number, seed?: number): Card[] {
  const pairs = totalCards / 2;
  const clubIds = pickRandomClubIds(pairs, seed);

  const cards: Card[] = [];
  let cardId = 0;
  for (const clubId of clubIds) {
    const club = getClubById(clubId);
    if (!club) continue;
    cards.push(
      {
        id: cardId++,
        clubId: club.id,
        category: club.category,
        clubName: club.name,
        isFlipped: true,
        isMatched: false,
      },
      {
        id: cardId++,
        clubId: club.id,
        category: club.category,
        clubName: club.name,
        isFlipped: true,
        isMatched: false,
      },
    );
  }

  const shuffleRandom =
    seed !== undefined
      ? (() => {
          let s = seed + 1;
          return () => {
            let t = (s += 0x6d2b79f5);
            t = Math.imul(t ^ (t >>> 15), t | 1);
            t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
            return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
          };
        })()
      : Math.random;

  for (let i = cards.length - 1; i > 0; i--) {
    const j = Math.floor(shuffleRandom() * (i + 1));
    [cards[i], cards[j]] = [cards[j], cards[i]];
  }

  return cards;
}

export function isCardMatch(firstCard: Card, secondCard: Card): boolean {
  return firstCard.clubId === secondCard.clubId;
}

export function areAllCardsMatched(cards: Card[]): boolean {
  return cards.every((card) => card.isMatched);
}

export function processCardMatch(
  cards: Card[],
  firstId: number,
  secondId: number,
): { updatedCards: Card[]; isMatch: boolean } {
  const firstCard = cards.find((c) => c.id === firstId);
  const secondCard = cards.find((c) => c.id === secondId);

  if (!firstCard || !secondCard) {
    return { updatedCards: cards, isMatch: false };
  }

  const selectedIds = [firstId, secondId];
  const isSelectedCard = (card: Card) => selectedIds.includes(card.id);

  if (isCardMatch(firstCard, secondCard)) {
    const updatedCards = cards.map((c) =>
      isSelectedCard(c) ? { ...c, isMatched: true, isFlipped: true } : c,
    );
    return { updatedCards, isMatch: true };
  }

  const updatedCards = cards.map((c) =>
    isSelectedCard(c) && !c.isMatched ? { ...c, isFlipped: false } : c,
  );
  return { updatedCards, isMatch: false };
}
