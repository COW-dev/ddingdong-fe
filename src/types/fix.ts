import { UrlType } from '.';

export type Fix = {
  id: number;
  clubLocation: string;
  clubName: string;
  title: string;
  content: string;
  isCompleted: boolean;
  requestedAt: string;
};

export type Comment = {
  id: number;
  commentor: {
    name: string;
    profileImageUrl: UrlType;
  };
  content: string;
  createdAt: string;
};

export type FixDetailInfo = Fix & {
  imageUrls: UrlType[];
  comments: Comment[];
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
