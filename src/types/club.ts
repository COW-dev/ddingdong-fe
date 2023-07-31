import { DateRangeType } from 'react-tailwindcss-datepicker/dist/types';

export type Club = {
  id: number;
  name: string;
  category: string;
  tag: string;
  isRecruit: boolean;
};

export type AdminClub = {
  id: number;
  name: string;
  category: string;
  score: number;
};

export type NewClub = {
  clubName: string;
  category: string;
  tag: string;
  leaderName: string;
  userId: string;
  password: string;
  token?: string;
};
export type ClubDetail = {
  id: number;
  name: string;
  tag: string;
  category: string;
  clubLeader: string;
  phoneNumber: string;
  location: string;
  isRecruit: boolean;
  recruitPeriod: DateRangeType;
  regularMeeting: string;
  introduction: string;
  activity: string;
  ideal: string;
  uploadFiles: File | null;
  token: string;
  // formUrl: string;
};

export type UpdateMyClub = {
  name?: string;
  tag?: string;
  category?: string;
  clubLeader?: string;
  phoneNumber?: string;
  location?: string;
  isRecruit?: boolean;
  recruitPeriod?: DateRangeType;
  regularMeeting?: string;
  introduction?: string;
  activity?: string;
  ideal?: string;
  formUrl?: string;
  token: string;
};

export type UpdateClub = {
  id: number;
  score: number;
  token: string;
};

export type DeleteClub = {
  clubId: number | boolean;
  token: string;
};
