import { UrlType } from '.';

export type NoticeDetail = {
  id: number;
  title: string;
  content: string;
  createdAt: string;
  images: UrlType[];
  files: UrlType[];
};

export type Notice = {
  notices: NoticeTitle[];
  totalPage: number;
};

export type NoticeTitle = {
  id: number;
  title: string;
  createdAt: string;
};

export type NewNotice = {
  title: string;
  content: string;
  imageIds: string[];
  fileIds: string[];
  token: string;
};

export type UpdateNotice = NewNotice & {
  noticeId: number;
};

export type DeleteNotice = {
  noticeId: number;
  token: string;
};
