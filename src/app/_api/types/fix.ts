import { OrderUUID } from './common';
import { UrlType } from './file';

export type Fix = {
  id: number;
  clubLocation: string;
  clubName: string;
  title: string;
  content: string;
  isCompleted: boolean;
  requestedAt: string;
};

export type FixAPIRequest = {
  title: string;
  content: string;
  images: OrderUUID[] | null;
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

export type DetailFix = Fix & {
  images: UrlType[];
  comments: Comment[];
};
