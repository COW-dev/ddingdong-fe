export type User = {
  studentName: string;
  studentNumber: string;
};

export type Applicant = {
  id: number;
  sId: number;
  major: string;
  name: string;
};

export type ApplicantDetail = {
  id: number;
  sId: number;
  major: string;
  name: string;
  image: string[];
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
  department: string;
  clubCode: string;
};

export type Uri = {
  uri: string;
};
