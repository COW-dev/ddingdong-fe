export type ClubType = {
  id: number;
  name: string;
  tag: string;
  category: string;
  isRecruit: boolean;
};

export type DeptCaptionColorType = {
  [name: string]: string;
};

export type NoticeType = {
  id: number;
  title: string;
  createdAt: string;
};

export type NoticeDetailType = {
  id: number;
  title: string;
  content: string;
  createdAt: string;
};

export type ClubDetailType = {
  id: number;
  name: string;
  tag: string;
  category: string;
  leader: string;
  phoneNumber: { number: string };
  location: string;
  isRecruit: boolean;
  recruitPeriod: string;
  regularMeeting: string;
  introduction: string;
  activity: string;
  ideal: string;
  formUrl: string;
};

export type loginResponse = {
  role: string;
  token: string;
};
