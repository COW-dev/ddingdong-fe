export type Fix = {
  id: number;
  createdAt: string;
  club: string;
  title: string;
  completed: boolean;
};

export type FixAdminDetailType = {
  id: number;
  createdAt: string;
  club: string;
  title: string;
  completed: boolean;
  location: string;
  content: string;
  imageUrls: string[];
};
export type FixClubDetailType = {
  id: number;
  title: string;
  completed: boolean;
  content: string;
  imageUrls: string[];
};

export type FixComplete = {
  id: number;
  completed: boolean;
  token: string;
};

export type NewFix = {
  token: string;
  formData: FormData;
};
