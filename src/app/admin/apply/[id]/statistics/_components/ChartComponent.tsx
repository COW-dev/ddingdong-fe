import { AnswerItem } from '@/types/apply';

import { TextList } from './QuestionSingleContent';
import { BarChart } from './_chart/BarChart';
import { PieChart } from './_chart/PieChart';
import { ChartItem } from '@/app/_api/types/apply';

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
  switch (props.type) {
    case 'TEXT':
    case 'LONG_TEXT':
      return <TextList answer={props.answer} id={props.id} />;
    case 'RADIO':
      return <PieChart data={props.data} />;
    case 'CHECK_BOX':
      return <BarChart data={props.data} />;
  }
};
