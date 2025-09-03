export type DocumentList = {
  documents: Document[];
  totalPageCount: number;
};

export type Document = {
  id: number;
  title: string;
  createdAt: string;
};

export type DocumentDetail = {
  id: number;
  title: string;
  createdAt?: string;
  files: DocumentFile[];
};

export type DocumentFile = {
  id: string;
  name: string;
  originUrl: string;
  cdnUrl: string;
};
