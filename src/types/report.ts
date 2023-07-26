import { DateRangeType } from 'react-tailwindcss-datepicker/dist/types';

export type StudentInfo = {
  studentName: string;
  studentId: number;
  studentMajor: string;
};

export type MyReportList = {
  name: string;
  term: string;
};

export type CurrentReport = {
  currentTerm: string;
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
