export type Fix = {
  fixZoneId: number;
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
  commentId: number;
};

export type FixDetailInfo = {
  // clubLocation: string;
  // clubName: string;
  // title: string;
  // content: string;
  // isCompleted: boolean;
  // requestedAt: string;
  // imageUrl: string[];
  // comments: Comment[];
  comments: Comment[];
  title: string;
  content: string;
  id: number;
  imageUrls: string[];
  isCompleted: boolean;
  requestedAt: string;
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
  fixZoneId: number;
};

export type DeleteFixComment = {
  fixZonId: number;
  commentId: number;
  token: string;
};

export interface UpdateFixComment extends DeleteFixComment {
  content: string;
}
