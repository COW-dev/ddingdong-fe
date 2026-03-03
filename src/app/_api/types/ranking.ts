export type AdminFeedRankingApiResponse = {
  rank: number;
  clubName: string;
  feedScore: number;
  viewScore: number;
  likeScore: number;
  commentScore: number;
  totalScore: number;
};

export type ClubFeedRankingApiResponse = {
  year: number;
  month: number;
  rank: number;
  lastMonthRank: number | null;
  feedScore: number;
  viewScore: number;
  likeScore: number;
  commentScore: number;
  totalScore: number;
};
