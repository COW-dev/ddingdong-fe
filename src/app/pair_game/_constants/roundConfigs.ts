export type RoundConfig = {
  rows: number;
  cols: number;
  totalCards: number;
  previewTime: number;
  gameTime: number;
};

export const ROUND_CONFIGS: RoundConfig[] = [
  { rows: 3, cols: 2, totalCards: 6, previewTime: 4, gameTime: 20 },
  { rows: 4, cols: 2, totalCards: 8, previewTime: 4, gameTime: 20 },
  { rows: 4, cols: 3, totalCards: 12, previewTime: 4, gameTime: 20 },
  { rows: 4, cols: 4, totalCards: 16, previewTime: 4, gameTime: 20 },
  { rows: 5, cols: 4, totalCards: 20, previewTime: 4, gameTime: 20 },
];
