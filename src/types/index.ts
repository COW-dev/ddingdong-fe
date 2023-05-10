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

type ClubDetailType = {
  id: number;
  clubName: string;
  tag: string;
  category: string;
  leaderName: string;
  phoneNumber: string;
  location: string;
  isRecruit?: boolean;
  recruitPeriod: string;
  regularMeeting: string;
  introduction: string;
  activities: string;
  ideal: string;
  formUrl?: string;
};

export type { ClubType, DeptCaptionColorType, NoticeType, ClubDetailType };
