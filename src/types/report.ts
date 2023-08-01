import { StaticImageData } from 'next/image';
import { DateRangeType } from 'react-tailwindcss-datepicker/dist/types';

export type StudentInfo = {
  name: string;
  studentId: number;
  department: string;
};

export type MyReportList = {
  name: string;
  term: string;
  activityReports: [number, number];
};

export type CurrentReport = {
  term: CurrentReport | undefined;
  currentTerm: string;
};

export type NewReport = {
  term: string;
  uploadFiles: File | null;
  date: DateRangeType;
  place: string;
  startTime: string;
  endTime: string;
  content: string;
  participants: StudentInfo[];
  token?: string;
};

export type ReportDataType = {
  reportId: number;
  createdAt: string;
  name: string;
  leader: string;
  leaderDepartment: string;
  content: string;
  place: string;
  startDate: string;
  endDate: Date;
  startTime: string;
  endTime: string;
  imageUrls: string[];
  participants: StudentInfo[];
};

export type ReportDetail = {
  reportId: number;
  createdAt: string;
  name: string;
  content: string;
  place: string;
  startDate: string;
  imageUrls: string[];
  participants: StudentInfo[];
};
