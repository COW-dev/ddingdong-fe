import { StaticImageData } from 'next/image';
import { DateRangeType } from 'react-tailwindcss-datepicker/dist/types';

export type StudentInfo = {
  studentName: string;
  studentId: number;
  studentMajor: string;
};

export type MyReportList = {
  name: string;
  term: string;
  activityReports: [number, number];
};

export type CurrentReport = {
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

export type ReportDetail = {
  id: number;
  createdAt: string;
  name: string;
  leader: string;
  leaderDepartment: string;
  content: string;
  place: string;
  startDate: Date;
  endDate: Date;
  startTime: string;
  endTime: string;
  imageUrls: string[];

  participants: StudentInfo[];
};
