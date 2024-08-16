export type DocumentDetail = {
  id: number;
  title: string;
  createdAt?: string;
  fileUrls: { fileUrl: string; name: string }[];
  imageUrls?: string[];
};

export type Document = {
  id: number;
  title: string;
  createdAt: string;
};

export type NewDocument = {
  title: string;
  content: string;
  token: string;
};

export type UpdateDocument = NewDocument & {
  documentId: number;
};

export type DeleteDocument = {
  documentId: number;
  token: string;
};
