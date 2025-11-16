export type Score = {
  clubId: number;
  scoreCategory: string;
  reason: string;
  amount: number;
  token: string;
};

export type ScoreDetail = {
  totalScore: number;
  scoreHistories: ScoreHistory[];
};

export type ScoreHistory = {
  scoreCategory: string;
  reason: string;
  createdAt: string;
  amount: number;
};

export type ScoreAPIRequest = {
  scoreCategory: string;
  reason: string;
  amount: number;
};
