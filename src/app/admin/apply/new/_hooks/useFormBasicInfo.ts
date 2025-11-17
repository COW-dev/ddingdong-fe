import { useState } from 'react';

import { DateRangeType } from 'react-tailwindcss-datepicker/dist/types';

export type FormBasicInfo = {
  title: string;
  description: string;
  hasInterview: boolean;
  recruitPeriod: DateRangeType;
};

export function useFormBasicInfo() {
  const [basicInfo, setBasicInfo] = useState<FormBasicInfo>({
    title: '',
    description: '',
    hasInterview: true,
    recruitPeriod: {
      startDate: null,
      endDate: null,
    },
  });

  const updateBasicInfo = (updates: Partial<FormBasicInfo>) => {
    setBasicInfo((prev) => ({ ...prev, ...updates }));
  };

  return {
    basicInfo,
    updateBasicInfo,
  };
}
