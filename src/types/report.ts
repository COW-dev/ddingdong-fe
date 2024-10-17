import { DateRangeType } from 'react-tailwindcss-datepicker/dist/types';

export type StudentInfo = {
  name: string;
  studentId: string;
  department: string;
};

export type ReportKey = {
  name: string;
  term: number;
};

export type MyReportList = ReportKey & {
  activityReports: [number, number];
};

export type CurrentReport = {
  term: string;
  currentTerm: string;
};

export type ActivityReportTerm = {
  term: number;
  startDate: string;
  endDate: string;
};

export type EditReport = {
  //form(편집)에 사용되는 Report type
  term: number;
  date: DateRangeType;
  place: string;
  startTime: string;
  endTime: string;
  content: string;
  imageUrl: { originUrl: string; cdnUrl: string };
  uploadFiles?: File | null;
  participants: StudentInfo[];
  token?: string;
  key: string;
};

export type SubmitReport = {
  //server로 전달하는 report type
  term: number;
  place: string;
  startDate: string;
  endDate: string;
  content: string;
  key: string;
  participants: StudentInfo[];
};

export type ReportResponse = {
  //server로부터 전달받는 report type
  id: number;
  createdAt: string;
  name: string;
  content: string;
  place: string;
  startDate: string;
  endDate: string;
  imageUrl: { originUrl: string; cdnUrl: string };
  participants: StudentInfo[];
};

export type DeleteReport = {
  term: number;
  token: string;
};
