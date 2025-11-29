import { DateRangeType } from 'react-tailwindcss-datepicker/dist/types';

import { UrlType } from './file';
import { Member } from './member';

export type ReportMember = Pick<Member, 'department' | 'name'> & {
  studentId: string;
};

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

export type ReportAPIResponse = {
  id: number;
  createdAt: string;
  name: string;
  content: string;
  place: string;
  startDate: string;
  endDate: string;
  image: UrlType;
  participants: ReportMember[];
};

export type ReportAPIRequest = {
  term: number;
  place?: string;
  startDate?: string;
  endDate?: string;
  content?: string;
  imageId?: string;
  participants: ReportMember[];
};

export type Report = {
  term?: number;
  date: DateRangeType;
  place?: string;
  startTime?: string;
  endTime?: string;
  content?: string;
  image?: UrlType;
  participants: ReportMember[];
  imageId?: string;
};
