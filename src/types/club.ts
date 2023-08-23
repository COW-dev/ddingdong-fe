import { DateRangeType } from 'react-tailwindcss-datepicker/dist/types';
import { Member } from '@/types/member';

export type Club = {
  id: number;
  name: string;
  category: string;
  tag: string;
  recruit: boolean;
};

export type AdminClub = {
  id: number;
  name: string;
  category: string;
  profileImageUrls: Array<string>;
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
  name: string;
  tag: string;
  category: string;
  leader: string;
  phoneNumber: string;
  content: string;
  location: string;
  isRecruit: boolean;
  parsedRecruitPeriod: DateRangeType | null;
  startRecruitPeriod: string;
  endRecruitPeriod: string;
  regularMeeting: string;
  introduction: string;
  activity: string;
  ideal: string;
  uploadFiles: File | null;
  profileImageUrls: string[];
  token: string;
  formUrl: string;
  clubMembers: Member[];
};

export type Member = {
  id: number;
  name: string;
  studentNumber: string;
  phoneNumber: string;
  position: string;
  department: string;
};

export type UpdateMyClub = {
  name: string;
  tag: string;
  category: string;
  clubLeader: string;
  content: string;
  phoneNumber: string;
  location: string;
  isRecruit: boolean;
  recruitPeriod: DateRangeType;
  regularMeeting: string;
  imageUrls: File | string;
  introduction: string;
  activity: string;
  ideal: string;
  formUrl: string;
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

export type UpdateMembers = {
  members: Member[];
  token: string;
};
