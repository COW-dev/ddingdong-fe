import { UrlType } from './file';
export type RecruitStatus = '모집 중' | '모집 마감' | '모집 예정';
export type ClubTag =
  | '봉사'
  | '사회연구'
  | '연행예술'
  | '전시창작'
  | '종교'
  | '체육'
  | '학술'
  | '준동아리';

export type Club = {
  id: number;
  name: string;
  category: string;
  tag: ClubTag;
  recruitStatus: RecruitStatus;
};

export type ClubProfile = {
  id: number;
  name: string;
  profileImageOriginUrl: string;
  profileImageCdnUrl: string;
};

export type ClubDetail = {
  name: string;
  tag: string;
  category: string;
  leader: string;
  phoneNumber: string;
  location: string;
  regularMeeting: string;
  introduction: string;
  activity: string;
  ideal: string;
  profileImage: UrlType;
  introductionImage: UrlType;
  startDate?: string;
  endDate?: string;
  formId?: number;
};

export type UpdateClubDetailAPIRequest = {
  name: string;
  tag: string;
  clubLeader: string;
  phoneNumber: string | null;
  location: string | null;
  regularMeeting: string;
  introduction: string;
  activity: string;
  ideal: string | null;
  formUrl: string | null;
  profileImageId: string | null;
  introductionImageId: string | null;
};
