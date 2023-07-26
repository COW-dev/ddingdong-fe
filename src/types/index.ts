import { DateRangeType } from 'react-tailwindcss-datepicker/dist/types';
import { create } from 'zustand';
export type Club = {
  id: number;
  name: string;
  category: string;
  tag: string;
  isRecruit: boolean;
};

export type AdminClub = {
  id: number;
  name?: string;
  category: string;
  score?: number;
};

export type modalPropType = {
  id?: number | boolean;
  name?: string;
  score?: number;
  color: string;
  title: string;
  subTitle: string;
  image: string;
};

export type NewClub = {
  clubName: string;
  category: string;
  tag: string;
  leaderName: string;
  userId: number;
  password: string;
  token?: string;
};

export type NewBanner = {
  token: string;
  formData: FormData;
};

export type BannerType = {
  id?: string;
  title: string;
  subTitle: string;
  colorCode: string;
  imgUrl: string;
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

export type DeleteClub = {
  clubId: number | boolean;
  token: string;
};
export type DeleteBanner = {
  bannerId: number | string;
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
  phoneNumber: string;
  location: string;
  isRecruit: boolean;
  recruitPeriod: DateRangeType;
  regularMeeting: string;
  introduction: string;
  activity: string;
  ideal: string;
  formUrl: string;
};

export type UpdateMyClub = {
  name?: string;
  tag?: string;
  category?: string;
  clubLeader?: string;
  phoneNumber?: string;
  location?: string;
  isRecruit?: boolean;
  recruitPeriod?: DateRangeType;
  regularMeeting?: string;
  introduction?: string;
  activity?: string;
  ideal?: string;
  formUrl?: string;
  token: string;
};

export type UpdateClub = {
  id: number;
  score: number;
  token: string;
};

export type LoginResponse = {
  role: string;
  token: string;
};

export type StudentInfo = {
  studentName: string;
  studentId: number;
  studentMajor: string;
};

export type NewReport = {
  term: string;
  uploadFiles: File | null;
  date: DateRangeType;
  place: string;
  content: string;
  participants: StudentInfo[];
  token?: string;
};

export type ReportDetail = {
  reportId: number;
  createdAt: string;
  name: string;
  leader: string;
  leaderDepartment: string;
  content: string;
  place: string;
  startDate: Date;
  endDate: Date;
  imageUrl: string;
  participants: StudentInfo[];
};

export type MyReportList = {
  name: string;
  term: string;
};

export type CurrentReport = {
  currentTerm: string;
};

export const termList = [
  '1회차',
  '2회차',
  '3회차',
  '4회차',
  '5회차',
  '6회차',
  '7회차',
];

export type Auth = Pick<LoginResponse, 'role' | 'token'>;
