export type NewDocument = {
  title: string;
  fileIds: string[];
  token: string;
};

export type UpdateDocument = NewDocument & {
  documentId: number;
};

export type DeleteDocument = {
  documentId: number;
  token: string;
};
