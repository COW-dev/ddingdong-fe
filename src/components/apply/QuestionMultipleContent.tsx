import React from 'react';
import { useCookies } from 'react-cookie';
import { useMultipleAnswer } from '@/hooks/api/apply/useMultipleAnswer';
import TableChart from '../ui/bar-chart';
import PieChart from '../ui/pie-chart';

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
  const { data } = useMultipleAnswer(id, token);

  return <div>{<ChartComponent passedData={data?.data.options ?? []} />}</div>;
}
