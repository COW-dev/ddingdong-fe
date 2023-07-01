export type Club = {
  id: number;
  name: string;
  tag: string;
  category: string;
  isRecruit: boolean;
};

export type DeptCaptionColor = {
  [name: string]: string;
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

export type NoticeDetail = {
  id: number;
  title: string;
  content: string;
  createdAt: string;
};

export type ClubDetail = {
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

export type UpdateClub = {
  name?: string;
  tag?: string;
  category?: string;
  clubLeader?: string;
  phoneNumber?: string;
  location?: string;
  isRecruit?: boolean;
  recruitPeriod?: string;
  regularMeeting?: string;
  introduction?: string;
  activity?: string;
  ideal?: string;
  formUrl?: string;
  token: string;
};

export type LoginResponse = {
  role: string;
  token: string;
};

export type Auth = Pick<LoginResponse, 'role' | 'token'>;
