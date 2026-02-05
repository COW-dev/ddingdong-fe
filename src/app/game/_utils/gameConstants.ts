export type RoundConfig = {
  rows: number;
  cols: number;
  totalCards: number;
  previewTime: number;
  gameTime: number;
};

export type CardSize = { width: number; height: number };

export type CardSizeStyle = { width: string; height: string };

export function getCardSizeStyleForConfig(config: {
  cols: number;
  rows: number;
}): CardSizeStyle {
  const { cols } = config;
  const base = getCardSizeForConfig(config);
  const vwW = Math.min(24, 85 / cols);
  const vwH = (base.height / base.width) * vwW;
  return {
    width: `min(${base.width}px, ${vwW}vw)`,
    height: `min(${base.height}px, ${vwH}vw)`,
  };
}

export function getCardSizeForConfig(config: {
  cols: number;
  rows: number;
}): CardSize {
  const { cols, rows } = config;
  if (cols === 2 && rows === 3) return { width: 92, height: 121 };
  if (cols === 4 && rows === 2) return { width: 80, height: 105 };
  if (cols === 4 && rows === 3) return { width: 80, height: 105 };
  if (cols === 4 && rows === 4) return { width: 66, height: 87 };
  if (cols === 4 && rows === 5) return { width: 66, height: 87 };
  return { width: 80, height: 105 };
}

export const ROUND_CONFIGS: RoundConfig[] = [
  { rows: 3, cols: 2, totalCards: 6, previewTime: 4, gameTime: 20 },
  { rows: 4, cols: 2, totalCards: 8, previewTime: 4, gameTime: 20 },
  { rows: 4, cols: 3, totalCards: 12, previewTime: 4, gameTime: 20 },
  { rows: 4, cols: 4, totalCards: 16, previewTime: 4, gameTime: 20 },
  { rows: 5, cols: 4, totalCards: 20, previewTime: 4, gameTime: 20 },
];

export type CardFrontPalette = {
  backgroundColor: string;
  borderColor: string;
};
// todo : api연동시 동아리 카테고리별로 색상 재 지정
export const CARD_FRONT_PALETTES: CardFrontPalette[] = [
  { backgroundColor: '#CCEFFF', borderColor: '#A0D0F0' },
  { backgroundColor: '#FFF0CC', borderColor: '#F0D8A0' },
  { backgroundColor: '#EBE0FF', borderColor: '#D0C0F0' },
  { backgroundColor: '#E0EBFF', borderColor: '#C0D0F0' },
  { backgroundColor: '#CCFFEB', borderColor: '#A0F0D0' },
  { backgroundColor: '#E0EBE0', borderColor: '#C0D0C0' },
  { backgroundColor: '#CCFFFF', borderColor: '#A0F0F0' },
  { backgroundColor: '#FFE0E0', borderColor: '#F0C0C0' },
  { backgroundColor: '#E0E0FF', borderColor: '#C0C0F0' },
  { backgroundColor: '#FFF5CC', borderColor: '#F0E0A0' },
  { backgroundColor: '#FFFFCC', borderColor: '#F0F0A0' },
  { backgroundColor: '#CCFFCC', borderColor: '#A0F0A0' },
  { backgroundColor: '#E0EBEB', borderColor: '#C0D0D0' },
  { backgroundColor: '#FFE7ED', borderColor: '#F0C8D0' },
  { backgroundColor: '#FFE0D8', borderColor: '#F0C0B8' },
  { backgroundColor: '#F0E6FF', borderColor: '#E0D0F0' },
  { backgroundColor: '#E8F0E8', borderColor: '#D0E0D0' },
  { backgroundColor: '#FFEDE0', borderColor: '#F0DDC8' },
];
