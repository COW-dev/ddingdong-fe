import { DateRangeType } from 'react-tailwindcss-datepicker/dist/types';
import { UrlType } from '.';

export type Club = {
  id: number;
  name: string;
  category: string;
  tag: string;
  recruitStatus: string;
};

export type ClubProfile = {
  id: string;
  name: string;
  profileImageOriginUrl: string;
  profileImageCdnUrl: string;
};

export type AdminClub = {
  id: number;
  name: string;
  category: string;
  score: number;
  profileImage: UrlType;
};

export type NewClub = {
  clubName: string;
  category: string;
  tag: string;
  leaderName: string;
  authId: string;
  password: string;
  token?: string;
};
export type ClubDetail = {
  name: string;
  tag: string;
  category: string;
  leader: string;
  phoneNumber: string;
  location: string;
  isRecruit: boolean;
  startDate?: string;
  endDate?: string;
  regularMeeting: string;
  introduction: string;
  activity: string;
  ideal: string;
  profileImage: UrlType;
  introductionImage: UrlType;
  token: string;
  formId?: number;
};

export type MemberInfo = {
  clubName: string;
  clubMembers: Member[];
};

export type Member = {
  id?: number;
  name: string;
  studentNumber: string;
  phoneNumber: string;
  position: string;
  department: string;
};

export type UpdateMember = {
  id: number;
  token: string;
  member: Member;
};

export type DeleteMember = {
  id: number;
  token: string;
};

export type MemberData = {
  name: string;
  studentNumber: string;
  phoneNumber: string;
  position: string;
  department: string;
};

export type AddMember = {
  token: string;
  member: MemberData;
};

export type UpdateMyClub = {
  name: string;
  tag: string;
  clubLeader: string;
  phoneNumber: string;
  location: string;
  startRecruitPeriod: string | null;
  endRecruitPeriod: string | null;
  regularMeeting: string;
  introduction: string;
  activity: string;
  ideal: string | null;
  formUrl: string | null;
  profileImageId: string | null;
  introductionImageId: string | null;
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
