export type NoticeDetail = {
  id: number;
  title: string;
  content: string;
  createdAt: string;
  fileUrls: { fileUrl: string; name: string }[];
  imageUrls: string[];
};

export type Notice = {
  id: number;
  title: string;
  createdAt: string;
};

export type NewNotice = {
  title: string;
  content: string;
  token: string;
};

export type UpdateNotice = NewNotice & {
  noticeId: number;
};

export type DeleteNotice = {
  noticeId: number;
  token: string;
};
