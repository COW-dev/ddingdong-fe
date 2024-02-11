export type User = {
  studentName: string;
  studentNumber: number;
};

export type Colletions = {
  isCompleted: boolean;
  collects: Stamp[];
};

export type Stamp = {
  stamp: string;
  collectedAt: string;
};
