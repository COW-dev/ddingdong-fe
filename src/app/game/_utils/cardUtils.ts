export type Card = {
  id: number;
  pairIndex: number;
  isFlipped: boolean;
  isMatched: boolean;
};

const DEFAULT_MAX_PALETTES = 18;

export function createCards(
  totalCards: number,
  maxPalettes = DEFAULT_MAX_PALETTES,
): Card[] {
  const pairs = totalCards / 2;
  const paletteCount = Math.min(pairs, maxPalettes);

  const cards: Card[] = [];
  for (let i = 0; i < paletteCount; i++) {
    cards.push(
      { id: i * 2, pairIndex: i, isFlipped: true, isMatched: false },
      { id: i * 2 + 1, pairIndex: i, isFlipped: true, isMatched: false },
    );
  }

  for (let i = cards.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [cards[i], cards[j]] = [cards[j], cards[i]];
  }

  return cards;
}

export function isCardMatch(firstCard: Card, secondCard: Card): boolean {
  return firstCard.pairIndex === secondCard.pairIndex;
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
