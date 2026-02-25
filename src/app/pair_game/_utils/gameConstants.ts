export type RoundConfig = {
  rows: number;
  cols: number;
  totalCards: number;
  previewTime: number;
  gameTime: number;
};

export type CardSize = { width: number; height: number };

export type CardSizeStyle = { width: string; height: string };

export const getCardSizeStyleForConfig = (config: {
  cols: number;
  rows: number;
}): CardSizeStyle => {
  const { cols } = config;
  const base = getCardSizeForConfig(config);
  const vwW = Math.min(24, 85 / cols);
  const vwH = (base.height / base.width) * vwW;
  return {
    width: `min(${base.width}px, ${vwW}vw)`,
    height: `min(${base.height}px, ${vwH}vw)`,
  };
};

export const getCardSizeForConfig = (config: {
  cols: number;
  rows: number;
}): CardSize => {
  const { cols, rows } = config;
  if (cols === 2 && rows === 3) return { width: 92, height: 121 };
  if (cols === 2 && rows === 4) return { width: 80, height: 105 };
  if (cols === 4 && rows === 2) return { width: 80, height: 105 };
  if (cols === 4 && rows === 3) return { width: 80, height: 105 };
  if (cols === 4 && rows === 4) return { width: 66, height: 87 };
  if (cols === 4 && rows === 5) return { width: 66, height: 87 };
  return { width: 80, height: 105 };
};

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

export type CategoryCardStyle = {
  borderColor: string;
  backgroundGradient: string;
};

const CATEGORY_CARD_STYLES: Record<string, CategoryCardStyle> = {
  봉사: {
    borderColor: '#FFDADA',
    backgroundGradient: 'linear-gradient(180deg, #FEF2F2 0%, #FFFBFB 100%)',
  },
  사회연구: {
    borderColor: '#FFE6C7',
    backgroundGradient: 'linear-gradient(180deg, #FFF7ED 0%, #FFFCF9 100%)',
  },
  연행예술: {
    borderColor: '#FFFACC',
    backgroundGradient: 'linear-gradient(180deg, #FEFCE8 0%, #FFFEF4 100%)',
  },
  전시창작: {
    borderColor: '#E7FFB1',
    backgroundGradient: 'linear-gradient(180deg, #F7FEE7 0%, #FCFFF6 100%)',
  },
  종교: {
    borderColor: '#C5E8FF',
    backgroundGradient: 'linear-gradient(180deg, #F0F9FF 0%, #F7FCFF 100%)',
  },
  체육: {
    borderColor: '#D4CBFF',
    backgroundGradient: 'linear-gradient(180deg, #F5F3FF 0%, #F9F8FF 100%)',
  },
  학술: {
    borderColor: '#F6D0FF',
    backgroundGradient: 'linear-gradient(180deg, #FDF4FF 0%, #FFFEFF 100%)',
  },
  준동아리: {
    borderColor: '#D1D1D1',
    backgroundGradient: 'linear-gradient(180deg, #E2E5EB 0%, #FAFAFA 100%)',
  },
};

const DEFAULT_CATEGORY_STYLE: CategoryCardStyle = {
  borderColor: '#D1D1D1',
  backgroundGradient: 'linear-gradient(180deg, #E2E5EB 0%, #FAFAFA 100%)',
};

export const getCategoryCardStyle = (category: string): CategoryCardStyle =>
  CATEGORY_CARD_STYLES[category] ?? DEFAULT_CATEGORY_STYLE;

export const FLOATING_HEARTS = [
  { left: '6%', top: '10%', size: '40px', delay: '0s', duration: '7s' },
  { left: '18%', top: '55%', size: '40px', delay: '1.2s', duration: '6.2s' },
  { left: '32%', top: '30%', size: '40px', delay: '0.6s', duration: '7.8s' },
  { left: '48%', top: '70%', size: '40px', delay: '2s', duration: '6.4s' },
  { left: '62%', top: '18%', size: '40px', delay: '1.6s', duration: '7.2s' },
  { left: '74%', top: '48%', size: '40px', delay: '0.8s', duration: '6.6s' },
  { left: '86%', top: '65%', size: '40px', delay: '2.4s', duration: '7.4s' },
  { left: '40%', top: '85%', size: '40px', delay: '1.8s', duration: '6.8s' },
] as const;
