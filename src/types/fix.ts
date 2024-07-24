export type Fix = {
  id: number;
  clubLocation: string;
  clubName: string;
  title: string;
  content: string;
  isCompleted: boolean;
  requestedAt: string;
};

export type Comment = {
  commentor: string;
  content: string;
  profileImageUrl: string;
  createdAt: string;
};

export type FixDetailInfo = {
  clubLocation: string;
  clubName: string;
  title: string;
  content: string;
  isCompleted: boolean;
  requestedAt: string;
  imageUrl: string[];
  comments: Comment[];
};

export type FixComplete = {
  id: number;
  token: string;
};

export type NewFix = {
  token: string;
  formData: FormData;
};

export type NewFixComment = {
  token: string;
  content: string;
};

export type DeleteFixComment = {
  fixZonId: string;
  commentId: string;
  token: string;
};

export interface UpdateFixComment extends DeleteFixComment {
  content: string;
}
