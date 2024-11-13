import { DateRangeType } from 'react-tailwindcss-datepicker/dist/types';
import { UrlType } from '.';

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
  startTime: string | null;
  endTime: string | null;
  content: string;
  image?: UrlType;
  uploadFiles?: File | null;
  participants: StudentInfo[];
  token?: string;
  imageId: string | null;
};

export type SubmitReport = {
  //server로 전달하는 report type
  term: number;
  place: string;
  startDate: string | null;
  endDate: string | null;
  content: string;
  imageId: string | null;
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
  image: UrlType;
  participants: StudentInfo[];
};

export type DeleteReport = {
  term: number;
  token: string;
};
