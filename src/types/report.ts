import { StaticImageData } from 'next/image';
import { DateRangeType } from 'react-tailwindcss-datepicker/dist/types';

export type StudentInfo = {
  name: string;
  studentId: string;
  department: string;
};

export type MyReportList = {
  name: string;
  term: string;
  activityReports: [number, number];
};

export type CurrentReport = {
  term: number;
  currentTerm: string;
};

export type NewReport = {
  term: number;
  date: DateRangeType;
  place: string;
  startTime: string;
  endTime: string;
  content: string;
  uploadFiles: File | null;
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
  id: number;
  createdAt: string;
  name: string;
  leader: string;
  leaderDepartment: string;
  content: string;
  place: string;
  startDate: string;
  endDate: string;
  startTime: string;
  endTime: string;
  imageUrls: string[];
  participants: StudentInfo[];
};
