import { MOCK_APPLYCANT } from '@/components/apply/applicant.data';
import { ApplyRate } from '@/types/apply';

export const createComparisonData = (
  clubName: string,
  data: ApplyRate[],
): ApplyRate[] => {
  const MOCK_DATA = MOCK_APPLYCANT[clubName];
  return [MOCK_DATA, calculateComparisonData(MOCK_DATA, data[0])];
};

const calculateComparisonData = (previous: ApplyRate, current: ApplyRate) => {
  const countDifference = current?.count - previous?.count;
  const ratio =
    previous?.count === 0
      ? 0
      : Number(((countDifference / previous?.count) * 100).toFixed(2));

  return {
    ...current,
    comparedToBefore: {
      ratio: ratio,
      value: countDifference,
    },
  };
};
