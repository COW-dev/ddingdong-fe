import { UrlType } from '@/app/_api/types/common';

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

export type UpdateClub = {
  id: number;
  score: number;
  token: string;
};

export type DeleteClub = {
  clubId: number | boolean;
  token: string;
};
