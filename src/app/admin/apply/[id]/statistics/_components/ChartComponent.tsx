import { ChartItem, AnswerItem } from '@/app/_api/types/apply';

import { BarChart } from './_chart/BarChart';
import { PieChart } from './_chart/PieChart';
import { TextList } from './QuestionSingleContent';

type TextProps = {
  type: 'TEXT' | 'LONG_TEXT';
  answer: AnswerItem;
  id: number;
};

type ChartProps = {
  type: 'RADIO' | 'CHECK_BOX';
  data: ChartItem[];
};

export const ChartComponent = (props: TextProps | ChartProps) => {
  const { type } = props;

  switch (type) {
    case 'TEXT':
    case 'LONG_TEXT': {
      const { answer, id } = props as TextProps;
      return <TextList answer={answer} id={id} />;
    }
    case 'RADIO': {
      const { data } = props as ChartProps;
      return <PieChart data={data} />;
    }
    case 'CHECK_BOX': {
      const { data } = props as ChartProps;
      return <BarChart data={data} />;
    }
  }
};
