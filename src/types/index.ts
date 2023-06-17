export type ClubType = {
  id: number;
  name: string;
  tag: string;
  category: string;
};

export type DeptCaptionColorType = {
  [name: string]: string;
};

export type NoticeType = {
  id: number;
  title: string;
  createdAt: string;
};

export type ClubDetailType = {
  id: number;
  name: string;
  tag: string;
  category: string;
  leaderName: string;
  phoneNumber: string;
  location: string;
  isRecruit: boolean;
  recruitPeriod: string;
  regularMeeting: string;
  introduction: string;
  activities: string;
  ideal: string;
  formUrl: string;
};

export type loginResponse = {
  role: string;
  token: string;
};
