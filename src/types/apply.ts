import { QuestionType } from './form';

export type ApplyRate = {
  label: string;
  count: number;
  comparedToBefore: {
    ratio: number;
    value: number;
  };
};

export type ApplyQuestion = {
  question: string;
  id: number;
  count: number;
  section: string;
  type: QuestionType;
};

export type AnswerItem = {
  applicationId: number;
  name: string;
  answer: string;
  fileName?: string;
};

export type FileItem = {
  applicationId: number;
  name: string;
  answer: string[];
};

export type FieldStatistics = {
  fields: ApplyQuestion[];
  sections: string[];
};
