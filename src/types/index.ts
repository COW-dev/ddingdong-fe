export type Club = {
  id: number;
  name: string;
  category: string;
  tag: string;
  recruitStatus: string;
};

export type AdminClub = {
  id: number;
  name?: string;
  category: string;
  score?: number;
};

export type DeptCaptionColor = {
  [name: string]: string;
};

export type LoginResponse = {
  role: string;
  token: string;
};

export type Auth = Pick<LoginResponse, 'role' | 'token'>;
