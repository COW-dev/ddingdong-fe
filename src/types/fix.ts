import { Fix } from '@/app/_api/types/fix';

import { OrderUUID, UrlType } from '.';

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
  images: UrlType[];
  comments: Comment[];
};

export type FixComplete = {
  id: number;
  token: string;
};

export type EditFix = {
  title: string;
  content: string;
  images: string[] | null;
};

export type NewFix = {
  token: string;
  post: Omit<EditFix, 'images'> & {
    images: OrderUUID[] | null;
  };
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
