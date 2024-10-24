export type Fix = {
  fixZoneId: number;
  clubLocation: string;
  clubName: string;
  title: string;
  content: string;
  isCompleted: boolean;
  requestedAt: string;
};

export type Comment = {
  commentor: string;
  content: string;
  profileImageUrl: string;
  createdAt: string;
  commentId: number;
};

export type FixDetailInfo = {
  clubLocation: string;
  clubName: string;
  comments: Comment[];
  title: string;
  content: string;
  id: number;
  imageUrls: string[];
  isCompleted: boolean;
  requestedAt: string;
};

export type FixComplete = {
  id: number;
  token: string;
};

export type EditFix = {
  title: string;
  content: string;
  fixZoneImageKeys: string[] | null;
};

export type NewFix = {
  token: string;
  post: EditFix;
};

export type NewFixComment = {
  token: string;
  content: string;
  fixZoneId: number;
};

export type DeleteFixComment = {
  fixZoneId: number;
  commentId: number;
  token?: string;
};
