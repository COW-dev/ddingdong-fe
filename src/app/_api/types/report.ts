import { StudentInfo } from '@/types';
import { UrlType } from './common';

export type CurrentTerm = {
  term: number;
};

export type Term = {
  term: number;
  startDate: string;
  endDate: string;
};

export type ReportKey = {
  name: string;
  term: string;
};

export type MyReport = ReportKey & {
  activityReports: [number, number];
};

export type TermReport = {
  club: { id: number; name: string };
  activityReports: [number, number];
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
