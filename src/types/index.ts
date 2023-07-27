import { StaticImageData } from 'next/image';
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
  id: number | boolean;
  name?: string;
  score?: number;
  color: string;
  title: string;
  subTitle: string;
  image: string;
};

export type DeptCaptionColor = {
  [name: string]: string;
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
  imageUrl: StaticImageData;
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
