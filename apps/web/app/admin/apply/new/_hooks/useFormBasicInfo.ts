import { useState } from 'react';

export type RecruitPeriod = {
  startDate: Date | null;
  endDate: Date | null;
};

export type FormBasicInfo = {
  title: string;
  description: string;
  hasInterview: boolean;
  recruitPeriod: RecruitPeriod;
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
