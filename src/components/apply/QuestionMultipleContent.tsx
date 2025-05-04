import React from 'react';
import { useCookies } from 'react-cookie';
import { useMultipleAnswer } from '@/hooks/api/apply/useMultipleAnswer';
import BarChart from '../common/bar-chart';
import PieChart from '../common/pie-chart';
import OptionModal from '../ui/OptionModal';

const componentMap = {
  RADIO: PieChart,
  CHECK_BOX: BarChart,
} as const;

type Props = {
  id: number;
  type: 'RADIO' | 'CHECK_BOX';
};

export default function QuestionMultipleContent({ type, id }: Props) {
  const ChartComponent = componentMap[type];
  const [{ token }] = useCookies();
  const { data } = useMultipleAnswer(id, token);

  return (
    <div className="relative flex w-full justify-center">
      <div className="absolute bottom-0 right-0">
        <OptionModal
          labels={data?.data.options?.map(({ label }) => label) ?? []}
          className="md:px-3 md:py-2 md:text-sm"
        />
      </div>
      <ChartComponent passedData={data?.data.options ?? []} />
    </div>
  );
}
