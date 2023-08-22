export type Fix = {
  id: number;
  createdAt: string;
  club: string;
  title: string;
  isCompleted: boolean;
};

export type FixAdminDetailType = {
  id: number;
  createdAt: string;
  club: string;
  title: string;
  isCompleted: boolean;
  location: string;
  content: string;
  imageUrls: string[];
};
export type FixClubDetailType = {
  id: number;
  title: string;
  isCompleted: boolean;
  content: string;
  imageUrls: string[];
};

export type FixComplete = {
  id: number;
  isCompleted: boolean;
  token: string;
};

export type NewFix = {
  token: string;
  formData: FormData;
};
