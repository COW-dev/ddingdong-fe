import { DateRangeType } from 'react-tailwindcss-datepicker/dist/types';

import { UrlType } from '@/app/_api/types/common';

export type StudentInfo = {
  name: string;
  studentId: string;
  department: string;
};

export type ReportKey = {
  name: string;
  term: number;
};

export type TermReport = {
  club: { id: number; name: string };
  activityReports: [number, number];
};

export type MyReportList = ReportKey & {
  activityReports: [number, number];
};

export type CurrentReport = {
  term: string;
  currentTerm: string;
};

export type EditReport = {
  term?: number;
  date: DateRangeType;
  place?: string;
  startTime?: string;
  endTime?: string;
  content?: string;
  image?: UrlType;
  uploadFiles?: File | null;
  participants: StudentInfo[];
  imageId?: string;
};

export type SubmitReport = {
  //server로 전달하는 report type
  term: number;
  place?: string;
  startDate?: string;
  endDate?: string;
  content?: string;
  imageId?: string;
  participants: StudentInfo[];
};

export type DeleteReport = {
  term: number;
  token: string;
};
