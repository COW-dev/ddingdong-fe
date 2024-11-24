export type Document = {
  documents: DocumentTitle[];
  totalPageCount: number;
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
  id: string;
  name: string;
  originUrl: string;
  cdnUrl: string;
};

export type DocumentDetail = {
  id: number;
  title: string;
  createdAt?: string;
  files: DocumentFile[];
};

export type DeleteDocument = {
  documentId: number;
  token: string;
};
