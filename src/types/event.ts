export type User = {
  studentName: string;
  studentNumber: string;
};

export type Colletions = {
  completed: boolean;
  collections: Stamp[];
};

export type Stamp = {
  stamp: string;
  collectedAt: string;
};

export type CollectStamp = {
  studentName: string;
  studentNumber: string;
  clubCode: string;
};

export type Uri = {
  uri: string;
};
