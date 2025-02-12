import React from 'react';
import PieChart from '../ui/pie-chart';
import TableChart from '../ui/bar-chart';
import { useMultipleAnswer } from '@/hooks/api/apply/useMultipleAnswer';
import { useCookies } from 'react-cookie';

const componentMap = {
  RADIO: PieChart,
  CHECK_BOX: TableChart,
} as const;

type Props = {
  id: number;
  type: 'RADIO' | 'CHECK_BOX';
};

export default function QuestionMultipleContent({ type, id }: Props) {
  const ChartComponent = componentMap[type];
  const [{ token }] = useCookies();
  // const { data } = useMultipleAnswer(id, token);
  const data = {
    data: {
      type: 'RADIO',
      options: [
        {
          label: '지문1입니다.',
          count: 5,
          ratio: 30,
        },
        {
          label: '지문2입니다.',
          count: 4,
          ratio: 30,
        },
        {
          label: '지문3입니다.',
          count: 5,
          ratio: 30,
        },
      ],
    },
  };
  return <div>{<ChartComponent passedData={data?.data.options ?? []} />}</div>;
}
