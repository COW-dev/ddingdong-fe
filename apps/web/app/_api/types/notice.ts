import { OrderUUID } from './common';
import { UrlType } from './file';

export type AllNoticeAPIResponse = {
  notices: NoticeTitle[];
  totalPage: number;
};

export type NoticeTitle = {
  id: number;
  title: string;
  createdAt: string;
};

export type NoticeDetailAPIResponse = {
  id: number;
  title: string;
  content: string;
  createdAt: string;
  images: UrlType[];
  files: UrlType[];
};

export type NewNoticeAPIRequest = {
  title: string;
  content: string;
  files: OrderUUID[] | null;
  images: OrderUUID[] | null;
};

export type UpdateNoticeAPIRequest = {
  noticeId: number;
} & NewNoticeAPIRequest;
