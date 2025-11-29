import { ScoreDetail, ScoreHistory } from '@/app/_api/types/score';

export function getCategoryHistory(
  score: ScoreDetail,
  categoryName: string,
): ScoreHistory[] {
  return score.scoreHistories.filter(
    (item) => item.scoreCategory === categoryName,
  );
}

export function getCategoryScore(category: ScoreHistory[]): number {
  return category.reduce((acc, cur) => acc + cur.amount, 0);
}
