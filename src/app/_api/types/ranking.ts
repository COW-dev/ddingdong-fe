export type AdminFeedRanking = {
  rank: number;
  clubName: string;
  feedScore: number;
  viewScore: number;
  likeScore: number;
  commentScore: number;
  totalScore: number;
};

export type ClubFeedRanking = {
  year: number;
  month: number;
  rank: number;
  lastMonthRank: number;
  feedScore: number;
  viewScore: number;
  likeScore: number;
  commentScore: number;
  totalScore: number;
};
