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

export type CurrentReport = {
  currentTerm: string;
};

export type UploadFile = { file: File; id: string };

export type PresignedUrlResponse = {
  id: string;
  uploadUrl: string;
  contentType: string;
};

export type UrlType = {
  id?: string;
  fileName?: string;
  originUrl: string;
  cdnUrl: string;
};

export type Auth = Pick<LoginResponse, 'role' | 'token'>;

export type ModalType = { title: React.ReactNode; content: React.ReactNode };
