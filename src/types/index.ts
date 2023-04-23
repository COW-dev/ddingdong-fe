type ClubType = {
  id: number;
  name: string;
  tag: string;
  category: string;
};

type DeptCaptionColorType = {
  [name: string]: string;
};

type NoticeType = {
  id: number;
  title: string;
  date: string;
};

export type { ClubType, DeptCaptionColorType, NoticeType };
