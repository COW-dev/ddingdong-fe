import {
  CARD_SIZES,
  CATEGORY_STYLES,
  DEFAULT_CATEGORY_STYLE,
} from '../_constants/categoryStyles';

export function getCardSizeStyleForConfig(config: { cols: number; rows: number }) {
  const key = `${config.cols}x${config.rows}`;
  const base = CARD_SIZES[key] ?? { width: 80, height: 105 };
  const vwW = Math.min(24, 85 / config.cols);
  const vwH = (base.height / base.width) * vwW;
  return {
    width: `min(${base.width}px, ${vwW}vw)`,
    height: `min(${base.height}px, ${vwH}vw)`,
  };
}

export const getCategoryCardStyle = (category: string) =>
  CATEGORY_STYLES[category] ?? DEFAULT_CATEGORY_STYLE;
