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

export type ChartItem = {
  label: string;
  count: number;
  ratio: number;
  rank?: number;
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

export type ApplyStatistics = {
  totalCount: number;
  departmentStatistics: ChartItem[];
  applicantStatistics: ApplyRate[];
  fieldStatistics: fieldStatistics;
};

export type fieldStatistics = {
  fields: ApplyQuestion[];
  sections: string[];
};
