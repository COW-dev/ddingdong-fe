import { useSuspenseQuery } from '@tanstack/react-query';
import { Flex } from 'ddingdong-design-system';

import { applyQueryOptions } from '@/app/_api/queries/apply';

import PieChart from '../../../../../../components/common/pie-chart';

import BarChart from './_chart/BarChart';

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
  const { data: answerData } = useSuspenseQuery(
    applyQueryOptions.multipleField(id),
  );

  return (
    <Flex justifyContent="center" className="relative w-full">
      <div className="absolute right-0 bottom-0">
        {/* <OptionModal
          labels={data?.data.options?.map(({ label }) => label) ?? []}
          className="md:px-3 md:py-2 md:text-sm"
        /> */}
      </div>
      <ChartComponent data={answerData.options ?? []} />
    </Flex>
  );
}
