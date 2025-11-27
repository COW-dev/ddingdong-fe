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

export type ModalType = {
  title: string;
  content: React.ReactNode;
};
