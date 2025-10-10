export type AllNoticeAPIResponse = {
  notices: NoticeTitle[];
  totalPage: number;
};

export type NoticeTitle = {
  id: number;
  title: string;
  createdAt: string;
};
