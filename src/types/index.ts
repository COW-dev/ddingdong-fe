export type Club = {
  id: number;
  name: string;
  category: string;
  tag: string;
  recruit: string;
};

export type AdminClub = {
  id: number;
  name?: string;
  category: string;
  score?: number;
};

export type modalPropType = {
  id: number | boolean;
  name?: string;
  score?: number;
  color: string;
  title: string;
  subTitle: string;
  image: string;
};

export type DeptCaptionColor = {
  [name: string]: string;
};

export type LoginResponse = {
  role: string;
  token: string;
};

export type StudentInfo = {
  name: string;
  studentId: string;
  department: string;
};

export type MyReportList = {
  name: string;
  term: string;
};

export type CurrentReport = {
  currentTerm: string;
};

export type Auth = Pick<LoginResponse, 'role' | 'token'>;

export type ModalType = { title: string; content: React.ReactNode };
