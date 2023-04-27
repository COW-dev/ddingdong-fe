type ClubType = {
  id: number;
  clubName: string;
  tag: string;
  category: string;
};

type DeptCaptionColorType = {
  [name: string]: string;
};

type NoticeType = {
  id: number;
  title: string;
  createdAt: string;
};

export type { ClubType, DeptCaptionColorType, NoticeType };
