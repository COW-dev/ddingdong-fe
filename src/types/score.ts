export type Score = {
  clubId: number;
  scoreCategory: string;
  reason: string;
  amount: number;
  token: string;
};
export type ScoreDetail = {
  scoreCategory: string;
  reason: string;
  createdAt: string;
  amount: number;
  remainingScore: number;
};
