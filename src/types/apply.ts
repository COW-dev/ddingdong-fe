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
  type: 'RADIO' | 'CHECK_BOX' | 'TEXT' | 'FILE' | 'LONG_TEXT';
};

export type ChartItem = {
  label: string;
  count: number;
  ratio: number;
  rank?: number;
};
