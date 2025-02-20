import React from 'react';
import { useCookies } from 'react-cookie';
import { useMultipleAnswer } from '@/hooks/api/apply/useMultipleAnswer';
import TableChart from '../ui/bar-chart';
import OptionModal from '../ui/OptionModal';
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

  return (
    <div className="relative flex w-full justify-center">
      <div className="absolute bottom-0 right-0">
        <OptionModal
          labels={data?.data.options?.map(({ label }) => label) ?? []}
          className="md:px-3 md:py-2 md:text-sm"
        />
      </div>
      <div className="max-w-[400px]">
        <ChartComponent passedData={data?.data.options ?? []} />
      </div>
    </div>
  );
}
