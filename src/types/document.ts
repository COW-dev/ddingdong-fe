export type Document = {
  documents: DocumentTitle[];
  totalPage: string;
};

export type DocumentTitle = {
  id: number;
  title: string;
  createdAt: string;
};

export type NewDocument = {
  title: string;
  fileIds: string[];
  token: string;
};

export type UpdateDocument = NewDocument & {
  documentId: number;
};

export type DocumentFile = {
  originUrl: string;
  cdnUrl: string;
  fileName: string;
};

export type DocumentDetail = {
  id: number;
  title: string;
  createdAt?: string;
  fileUrls: DocumentFile[];
};

export type DeleteDocument = {
  documentId: number;
  token: string;
};
